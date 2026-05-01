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

    PaletteNodeIcon: {
      extends: 'Icon',
      icon: (el, s) => s.icon || 'node',
      width: 'Z2',
      height: 'Z2',
      color: (el, s) => s.color || 'blue',
    },
  },

  PaletteLabel: {
    text: (el, s) => s.label || 'Node',
    fontSize: 'Y',
    fontWeight: '600',
    color: 'title',
    flex: '1',
  },

  PaletteDragHint: {
    extends: 'Icon',
    icon: 'drag',
    width: 'Z1',
    height: 'Z1',
    color: 'disabled',
    opacity: '0',
    transition: 'opacity 0.15s ease',
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
        const root = s.root || s
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
      letterSpacing: '0.8px',
      padding: 'Y 0 X',
    },

    NavNode: { extends: 'NodePaletteItem', state: { type: 'action_navigate', label: 'Navigate', icon: 'navigate', color: '#0474f2', group: 'Actions' } },
    ClickNode: { extends: 'NodePaletteItem', state: { type: 'action_click', label: 'Click', icon: 'click', color: '#0474f2', group: 'Actions' } },
    TypeNode: { extends: 'NodePaletteItem', state: { type: 'action_type', label: 'Type Text', icon: 'type', color: '#0474f2', group: 'Actions' } },
    ScrollNode: { extends: 'NodePaletteItem', state: { type: 'action_scroll', label: 'Scroll', icon: 'scroll', color: '#0474f2', group: 'Actions' } },
    WaitNode: { extends: 'NodePaletteItem', state: { type: 'action_wait', label: 'Wait', icon: 'wait', color: '#e97c16', group: 'Actions' } },
    ScreenshotNode: { extends: 'NodePaletteItem', state: { type: 'action_screenshot', label: 'Screenshot', icon: 'screenshot', color: '#4db852', group: 'Actions' } },

    AssertionsLabel: {
      text: 'ASSERTIONS',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'disabled',
      letterSpacing: '0.8px',
      padding: 'A 0 X',
      borderTop: '1px solid',
      borderColor: 'line',
      marginTop: 'X',
    },

    AssertTextNode: { extends: 'NodePaletteItem', state: { type: 'assert_text', label: 'Assert Text', icon: 'assert', color: '#4db852', group: 'Assertions' } },

    LogicLabel: {
      text: 'LOGIC',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'disabled',
      letterSpacing: '0.8px',
      padding: 'A 0 X',
      borderTop: '1px solid',
      borderColor: 'line',
      marginTop: 'X',
    },

    ConditionNode: { extends: 'NodePaletteItem', state: { type: 'logic_condition', label: 'Condition', icon: 'condition', color: '#e97c16', group: 'Logic' } },
    LoopNode: { extends: 'NodePaletteItem', state: { type: 'logic_loop', label: 'Loop', icon: 'loop', color: '#e97c16', group: 'Logic' } },
  },

  SidebarFooter: {
    padding: 'Z A',
    borderTop: '1px solid',
    borderColor: 'line',
    marginTop: 'auto',

    FooterTip: {
      text: 'Drag nodes onto the canvas to build your workflow',
      fontSize: 'Y',
      color: 'disabled',
      lineHeight: '1.5',
    },
  },
}
