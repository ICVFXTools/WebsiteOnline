export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function escapeXML(str) {
  return String(str).replace(/[<>&'"]/g, c => ({
    '<':'&lt;', '>':'&gt;', '&':'&amp;', '\'':'&apos;', '"':'&quot;'
  }[c]));
}
