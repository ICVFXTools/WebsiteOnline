import { arucoReady, drawArucoMarker } from '../aruco.js';
import { computeCellGeometry } from '../geometry.js';

export function drawCharuco(ctx, W, H, squaresY, squaresX, controls, bitDBAvailable){
  if(!arucoReady() && !bitDBAvailable){
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#f00'; ctx.textAlign='center'; ctx.font='bold 16px Roboto Mono, monospace';
    ctx.fillText('ArUco not available and JSON missing', W/2, H/2);
    return;
  }

  const g = computeCellGeometry(W, H, squaresY, squaresX);
  const cell = g.cell;

  const topLeftBlack=(controls.topLeft?.value||'black')==='black';
  for(let i=0;i<squaresY;i++){
    for(let j=0;j<squaresX;j++){
      const x = Math.round(g.ox + j * cell);
      const y = Math.round(g.oy + i * cell);
      const dark=((i+j)%2===0)?topLeftBlack:!topLeftBlack;
      ctx.fillStyle=dark?'#000':'#fff';
      ctx.fillRect(x, y, cell, cell);
    }
  }

  const placeOnBlack = controls.charucoOn.value==='black';
  const ratio = Math.min(0.85, Math.max(0.5, parseFloat(controls.charucoRatio.value)||0.7));
  const step  = Math.max(1, parseInt(controls.charucoStep.value,10)||1);
  let id      = Math.max(0, parseInt(controls.charucoStart.value,10)||0);
  const mSize = cell * ratio;
  const margin = (cell - mSize) * 0.5;
  const dictName = controls.charucoDict.value;
  const origin = controls.charucoOrigin.value; const order  = controls.charucoOrder.value;

  const rowIdx=[...Array(squaresY).keys()], colIdx=[...Array(squaresX).keys()];
  const rowsSeq = origin.includes('T') ? rowIdx : rowIdx.slice().reverse();

  // Define absolute LTR and RTL column sequences
  const ltrCols = [...Array(squaresX).keys()]; // [0, 1, ..., X-1]
  const rtlCols = ltrCols.slice().reverse();    // [X-1, ..., 0]

  for(let rr=0; rr<rowsSeq.length; rr++){
    const i = rowsSeq[rr];
    let colsSeq;

    switch(order) {
      case 'row-major-ltr':
        colsSeq = ltrCols;
        break;
      case 'row-major-rtl':
        colsSeq = rtlCols;
        break;
      case 'snake-ltr-first':
        colsSeq = (rr % 2 === 0) ? ltrCols : rtlCols;
        break;
      case 'snake-rtl-first':
        colsSeq = (rr % 2 === 0) ? rtlCols : ltrCols;
        break;
      default: // Fallback, though should not happen with proper UI
        colsSeq = ltrCols;
    }

    for(const j of colsSeq){
      const dark = ((i+j)%2===0)?topLeftBlack:!topLeftBlack;
      const shouldPlace = placeOnBlack ? dark : !dark;
      if(!shouldPlace) continue;

      const x = g.ox + j * cell + margin;
      const y = g.oy + i * cell + margin;
      drawArucoMarker(ctx, x, y, mSize, id, dictName);
      id += step;

      if (controls.charucoShowId.checked) {
        const fontSize = Math.max(8, Math.min(16, cell * 0.15));
        ctx.font = `${fontSize}px "Roboto Mono"`;
        ctx.fillStyle = placeOnBlack ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.fillText(String(id - step), x + mSize / 2, y + mSize + fontSize * 1.1);
      }
    }
  }
}
