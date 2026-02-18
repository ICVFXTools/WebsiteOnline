import { st } from './state.js';

class SimpleTagFamily{
  constructor(size=6){ this.size=size; }
  render(id){
    const N=this.size;
    const m=Array.from({length:N},()=>Array(N).fill('w'));
    let seed=(id>>>0)^0x9E3779B9; const step=1664525, inc=1013904223;
    const next=()=> (seed=(Math.imul(seed,step)+inc)>>>0);
    for(let r=0;r<N;r++){
      for(let c=0;c<N;c++){
        if(r===0||c===0||r===N-1||c===N-1){ m[r][c]=((r+c)&1)?'b':'w'; continue; }
        m[r][c]=(next()&1)?'b':'w';
      }
    }
    return m;
  }
}

// Local cache for families (so SVG can work even if app’s loader didn’t run)
const _svgFamilies = new Map();

export async function ensureFamily(code = '36h11') {
  if (_svgFamilies.has(code)) return _svgFamilies.get(code);
  // If the family is already loaded in global state, use that and cache it.
  if (st?.AprilFamily && st.controls?.apriltagFamily?.value === code) {
    _svgFamilies.set(code, st.AprilFamily);
    return st.AprilFamily;
  }
  if (!window.AprilTagFamily) throw new Error('AprilTagFamily class not found (apriltag browser.js not loaded).');

  const url = `https://cdn.jsdelivr.net/npm/apriltag@latest/families/${code}.json`;
  const rsp = await fetch(url, { cache: 'force-cache' });
  if (!rsp.ok) throw new Error(`Failed to load AprilTag family JSON: ${code}`);
  const fam = new window.AprilTagFamily(await rsp.json());
  _svgFamilies.set(code, fam);
  return fam;
}

export async function loadFamily(code) {
  st.AprilFamily = null;
  st.AprilFallback = false;
  const famCode = code || st.controls.apriltagFamily.value;

  try {
    // Use the more robust ensureFamily logic, which includes a cache.
    st.AprilFamily = await ensureFamily(famCode);
    st.controls.aprilOffline.classList.add('hidden');
  } catch(e){
    console.error('Failed to load AprilTag family:', famCode, e);
    st.AprilFamily = new SimpleTagFamily(6); // Use a fallback
    st.AprilFallback = true;
    st.controls.aprilOffline.classList.remove('hidden');
  }
}

// REPLACE the existing drawAprilTagMatrix with this
export function drawAprilTagMatrix(ctx, x, y, sizePx, matrix){
  // matrix is N×N including the library's own 1-cell border
  const N = matrix.length;
  const core = N - 2;                         // payload only
  const step = sizePx / (core + 2);           // our single border thickness (one cell)

  const x0 = Math.round(x);
  const y0 = Math.round(y);
  const x1 = Math.round(x + sizePx);
  const y1 = Math.round(y + sizePx);

  // Our single outer black border
  ctx.fillStyle = '#000';
  ctx.fillRect(x0, y0, x1 - x0, y1 - y0);

  // Inner white area (everything inside our border)
  const innerX = Math.round(x + step);
  const innerY = Math.round(y + step);
  const innerW = Math.round(x + sizePx - step) - innerX;
  const innerH = Math.round(y + sizePx - step) - innerY;
  ctx.fillStyle = '#fff';
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // Draw ONLY BLACK payload cells from matrix[1..core][1..core]
  ctx.fillStyle = '#000';
  for (let r = 0; r < core; r++) {
    const py = Math.round(y + (r + 1) * step);
    const ph = Math.round(y + (r + 2) * step) - py;
    for (let c = 0; c < core; c++) {
      if (matrix[r + 1][c + 1] === 'b' || matrix[r + 1][c + 1] === 1) {
        const px = Math.round(x + (c + 1) * step);
        const pw = Math.round(x + (c + 2) * step) - px;
        ctx.fillRect(px, py, pw, ph);
      }
    }
  }
}
