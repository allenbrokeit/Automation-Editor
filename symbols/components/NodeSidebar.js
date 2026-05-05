export const NodePaletteItem = {
  flow: 'x',
  align: 'center',
  gap: 'Z',
  padding: 'Z A',
  borderRadius: 'Y',
  cursor: 'grab',
  userSelect: 'none',
  transition: 'all 0.15s ease',
  theme: 'paletteItem',
  draggable: 'true',

  ariaLabel: (el, s) => `Add ${s.label || 'node'} to canvas`,
  ariaRole: 'button',
  tabindex: '0',

  PaletteIconWrap: {
    width: 'A1',
    height: 'A1',
    borderRadius: 'Y',
    align: 'center center',
    flexShrink: '0',
    background: (el, s) => (s.color || '#0474f2') + '22',

    Icon: {
      icon: (el, s) => s.icon || 'node',
      width: 'Z2',
      height: 'Z2',
      color: (el, s) => s.color || 'blue'
    },
  },

  PaletteLabel: {
    text: (el, s) => s.label || 'Node',
    fontSize: 'Y',
    fontWeight: '600',
    color: 'title',
    flex: '1',
  },

  Icon: {
    icon: 'drag',
    width: 'Z1',
    height: 'Z1',
    color: 'disabled',
    opacity: '0',
    transition: 'opacity 0.15s ease'
  },

  ':hover': {
    '.PaletteDragHint': { opacity: '1' },
  },

  onDragstart: (e, el, s) => {
    e.dataTransfer.setData('nodeType', s.type || 'action_click')
    e.dataTransfer.effectAllowed = 'copy'
  },

  onKeydown: (e, el, s) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      el.call('addNode', s.type || 'action_click', 200, 200)
    }
  },

  onClick: (e, el, s) => {
    el.call('addNode', s.type || 'action_click', 200, 200)
  },
}

export const NodeSidebar = {
  tag: 'aside',
  flow: 'y',
  width: 'F1',
  flexShrink: '0',
  height: '100%',
  overflowY: 'auto',
  theme: 'sidebar',
  ariaLabel: 'Node palette',

  SidebarHead: {
    flow: 'x',
    align: 'center space-between',
    padding: 'Z A',
    borderBottom: '1px solid',
    borderColor: 'line',

    SidebarTitle: {
      text: 'Nodes',
      fontSize: 'Z',
      fontWeight: '700',
      color: 'title',
    },

    SidebarCount: {
      text: (el, s) => {
        const root = el.call('getRootState')
        const _tickle = root.nodes
        return (root.nodes || []).length + ' on canvas'
      },
      fontSize: 'Y',
      color: 'caption',
    },
  },

  SidebarBody: {
    flow: 'y',
    padding: 'Z',
    gap: 'Y',

    ActionsLabel: {
      text: 'ACTIONS',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'disabled',
      letterSpacing: 'V',
      padding: 'Y 0 X',
    },

    NodePaletteItem: {
      state: { type: 'action_navigate', label: 'Navigate', icon: 'navigate', color: 'blue', group: 'Actions' }
    },
    NodePaletteItem_1: { extends: 'NodePaletteItem', state: { type: 'action_click', label: 'Click', icon: 'click', color: 'blue', group: 'Actions' } },
    NodePaletteItem_2: { extends: 'NodePaletteItem', state: { type: 'action_type', label: 'Type Text', icon: 'type', color: 'blue', group: 'Actions' } },
    NodePaletteItem_3: { extends: 'NodePaletteItem', state: { type: 'action_scroll', label: 'Scroll', icon: 'scroll', color: 'blue', group: 'Actions' } },
    NodePaletteItem_4: { extends: 'NodePaletteItem', state: { type: 'action_wait', label: 'Wait', icon: 'wait', color: 'orange', group: 'Actions' } },
    NodePaletteItem_5: { extends: 'NodePaletteItem', state: { type: 'action_screenshot', label: 'Screenshot', icon: 'screenshot', color: 'phosphorus', group: 'Actions' } },

    AssertionsLabel: {
      text: 'ASSERTIONS',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'disabled',
      letterSpacing: 'V',
      padding: 'A 0 X',
      borderTop: '1px solid',
      borderColor: 'line',
      marginTop: 'X',
    },

    NodePaletteItem_6: { extends: 'NodePaletteItem', state: { type: 'assert_text', label: 'Assert Text', icon: 'assert', color: 'phosphorus', group: 'Assertions' } },

    LogicLabel: {
      text: 'LOGIC',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'disabled',
      letterSpacing: 'V',
      padding: 'A 0 X',
      borderTop: '1px solid',
      borderColor: 'line',
      marginTop: 'X',
    },

    NodePaletteItem_7: { extends: 'NodePaletteItem', state: { type: 'logic_condition', label: 'Condition', icon: 'condition', color: 'orange', group: 'Logic' } },
    NodePaletteItem_8: { extends: 'NodePaletteItem', state: { type: 'logic_loop', label: 'Loop', icon: 'loop', color: 'orange', group: 'Logic' } },
  },

  SidebarFooter: {
    padding: 'Z A',
    borderTop: '1px solid',
    borderColor: 'line',
    marginTop: 'auto',

    FooterTip: {
      text: '{{ dragNodesOntoTheCanvasToBuildYourWorkflo | polyglot }}',
      fontSize: 'Y',
      color: 'disabled',
      lineHeight: '1.5',
    },
  },
}
