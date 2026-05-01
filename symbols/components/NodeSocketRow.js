export const SocketDot = {
  position: 'relative',
  flow: 'x',
  align: 'center',
  gap: 'Y',
  cursor: 'crosshair',
  userSelect: 'none',

  isOutput: (el, s) => s.type === 'output',
  '.isOutput': {
    flexDirection: 'row-reverse',
  },

  SocketHitArea: {
    width: 'B',
    height: 'B',
    borderRadius: '50%',
    align: 'center center',
    flexShrink: '0',
    cursor: 'crosshair',
    position: 'relative',
    background: 'rgba(0,0,0,0.01)',

    SocketVisual: {
      width: 'Z2',
      height: 'Z2',
      borderRadius: '50%',
      border: '2px solid',
      borderColor: (el, s) => s.type === 'output' ? 'socketOutput' : 'socketInput',
      background: 'transparent',
      transition: 'all 0.1s ease',
      boxSizing: 'border-box',

      isConnected: (el, s) => {
        const rootState = el.call('getRootState')
        if (!rootState) return false
        return (rootState.connections || []).some(
          c => c.sourceSocketId === s.id || c.targetSocketId === s.id
        )
      },
      '.isConnected': {
        background: (el, s) => s.type === 'output' ? 'socketOutput' : 'socketInput',
        boxShadow: (el, s) => {
          const col = s.type === 'output' ? '#0474f2' : '#4db852'
          return `0 0 6px ${col}88`
        },
      },
    },

    onMousedown: (e, el, s) => {
      e.stopPropagation()
      e.preventDefault()
      if (s.type !== 'output') return

      const rootState = el.call('getRootState')
      const nodeSocket = el.call('getSocketCoords', rootState, s.nodeId, s.id)
      if (!nodeSocket) return

      rootState.update({
        isDraggingWire: true,
        draftWire: {
          sourceNodeId: s.nodeId,
          sourceSocketId: s.id,
          x1: nodeSocket.x,
          y1: nodeSocket.y,
          x2: nodeSocket.x,
          y2: nodeSocket.y,
        }
      })
    },

    onMouseup: (e, el, s) => {
      if (s.type !== 'input') return
      e.stopPropagation()

      const rootState = el.call('getRootState')
      if (!rootState.isDraggingWire || !rootState.draftWire) return

      const draft = rootState.draftWire
      if (draft.sourceNodeId === s.nodeId) {
        rootState.update({ isDraggingWire: false, draftWire: null })
        return
      }

      const conns = rootState.connections || []
      
      // Find and remove existing connection to same target
      const existingIdx = conns.findIndex(c => c.targetNodeId === s.nodeId && c.targetSocketId === s.id)
      if (existingIdx !== -1) {
        conns.splice(existingIdx, 1)
      }
      
      const connId = 'conn_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5)
      const newConn = {
        id: connId,
        sourceNodeId: draft.sourceNodeId,
        sourceSocketId: draft.sourceSocketId,
        targetNodeId: s.nodeId,
        targetSocketId: s.id,
      }

      // Mutate proxy directly
      conns.push(newConn)

      rootState.update({
        isDraggingWire: false,
        draftWire: null,
        forceRender: Date.now(),
      })

      el.call('showToast', 'Wire Connected successfully!', 'success')
    },
  },

  SocketLabel: {
    text: (el, s) => s.label || '',
    fontSize: 'Y',
    color: 'caption',
    pointerEvents: 'none',
  },
}

export const NodeSocketRow = {
  flow: 'y',
  gap: 'Y',
  width: '100%',
}
