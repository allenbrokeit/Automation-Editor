export const validateGraph = function validateGraph (data) {
  if (!data || typeof data !== 'object') return false
  if (!Array.isArray(data.nodes)) return false
  if (!Array.isArray(data.connections)) return false
  if (!data.transform || typeof data.transform !== 'object') return false

  const { x, y, scale } = data.transform
  if (typeof x !== 'number' || typeof y !== 'number' || typeof scale !== 'number') return false

  for (const node of data.nodes) {
    if (!node.id || !node.type || typeof node.x !== 'number' || typeof node.y !== 'number') return false
    if (!Array.isArray(node.inputs) || !Array.isArray(node.outputs)) return false
  }

  for (const conn of data.connections) {
    if (!conn.id || !conn.sourceNodeId || !conn.sourceSocketId) return false
    if (!conn.targetNodeId || !conn.targetSocketId) return false
  }

  return true
}
