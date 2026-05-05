export const TopToolbar = {
  tag: 'header',
  position: 'sticky',
  top: '0',
  width: '100%',
  zIndex: '200',
  flow: 'x',
  align: 'center space-between',
  padding: 'Z B',
  theme: 'toolbar',
  boxShadow: '0 1px 0 rgba(0,0,0,0.15)',

  ToolbarBrand: {
    flow: 'x',
    align: 'center',
    gap: 'Z',

    Icon: {
      icon: 'node',
      width: 'A1',
      height: 'A1',
      color: 'blue'
    },

    BrandText: {
      flow: 'y',
      gap: '0',

      BrandTitle: {
        text: 'AutomationEditor',
        fontSize: 'Z2',
        fontWeight: '700',
        color: 'title',
        letterSpacing: '-0.3px',
      },

      BrandSub: {
        text: '{{ visualWorkflowBuilder | polyglot }}',
        fontSize: 'Y',
        color: 'caption',
        fontWeight: '400',
      },
    },
  },

  ToolbarCenter: {
    flow: 'x',
    align: 'center',
    gap: 'Y',
    fontSize: 'Y',
    color: 'caption',

    HintText: {
      text: '{{ middleclickToPanScrollToZoomDeleteToRemo | polyglot }}',
      fontSize: 'A',
      color: 'title',
    },
  },

  ToolbarActions: {
    flow: 'x',
    align: 'center',
    gap: 'Z',

    Button: {
      tag: 'button',
      theme: 'primary',
      flow: 'x',
      align: 'center',
      gap: 'Y',
      padding: 'Y Z2',
      fontSize: 'Y',
      fontWeight: '600',
      cursor: 'pointer',
      borderRadius: 'Y',
      border: 'none',
      ariaLabel: 'Save workspace as JSON',

      SaveIcon: {
        extends: 'Icon',
        icon: 'save',
        width: 'Z2',
        height: 'Z2',
      },

      SaveLabel: { text: 'Save' },
      onClick: (e, el, s) => el.call('saveWorkspace')
    },

    LoadBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center',
      gap: 'Y',
      padding: 'Y Z2',
      fontSize: 'Y',
      fontWeight: '600',
      cursor: 'pointer',
      borderRadius: 'Y',
      border: '1px solid',
      theme: 'bordered',
      color: 'title',
      ariaLabel: 'Load workspace from JSON file',

      Icon: {
        icon: 'upload',
        width: 'Z2',
        height: 'Z2'
      },
      LoadLabel: { text: 'Load' },

      onClick: (e, el) => {
        let root = el
        while(root && root.parent) root = root.parent;
        const fileInput = root.lookdown ? root.lookdown('HiddenFileInput') : null;
        if (fileInput) fileInput.node.click()
      },
    },

    DividerLine: {
      width: '1px',
      height: 'A1',
      background: 'line',
      opacity: '.5',
    },

    ClearBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center',
      gap: 'Y',
      padding: 'Y Z2',
      fontSize: 'Y',
      fontWeight: '600',
      cursor: 'pointer',
      borderRadius: 'Y',
      border: '1px solid',
      theme: 'bordered',
      color: 'caption',
      ariaLabel: 'Clear canvas',

      Icon: {
        icon: 'trash',
        width: 'Z2',
        height: 'Z2'
      },
      ClearLabel: { text: 'Clear' },

      onClick: (e, el, s) => {
        const root = s.root || s
        root.update({
          nodes: [],
          connections: [],
          activeSelection: null,
          transform: { x: 0, y: 0, scale: 1 },
        })
      },
    },

    FitBtn: {
      tag: 'button',
      padding: 'Y',
      cursor: 'pointer',
      borderRadius: 'Y',
      border: '1px solid',
      theme: 'bordered',
      color: 'caption',
      ariaLabel: 'Fit view to content',
      title: 'Fit view',

      Icon: {
        icon: 'fitView',
        width: 'Z2',
        height: 'Z2'
      },

      onClick: (e, el, s) => {
        const root = s.root || s
        root.update({ transform: { x: 40, y: 40, scale: 1 } })
      },
    },
  },
}
