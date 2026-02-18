import { st } from './state.js';

const UI2JSON = {
  '4x4_50':'DICT_4X4_50', '4x4_100':'DICT_4X4_100', '4x4_250':'DICT_4X4_250',
  '5x5_100':'DICT_5X5_100', '6x6_250':'DICT_6X6_250', '7x7_1000':'DICT_7X7_1000'
};

export async function loadBitDB(){
  const { bitdbStatus } = st.controls;
  try {
    const rsp = await fetch('img/aruco_bitmaps.json', {cache:'no-cache'});
    st.bitDB = await rsp.json();
    bitdbStatus.textContent = `JSON loaded (dicts: ${Object.keys(st.bitDB).length})`;
  } catch(e){
    st.bitDB = null;
    bitdbStatus.textContent = 'JSON not found — js-aruco fallback only';
    bitdbStatus.classList.add('warn');
  }
}

function dictUiToJsonKey(name){ return UI2JSON[name]; }

export function getJsonBits(dictName, id){
  if(!st.bitDB) return null;
  const key = dictUiToJsonKey(dictName);
  const bucket = st.bitDB[key];
  if(!bucket || !bucket.ids) return null;
  const mat = bucket.ids[String(id)];
  return Array.isArray(mat) ? mat : null;
}
