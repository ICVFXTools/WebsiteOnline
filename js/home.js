document.addEventListener('DOMContentLoaded', () => {
  initHome().catch((err) => {
    console.error('Failed to initialize home page:', err);
  });
});

async function initHome() {
  const response = await fetch('data/plugins.json');
  if (!response.ok) {
    throw new Error(`Failed to load plugins.json: ${response.status}`);
  }
  const plugins = await response.json();

  /* ========================================
     DYNAMIC COLOR GENERATION (ADAPTIVE)
     ======================================== */
  (function assignAdaptiveColors(arr) {
    const total = arr.length;
    const sat = 0.9;
    const light = 0.55;
    const hueStart = 0; // 0 degrees (red)
    const hueSpan = 240; // 240 degrees (blue)

    arr.forEach((plugin, i) => {
      const fraction = total > 1 ? (i / (total - 1)) : 0;
      const hueDeg = hueStart + fraction * hueSpan;
      const color = new THREE.Color();
      color.setHSL(hueDeg / 360, sat, light);
      plugin.color = color.getHex();
    });
  })(plugins);

  // DOM references
  const listContainer = document.getElementById('pluginListContainer');
  const titleEl = document.getElementById('pluginTitle');
  const descEl = document.getElementById('pluginDescription');
  const buttonGroupEl = document.querySelector('.button-group');
  const marketplaceLinkEl = document.getElementById('marketplaceLink');
  const youtubeLinkEl = document.getElementById('youtubeLink');
  const documentationLinkEl = document.getElementById('documentationLink');
  const forumLinkEl = document.getElementById('forumLink');
  const canvasEl = document.getElementById('bg-canvas');

  // 3D globals
  let scene, camera, renderer, particleSystem, imagePlane, subtitlePlane, textureLoader;
  let subtitleContext, subtitleCanvas, subtitleTexture, typewriterInterval;
  let currentIndex = 0;
  let autoSwitchTimeout, idleTimeout;
  let backgroundPlane;

  // Check for mobile view on load
  const isMobileView = window.innerWidth <= 800;

  // Typewriter variables
  let currentLineIndex = 0;
  let currentCharIndex = 0;
  let typewriterLines = [];
  let typeWriterLineHeight = 36;
  let typeWriterStartY = 30;

  function setLink(el, url) {
    if (url) {
      el.style.display = 'inline-flex';
      el.href = url;
    } else {
      el.style.display = 'none';
      el.removeAttribute('href');
    }
  }

  /**
   * Updates all content on the page based on the selected plugin index.
   */
  function updateDisplay(index) {
    currentIndex = index;
    const plugin = plugins[index];

    // --- Update Text Content & Links ---
    const elementsToAnimate = [titleEl, descEl, buttonGroupEl];
    elementsToAnimate.forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; });

    titleEl.textContent = plugin.title;
    descEl.textContent = plugin.description;

    if (plugin.customPage) {
      buttonGroupEl.style.display = 'none';
    } else {
      buttonGroupEl.style.display = 'flex';
      setLink(marketplaceLinkEl, plugin.marketplaceUrl);
      setLink(youtubeLinkEl, plugin.youtubeUrl);
      setLink(documentationLinkEl, plugin.documentationUrl);
      setLink(forumLinkEl, plugin.forumUrl);
    }

    elementsToAnimate.forEach((el) => { el.style.animation = ''; });

    // --- 3D Updates (Desktop Only) ---
    if (!isMobileView) {
      // --- Update 3D Image ---
      textureLoader.load(
        plugin.showcaseImageUrl,
        (texture) => {
          imagePlane.material.map = texture;
          imagePlane.material.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.error('Error loading texture:', plugin.showcaseImageUrl, err);
          textureLoader.load('https://placehold.co/1600x900/111/fff?text=Image+Error', (fallbackTexture) => {
            imagePlane.material.map = fallbackTexture;
            imagePlane.material.needsUpdate = true;
          });
        }
      );

      // --- Update 3D Subtitle ---
      startTypewriter(plugin.subtitle);

      // --- Update 3D Particle & Background Color ---
      if (particleSystem) { particleSystem.material.color.set(plugins[index].color); }
      if (backgroundPlane) { backgroundPlane.material.color.set(plugins[index].color); }
    }

    // --- Update Sidebar Active State ---
    document.querySelectorAll('.plugin-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    // --- Update Primary Theme Color ---
    const newColor = `#${plugins[index].color.toString(16).padStart(6, '0')}`;
    document.documentElement.style.setProperty('--color-primary', newColor);
    document.documentElement.style.setProperty('--color-glow', `${newColor}b3`); // b3 = ~70% opacity
  }

  /**
   * Builds the sidebar list on page load.
   */
  plugins.forEach((plugin, index) => {
    const item = document.createElement('div');
    item.className = 'plugin-item';
    item.dataset.index = index;
    if (plugin.customPage) {
      item.dataset.customPage = 'true';
      item.dataset.pageUrl = plugin.pageUrl || '';
    }
    item.innerHTML = `
      <img src="${plugin.thumbnailUrl}" alt="${plugin.title} thumbnail" class="plugin-item-thumb" onerror="this.src='https://placehold.co/100x100/333/eee?text=Error'">
      <div class="plugin-item-text">
        <h3>${plugin.title}</h3>
        <p>${plugin.subtext}</p>
      </div>
    `;
    listContainer.appendChild(item);
  });

  /**
   * Starts the automatic cycling through plugins.
   */
  function startAutoSwitchCycle() {
    const cycle = () => {
      const nextIndex = (currentIndex + 1) % plugins.length;
      const nextItem = document.querySelector(`.plugin-item[data-index='${nextIndex}']`);
      if (nextItem) nextItem.classList.add('loading');

      autoSwitchTimeout = setTimeout(() => {
        if (nextItem) nextItem.classList.remove('loading');
        updateDisplay(nextIndex);
        cycle();
      }, 5000); // Auto-switch speed (ms)
    };
    cycle();
  }

  /**
   * Resets the idle timer when user interacts.
   */
  function resetIdleTimer() {
    clearTimeout(autoSwitchTimeout);
    clearTimeout(idleTimeout);
    const loadingItem = document.querySelector('.plugin-item.loading');
    if (loadingItem) loadingItem.classList.remove('loading');
    idleTimeout = setTimeout(startAutoSwitchCycle, 10000); // Idle time (ms)
  }

  // --- Event Listeners ---
  listContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.plugin-item');
    if (!item) return;

    const index = parseInt(item.dataset.index, 10);
    updateDisplay(index);
    resetIdleTimer();

    if (item.dataset.customPage === 'true' && item.dataset.pageUrl) {
      window.open(item.dataset.pageUrl, '_blank');
    }
  });

  /**
   * Animates the multi-line typewriter effect.
   */
  function animateTypewriter() {
    if (currentLineIndex >= typewriterLines.length) {
      clearInterval(typewriterInterval);
      return;
    }
    subtitleContext.clearRect(0, 0, subtitleCanvas.width, subtitleCanvas.height);
    for (let i = 0; i < currentLineIndex; i++) {
      subtitleContext.fillText(typewriterLines[i], subtitleCanvas.width / 2, typeWriterStartY + (i * typeWriterLineHeight));
    }
    const currentLine = typewriterLines[currentLineIndex];
    const currentText = currentLine.substring(0, currentCharIndex);
    subtitleContext.fillText(currentText, subtitleCanvas.width / 2, typeWriterStartY + (currentLineIndex * typeWriterLineHeight));
    subtitleTexture.needsUpdate = true;
    currentCharIndex++;
    if (currentCharIndex > currentLine.length) {
      currentLineIndex++;
      currentCharIndex = 0;
    }
  }

  /**
   * Starts the typewriter effect for the given lines of text.
   */
  function startTypewriter(lines) {
    clearInterval(typewriterInterval);
    typewriterLines = lines || [];
    currentLineIndex = 0;
    currentCharIndex = 0;
    if (subtitleContext) {
      subtitleContext.clearRect(0, 0, subtitleCanvas.width, subtitleCanvas.height);
      subtitleTexture.needsUpdate = true;
    }
    typewriterInterval = setInterval(animateTypewriter, 50); // Typewriter speed (ms)
  }

  /**
   * Initializes the three.js 3D scene.
   */
  function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    textureLoader = new THREE.TextureLoader();

    // Main image plane
    const planeGeometry = new THREE.PlaneGeometry(6.5, 6.5 * (9 / 16));
    const planeMaterial = new THREE.MeshBasicMaterial({ transparent: true });
    imagePlane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(imagePlane);

    // Background color plane
    const backgroundPlaneGeometry = new THREE.PlaneGeometry(6.6, 6.6 * (9 / 16));
    const backgroundPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMaterial);
    imagePlane.add(backgroundPlane);
    backgroundPlane.position.z = -0.01;

    // Subtitle plane
    subtitleCanvas = document.createElement('canvas');
    subtitleCanvas.width = 1024;
    subtitleCanvas.height = 128;
    subtitleContext = subtitleCanvas.getContext('2d');
    subtitleContext.font = "28px 'Roboto Mono', monospace";
    subtitleContext.fillStyle = 'rgba(255, 255, 255, 0.8)';
    subtitleContext.textAlign = 'center';

    subtitleTexture = new THREE.CanvasTexture(subtitleCanvas);
    const subtitleGeometry = new THREE.PlaneGeometry(6.1, 6.1 * (subtitleCanvas.height / subtitleCanvas.width));
    const subtitleMaterial = new THREE.MeshBasicMaterial({ map: subtitleTexture, transparent: true });
    subtitlePlane = new THREE.Mesh(subtitleGeometry, subtitleMaterial);
    subtitlePlane.position.y = -2.4;
    scene.add(subtitlePlane);

    // Background particles
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    camera.position.z = 6;
  }

  const mouse = new THREE.Vector2();
  function handleUserInteraction(event) {
    // Use touch events for mobile, mouse events for desktop
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    resetIdleTimer();
  }

  // Add 3D-only event listeners for desktop
  if (!isMobileView) {
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
  }

  const clock = new THREE.Clock();
  /**
   * The main animation loop.
   */
  function animate() {
    // Stop the loop if on mobile and renderer isn't initialized
    if (isMobileView || !renderer) return;

    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    if (particleSystem) {
      particleSystem.rotation.y = elapsedTime * 0.1;
    }

    // Apply mouse parallax
    if (imagePlane) {
      const targetY = mouse.x * 0.1;
      const targetX = -mouse.y * 0.1;
      const smoothness = 0.05;
      imagePlane.rotation.y += (targetY - imagePlane.rotation.y) * smoothness;
      imagePlane.rotation.x += (targetX - imagePlane.rotation.x) * smoothness;
      subtitlePlane.rotation.copy(imagePlane.rotation);
    }

    // Apply camera follow
    const cameraSmoothness = 0.02;
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * cameraSmoothness;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * cameraSmoothness;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  /**
   * Handles window resize (for 3D scene only).
   */
  if (!isMobileView) {
    window.addEventListener('resize', () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });
  }

  // --- Start Everything ---
  if (!isMobileView) {
    try {
      init3D();
      animate();
    } catch (e) {
      console.error('Failed to initialize 3D scene:', e);
      if (canvasEl) canvasEl.style.display = 'none';
    }
  }

  updateDisplay(0);
  resetIdleTimer();
}
