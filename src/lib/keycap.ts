/**
 * Shared look for every keycap button on the page, so the hero CTAs and the
 * contact CTAs stay one asset rather than two sets of drifting magic numbers.
 *
 * The component's default camera is `{ tilt: 49, rotate: -37 }` — a full
 * isometric view, which is what made the buttons read as crooked: the -37°
 * Z-rotation swings the whole pill diagonally and the steep tilt squashes the
 * label along with it. Dropping rotate to 0 sets the button upright, and a
 * shallow tilt keeps a visible slab of depth (and the glow beneath it) while
 * leaving the text almost unforeshortened — cos(20°) ≈ 0.94, so ~6% of squash
 * instead of ~34%.
 */
export const KEYCAP_CAMERA = { tilt: 20, rotate: 0 }

export const KEYCAP_PRIMARY = {
  rounded: 100,
  padding: '18px 30px',
  camera: KEYCAP_CAMERA,
  colors: { fill: '#17211c', textColor: '#dcede7', hoverTextColor: '#ffffff' },
  prism: { color: '#2f7d6b', float: 7, hoverFloat: 5, intensity: 100, thickness: 12 },
} as const

export const KEYCAP_SECONDARY = {
  rounded: 100,
  padding: '18px 30px',
  camera: KEYCAP_CAMERA,
  colors: { fill: '#17211c', textColor: '#9ba89f', hoverTextColor: '#ffffff' },
  prism: { color: '#57685f', float: 7, hoverFloat: 5, intensity: 80, thickness: 12 },
} as const
