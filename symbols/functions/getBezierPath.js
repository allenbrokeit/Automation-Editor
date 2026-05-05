export const getBezierPath = function getBezierPath (x1, y1, x2, y2) {
  if (x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined) {
    console.warn('getBezierPath called with undefined coords', x1, y1, x2, y2)
    return ''
  }
  const dx = Math.abs(x2 - x1)
  const controlOffset = Math.max(dx * 0.5, 80)
  const cx1 = x1 + controlOffset
  const cy1 = y1
  const cx2 = x2 - controlOffset
  const cy2 = y2
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
}
