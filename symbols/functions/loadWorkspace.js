export const loadWorkspace = function loadWorkspace (file) {
  if (!file) return

  const reader = new FileReader()
  const self = this

  reader.onload = function (e) {
    let data
    try {
      data = JSON.parse(e.target.result)
    } catch (err) {
      self.call('showToast', 'Invalid workflow file format', 'error')
      return
    }

    const isValid = self.call('validateGraph', data)
    if (!isValid) {
      self.call('showToast', 'Invalid workflow file format', 'error')
      return
    }

    const s = self.state
    const root = s.root || s

    root.update({
      nodes: data.nodes,
      connections: data.connections,
      transform: data.transform,
      activeSelection: null,
      isDraggingNode: false,
      draggingNodeId: null,
      isDraggingWire: false,
      draftWire: null,
    })

    self.call('showToast', 'Workspace loaded successfully', 'success')
  }

  reader.onerror = function () {
    self.call('showToast', 'Failed to read file', 'error')
  }

  reader.readAsText(file)
}
