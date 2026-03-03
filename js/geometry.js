import { st } from './state.js';
import { generateConfigString } from './ui.js';

export function applyFixedPreview(){
  const aw = Math.max(1, parseInt(st.controls.aspectW.value, 10) || 16);
  const ah = Math.max(1, parseInt(st.controls.aspectH.value, 10) || 9);
  document.documentElement.style.setProperty('--aspect-w', `${aw}`);
  document.documentElement.style.setProperty('--aspect-h', `${ah}`);

  const r = st.holder.getBoundingClientRect();
  st.canvas.width  = Math.max(1, Math.round(r.width  * st.dpr));
  st.canvas.height = Math.max(1, Math.round(r.height * st.dpr));
  st.ctx.setTransform(1, 0, 0, 1, 0, 0);
  st.ctx.clearRect(0, 0, st.canvas.width, st.canvas.height);
}

export function getExportSize(){
  const w = Math.max(320, parseInt(st.controls.outputW.value, 10) || 1920);
  const aw = Math.max(1, parseInt(st.controls.aspectW.value, 10) || 16);
  const ah = Math.max(1, parseInt(st.controls.aspectH.value, 10) || 9);
  const h = Math.round(w * (ah / aw));
  return { w, h, name: `${w}x${h}` };
}

export function computeCellGeometry(w, h, rows, cols){
  const cell = Math.max(1, parseInt(st.controls.cellSize.value, 10) || 50);
  const gridW = cols * cell;
  const gridH = rows * cell;
  const ox = (w - gridW) / 2;
  const oy = (h - gridH) / 2;
  return { w, h, cell, gridW, gridH, ox, oy };
}

export function buildGridGeometry(startX, startY, rows, cols, tagPx, spacePx){
  const round = Math.round;
  const colLefts = new Array(cols), colRights = new Array(cols);
  const rowTops = new Array(rows), rowBottoms = new Array(rows);

  for(let c=0;c<cols;c++){
    const L = round(startX + c*(tagPx + spacePx));
    const R = round(L + tagPx);
    colLefts[c] = L; colRights[c] = R;
  }
  for(let r=0;r<rows;r++){
    const T = round(startY + r*(tagPx + spacePx));
    const B = round(T + tagPx);
    rowTops[r] = T; rowBottoms[r] = B;
  }
  return {colLefts, colRights, rowTops, rowBottoms};
}

export function clearCanvas(ctx, w, h){
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
}

export function drawFooterText(ctx, w, h){
  const configString = generateConfigString();
  const website = 'icvfxtools.com';
  const scale = w / 1920;
  const fontSize = Math.max(12, 16 * scale);
  const padding = Math.max(15, Math.round(fontSize * 1.2));

  ctx.font = `${fontSize}px "Roboto Mono"`;
  ctx.fillStyle = '#888';
  ctx.textAlign = 'left';
  ctx.fillText(website, padding, h - padding);
  ctx.textAlign = 'right';
  ctx.fillText(configString, w - padding, h - padding);
}
