export const CanvasContainer = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  transformOrigin: '0 0',
  willChange: 'transform',

  transform: (el, s) => {
    const root = s.root || s
    const t = root.transform || { x: 0, y: 0, scale: 1 }
    return `translate(${t.x}px, ${t.y}px) scale(${t.scale})`
  },

  SvgWireLayer: {
    extends: 'SvgWireLayer',
  },

  NodesGroup: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '2',

    children: (el, s) => {
      const root = s.root || s
      return root.nodes || []
    },
    childExtends: 'AutomationNode',
    childrenAs: 'state',
  },
}

export const CanvasViewport = {
  flex: '1',
  position: 'relative',
  overflow: 'hidden',
  theme: 'canvas',
  cursor: 'default',

  onRender: (el, s) => {
    el.node.addEventListener('drop', (e) => {
      console.log('NATIVE DROP TRIGGERED', e.dataTransfer?.getData('nodeType'))
    })
  },

  backgroundImage: (el, s) => {
    const root = s.root || s
    const t = root.transform || { x: 0, y: 0, scale: 1 }
    const dotSize = Math.max(1, Math.round(2 * t.scale))
    const spacing = Math.round(24 * t.scale)
    return `radial-gradient(circle, rgba(100,120,200,0.25) ${dotSize}px, transparent ${dotSize}px)`
  },
  backgroundSize: (el, s) => {
    const root = s.root || s
    const t = root.transform || { x: 0, y: 0, scale: 1 }
    const spacing = Math.max(10, Math.round(24 * t.scale))
    return `${spacing}px ${spacing}px`
  },
  backgroundPosition: (el, s) => {
    const root = s.root || s
    const t = root.transform || { x: 0, y: 0, scale: 1 }
    return `${t.x % Math.max(10, Math.round(24 * t.scale))}px ${t.y % Math.max(10, Math.round(24 * t.scale))}px`
  },

  CanvasContainer: {},

  ZoomChip: {
    position: 'absolute',
    bottom: 'Z',
    right: 'Z',
    flow: 'x',
    align: 'center',
    gap: 'Y',
    padding: 'X Z',
    borderRadius: 'Y',
    theme: 'dialog',
    fontSize: 'Y',
    color: 'caption',
    fontWeight: '600',
    pointerEvents: 'none',
    zIndex: '50',

    ZoomValue: {
      text: (el, s) => {
        const root = s.root || s
        const scale = (root.transform || { scale: 1 }).scale
        return Math.round(scale * 100) + '%'
      },
    },
  },

  onWheel: (e, el, s) => {
    e.preventDefault()
    const rootState = s.root || s
    const t = rootState.transform || { x: 0, y: 0, scale: 1 }

    const direction = e.deltaY > 0 ? -1 : 1
    const factor = 0.08
    const newScale = Math.min(4, Math.max(0.1, t.scale + direction * factor * t.scale))

    const rect = el.node.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const scaleRatio = newScale / t.scale
    const newX = mouseX - scaleRatio * (mouseX - t.x)
    const newY = mouseY - scaleRatio * (mouseY - t.y)

    rootState.update({ transform: { x: newX, y: newY, scale: newScale } })
  },

  onMousedown: (e, el, s) => {
    const rootState = s.root || s
    const isSpacePressed = rootState.isSpacePressed

    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      e.preventDefault()
      rootState.update({ isPanning: true, panStart: { x: e.clientX, y: e.clientY } })
      el.node.style.cursor = 'grabbing'
      return
    }

    if (e.button === 0 && e.target === el.node) {
      rootState.update({ activeSelection: null })
    }
  },

  onMousemove: (e, el, s) => {
    const rootState = s.root || s

    if (rootState.isPanning) {
      const t = rootState.transform || { x: 0, y: 0, scale: 1 }
      const dx = e.clientX - (rootState.panStart?.x || e.clientX)
      const dy = e.clientY - (rootState.panStart?.y || e.clientY)
      rootState.update({
        transform: { ...t, x: t.x + dx, y: t.y + dy },
        panStart: { x: e.clientX, y: e.clientY }
      })
      return
    }

    if (rootState.isDraggingNode && rootState.draggingNodeId) {
      const transform = rootState.transform || { x: 0, y: 0, scale: 1 }
      const canvasX = (e.clientX - transform.x) / transform.scale
      const canvasY = (e.clientY - transform.y) / transform.scale
      const offset = rootState.dragOffset || { x: 0, y: 0 }

      const newX = canvasX - offset.x
      const newY = canvasY - offset.y

      const targetNode = (rootState.nodes || []).find(n => n.id === rootState.draggingNodeId)
      if (targetNode) {
        targetNode.x = newX
        targetNode.y = newY
        
        const mainCanvas = el.CanvasContainer
        if (mainCanvas && mainCanvas.NodesGroup) {
          const nodesGroup = mainCanvas.NodesGroup
          // Find the specific DOMQL component instance
          const childrenArr = Object.values(nodesGroup).filter(c => c && c.state)
          const nodeComp = childrenArr.find(c => c.state && c.state.id === rootState.draggingNodeId)
          if (nodeComp) {
            nodeComp.state.update({ x: newX, y: newY })
          } else {
            nodesGroup.update()
          }
        }
        rootState.update({ forceRender: Date.now() })
      }
      return
    }

    if (rootState.isDraggingWire && rootState.draftWire) {
      const rect = el.node.getBoundingClientRect()
      const t = rootState.transform || { x: 0, y: 0, scale: 1 }
      const canvasX = (e.clientX - rect.left - t.x) / t.scale
      const canvasY = (e.clientY - rect.top - t.y) / t.scale

      rootState.update({
        draftWire: { ...rootState.draftWire, x2: canvasX, y2: canvasY }
      })
    }
  },

  onMouseup: (e, el, s) => {
    const rootState = s.root || s

    if (rootState.isPanning) {
      rootState.update({ isPanning: false })
      el.update({ cursor: rootState.isSpacePressed ? 'grab' : '' })
    }

    if (rootState.isDraggingNode) {
      rootState.update({ isDraggingNode: false, draggingNodeId: null, dragOffset: { x: 0, y: 0 } })
    }

    if (rootState.isDraggingWire) {
      rootState.update({ isDraggingWire: false, draftWire: null })
    }
  },

  onMouseleave: (e, el, s) => {
    const rootState = s.root || s
    rootState.update({ isPanning: false, isDraggingNode: false, isDraggingWire: false })
    el.node.style.cursor = ''
  },

  onDragover: (e) => e.preventDefault(),

  onDrop: (e, el, s) => {
    console.log('ON DROP CALLED', e.dataTransfer.getData('nodeType'))
    e.preventDefault()
    const nodeType = e.dataTransfer.getData('nodeType')
    if (!nodeType) return

    const rect = el.node.getBoundingClientRect()
    const rootState = s.root || s
    const t = rootState.transform || { x: 0, y: 0, scale: 1 }
    const canvasX = (e.clientX - rect.left - t.x) / t.scale
    const canvasY = (e.clientY - rect.top - t.y) / t.scale

    el.call('addNode', nodeType, canvasX, canvasY)
  },
}
