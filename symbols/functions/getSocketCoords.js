export const getSocketCoords = function getSocketCoords (rootState, nodeId, socketId) {
  if (!rootState) return null
  
  // Safely extract raw object to avoid deeply nested proxy issues
  const rawState = typeof rootState.parse === 'function' ? rootState.parse() : rootState
  const nodes = rawState.nodes || []
  
  const node = nodes.find(n => n.id === nodeId)
  if (!node) return null

  const inputs = Array.from(node.inputs || [])
  const outputs = Array.from(node.outputs || [])
  const allSockets = inputs.concat(outputs)
  const socket = allSockets.find(sk => sk.id === socketId)
  if (!socket) return null

  return {
    x: node.x + socket.relativeX,
    y: node.y + socket.relativeY
  }
}

