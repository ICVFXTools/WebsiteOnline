// js/patterns/aprilgrid.js
// Canvas preview for AprilTag Grid — matches the example:
// - ONE added black border (our own) around payload
import { st } from '../state.js';
import { ensureFamily } from '../apriltag.js'; // Use the shared ensureFamily
import { buildGridGeometry } from '../geometry.js';
// - payload only (drop library’s built-in 1-cell border)
// - spacing-sized black squares at intersections, top/bottom, left/right, and corners

// Public API: draw the full AprilTag grid on canvas
export async function drawAprilGrid(ctx, w, h, rows, cols, controls) {
  const familyCode = (controls.apriltagFamily?.value) || '36h11';
  const fam = await ensureFamily(familyCode); // Use the shared ensureFamily

  // Tag size and spacing in CANVAS PX
  const tagPx = Math.max(1, parseInt(controls.apriltagTagSize?.value, 10) || 40);
  const spacingRatio = Math.max(0, parseFloat(controls.apriltagSpacingRatio?.value) || 0);
  const spacePx = tagPx * spacingRatio;

  // Center the grid
  const gridWpx = cols * tagPx + (cols - 1) * spacePx;
  const gridHpx = rows * tagPx + (rows - 1) * spacePx;
  const startX = (w - gridWpx) / 2;
  const startY = (h - gridHpx) / 2;

  const { colLefts, colRights, rowTops, rowBottoms } =
    buildGridGeometry(startX, startY, rows, cols, tagPx, spacePx);

  // Import the shared drawing function.
  const { drawAprilTagMatrix } = await import('../apriltag.js');

  const origin = controls.apriltagOrigin.value;
  const traversal = controls.apriltagOrder.value;

  // --- Traversal Logic ---
  const rowIdx = [...Array(rows).keys()];
  const colIdx = [...Array(cols).keys()];

  // Determine the order of rows to iterate through.
  const rowsSeq = origin.includes('T') ? rowIdx : rowIdx.slice().reverse();

  // Define the two possible column traversals.
  const ltrCols = colIdx; // Left-to-Right: [0, 1, 2, ...]
  const rtlCols = colIdx.slice().reverse(); // Right-to-Left: [..., 2, 1, 0]

  // Draw tags row-major from start ID
  let id = Math.max(0, parseInt(controls.apriltagStart?.value, 10) || 0);
  for (let rr = 0; rr < rowsSeq.length; rr++) {
    const r = rowsSeq[rr];
    let colsSeq; // This will hold the column order for the current row.

    // Determine column sequence for this row based on the selected traversal order.
    if (traversal.startsWith('snake')) {
      const isEvenRow = rr % 2 === 0; // Is this the 1st, 3rd, 5th... row we are processing?
      const ltrFirst = traversal === 'snake-ltr-first';
      colsSeq = isEvenRow ? (ltrFirst ? ltrCols : rtlCols) : (ltrFirst ? rtlCols : ltrCols);
    } else { // 'row-major-ltr' or 'row-major-rtl'
      colsSeq = (traversal === 'row-major-ltr') ? ltrCols : rtlCols;
    }

    for (const c of colsSeq) {
      const x = colLefts[c];
      const y = rowTops[r];
      const wTag = colRights[c] - colLefts[c];
      const hTag = rowBottoms[r] - rowTops[r];
      const currentId = id++;

      try {
        const matrix = fam.render(currentId); // N×N of 'b'/'w'
        drawAprilTagMatrix(ctx, x, y, Math.min(wTag, hTag), matrix);

        if (controls.apriltagShowId?.checked) {
          const fontSize = Math.max(8, Math.min(16, tagPx * 0.15));
          ctx.font = `${fontSize}px "Roboto Mono"`;
          ctx.fillStyle = '#000'; ctx.textAlign = 'center';
          ctx.fillText(String(currentId), x + wTag / 2, y + hTag + fontSize * 1.1);
        }
      } catch (e) {
        // Visual error box, in case the render fails
        ctx.fillStyle = '#fff'; ctx.fillRect(x, y, wTag, hTag);
        ctx.strokeStyle = '#f00'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, wTag - 1, hTag - 1);
        ctx.fillStyle = '#f00'; ctx.font = 'bold 10px Roboto Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillText(`ID ${currentId}`, x + wTag / 2, y + hTag / 2);
      }
    }
  }

  // Gap/intersection/corner squares (size = spacing), gated by checkbox if present
  const showSquares = controls.apriltagShowIntersections?.checked;
  if (!showSquares || spacePx <= 0) return;

  // Use the dedicated intersection size control, not the spacing value.
  const s = Math.max(1, parseInt(controls.apriltagIntersectionPx?.value, 10) || 5);
  ctx.fillStyle = '#000';
  const s_half = s / 2;

  // 1) Internal intersections
  if (rows > 1 && cols > 1) {
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const ix = colRights[c] + spacePx / 2; // Center of horizontal gap
        const iy = rowBottoms[r] + spacePx / 2; // Center of vertical gap
        ctx.fillRect(Math.round(ix - s_half), Math.round(iy - s_half), s, s);
      }
    }
  }

  // 2) Top & bottom gaps (between columns)
  if (cols > 1) {
    const topY = rowTops[0] - spacePx / 2;       // Center of top gap
    const botY = rowBottoms[rows - 1] + spacePx / 2; // Center of bottom gap
    for (let c = 0; c < cols - 1; c++) {
      const gx = colRights[c] + spacePx / 2;     // Center of horizontal gap
      ctx.fillRect(Math.round(gx - s_half), Math.round(topY - s_half), s, s);
      ctx.fillRect(Math.round(gx - s_half), Math.round(botY - s_half), s, s);
    }
  }

  // 3) Left & right gaps (between rows)
  if (rows > 1) {
    const leftX  = colLefts[0] - spacePx / 2;    // Center of left gap
    const rightX = colRights[cols - 1] + spacePx / 2; // Center of right gap
    for (let r = 0; r < rows - 1; r++) {
      const gy = rowBottoms[r] + spacePx / 2;    // Center of vertical gap
      ctx.fillRect(Math.round(leftX - s_half),  Math.round(gy - s_half), s, s);
      ctx.fillRect(Math.round(rightX - s_half), Math.round(gy - s_half), s, s);
    }
  }

  // 4) Outer corners
  const corners = [
    { x: colLefts[0] - spacePx / 2,          y: rowTops[0] - spacePx / 2 },
    { x: colRights[cols - 1] + spacePx / 2,  y: rowTops[0] - spacePx / 2 },
    { x: colLefts[0] - spacePx / 2,          y: rowBottoms[rows - 1] + spacePx / 2 },
    { x: colRights[cols - 1] + spacePx / 2,  y: rowBottoms[rows - 1] + spacePx / 2 },
  ];
  for (const c of corners) {
    ctx.fillRect(Math.round(c.x - s_half), Math.round(c.y - s_half), s, s);
  }
}
