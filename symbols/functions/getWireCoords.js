export const getWireCoords = function getWireCoords (rootState, sourceNodeId, sourceSocketId, targetNodeId, targetSocketId) {
  const src = this.call('getSocketCoords', rootState, sourceNodeId, sourceSocketId)
  const tgt = this.call('getSocketCoords', rootState, targetNodeId, targetSocketId)
  if (!src || !tgt) return null
  return { x1: src.x, y1: src.y, x2: tgt.x, y2: tgt.y }
}
