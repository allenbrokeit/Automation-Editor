export const AutomationNode = {
  position: 'absolute',
  flow: 'y',
  width: '320px',
  borderRadius: 'Z',
  overflow: 'hidden',
  cursor: 'grab',
  userSelect: 'none',
  boxShadow: '0 A Z rgba(0,0,0,0.3)',
  transition: 'box-shadow 0.15s ease',

  left: (el, s) => `${s.x || 0}px`,
  top: (el, s) => `${s.y || 0}px`,

  isSelected: (el, s) => {
    const root = el.call('getRootState')
    return root.activeSelection && root.activeSelection.id === s.id
  },
  '.isSelected': {
    boxShadow: (el, s) => `0 0 15px ${el.call('nodeTypeColor', s.type)}66, 0 A Z rgba(0,0,0,0.3)`,
    border: (el, s) => `1px solid ${el.call('nodeTypeColor', s.type)}`,
    cursor: 'grab',
    zIndex: '10',
  },

  theme: 'node',
  background: '#1a1a2e',
  borderTop: (el, s) => `4px solid ${el.call('nodeTypeColor', s.type)}`,

  ariaLabel: (el, s) => `Node: ${s.label || s.type}`,
  role: 'group',
  tabindex: '0',

  NodeHeaderArea: {
    flow: 'x',
    align: 'center',
    gap: 'Y',
    padding: 'Y Z2',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    flexShrink: '0',

    NodeTypeIcon: {
      extends: 'Icon',
      icon: (el, s) => el.call('nodeTypeIcon', s.type),
      width: 'Z2',
      height: 'Z2',
      color: (el, s) => el.call('nodeTypeColor', s.type),
      flexShrink: '0',
    },

    NodeTitleText: {
      flex: '1',
      text: (el, s) => s.label || s.type || 'Node',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'title',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    NodeTypeTag: {
      text: (el, s) => (s.type || '').replace('_', ' '),
      fontSize: 'Y',
      fontWeight: '500',
      color: (el, s) => el.call('nodeTypeColor', s.type),
      background: (el, s) => el.call('nodeTypeColor', s.type) + '22',
      padding: 'X Y',
      borderRadius: 'X',
    },
  },

  NodeBodyArea: {
    flow: 'x',
    gap: '0',
    align: 'stretch',

    NodeInputsCol: {
      flow: 'y',
      gap: 'Y',
      padding: 'Z Z2',
      flexShrink: '0',
      minWidth: 'max-content',
      align: 'flex-start flex-start',

      children: (el, s) => (s.inputs || []).map(sock => ({
        ...sock,
        nodeId: s.id,
      })),
      childExtends: 'SocketDot',
      childrenAs: 'state',
    },

    NodeConfigArea: {
      flex: '1',
      flow: 'y',
      gap: 'X',
      margin: 'Z 0',
      padding: 'Y',
      background: 'rgba(0,0,0,0.15)',
      borderRadius: 'Y',
      border: '1px solid rgba(255,255,255,0.03)',
      overflow: 'hidden',

      ConfigContent: {
        text: (el, s) => {
          const cfg = s.configuration || {}
          const entries = Object.entries(cfg)
          if (!entries.length) return 'No config'
          return entries.map(([k, v]) => `${k}: ${v}`).join('\n')
        },
        fontSize: 'X',
        color: 'caption',
        lineHeight: '1.4',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        display: '-webkit-box',
        WebkitLineClamp: '5',
        WebkitBoxOrient: 'vertical',
      },
    },

    NodeOutputsCol: {
      flow: 'y',
      gap: 'Y',
      padding: 'Z Z2',
      flexShrink: '0',
      minWidth: 'max-content',
      align: 'flex-start flex-end',

      children: (el, s) => (s.outputs || []).map(sock => ({
        ...sock,
        nodeId: s.id,
      })),
      childExtends: 'SocketDot',
      childrenAs: 'state',
    },
  },

  onMousedown: (e, el, s) => {
    if (e.button !== 0) return
    e.stopPropagation()

    const root = el.call('getRootState')
    if (root.isDraggingWire) return

    const transform = root.transform || { x: 0, y: 0, scale: 1 }
    const offsetX = (e.clientX - transform.x) / transform.scale - (s.x || 0)
    const offsetY = (e.clientY - transform.y) / transform.scale - (s.y || 0)

    root.update({
      activeSelection: { type: 'node', id: s.id },
      isDraggingNode: true,
      draggingNodeId: s.id,
      dragOffset: { x: offsetX, y: offsetY },
    })
  },

  onClick: (e, el, s) => {
    e.stopPropagation()
    const root = el.call('getRootState')
    root.update({ activeSelection: { type: 'node', id: s.id } })
  },
}
