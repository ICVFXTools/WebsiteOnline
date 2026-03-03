import { st } from './state.js';
import { arucoReady } from './aruco.js';


export function ensureValidPatternSelection(){
  const wantCh = st.controls.pattern.value==='charuco';
  if (wantCh && !arucoReady() && !st.bitDB){
    st.controls.pattern.value='checkerboard';
    st.controls.charucoWarn.classList.remove('hidden');
  } else {
    st.controls.charucoWarn.classList.add('hidden');
  }
}

// js/ui.js

export function updateUI(type) {
  ensureValidPatternSelection();
  const t = st.controls.pattern.value;
  const c = st.controls;

  // Define visibility rules for each control group
  const visibilityMap = {
    'checkerboard': {
      cellSizeGroup: true, checkerboardOpts: true,
    },
    'grid': {
      cellSizeGroup: true,
    },
    'dots': {
      cellSizeGroup: true, dotGroup: true,
    },
    'charuco': {
      cellSizeGroup: true, checkerboardOpts: true, // ChArUco is on a checkerboard
      charucoDictGroup: true, charucoOpts: true, charucoLayout: true,
      charucoOrdering: true, charucoShowIdToggle: true,
    },
    'apriltag': {
      apriltagFamilyGroup: true, apriltagStartGroup: true, apriltagLayout: true,
      apriltagOrdering: true, apriltagShowIdToggle: true, apriltagGridOpts: true,
      apriltagIntersectionToggle: true,
      // Special case: intersection size only visible if toggle is checked
      apriltagIntersectionSize: c.apriltagShowIntersections.checked,
    }
  };

  if (type != null) {
    console.log("Type is not null, so filtering visibilityMap")

  }

  // Get all control elements that are managed
  const allControls = {
    cellSizeGroup: c.cellSizeGroup, checkerboardOpts: c.checkerboardOpts,
    dotGroup: c.dotGroup, charucoDictGroup: c.charucoDictGroup,
    charucoOpts: c.charucoOpts, charucoLayout: c.charucoLayout,
    charucoOrdering: c.charucoOrdering, charucoShowIdToggle: c.charucoShowIdToggle,
    apriltagFamilyGroup: c.apriltagFamilyGroup, apriltagStartGroup: c.apriltagStartGroup,
    apriltagLayout: c.apriltagLayout, apriltagOrdering: c.apriltagOrdering,
    apriltagShowIdToggle: c.apriltagShowIdToggle, apriltagGridOpts: c.apriltagGridOpts,
    apriltagIntersectionToggle: c.apriltagIntersectionToggle,
    apriltagIntersectionSize: c.apriltagIntersectionSize,
  };

  // Get the rules for the currently selected pattern
  const rules = visibilityMap[t] || {};

  // Apply rules: toggle 'hidden' class based on presence in the map
  for (const key in allControls) {
    // Use .hidden property to avoid firing 'change' events
    // allControls[key].hidden = !rules[key]; // hidden = true if NOT in rules
    if (rules[key]) {
      allControls[key].style.display = 'block';
      allControls[key].classList.remove('hidden');
    } else {
      allControls[key].classList.add('hidden');
      allControls[key].style.display = 'none';
    }
  }

  // Handle SVG button state
  const svgDisabled = (t === 'charuco');
  c.dlSvg.disabled = svgDisabled;
  c.dlSvg.title = svgDisabled ? 'SVG export is not supported for this pattern type.' : 'Download as SVG';
}

export function generateConfigString(){
  const t = st.controls.pattern.value;
  const r = st.controls.rows.value;
  const c = st.controls.cols.value;
  const parts = [`Pattern: ${t}`, `Grid: ${r}x${c} (inner)`];

  if (t !== 'apriltag') parts.push(`Cell: ${st.controls.cellSize.value}px`);
  if (t==='checkerboard' || t==='charuco') parts.push(`Top-Left: ${st.controls.topLeft.value}`);

  if (t==='dots') {
    parts.push(`Radius: ${st.controls.dotRadius.value}x`);
  } else if (t==='charuco') {
    parts.push(`Dict: ${st.controls.charucoDict.value}`);
    parts.push(`Ratio: ${st.controls.charucoRatio.value}`);
    parts.push(`Start: ${st.controls.charucoStart.value}`);
    parts.push(`On: ${st.controls.charucoOn.value}`);
    parts.push(`Origin: ${st.controls.charucoOrigin.value}`);
    let traversalText = st.controls.charucoOrder.value;
    switch(traversalText) {
      case 'row-major-ltr': traversalText = 'Row-major L→R'; break;
      case 'row-major-rtl': traversalText = 'Row-major R→L'; break;
      case 'snake-ltr-first': traversalText = 'Snake (L→R first)'; break;
      case 'snake-rtl-first': traversalText = 'Snake (R→L first)'; break;
    }
    parts.push(`Traversal: ${traversalText}`);
    if (st.controls.charucoShowId.checked) parts.push(`Show IDs`);
  } else if (t==='apriltag') {
    parts.push(`Family: ${st.controls.apriltagFamily.value}`);
    parts.push(`Tag Size: ${st.controls.apriltagTagSize.value}px`);
    parts.push(`Spacing Ratio: ${st.controls.apriltagSpacingRatio.value}`);
    parts.push(`Start: ${st.controls.apriltagStart.value}`);
    parts.push(`Origin: ${st.controls.apriltagOrigin.value}`);
    let traversalText = st.controls.apriltagOrder.value;
    switch(traversalText) {
      case 'row-major-ltr': traversalText = 'Row-major L→R'; break;
      case 'row-major-rtl': traversalText = 'Row-major R→L'; break;
      case 'snake-ltr-first': traversalText = 'Snake (L→R first)'; break;
      case 'snake-rtl-first': traversalText = 'Snake (R→L first)'; break;
    }
    parts.push(`Traversal: ${traversalText}`);
    if (st.controls.apriltagShowId.checked) parts.push(`Show IDs`);
    if (st.controls.apriltagShowIntersections.checked) {
      parts.push(`Ix Square: ${st.controls.apriltagIntersectionPx.value}px`);
    }
  }
  return parts.join(' | ');
}
