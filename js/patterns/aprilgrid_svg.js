// js/patterns/aprilgrid_svg.js
// SVG generator (in millimetres) for AprilTag grid — matches the example formation.
// - ONE added black border (our own), payload-only cells
// - spacing-sized black squares at intersections, top/bottom, left/right, and corners
// - IDs row-major from startId

import { st } from '../state.js';
import { escapeXML } from '../utils.js';
import { ensureFamily } from '../apriltag.js'; // Import the shared ensureFamily

export async function generateAprilGridSVG_MM() {
  const controls = st.controls;
  const rows = Math.max(1, parseInt(controls.rows.value, 10) || 1);
  const cols = Math.max(1, parseInt(controls.cols.value, 10) || 1);

  const tagMM = Math.max(1, parseFloat(controls.apriltagTagSize.value) || 40); // interpret as mm for print
  const spacingRatio = Math.max(0, parseFloat(controls.apriltagSpacingRatio.value) || 0);
  const spacingMM = tagMM * spacingRatio;

  const familyCode = controls.apriltagFamily?.value || '36h11';
  const fam = await ensureFamily(familyCode);

  // Page (mm). If you expose page size in UI, wire those here.
  const pageW = 210, pageH = 297, margin = 10;
  const innerW = pageW - 2 * margin, innerH = pageH - 2 * margin;

  const pitchX = tagMM + spacingMM;
  const pitchY = tagMM + spacingMM;
  const gridW  = cols * tagMM + (cols - 1) * spacingMM;
  const gridH  = rows * tagMM + (rows - 1) * spacingMM;

  const originX = margin + (innerW - gridW) / 2;
  const originY = margin + (innerH - gridH) / 2;

  let svg = '';
  svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${pageW}mm" height="${pageH}mm" viewBox="0 0 ${pageW} ${pageH}">`;
  svg += `<rect x="0" y="0" width="${pageW}" height="${pageH}" fill="#fff"/>`;

  // Draw one tag at (x,y), side = tagMM
  function drawTagAt(x, y, id) {
    const mat = fam.render(id);  // N×N including library border
    const N = mat.length;
    const core = N - 2;          // payload only
    const step = tagMM / (core + 2); // our 1-cell border

    // Our single black border
    svg += `<rect x="${x}" y="${y}" width="${tagMM}" height="${tagMM}" fill="#000"/>`;

    // Inner white area
    const ix = x + step, iy = y + step, isz = tagMM - 2 * step;
    svg += `<rect x="${ix}" y="${iy}" width="${isz}" height="${isz}" fill="#fff"/>`;

    // Payload cells (only black)
    for (let r = 0; r < core; r++) {
      for (let c = 0; c < core; c++) {
        if (mat[r + 1][c + 1] === 'b') {
          const cx = x + (c + 1) * step;
          const cy = y + (r + 1) * step;
          svg += `<rect x="${cx.toFixed(4)}" y="${cy.toFixed(4)}" width="${step.toFixed(4)}" height="${step.toFixed(4)}" fill="#000"/>`;
        }
      }
    }
  }

  // IDs row-major
// js/patterns/aprilgrid_svg.js

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

  // Draw tags from start ID
  let id = Math.max(0, parseInt(controls.apriltagStart.value, 10) || 0);
  for (let rr = 0; rr < rowsSeq.length; rr++) {
    const r = rowsSeq[rr]; // 'r' is the actual row index (0 to rows-1)
    const y = originY + r * pitchY;
    let colsSeq; // This will hold the column order for the current row.

    // Determine column sequence for this row based on the selected traversal order.
    if (traversal.startsWith('snake')) {
      const isEvenRow = rr % 2 === 0; // Is this the 1st, 3rd, 5th... row we are processing?
      const ltrFirst = traversal === 'snake-ltr-first';
      colsSeq = isEvenRow ? (ltrFirst ? ltrCols : rtlCols) : (ltrFirst ? rtlCols : ltrCols);
    } else { // 'row-major-ltr' or 'row-major-rtl'
      colsSeq = (traversal === 'row-major-ltr') ? ltrCols : rtlCols;
    }

    for (const c of colsSeq) { // 'c' is the actual col index (0 to cols-1)
      const x = originX + c * pitchX;
      const currentId = id++;
      try {
        drawTagAt(x, y, currentId);
        if (controls.apriltagShowId?.checked) {
          const fontSize = Math.max(1, tagMM * 0.15);
          svg += `<text x="${x + tagMM/2}" y="${y + tagMM + fontSize}" font-family="Roboto Mono" font-size="${fontSize.toFixed(2)}" text-anchor="middle" fill="#000">${currentId}</text>`;
        }
      }
      catch {
        // visible placeholder if a render fails
        svg += `<rect x="${x}" y="${y}" width="${tagMM}" height="${tagMM}" fill="#fff" stroke="#f00" stroke-width="0.5"/>`;
        svg += `<text x="${x + tagMM/2}" y="${y + tagMM/2}" font-family="Roboto Mono" font-size="4" text-anchor="middle" fill="#f00">ID ${id-1}</text>`;
      }
    }
  }
  
  // Spacing-sized black squares
  if (spacingMM > 0) {
    const s = spacingMM;

    // Internal intersections
    if (rows > 1 && cols > 1) {
      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols - 1; j++) {
          const ix = originX + j * (tagMM + spacingMM) + tagMM;
          const iy = originY + i * (tagMM + spacingMM) + tagMM;
          svg += `<rect x="${ix}" y="${iy}" width="${s}" height="${s}" fill="#000"/>`;
        }
      }
    }
    // Top & bottom gaps (between columns)
    if (cols > 1) {
      const topY = originY - s;
      const botY = originY + gridH;
      for (let j = 0; j < cols - 1; j++) {
        const gx = originX + j * (tagMM + spacingMM) + tagMM;
        svg += `<rect x="${gx}" y="${topY}" width="${s}" height="${s}" fill="#000"/>`;
        svg += `<rect x="${gx}" y="${botY}" width="${s}" height="${s}" fill="#000"/>`;
      }
    }
    // Left & right gaps (between rows)
    if (rows > 1) {
      const leftX  = originX - s;
      const rightX = originX + gridW;
      for (let i = 0; i < rows - 1; i++) {
        const gy = originY + i * (tagMM + spacingMM) + tagMM;
        svg += `<rect x="${leftX}"  y="${gy}" width="${s}" height="${s}" fill="#000"/>`;
        svg += `<rect x="${rightX}" y="${gy}" width="${s}" height="${s}" fill="#000"/>`;
      }
    }
    // Outer corners
    svg += `<rect x="${originX - s}"   y="${originY - s}"   width="${s}" height="${s}" fill="#000"/>`;
    svg += `<rect x="${originX + gridW}" y="${originY - s}"   width="${s}" height="${s}" fill="#000"/>`;
    svg += `<rect x="${originX - s}"   y="${originY + gridH}" width="${s}" height="${s}" fill="#000"/>`;
    svg += `<rect x="${originX + gridW}" y="${originY + gridH}" width="${s}" height="${s}" fill="#000"/>`;
  }

  // Footer (optional)
  const website = 'icvfxtools.com';
  const footerSize = 4, pad = 6;
  const config = [
    `Pattern: apriltag`,
    `Grid: ${rows}x${cols} (inner)`,
    `Family: ${escapeXML(controls.apriltagFamily.value)}`,
    `Tag: ${tagMM}mm`,
    `Spacing: ${spacingMM}mm`,
    `Start: ${controls.apriltagStart.value}`
  ].join(' | ');
  svg += `<text x="${margin + pad}" y="${pageH - margin - pad}" font-family="Roboto Mono" font-size="${footerSize}" fill="#888" text-anchor="start">${escapeXML(website)}</text>`;
  svg += `<text x="${pageW - margin - pad}" y="${pageH - margin - pad}" font-family="Roboto Mono" font-size="${footerSize}" fill="#888" text-anchor="end">${escapeXML(config)}</text>`;

  svg += `</svg>`;
  return svg;
}
