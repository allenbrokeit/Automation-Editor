export const deleteSelection = function deleteSelection () {
  const rootState = this.call('getRootState')
  const sel = rootState.activeSelection

  if (!sel) return

  if (sel.type === 'node') {
    const nodeId = sel.id
    const newNodes = (rootState.nodes || []).filter(n => n.id !== nodeId)
    // Remove all connections referencing this node
    const newConns = (rootState.connections || []).filter(
      c => c.sourceNodeId !== nodeId && c.targetNodeId !== nodeId
    )
    rootState.update({
      nodes: newNodes,
      connections: newConns,
      activeSelection: null
    })
  } else if (sel.type === 'wire') {
    const wireId = sel.id
    const newConns = (rootState.connections || []).filter(c => c.id !== wireId)
    rootState.update({
      connections: newConns,
      activeSelection: null
    })
  }
}
