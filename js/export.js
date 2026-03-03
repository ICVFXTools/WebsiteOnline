// js/export.js
import { st } from './state.js';
import { updateUI, generateConfigString } from './ui.js';
import { applyFixedPreview, getExportSize, clearCanvas, drawFooterText, computeCellGeometry } from './geometry.js';
import { drawChecker, drawGridLines, drawDots } from './patterns/checkerGridDots.js';
import { drawCharuco } from './patterns/charuco.js';
import { drawAprilGrid } from './patterns/aprilgrid.js';
import { escapeXML } from './utils.js';

let drawCount = 0;
export async function drawPreview() {
  // Prevent re-entrant calls. If a draw is already in progress, skip this one.
  if (st.isDrawing) return;

  updateUI();

  const { w: exportW, h: exportH } = getExportSize();
  const previewW = st.canvas.width;
  if (previewW === 0 || exportW === 0) return;

  const scale = previewW / exportW;
  const currentDraw = ++drawCount;

  st.isDrawing = true; // Set the drawing flag
  try {
    console.log(`[Draw #${currentDraw}] Start: Drawing pattern '${st.controls.pattern.value}'`);
    st.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    await drawExport(st.ctx, exportW, exportH);
  } catch (e) {
    console.error('Error during preview draw:', e);
    st.ctx.setTransform(1, 0, 0, 1, 0, 0);
    st.ctx.clearRect(0, 0, st.canvas.width, st.canvas.height);
    st.ctx.fillStyle = 'red';
    st.ctx.font = '20px "Roboto Mono"';
    st.ctx.textAlign = 'center';
    st.ctx.fillText('Draw Error', st.canvas.width / 2, st.canvas.height / 2);
  } finally {
    st.ctx.setTransform(1, 0, 0, 1, 0, 0);
    st.isDrawing = false; // Clear the flag when done
    console.log(`[Draw #${currentDraw}] End: Drawing finished.`);
  }
}

export async function drawExport(targetCtx, W, H) {
  const t = st.controls.pattern.value;
  const minInner = (t === 'apriltag') ? 1 : 2;
  const rIn = Math.max(minInner, parseInt(st.controls.rows.value, 10) || minInner);
  const cIn = Math.max(minInner, parseInt(st.controls.cols.value, 10) || minInner);

  clearCanvas(targetCtx, W, H);

  if (t === 'checkerboard') {
    drawChecker(targetCtx, W, H, rIn, cIn, st.controls);
  } else if (t === 'grid') {
    drawGridLines(targetCtx, W, H, rIn, cIn, st.controls);
  } else if (t === 'dots') {
    drawDots(targetCtx, W, H, rIn, cIn, st.controls);
  } else if (t === 'charuco') {
    await drawCharuco(targetCtx, W, H, rIn + 1, cIn + 1, st.controls, !!st.bitDB);
  } else if (t === 'apriltag') {
    await drawAprilGrid(targetCtx, W, H, rIn, cIn, st.controls);
  }

  drawFooterText(targetCtx, W, H);
}

export function bindEvents() {
  const redrawIds = [
    'pattern', 'rows', 'cols', 'cell-size', 'dot-radius', 'top-left',
    'charuco-dict', 'charuco-ratio', 'charuco-start', 'charuco-on',
    'charuco-origin', 'charuco-order', 'charuco-step',
    'charuco-show-id',
    'apriltag-start', 'apriltag-origin', 'apriltag-order',
    'apriltag-tag-size', 'apriltag-spacing-ratio', 'apriltag-show-id',
    'apriltag-show-intersections', 'apriltag-intersection-px', 'output-w'
  ];

  const resizeIds = ['aspect-w', 'aspect-h'];

  redrawIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    ['input', 'change'].forEach(evt => el.addEventListener(evt, drawPreview));
  });

  resizeIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    ['input', 'change'].forEach(evt => el.addEventListener(evt, () => {
      applyFixedPreview();
      drawPreview();
    }));
  });

  st.controls.apriltagFamily.addEventListener('change', async () => {
    const mod = await import('./apriltag.js');
    await mod.loadFamily(st.controls.apriltagFamily.value);
    drawPreview();
  });

  st.controls.generate.addEventListener('click', () => { applyFixedPreview(); drawPreview(); });
  window.addEventListener('resize', () => { applyFixedPreview(); drawPreview(); });

  // PNG export
  st.controls.dlPng.addEventListener('click', async () => {
    const { w, h, name } = getExportSize();
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = w;
    exportCanvas.height = h;
    const exportCtx = exportCanvas.getContext('2d');

    st.controls.dlPng.disabled = true;
    st.controls.dlPng.textContent = 'Generating...';

    await drawExport(exportCtx, w, h);

    const a = document.createElement('a');
    a.download = `calibration-${st.controls.pattern.value}-${st.controls.rows.value}x${st.controls.cols.value}-${name}.png`;
    a.href = exportCanvas.toDataURL('image/png');
    a.click();

    st.controls.dlPng.disabled = false;
    st.controls.dlPng.textContent = 'PNG';
  });

  // SVG export (checkerboard/grid/dots + apriltag)
  st.controls.dlSvg.addEventListener('click', async () => {
    const t = st.controls.pattern.value;

    if (t === 'apriltag') {
      // Print-accurate SVG in millimetres (with gap/intersection squares sized to spacing)
      try {
        const mod = await import('./patterns/aprilgrid_svg.js');
        const svg = await mod.generateAprilGridSVG_MM();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `calibration-apriltag-${st.controls.rows.value}x${st.controls.cols.value}.svg`;
        a.href = url; a.click(); URL.revokeObjectURL(url);
      } catch (e) {
        console.error('AprilTag SVG generation failed:', e);
        alert('Failed to generate AprilTag SVG.');
      }
      return;
    }

    if (t === 'charuco') return; // still no SVG for ChArUco

    // Existing SVG flow for checkerboard / grid / dots (pixel-based)
    const { w, h, name } = getExportSize();
    const rows = Math.max(2, parseInt(st.controls.rows.value, 10) || 0) + 1;
    const cols = Math.max(2, parseInt(st.controls.cols.value, 10) || 0) + 1;

    const g = computeCellGeometry(w, h, rows, cols);
    const { cell, ox, oy, gridW, gridH } = g;

    let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="white"/>`;

    if (t === 'checkerboard') {
      const topLeftBlack = (st.controls.topLeft?.value || 'black') === 'black';
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const dark = ((i + j) % 2 === 0) ? topLeftBlack : !topLeftBlack;
          if (dark) {
            svg += `<rect x="${ox + j * cell}" y="${oy + i * cell}" width="${cell}" height="${cell}" fill="black"/>`;
          }
        }
      }
    } else if (t === 'grid') {
      svg += `<g stroke="black" stroke-width="2">`;
      const y_start = oy, y_end = oy + gridH;
      const x_start = ox, x_end = ox + gridW;
      for (let j = 1; j < cols; j++) { const x = ox + j * cell; svg += `<line x1="${x}" y1="${y_start}" x2="${x}" y2="${y_end}"/>`; }
      for (let i = 1; i < rows; i++) { const y = oy + i * cell; svg += `<line x1="${x_start}" y1="${y}" x2="${x_end}" y2="${y}"/>`; }
      svg += `</g>`;
    } else if (t === 'dots') {
      const r = (parseFloat(st.controls.dotRadius.value) || 0.1) * cell;
      svg += `<g fill="black">`;
      const rIn = Math.max(2, parseInt(st.controls.rows.value, 10) || 0);
      const cIn = Math.max(2, parseInt(st.controls.cols.value, 10) || 0);
      for (let i = 1; i <= rIn; i++) for (let j = 1; j <= cIn; j++) {
        svg += `<circle cx="${ox + j * cell}" cy="${oy + i * cell}" r="${r}"/>`;
      }
      svg += `</g>`;
    }

    const configString = generateConfigString();
    const website = 'icvfxtools.com';
    const scale = w / 1920;
    const fontSize = Math.max(12, 16 * scale);
    const padding = Math.max(15, Math.round(fontSize * 1.2));

    svg += `<text x="${padding}" y="${h - padding}" font-family="Roboto Mono" font-size="${fontSize}" fill="#888" text-anchor="start">${escapeXML(website)}</text>`;
    svg += `<text x="${w - padding}" y="${h - padding}" font-family="Roboto Mono" font-size="${fontSize}" fill="#888" text-anchor="end">${escapeXML(configString)}</text>`;
    svg += `</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `calibration-${t}-${st.controls.rows.value}x${st.controls.cols.value}-${name}.svg`;
    a.href = url; a.click(); URL.revokeObjectURL(url);
  });
}
