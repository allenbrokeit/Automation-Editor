export const nodeTypeColor = function (type) {
  if (!type) return '#0474f2'
  if (type.startsWith('assert')) return '#4db852'
  if (type.startsWith('logic')) return '#e97c16'
  return '#0474f2'
}
