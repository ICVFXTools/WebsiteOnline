import { st } from './state.js';

const $ = (id) => document.getElementById(id);

export function setupControls() {
  st.canvas = $('pattern-canvas');
  st.ctx = st.canvas.getContext('2d');
  st.holder = $('canvas-holder');

  st.controls = {
    pattern: $('pattern'), rows: $('rows'), cols: $('cols'),
    cellSize: $('cell-size'), outputW: $('output-w'),
    aspectW: $('aspect-w'), aspectH: $('aspect-h'),
    dotRadius: $('dot-radius'), topLeft: $('top-left'),
    // charuco
    charucoDict: $('charuco-dict'), charucoRatio: $('charuco-ratio'), charucoStart: $('charuco-start'),
    charucoOn: $('charuco-on'), charucoOrigin: $('charuco-origin'), charucoOrder: $('charuco-order'), charucoStep: $('charuco-step'),
    charucoShowId: $('charuco-show-id'),
    // apriltag
    apriltagFamily: $('apriltag-family'),
    apriltagStart: $('apriltag-start'),
    apriltagTagSize: $('apriltag-tag-size'),
    apriltagOrigin: $('apriltag-origin'),
    apriltagOrder: $('apriltag-order'),
    apriltagSpacingRatio: $('apriltag-spacing-ratio'),
    apriltagShowId: $('apriltag-show-id'),
    // intersections
    apriltagShowIntersections: $('apriltag-show-intersections'),
    apriltagIntersectionPx: $('apriltag-intersection-px'),
    // groups
    cellSizeGroup: $('cell-size-group'),
    dotGroup: $('dot-radius-group'),
    charucoDictGroup: $('charuco-dict-group'), charucoOpts: $('charuco-opts'),
    charucoLayout: $('charuco-layout'), charucoOrdering: $('charuco-ordering'),
    charucoShowIdToggle: $('charuco-show-id-toggle'),
    apriltagFamilyGroup: $('apriltag-family-group'),
    apriltagGridOpts: $('apriltag-grid-opts'),
    apriltagLayout: $('apriltag-layout'),
    apriltagOrdering: $('apriltag-ordering'),
    apriltagStartGroup: $('apriltag-start-group'),
    apriltagShowIdToggle: $('apriltag-show-id-toggle'),
    apriltagIntersectionToggle: $('apriltag-intersection-toggle'),
    apriltagIntersectionSize: $('apriltag-intersection-size'),
    checkerboardOpts: $('checkerboard-opts'),
    // misc
    dlPng: $('dl-png'), dlSvg: $('dl-svg'), generate: $('generate'),
    charucoWarn: $('charuco-warn'), aprilOffline: $('apriltag-offline'), bitdbStatus: $('bitdb-status'),
  };
}

export { $ };
