export const SvgWireLayer = {
  tag: 'svg',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  pointerEvents: 'none',
  zIndex: '1',
  
  onRender: (el, s) => {
    console.error('SvgWireLayer Mounted! State keys:', Object.keys(s || {}), 'Connections length:', s?.connections?.length)
  },

  attr: {
    xmlns: 'http://www.w3.org/2000/svg',
  },

  WireGroup: {
    tag: 'g',
    namespace: 'http://www.w3.org/2000/svg',

    if: (el, s) => {
      const root = s.root || s
      return (root.connections || []).length > 0
    },

    children: (el, s) => {
      const root = s.root || s
      return root.connections || []
    },
    childExtends: 'WirePath',
    childrenAs: 'state',
  },

  DraftWireGroup: {
    tag: 'g',
    namespace: 'http://www.w3.org/2000/svg',
    if: (el, s) => {
      const root = s.root || s
      return root.isDraggingWire && root.draftWire
    },

    DraftWirePath: {
      tag: 'path',
      namespace: 'http://www.w3.org/2000/svg',
      pointerEvents: 'none',
      attr: {
        d: (el, s) => {
          const root = s.root || s
          const w = root.draftWire
          if (!w) return ''
          return el.call('getBezierPath', w.x1, w.y1, w.x2, w.y2)
        },
        stroke: '#a3cdfd',
        'stroke-width': '2',
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-dasharray': '6 4',
      },
    },
  },
}
