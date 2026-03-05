const SX40_TABLE = {
  24: { standard: 9.0, ull: 9.0 },
  25: { standard: 9.0, ull: 9.0 },
  30: { standard: 9.0, ull: 9.0 },
  48: { standard: 9.0, ull: 5.625 },
  50: { standard: 9.0, ull: 5.4 },
  60: { standard: 9.0, ull: 4.5 },
  72: { standard: 7.5, ull: 3.75 },
  100: { standard: 5.4, ull: 2.7 },
  120: { standard: 4.5, ull: 2.25 },
  144: { standard: 3.75, ull: 1.875 },
  150: { standard: 3.6, ull: 1.8 },
  180: { standard: 3.0, ull: 1.5 },
  192: { standard: 2.8125, ull: 1.40625 },
  200: { standard: 2.7, ull: 1.35 },
  240: { standard: 2.25, ull: 1.125 },
  250: { standard: 2.16, ull: 1.08 }
};

const S8_TABLE = {
  24: { standard: { 8: 4.5, 10: 4.5, 12: 4.5 }, ull: { 8: 4.5, 10: 4.2, 12: 3.5 } },
  25: { standard: { 8: 4.5, 10: 4.5, 12: 4.5 }, ull: { 8: 4.5, 10: 4.032, 12: 3.36 } },
  30: { standard: { 8: 4.5, 10: 4.5, 12: 4.5 }, ull: { 8: 4.2, 10: 3.36, 12: 2.8 } },
  48: { standard: { 8: 4.5, 10: 4.2, 12: 3.5 }, ull: { 8: 2.625, 10: 2.1, 12: 1.75 } },
  50: { standard: { 8: 4.5, 10: 4.032, 12: 3.36 }, ull: { 8: 2.52, 10: 2.016, 12: 1.68 } },
  60: { standard: { 8: 4.2, 10: 3.36, 12: 2.8 }, ull: { 8: 2.1, 10: 1.68, 12: 1.4 } },
  72: { standard: { 8: 3.5, 10: 2.8, 12: 2.333328 }, ull: { 8: 1.75, 10: 1.4, 12: 1.166664 } },
  100: { standard: { 8: 2.52, 10: 2.016, 12: 1.68 }, ull: { 8: 1.26, 10: 1.008, 12: 0.84 } },
  120: { standard: { 8: 2.1, 10: 1.68, 12: 1.4 }, ull: { 8: 1.05, 10: 0.84, 12: 0.7 } },
  144: { standard: { 8: 1.75, 10: 1.4, 12: 1.166664 }, ull: { 8: 0.875, 10: 0.7, 12: 0.583328 } },
  150: { standard: { 8: 1.68, 10: 1.344, 12: 1.12 }, ull: { 8: 0.84, 10: 0.672, 12: 0.56 } },
  180: { standard: { 8: 1.4, 10: 1.12, 12: 0.933328 }, ull: { 8: 0.7, 10: 0.56, 12: 0.466664 } },
  192: { standard: { 8: 1.312496, 10: 1.05, 12: 0.875 }, ull: { 8: 0.656248, 10: 0.525, 12: 0.437496 } },
  200: { standard: { 8: 1.26, 10: 1.008, 12: 0.84 }, ull: { 8: 0.63, 10: 0.504, 12: 0.42 } },
  240: { standard: { 8: 1.05, 10: 0.84, 12: 0.7 }, ull: { 8: 0.525, 10: 0.42, 12: 0.35 } },
  250: { standard: { 8: 1.008, 10: 0.8064, 12: 0.672 }, ull: { 8: 0.504, 10: 0.4032, 12: 0.336 } }
};

// Brompton SQ200 total processor capacity (MPix) per FPS - derived as 4× SX40 standard, capped at 36 MPix.
// ULL = half of standard (same ratio as SX40).
const SQ200_TABLE = {
  24:  { standard: 36,    ull: 18     },
  25:  { standard: 36,    ull: 18     },
  30:  { standard: 36,    ull: 18     },
  48:  { standard: 36,    ull: 18     },
  50:  { standard: 36,    ull: 18     },
  60:  { standard: 36,    ull: 18     },
  72:  { standard: 30,    ull: 15     },
  100: { standard: 21.6,  ull: 10.8   },
  120: { standard: 18,    ull: 9      },
  144: { standard: 15,    ull: 7.5    },
  150: { standard: 14.4,  ull: 7.2    },
  180: { standard: 12,    ull: 6      },
  192: { standard: 11.25, ull: 5.625  },
  200: { standard: 10.8,  ull: 5.4    },
  240: { standard: 9,     ull: 4.5    },
  250: { standard: 8.64,  ull: 4.32   }
};

const FPS_OPTIONS = ['23.976', '24', '25', '29.97', '30', '48', '50', '59.94', '60', '72', '100', '120', '144', '150', '180', '192', '200', '240', '250'];
const PERF_FPS_KEYS = Object.keys(SX40_TABLE).map((k) => Number.parseInt(k, 10));
const SX40_UPLINK_PORTS = 4;
const XD_DOWNLINK_PORTS = 10;
const XD_MAX_PANELS_PER_PORT = 500;
const MAX_REGIONS_PER_NODE = 4;

// SX40 supported input groupings: max single-input resolution at each fps ceiling.
// Sorted descending by maxHz so lookup finds the tightest match first.
const SX40_INPUT_GROUPS = [
  { maxHz: 60,  w: 4096, h: 2160, label: '4K DCI' },
  { maxHz: 100, w: 3072, h: 1728, label: '3K' },
  { maxHz: 120, w: 2800, h: 1575, label: '2.8K' },
  { maxHz: 144, w: 2560, h: 1440, label: 'QHD' },
  { maxHz: 250, w: 1920, h: 1080, label: 'Full HD' }
];

function getSX40MaxInput(fps) {
  const hz = parseFloat(fps) || 24;
  for (const g of SX40_INPUT_GROUPS) {
    if (hz <= g.maxHz) return g;
  }
  return SX40_INPUT_GROUPS[SX40_INPUT_GROUPS.length - 1];
}

// Shared input group table for HELIOS and SQ200: 8K at ≤60Hz, then reduces at higher FPS.
// SQ200 supports all entries; HELIOS only uses entries whose maxHz is a valid HELIOS FPS.
const SQ200_HELIOS_INPUT_GROUPS = [
  { maxHz: 60,  w: 7680, h: 4320, label: '8K' },
  { maxHz: 120, w: 4096, h: 2160, label: '4K DCI' },
  { maxHz: 200, w: 3072, h: 1728, label: '3K' },
  { maxHz: 240, w: 2800, h: 1575, label: '2.8K' },
  { maxHz: 250, w: 2560, h: 1440, label: 'QHD' }
];

function getSQ200HeliosMaxInput(fps) {
  const hz = parseFloat(fps) || 24;
  for (const g of SQ200_HELIOS_INPUT_GROUPS) {
    if (hz <= g.maxHz) return g;
  }
  return SQ200_HELIOS_INPUT_GROUPS[SQ200_HELIOS_INPUT_GROUPS.length - 1];
}

// Returns the active input group for the given processor profile and fps, or null if none applies.
function getInputGroup(profile, fps) {
  const reg = PROCESSOR_REGISTRY[profile];
  if (!reg?.hasInputGroups) return null;
  return (reg.inputGroupsFn || getSX40MaxInput)(fps);
}

// Brompton XD pixel capacity per 1G output port (from provided table).
const XD_PORT_TABLE = {
  24: { standard: { 8: 1312500, 10: 1050000, 12: 875000 }, ull: { 8: 656250, 10: 525000, 12: 437500 } },
  25: { standard: { 8: 1260000, 10: 1008000, 12: 840000 }, ull: { 8: 630000, 10: 504000, 12: 420000 } },
  30: { standard: { 8: 1050000, 10: 840000, 12: 700000 }, ull: { 8: 525000, 10: 420000, 12: 350000 } },
  48: { standard: { 8: 656250, 10: 525000, 12: 437500 }, ull: { 8: 328125, 10: 262500, 12: 218750 } },
  50: { standard: { 8: 630000, 10: 504000, 12: 420000 }, ull: { 8: 315000, 10: 252000, 12: 210000 } },
  60: { standard: { 8: 525000, 10: 420000, 12: 350000 }, ull: { 8: 262500, 10: 210000, 12: 175000 } },
  72: { standard: { 8: 437500, 10: 350000, 12: 291666 }, ull: { 8: 218750, 10: 175000, 12: 145833 } },
  100: { standard: { 8: 315000, 10: 252000, 12: 210000 }, ull: { 8: 157500, 10: 126000, 12: 105000 } },
  120: { standard: { 8: 262500, 10: 210000, 12: 175000 }, ull: { 8: 131250, 10: 105000, 12: 87500 } },
  144: { standard: { 8: 218750, 10: 175000, 12: 145833 }, ull: { 8: 109375, 10: 87500, 12: 72916 } },
  150: { standard: { 8: 210000, 10: 168000, 12: 140000 }, ull: { 8: 105000, 10: 84000, 12: 70000 } },
  180: { standard: { 8: 175000, 10: 140000, 12: 116666 }, ull: { 8: 87500, 10: 70000, 12: 58333 } },
  192: { standard: { 8: 164062, 10: 131250, 12: 109375 }, ull: { 8: 82031, 10: 65625, 12: 54687 } },
  200: { standard: { 8: 157500, 10: 126000, 12: 105000 }, ull: { 8: 78750, 10: 63000, 12: 52500 } },
  240: { standard: { 8: 131250, 10: 105000, 12: 87500 }, ull: { 8: 65625, 10: 52500, 12: 43750 } },
  250: { standard: { 8: 126000, 10: 100800, 12: 84000 }, ull: { 8: 63000, 10: 50400, 12: 42000 } }
};

// Megapixel HELIOS constants
const HELIOS_MAX_MPIX = 35;
const HELIOS_FIBER_PORTS = 8;
const HELIOS_ETH_PORTS_PER_SWITCH = 12; // RP12: 12 × 1G ports per switch

// HELIOS pixel capacity per 1G Ethernet port (Switch to Tiles, 1G).
// Source: HELIOS User Guide J.15 Output Port Capacity table.
// 8-bit column absent from spec - using 10-bit values (conservative).
const HELIOS_SWITCH_PORT_TABLE = {
  24:  { 8: 1275000, 10: 1275000, 12: 1062500 },
  25:  { 8: 1225000, 10: 1225000, 12: 1020000 },
  30:  { 8: 1020000, 10: 1020000, 12: 850000  },
  48:  { 8: 635000,  10: 635000,  12: 531000  },
  50:  { 8: 610000,  10: 610000,  12: 510000  },
  60:  { 8: 510000,  10: 510000,  12: 425000  },
  72:  { 8: 425000,  10: 425000,  12: 354000  }, // interpolated (60/72 scale)
  120: { 8: 240000,  10: 240000,  12: 200000  },
  144: { 8: 195000,  10: 195000,  12: 160000  },
  240: { 8: 100000,  10: 100000,  12: 90000   }
};

// HELIOS per-fiber output capacity (HELIOS to Switch, 10G link) in MPix.
// Capped at 8.5 MPix per port per spec (NOTE in table).
const HELIOS_FIBER_PORT_TABLE = {
  24:  { 8: 8.5,   10: 8.5,   12: 8.5    },
  25:  { 8: 8.5,   10: 8.5,   12: 8.5    },
  30:  { 8: 8.5,   10: 8.5,   12: 8.5    },
  48:  { 8: 6.35,  10: 6.35,  12: 5.3125 },
  50:  { 8: 6.1,   10: 6.1,   12: 5.1    },
  60:  { 8: 5.1,   10: 5.1,   12: 4.25   },
  72:  { 8: 4.25,  10: 4.25,  12: 3.54   }, // interpolated (60/72 scale)
  120: { 8: 2.4,   10: 2.4,   12: 2.0    },
  144: { 8: 1.95,  10: 1.95,  12: 1.6    },
  240: { 8: 1.0,   10: 1.0,   12: 0.9    }
};

const HELIOS_FPS_KEYS = [24, 25, 30, 48, 50, 60, 72, 120, 144, 240];

// FPS option values that do NOT exist in the HELIOS capacity table.
const HELIOS_UNSUPPORTED_FPS = new Set(['100', '150', '180', '192', '200', '250']);
// Nearest valid HELIOS FPS to snap to when auto-correcting.
const FPS_HELIOS_FALLBACK = { '100': '120', '150': '144', '180': '144', '192': '144', '200': '240', '250': '240' };

// ─── Processor Registry ───────────────────────────────────────────────────────
// To add a new processor: add one entry here. No other code changes needed.
//   portUnitLabel  - display name for the distribution unit (e.g. 'XD', 'RP12')
//   portUnitPrefix - short prefix for cable diagram labels (e.g. 'X' → X1P1, 'RP' → RP1P1)
//   portsPerUnit   - Ethernet ports on each unit (1G links to panels)
//   maxUnits       - max distribution units per processor (Infinity = no limit)
//   hasInputGroups - true if input resolution is capped by fps
//   inputGroupsFn  - function(fps) → { w, h, maxHz, label } for the active input group
//   parentUnit     - optional { label, unitsPerParent } for 2-level port hierarchies (e.g. QDS→XDS)
//   nearestFps     - function(rawFps) → fps key used for table lookup
//   capacityLookup - function(fps, bpc, latencyMode) → total capacity in MPix
//   portLookup     - function(fps, bpc, latencyMode) → pixels per 1G port
//   infoNote       - optional string shown in the processor details panel
// ─────────────────────────────────────────────────────────────────────────────
const PROCESSOR_REGISTRY = {
  'Brompton SX40': {
    portUnitLabel: 'XD',
    portUnitPrefix: 'X',
    portsPerUnit: XD_DOWNLINK_PORTS,  // 10 ports per XD
    maxUnits: SX40_UPLINK_PORTS,       // 4 XD uplinks per SX40
    hasInputGroups: true,
    inputGroupsFn: getSX40MaxInput,
    nearestFps: nearestKnownFps,
    capacityLookup(fps, _bpc, latencyMode) {
      const row = SX40_TABLE[fps] || SX40_TABLE[24];
      return latencyMode === 'ULL' ? row.ull : row.standard;
    },
    portLookup(fps, bpc, latencyMode) {
      const row = XD_PORT_TABLE[fps] || XD_PORT_TABLE[24];
      const mode = latencyMode === 'ULL' ? 'ull' : 'standard';
      return row[mode][bpc] ?? row[mode][10] ?? row[mode][8];
    },
  },

  'Brompton S8': {
    portUnitLabel: 'XD',
    portUnitPrefix: 'X',
    portsPerUnit: XD_DOWNLINK_PORTS,
    maxUnits: Infinity,                // S8 has no per-unit uplink limit
    hasInputGroups: false,
    nearestFps: nearestKnownFps,
    capacityLookup(fps, bpc, latencyMode) {
      const row = S8_TABLE[fps] || S8_TABLE[24];
      const mode = latencyMode === 'ULL' ? 'ull' : 'standard';
      const map = row[mode];
      return map[bpc] ?? map[10] ?? map[8];
    },
    portLookup(fps, bpc, latencyMode) {
      const row = XD_PORT_TABLE[fps] || XD_PORT_TABLE[24];
      const mode = latencyMode === 'ULL' ? 'ull' : 'standard';
      return row[mode][bpc] ?? row[mode][10] ?? row[mode][8];
    },
  },

  'Megapixel HELIOS': {
    portUnitLabel: 'RP12',
    portUnitPrefix: 'RP',
    portsPerUnit: HELIOS_ETH_PORTS_PER_SWITCH,  // 12 ports per RP12
    maxUnits: HELIOS_FIBER_PORTS,               // 8 fiber outputs per HELIOS
    hasInputGroups: true,
    inputGroupsFn: getSQ200HeliosMaxInput,
    hardCapMPix: HELIOS_MAX_MPIX,
    infoNote: 'Supports up to 8K at ≤60 Hz. FPS 100/150/180/192/200/250 not supported.',
    nearestFps: nearestHeliosFps,
    capacityLookup(fps, bpc) {
      const row = HELIOS_FIBER_PORT_TABLE[fps] || HELIOS_FIBER_PORT_TABLE[24];
      const fiberCap = row[bpc] ?? row[10] ?? row[8];
      return Math.min(HELIOS_MAX_MPIX, HELIOS_FIBER_PORTS * fiberCap);
    },
    portLookup(fps, bpc) {
      const row = HELIOS_SWITCH_PORT_TABLE[fps] || HELIOS_SWITCH_PORT_TABLE[24];
      return row[bpc] ?? row[10] ?? row[8];
    },
  },

  'Brompton SQ200': {
    portUnitLabel: 'XDS',
    portUnitPrefix: 'S',
    portsPerUnit: 10,           // 10 × 1G ports per XDS unit
    maxUnits: 24,               // 2 QDS × 12 XDS = 24 XDS per SQ200
    parentUnit: { label: 'QDS', unitsPerParent: 12 }, // 12 XDS per QDS; max 2 QDS per SQ200
    hasInputGroups: true,
    inputGroupsFn: getSQ200HeliosMaxInput,
    hardCapMPix: 36,
    infoNote: '2 × 100G → 2 QDS → up to 24 XDS → 240 × 1G ports. 8K at ≤60 Hz.',
    nearestFps: nearestKnownFps,
    capacityLookup(fps, _bpc, latencyMode) {
      const row = SQ200_TABLE[fps] || SQ200_TABLE[24];
      return Math.min(36, latencyMode === 'ULL' ? row.ull : row.standard);
    },
    portLookup(fps, bpc, latencyMode) {
      const row = XD_PORT_TABLE[fps] || XD_PORT_TABLE[24];
      const mode = latencyMode === 'ULL' ? 'ull' : 'standard';
      return row[mode][bpc] ?? row[mode][10] ?? row[mode][8];
    },
  },
};

// Ordered list of profile names for UI dropdowns (registry keys + Custom).
const PROCESSOR_PROFILES = [...Object.keys(PROCESSOR_REGISTRY), 'Custom'];
const HISTORY_STORAGE_KEY = 'led_planner_history_v1';
const HISTORY_MAX_ENTRIES = 30;
const HISTORY_IGNORED_MESSAGES = new Set(['Pan start', 'Move start', 'Resize start', 'Selection changed', 'Updated details']);
const PRESETS_STORAGE_KEY = 'led_planner_presets_v1';
const PRESETS_MAX_ENTRIES = 30;

const state = {
  metadata: {
    projectName: 'Stage A Volume',
    buildTag: 'v2.1',
    frameRate: '24',
    colorDepth: '10-bit',
    colorSpace: 'Rec.709',
    eotf: 'Gamma 2.4',
    syncMode: 'Genlock',
    redundancy: 'N+1',
    latencyMode: 'Standard',
    genlockSource: 'Evertz 5601MSC',
    controlNetwork: '10.10.0.0/24',
    processorProfile: 'Brompton SX40',
    wiringPattern: 'linear'
  },
  wall: {
    wallTilesX: 24,
    wallTilesY: 8,
    tilePxW: 176,
    tilePxH: 176,
    tileMmW: 500,
    tileMmH: 500,
    safetyMargin: 10,
    targetUtil: 80
  },
  nodes: [
    { id: uid('node'), name: 'Render Node 1', maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2, backupNodeId: '' },
    { id: uid('node'), name: 'Render Node 2', maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2, backupNodeId: '' }
  ],
  processors: [
    defaultProcessor('PROC-A'),
    defaultProcessor('PROC-B')
  ],
  regions: [
    { id: uid('reg'), name: 'Main Left', x: 0, y: 0, w: 12, h: 8, nodeId: '', processorId: '', role: 'Frustum' },
    { id: uid('reg'), name: 'Main Right', x: 12, y: 0, w: 12, h: 8, nodeId: '', processorId: '', role: 'Frustum' }
  ],
  selection: { type: 'region', id: '' },
  activeTab: 'selection',
  logLines: []
};

const view = {
  zoom: 1,
  panX: 0,
  panY: 0,
  showCableOverlay: false,
  globalUnitNumbering: false,
  dragging: false,
  dragMode: '',
  dragRegionId: '',
  dragHandle: '',
  dragStart: null,
  panStart: null,
  nodesCollapsed: false,
  procsCollapsed: false
};

const handles = ['nw', 'ne', 'sw', 'se'];
const roles = ['Frustum', 'Background', 'Ceiling', 'Floor', 'Practical', 'Spare'];
const palette = ['#ff904f', '#60d3ff', '#66e6a6', '#ec9fff', '#ffd974', '#ff7bb0'];
const historyStore = { loaded: false, entries: [] };
const presetsStore = { loaded: false, entries: [] };
let nodeSettingsClipboard = null;

const els = {
  canvas: document.getElementById('coverageCanvas'),
  canvasWrap: document.getElementById('canvasWrap'),
  toggleLeftBtn: document.getElementById('toggleLeftBtn'),
  toggleRightBtn: document.getElementById('toggleRightBtn'),
  toggleLogBtn: document.getElementById('toggleLogBtn'),
  collapseLeftBtn: document.getElementById('collapseLeftBtn'),
  collapseRightBtn: document.getElementById('collapseRightBtn'),
  collapseLogBtn: document.getElementById('collapseLogBtn'),
  outlinerDrawer: document.getElementById('outlinerDrawer'),
  detailsDrawer: document.getElementById('detailsDrawer'),
  logDrawer: document.getElementById('logDrawer'),
  outlinerList: document.getElementById('outlinerList'),
  wallQuickStats: document.getElementById('wallQuickStats'),
  detailsHost: document.getElementById('detailsHost'),
  plannerStats: document.getElementById('plannerStats'),
  plannerInfoBtn: document.getElementById('plannerInfoBtn'),
  toggleCablePlanBtn: document.getElementById('toggleCablePlanBtn'),
  selectionBadge: document.getElementById('selectionBadge'),
  canvasStatus: document.getElementById('canvasStatus'),
  outputLog: document.getElementById('outputLog'),
  issues: document.getElementById('issues'),
  importInput: document.getElementById('importInput'),
  historyBtn: document.getElementById('historyBtn'),
  historyBadgeCount: document.getElementById('historyBadgeCount'),
  presetsBtn: document.getElementById('presetsBtn'),
  presetsBadgeCount: document.getElementById('presetsBadgeCount'),
  quickFrameRate: document.getElementById('quickFrameRate'),
  quickLatencyMode: document.getElementById('quickLatencyMode'),
  quickColorDepth: document.getElementById('quickColorDepth'),
  themeSelect: document.getElementById('themeSelect'),
  quickWallTilesX: document.getElementById('quickWallTilesX'),
  quickWallTilesY: document.getElementById('quickWallTilesY'),
  quickTilePxW: document.getElementById('quickTilePxW'),
  quickTilePxH: document.getElementById('quickTilePxH'),
  quickTileMmW: document.getElementById('quickTileMmW'),
  quickTileMmH: document.getElementById('quickTileMmH'),
  quickProcessorProfile: document.getElementById('quickProcessorProfile'),
  wiringPatternSelect: document.getElementById('wiringPatternSelect'),
  exportCableSvgBtn: document.getElementById('exportCableSvgBtn'),
  toggleGlobalXdBtn: document.getElementById('toggleGlobalXdBtn')
};

wire();
bootstrap();
showDisclaimer();
initTheme();
fitView();
renderAll('Ready');

function wire() {
  const addNode = () => {
    const node = { id: uid('node'), name: `Render Node ${state.nodes.length + 1}`, maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2, backupNodeId: '' };
    state.nodes.push(node);
    select('node', node.id);
    renderAll(`Added render node ${node.name}`);
  };

  const addProcessor = () => {
    const processor = defaultProcessor(`PROC-${String.fromCharCode(65 + state.processors.length)}`, state.metadata.processorProfile || 'Brompton SX40');
    state.processors.push(processor);
    select('processor', processor.id);
    renderAll(`Added processor ${processor.name}`);
  };

  const addRegion = (options = {}) => {
    const forcedNodeId = options.nodeId || '';
    const selectedRegion = getSelectedObject('region');
    const preferredNodeId = forcedNodeId || (state.selection.type === 'node'
      ? state.selection.id
      : (selectedRegion?.nodeId || state.nodes[0]?.id || ''));
    const preferredProcessorId = state.selection.type === 'processor'
      ? state.selection.id
      : (selectedRegion?.processorId || state.processors[0]?.id || '');

    // Hard limit: max node.outputs regions per node (physical output port limit).
    if (preferredNodeId) {
      const node = state.nodes.find((n) => n.id === preferredNodeId);
      const maxRegions = node?.outputs || MAX_REGIONS_PER_NODE;
      const existing = state.regions.filter((r) => r.nodeId === preferredNodeId).length;
      if (existing >= maxRegions) {
        renderLog(`Cannot add region: ${node?.name || 'node'} already has ${maxRegions} output(s) (max).`);
        showToast(`${node?.name || 'Node'} is at the ${maxRegions}-output limit`);
        return;
      }
    }

    const smartPlacement = suggestSmartPlacementForProcessor(preferredProcessorId);
    const region = {
      id: uid('reg'),
      name: `Region ${state.regions.length + 1}`,
      x: smartPlacement.x,
      y: smartPlacement.y,
      w: smartPlacement.w,
      h: smartPlacement.h,
      nodeId: preferredNodeId,
      processorId: preferredProcessorId,
      role: 'Background'
    };
    state.regions.push(region);
    select('region', region.id);
    renderAll(`Added render area ${region.name} (smart-sized)`);
  };

  document.getElementById('addNodeBtn')?.addEventListener('click', addNode);
  document.getElementById('addProcessorBtn')?.addEventListener('click', addProcessor);
  document.getElementById('addRegionBtn')?.addEventListener('click', addRegion);
  document.getElementById('howToBtn')?.addEventListener('click', showHowTo);
  document.getElementById('howToBtn')?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showHowTo(); } });
  els.historyBtn?.addEventListener('click', showHistoryModal);
  els.historyBtn?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showHistoryModal(); } });
  els.presetsBtn?.addEventListener('click', showPresetsModal);
  els.presetsBtn?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPresetsModal(); } });

  document.getElementById('removeSelectedBtn').addEventListener('click', removeSelected);
  document.getElementById('fitViewBtn').addEventListener('click', () => {
    fitView();
    renderAll('Canvas fit to screen');
  });
  document.getElementById('validateBtn').addEventListener('click', () => renderAll('Validation run'));
  document.getElementById('suggestConfigsBtn')?.addEventListener('click', suggestConfigs);
  document.getElementById('suggestConfigsBtn')?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); suggestConfigs(); } });
  document.getElementById('autoPackBtn')?.addEventListener('click', autoPackRegionsForCurrentSettings);
  document.getElementById('processorOverviewBtn')?.addEventListener('click', showProcessorOverview);
  els.toggleCablePlanBtn?.addEventListener('click', toggleCablePlanOverlay);
  els.wiringPatternSelect?.addEventListener('change', () => {
    state.metadata.wiringPattern = els.wiringPatternSelect.value;
    renderAll(`Wiring pattern: ${els.wiringPatternSelect.value}`);
  });
  els.toggleGlobalXdBtn?.addEventListener('click', () => {
    view.globalUnitNumbering = !view.globalUnitNumbering;
    syncCanvasMetaButtons();
    renderCanvas(calculateReport());
    renderLog(`Global unit numbering ${view.globalUnitNumbering ? 'enabled' : 'disabled'}`);
  });
  document.getElementById('exportBtn').addEventListener('click', exportConfig);
  document.getElementById('exportSvgBtn')?.addEventListener('click', exportSvg);
  els.exportCableSvgBtn?.addEventListener('click', exportCableSvg);
  document.getElementById('clearLogBtn').addEventListener('click', () => {
    state.logLines = [];
    renderLog('Log cleared');
  });
  els.quickFrameRate?.addEventListener('change', () => {
    state.metadata.frameRate = els.quickFrameRate.value;
    showToast(`Frame rate updated to ${state.metadata.frameRate} fps`);
    renderAll(`Frame rate set to ${state.metadata.frameRate} fps`);
  });
  els.quickLatencyMode?.addEventListener('change', () => {
    state.metadata.latencyMode = els.quickLatencyMode.value;
    showToast(`Latency mode updated to ${state.metadata.latencyMode}`);
    renderAll(`Latency mode set to ${state.metadata.latencyMode}`);
  });
  els.quickColorDepth?.addEventListener('change', () => {
    state.metadata.colorDepth = els.quickColorDepth.value;
    showToast(`Color depth updated to ${state.metadata.colorDepth}`);
    renderAll(`Color depth set to ${state.metadata.colorDepth}`);
  });
  els.themeSelect?.addEventListener('change', () => {
    applyTheme(els.themeSelect.value);
    showToast(`Theme set to ${els.themeSelect.value}`);
    renderAll(`Theme set to ${els.themeSelect.value}`);
  });

  // Wall settings quick controls.
  const wallFields = [
    { el: 'quickWallTilesX', key: 'wallTilesX' },
    { el: 'quickWallTilesY', key: 'wallTilesY' },
    { el: 'quickTilePxW', key: 'tilePxW' },
    { el: 'quickTilePxH', key: 'tilePxH' },
    { el: 'quickTileMmW', key: 'tileMmW' },
    { el: 'quickTileMmH', key: 'tileMmH' }
  ];
  wallFields.forEach(({ el, key }) => {
    const input = els[el];
    if (!input) return;
    input.addEventListener('change', () => {
      const v = parseInt(input.value, 10);
      if (Number.isFinite(v) && v > 0) {
        state.wall[key] = v;
        sanitizeWall();
        input.value = state.wall[key];
        const label = { wallTilesX: 'Tiles X', wallTilesY: 'Tiles Y', tilePxW: 'Cabinet W (px)', tilePxH: 'Cabinet H (px)', tileMmW: 'Cabinet W (mm)', tileMmH: 'Cabinet H (mm)' }[key] || key;
        showToast(`${label} updated to ${state.wall[key]}`);
        renderAll(`Wall ${key} set to ${state.wall[key]}`);
      }
    });
  });
  els.quickProcessorProfile?.addEventListener('change', () => {
    state.metadata.processorProfile = els.quickProcessorProfile.value;
    syncProcessorProfiles();
    // If switching to HELIOS with an unsupported FPS, snap to nearest valid value.
    let fpsCorrectionNote = '';
    if (state.metadata.processorProfile === 'Megapixel HELIOS' &&
        HELIOS_UNSUPPORTED_FPS.has(state.metadata.frameRate)) {
      const corrected = FPS_HELIOS_FALLBACK[state.metadata.frameRate] || '60';
      state.metadata.frameRate = corrected;
      if (els.quickFrameRate) els.quickFrameRate.value = corrected;
      fpsCorrectionNote = ` (FPS auto-corrected to ${corrected})`;
    }
    showToast(`Processor type set to ${state.metadata.processorProfile}${fpsCorrectionNote}`);
    renderAll(`Processor type set to ${state.metadata.processorProfile}${fpsCorrectionNote}`);
  });

  els.toggleLeftBtn?.addEventListener('click', () => toggleDrawer(els.outlinerDrawer));
  els.toggleRightBtn?.addEventListener('click', () => toggleDrawer(els.detailsDrawer));
  els.toggleLogBtn?.addEventListener('click', () => toggleDrawer(els.logDrawer));
  els.collapseLeftBtn?.addEventListener('click', () => {
    setDrawerOpen(els.outlinerDrawer, false);
    syncDrawerButtons();
  });
  els.collapseRightBtn?.addEventListener('click', () => {
    setDrawerOpen(els.detailsDrawer, false);
    syncDrawerButtons();
  });
  els.plannerInfoBtn?.addEventListener('click', () => {
    els.plannerStats?.classList.toggle('is-open');
  });
  els.collapseLogBtn?.addEventListener('click', () => {
    setDrawerOpen(els.logDrawer, false);
    syncDrawerButtons();
  });

  els.importInput.addEventListener('change', importConfig);

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
      setDrawerOpen(els.detailsDrawer, true);
      syncDrawerButtons();
      renderDetails(calculateReport());
    });
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    renderCanvas(calculateReport());
  });

  els.canvas.addEventListener('pointerdown', onPointerDown);
  els.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  els.canvas.addEventListener('wheel', onWheel, { passive: false });
  setupToolMenus();

  setDrawerOpen(els.outlinerDrawer, false);
  setDrawerOpen(els.detailsDrawer, false);
  setDrawerOpen(els.logDrawer, false);
  syncDrawerButtons();
  loadHistoryStore();
  loadPresetsStore();

  // Expose section actions for outliner contextual create buttons.
  state._addNode = addNode;
  state._addProcessor = addProcessor;
  state._addRegion = addRegion;
}

function setupToolMenus() {
  const menus = Array.from(document.querySelectorAll('.tool-menu'));
  menus.forEach((menu) => {
    menu.addEventListener('toggle', () => {
      if (!menu.open) return;
      menus.forEach((other) => {
        if (other !== menu) other.open = false;
      });
      positionToolMenu(menu);
    });
    menu.addEventListener('click', (event) => {
      const actionEl = event.target.closest('button, .menu-file-btn');
      if (!actionEl || !menu.open) return;
      menu.open = false;
    });
  });

  document.addEventListener('pointerdown', (event) => {
    menus.forEach((menu) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    // Escape: close menus and planner stats.
    if (event.key === 'Escape') {
      menus.forEach((menu) => { menu.open = false; });
      els.plannerStats?.classList.remove('is-open');
      return;
    }

    // Enter: hide the details panel.
    if (event.key === 'Enter') {
      const active = document.activeElement;
      // Only dismiss if not typing in an input/select/textarea.
      if (!active || !['INPUT', 'SELECT', 'TEXTAREA'].includes(active.tagName)) {
        setDrawerOpen(els.detailsDrawer, false);
        syncDrawerButtons();
      }
      return;
    }

    // Delete / Backspace: remove selected region (when not in a text field).
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const active = document.activeElement;
      if (active && ['INPUT', 'SELECT', 'TEXTAREA'].includes(active.tagName)) return;
      if (state.selection.type === 'region') {
        removeItemById('region', state.selection.id);
      }
    }
  });

  window.addEventListener('resize', () => {
    menus.forEach((menu) => {
      if (menu.open) positionToolMenu(menu);
    });
  });

  document.addEventListener('pointerdown', (event) => {
    const stats = els.plannerStats;
    const infoBtn = els.plannerInfoBtn;
    if (!stats?.classList.contains('is-open')) return;
    if (stats.contains(event.target) || infoBtn?.contains(event.target)) return;
    stats.classList.remove('is-open');
  });
}

function positionToolMenu(menu) {
  const panel = menu.querySelector('.tool-menu-panel');
  if (!panel) return;
  panel.style.transform = 'translateX(0)';
  const rect = panel.getBoundingClientRect();
  const pad = 8;
  let shiftX = 0;
  if (rect.right > window.innerWidth - pad) {
    shiftX -= rect.right - (window.innerWidth - pad);
  }
  if (rect.left < pad) {
    shiftX += pad - rect.left;
  }
  panel.style.transform = shiftX === 0 ? 'translateX(0)' : `translateX(${Math.round(shiftX)}px)`;
}

function bootstrap() {
  state.regions[0].nodeId = state.nodes[0].id;
  state.regions[1].nodeId = state.nodes[1].id;
  state.regions[0].processorId = state.processors[0].id;
  state.regions[1].processorId = state.processors[1].id;
  state.selection = { type: 'region', id: state.regions[0].id };
  resizeCanvas();
}

function defaultProcessor(name, profile = 'Brompton SX40') {
  return {
    id: uid('proc'),
    name,
    type: profile,
    profile,
    capacityMode: 'profile',
    latencyMode: 'From Project',
    customMPix: 9
  };
}

// Push the current project-level processor profile to every processor in state.
function syncProcessorProfiles() {
  const profile = state.metadata.processorProfile || 'Brompton SX40';
  state.processors.forEach((p) => { p.profile = profile; });
}

function resizeCanvas() {
  const w = Math.max(300, Math.floor(els.canvasWrap.clientWidth));
  const h = Math.max(220, Math.floor(els.canvasWrap.clientHeight));
  if (els.canvas.width !== w || els.canvas.height !== h) {
    els.canvas.width = w;
    els.canvas.height = h;
  }
}

function fitView() {
  resizeCanvas();
  const pad = 56;
  const zw = (els.canvas.width - pad * 2) / state.wall.wallTilesX;
  const zh = (els.canvas.height - pad * 2) / state.wall.wallTilesY;
  view.zoom = clampFloat(Math.min(zw, zh), 7, 140);
  view.panX = (els.canvas.width - state.wall.wallTilesX * view.zoom) / 2;
  view.panY = (els.canvas.height - state.wall.wallTilesY * view.zoom) / 2;
}

function renderAll(message, options = {}) {
  const { skipDetails = false } = options;
  syncQuickControls();
  const report = calculateReport();
  renderOutliner(report);
  renderQuickStats(report);
  renderPlannerStats(report);
  if (!skipDetails) {
    renderDetails(report);
  }
  renderCanvas(report);
  renderIssues(report.issues);
  renderSelectionBadge();
  syncCanvasMetaButtons();
  if (message) {
    renderLog(message);
    pushHistoryEntry(message);
  }
}

function syncCanvasMetaButtons() {
  if (!els.toggleCablePlanBtn) return;
  els.toggleCablePlanBtn.classList.toggle('primary', !!view.showCableOverlay);
  els.toggleCablePlanBtn.title = view.showCableOverlay ? 'Disable cable plan overlay' : 'Enable cable plan overlay';
  if (els.toggleGlobalXdBtn) {
    els.toggleGlobalXdBtn.classList.toggle('primary', !!view.globalUnitNumbering);
    els.toggleGlobalXdBtn.title = view.globalUnitNumbering
      ? 'Disable global unit numbering (back to per-processor numbering)'
      : 'Enable global unit numbering - units numbered sequentially across all processors';
  }
}

function updateFpsOptionsForProcessor(profile) {
  if (!els.quickFrameRate) return;
  const isHelios = profile === 'Megapixel HELIOS';
  for (const opt of els.quickFrameRate.options) {
    opt.disabled = isHelios && HELIOS_UNSUPPORTED_FPS.has(opt.value);
  }
}

function syncQuickControls() {
  if (els.quickFrameRate) {
    els.quickFrameRate.value = state.metadata.frameRate;
  }
  if (els.quickLatencyMode) {
    els.quickLatencyMode.value = state.metadata.latencyMode;
  }
  if (els.quickColorDepth) {
    els.quickColorDepth.value = state.metadata.colorDepth;
  }
  if (els.themeSelect) {
    const theme = document.body.dataset.theme || 'dark';
    els.themeSelect.value = theme;
  }
  if (els.quickProcessorProfile) {
    els.quickProcessorProfile.value = state.metadata.processorProfile || 'Brompton SX40';
  }
  if (els.wiringPatternSelect) {
    els.wiringPatternSelect.value = state.metadata.wiringPattern || 'linear';
  }
  updateFpsOptionsForProcessor(state.metadata.processorProfile || 'Brompton SX40');
  // Sync wall quick controls.
  if (els.quickWallTilesX) els.quickWallTilesX.value = state.wall.wallTilesX;
  if (els.quickWallTilesY) els.quickWallTilesY.value = state.wall.wallTilesY;
  if (els.quickTilePxW) els.quickTilePxW.value = state.wall.tilePxW;
  if (els.quickTilePxH) els.quickTilePxH.value = state.wall.tilePxH;
  if (els.quickTileMmW) els.quickTileMmW.value = state.wall.tileMmW;
  if (els.quickTileMmH) els.quickTileMmH.value = state.wall.tileMmH;
}

function initTheme() {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('led_planner_theme');
    if (saved) theme = saved;
  } catch {
    // ignore storage access failures
  }
  applyTheme(theme);
}

function applyTheme(theme) {
  const allowed = new Set(['dark', 'light', 'blue', 'lime']);
  const resolved = allowed.has(theme) ? theme : 'dark';
  document.body.dataset.theme = resolved;
  if (els.themeSelect) els.themeSelect.value = resolved;
  try {
    localStorage.setItem('led_planner_theme', resolved);
  } catch {
    // ignore storage access failures
  }
}

function toggleDrawer(drawer) {
  if (!drawer) return;
  drawer.classList.toggle('is-open');
  syncDrawerButtons();
}

function setDrawerOpen(drawer, open) {
  if (!drawer) return;
  drawer.classList.toggle('is-open', !!open);
}

function syncDrawerButtons() {
  if (els.toggleLeftBtn) {
    els.toggleLeftBtn.classList.toggle('primary', els.outlinerDrawer?.classList.contains('is-open'));
  }
  if (els.toggleRightBtn) {
    els.toggleRightBtn.classList.toggle('primary', els.detailsDrawer?.classList.contains('is-open'));
  }
  if (els.toggleLogBtn) {
    els.toggleLogBtn.classList.toggle('primary', els.logDrawer?.classList.contains('is-open'));
  }
}

function renderOutliner(report) {
  const html = [];

  // ── Render Nodes ──────────────────────────────────────────────
  html.push(`<div class="outliner-section-head">
    <div class="meta-pill">Render Nodes (${state.nodes.length})</div>
    <div class="outliner-section-actions">
      <button class="tool-btn toolbar-add tiny" data-action="add-node" title="Add render node">+ Node</button>
      <button class="tool-btn icon-btn tiny collapse-btn" data-action="toggle-nodes-section" title="${view.nodesCollapsed ? 'Expand' : 'Collapse'} all nodes">${view.nodesCollapsed ? '▶' : '▼'}</button>
    </div>
  </div>`);

  if (!view.nodesCollapsed) {
    state.nodes.forEach((node, nodeIndex) => {
      const load = report.nodeLoads[node.id] || { totalPixels: 0, regions: [] };
      const usedMPix = load.totalPixels / 1_000_000;
      const nodeMaxMPix = (node.maxWidth * node.maxHeight) / 1_000_000;
      const percent = nodeMaxMPix > 0 ? (usedMPix / nodeMaxMPix) * 100 : 0;
      const nodeNum = nodeIndex + 1;
      const owned = state.regions.filter((r) => r.nodeId === node.id);

      html.push(`<div class="node-block node-selectable ${isSelected('node', node.id) ? 'active-cell' : ''}" data-node-cell-id="${node.id}">
        <div class="node-head">
          <div class="node-title" title="Select node to edit render limits">
            <span class="color-dot" style="background:${colorForNode(node.id)};"></span>
            <span class="node-num">#${nodeNum}</span>
            <span class="icon-mask outliner-icon icon-node"></span> ${escapeHtml(node.name)}
          </div>
          <div class="node-head-actions">
            <span class="node-mpix-pill">${percent.toFixed(0)}% &bull; ${usedMPix.toFixed(2)}/${nodeMaxMPix.toFixed(2)} MPix</span>
            <button class="tool-btn icon-btn tiny delete-btn" data-action="delete-node" data-node-id="${node.id}" title="Delete node">✕</button>
          </div>
        </div>
        <div class="region-list">`);

      if (owned.length === 0) {
        html.push('<span class="meta-pill muted-pill">No assigned regions</span>');
      } else {
        owned.forEach((region) => {
          const regionIndex = Math.max(0, state.regions.findIndex((r) => r.id === region.id));
          html.push(`<div class="region-row"><button class="region-btn ${isSelected('region', region.id) ? 'active' : ''}" data-select-type="region" data-select-id="${region.id}" title="Select render area"><span class="color-dot" style="background:${colorForRegion(region, regionIndex)};"></span><span class=\\"icon-mask outliner-icon icon-region\\"></span> ${escapeHtml(region.name)} (${region.w}x${region.h})</button><button class="tool-btn icon-btn tiny delete-btn" data-action="delete-region" data-region-id="${region.id}" title="Delete region">✕</button></div>`);
        });
      }

      html.push(`</div><button class="tool-btn toolbar-add tiny node-add-region" data-action="add-region-for-node" data-node-id="${node.id}" title="Add a render region assigned to ${escapeAttr(node.name)}">+ Add Region</button></div>`);
    });
  }

  // ── Processors ────────────────────────────────────────────────
  html.push(`<div class="outliner-section-head">
    <div class="meta-pill">Processors (${state.processors.length})</div>
    <div class="outliner-section-actions">
      <button class="tool-btn toolbar-add tiny" data-action="add-processor" title="Add processor">+ Processor</button>
      <button class="tool-btn icon-btn tiny collapse-btn" data-action="toggle-procs-section" title="${view.procsCollapsed ? 'Expand' : 'Collapse'} all processors">${view.procsCollapsed ? '▶' : '▼'}</button>
    </div>
  </div>`);

  if (!view.procsCollapsed) {
    state.processors.forEach((processor) => {
      const load = report.processorLoads[processor.id] || { totalPixels: 0, capacityMPix: 0, xdPortsRequired: 0, xdsRequired: 0 };
      const used = load.totalPixels / 1_000_000;
      const cap = load.capacityMPix || 0;
      const percent = cap > 0 ? (used / cap) * 100 : 0;

      html.push(`<div class="node-block node-selectable ${isSelected('processor', processor.id) ? 'active-cell' : ''}" data-processor-cell-id="${processor.id}">
        <div class="node-head">
          <div class="node-title" title="Select processor to edit throughput profile"><span class="icon-mask outliner-icon icon-proc"></span> ${escapeHtml(processor.name)}</div>
          <div class="node-head-actions">
            <span class="node-mpix-pill">${percent.toFixed(0)}% &bull; ${used.toFixed(2)}/${cap.toFixed(2)} MPix</span>
            <button class="tool-btn icon-btn tiny delete-btn" data-action="delete-processor" data-processor-id="${processor.id}" title="Delete processor">✕</button>
          </div>
        </div>
        <div class="proc-meta">
          <div class="proc-meta-row"><span class="proc-k">Model</span><span class="proc-v">${escapeHtml(processorModeLabel(processor))}</span></div>
          <div class="proc-meta-row"><span class="proc-k">${load.portUnitLabel || 'XD'}</span><span class="proc-v">${load.xdPortsRequired} ports / ${load.xdsRequired} ${load.portUnitLabel || 'XD'}(s)</span></div>
        </div>
      </div>`);
    });
  }

  // ── Unassigned Regions ────────────────────────────────────────
  const unassigned = state.regions.filter((r) => !r.nodeId);
  html.push('<div class="outliner-section-head"><div class="meta-pill">Unassigned Regions</div></div>');
  if (unassigned.length) {
    html.push('<div class="node-block"><div class="region-list">');
    unassigned.forEach((region) => {
      const regionIndex = Math.max(0, state.regions.findIndex((r) => r.id === region.id));
      html.push(`<div class="region-row"><button class="region-btn ${isSelected('region', region.id) ? 'active' : ''}" data-select-type="region" data-select-id="${region.id}" title="Select render area"><span class="color-dot" style="background:${colorForRegion(region, regionIndex)};"></span><span class=\\"icon-mask outliner-icon icon-region\\"></span> ${escapeHtml(region.name)}</button><button class="tool-btn icon-btn tiny delete-btn" data-action="delete-region" data-region-id="${region.id}" title="Delete region">✕</button></div>`);
    });
    html.push('</div></div>');
  }

  els.outlinerList.innerHTML = html.join('');
  els.outlinerList.querySelectorAll('[data-select-id]').forEach((el) => {
    el.addEventListener('click', () => {
      select(el.dataset.selectType, el.dataset.selectId);
      if (el.dataset.selectType === 'node' || el.dataset.selectType === 'processor') {
        setDrawerOpen(els.detailsDrawer, true);
        syncDrawerButtons();
      }
      renderAll('Selection changed');
    });
  });
  els.outlinerList.querySelectorAll('[data-node-cell-id]').forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.closest('.region-btn') || event.target.closest('.node-add-region') || event.target.closest('.delete-btn')) return;
      select('node', cell.dataset.nodeCellId);
      setDrawerOpen(els.detailsDrawer, true);
      syncDrawerButtons();
      renderAll('Selection changed');
    });
  });
  els.outlinerList.querySelectorAll('[data-processor-cell-id]').forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.closest('.region-btn') || event.target.closest('.node-add-region') || event.target.closest('.delete-btn')) return;
      select('processor', cell.dataset.processorCellId);
      setDrawerOpen(els.detailsDrawer, true);
      syncDrawerButtons();
      renderAll('Selection changed');
    });
  });
  els.outlinerList.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.stopPropagation();
      const action = el.dataset.action;
      if (action === 'add-node') state._addNode?.();
      if (action === 'add-processor') state._addProcessor?.();
      if (action === 'add-region-for-node') state._addRegion?.({ nodeId: el.dataset.nodeId || '' });
      if (action === 'delete-node') removeItemById('node', el.dataset.nodeId || '');
      if (action === 'delete-processor') removeItemById('processor', el.dataset.processorId || '');
      if (action === 'delete-region') removeItemById('region', el.dataset.regionId || '');
      if (action === 'toggle-nodes-section') { view.nodesCollapsed = !view.nodesCollapsed; renderAll(); }
      if (action === 'toggle-procs-section') { view.procsCollapsed = !view.procsCollapsed; renderAll(); }
    });
  });
}

function removeItemById(type, id) {
  if (!id) return;
  select(type, id);
  removeSelected();
}

function renderQuickStats(report) {
  els.wallQuickStats.innerHTML = [
    `Canvas: <strong>${report.wall.wallPxW}x${report.wall.wallPxH}</strong>`,
    `Tiles: <strong>${report.wall.wallTilesX}x${report.wall.wallTilesY}</strong>`,
    `Physical: <strong>${(report.wall.wallMmW / 1000).toFixed(2)}m x ${(report.wall.wallMmH / 1000).toFixed(2)}m</strong>`,
    `Coverage: <strong>${report.wall.coveragePct.toFixed(1)}%</strong>`
  ].join('<br>');

  els.canvasStatus.textContent = `Zoom ${view.zoom.toFixed(1)} px/tile | Pan (${view.panX.toFixed(0)}, ${view.panY.toFixed(0)}) | Cabinet ${state.wall.tilePxW}x${state.wall.tilePxH}px`;
}

function renderPlannerStats(report) {
  if (!els.plannerStats) return;
  const reference = getReferenceProcessor();
  const referenceNode = getReferenceNode();
  if (!reference) {
    els.plannerStats.textContent = 'No processor configured';
    return;
  }
  if (!referenceNode) {
    els.plannerStats.textContent = 'No render node configured';
    return;
  }

  const resolved = resolveProcessorCapacity(reference, state.metadata);
  const portData = resolvePortCapacityForProcessor(reference, state.metadata);
  const portUnitLabel = portData.portUnitLabel;
  const procLabel = (reference.profile || 'Brompton SX40').split(' ').pop();
  const tilePixels = Math.max(1, state.wall.tilePxW * state.wall.tilePxH);
  const totalPanels = Math.max(1, report.wall.wallTilesX * report.wall.wallTilesY);
  const processorCapPixels = Math.floor(resolved.capacityMPix * 1_000_000);
  const nodeMpixCapPixels = Math.floor(referenceNode.maxMPix * 1_000_000);
  const nodeDimCapPixels = Math.max(1, referenceNode.maxWidth * referenceNode.maxHeight);
  const effectivePixelsPerProcessor = Math.max(1, Math.min(processorCapPixels, nodeMpixCapPixels, nodeDimCapPixels));

  // Input grouping constrains the max single-region resolution at this fps (applies to SX40, HELIOS, SQ200).
  const inputGroup = getInputGroup(reference.profile, state.metadata.frameRate);
  const effectiveMaxW = inputGroup ? Math.min(referenceNode.maxWidth, inputGroup.w) : referenceNode.maxWidth;
  const effectiveMaxH = inputGroup ? Math.min(referenceNode.maxHeight, inputGroup.h) : referenceNode.maxHeight;

  // Geometry lower bound: each segment must fit node width/height constraints.
  const minColsByNodeWidth = Math.max(1, Math.ceil(report.wall.wallPxW / Math.max(1, effectiveMaxW)));
  const minRowsByNodeHeight = Math.max(1, Math.ceil(report.wall.wallPxH / Math.max(1, effectiveMaxH)));
  const processorsByGeometry = minColsByNodeWidth * minRowsByNodeHeight;

  // Panel-ceiling based capacity (capacity derives from panel granularity + cabling caps).
  const maxTilesWByNode = Math.max(1, Math.floor(effectiveMaxW / Math.max(1, state.wall.tilePxW)));
  const maxTilesHByNode = Math.max(1, Math.floor(effectiveMaxH / Math.max(1, state.wall.tilePxH)));
  const settingsText = `${state.metadata.frameRate} Hz | ${resolved.latencyMode} | ${state.metadata.colorDepth}`;

  // Guard: if a single panel exceeds port capacity, show error immediately.
  if (tilePixels > portData.portPixels) {
    const errorLines = [
      `Ref Profile: <strong>${escapeHtml(reference.profile)}</strong>`,
      `Config: <strong>${escapeHtml(settingsText)}</strong>`,
      `Canvas: <strong>${report.wall.wallPxW}x${report.wall.wallPxH}</strong>`,
      `Tiles: <strong>${report.wall.wallTilesX}x${report.wall.wallTilesY}</strong>`,
      `Processor Capacity: <strong>${resolved.capacityMPix.toFixed(3)} MPix/frame</strong>`,
      `${portUnitLabel} Port Capacity: <strong style="color:#ff4f63">${formatInt(portData.portPixels)} px/port</strong>`,
      `Panel Resolution: <strong style="color:#ff4f63">${state.wall.tilePxW}x${state.wall.tilePxH} = ${formatInt(tilePixels)} px</strong>`,
      `<hr class="hw-divider">`,
      `<div class="hw-error"><strong style="color:#ff4f63">Configuration Not Possible</strong><br>`,
      `A single panel (${formatInt(tilePixels)} px) exceeds the ${portUnitLabel} port capacity (${formatInt(portData.portPixels)} px/port) at ${escapeHtml(settingsText)}.<br><br>`,
      `Each ${portUnitLabel} port must be able to drive at least one full panel. Reduce frame rate, bit depth, or switch to Standard latency.</div>`
    ];
    els.plannerStats.innerHTML = errorLines.join('<br>');
    return;
  }

  const panelCapByNodeGeometry = maxTilesWByNode * maxTilesHByNode;
  const panelCapByPixels = Math.max(1, Math.floor(effectivePixelsPerProcessor / tilePixels));
  const panelsPerPort = Math.floor(portData.portPixels / tilePixels);
  const portsPerProcessor = Math.max(1, getPortsPerProcessorLimit(reference));
  const panelCapByPorts = panelsPerPort * portsPerProcessor;
  const panelCeilingPerProcessor = Math.max(1, Math.min(panelCapByNodeGeometry, panelCapByPixels, panelCapByPorts, 2000));
  const processorsByPanelCapacity = Math.max(1, Math.ceil(totalPanels / panelCeilingPerProcessor));
  // Correct combined minimum: geometry + panel cap must be satisfied simultaneously.
  const maxTilesWForStats = maxTilesWByNode;
  const maxTilesHForStats = maxTilesHByNode;
  const bandResult = findOptimalBandLayout(
    report.wall.wallTilesX, report.wall.wallTilesY,
    maxTilesWForStats, maxTilesHForStats,
    panelCeilingPerProcessor, panelsPerPort, processorCapPixels, tilePixels, portData.portsPerUnit
  );
  const totalProcessorsRequired = bandResult ? bandResult.totalProcessors : Math.max(processorsByGeometry, processorsByPanelCapacity);
  const totalXdUnitsRequired = bandResult ? bandResult.totalXds : 0;
  const totalXdPortsRequired = totalPanels * Math.ceil(tilePixels / Math.max(1, portData.portPixels));

  // Build band layout description for the stats panel.
  let bandDesc = '';
  if (bandResult && bandResult.bands.length > 0) {
    const bandParts = bandResult.bands.map((band) => {
      const cols = band.regions.length;
      const w = band.regions[0]?.w || 0;
      const allSameW = band.regions.every((r) => r.w === w);
      const regionLabel = allSameW
        ? `${cols} x ${w}x${band.h} tiles`
        : `${cols} regions (mixed widths) x ${band.h}h`;
      return `${regionLabel}`;
    });
    bandDesc = bandParts.join(' + ');
  }

  const inputGroupLabel = inputGroup
    ? `Input Group: <strong>${inputGroup.label} (${inputGroup.w}x${inputGroup.h} @ ≤${inputGroup.maxHz}Hz)</strong>`
    : '';

  const statsLines = [
    `Ref Profile: <strong>${escapeHtml(reference.profile)}</strong>`,
    `Config: <strong>${escapeHtml(settingsText)}</strong>`,
    inputGroupLabel,
    `Canvas: <strong>${report.wall.wallPxW}x${report.wall.wallPxH}</strong>`,
    `Tiles: <strong>${report.wall.wallTilesX}x${report.wall.wallTilesY}</strong>`,
    `Processor Capacity: <strong>${resolved.capacityMPix.toFixed(3)} MPix/frame</strong>`,
    `${portUnitLabel} Port Capacity: <strong>${formatInt(portData.portPixels)} px/port</strong>`,
    `Panels/Port: <strong>${panelsPerPort}</strong> | Ports/Proc: <strong>${portsPerProcessor}</strong>`,
    `Max Region: <strong>${effectiveMaxW}x${effectiveMaxH} px</strong>`,
    `True Min (combined): <strong>${totalProcessorsRequired}</strong>`,
    bandDesc ? `Optimal packing: ${bandDesc}` : '',
    (() => {
      const pu = PROCESSOR_REGISTRY[reference.profile]?.parentUnit;
      if (pu) {
        const numProcs = report.processors?.length || state.processors.length || 1;
        const qds = Math.max(numProcs, Math.ceil(totalXdUnitsRequired / pu.unitsPerParent));
        const xds = Math.max(qds, totalXdUnitsRequired);
        return `Total ${portUnitLabel} Units: <strong>${xds}</strong> · <strong>${qds} ${pu.label}</strong> (${totalXdPortsRequired} ${portUnitLabel} ports total)`;
      }
      return `Total ${portUnitLabel} Units: <strong>${totalXdUnitsRequired}</strong> (${totalXdPortsRequired} ${portUnitLabel} ports total)`;
    })()
  ];

  const hw = calculateOptimalHardware();
  let hwHtml = '';
  if (hw.feasible) {
    const b = hw.best;
    let splitDesc = '';
    let utilDesc = '';
    let applyTitle = '';
    if (b.type === 'uniform') {
      splitDesc = `Split: <strong>${b.cols}x${b.rows}</strong> (${b.segTilesW}x${b.segTilesH} tiles = ${b.segPxW}x${b.segPxH}px each)<br>Panels/Region: <strong>${b.segPanels}</strong>`;
      utilDesc = `Utilization: <strong>${b.utilization.toFixed(1)}%</strong>`;
      applyTitle = `Create ${b.processors} ${procLabel}(s) with uniform ${b.cols}x${b.rows} grid`;
    } else {
      const bandParts = b.bands.map((band) => {
        const w = band.regions[0]?.w || 0;
        const allSame = band.regions.every((r) => r.w === w);
        const tilePxW = state.wall.tilePxW;
        const tilePxH = state.wall.tilePxH;
        return allSame
          ? `${band.regions.length} x ${w}x${band.h} (${w * tilePxW}x${band.h * tilePxH}px, ${w * band.h} panels)`
          : `${band.regions.length} regions x ${band.h}h (mixed widths)`;
      });
      splitDesc = `Split: <strong>${b.bands.length} band(s)</strong><br>${bandParts.map((p) => `&nbsp;&nbsp;${p}`).join('<br>')}`;
      utilDesc = `Avg Util: <strong>${b.avgUtil.toFixed(1)}%</strong>`;
      applyTitle = `Create ${b.processors} ${procLabel}(s) with ${b.bands.length}-band layout`;
    }

    const altLines = hw.alternatives.map((a) => {
      const pu = hw.settings.parentUnit;
      let aXds = a.totalXds;
      let parentStr = '';
      if (pu) {
        const aQds = Math.max(a.processors, Math.ceil(a.totalXds / pu.unitsPerParent));
        aXds = Math.max(aQds, a.totalXds);
        parentStr = ` / ${aQds} ${pu.label}`;
      }
      if (a.type === 'uniform') {
        return `<span class="hw-alt">${a.processors} ${procLabel} (${a.cols}x${a.rows}) ${a.segPxW}x${a.segPxH}px ${a.utilization.toFixed(0)}% util, ${aXds} ${portUnitLabel}${parentStr}</span>`;
      }
      return `<span class="hw-alt">${a.processors} ${procLabel} (${a.bands.length} bands) ${a.avgUtil.toFixed(0)}% avg util, ${aXds} ${portUnitLabel}${parentStr}</span>`;
    }).join('<br>');

    hwHtml = `
      <hr class="hw-divider">
      <div class="hw-recommendation">
        <strong>Hardware Recommendation</strong><br>
        ${(() => {
          const pu = hw.settings.parentUnit;
          let bXds = b.totalXds;
          let puStr = '';
          if (pu) {
            const bQds = Math.max(b.processors, Math.ceil(b.totalXds / pu.unitsPerParent));
            bXds = Math.max(bQds, b.totalXds);
            puStr = ` (<strong>${bQds} ${pu.label}</strong>)`;
          }
          return `<span class="hw-headline"><strong>${b.processors} ${procLabel}${b.processors > 1 ? 's' : ''}</strong>, <strong>${bXds} ${portUnitLabel}${bXds > 1 ? 's' : ''}</strong>${puStr} total</span>`;
        })()}<br>
        ${splitDesc}<br>
        ${utilDesc}<br>
        Panels/Port: <strong>${b.panelsPerPort}</strong> | Max Panels/${procLabel}: <strong>${b.maxPanelsPerSX40}</strong>
        ${altLines ? `<br><span style="color:var(--muted);font-size:0.62rem">Alternatives:<br>${altLines}</span>` : ''}
        <button id="applyHwRecommendation" class="tool-btn primary hw-apply-btn" title="${escapeAttr(applyTitle)}">Apply Recommendation</button>
      </div>`;
  } else {
    hwHtml = `
      <hr class="hw-divider">
      <div class="hw-error">
        <strong style="color:#ff4f63">No Feasible Config</strong><br>
        ${escapeHtml(hw.error)}
      </div>`;
  }

  els.plannerStats.innerHTML = statsLines.join('<br>') + hwHtml;

  const applyBtn = document.getElementById('applyHwRecommendation');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyHardwareRecommendation(hw);
    });
  }
}

function getReferenceProcessor() {
  if (state.selection.type === 'processor') {
    const selected = getSelectedObject('processor');
    if (selected) return selected;
  }
  return state.processors[0] || null;
}

function getReferenceNode() {
  if (state.selection.type === 'node') {
    const selected = getSelectedObject('node');
    if (selected) return selected;
  }
  return state.nodes[0] || null;
}

// Finds the minimum number of processors by trying all valid horizontal band
// partitions.  Each band has height h (≤ maxTilesH), and within each band the
// maximum region width is limited by BOTH the node width AND the panel cap
// (w*h ≤ maxPanelsPerProc).  Uses memoised DP over remaining tile-height.
function findOptimalBandLayout(wallTilesX, wallTilesY, maxTilesW, maxTilesH, maxPanelsPerProc, panelsPerPort, procCapPixels, tilePixels, portsPerUnit = XD_DOWNLINK_PORTS) {
  const dp = new Array(wallTilesY + 1).fill(Infinity);
  const pick = new Array(wallTilesY + 1).fill(0);
  dp[0] = 0;

  for (let remaining = 1; remaining <= wallTilesY; remaining++) {
    for (let h = 1; h <= Math.min(remaining, maxTilesH); h++) {
      const maxWByPanels = Math.max(1, Math.floor(maxPanelsPerProc / h));
      const maxWByPixels = Math.max(1, Math.floor(procCapPixels / (h * tilePixels)));
      const maxW = Math.min(maxTilesW, maxWByPanels, maxWByPixels);
      if (maxW <= 0) continue;
      const cols = Math.ceil(wallTilesX / maxW);
      const total = cols + dp[remaining - h];
      if (total < dp[remaining]) {
        dp[remaining] = total;
        pick[remaining] = h;
      }
    }
  }

  if (!Number.isFinite(dp[wallTilesY])) return null;

  // Reconstruct bands and regions.
  const bands = [];
  let yPos = 0;
  let remaining = wallTilesY;
  while (remaining > 0) {
    const h = pick[remaining];
    const maxWByPanels = Math.max(1, Math.floor(maxPanelsPerProc / h));
    const maxWByPixels = Math.max(1, Math.floor(procCapPixels / (h * tilePixels)));
    const maxW = Math.min(maxTilesW, maxWByPanels, maxWByPixels);
    const cols = Math.ceil(wallTilesX / maxW);
    const baseW = Math.floor(wallTilesX / cols);
    const rem = wallTilesX % cols;

    const regions = [];
    let xPos = 0;
    for (let c = 0; c < cols; c++) {
      const w = baseW + (c < rem ? 1 : 0);
      const panels = w * h;
      const px = panels * tilePixels;
      const xdPorts = Math.max(1, Math.ceil(panels / Math.max(1, panelsPerPort)));
      const xds = Math.ceil(xdPorts / portsPerUnit);
      regions.push({ x: xPos, y: yPos, w, h, panels, pixels: px, xdPorts, xds });
      xPos += w;
    }
    bands.push({ y: yPos, h, regions });
    yPos += h;
    remaining -= h;
  }

  const allRegions = bands.flatMap((band) => band.regions);
  const totalProcessors = allRegions.length;
  const totalXds = allRegions.reduce((acc, r) => acc + r.xds, 0);
  const maxXdPerProc = Math.max(0, ...allRegions.map((r) => r.xds));
  const avgUtil = allRegions.length > 0
    ? allRegions.reduce((acc, r) => acc + r.pixels, 0) / (allRegions.length * Math.max(1, procCapPixels)) * 100
    : 0;

  return { totalProcessors, totalXds, maxXdPerProc, avgUtil, bands, allRegions };
}

function calculateOptimalHardware() {
  const { wallTilesX, wallTilesY, tilePxW, tilePxH } = state.wall;
  const tilePixels = tilePxW * tilePxH;
  const totalPanels = wallTilesX * wallTilesY;
  const wallPxW = wallTilesX * tilePxW;
  const wallPxH = wallTilesY * tilePxH;

  const canonicalProc = state.processors[0] || { profile: 'Brompton SX40', capacityMode: 'profile', latencyMode: 'From Project' };
  const resolved = resolveProcessorCapacity(canonicalProc, state.metadata);
  const portData = resolvePortCapacityForProcessor(canonicalProc, state.metadata);
  const procCapPixels = Math.floor(resolved.capacityMPix * 1_000_000);

  const refNode = state.nodes[0] || { maxWidth: 7680, maxHeight: 4320, maxMPix: 14 };
  const inputGroup = getInputGroup(canonicalProc.profile, state.metadata.frameRate);
  const nodeMaxW = inputGroup ? Math.min(refNode.maxWidth, inputGroup.w) : refNode.maxWidth;
  const nodeMaxH = inputGroup ? Math.min(refNode.maxHeight, inputGroup.h) : refNode.maxHeight;
  // When the render node runs in portrait mode (rotated 90°) its width and height limits swap.
  const nodeMaxW_rot = nodeMaxH;
  const nodeMaxH_rot = nodeMaxW;
  const maxTilesW = Math.max(1, Math.floor(nodeMaxW / Math.max(1, tilePxW)));
  const maxTilesH = Math.max(1, Math.floor(nodeMaxH / Math.max(1, tilePxH)));

  // A single panel must fit within one port's pixel budget.
  if (tilePixels > portData.portPixels) {
    return {
      error: `Panel resolution (${tilePxW}x${tilePxH} = ${formatInt(tilePixels)} px) exceeds ${portData.portUnitLabel} port capacity (${formatInt(portData.portPixels)} px/port) at these settings. Reduce frame rate, bit depth, or switch to Standard latency.`,
      feasible: false,
      procCapMPix: resolved.capacityMPix,
      xdPortPixels: portData.portPixels
    };
  }

  const panelsPerPort = Math.min(
    Math.floor(portData.portPixels / tilePixels),
    XD_MAX_PANELS_PER_PORT
  );

  const portsPerProcessor = Math.max(1, getPortsPerProcessorLimit(canonicalProc));
  const panelsByPixelCap = Math.max(1, Math.floor(procCapPixels / tilePixels));
  const panelsByPortCap = panelsPerPort * portsPerProcessor;
  const maxPanelsPerSX40 = Math.min(panelsByPixelCap, panelsByPortCap, 2000);

  if (maxPanelsPerSX40 <= 0) {
    return { error: 'Panel size exceeds processor/XD capacity at these settings.', feasible: false };
  }

  // --- Uniform grid candidates ---
  const uniformCandidates = [];
  // naiveMin uses the best-case resolution minimum across both orientations.
  const naiveMinLandscape = Math.ceil(wallPxW / Math.max(1, nodeMaxW)) * Math.ceil(wallPxH / Math.max(1, nodeMaxH));
  const naiveMinPortrait  = Math.ceil(wallPxW / Math.max(1, nodeMaxW_rot)) * Math.ceil(wallPxH / Math.max(1, nodeMaxH_rot));
  const naiveMin = Math.max(
    Math.ceil(totalPanels / maxPanelsPerSX40),
    Math.min(naiveMinLandscape, naiveMinPortrait)
  );
  for (let n = naiveMin; n <= Math.min(naiveMin * 4, 64); n++) {
    const pairs = factorPairs(n);
    for (const [cols, rows] of pairs) {
      if (wallTilesX % cols !== 0 || wallTilesY % rows !== 0) continue;
      const segTilesW = wallTilesX / cols;
      const segTilesH = wallTilesY / rows;
      const segPxW = segTilesW * tilePxW;
      const segPxH = segTilesH * tilePxH;
      const segPixels = segPxW * segPxH;
      const segPanels = segTilesW * segTilesH;

      // Portrait-shaped regions run on the node rotated 90°, so limits swap.
      const isPortrait = segPxH > segPxW;
      const effMaxW = isPortrait ? nodeMaxW_rot : nodeMaxW;
      const effMaxH = isPortrait ? nodeMaxH_rot : nodeMaxH;
      if (segPxW > effMaxW || segPxH > effMaxH) continue;
      if (segPixels > procCapPixels) continue;
      if (segPanels > maxPanelsPerSX40) continue;

      const maxUnitsPerProc = Math.floor(portsPerProcessor / portData.portsPerUnit);
      const xdPerProc = Math.ceil(segPanels / (panelsPerPort * portData.portsPerUnit));
      if (xdPerProc > maxUnitsPerProc) continue;

      const totalXds = n * xdPerProc;
      const utilization = (segPixels / procCapPixels) * 100;
      const orientation = segPxH > segPxW ? 'portrait' : segPxW > segPxH ? 'landscape' : 'square';

      uniformCandidates.push({
        type: 'uniform',
        processors: n,
        cols,
        rows,
        segTilesW,
        segTilesH,
        segPxW,
        segPxH,
        segPanels,
        xdPerProcessor: xdPerProc,
        totalXds,
        utilization,
        orientation,
        panelsPerPort,
        totalPanels,
        maxPanelsPerSX40
      });
    }
  }

  // --- Band-based split (handles non-uniform walls like 42x11) ---
  const bandLayout = findOptimalBandLayout(
    wallTilesX, wallTilesY, maxTilesW, maxTilesH,
    maxPanelsPerSX40, panelsPerPort, procCapPixels, tilePixels, portData.portsPerUnit
  );

  let bandCandidate = null;
  const maxUnitsPerProcGlobal = Math.floor(portsPerProcessor / portData.portsPerUnit);
  if (bandLayout && bandLayout.maxXdPerProc <= maxUnitsPerProcGlobal) {
    bandCandidate = {
      type: 'band',
      processors: bandLayout.totalProcessors,
      totalXds: bandLayout.totalXds,
      avgUtil: bandLayout.avgUtil,
      bands: bandLayout.bands,
      allRegions: bandLayout.allRegions,
      panelsPerPort,
      totalPanels,
      maxPanelsPerSX40
    };
  }

  // Merge and pick best.
  uniformCandidates.sort((a, b) => {
    if (a.processors !== b.processors) return a.processors - b.processors;
    const aDelta = Math.abs(a.utilization - 80);
    const bDelta = Math.abs(b.utilization - 80);
    if (aDelta !== bDelta) return aDelta - bDelta;
    return a.totalXds - b.totalXds;
  });

  const bestUniform = uniformCandidates[0] || null;
  let best = null;
  let alternatives = [];

  if (bestUniform && bandCandidate) {
    if (bestUniform.processors <= bandCandidate.processors) {
      best = bestUniform;
      alternatives = uniformCandidates.slice(1, 4);
    } else {
      best = bandCandidate;
      if (bestUniform) alternatives.push(bestUniform);
    }
  } else if (bestUniform) {
    best = bestUniform;
    alternatives = uniformCandidates.slice(1, 4);
  } else if (bandCandidate) {
    best = bandCandidate;
  }

  if (!best) {
    return {
      error: `No feasible split found for ${wallTilesX}x${wallTilesY} wall at ${state.metadata.frameRate} Hz / ${state.metadata.colorDepth} / ${resolved.latencyMode}.`,
      feasible: false,
      procCapMPix: resolved.capacityMPix,
      xdPortPixels: portData.portPixels
    };
  }

  // Detect why each orientation might be fully blocked.
  // Portrait strips run the node rotated, so the effective height limit is nodeMaxH_rot (= original maxWidth).
  const portraitBlockReason = wallPxH > nodeMaxH_rot
    ? `region height ${wallPxH}px exceeds node maxHeight in portrait mode (${nodeMaxH_rot}px)`
    : null;
  // Landscape requires rows>1; if wallTilesY is not divisible by anything >1 AND band split is also absent, it's blocked.
  const hasAnyLandscape = uniformCandidates.some((c) => c.orientation !== 'portrait') || !!bandCandidate;
  const landscapeBlockReason = !hasAnyLandscape
    ? `wall tile height (${wallTilesY}) has no valid divisors for multi-row splits`
    : null;

  return {
    feasible: true,
    best,
    alternatives,
    allUniformCandidates: uniformCandidates,
    bandCandidate,
    portraitBlockReason,
    landscapeBlockReason,
    settings: {
      fps: state.metadata.frameRate,
      latency: resolved.latencyMode,
      depth: state.metadata.colorDepth,
      procCapMPix: resolved.capacityMPix,
      xdPortPixels: portData.portPixels,
      procLabel: (canonicalProc.profile || 'Brompton SX40').split(' ').pop(),
      unitLabel: portData.portUnitLabel || 'XD',
      parentUnit: PROCESSOR_REGISTRY[canonicalProc.profile]?.parentUnit || null
    },
    wallInfo: { totalPanels, wallPxW, wallPxH, tilePixels, nodeMaxW, nodeMaxH }
  };
}

function applyHardwareRecommendation(hw) {
  if (!hw || !hw.feasible || !hw.best) {
    renderLog('Cannot apply: no feasible hardware recommendation.');
    return;
  }

  const b = hw.best;
  const refNode = state.nodes[0] || { maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2 };

  // Build flat list of region rectangles depending on split type.
  let regionRects;
  if (b.type === 'band') {
    regionRects = b.allRegions;
  } else {
    regionRects = [];
    for (let row = 0; row < b.rows; row++) {
      for (let col = 0; col < b.cols; col++) {
        regionRects.push({
          x: col * b.segTilesW,
          y: row * b.segTilesH,
          w: b.segTilesW,
          h: b.segTilesH,
          panels: b.segPanels
        });
      }
    }
  }

  const count = regionRects.length;

  const newProcessors = [];
  for (let i = 0; i < count; i++) {
    const name = i < 26 ? `PROC-${String.fromCharCode(65 + i)}` : `PROC-${i + 1}`;
    newProcessors.push(defaultProcessor(name, state.metadata.processorProfile || 'Brompton SX40'));
  }

  const newNodes = [];
  for (let i = 0; i < count; i++) {
    newNodes.push({
      id: uid('node'),
      name: `Render Node ${i + 1}`,
      maxWidth: refNode.maxWidth,
      maxHeight: refNode.maxHeight,
      maxMPix: refNode.maxMPix,
      outputs: refNode.outputs,
      backupNodeId: ''
    });
  }

  const newRegions = regionRects.map((rect, i) => ({
    id: uid('reg'),
    name: `Region ${i + 1}`,
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h,
    nodeId: newNodes[i].id,
    processorId: newProcessors[i].id,
    role: 'Background'
  }));

  state.processors = newProcessors;
  state.nodes = newNodes;
  state.regions = newRegions;
  state.selection = { type: 'region', id: newRegions[0]?.id || '' };

  const splitLabel = b.type === 'band'
    ? `${b.bands.length} band(s), ${count} region(s)`
    : `${b.cols}x${b.rows} grid`;

  fitView();
  renderAll(
    `Applied: ${count} ${(state.metadata.processorProfile || 'Brompton SX40').split(' ').pop()}(s), ${b.totalXds} ${PROCESSOR_REGISTRY[state.metadata.processorProfile]?.portUnitLabel || 'XD'}(s), ${splitLabel}`
  );
}

function renderDetails(report) {
  if (state.activeTab === 'selection') {
    renderSelectionDetails(report);
    return;
  }
  if (state.activeTab === 'wall') {
    renderWallDetails(report);
    return;
  }
  renderDeploymentDetails(report);
}

function renderSelectionDetails(report) {
  const sel = getSelectedObject();
  if (!sel) {
    els.detailsHost.innerHTML = '<div class="details-group"><h3>No selection</h3><div class="field">Select a node, processor, or render area from outliner or canvas.</div></div>';
    return;
  }

  if (state.selection.type === 'node') {
    const node = sel;
    const backupOptions = ['<option value="">None</option>', ...state.nodes.filter((n) => n.id !== node.id).map((n) => `<option value="${n.id}" ${n.id === node.backupNodeId ? 'selected' : ''}>${escapeHtml(n.name)}</option>`)].join('');
    els.detailsHost.innerHTML = `
      <div class="details-group">
        <h3>Render Node</h3>
        <label class="field" title="Identifier for this render machine">Name<input data-edit="node.name" value="${escapeAttr(node.name)}" /></label>
        <div class="grid-2">
          <label class="field" title="Maximum single output width supported by this node">Max Width<input type="number" data-edit="node.maxWidth" value="${node.maxWidth}" /></label>
          <label class="field" title="Maximum single output height supported by this node">Max Height<input type="number" data-edit="node.maxHeight" value="${node.maxHeight}" /></label>
          <label class="field" title="Physical output ports on this node - sets maximum render regions">Output Ports<input type="number" data-edit="node.outputs" value="${node.outputs}" min="1" max="8" /></label>
          <div class="field" title="Max pixel throughput derived from Max Width x Max Height">Max MPix<br><strong>${((node.maxWidth * node.maxHeight) / 1_000_000).toFixed(2)} MPix</strong><br><span style="font-size:0.68rem;color:var(--muted)">${node.maxWidth}x${node.maxHeight}</span></div>
        </div>
        <label class="field" title="Optional failover node. Use this only when running redundancy (N+1 or mirror).">Failover Node (Optional)<select data-edit="node.backupNodeId">${backupOptions}</select></label>
        <div class="toolbar-group">
          <button class="tool-btn" data-action="copy-node-settings" title="Copy this node's sizing/output settings">Copy Node Settings</button>
          <button class="tool-btn" data-action="paste-node-settings" title="Paste copied settings into this node" ${nodeSettingsClipboard ? '' : 'disabled'}>Paste Settings</button>
        </div>
      </div>`;
  } else if (state.selection.type === 'processor') {
    const processor = sel;
    const pLoad = report.processorLoads[processor.id] || { capacityMPix: 0, matchedFps: 24, source: 'Custom', xdPortCapacityPixels: 0, xdPortsRequired: 0, xdsRequired: 0 };
    els.detailsHost.innerHTML = `
      <div class="details-group">
        <h3>Processor</h3>
        <label class="field" title="Identifier for LED processor/controller">Name<input data-edit="processor.name" value="${escapeAttr(processor.name)}" /></label>
        <div class="field proc-profile-display" title="Processor type is set project-wide in Wall Settings">Type (project-wide)<span class="proc-profile-badge">${escapeHtml(state.metadata.processorProfile || 'Brompton SX40')}</span></div>
        <div class="grid-2">
          ${selectField('Capacity Mode', 'processor.capacityMode', ['profile', 'custom'], processor.capacityMode, 'Use profile capacity or manual MPix cap')}
          ${selectField('Latency Mode', 'processor.latencyMode', ['From Project', 'Standard', 'ULL'], processor.latencyMode, 'Latency mode for this processor')}
          <label class="field" title="Manual processor cap in MPix (used in Custom mode)">Custom MPix<input type="number" step="0.1" data-edit="processor.customMPix" value="${processor.customMPix}" ${processor.capacityMode === 'custom' ? '' : 'disabled'} /></label>
        </div>
      </div>
      <div class="details-group">
        <h3>Computed Throughput</h3>
        <div class="field">Resolved cap: <strong>${pLoad.capacityMPix.toFixed(3)} MPix/frame</strong></div>
        <div class="field">Source: ${escapeHtml(pLoad.source)} (fps matched: ${pLoad.matchedFps}, mode: ${escapeHtml(pLoad.latencyMode)})</div>
        <div class="field">Project context: ${state.metadata.frameRate} fps / ${state.metadata.colorDepth} / ${state.metadata.latencyMode}</div>
        ${(() => {
          const reg = PROCESSOR_REGISTRY[processor.profile];
          const unitLabel = pLoad.portUnitLabel || 'XD';
          const ppu = pLoad.portsPerUnit || XD_DOWNLINK_PORTS;
          const maxUnits = reg ? (reg.maxUnits === Infinity ? '∞' : String(reg.maxUnits)) : String(SX40_UPLINK_PORTS);
          const hardCap = reg?.hardCapMPix ? `<div class="field">Hard cap: <strong>${reg.hardCapMPix} MPix/frame</strong> per unit</div>` : '';
          const infoNote = reg?.infoNote ? `<div class="field proc-info-note">${escapeHtml(reg.infoNote)}</div>` : '';
          return `
        <div class="field">${unitLabel} port capacity (1G): ${formatInt(pLoad.xdPortCapacityPixels)} px/port</div>
        <div class="field">${unitLabel} required: ${pLoad.xdPortsRequired} ports → ${pLoad.xdsRequired} ${unitLabel}(s) @ ${ppu} ports each</div>
        <div class="field">Max ${unitLabel} per processor: ${maxUnits}</div>${hardCap}${infoNote}`;
        })()}
      </div>`;
  } else if (state.selection.type === 'region') {
    const region = sel;
    const nodeOpts = ['<option value="">Unassigned</option>', ...state.nodes.map((n) => `<option value="${n.id}" ${n.id === region.nodeId ? 'selected' : ''}>${escapeHtml(n.name)}</option>`)].join('');
    const procOpts = ['<option value="">Unassigned</option>', ...state.processors.map((p) => `<option value="${p.id}" ${p.id === region.processorId ? 'selected' : ''}>${escapeHtml(p.name)}</option>`)].join('');
    const roleOpts = roles.map((role) => `<option value="${role}" ${region.role === role ? 'selected' : ''}>${role}</option>`).join('');

    els.detailsHost.innerHTML = `
      <div class="details-group">
        <h3>Render Area</h3>
        <label class="field" title="Name of this mapped wall area">Name<input data-edit="region.name" value="${escapeAttr(region.name)}" /></label>
        <div class="grid-2">
          <label class="field" title="X origin in cabinet tiles">Coord X<input type="number" data-edit="region.x" value="${region.x}" /></label>
          <label class="field" title="Y origin in cabinet tiles">Coord Y<input type="number" data-edit="region.y" value="${region.y}" /></label>
          <label class="field" title="Width in cabinet tiles">W (tiles)<input type="number" data-edit="region.w" value="${region.w}" /></label>
          <label class="field" title="Height in cabinet tiles">H (tiles)<input type="number" data-edit="region.h" value="${region.h}" /></label>
        </div>
        <label class="field" title="Render node responsible for this area"><select data-edit="region.nodeId" class="${region.nodeId ? '' : 'unassigned-select'}">${nodeOpts}</select></label>
        <label class="field" title="Processor responsible for this area"><select data-edit="region.processorId" class="${region.processorId ? '' : 'unassigned-select'}">${procOpts}</select></label>
        <label class="field" title="Logical purpose"><select data-edit="region.role">${roleOpts}</select></label>
        <div class="toolbar-group">
          <button class="tool-btn" data-action="smart-size-region" title="Auto-size this region to use processor capacity efficiently">Smart Size Region</button>
        </div>
      </div>`;
  }

  bindDetailsEditors();
}

function renderWallDetails(report) {
  const w = state.wall;
  els.detailsHost.innerHTML = `
    <div class="details-group">
      <h3>Wall Geometry</h3>
      <div class="grid-2">
        <label class="field" title="Total cabinets horizontally">Wall Tiles X<input type="number" data-edit="wall.wallTilesX" value="${w.wallTilesX}" /></label>
        <label class="field" title="Total cabinets vertically">Wall Tiles Y<input type="number" data-edit="wall.wallTilesY" value="${w.wallTilesY}" /></label>
        <label class="field" title="Pixel width per cabinet">Cabinet Width px<input type="number" data-edit="wall.tilePxW" value="${w.tilePxW}" /></label>
        <label class="field" title="Pixel height per cabinet">Cabinet Height px<input type="number" data-edit="wall.tilePxH" value="${w.tilePxH}" /></label>
        <label class="field" title="Physical width in millimeters per cabinet">Cabinet Width mm<input type="number" data-edit="wall.tileMmW" value="${w.tileMmW}" /></label>
        <label class="field" title="Physical height in millimeters per cabinet">Cabinet Height mm<input type="number" data-edit="wall.tileMmH" value="${w.tileMmH}" /></label>
      </div>
      <div class="grid-2">
        <label class="field" title="Capacity guardrail subtracted from node caps">Safety Margin %<input type="number" data-edit="wall.safetyMargin" value="${w.safetyMargin}" /></label>
        <label class="field" title="Warning threshold for node load">Target Util %<input type="number" data-edit="wall.targetUtil" value="${w.targetUtil}" /></label>
      </div>
    </div>
    <div class="details-group">
      <h3>Computed</h3>
      <div class="field">Canvas: ${report.wall.wallPxW}x${report.wall.wallPxH} px</div>
      <div class="field">Total Pixels: ${formatInt(report.wall.wallTotalPixels)} (${report.wall.wallTotalMPix.toFixed(2)} MPix)</div>
      <div class="field">Physical: ${(report.wall.wallMmW / 1000).toFixed(2)}m x ${(report.wall.wallMmH / 1000).toFixed(2)}m</div>
      <div class="field">Pitch: ${report.wall.pixelPitchW.toFixed(2)}mm x ${report.wall.pixelPitchH.toFixed(2)}mm</div>
    </div>`;

  bindDetailsEditors();
}

function renderDeploymentDetails(report) {
  const summary = deploymentSummary(report);
  els.detailsHost.innerHTML = `
    <div class="details-group">
      <h3>Video / Sync</h3>
      <label class="field" title="Project label"><input data-edit="meta.projectName" value="${escapeAttr(state.metadata.projectName)}" /></label>
      <label class="field" title="Build/revision tag"><input data-edit="meta.buildTag" value="${escapeAttr(state.metadata.buildTag)}" /></label>
      <div class="grid-2">
        ${selectField('Frame Rate', 'meta.frameRate', FPS_OPTIONS, state.metadata.frameRate, 'Global frame rate')}
        ${selectField('Color Depth', 'meta.colorDepth', ['8-bit', '10-bit', '12-bit'], state.metadata.colorDepth, 'Global color depth')}
        ${selectField('Color Space', 'meta.colorSpace', ['Rec.709', 'DCI-P3', 'Rec.2020'], state.metadata.colorSpace, 'Global gamut')}
        ${selectField('EOTF', 'meta.eotf', ['Gamma 2.2', 'Gamma 2.4', 'PQ (ST.2084)'], state.metadata.eotf, 'Transfer function')}
        ${selectField('Sync', 'meta.syncMode', ['Genlock', 'Free Run'], state.metadata.syncMode, 'Frame sync mode')}
        ${selectField('Redundancy', 'meta.redundancy', ['None', 'N+1', 'Full Mirror'], state.metadata.redundancy, 'Failover strategy')}
        ${selectField('Latency', 'meta.latencyMode', ['Standard', 'ULL'], state.metadata.latencyMode, 'Project latency mode')}
      </div>
      <label class="field">Genlock Source<input data-edit="meta.genlockSource" value="${escapeAttr(state.metadata.genlockSource)}" /></label>
      <label class="field">Control Network<input data-edit="meta.controlNetwork" value="${escapeAttr(state.metadata.controlNetwork)}" /></label>
    </div>
    <div class="details-group">
      <h3>Deployment Summary</h3>
      <label class="field"><textarea rows="14" readonly>${escapeHtml(summary)}</textarea></label>
    </div>`;

  bindDetailsEditors();
}

function bindDetailsEditors() {
  els.detailsHost.querySelectorAll('[data-edit]').forEach((input) => {
    input.addEventListener('input', onDetailsEdit);
    input.addEventListener('change', onDetailsEdit);
  });
  els.detailsHost.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', onDetailsAction);
  });
}

function onDetailsEdit(e) {
  const path = e.target.dataset.edit;
  const value = e.target.value;

  if (path.startsWith('node.')) {
    const node = getSelectedObject('node');
    if (!node) return;
    setField(node, path.slice(5), value);
  } else if (path.startsWith('processor.')) {
    const processor = getSelectedObject('processor');
    if (!processor) return;
    setField(processor, path.slice(10), value);
    sanitizeProcessor(processor);
  } else if (path.startsWith('region.')) {
    const region = getSelectedObject('region');
    if (!region) return;
    setField(region, path.slice(7), value);
    clampRegion(region);
  } else if (path.startsWith('wall.')) {
    setField(state.wall, path.slice(5), value);
    sanitizeWall();
  } else if (path.startsWith('meta.')) {
    setField(state.metadata, path.slice(5), value);
  }

  if (e.type === 'input') {
    renderAll(undefined, { skipDetails: true });
    return;
  }
  renderAll('Updated details');
}

function onDetailsAction(e) {
  const action = e.currentTarget.dataset.action;
  if (action === 'copy-node-settings') {
    const node = getSelectedObject('node');
    if (!node) return;
    nodeSettingsClipboard = {
      maxWidth: node.maxWidth,
      maxHeight: node.maxHeight,
      maxMPix: node.maxMPix,
      outputs: node.outputs
    };
    renderAll('Copied node settings');
    return;
  }

  if (action === 'paste-node-settings') {
    const node = getSelectedObject('node');
    if (!node || !nodeSettingsClipboard) return;
    node.maxWidth = nodeSettingsClipboard.maxWidth;
    node.maxHeight = nodeSettingsClipboard.maxHeight;
    node.maxMPix = nodeSettingsClipboard.maxMPix;
    node.outputs = nodeSettingsClipboard.outputs;
    renderAll(`Pasted settings into ${node.name}`);
    return;
  }

  if (action === 'smart-size-region') {
    const region = getSelectedObject('region');
    if (!region) return;
    const smart = suggestSmartPlacementForProcessor(region.processorId, region.id);
    region.x = smart.x;
    region.y = smart.y;
    region.w = smart.w;
    region.h = smart.h;
    clampRegion(region);
    renderAll(`Smart-sized ${region.name}`);
  }
}

function suggestSmartPlacementForProcessor(processorId, ignoreRegionId = '') {
  const tilePxW = Math.max(1, state.wall.tilePxW);
  const tilePxH = Math.max(1, state.wall.tilePxH);
  const tilePixels = tilePxW * tilePxH;

  // Resolve processor + port constraints.
  const processor = state.processors.find((p) => p.id === processorId) || defaultProcessor('tmp');
  const resolved = resolveProcessorCapacity(processor, state.metadata);
  const portData = resolvePortCapacityForProcessor(processor, state.metadata);
  const procCapPixels = Math.floor(resolved.capacityMPix * 1_000_000);

  if (tilePixels > portData.portPixels) {
    return { x: 0, y: 0, w: 1, h: 1 };
  }
  const panelsPerPort = Math.min(
    Math.floor(portData.portPixels / tilePixels),
    XD_MAX_PANELS_PER_PORT
  );
  const portsPerProc = getPortsPerProcessorLimit(processor);
  const maxPanelsByPorts = panelsPerPort * portsPerProc;
  const maxPanelsByPixels = Math.max(1, Math.floor(procCapPixels / tilePixels));
  const maxPanels = Math.min(maxPanelsByPixels, maxPanelsByPorts, 2000);

  // Resolve node dimension constraints - also cap by processor input group at current FPS.
  const region = state.regions.find((r) => r.id === ignoreRegionId);
  const node = region ? state.nodes.find((n) => n.id === region.nodeId) : state.nodes[0];
  const rawNodeMaxW = node ? node.maxWidth : 7680;
  const rawNodeMaxH = node ? node.maxHeight : 4320;
  const ig = getInputGroup(processor.profile, state.metadata.frameRate);
  // Allow up to the larger input-group dimension in either axis so portrait regions are valid.
  // ig.w is always the wider landscape dimension (ig.w >= ig.h for all known processors).
  const igMaxDim = ig ? ig.w : Infinity;
  const nodeMaxW = Math.min(rawNodeMaxW, igMaxDim);
  const nodeMaxH = Math.min(rawNodeMaxH, igMaxDim);
  const maxTilesW = Math.min(state.wall.wallTilesX, Math.max(1, Math.floor(nodeMaxW / tilePxW)));
  const maxTilesH = Math.min(state.wall.wallTilesY, Math.max(1, Math.floor(nodeMaxH / tilePxH)));

  // Find best w x h that fits all constraints and maximises area.
  const aspect = state.wall.wallTilesX / Math.max(1, state.wall.wallTilesY);
  let bestW = 1;
  let bestH = 1;
  for (let h = 1; h <= maxTilesH; h++) {
    const rPxH = h * tilePxH;
    // Determine the width limit from the input group for this row height.
    // If rPxH fits the landscape height (ig.h) → landscape mode, width limited by ig.w.
    // If rPxH fits the portrait height (ig.w) but exceeds ig.h → portrait mode, width limited by ig.h.
    let igWCap = Infinity;
    if (ig) {
      if (rPxH <= ig.h) {
        igWCap = Math.floor(ig.w / tilePxW);       // landscape: wide side free
      } else if (rPxH <= ig.w) {
        igWCap = Math.floor(ig.h / tilePxW);       // portrait: narrow side caps width
      } else {
        continue;                                   // height exceeds both dimensions
      }
    }
    const wByPanels = Math.floor(maxPanels / h);
    const wByPixels = Math.floor(procCapPixels / (h * tilePixels));
    const w = Math.min(maxTilesW, wByPanels, wByPixels, igWCap);
    if (w < 1) continue;
    if (w * h > bestW * bestH) { bestW = w; bestH = h; }
    else if (w * h === bestW * bestH) {
      // Prefer shape closer to wall aspect ratio.
      if (Math.abs(w / h - aspect) < Math.abs(bestW / bestH - aspect)) { bestW = w; bestH = h; }
    }
  }

  let found = findOpenSlot(bestW, bestH, ignoreRegionId);
  if (!found) {
    // Try progressively smaller sizes.
    for (let h = bestH; h >= 1 && !found; h--) {
      for (let w = Math.min(bestW, Math.floor(maxPanels / h)); w >= 1 && !found; w--) {
        if (w * h * tilePixels > procCapPixels) continue;
        found = findOpenSlot(w, h, ignoreRegionId);
      }
    }
  }

  if (!found) {
    found = { x: 0, y: 0, w: bestW, h: bestH };
  }
  return found;
}

function findOpenSlot(w, h, ignoreRegionId = '') {
  const regions = state.regions.filter((r) => r.id !== ignoreRegionId);
  for (let y = 0; y <= state.wall.wallTilesY - h; y += 1) {
    for (let x = 0; x <= state.wall.wallTilesX - w; x += 1) {
      const probe = { x, y, w, h };
      const blocked = regions.some((r) => rectOverlap(probe, r));
      if (!blocked) {
        return probe;
      }
    }
  }
  return null;
}

function sanitizeWall() {
  state.wall.wallTilesX = clampInt(state.wall.wallTilesX, 1, 400);
  state.wall.wallTilesY = clampInt(state.wall.wallTilesY, 1, 200);
  state.wall.tilePxW = clampInt(state.wall.tilePxW, 1, 5000);
  state.wall.tilePxH = clampInt(state.wall.tilePxH, 1, 5000);
  state.wall.tileMmW = clampInt(state.wall.tileMmW, 1, 2000);
  state.wall.tileMmH = clampInt(state.wall.tileMmH, 1, 2000);
  state.wall.safetyMargin = clampFloat(state.wall.safetyMargin, 0, 50);
  state.wall.targetUtil = clampFloat(state.wall.targetUtil, 20, 100);
  state.regions.forEach(clampRegion);
}

function sanitizeProcessor(processor) {
  processor.customMPix = clampFloat(processor.customMPix, 0.1, 1000);
  if (!PROCESSOR_PROFILES.includes(processor.profile)) {
    processor.profile = 'Custom';
  }
  if (!['profile', 'custom'].includes(processor.capacityMode)) {
    processor.capacityMode = 'custom';
  }
  if (!['From Project', 'Standard', 'ULL'].includes(processor.latencyMode)) {
    processor.latencyMode = 'From Project';
  }
}

function setField(obj, key, raw) {
  if (['x', 'y', 'w', 'h', 'maxWidth', 'maxHeight', 'outputs', 'wallTilesX', 'wallTilesY', 'tilePxW', 'tilePxH', 'tileMmW', 'tileMmH'].includes(key)) {
    obj[key] = clampInt(raw, 0, 100000);
    return;
  }
  if (['maxMPix', 'safetyMargin', 'targetUtil', 'customMPix'].includes(key)) {
    obj[key] = clampFloat(raw, 0, 100000);
    return;
  }
  obj[key] = raw;
}

function renderCanvas(report) {
  resizeCanvas();
  const ctx = els.canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);

  const origin = tileToScreen(0, 0);
  const wallW = state.wall.wallTilesX * view.zoom;
  const wallH = state.wall.wallTilesY * view.zoom;

  ctx.fillStyle = '#0b1525';
  ctx.fillRect(origin.x, origin.y, wallW, wallH);

  drawGrid(ctx);

  state.regions.forEach((region, idx) => {
    const unassigned = !region.nodeId;
    const c = unassigned ? '#888899' : colorForRegion(region, idx);
    const p = tileToScreen(region.x, region.y);
    const rw = region.w * view.zoom;
    const rh = region.h * view.zoom;
    const selected = isSelected('region', region.id);

    ctx.fillStyle = hexToRgba(c, selected ? 0.42 : 0.18);
    ctx.strokeStyle = selected ? '#ffffff' : c;
    ctx.lineWidth = selected ? 2.2 : 1.4;
    ctx.fillRect(p.x, p.y, rw, rh);

    if (unassigned) {
      // Draw grey diagonal hatching for unassigned regions.
      ctx.save();
      ctx.beginPath();
      ctx.rect(p.x, p.y, rw, rh);
      ctx.clip();
      ctx.strokeStyle = 'rgba(160, 160, 180, 0.35)';
      ctx.lineWidth = 1;
      const spacing = Math.max(6, view.zoom * 0.45);
      const diag = rw + rh;
      for (let d = -rh; d < rw; d += spacing) {
        ctx.beginPath();
        ctx.moveTo(p.x + d, p.y);
        ctx.lineTo(p.x + d + diag, p.y + diag);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.strokeRect(p.x, p.y, rw, rh);

    ctx.fillStyle = unassigned ? '#aaaacc' : '#edf4ff';
    ctx.font = '12px "Roboto Mono", monospace';
    const label = `${region.name} ${region.w * state.wall.tilePxW}x${region.h * state.wall.tilePxH}`;
    ctx.fillText(label, p.x + 5, p.y + 14);

    if (selected) {
      drawHandles(ctx, region);
    }
  });

  if (view.showCableOverlay && report.cablePlan) {
    drawCableOverlay(ctx, report.cablePlan);
  }

  ctx.strokeStyle = '#6b8fca';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(origin.x, origin.y, wallW, wallH);

  // Draw wall dimensions overlay inside/below canvas area.
  const wallPxW = report.wall.wallPxW;
  const wallPxH = report.wall.wallPxH;
  const wallMmW = report.wall.wallMmW;
  const wallMmH = report.wall.wallMmH;
  const dimLabel = `${wallPxW}x${wallPxH}px  |  ${(wallMmW / 1000).toFixed(2)}m x ${(wallMmH / 1000).toFixed(2)}m`;
  ctx.save();
  ctx.font = 'bold 11px "Roboto Mono", monospace';
  const textW = ctx.measureText(dimLabel).width;
  const labelX = origin.x + (wallW - textW) / 2;
  const labelY = origin.y + wallH + 16;
  if (labelY < els.canvas.height - 4) {
    ctx.fillStyle = 'rgba(10,12,20,0.65)';
    ctx.fillRect(labelX - 6, labelY - 12, textW + 12, 18);
    ctx.fillStyle = '#9eb8e8';
    ctx.fillText(dimLabel, labelX, labelY);
  }
  ctx.restore();

  const coverage = report.wall.coveragePct.toFixed(1);
  const selectedRegion = getSelectedObject('region');
  const selectText = selectedRegion ? `${selectedRegion.name} @ ${selectedRegion.x},${selectedRegion.y} ${selectedRegion.w}x${selectedRegion.h}` : 'none';
  els.canvasStatus.textContent = `Zoom ${view.zoom.toFixed(1)} px/tile | Coverage ${coverage}% | Selected ${selectText}`;
}

function drawGrid(ctx) {
  const start = tileToScreen(0, 0);
  ctx.strokeStyle = 'rgba(143, 175, 228, 0.22)';
  ctx.lineWidth = 1;

  for (let x = 1; x < state.wall.wallTilesX; x += 1) {
    const px = start.x + x * view.zoom;
    ctx.beginPath();
    ctx.moveTo(px, start.y);
    ctx.lineTo(px, start.y + state.wall.wallTilesY * view.zoom);
    ctx.stroke();
  }

  for (let y = 1; y < state.wall.wallTilesY; y += 1) {
    const py = start.y + y * view.zoom;
    ctx.beginPath();
    ctx.moveTo(start.x, py);
    ctx.lineTo(start.x + state.wall.wallTilesX * view.zoom, py);
    ctx.stroke();
  }
}

function drawCableOverlay(ctx, cablePlan) {
  if (!cablePlan?.processorPlans?.length) return;
  let globalXdOffset = 0;
  cablePlan.processorPlans.forEach((procPlan) => {
    procPlan.xds.forEach((xd) => {
      const displayXdIdx = view.globalUnitNumbering ? globalXdOffset + xd.index : xd.index;
      xd.ports.forEach((port) => {
        if (!port.segments?.length) return;
        const tilePath = buildPortTilePath(port);
        const stepCount = tilePath.length;
        tilePath.forEach((tile, idx) => {
          const color = cableFillColorForStep(tile.base, port.index, idx, stepCount, 0.62);
          ctx.fillStyle = color;
          const p = tileToScreen(tile.x, tile.y);
          ctx.fillRect(p.x + 1, p.y + 1, Math.max(0, view.zoom - 2), Math.max(0, view.zoom - 2));
        });
        if (view.zoom >= 24 && tilePath.length) {
          const p = tileToScreen(tilePath[0].x, tilePath[0].y);
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.font = '10px "Roboto Mono", monospace';
          ctx.fillText(`${procPlan.portUnitPrefix || 'X'}${displayXdIdx}P${port.index}`, p.x + 3, p.y + 11);
        }
        drawPortDaisyArrows(ctx, tilePath, port.index);
      });
    });
    globalXdOffset += procPlan.xds.length;
  });
}

function buildPortTilePath(port) {
  const tilePath = [];
  const segs = port.segments || [];
  segs.forEach((seg) => {
    const region = state.regions.find((r) => r.id === seg.regionId);
    const regionIndex = region ? Math.max(0, state.regions.findIndex((r) => r.id === region.id)) : 0;
    const base = region ? colorForRegion(region, regionIndex) : '#6cb0ff';
    if (seg.vertical) {
      // N / invN: column segment - traverse rows within this column.
      const start = seg.reversed ? seg.h - 1 : 0;
      const end   = seg.reversed ? -1 : seg.h;
      const step  = seg.reversed ? -1 : 1;
      for (let ty = start; ty !== end; ty += step) {
        tilePath.push({ x: seg.x, y: seg.y + ty, base });
      }
    } else {
      // linear / S / invS: row segment - traverse columns within this row.
      const start = seg.reversed ? seg.w - 1 : 0;
      const end   = seg.reversed ? -1 : seg.w;
      const step  = seg.reversed ? -1 : 1;
      for (let tx = start; tx !== end; tx += step) {
        tilePath.push({ x: seg.x + tx, y: seg.y, base });
      }
    }
  });
  return tilePath;
}

function drawPortDaisyArrows(ctx, tilePath, portIndex) {
  if (view.zoom < 10) return;
  if (tilePath.length < 2) return;

  const stepCount = tilePath.length - 1;
  for (let i = 0; i < stepCount; i += 1) {
    const stroke = cableArrowColorForStep(tilePath[i].base, portIndex, i, stepCount, 0.9);
    drawArrowBetweenTiles(ctx, tilePath[i], tilePath[i + 1], stroke);
  }
}

function drawArrowBetweenTiles(ctx, fromTile, toTile, stroke) {
  const p1 = tileToScreen(fromTile.x + 0.5, fromTile.y + 0.5);
  const p2 = tileToScreen(toTile.x + 0.5, toTile.y + 0.5);
  drawArrowLine(ctx, p1.x, p1.y, p2.x, p2.y, stroke);
}

function drawArrowLine(ctx, x1, y1, x2, y2, stroke) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;

  const ux = dx / len;
  const uy = dy / len;
  const pad = Math.min(8, Math.max(2, view.zoom * 0.15));
  const sx = x1 + ux * pad;
  const sy = y1 + uy * pad;
  const ex = x2 - ux * pad;
  const ey = y2 - uy * pad;

  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = stroke;
  ctx.lineWidth = Math.max(1.2, Math.min(2.8, view.zoom * 0.045));
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();

  const head = Math.max(5, Math.min(10, view.zoom * 0.12));
  const angle = Math.atan2(ey - sy, ex - sx);
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - head * Math.cos(angle - Math.PI / 7), ey - head * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(ex - head * Math.cos(angle + Math.PI / 7), ey - head * Math.sin(angle + Math.PI / 7));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawHandles(ctx, region) {
  const size = Math.max(6, Math.min(10, view.zoom * 0.25));
  const corners = {
    nw: { x: region.x, y: region.y },
    ne: { x: region.x + region.w, y: region.y },
    sw: { x: region.x, y: region.y + region.h },
    se: { x: region.x + region.w, y: region.y + region.h }
  };

  ctx.fillStyle = '#ffffff';
  handles.forEach((h) => {
    const p = tileToScreen(corners[h].x, corners[h].y);
    ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
  });
}

function onPointerDown(e) {
  const hit = hitTest(e.offsetX, e.offsetY);

  if (e.button === 2 || e.button === 1 || (e.button === 0 && e.altKey)) {
    view.dragging = true;
    view.dragMode = 'pan';
    view.panStart = { x: e.clientX, y: e.clientY, panX: view.panX, panY: view.panY };
    els.canvas.style.cursor = 'grabbing';
    renderAll('Pan start');
    return;
  }

  if (hit?.type === 'handle') {
    view.dragging = true;
    view.dragMode = 'resize';
    view.dragRegionId = hit.regionId;
    view.dragHandle = hit.handle;
    const reg = state.regions.find((r) => r.id === hit.regionId);
    view.dragStart = { region: { ...reg }, screenX: e.offsetX, screenY: e.offsetY };
    select('region', hit.regionId);
    renderAll('Resize start');
    return;
  }

  if (hit?.type === 'region') {
    view.dragging = true;
    view.dragMode = 'move';
    view.dragRegionId = hit.regionId;
    const reg = state.regions.find((r) => r.id === hit.regionId);
    const tile = screenToTile(e.offsetX, e.offsetY);
    view.dragStart = { region: { ...reg }, tileStart: tile };
    select('region', hit.regionId);
    renderAll('Move start');
    return;
  }

  const t = screenToTile(e.offsetX, e.offsetY);
  if (inWall(t.x, t.y)) {
    // Left-drag on empty canvas pans the wall editor view.
    view.dragging = true;
    view.dragMode = 'pan';
    view.panStart = { x: e.clientX, y: e.clientY, panX: view.panX, panY: view.panY };
    els.canvas.style.cursor = 'grabbing';
    state.selection = { type: 'none', id: '' };
    renderAll('Pan start');
  }
}

function updateCanvasCursor(e) {
  if (view.dragging) {
    els.canvas.style.cursor = view.dragMode === 'pan' ? 'grabbing' : 'default';
    return;
  }
  const hit = hitTest(e.offsetX, e.offsetY);
  if (hit?.type === 'handle') {
    const resizeCursors = { nw: 'nw-resize', ne: 'ne-resize', sw: 'sw-resize', se: 'se-resize' };
    els.canvas.style.cursor = resizeCursors[hit.handle] || 'nwse-resize';
  } else if (hit?.type === 'region') {
    els.canvas.style.cursor = 'grab';
  } else {
    const t = screenToTile(e.offsetX, e.offsetY);
    els.canvas.style.cursor = inWall(t.x, t.y) ? 'grab' : 'default';
  }
}

function onPointerMove(e) {
  if (!view.dragging) {
    updateCanvasCursor(e);
    return;
  }

  if (view.dragMode === 'pan' && view.panStart) {
    view.panX = view.panStart.panX + (e.clientX - view.panStart.x);
    view.panY = view.panStart.panY + (e.clientY - view.panStart.y);
    renderCanvas(calculateReport());
    return;
  }

  if (view.dragMode === 'move') {
    const region = state.regions.find((r) => r.id === view.dragRegionId);
    if (!region || !view.dragStart) return;
    const now = screenToTileFromClient(e.clientX, e.clientY);
    const dx = now.x - view.dragStart.tileStart.x;
    const dy = now.y - view.dragStart.tileStart.y;
    region.x = view.dragStart.region.x + dx;
    region.y = view.dragStart.region.y + dy;
    clampRegion(region);
    renderAll();
    return;
  }

  if (view.dragMode === 'resize') {
    const region = state.regions.find((r) => r.id === view.dragRegionId);
    if (!region || !view.dragStart) return;
    const now = screenToTileFromClient(e.clientX, e.clientY);
    resizeByHandle(region, view.dragStart.region, view.dragHandle, now);
    clampRegion(region);
    renderAll();
  }
}

function onPointerUp() {
  if (view.dragging && view.dragMode) {
    renderAll(`Interaction complete (${view.dragMode})`);
  }
  view.dragging = false;
  view.dragMode = '';
  view.dragHandle = '';
  view.dragRegionId = '';
  view.dragStart = null;
  view.panStart = null;
  els.canvas.style.cursor = 'default';
}

function onWheel(e) {
  e.preventDefault();
  const before = screenToTile(e.offsetX, e.offsetY);
  const factor = e.deltaY > 0 ? 0.92 : 1.08;
  view.zoom = clampFloat(view.zoom * factor, 7, 180);
  const after = tileToScreen(before.x, before.y);
  view.panX += e.offsetX - after.x;
  view.panY += e.offsetY - after.y;
  renderCanvas(calculateReport());
}

function resizeByHandle(region, base, handle, tile) {
  const min = 1;
  const maxX = state.wall.wallTilesX;
  const maxY = state.wall.wallTilesY;

  let x1 = base.x;
  let y1 = base.y;
  let x2 = base.x + base.w;
  let y2 = base.y + base.h;

  if (handle.includes('n')) y1 = clampInt(tile.y, 0, y2 - min);
  if (handle.includes('s')) y2 = clampInt(tile.y, y1 + min, maxY);
  if (handle.includes('w')) x1 = clampInt(tile.x, 0, x2 - min);
  if (handle.includes('e')) x2 = clampInt(tile.x, x1 + min, maxX);

  region.x = x1;
  region.y = y1;
  region.w = Math.max(min, x2 - x1);
  region.h = Math.max(min, y2 - y1);
}

function hitTest(screenX, screenY) {
  const tile = screenToTile(screenX, screenY);
  const selected = getSelectedObject('region');

  if (selected) {
    for (const handle of handles) {
      if (hitHandle(selected, handle, screenX, screenY)) {
        return { type: 'handle', regionId: selected.id, handle };
      }
    }
  }

  for (let i = state.regions.length - 1; i >= 0; i -= 1) {
    const region = state.regions[i];
    if (tile.x >= region.x && tile.x < region.x + region.w && tile.y >= region.y && tile.y < region.y + region.h) {
      return { type: 'region', regionId: region.id };
    }
  }
  return null;
}

function hitHandle(region, handle, screenX, screenY) {
  const size = Math.max(6, Math.min(12, view.zoom * 0.25));
  const c = {
    nw: tileToScreen(region.x, region.y),
    ne: tileToScreen(region.x + region.w, region.y),
    sw: tileToScreen(region.x, region.y + region.h),
    se: tileToScreen(region.x + region.w, region.y + region.h)
  }[handle];

  return Math.abs(screenX - c.x) <= size && Math.abs(screenY - c.y) <= size;
}

function renderIssues(issues) {
  els.issues.innerHTML = issues.map((item) => `<div class="issue ${item.level}">${escapeHtml(item.message)}</div>`).join('');
}

function calculateReport() {
  const w = state.wall;
  const wallPxW = w.wallTilesX * w.tilePxW;
  const wallPxH = w.wallTilesY * w.tilePxH;
  const wallTotalPixels = wallPxW * wallPxH;
  const wallTotalMPix = wallTotalPixels / 1_000_000;
  const wallMmW = w.wallTilesX * w.tileMmW;
  const wallMmH = w.wallTilesY * w.tileMmH;
  const pixelPitchW = w.tileMmW / w.tilePxW;
  const pixelPitchH = w.tileMmH / w.tilePxH;

  const nodeLoads = Object.fromEntries(state.nodes.map((n) => [n.id, { node: n, regions: [], totalPixels: 0, maxRegionW: 0, maxRegionH: 0 }]));
  const processorLoads = Object.fromEntries(state.processors.map((p) => {
    const resolved = resolveProcessorCapacity(p, state.metadata);
    const portData = resolvePortCapacityForProcessor(p, state.metadata);
    return [p.id, {
      processor: p,
      regions: [],
      totalPixels: 0,
      capacityMPix: resolved.capacityMPix,
      matchedFps: resolved.matchedFps,
      source: resolved.source,
      latencyMode: resolved.latencyMode,
      xdPortCapacityPixels: portData.portPixels,
      xdFps: portData.matchedFps,
      xdBpc: portData.bpc,
      portUnitLabel: portData.portUnitLabel,
      portsPerUnit: portData.portsPerUnit,
      xdPortsRequired: 0,
      xdsRequired: 0
    }];
  }));

  const issues = [];

  for (const region of state.regions) {
    const pxW = region.w * w.tilePxW;
    const pxH = region.h * w.tilePxH;
    const px = pxW * pxH;

    if (region.x < 0 || region.y < 0 || region.w <= 0 || region.h <= 0) {
      issues.push(bad(`Region "${region.name}" has invalid size.`));
    }
    if (region.x + region.w > w.wallTilesX || region.y + region.h > w.wallTilesY) {
      issues.push(bad(`Region "${region.name}" exceeds wall bounds.`));
    }

    if (!region.nodeId) {
      issues.push(warn(`Region "${region.name}" is not assigned to a render node.`));
    } else if (nodeLoads[region.nodeId]) {
      const load = nodeLoads[region.nodeId];
      load.totalPixels += px;
      load.regions.push(region);
      load.maxRegionW = Math.max(load.maxRegionW, pxW);
      load.maxRegionH = Math.max(load.maxRegionH, pxH);
    }

    if (!region.processorId) {
      issues.push(warn(`Region "${region.name}" is not assigned to a processor.`));
    } else if (processorLoads[region.processorId]) {
      const load = processorLoads[region.processorId];
      load.totalPixels += px;
      load.regions.push(region);
    }
  }

  for (let i = 0; i < state.regions.length; i += 1) {
    for (let j = i + 1; j < state.regions.length; j += 1) {
      if (rectOverlap(state.regions[i], state.regions[j])) {
        issues.push(bad(`Overlap between "${state.regions[i].name}" and "${state.regions[j].name}".`));
      }
    }
  }

  const covered = new Set();
  for (const region of state.regions) {
    for (let y = region.y; y < region.y + region.h; y += 1) {
      for (let x = region.x; x < region.x + region.w; x += 1) {
        if (inWall(x, y)) covered.add(`${x},${y}`);
      }
    }
  }

  const totalTiles = w.wallTilesX * w.wallTilesY;
  const coveragePct = totalTiles > 0 ? (covered.size / totalTiles) * 100 : 0;
  if (coveragePct < 100) {
    issues.push(warn(`Coverage is ${coveragePct.toFixed(1)}%. ${totalTiles - covered.size} tile(s) are unassigned.`));
  }

  Object.values(nodeLoads).forEach((load) => {
    const n = load.node;
    const used = load.totalPixels / 1_000_000;
    const safeCap = n.maxMPix * (1 - w.safetyMargin / 100);

    if (load.maxRegionW > n.maxWidth || load.maxRegionH > n.maxHeight) {
      issues.push(bad(`${n.name} has region output exceeding ${n.maxWidth}x${n.maxHeight}.`));
    }
    if (used > safeCap) {
      issues.push(bad(`${n.name} exceeds safe cap (${used.toFixed(2)} > ${safeCap.toFixed(2)} MPix).`));
    } else if (used > n.maxMPix * (w.targetUtil / 100)) {
      issues.push(warn(`${n.name} is over target utilization (${used.toFixed(2)} MPix).`));
    }
    if (load.regions.length > MAX_REGIONS_PER_NODE) {
      issues.push(bad(`${n.name} has ${load.regions.length} regions assigned; max supported is ${MAX_REGIONS_PER_NODE}.`));
    }
  });

  Object.values(processorLoads).forEach((load) => {
    const p = load.processor;
    const used = load.totalPixels / 1_000_000;
    const perPort = Math.max(1, load.xdPortCapacityPixels);
    const tilePixels = Math.max(1, w.tilePxW * w.tilePxH);
    const totalPanels = load.regions.reduce((acc, r) => acc + (r.w * r.h), 0);
    const perPortPanelByPixels = Math.max(1, Math.floor(perPort / tilePixels));
    const panelCapPerPort = Math.max(1, Math.min(XD_MAX_PANELS_PER_PORT, perPortPanelByPixels));
    const portsPerProcessorLimit = getPortsPerProcessorLimit(p);
    const portsByPixels = Math.ceil(load.totalPixels / perPort);
    const portsByPanels = Math.ceil(totalPanels / panelCapPerPort);
    load.portPanelCap = panelCapPerPort;
    const ppu = load.portsPerUnit || XD_DOWNLINK_PORTS;
    const unitLabel = load.portUnitLabel || 'XD';
    load.xdPortsRequired = Math.max(portsByPixels, portsByPanels);
    load.xdsRequired = Math.ceil(load.xdPortsRequired / ppu);
    load.portsPerProcessorLimit = portsPerProcessorLimit;

    if (tilePixels > perPort) {
      issues.push(bad(`${p.name}: panel (${formatInt(tilePixels)} px) exceeds ${unitLabel} port capacity (${formatInt(perPort)} px/port). This configuration cannot be cabled.`));
    }
    const ig = getInputGroup(p.profile, state.metadata.frameRate);
    if (ig) {
      load.regions.forEach((r) => {
        const rPxW = r.w * w.tilePxW;
        const rPxH = r.h * w.tilePxH;
        // Accept either landscape (as-is) or portrait (90° rotated) orientation.
        const fitsLandscape = rPxW <= ig.w && rPxH <= ig.h;
        const fitsPortrait  = rPxH <= ig.w && rPxW <= ig.h;
        if (!fitsLandscape && !fitsPortrait) {
          issues.push(bad(`${p.name} → ${r.name}: region ${rPxW}x${rPxH} exceeds ${p.profile} input group ${ig.label} (${ig.w}x${ig.h} @ ≤${ig.maxHz}Hz) in both orientations.`));
        }
      });
    }
    if (used > load.capacityMPix) {
      issues.push(bad(`${p.name} exceeds processing cap (${used.toFixed(2)} > ${load.capacityMPix.toFixed(2)} MPix).`));
    }
    if (load.regions.length > 1) {
      issues.push(bad(`${p.name} has ${load.regions.length} regions assigned; policy is 1 region per processor.`));
    }
    if (load.xdPortsRequired > portsPerProcessorLimit) {
      const overPorts = load.xdPortsRequired - portsPerProcessorLimit;
      const maxPanelsAtPorts = panelCapPerPort * portsPerProcessorLimit;
      issues.push(warn(`${p.name} requires ${load.xdPortsRequired} ports (${load.xdsRequired} ${unitLabel}), limit is ${portsPerProcessorLimit} ports (${Math.ceil(portsPerProcessorLimit / ppu)} ${unitLabel}). Over by ${overPorts} ports. Max panels at current settings: ${maxPanelsAtPorts}.`));
    }
  });

  if (!issues.length) {
    issues.push(good('Validation passed. Current setup is within declared constraints.'));
  }

  const cablePlan = buildCablePlan({ processorLoads, wall: w });

  return {
    wall: {
      wallTilesX: w.wallTilesX,
      wallTilesY: w.wallTilesY,
      wallPxW,
      wallPxH,
      wallTotalPixels,
      wallTotalMPix,
      wallMmW,
      wallMmH,
      pixelPitchW,
      pixelPitchH,
      coveragePct
    },
    nodeLoads,
    processorLoads,
    cablePlan,
    issues
  };
}

function resolveProcessorCapacity(processor, metadata) {
  const latencyMode = processor.latencyMode === 'From Project' ? metadata.latencyMode : processor.latencyMode;

  if (processor.capacityMode === 'custom') {
    return {
      capacityMPix: clampFloat(processor.customMPix, 0.1, 1000),
      matchedFps: nearestKnownFps(metadata.frameRate),
      source: 'Custom MPix',
      latencyMode
    };
  }

  const reg = PROCESSOR_REGISTRY[processor.profile];
  if (reg) {
    const fps = reg.nearestFps(metadata.frameRate);
    const bpc = toBpc(metadata.colorDepth);
    return {
      capacityMPix: reg.capacityLookup(fps, bpc, latencyMode),
      matchedFps: fps,
      source: `${processor.profile} table`,
      latencyMode
    };
  }

  // Unknown / legacy profile - fall back to custom MPix.
  return {
    capacityMPix: clampFloat(processor.customMPix, 0.1, 1000),
    matchedFps: nearestKnownFps(metadata.frameRate),
    source: 'Custom profile fallback',
    latencyMode
  };
}

function resolveXdPortCapacity(metadata, latencyModeResolved) {
  const fps = nearestKnownFps(metadata.frameRate);
  const row = XD_PORT_TABLE[fps] || XD_PORT_TABLE[24];
  const mode = latencyModeResolved === 'ULL' ? 'ull' : 'standard';
  const bpc = toBpc(metadata.colorDepth);
  const portPixels = row[mode][bpc] ?? row[mode][10] ?? row[mode][8];
  return { portPixels, matchedFps: fps, bpc };
}

// Returns the nearest HELIOS FPS key >= raw (ceiling), so we always use the
// more restrictive (lower-capacity) row for fps values not in the table.
function nearestHeliosFps(raw) {
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return 24;
  for (const key of HELIOS_FPS_KEYS) {
    if (key >= n) return key;
  }
  return HELIOS_FPS_KEYS[HELIOS_FPS_KEYS.length - 1];
}

// Returns per-port pixel capacity + unit metadata for any registered processor.
function resolvePortCapacityForProcessor(processor, metadata) {
  const latencyMode = processor.latencyMode === 'From Project' ? metadata.latencyMode : processor.latencyMode;
  const reg = PROCESSOR_REGISTRY[processor.profile];
  if (reg) {
    const fps = reg.nearestFps(metadata.frameRate);
    const bpc = toBpc(metadata.colorDepth);
    return {
      portPixels: reg.portLookup(fps, bpc, latencyMode),
      matchedFps: fps,
      bpc,
      portUnitLabel: reg.portUnitLabel,
      portsPerUnit: reg.portsPerUnit
    };
  }
  // Fallback for unknown / custom profiles: use XD table.
  const data = resolveXdPortCapacity(metadata, latencyMode);
  return { ...data, portUnitLabel: 'XD', portsPerUnit: XD_DOWNLINK_PORTS };
}

function nearestKnownFps(raw) {
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return 24;
  let best = PERF_FPS_KEYS[0];
  let delta = Math.abs(n - best);
  for (const key of PERF_FPS_KEYS) {
    const d = Math.abs(n - key);
    if (d < delta) {
      best = key;
      delta = d;
    }
  }
  return best;
}

function toBpc(depth) {
  if (String(depth).startsWith('8')) return 8;
  if (String(depth).startsWith('12')) return 12;
  return 10;
}

function processorModeLabel(processor) {
  const mode = processor.capacityMode === 'custom' ? `Custom ${processor.customMPix.toFixed(2)} MPix` : processor.profile;
  return `${mode} / ${processor.latencyMode}`;
}

function deploymentSummary(report) {
  const lines = [];
  lines.push('# LED WALL DEPLOYMENT');
  lines.push(`Project: ${state.metadata.projectName}`);
  lines.push(`Build: ${state.metadata.buildTag}`);
  lines.push(`Video: ${state.metadata.frameRate}fps ${state.metadata.colorSpace} ${state.metadata.colorDepth} ${state.metadata.eotf}`);
  lines.push(`Sync: ${state.metadata.syncMode} (${state.metadata.genlockSource})`);
  lines.push(`Latency: ${state.metadata.latencyMode}`);
  lines.push(`Redundancy: ${state.metadata.redundancy}`);
  lines.push(`Control Net: ${state.metadata.controlNetwork}`);
  lines.push('');
  lines.push(`Wall: ${report.wall.wallPxW}x${report.wall.wallPxH} (${state.wall.wallTilesX}x${state.wall.wallTilesY} cabinets)`);
  lines.push(`Coverage: ${report.wall.coveragePct.toFixed(1)}%`);
  lines.push('');
  lines.push('Render Nodes:');
  Object.values(report.nodeLoads).forEach((load) => {
    const used = load.totalPixels / 1_000_000;
    lines.push(`- ${load.node.name}: ${used.toFixed(2)} / ${load.node.maxMPix.toFixed(2)} MPix`);
    load.regions.forEach((r) => {
      const pxW = r.w * state.wall.tilePxW;
      const pxH = r.h * state.wall.tilePxH;
      lines.push(`  • ${r.name} ${r.x},${r.y} ${r.w}x${r.h} tiles (${pxW}x${pxH}px) ${r.role}`);
    });
  });
  lines.push('');
  lines.push('Processors:');
  let totalXds = 0;
  Object.values(report.processorLoads).forEach((load) => {
    const used = load.totalPixels / 1_000_000;
    lines.push(`- ${load.processor.name} (${load.processor.type}): ${used.toFixed(2)} / ${load.capacityMPix.toFixed(2)} MPix`);
    lines.push(`  source=${load.source} fps=${load.matchedFps} latency=${load.latencyMode}`);
    lines.push(`  ${load.portUnitLabel || 'XD'} per-port=${formatInt(load.xdPortCapacityPixels)} px, ports=${load.xdPortsRequired}, units=${load.xdsRequired}`);
    totalXds += load.xdsRequired;
  });
  lines.push(`Total XD units required (sum across processors): ${totalXds}`);
  lines.push('');
  lines.push('Validation:');
  report.issues.forEach((i) => lines.push(`- [${i.level.toUpperCase()}] ${i.message}`));
  return lines.join('\n');
}

function showToast(message, duration = 2400) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = message;
  container.appendChild(toast);
  // Trigger animation
  requestAnimationFrame(() => { toast.classList.add('toast-visible'); });
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function showDisclaimer() {
  const modal = document.createElement('div');
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal disclaimer-modal">
      <div class="po-header">
        <h2>Disclaimer</h2>
      </div>
      <div class="po-body disclaimer-body">
        <p>This tool uses its own calculation methods to estimate the number of processors, XD units, and other hardware required for your LED wall configuration.</p>
        <p><strong>These estimates may not be fully accurate.</strong> Actual hardware requirements can vary based on firmware versions, signal routing, redundancy configurations, and other factors not fully modelled here.</p>
        <p>Please always refer to the original equipment manufacturers (OEMs) - such as Brompton Technology and Megapixel VR - for verified and up-to-date specifications before finalising your setup.</p>
        <p>This tool is intended for <strong style="color:#ff4f63">rough planning and estimation purposes only</strong>.</p>
        <button class="tool-btn primary disclaimer-accept-btn">I Understand</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('.disclaimer-accept-btn').addEventListener('click', () => modal.remove());
}

function showHowTo() {
  const modal = document.createElement('div');
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal howto-modal">
      <div class="po-header">
        <h2>How to Use</h2>
        <button class="tool-btn po-close howto-close-btn" title="Close"><span class="icon-mask btn-icon icon-close" style="margin-right:0;"></span></button>
      </div>
      <div class="po-body howto-body">
        <h3>Getting Started</h3>
        <ul>
          <li>Set your <strong>Video Settings</strong> (FPS, latency, bit depth) and <strong>Wall Settings</strong> (tile count, cabinet size) in the top toolbar.</li>
          <li>Use <strong>Outliner</strong> (left panel) to add Render Nodes and Processors, then add Render Regions to each node.</li>
          <li>Click a region in the canvas or outliner to select it. Use <strong>Details</strong> (right panel) to assign it to a node and processor.</li>
        </ul>
        <h3>Canvas Controls</h3>
        <ul>
          <li><strong>Drag region</strong> to move it. <strong>Drag corner handles</strong> to resize.</li>
          <li><strong>Right-click drag</strong> or <strong>Alt + drag</strong> or <strong>drag empty area</strong> to pan the view.</li>
          <li><strong>Scroll wheel</strong> to zoom in/out.</li>
          <li><strong>Delete key</strong> removes the selected region.</li>
          <li><strong>Enter key</strong> closes the details panel.</li>
          <li>Press <strong>Fit (<span class="icon-mask btn-icon icon-fit" style="margin-right:0;"></span>)</strong> to reset the view.</li>
        </ul>
        <h3>Planning Tools</h3>
        <ul>
          <li><strong>Auto Pack</strong>: Automatically creates the optimal number of processors, nodes, and regions based on your current settings.</li>
          <li><strong>Suggest Configs</strong>: Lists feasible hardware configurations.</li>
          <li><strong>Processor Overview</strong>: Table of per-processor load, XD usage, and region breakdown.</li>
          <li><strong>Validate</strong>: Checks for overlaps, capacity violations, and unassigned regions.</li>
          <li>Toggle <strong>cable plan overlay (<span class="icon-mask btn-icon icon-cable" style="margin-right:0;"></span>)</strong> to visualise XD port daisy-chain routing.</li>
        </ul>
        <h3>Unassigned Regions</h3>
        <ul>
          <li>Regions without a node assignment appear with <strong>grey diagonal hatching</strong> on the canvas.</li>
          <li>Unassigned node/processor dropdowns are highlighted in <strong>red</strong> in the details panel.</li>
          <li>Each render node supports a maximum of <strong>4 regions</strong>.</li>
        </ul>
        <button class="tool-btn primary howto-close-btn" style="margin-top:8px;">Got it</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelectorAll('.howto-close-btn').forEach((btn) => btn.addEventListener('click', () => modal.remove()));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function showHistoryModal() {
  loadHistoryStore();
  const existing = document.getElementById('historyModal');
  if (existing) existing.remove();

  const entries = getHistoryEntriesNewestFirst();
  const modal = document.createElement('div');
  modal.id = 'historyModal';
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal history-modal">
      <div class="po-header">
        <h2>History</h2>
        <span class="po-sub">${entries.length} snapshot(s) saved</span>
        <button class="tool-btn po-close" title="Close">✕</button>
      </div>
      <div class="po-body history-body">
        <div class="history-toolbar">
          <button class="tool-btn tiny" data-history-action="export-csv" ${entries.length ? '' : 'disabled'}>Export CSV</button>
          <button class="tool-btn tiny" data-history-action="clear" ${entries.length ? '' : 'disabled'}>Clear History</button>
        </div>
        ${entries.length ? `
          <div class="history-list">
            ${entries.map((entry) => `
              <div class="history-item">
                <div class="history-item-main">
                  <div class="history-item-title">${escapeHtml(entry.message || 'Snapshot')}</div>
                  <div class="history-item-meta">${renderHistoryEntryMeta(entry)}</div>
                </div>
                <div class="history-item-actions">
                  <button class="tool-btn tiny" data-history-action="restore" data-history-id="${entry.id}">Restore</button>
                  <button class="tool-btn tiny danger" data-history-action="delete" data-history-id="${entry.id}">Delete</button>
                </div>
              </div>`).join('')}
          </div>` : '<div class="history-empty">No snapshots yet. Changes will appear here automatically.</div>'}
      </div>
    </div>`;

  document.body.appendChild(modal);

  modal.querySelector('.po-close')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      return;
    }
    const btn = e.target.closest('[data-history-action]');
    if (!btn) return;
    const action = btn.dataset.historyAction;
    const id = btn.dataset.historyId;
    if (action === 'restore' && id) {
      restoreHistoryEntry(id);
      modal.remove();
      return;
    }
    if (action === 'delete' && id) {
      deleteHistoryEntry(id);
      modal.remove();
      showHistoryModal();
      return;
    }
    if (action === 'export-csv') {
      exportEntriesCsv(entries, 'history');
      return;
    }
    if (action === 'clear') {
      clearHistoryEntries();
      modal.remove();
      showHistoryModal();
    }
  });
}

function showProcessorOverview() {
  const report = calculateReport();
  const tilePixels = Math.max(1, state.wall.tilePxW * state.wall.tilePxH);
  const settingsLabel = `${state.metadata.frameRate} fps | ${state.metadata.colorDepth} | ${state.metadata.latencyMode} | Cabinet ${state.wall.tilePxW}x${state.wall.tilePxH} px`;
  const csvHeader = ['Processor', 'Resolution', 'Load (MPix)', 'Units / Ports', 'Unit Breakdown', 'Regions'];
  const csvRows = [];

  let tableRows = '';
  let totalXdUnits = 0;
  state.processors.forEach((processor) => {
    const load = report.processorLoads[processor.id] || {
      totalPixels: 0, capacityMPix: 0, xdPortCapacityPixels: 0,
      xdPortsRequired: 0, xdsRequired: 0
    };
    const regions = state.regions.filter((r) => r.processorId === processor.id);
    const usedPixels = load.totalPixels || 0;
    const usedMPix = usedPixels / 1_000_000;
    const util = load.capacityMPix > 0 ? (usedMPix / load.capacityMPix) * 100 : 0;
    const totalTiles = regions.reduce((acc, r) => acc + (r.w * r.h), 0);
    const xds = Math.max(0, load.xdsRequired || 0);
    const unitLabel = load.portUnitLabel || 'XD';
    const ppu = load.portsPerUnit || XD_DOWNLINK_PORTS;
    totalXdUnits += xds;
    const effectiveRes = regions.length === 1
      ? `${regions[0].w * state.wall.tilePxW}x${regions[0].h * state.wall.tilePxH}`
      : regions.length > 1 ? `${formatInt(usedPixels)} px (${regions.length} regions)` : 'N/A';

    const utilClass = util > 95 ? 'po-warn' : util > 80 ? 'po-ok' : '';
    const portWarn = (load.portsPerProcessorLimit || 0) > 0 && load.xdPortsRequired > load.portsPerProcessorLimit;

    let xdDetail = '';
    if (xds > 0) {
      const baseTiles = Math.floor(totalTiles / xds);
      const tileRemainder = totalTiles % xds;
      const unitCapPixels = ppu * Math.max(1, load.xdPortCapacityPixels || 0);
      const xdParts = [];
      for (let xi = 0; xi < xds; xi++) {
        const panels = baseTiles + (xi < tileRemainder ? 1 : 0);
        const pxOnUnit = panels * tilePixels;
        const utilUnit = unitCapPixels > 0 ? (pxOnUnit / unitCapPixels) * 100 : 0;
        xdParts.push(`${unitLabel}${xi + 1}: ${panels}p (${utilUnit.toFixed(0)}%)`);
      }
      xdDetail = xdParts.join(', ');
    }

    const regionDetailCsv = regions.map((r) => `${r.name}: ${r.w}x${r.h}`).join(', ') || 'N/A';
    const regionDetail = escapeHtml(regionDetailCsv);
    const loadDetail = `${usedMPix.toFixed(2)} / ${load.capacityMPix.toFixed(2)} (${util.toFixed(0)}%)`;
    const unitsPortsDetail = `${load.xdPortsRequired} ports / ${xds} ${unitLabel}${portWarn ? ' ⚠' : ''}`;

    tableRows += `<tr>
      <td>${escapeHtml(processor.name)}</td>
      <td>${effectiveRes}</td>
      <td class="${utilClass}">${loadDetail}</td>
      <td${portWarn ? ' class="po-warn"' : ''}>${unitsPortsDetail}</td>
      <td>${xdDetail || 'N/A'}</td>
      <td>${regionDetail}</td>
    </tr>`;

    csvRows.push([
      processor.name,
      effectiveRes,
      loadDetail,
      unitsPortsDetail,
      xdDetail || 'N/A',
      regionDetailCsv
    ]);
  });

  const existing = document.getElementById('processorOverviewModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'processorOverviewModal';
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal">
      <div class="po-header">
        <h2>Processor Overview</h2>
        <span class="po-sub">${escapeHtml(settingsLabel)} | ${state.processors.length} proc, ${totalXdUnits} port unit(s) total</span>
        <button class="tool-btn tiny po-copy-csv" title="Copy processor overview as CSV">Copy CSV</button>
        <button class="tool-btn po-close" title="Close">✕</button>
      </div>
      <div class="po-body">
        <table class="po-table">
          <thead><tr>
            <th>Processor</th>
            <th>Resolution</th>
            <th>Load (MPix)</th>
            <th>Units / Ports</th>
            <th>Unit Breakdown</th>
            <th>Regions</th>
          </tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('.po-copy-csv')?.addEventListener('click', async () => {
    const csv = [csvHeader, ...csvRows]
      .map((row) => row.map(csvEscape).join(','))
      .join('\n');
    const copied = await copyTextToClipboard(csv);
    showToast(copied ? 'Processor overview copied as CSV' : 'Could not copy CSV');
  });
  modal.querySelector('.po-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function getPortsPerProcessorLimit(processor) {
  if (!processor) return 9999;
  const reg = PROCESSOR_REGISTRY[processor.profile];
  if (!reg || reg.maxUnits === Infinity) return 9999;
  const base = reg.portsPerUnit * reg.maxUnits;
  return state.metadata.redundancy === 'Full Mirror'
    ? Math.max(1, Math.floor(base / 2))
    : base;
}

function toggleCablePlanOverlay() {
  if (view.showCableOverlay) {
    view.showCableOverlay = false;
    syncCanvasMetaButtons();
    renderCanvas(calculateReport());
    renderLog('Cable plan overlay disabled');
    return;
  }

  const report = calculateReport();
  const lines = formatCablePlan(report.cablePlan);
  view.showCableOverlay = true;
  syncCanvasMetaButtons();
  appendLogBlock('Cable plan generated (overlay enabled)', lines);
  setDrawerOpen(els.logDrawer, true);
  syncDrawerButtons();
  renderCanvas(report);
}

function exportConfig() {
  const payload = {
    metadata: state.metadata,
    wall: state.wall,
    nodes: state.nodes,
    processors: state.processors,
    regions: state.regions,
    summary: deploymentSummary(calculateReport())
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug(state.metadata.projectName || 'led-wall')}-config.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  renderLog('Config exported');
}

function exportSvg() {
  const TILE = 40;   // px per tile in exported SVG
  const MARGIN = 24;
  const W = state.wall.wallTilesX;
  const H = state.wall.wallTilesY;
  const ox = MARGIN;
  const oy = MARGIN;
  const wallW = W * TILE;
  const wallH = H * TILE;
  const svgW = wallW + MARGIN * 2;
  const svgH = wallH + MARGIN * 2 + 32; // extra row for dim label

  const report = calculateReport();
  const parts = [];

  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" font-family="'Roboto Mono',monospace">`);

  // ── defs ──────────────────────────────────────────────────────
  parts.push(`<defs>
  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(160,160,180,0.35)" stroke-width="1"/>
  </pattern>
</defs>`);

  // ── background ────────────────────────────────────────────────
  parts.push(`<rect width="${svgW}" height="${svgH}" fill="#0a0b10"/>`);
  parts.push(`<rect x="${ox}" y="${oy}" width="${wallW}" height="${wallH}" fill="#0b1525"/>`);

  // ── grid lines ────────────────────────────────────────────────
  for (let x = 1; x < W; x++) {
    const px = ox + x * TILE;
    parts.push(`<line x1="${px}" y1="${oy}" x2="${px}" y2="${oy + wallH}" stroke="rgba(143,175,228,0.22)" stroke-width="1"/>`);
  }
  for (let y = 1; y < H; y++) {
    const py = oy + y * TILE;
    parts.push(`<line x1="${ox}" y1="${py}" x2="${ox + wallW}" y2="${py}" stroke="rgba(143,175,228,0.22)" stroke-width="1"/>`);
  }

  // ── regions ───────────────────────────────────────────────────
  state.regions.forEach((region, idx) => {
    const unassigned = !region.nodeId;
    const c = unassigned ? '#888899' : colorForRegion(region, idx);
    const rx = ox + region.x * TILE;
    const ry = oy + region.y * TILE;
    const rw = region.w * TILE;
    const rh = region.h * TILE;
    const label = escapeHtml(`${region.name}  ${region.w * state.wall.tilePxW}x${region.h * state.wall.tilePxH}px`);
    const textFill = unassigned ? '#aaaacc' : '#edf4ff';

    parts.push(`<g>`);
    parts.push(`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="${hexToRgba(c, 0.18)}" stroke="${c}" stroke-width="1.4"/>`);
    if (unassigned) {
      parts.push(`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="url(#hatch)"/>`);
    }
    // clip label to region box
    const clipId = `cl${idx}`;
    parts.push(`<clipPath id="${clipId}"><rect x="${rx}" y="${ry}" width="${rw}" height="${rh}"/></clipPath>`);
    parts.push(`<text x="${rx + 5}" y="${ry + 14}" fill="${textFill}" font-size="11" clip-path="url(#${clipId})">${label}</text>`);
    parts.push(`</g>`);
  });

  // ── wall outline ──────────────────────────────────────────────
  parts.push(`<rect x="${ox}" y="${oy}" width="${wallW}" height="${wallH}" fill="none" stroke="#6b8fca" stroke-width="1.5"/>`);

  // ── dimension label ───────────────────────────────────────────
  const { wallPxW, wallPxH, wallMmW, wallMmH } = report.wall;
  const dimLabel = escapeHtml(`${wallPxW}x${wallPxH}px  |  ${(wallMmW / 1000).toFixed(2)}m x ${(wallMmH / 1000).toFixed(2)}m`);
  const lx = ox + wallW / 2;
  const ly = oy + wallH + 20;
  parts.push(`<rect x="${ox}" y="${ly - 14}" width="${wallW}" height="20" fill="rgba(10,12,20,0.65)"/>`);
  parts.push(`<text x="${lx}" y="${ly}" text-anchor="middle" fill="#9eb8e8" font-size="11" font-weight="bold">${dimLabel}</text>`);

  parts.push(`</svg>`);

  const blob = new Blob([parts.join('\n')], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug(state.metadata.projectName || 'led-wall')}-layout.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  renderLog('SVG layout exported');
}

function exportCableSvg() {
  const TILE = 40;
  const MARGIN = 24;
  const W = state.wall.wallTilesX;
  const H = state.wall.wallTilesY;
  const ox = MARGIN;
  const oy = MARGIN;
  const wallW = W * TILE;
  const wallH = H * TILE;
  const svgW = wallW + MARGIN * 2;
  const svgH = wallH + MARGIN * 2 + 32;

  const report = calculateReport();
  const cablePlan = report.cablePlan;
  const parts = [];

  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" font-family="'Roboto Mono',monospace">`);

  // ── defs ──────────────────────────────────────────────────────
  parts.push(`<defs>
  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(160,160,180,0.35)" stroke-width="1"/>
  </pattern>
</defs>`);

  // ── background ────────────────────────────────────────────────
  parts.push(`<rect width="${svgW}" height="${svgH}" fill="#0a0b10"/>`);
  parts.push(`<rect x="${ox}" y="${oy}" width="${wallW}" height="${wallH}" fill="#0b1525"/>`);

  // ── grid lines ────────────────────────────────────────────────
  for (let x = 1; x < W; x++) {
    const px = ox + x * TILE;
    parts.push(`<line x1="${px}" y1="${oy}" x2="${px}" y2="${oy + wallH}" stroke="rgba(143,175,228,0.15)" stroke-width="1"/>`);
  }
  for (let y = 1; y < H; y++) {
    const py = oy + y * TILE;
    parts.push(`<line x1="${ox}" y1="${py}" x2="${ox + wallW}" y2="${py}" stroke="rgba(143,175,228,0.15)" stroke-width="1"/>`);
  }

  // ── region outlines ───────────────────────────────────────────
  state.regions.forEach((region, idx) => {
    const unassigned = !region.nodeId;
    const c = unassigned ? '#888899' : colorForRegion(region, idx);
    const rx = ox + region.x * TILE;
    const ry = oy + region.y * TILE;
    const rw = region.w * TILE;
    const rh = region.h * TILE;
    parts.push(`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="none" stroke="${c}" stroke-width="1" opacity="0.4"/>`);
    if (unassigned) {
      parts.push(`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="url(#hatch)"/>`);
    }
    const clipId = `cr${idx}`;
    const nameLabel = escapeHtml(region.name);
    parts.push(`<clipPath id="${clipId}"><rect x="${rx}" y="${ry}" width="${rw}" height="${rh}"/></clipPath>`);
    parts.push(`<text x="${rx + 4}" y="${ry + 13}" fill="${c}" font-size="10" opacity="0.6" clip-path="url(#${clipId})">${nameLabel}</text>`);
  });

  // ── cable overlay ─────────────────────────────────────────────
  if (cablePlan?.processorPlans?.length) {
    let globalXdOffset = 0;
    cablePlan.processorPlans.forEach((procPlan) => {
      procPlan.xds.forEach((xd) => {
        const displayXdIdx = view.globalUnitNumbering ? globalXdOffset + xd.index : xd.index;
        xd.ports.forEach((port) => {
          if (!port.segments?.length) return;
          const tilePath = buildPortTilePath(port);
          const stepCount = tilePath.length;
          if (!stepCount) return;

          // Colored tile fills
          tilePath.forEach((tile, idx) => {
            const fill = cableFillColorForStep(tile.base, port.index, idx, stepCount, 0.72);
            const tx = ox + tile.x * TILE + 1;
            const ty = oy + tile.y * TILE + 1;
            parts.push(`<rect x="${tx}" y="${ty}" width="${TILE - 2}" height="${TILE - 2}" rx="2" fill="${fill}"/>`);
          });

          // Port label at first tile
          const first = tilePath[0];
          const lx = ox + first.x * TILE + 3;
          const ly = oy + first.y * TILE + 12;
          const portLabel = escapeHtml(`${procPlan.portUnitPrefix || 'X'}${displayXdIdx}P${port.index}`);
          parts.push(`<text x="${lx}" y="${ly}" fill="rgba(255,255,255,0.9)" font-size="9" font-weight="bold">${portLabel}</text>`);

          // Daisy-chain arrows between consecutive tiles
          for (let i = 0; i < stepCount - 1; i++) {
            const stroke = cableArrowColorForStep(tilePath[i].base, port.index, i, stepCount - 1, 0.9);
            const cx1 = ox + (tilePath[i].x + 0.5) * TILE;
            const cy1 = oy + (tilePath[i].y + 0.5) * TILE;
            const cx2 = ox + (tilePath[i + 1].x + 0.5) * TILE;
            const cy2 = oy + (tilePath[i + 1].y + 0.5) * TILE;
            const dx = cx2 - cx1;
            const dy = cy2 - cy1;
            const len = Math.hypot(dx, dy);
            if (len < 1) continue;
            const ux = dx / len;
            const uy = dy / len;
            const pad = 6;
            const sx = cx1 + ux * pad;
            const sy = cy1 + uy * pad;
            const ex = cx2 - ux * pad;
            const ey = cy2 - uy * pad;
            parts.push(`<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>`);
            // Arrowhead
            const head = 7;
            const angle = Math.atan2(ey - sy, ex - sx);
            const ax1 = ex - head * Math.cos(angle - Math.PI / 7);
            const ay1 = ey - head * Math.sin(angle - Math.PI / 7);
            const ax2 = ex - head * Math.cos(angle + Math.PI / 7);
            const ay2 = ey - head * Math.sin(angle + Math.PI / 7);
            parts.push(`<polygon points="${ex.toFixed(1)},${ey.toFixed(1)} ${ax1.toFixed(1)},${ay1.toFixed(1)} ${ax2.toFixed(1)},${ay2.toFixed(1)}" fill="${stroke}"/>`);
          }
        });
      });
      globalXdOffset += procPlan.xds.length;
    });
  }

  // ── wall outline ──────────────────────────────────────────────
  parts.push(`<rect x="${ox}" y="${oy}" width="${wallW}" height="${wallH}" fill="none" stroke="#6b8fca" stroke-width="1.5"/>`);

  // ── dimension + pattern label ─────────────────────────────────
  const { wallPxW, wallPxH, wallMmW, wallMmH } = report.wall;
  const patternName = { linear: 'Linear', S: 'S-Shape', invS: 'Inv. S', N: 'N-Shape', invN: 'Inv. N' }[state.metadata.wiringPattern || 'linear'] || 'Linear';
  const dimLabel = escapeHtml(`${wallPxW}x${wallPxH}px  |  ${(wallMmW / 1000).toFixed(2)}m x ${(wallMmH / 1000).toFixed(2)}m  |  ${patternName} wiring`);
  const lx = ox + wallW / 2;
  const ly = oy + wallH + 20;
  parts.push(`<rect x="${ox}" y="${ly - 14}" width="${wallW}" height="20" fill="rgba(10,12,20,0.65)"/>`);
  parts.push(`<text x="${lx}" y="${ly}" text-anchor="middle" fill="#9eb8e8" font-size="11" font-weight="bold">${dimLabel}</text>`);

  parts.push(`</svg>`);

  const blob = new Blob([parts.join('\n')], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug(state.metadata.projectName || 'led-wall')}-wiring.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  renderLog('Wiring SVG exported');
}

async function importConfig(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const json = JSON.parse(await file.text());
    state.metadata = { ...state.metadata, ...(json.metadata || {}) };
    // Back-compat: if processorProfile absent, derive from the first imported processor's profile.
    if (!state.metadata.processorProfile && json.processors?.length) {
      const firstProfile = json.processors[0]?.profile;
      if (firstProfile && PROCESSOR_PROFILES.includes(firstProfile)) {
        state.metadata.processorProfile = firstProfile;
      }
    }
    state.wall = { ...state.wall, ...(json.wall || {}) };
    sanitizeWall();

    state.nodes = ensureArray(json.nodes).map((n, i) => ({
      id: n.id || uid('node'),
      name: n.name || `RN-${i + 1}`,
      maxWidth: clampInt(n.maxWidth, 1, 30000),
      maxHeight: clampInt(n.maxHeight, 1, 30000),
      maxMPix: clampFloat(n.maxMPix, 0.1, 1000),
      outputs: clampInt(n.outputs, 1, 16),
      backupNodeId: n.backupNodeId || ''
    }));

    state.processors = ensureArray(json.processors).map((p, i) => {
      const processor = {
        id: p.id || uid('proc'),
        name: p.name || `PROC-${i + 1}`,
        type: p.type || 'Custom Processor',
        profile: p.profile || 'Custom',
        capacityMode: p.capacityMode || 'custom',
        latencyMode: p.latencyMode || 'From Project',
        customMPix: clampFloat(p.customMPix ?? p.maxMPix ?? 9, 0.1, 1000)
      };
      sanitizeProcessor(processor);
      return processor;
    });

    state.regions = ensureArray(json.regions).map((r, i) => ({
      id: r.id || uid('reg'),
      name: r.name || `Region ${i + 1}`,
      x: clampInt(r.x, 0, 10000),
      y: clampInt(r.y, 0, 10000),
      w: clampInt(r.w, 1, 10000),
      h: clampInt(r.h, 1, 10000),
      nodeId: r.nodeId || '',
      processorId: r.processorId || '',
      role: r.role || 'Background'
    }));

    if (!state.nodes.length) state.nodes.push({ id: uid('node'), name: 'RN-01', maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2, backupNodeId: '' });
    if (!state.processors.length) state.processors.push(defaultProcessor('PROC-A'));
    if (!state.regions.length) state.regions.push({ id: uid('reg'), name: 'Main', x: 0, y: 0, w: 12, h: 8, nodeId: state.nodes[0].id, processorId: state.processors[0].id, role: 'Frustum' });
    syncProcessorProfiles();

    state.selection = { type: 'region', id: state.regions[0].id };
    fitView();
    renderAll('Config imported');
  } catch {
    renderLog('Import failed: invalid JSON');
  } finally {
    e.target.value = '';
  }
}

function removeSelected() {
  if (!state.selection.id) {
    renderLog('Nothing selected to remove');
    return;
  }

  if (state.selection.type === 'region') {
    const before = state.regions.length;
    state.regions = state.regions.filter((r) => r.id !== state.selection.id);
    if (state.regions.length < before) {
      state.selection = { type: 'none', id: '' };
      renderAll('Render area removed');
      return;
    }
  }

  if (state.selection.type === 'node') {
    const id = state.selection.id;
    const node = state.nodes.find((n) => n.id === id);
    state.nodes = state.nodes.filter((n) => n.id !== id);
    state.regions.forEach((r) => {
      if (r.nodeId === id) r.nodeId = '';
    });
    state.selection = { type: 'none', id: '' };
    renderAll(`Render node removed${node ? ` (${node.name})` : ''}`);
    return;
  }

  if (state.selection.type === 'processor') {
    const id = state.selection.id;
    const processor = state.processors.find((p) => p.id === id);
    state.processors = state.processors.filter((p) => p.id !== id);
    state.regions.forEach((r) => {
      if (r.processorId === id) r.processorId = '';
    });
    state.selection = { type: 'none', id: '' };
    renderAll(`Processor removed${processor ? ` (${processor.name})` : ''}`);
    return;
  }

  renderLog('Selected item type cannot be removed here');
}

function select(type, id) {
  state.selection = { type, id };
}

function isSelected(type, id) {
  return state.selection.type === type && state.selection.id === id;
}

function getSelectedObject(forceType) {
  const type = forceType || state.selection.type;
  if (!state.selection.id) return null;
  if (type === 'node') return state.nodes.find((n) => n.id === state.selection.id) || null;
  if (type === 'processor') return state.processors.find((p) => p.id === state.selection.id) || null;
  if (type === 'region') return state.regions.find((r) => r.id === state.selection.id) || null;
  return null;
}

function renderSelectionBadge() {
  const sel = getSelectedObject();
  if (!sel) {
    els.selectionBadge.textContent = 'No selection';
    return;
  }

  if (state.selection.type === 'node') {
    els.selectionBadge.textContent = `Node: ${sel.name}`;
  } else if (state.selection.type === 'processor') {
    const resolved = resolveProcessorCapacity(sel, state.metadata);
    els.selectionBadge.textContent = `Processor: ${sel.name} (${resolved.capacityMPix.toFixed(2)} MPix)`;
  } else if (state.selection.type === 'region') {
    const pxW = sel.w * state.wall.tilePxW;
    const pxH = sel.h * state.wall.tilePxH;
    els.selectionBadge.textContent = `Area: ${sel.name} (${pxW}x${pxH}px)`;
  }
}

function renderLog(message) {
  const line = `${new Date().toLocaleTimeString()}  ${message}`;
  state.logLines.push(line);
  if (state.logLines.length > 160) state.logLines.shift();
  els.outputLog.textContent = state.logLines.join('\n');
  els.outputLog.scrollTop = els.outputLog.scrollHeight;
}

function appendLogBlock(header, lines) {
  const stamp = `${new Date().toLocaleTimeString()}  ${header}`;
  state.logLines.push(stamp);
  for (const line of lines) {
    state.logLines.push(`          ${line}`);
  }
  if (state.logLines.length > 320) {
    state.logLines = state.logLines.slice(-320);
  }
  els.outputLog.textContent = state.logLines.join('\n');
  els.outputLog.scrollTop = els.outputLog.scrollHeight;
}

function suggestConfigs() {
  const hw = calculateOptimalHardware();
  if (!hw.feasible) {
    renderLog(`Suggest Configs failed: ${hw.error || 'no feasible configuration found.'}`);
    return;
  }
  showSuggestConfigsModal(hw);
  renderLog(`Suggest Configs: best is ${hw.best.processors} ${hw.settings.procLabel}(s), ${hw.best.totalXds} ${hw.settings.unitLabel}(s).`);
}

function showSuggestConfigsModal(hw) {
  const existing = document.getElementById('suggestConfigsModal');
  if (existing) existing.remove();

  const { wallPxW, wallPxH, nodeMaxW, nodeMaxH } = hw.wallInfo;
  const { tilePxW, tilePxH } = state.wall;
  const settingsLabel = `${hw.settings.fps} Hz · ${hw.settings.latency} · ${hw.settings.depth}`;

  // ── three distinct candidates ──────────────────────────────────
  // 1. Portrait: best uniform candidate where region is portrait shaped
  const portraitBest = hw.allUniformCandidates
    .filter((c) => c.orientation === 'portrait')
    .sort((a, b) => a.processors - b.processors || a.totalXds - b.totalXds)[0] || null;

  // 2. Landscape: best uniform candidate where region is landscape shaped
  const landscapeBest = hw.allUniformCandidates
    .filter((c) => c.orientation !== 'portrait')
    .sort((a, b) => a.processors - b.processors || a.totalXds - b.totalXds)[0] || null;

  // 3. Mixed: the band split (non-uniform rows - different-width regions per band)
  const mixedBest = hw.bandCandidate || null;

  const allThree = [portraitBest, landscapeBest, mixedBest].filter(Boolean);
  const minSX40 = allThree.length ? Math.min(...allThree.map((c) => c.processors)) : Infinity;

  function specRow(label, value) {
    return `<div class="sc-spec-row"><span class="sc-spec-key">${label}</span><span class="sc-spec-val">${escapeHtml(String(value))}</span></div>`;
  }

  function buildCard(mode, title, subtitle, candidate, blockReason) {
    const isOptimal = candidate && candidate.processors === minSX40;
    const cardClass = `sc-card sc-card--${mode}${isOptimal ? ' sc-best' : ''}${!candidate ? ' sc-blocked' : ''}`;
    const badge = isOptimal ? `<span class="sc-best-badge">★ Optimal</span>` : '';

    if (!candidate) {
      const reason = blockReason || 'No valid splits for this wall tile dimensions';
      return `<div class="${cardClass}">
        <div class="sc-card-header">
          <span class="sc-mode-label">${title}</span>${badge}
        </div>
        <div class="sc-card-body">
          <div class="sc-subtitle">${subtitle}</div>
          <div class="sc-unavailable"><strong>Not feasible</strong>${escapeHtml(reason)}</div>
        </div>
      </div>`;
    }

    const isBand = candidate.type === 'band';
    const mpix = isBand
      ? ((candidate.allRegions?.[0]?.pixels ?? 0) / 1_000_000).toFixed(2)
      : ((candidate.segPxW * candidate.segPxH) / 1_000_000).toFixed(2);
    const util = isBand ? `${(candidate.avgUtil ?? 0).toFixed(0)}%` : `${(candidate.utilization ?? 0).toFixed(0)}%`;
    const layout = isBand
      ? `${candidate.bands?.length ?? '?'} rows (non-uniform)`
      : `${candidate.cols} col${candidate.cols > 1 ? 's' : ''} × ${candidate.rows} row${candidate.rows > 1 ? 's' : ''}`;
    const regionSize = isBand
      ? (() => {
          const sizes = (candidate.allRegions ?? []).map((r) => `${r.w * tilePxW}×${r.h * tilePxH}`);
          const unique = [...new Set(sizes)];
          return unique.length <= 2 ? unique.join(', ') + 'px' : `${unique.length} sizes`;
        })()
      : `${candidate.segPxW}×${candidate.segPxH}px`;

    const pu = hw.settings.parentUnit;
    let displayXds = candidate.totalXds;
    let displayQds = 0;
    if (pu) {
      displayQds = Math.max(candidate.processors, Math.ceil(candidate.totalXds / pu.unitsPerParent));
      displayXds = Math.max(displayQds, candidate.totalXds);
    }

    return `<div class="${cardClass}">
      <div class="sc-card-header">
        <span class="sc-mode-label">${title}</span>${badge}
      </div>
      <div class="sc-card-body">
        <div class="sc-subtitle">${subtitle}</div>
        <div class="sc-metrics">
          <div class="sc-metric-item">
            <div class="sc-metric-value">${candidate.processors}</div>
            <div class="sc-metric-key">${hw.settings.procLabel}</div>
          </div>
          <div class="sc-metric-sep"></div>
          <div class="sc-metric-item">
            <div class="sc-metric-value">${pu ? displayQds : displayXds}</div>
            <div class="sc-metric-key">${pu ? pu.label : hw.settings.unitLabel + ' Units'}</div>
          </div>
          <div class="sc-metric-sep"></div>
          <div class="sc-metric-item">
            <div class="sc-metric-value">${mpix}</div>
            <div class="sc-metric-key">MPix/rgn</div>
          </div>
        </div>
        <div class="sc-specs">
          ${specRow('Layout', layout)}
          ${specRow('Region size', regionSize)}
          ${specRow(`${hw.settings.procLabel} util`, util)}
          ${pu ? specRow(`${pu.label} required`, displayQds) : ''}
          ${pu ? specRow(`${hw.settings.unitLabel} required`, displayXds) : ''}
        </div>
        <button class="sc-apply-btn" data-apply-key="${title}">Apply this config</button>
      </div>
    </div>`;
  }

  const portraitSubtitle = `Node rotated 90° - tall narrow strips`;
  const landscapeSubtitle = `Node normal orientation - wide short regions`;
  const mixedSubtitle = `Non-uniform bands - mixed region widths per row`;

  const modal = document.createElement('div');
  modal.id = 'suggestConfigsModal';
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal sc-modal">
      <div class="po-header">
        <h2>Suggested Configurations</h2>
        <span class="po-sub">Wall ${wallPxW}×${wallPxH}px · Node max ${nodeMaxW}×${nodeMaxH}px · ${settingsLabel}</span>
        <button class="tool-btn po-close" title="Close">✕</button>
      </div>
      <div class="sc-cards">
        ${buildCard('portrait', 'Portrait', portraitSubtitle, portraitBest, hw.portraitBlockReason)}
        ${buildCard('landscape', 'Landscape', landscapeSubtitle, landscapeBest, hw.landscapeBlockReason)}
        ${buildCard('mixed', 'Mixed', mixedSubtitle, mixedBest, null)}
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.querySelector('.po-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

  // Wire Apply buttons - pass a fake hw shell wrapping the chosen candidate.
  const candidateMap = { Portrait: portraitBest, Landscape: landscapeBest, Mixed: mixedBest };
  modal.querySelectorAll('.sc-apply-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const candidate = candidateMap[btn.dataset.applyKey];
      if (!candidate) return;
      modal.remove();
      applyHardwareRecommendation({ feasible: true, best: candidate });
    });
  });
}

function autoPackRegionsForCurrentSettings() {
  const hw = calculateOptimalHardware();
  if (!hw.feasible) {
    renderLog(`Auto-pack failed: ${hw.error || 'no feasible configuration found at current settings.'}`);
    return;
  }
  applyHardwareRecommendation(hw);
  renderLog(`Auto-pack applied optimal config: ${hw.best.processors} ${hw.settings.procLabel}(s), ${hw.best.totalXds} ${hw.settings.unitLabel}(s).`);
}

function factorPairs(n) {
  const pairs = [];
  for (let i = 1; i * i <= n; i += 1) {
    if (n % i === 0) {
      const a = i;
      const b = n / i;
      pairs.push([a, b]);
      if (a !== b) pairs.push([b, a]);
    }
  }
  return pairs;
}

function getWeakestNode() {
  return state.nodes.reduce((acc, node) => {
    if (!acc) return node;
    const accPixels = acc.maxWidth * acc.maxHeight;
    const nodePixels = node.maxWidth * node.maxHeight;
    const accMpix = acc.maxMPix;
    const nodeMpix = node.maxMPix;
    if (nodePixels < accPixels) return node;
    if (nodePixels === accPixels && nodeMpix < accMpix) return node;
    return acc;
  }, null);
}

function getWeakestProcessor() {
  return state.processors.reduce((acc, processor) => {
    if (!acc) return processor;
    const capAcc = resolveProcessorCapacity(acc, state.metadata).capacityMPix;
    const capCur = resolveProcessorCapacity(processor, state.metadata).capacityMPix;
    return capCur < capAcc ? processor : acc;
  }, null);
}

function tileToScreen(tileX, tileY) {
  return {
    x: view.panX + tileX * view.zoom,
    y: view.panY + tileY * view.zoom
  };
}

function screenToTile(screenX, screenY) {
  return {
    x: Math.floor((screenX - view.panX) / view.zoom),
    y: Math.floor((screenY - view.panY) / view.zoom)
  };
}

function screenToTileFromClient(clientX, clientY) {
  const rect = els.canvas.getBoundingClientRect();
  return screenToTile(clientX - rect.left, clientY - rect.top);
}

function inWall(x, y) {
  return x >= 0 && y >= 0 && x < state.wall.wallTilesX && y < state.wall.wallTilesY;
}

function clampRegion(region) {
  region.w = clampInt(region.w, 1, state.wall.wallTilesX);
  region.h = clampInt(region.h, 1, state.wall.wallTilesY);
  region.x = clampInt(region.x, 0, Math.max(0, state.wall.wallTilesX - region.w));
  region.y = clampInt(region.y, 0, Math.max(0, state.wall.wallTilesY - region.h));
}

function rectOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function colorForRegion(region, index) {
  const nodeIndex = Math.max(0, state.nodes.findIndex((n) => n.id === region.nodeId));
  return palette[(region.nodeId ? nodeIndex : index) % palette.length];
}

function colorForNode(nodeId) {
  const nodeIndex = Math.max(0, state.nodes.findIndex((n) => n.id === nodeId));
  return palette[nodeIndex % palette.length];
}

function cableColorForPort(baseHex, portIndex, alpha = 0.3) {
  const hsl = hexToHsl(baseHex);
  // Keep region identity, but separate ports with small hue offsets instead of saturation steps.
  const hueShift = ((portIndex - 1) % XD_DOWNLINK_PORTS) * 7;
  const hue = (hsl.h + hueShift) % 360;
  const sat = clampInt(Math.max(72, hsl.s), 60, 100);
  const light = clampInt(Math.max(30, hsl.l - 14), 28, 46);
  return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
}

function cableFillColorForStep(baseHex, portIndex, stepIndex, stepCount, alpha = 0.62) {
  const hsl = hexToHsl(baseHex);
  const hueShift = ((portIndex - 1) % XD_DOWNLINK_PORTS) * 7;
  const hue = (hsl.h + hueShift) % 360;
  const sat = clampInt(Math.max(72, hsl.s), 60, 100);
  const baseLight = clampInt(Math.max(30, hsl.l - 14), 28, 46);
  const light = lightnessForStep(baseLight, stepIndex, stepCount);
  return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
}

function cableArrowColorForStep(baseHex, portIndex, stepIndex, stepCount, alpha = 0.9) {
  // Same hue family as cell fill, but reversed progression for visual contrast.
  const reversed = Math.max(0, stepCount - 1 - stepIndex);
  return cableFillColorForStep(baseHex, portIndex, reversed, stepCount, alpha);
}

function lightnessForStep(baseLight, stepIndex, stepCount) {
  const t = stepCount > 1 ? stepIndex / (stepCount - 1) : 0;
  const lightDrop = Math.round(t * 16);
  return clampInt(baseLight - lightDrop, 12, 58);
}

function hexToHsl(hex) {
  const h = hex.replace('#', '');
  const r = Number.parseInt(h.slice(0, 2), 16) / 255;
  const g = Number.parseInt(h.slice(2, 4), 16) / 255;
  const b = Number.parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let hue = 0;
  let s = 0;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: hue = ((g - b) / d) % 6; break;
      case g: hue = ((b - r) / d) + 2; break;
      default: hue = ((r - g) / d) + 4; break;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  return { h: hue, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function selectField(label, path, options, current, title = '') {
  const opts = options.map((v) => `<option value="${escapeAttr(v)}" ${v === current ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('');
  return `<label class="field" title="${escapeAttr(title)}">${escapeHtml(label)}<select data-edit="${path}">${opts}</select></label>`;
}

function slug(value) {
  return String(value || 'config').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'config';
}

function bad(message) { return { level: 'bad', message }; }
function warn(message) { return { level: 'warn', message }; }
function good(message) { return { level: 'good', message }; }

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function clampInt(v, min, max) {
  const n = Number.parseInt(v, 10);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function clampFloat(v, min, max) {
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function ensureArray(v) {
  return Array.isArray(v) ? v : [];
}

function loadHistoryStore() {
  if (historyStore.loaded) {
    updateHistoryBadge();
    return;
  }
  historyStore.loaded = true;
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      historyStore.entries = [];
      updateHistoryBadge();
      return;
    }
    const parsed = JSON.parse(raw);
    historyStore.entries = ensureArray(parsed)
      .filter((entry) => entry && typeof entry === 'object' && entry.id && entry.snapshot)
      .slice(-HISTORY_MAX_ENTRIES);
  } catch {
    historyStore.entries = [];
  }
  updateHistoryBadge();
}

function persistHistoryStore() {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyStore.entries));
  } catch {
    // ignore storage access failures
  }
  updateHistoryBadge();
}

function getHistoryEntriesNewestFirst() {
  return [...historyStore.entries].reverse();
}

function updateHistoryBadge() {
  if (els.historyBadgeCount) {
    els.historyBadgeCount.textContent = String(historyStore.entries.length);
  }
  if (els.historyBtn) {
    els.historyBtn.title = `Show history (${historyStore.entries.length} saved snapshot${historyStore.entries.length === 1 ? '' : 's'})`;
  }
}

function shouldCaptureHistoryMessage(message) {
  const msg = String(message || '').trim();
  if (!msg) return false;
  if (HISTORY_IGNORED_MESSAGES.has(msg)) return false;
  if (msg.startsWith('Interaction complete')) return false;
  return true;
}

function pushHistoryEntry(message) {
  if (!shouldCaptureHistoryMessage(message)) return;
  loadHistoryStore();
  const snapshot = createProjectSnapshot();
  const now = Date.now();
  const last = historyStore.entries[historyStore.entries.length - 1];
  if (last && last.message === message && now - (last.createdAt || 0) < 1200) {
    return;
  }
  historyStore.entries.push({
    id: uid('hist'),
    createdAt: now,
    message: String(message),
    wallTilesX: snapshot.wall.wallTilesX,
    wallTilesY: snapshot.wall.wallTilesY,
    nodes: snapshot.nodes.length,
    processors: snapshot.processors.length,
    regions: snapshot.regions.length,
    snapshot
  });
  if (historyStore.entries.length > HISTORY_MAX_ENTRIES) {
    historyStore.entries = historyStore.entries.slice(historyStore.entries.length - HISTORY_MAX_ENTRIES);
  }
  persistHistoryStore();
}

function createProjectSnapshot() {
  return JSON.parse(JSON.stringify({
    metadata: state.metadata,
    wall: state.wall,
    nodes: state.nodes,
    processors: state.processors,
    regions: state.regions,
    activeTab: state.activeTab
  }));
}

function restoreHistoryEntry(entryId) {
  loadHistoryStore();
  const entry = historyStore.entries.find((item) => item.id === entryId);
  if (!entry?.snapshot) return;
  applySnapshot(entry.snapshot);
  showToast(`Restored snapshot: ${entry.message}`);
}

function applySnapshot(snapshot) {
  state.metadata = { ...state.metadata, ...(snapshot.metadata || {}) };
  state.wall = { ...state.wall, ...(snapshot.wall || {}) };
  sanitizeWall();

  state.nodes = ensureArray(snapshot.nodes).map((n, i) => ({
    id: n.id || uid('node'),
    name: n.name || `RN-${i + 1}`,
    maxWidth: clampInt(n.maxWidth, 1, 30000),
    maxHeight: clampInt(n.maxHeight, 1, 30000),
    maxMPix: clampFloat(n.maxMPix, 0.1, 1000),
    outputs: clampInt(n.outputs, 1, 16),
    backupNodeId: n.backupNodeId || ''
  }));
  if (!state.nodes.length) {
    state.nodes.push({ id: uid('node'), name: 'RN-01', maxWidth: 7680, maxHeight: 4320, maxMPix: 14, outputs: 2, backupNodeId: '' });
  }

  state.processors = ensureArray(snapshot.processors).map((p, i) => {
    const processor = {
      id: p.id || uid('proc'),
      name: p.name || `PROC-${i + 1}`,
      type: p.type || 'Custom Processor',
      profile: p.profile || (state.metadata.processorProfile || 'Brompton SX40'),
      capacityMode: p.capacityMode || 'custom',
      latencyMode: p.latencyMode || 'From Project',
      customMPix: clampFloat(p.customMPix ?? p.maxMPix ?? 9, 0.1, 1000)
    };
    sanitizeProcessor(processor);
    return processor;
  });
  if (!state.processors.length) state.processors.push(defaultProcessor('PROC-A'));

  state.regions = ensureArray(snapshot.regions).map((r, i) => ({
    id: r.id || uid('reg'),
    name: r.name || `Region ${i + 1}`,
    x: clampInt(r.x, 0, 10000),
    y: clampInt(r.y, 0, 10000),
    w: clampInt(r.w, 1, 10000),
    h: clampInt(r.h, 1, 10000),
    nodeId: r.nodeId || '',
    processorId: r.processorId || '',
    role: r.role || 'Background'
  }));
  if (!state.regions.length) {
    state.regions.push({ id: uid('reg'), name: 'Main', x: 0, y: 0, w: 12, h: 8, nodeId: state.nodes[0].id, processorId: state.processors[0].id, role: 'Frustum' });
  }

  state.activeTab = snapshot.activeTab || state.activeTab || 'selection';
  syncProcessorProfiles();
  state.selection = { type: 'region', id: state.regions[0]?.id || '' };
  fitView();
  renderAll('History snapshot restored');
}

function deleteHistoryEntry(entryId) {
  loadHistoryStore();
  historyStore.entries = historyStore.entries.filter((entry) => entry.id !== entryId);
  persistHistoryStore();
}

function clearHistoryEntries() {
  loadHistoryStore();
  historyStore.entries = [];
  persistHistoryStore();
}

function formatHistoryTimestamp(ts) {
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return date.toLocaleString();
}

function showPresetsModal() {
  loadPresetsStore();
  const existing = document.getElementById('presetsModal');
  if (existing) existing.remove();

  const entries = getPresetEntriesNewestFirst();
  const modal = document.createElement('div');
  modal.id = 'presetsModal';
  modal.className = 'po-modal-backdrop';
  modal.innerHTML = `
    <div class="po-modal presets-modal">
      <div class="po-header">
        <h2>Presets</h2>
        <span class="po-sub">${entries.length} saved preset(s)</span>
        <button class="tool-btn po-close" title="Close">✕</button>
      </div>
      <div class="po-body history-body">
        <div class="history-toolbar">
          <button class="tool-btn tiny" data-preset-action="save-current">Save Current</button>
          <button class="tool-btn tiny" data-preset-action="export-csv" ${entries.length ? '' : 'disabled'}>Export CSV</button>
          <button class="tool-btn tiny" data-preset-action="clear" ${entries.length ? '' : 'disabled'}>Clear Presets</button>
        </div>
        ${entries.length ? `
          <div class="history-list">
            ${entries.map((entry) => `
              <div class="history-item">
                <div class="history-item-main">
                  <div class="history-item-title">${escapeHtml(entry.name || 'Preset')}</div>
                  <div class="history-item-meta">${renderHistoryEntryMeta(entry)}</div>
                </div>
                <div class="history-item-actions">
                  <button class="tool-btn tiny" data-preset-action="restore" data-preset-id="${entry.id}">Load</button>
                  <button class="tool-btn tiny danger" data-preset-action="delete" data-preset-id="${entry.id}">Delete</button>
                </div>
              </div>`).join('')}
          </div>` : '<div class="history-empty">No presets yet. Save your preferred configurations here for quick access.</div>'}
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.querySelector('.po-close')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      return;
    }
    const btn = e.target.closest('[data-preset-action]');
    if (!btn) return;
    const action = btn.dataset.presetAction;
    const id = btn.dataset.presetId;
    if (action === 'save-current') {
      const def = defaultPresetName();
      const name = window.prompt('Preset name:', def);
      if (name !== null) saveCurrentPreset(name);
      modal.remove();
      showPresetsModal();
      return;
    }
    if (action === 'restore' && id) {
      restorePresetEntry(id);
      modal.remove();
      return;
    }
    if (action === 'delete' && id) {
      deletePresetEntry(id);
      modal.remove();
      showPresetsModal();
      return;
    }
    if (action === 'export-csv') {
      exportEntriesCsv(entries, 'presets');
      return;
    }
    if (action === 'clear') {
      clearPresetEntries();
      modal.remove();
      showPresetsModal();
    }
  });
}

function loadPresetsStore() {
  if (presetsStore.loaded) {
    updatePresetsBadge();
    return;
  }
  presetsStore.loaded = true;
  try {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) {
      presetsStore.entries = [];
      updatePresetsBadge();
      return;
    }
    const parsed = JSON.parse(raw);
    presetsStore.entries = ensureArray(parsed)
      .filter((entry) => entry && typeof entry === 'object' && entry.id && entry.snapshot)
      .slice(-PRESETS_MAX_ENTRIES);
  } catch {
    presetsStore.entries = [];
  }
  updatePresetsBadge();
}

function persistPresetsStore() {
  try {
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presetsStore.entries));
  } catch {
    // ignore storage access failures
  }
  updatePresetsBadge();
}

function updatePresetsBadge() {
  if (els.presetsBadgeCount) {
    els.presetsBadgeCount.textContent = String(presetsStore.entries.length);
  }
  if (els.presetsBtn) {
    els.presetsBtn.title = `Show presets (${presetsStore.entries.length} saved preset${presetsStore.entries.length === 1 ? '' : 's'})`;
  }
}

function getPresetEntriesNewestFirst() {
  return [...presetsStore.entries].reverse();
}

function defaultPresetName() {
  return `${state.metadata.projectName || 'LED Wall'} • ${new Date().toLocaleString()}`;
}

function saveCurrentPreset(nameRaw) {
  loadPresetsStore();
  const name = String(nameRaw || '').trim();
  if (!name) return;
  const snapshot = createProjectSnapshot();
  presetsStore.entries.push({
    id: uid('preset'),
    name,
    createdAt: Date.now(),
    wallTilesX: snapshot.wall.wallTilesX,
    wallTilesY: snapshot.wall.wallTilesY,
    nodes: snapshot.nodes.length,
    processors: snapshot.processors.length,
    regions: snapshot.regions.length,
    snapshot
  });
  if (presetsStore.entries.length > PRESETS_MAX_ENTRIES) {
    presetsStore.entries = presetsStore.entries.slice(presetsStore.entries.length - PRESETS_MAX_ENTRIES);
  }
  persistPresetsStore();
  showToast(`Preset saved: ${name}`);
}

function restorePresetEntry(entryId) {
  loadPresetsStore();
  const entry = presetsStore.entries.find((item) => item.id === entryId);
  if (!entry?.snapshot) return;
  applySnapshot(entry.snapshot);
  showToast(`Preset loaded: ${entry.name}`);
}

function deletePresetEntry(entryId) {
  loadPresetsStore();
  presetsStore.entries = presetsStore.entries.filter((entry) => entry.id !== entryId);
  persistPresetsStore();
}

function clearPresetEntries() {
  loadPresetsStore();
  presetsStore.entries = [];
  persistPresetsStore();
}

// Computes distribution unit counts (XD / RP12 / XDS + QDS) from a saved snapshot.
// Returns null for Custom processors or when data is insufficient.
function computeSnapshotUnitCounts(snapshot) {
  const profile = snapshot?.metadata?.processorProfile;
  const reg = PROCESSOR_REGISTRY[profile];
  if (!reg?.portLookup) return null;

  const fps = reg.nearestFps ? reg.nearestFps(snapshot.metadata.frameRate || '60') : parseInt(snapshot.metadata.frameRate || '60');
  const bpc = Number(snapshot.metadata.colorDepth) || 10;
  const latencyMode = snapshot.metadata.latencyMode || 'Standard';
  const portPixels = reg.portLookup(fps, bpc, latencyMode);
  if (!portPixels || portPixels <= 0) return null;

  const tilePxW = Math.max(1, Number(snapshot.wall?.tilePxW) || 1);
  const tilePxH = Math.max(1, Number(snapshot.wall?.tilePxH) || 1);
  const tilePixels = tilePxW * tilePxH;
  const processors = ensureArray(snapshot.processors);
  const regions = ensureArray(snapshot.regions);

  let totalUnits = 0;
  let totalParentUnits = 0;

  processors.forEach((proc) => {
    const procRegions = regions.filter((r) => r.processorId === proc.id);
    const totalPixels = procRegions.reduce((sum, r) => sum + (r.w * r.h * tilePixels), 0);
    const ports = Math.max(1, Math.ceil(totalPixels / portPixels));
    const units = Math.ceil(ports / Math.max(1, reg.portsPerUnit));
    totalUnits += units;
    if (reg.parentUnit) {
      totalParentUnits += Math.ceil(units / reg.parentUnit.unitsPerParent);
    }
  });

  if (reg.parentUnit) {
    // Each processor must have at least 1 parent unit (e.g. 1 QDS per SQ200).
    totalParentUnits = Math.max(processors.length, totalParentUnits);
    // Each parent unit must have at least 1 child unit (e.g. 1 XDS per QDS).
    totalUnits = Math.max(totalParentUnits, totalUnits);
  }

  return {
    unitLabel: reg.portUnitLabel || 'XD',
    totalUnits,
    parentUnit: reg.parentUnit || null,
    totalParentUnits: reg.parentUnit ? totalParentUnits : 0
  };
}

function historyEntryDetails(entry) {
  const snapshot = entry?.snapshot || {};
  const wall = snapshot.wall || {};
  const metadata = snapshot.metadata || {};
  const processors = ensureArray(snapshot.processors);
  const wallTilesX = Math.max(0, Number(wall.wallTilesX) || 0);
  const wallTilesY = Math.max(0, Number(wall.wallTilesY) || 0);
  const tilePxW = Math.max(0, Number(wall.tilePxW) || 0);
  const tilePxH = Math.max(0, Number(wall.tilePxH) || 0);
  const tileMmW = Math.max(0, Number(wall.tileMmW) || 0);
  const tileMmH = Math.max(0, Number(wall.tileMmH) || 0);
  const wallPxW = wallTilesX * tilePxW;
  const wallPxH = wallTilesY * tilePxH;
  const wallMetersW = (wallTilesX * tileMmW) / 1000;
  const wallMetersH = (wallTilesY * tileMmH) / 1000;
  const processorNames = processors.map((p, i) => p?.name || `PROC-${i + 1}`).join(', ') || 'None';
  const processorProfile = metadata.processorProfile || '-';
  const fps = metadata.frameRate || '-';
  const depth = metadata.colorDepth || '-';
  const mode = metadata.latencyMode === 'ULL' ? 'ULL' : 'Standard';
  const unitCounts = computeSnapshotUnitCounts(snapshot);
  return {
    wallPxW,
    wallPxH,
    wallMetersW,
    wallMetersH,
    wallTilesX,
    wallTilesY,
    fps,
    depth,
    mode,
    processorProfile,
    processorNames,
    unitCounts
  };
}

function renderHistoryEntryMeta(entry) {
  const details = historyEntryDetails(entry);
  const uc = details.unitCounts;
  let unitStr = '-';
  if (uc) {
    unitStr = `${uc.totalUnits} ${uc.unitLabel}`;
    if (uc.parentUnit) unitStr += ` · ${uc.totalParentUnits} ${uc.parentUnit.label}`;
  }
  return `
    <div class="history-meta-grid">
      <div class="history-meta-cell"><span class="history-meta-key">Time</span><span class="history-meta-val">${escapeHtml(formatHistoryTimestamp(entry.createdAt))}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Size (px)</span><span class="history-meta-val">${details.wallPxW}x${details.wallPxH}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Size (m)</span><span class="history-meta-val">${details.wallMetersW.toFixed(2)}m x ${details.wallMetersH.toFixed(2)}m</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Video</span><span class="history-meta-val">${escapeHtml(`${details.fps} fps • ${details.depth} • ${details.mode}`)}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Processor Type</span><span class="history-meta-val">${escapeHtml(details.processorProfile)}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Processors</span><span class="history-meta-val">${escapeHtml(details.processorNames)}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Tiles</span><span class="history-meta-val">${details.wallTilesX}x${details.wallTilesY}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Dist. Units</span><span class="history-meta-val">${escapeHtml(unitStr)}</span></div>
      <div class="history-meta-cell"><span class="history-meta-key">Counts</span><span class="history-meta-val">${entry.nodes} node(s), ${entry.processors} proc(s), ${entry.regions} region(s)</span></div>
    </div>`;
}

function exportEntriesCsv(entries, kind) {
  if (!entries.length) return;
  const header = [
    'kind',
    'name',
    'timestamp',
    'size_px',
    'size_m',
    'fps',
    'depth',
    'latency_mode',
    'processor_type',
    'processor_names',
    'tiles',
    'nodes',
    'processors',
    'regions'
  ];
  const rows = entries.map((entry) => {
    const details = historyEntryDetails(entry);
    return [
      kind,
      entry.name || entry.message || 'Snapshot',
      formatHistoryTimestamp(entry.createdAt),
      `${details.wallPxW}x${details.wallPxH}`,
      `${details.wallMetersW.toFixed(2)}x${details.wallMetersH.toFixed(2)}`,
      details.fps,
      details.depth,
      details.mode,
      details.processorProfile,
      details.processorNames,
      `${details.wallTilesX}x${details.wallTilesY}`,
      entry.nodes,
      entry.processors,
      entry.regions
    ];
  });
  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug(state.metadata.projectName || 'led-wall')}-${kind}-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`${kind === 'history' ? 'History' : 'Presets'} CSV exported`);
}

function csvEscape(value) {
  const text = String(value ?? '');
  const escaped = text.replaceAll('"', '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

async function copyTextToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy copy method
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function formatInt(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

function buildCablePlan({ processorLoads, wall }) {
  const tilePixels = Math.max(1, wall.tilePxW * wall.tilePxH);
  const processorPlans = [];
  const warnings = [];

  Object.values(processorLoads).forEach((load) => {
    const regions = [...load.regions].sort((a, b) => (a.y - b.y) || (a.x - b.x));
    const perPortPixels = Math.max(1, load.xdPortCapacityPixels);
    const panelCapByPixels = Math.max(1, Math.floor(perPortPixels / tilePixels));
    const panelsPerPortCap = Math.max(1, Math.min(XD_MAX_PANELS_PER_PORT, panelCapByPixels));
    const ppu = load.portsPerUnit || XD_DOWNLINK_PORTS;
    const usedPorts = Math.max(0, load.xdPortsRequired);
    const xdCount = Math.max(0, load.xdsRequired);
    const portSlots = Math.max(0, xdCount * ppu);

    const ports = Array.from({ length: portSlots }, (_, i) => ({
      slot: i,
      xdIndex: Math.floor(i / ppu) + 1,
      index: (i % ppu) + 1,
      capacityPixels: perPortPixels,
      capacityPanels: panelsPerPortCap,
      usedPixels: 0,
      usedPanels: 0,
      segments: []
    }));

    let portPtr = 0;
    const nextAvailablePort = () => {
      while (portPtr < Math.min(usedPorts, ports.length)) {
        const p = ports[portPtr];
        const freePanels = p.capacityPanels - p.usedPanels;
        const freePixelsTiles = Math.floor((p.capacityPixels - p.usedPixels) / tilePixels);
        if (Math.min(freePanels, freePixelsTiles) > 0) return p;
        portPtr += 1;
      }
      return null;
    };

    const pattern = state.metadata.wiringPattern || 'linear';
    const isColumnMajor = pattern === 'N' || pattern === 'invN';

    // Shared port-acquisition helper used by both row-major and column-major loops.
    const acquirePort = (regionName, needed) => {
      let port = nextAvailablePort();
      if (!port) {
        warnings.push(`${load.processor.name}: insufficient planned ports while mapping "${regionName}".`);
        return null;
      }
      let freePanels = Math.max(0, port.capacityPanels - port.usedPanels);
      let freePixelsTiles = Math.max(0, Math.floor((port.capacityPixels - port.usedPixels) / tilePixels));
      let canTake = Math.max(0, Math.min(needed, freePanels, freePixelsTiles));
      if (canTake <= 0) {
        portPtr += 1;
        port = nextAvailablePort();
        if (!port) {
          warnings.push(`${load.processor.name}: insufficient planned ports while mapping "${regionName}".`);
          return null;
        }
        freePanels = Math.max(0, port.capacityPanels - port.usedPanels);
        freePixelsTiles = Math.max(0, Math.floor((port.capacityPixels - port.usedPixels) / tilePixels));
        canTake = Math.max(0, Math.min(needed, freePanels, freePixelsTiles));
        if (canTake <= 0) {
          warnings.push(`${load.processor.name}: zero-capacity port slice encountered while mapping "${regionName}".`);
          return null;
        }
      }
      return { port, canTake };
    };

    regions.forEach((region) => {
      if (isColumnMajor) {
        // N / invN: column-major traversal - iterate columns, snake up/down.
        for (let colIdx = 0; colIdx < region.w; colIdx += 1) {
          const x = region.x + colIdx;
          const reversed = (pattern === 'N' && colIdx % 2 === 1)
                        || (pattern === 'invN' && colIdx % 2 === 0);
          let remainingCol = region.h;
          let yCursor = reversed ? (region.y + region.h - 1) : region.y;
          while (remainingCol > 0) {
            const result = acquirePort(region.name, remainingCol);
            if (!result) return;
            const { port, canTake } = result;
            const px = canTake * tilePixels;
            port.usedPanels += canTake;
            port.usedPixels += px;
            const segY = reversed ? (yCursor - canTake + 1) : yCursor;
            port.segments.push({
              regionId: region.id, regionName: region.name,
              x, y: segY, w: 1, h: canTake,
              vertical: true, reversed,
              panels: canTake, pixels: px
            });
            yCursor += reversed ? -canTake : canTake;
            remainingCol -= canTake;
            if (port.usedPanels >= port.capacityPanels || (port.capacityPixels - port.usedPixels) < tilePixels) {
              portPtr += 1;
            }
          }
        }
      } else {
        // linear / S / invS: row-major traversal - iterate rows, optionally snake L/R.
        for (let y = region.y; y < region.y + region.h; y += 1) {
          const rowIdx = y - region.y;
          const reversed = (pattern === 'S' && rowIdx % 2 === 1)
                        || (pattern === 'invS' && rowIdx % 2 === 0);
          let remainingRow = region.w;
          let xCursor = reversed ? (region.x + region.w - 1) : region.x;
          while (remainingRow > 0) {
            const result = acquirePort(region.name, remainingRow);
            if (!result) return;
            const { port, canTake } = result;
            const px = canTake * tilePixels;
            port.usedPanels += canTake;
            port.usedPixels += px;
            const segX = reversed ? (xCursor - canTake + 1) : xCursor;
            port.segments.push({
              regionId: region.id, regionName: region.name,
              x: segX, y, w: canTake, h: 1,
              reversed,
              panels: canTake, pixels: px
            });
            xCursor += reversed ? -canTake : canTake;
            remainingRow -= canTake;
            if (port.usedPanels >= port.capacityPanels || (port.capacityPixels - port.usedPixels) < tilePixels) {
              portPtr += 1;
            }
          }
        }
      }
    });

    const xds = Array.from({ length: xdCount }, (_, xdIdx) => ({
      index: xdIdx + 1,
      ports: ports.slice(xdIdx * ppu, (xdIdx + 1) * ppu)
    }));

    processorPlans.push({
      processorId: load.processor.id,
      processorName: load.processor.name,
      portCapacityPixels: perPortPixels,
      panelCapacityPerPort: panelsPerPortCap,
      usedPorts,
      portUnitLabel: load.portUnitLabel || 'XD',
      portUnitPrefix: PROCESSOR_REGISTRY[load.processor.profile]?.portUnitPrefix || 'X',
      xds
    });
  });

  return { processorPlans, warnings };
}

function formatCablePlan(cablePlan) {
  const lines = [];
  lines.push('--- Cable Plan (Processor -> Port Unit -> Port -> Region) ---');
  cablePlan.processorPlans.forEach((plan) => {
    const unitLabel = plan.portUnitLabel || 'XD';
    lines.push(`${plan.processorName}: port cap ${formatInt(plan.portCapacityPixels)} px, panel cap ${plan.panelCapacityPerPort}/port, used ports ${plan.usedPorts}`);
    plan.xds.forEach((xd) => {
      const xdRegionPanels = {};
      xd.ports.forEach((port) => {
        port.segments.forEach((seg) => {
          xdRegionPanels[seg.regionName] = (xdRegionPanels[seg.regionName] || 0) + seg.panels;
        });
      });
      const xdPanelTotal = Object.values(xdRegionPanels).reduce((acc, v) => acc + v, 0);
      const xdAssign = Object.entries(xdRegionPanels)
        .map(([name, count]) => `${name}: ${count} panels`)
        .join(', ');
      lines.push(`  ${unitLabel}-${xd.index} Assignment: ${xdPanelTotal} panels${xdAssign ? ` | ${xdAssign}` : ' | none'}`);
      lines.push(`  ${unitLabel}-${xd.index}`);
      xd.ports.forEach((port) => {
        const utilPx = port.capacityPixels > 0 ? (port.usedPixels / port.capacityPixels) * 100 : 0;
        const utilPanels = port.capacityPanels > 0 ? (port.usedPanels / port.capacityPanels) * 100 : 0;
        const loadText = `${formatInt(port.usedPixels)} px (${utilPx.toFixed(1)}%), ${port.usedPanels} panels (${utilPanels.toFixed(1)}%)`;
        lines.push(`    P${String(port.index).padStart(2, '0')}: ${loadText}`);
        const portPath = buildPortTilePath(port);
        if (portPath.length) {
          const baseHsl = hexToHsl(portPath[0].base);
          const baseLight = clampInt(Math.max(30, baseHsl.l - 14), 28, 46);
          const highestLight = lightnessForStep(baseLight, 0, portPath.length);
          const lowestLight = lightnessForStep(baseLight, Math.max(0, portPath.length - 1), portPath.length);
          lines.push(`      lightness steps: highest=${highestLight}% (step 1), lowest=${lowestLight}% (step ${portPath.length})`);
        }
        const portColorMap = new Map();
        port.segments.forEach((seg) => {
          const region = state.regions.find((r) => r.id === seg.regionId);
          if (!region) return;
          const regionIndex = Math.max(0, state.regions.findIndex((r) => r.id === region.id));
          const base = colorForRegion(region, regionIndex);
          const color = cableColorForPort(base, port.index, 1);
          if (!portColorMap.has(seg.regionName)) {
            portColorMap.set(seg.regionName, color);
          }
        });
        if (portColorMap.size) {
          const colorText = Array.from(portColorMap.entries())
            .map(([name, color]) => `${name}=${color}`)
            .join(', ');
          lines.push(`      color: ${colorText}`);
        }
        if (!port.segments.length) {
          lines.push('      - unused');
        } else {
          port.segments.forEach((seg) => {
            lines.push(`      - ${seg.regionName} @ (${seg.x},${seg.y}) ${seg.w}x${seg.h} tiles`);
          });
        }
      });
    });
  });
  if (cablePlan.warnings.length) {
    lines.push('');
    lines.push('Warnings:');
    cablePlan.warnings.forEach((w) => lines.push(`- ${w}`));
  }
  return lines;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}
