export const st = {
  canvas: null,
  ctx: null,
  holder: null,
  controls: null,

  bitDB: null,          // aruco JSON bitsets
  AprilFamily: null,    // AprilTagFamily instance or fallback
  AprilFallback: false, // true if using SimpleTagFamily
  isDrawing: false,     // Flag to prevent re-entrant draw calls

  // convenience getters
  get dpr() { return Math.max(1, window.devicePixelRatio || 1); }
};
