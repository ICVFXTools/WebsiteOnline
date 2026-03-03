import { setupControls } from './dom.js';
import { loadBitDB } from './bitdb.js';
import { loadFamily } from './apriltag.js';
import { applyFixedPreview } from './geometry.js';
import { drawPreview, bindEvents } from './export.js';

async function init() {
  setupControls();                 // wires up DOM references into state
  await loadBitDB();               // loads img/aruco_bitmaps.json if present
  applyFixedPreview();             // sets canvas size to fixed aspect
  await loadFamily();              // loads default AprilTag family from select
  await drawPreview();             // first render
  bindEvents();                    // all input, resize, download, family change
}

init().catch(err => console.error('Initialization failed:', err));
