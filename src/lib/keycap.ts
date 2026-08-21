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

/** The label inherits page font size otherwise; nudged down with the padding
 *  so the cap shrinks proportionally instead of just losing its margins. */
const KEYCAP_FONT = { fontSize: '15px' }
const KEYCAP_PADDING = '14px 26px'
const KEYCAP_SHAPE = { rounded: 100, padding: KEYCAP_PADDING, camera: KEYCAP_CAMERA, font: KEYCAP_FONT }

export const KEYCAP_PRIMARY = {
  ...KEYCAP_SHAPE,
  colors: { fill: '#17211c', textColor: '#dcede7', hoverTextColor: '#ffffff' },
  prism: { color: '#2f7d6b', float: 6, hoverFloat: 4, intensity: 100, thickness: 10 },
} as const

export const KEYCAP_SECONDARY = {
  ...KEYCAP_SHAPE,
  colors: { fill: '#17211c', textColor: '#9ba89f', hoverTextColor: '#ffffff' },
  prism: { color: '#57685f', float: 6, hoverFloat: 4, intensity: 80, thickness: 10 },
} as const
