const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const PUB = 'C:\\Users\\KSEAB\\OneDrive\\Documents\\Default Project\\public'

// ---- geometry (512 space) --------------------------------------------------
const CANVAS = 512
const THICK = 100
const LEN = 172
const OUTLINE = 16
const A = 37 * Math.PI / 180
const COS = Math.cos(A)
const SIN = Math.sin(A)
const CD = 108
const VX_LEFT = 40
const Y = 256
const DX = CD * COS
const DY = CD * SIN

const BLUE = '#4285F4'
const RED = '#EA4335'
const YELLOW = '#FBBC04'
const GREEN = '#34A853'

function capsule(cx, cy, angleDeg, fill, outline) {
  const rx = THICK / 2
  const x = cx - LEN / 2
  const y = cy - THICK / 2
  return `<g transform="rotate(${angleDeg} ${cx} ${cy})"><rect x="${x}" y="${y}" width="${LEN}" height="${THICK}" rx="${rx}" fill="${fill}" stroke="${outline}" stroke-width="${OUTLINE}"/></g>`
}

function mark(outline) {
  const upperL = capsule(VX_LEFT + DX, Y - DY, -37, RED, outline)
  const lowerL = capsule(VX_LEFT + DX, Y + DY, 37, BLUE, outline)
  const RX = CANVAS - (VX_LEFT + DX)
  const upperR = capsule(RX, Y - DY, 217, GREEN, outline)
  const lowerR = capsule(RX, Y + DY, 143, YELLOW, outline)
  return [upperL, lowerL, upperR, lowerR].join('\n    ')
}

function iconSvg(outline, bg) {
  const bgRect = bg
    ? `\n  <rect width="${CANVAS}" height="${CANVAS}" rx="112" fill="${bg}"/>`
    : ''
  return `<svg width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>GDG on Campus RVCE</title>${bgRect}
  <g>
    ${mark(outline)}
  </g>
</svg>
`
}

const LIGHT_OUTLINE = '#0B0D10'
const DARK_OUTLINE = '#F4F6F8'

const lightIcon = iconSvg(LIGHT_OUTLINE, '#FFFFFF')
const darkIcon = iconSvg(DARK_OUTLINE, '#0B0D10')

// write svgs
fs.writeFileSync(path.join(PUB, 'icon.svg'), lightIcon)
fs.writeFileSync(path.join(PUB, 'icon-light.svg'), lightIcon)
fs.writeFileSync(path.join(PUB, 'icon-dark.svg'), darkIcon)

async function png(svgText, size) {
  return sharp(Buffer.from(svgText)).resize(size, size).png().toBuffer()
}

async function main() {
  // apple touch icon (180x180)
  await sharp(Buffer.from(lightIcon)).resize(180, 180).png().toFile(path.join(PUB, 'apple-icon.png'))

  // 32x32 favicons
  await sharp(Buffer.from(lightIcon)).resize(32, 32).png().toFile(path.join(PUB, 'icon-light-32x32.png'))
  await sharp(Buffer.from(darkIcon)).resize(32, 32).png().toFile(path.join(PUB, 'icon-dark-32x32.png'))

  // ico favicon (multi-size)
  await sharp(Buffer.from(lightIcon))
    .resize({ width: 32, height: 32 })
    .toFile(path.join(PUB, 'favicon.ico'))

  console.log('All icons regenerated with GDG logo')
}

main().catch((e) => { console.error(e); process.exit(1) })