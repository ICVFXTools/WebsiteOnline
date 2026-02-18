import { st } from './state.js';
import { getJsonBits } from './bitdb.js';

export function arucoReady(){
  return typeof window !== 'undefined' && window.AR && window.AR.DICTIONARIES;
}

function getArucoDictCode(name){
  const AR = window.AR;
  if(!AR) return undefined;
  const map = {
    '4x4_50':AR.DICT_4X4_50, '4x4_100':AR.DICT_4X4_100, '4x4_250':AR.DICT_4X4_250,
    '5x5_100':AR.DICT_5X5_100, '6x6_250':AR.DICT_6X6_250, '7x7_1000':AR.DICT_7X7_1000
  };
  return map[name];
}

export function drawBitsMarkerCanvas(ctx, x, y, sizePx, bits){
  const n = bits.length; const cells = n + 2; const cell = sizePx / cells;
  const x0 = Math.round(x); const y0 = Math.round(y);
  const x_end = Math.round(x + sizePx); const y_end = Math.round(y + sizePx);
  ctx.fillStyle='#000'; ctx.fillRect(x0, y0, x_end - x0, y_end - y0);
  const x1 = Math.round(x + cell); const y1 = Math.round(y + cell);
  const x_n1 = Math.round(x + (cells-1) * cell); const y_n1 = Math.round(y + (cells-1) * cell);
  ctx.fillStyle='#fff'; ctx.fillRect(x1, y1, x_n1 - x1, y_n1 - y1);
  ctx.fillStyle='#000';
  for(let r=0;r<n;r++){
    const py = Math.round(y + (r+1) * cell);
    const ph = Math.round(y + (r+2) * cell) - py;
    for(let c=0;c<n;c++){
      if(bits[r][c]===1){
        const px = Math.round(x + (c+1) * cell);
        const pw = Math.round(x + (c+2) * cell) - px;
        ctx.fillRect(px, py, pw, ph);
      }
    }
  }
}

export function drawArucoMarker(ctx,x,y,sizePx,id,dictName){
  const bits=getJsonBits(dictName,id);
  if(bits){ drawBitsMarkerCanvas(ctx,x,y,sizePx,bits); return; }

  const AR=window.AR;
  if(!AR||!AR.DICTIONARIES){
    ctx.fillStyle='#f00'; ctx.font='bold 10px Roboto Mono, monospace'; ctx.textAlign='center';
    ctx.fillText('ArUco missing', x+sizePx/2, y+sizePx/2); return;
  }
  const dictCode=getArucoDictCode(dictName);
  const dict=AR.DICTIONARIES[dictCode];
  if(!dict){ ctx.fillStyle='#f00'; ctx.fillText('Dict?', x+sizePx/2, y+sizePx/2); return; }

  const raw=dict.getMarkerBits(id);
  if(!raw){ ctx.fillStyle='#f00'; ctx.fillText('ID out', x+sizePx/2, y+sizePx/2); return; }

  const N=Math.sqrt(raw.length); const module=sizePx/N;
  for(let r=0;r<N;r++){
    const py = Math.round(y + r * module);
    const ph = Math.round(y + (r+1) * module) - py;
    for(let c=0;c<N;c++){
      const px = Math.round(x + c * module);
      const pw = Math.round(x + (c+1) * module) - px;
      ctx.fillStyle=(raw[r*N + c]===1)?'#000':'#fff';
      ctx.fillRect(px, py, pw, ph);
    }
  }
}
