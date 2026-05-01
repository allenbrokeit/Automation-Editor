export const saveWorkspace = function saveWorkspace () {
  const rootState = this.call('getRootState')

  const graphState = {
    nodes: rootState.nodes || [],
    connections: rootState.connections || [],
    transform: rootState.transform || { x: 0, y: 0, scale: 1 }
  }

  const json = JSON.stringify(graphState, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'workflow.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  this.call('showToast', 'Workspace saved as workflow.json', 'success')
}
