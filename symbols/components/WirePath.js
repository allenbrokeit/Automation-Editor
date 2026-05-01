export const WirePath = {
  tag: 'svg',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  key: (el, s) => s.id,

  WirePathBg: {
    tag: 'path',
    namespace: 'http://www.w3.org/2000/svg',
    attr: {
      d: (el, s) => {
        const rootState = el.call('getRootState')
        const _tickle = rootState.forceRender // Establish reactivity dependency
        const coords = el.call('getWireCoords', rootState, s.sourceNodeId, s.sourceSocketId, s.targetNodeId, s.targetSocketId)
        if (!coords) return ''
        return el.call('getBezierPath', coords.x1, coords.y1, coords.x2, coords.y2)
      },
      stroke: 'rgba(0,0,0,0.3)',
      'stroke-width': '6',
      fill: 'none',
      'stroke-linecap': 'round',
    },
  },

  WirePathMain: {
    tag: 'path',
    namespace: 'http://www.w3.org/2000/svg',
    cursor: 'pointer',
    filter: (el, s) => {
      const rootState = el.call('getRootState')
      const isSelected = rootState.activeSelection &&
        rootState.activeSelection.type === 'wire' &&
        rootState.activeSelection.id === s.id
      return isSelected ? 'drop-shadow(0 0 8px #a3cdfd) drop-shadow(0 0 16px #a3cdfd)' : 'none'
    },
    attr: {
      d: (el, s) => {
        const rootState = el.call('getRootState')
        const _tickle = rootState.forceRender // Establish reactivity dependency
        const coords = el.call('getWireCoords', rootState, s.sourceNodeId, s.sourceSocketId, s.targetNodeId, s.targetSocketId)
        if (!coords) return ''
        return el.call('getBezierPath', coords.x1, coords.y1, coords.x2, coords.y2)
      },
      stroke: (el, s) => {
        const rootState = el.call('getRootState')
        const isSelected = rootState.activeSelection &&
          rootState.activeSelection.type === 'wire' &&
          rootState.activeSelection.id === s.id
        return isSelected ? '#a3cdfd' : '#0474f2'
      },
      'stroke-width': (el, s) => {
        const rootState = el.call('getRootState')
        const isSelected = rootState.activeSelection &&
          rootState.activeSelection.type === 'wire' &&
          rootState.activeSelection.id === s.id
        return isSelected ? '4' : '3'
      },
      fill: 'none',
      'stroke-linecap': 'round',
      'pointer-events': 'stroke',
    },
    onClick: (e, el, s) => {
      e.stopPropagation()
      const rootState = el.call('getRootState')
      rootState.update({ activeSelection: { type: 'wire', id: s.id } })
    },
  },
}
