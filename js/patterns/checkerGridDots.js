import { computeCellGeometry } from '../geometry.js';

export function drawChecker(ctx, W, H, rowsInner, colsInner, controls){
  const rows = rowsInner + 1, cols = colsInner + 1;
  const g = computeCellGeometry(W, H, rows, cols);
  const cell = g.cell;
  const topLeftBlack = (controls.topLeft?.value||'black')==='black';

  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      const x = Math.round(g.ox + j * cell);
      const y = Math.round(g.oy + i * cell);
      const dark=((i+j)%2===0)?topLeftBlack:!topLeftBlack;
      ctx.fillStyle = dark ? '#000' : '#fff';
      ctx.fillRect(x, y, cell, cell);
    }
  }
}

export function drawGridLines(ctx, W, H, rowsInner, colsInner, controls){
  const rows = rowsInner + 1, cols = colsInner + 1;
  const g = computeCellGeometry(W, H, rows, cols);
  const cell = g.cell;

  ctx.strokeStyle='#000'; ctx.lineWidth=2; ctx.beginPath();
  const x_start = Math.round(g.ox), x_end = Math.round(g.ox + g.gridW);
  const y_start = Math.round(g.oy), y_end = Math.round(g.oy + g.gridH);
  for(let j=1;j<cols;j++){ const x=Math.round(g.ox+j*cell); ctx.moveTo(x,y_start); ctx.lineTo(x,y_end); }
  for(let i=1;i<rows;i++){ const y=Math.round(g.oy+i*cell); ctx.moveTo(x_start,y); ctx.lineTo(x_end,y); }
  ctx.stroke();
}

export function drawDots(ctx, W, H, rowsInner, colsInner, controls){
  const rows = rowsInner + 1, cols = colsInner + 1;
  const g = computeCellGeometry(W, H, rows, cols);
  const cell = g.cell;
  const radius=(parseFloat(controls.dotRadius.value)||0.1)*cell;
  ctx.fillStyle='#000';
  for(let i=1;i<=rowsInner;i++){
    for(let j=1;j<=colsInner;j++){
      ctx.beginPath();
      ctx.arc(Math.round(g.ox+j*cell), Math.round(g.oy+i*cell), radius, 0, Math.PI*2);
      ctx.fill();
    }
  }
}
