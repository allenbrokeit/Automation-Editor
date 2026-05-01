export default {
  document: {
    '@dark': {
      background: 'codGray',
      color: 'title',
    },
    '@light': {
      background: 'gray 1 +168',
      color: 'title',
    },
  },
  dialog: {
    '@dark': {
      background: 'gray 0.95 -68',
      color: 'title',
      backdropFilter: 'blur(3px)',
      borderColor: 'gray 0',
      outlineColor: 'blue',
    },
    '@light': {
      background: 'gray .95 +150',
      color: 'title',
      backdropFilter: 'blur(3px)',
      borderColor: 'gray 0',
      outlineColor: 'blue',
    },
  },
  'dialog-elevated': {
    '@dark': {
      color: 'title',
      background: 'gray 1 +68',
      borderColor: 'gray 0',
      outlineColor: 'blue',
    },
    '@light': {
      color: 'title',
      background: 'gray 0.95 +140',
      borderColor: 'gray 0',
      outlineColor: 'blue',
    },
  },
  field: {
    '@dark': {
      color: 'white',
      background: 'gray 0.95 -65',
      '::placeholder': {
        color: 'white 1 -78',
      },
    },
    '@light': {
      color: 'black',
      '::placeholder': {
        color: 'gray 1 -68',
      },
    },
  },
  primary: {
    '@dark': {
      background: 'blue',
      color: 'white',
    },
    '@light': {
      color: 'white',
      background: 'blue',
    },
  },
  warning: {
    '@dark': {
      background: 'red',
      color: 'white',
    },
    '@light': {
      color: 'white',
      background: 'red',
    },
  },
  success: {
    '@dark': {
      background: 'green',
      color: 'white',
    },
    '@light': {
      background: 'green',
      color: 'white',
    },
  },
  none: {
    color: 'none',
    background: 'none',
  },
  transparent: {
    color: 'currentColor',
    background: 'transparent',
  },
  bordered: {
    background: 'transparent',
    '@dark': { border: '1px solid #4e4e50' },
    '@light': { border: '1px solid #a3cdfd' },
  },

  // Editor-specific themes
  canvas: {
    background: 'canvasBg',
    color: 'title',
  },
  toolbar: {
    background: 'toolbarBg',
    color: 'title',
    borderBottom: '1px solid #1e1e32',
  },
  sidebar: {
    background: 'sidebarBg',
    color: 'title',
    borderRight: '1px solid #1e1e32',
  },
  node: {
    background: 'nodeBg',
    color: 'title',
    border: '1px solid #2a2a4a',
  },
  nodeHeader: {
    background: 'nodeHeaderBg',
    color: 'title',
  },
  nodeSelected: {
    background: 'nodeBg',
    color: 'title',
    border: '1px solid #0474f2',
    boxShadow: '0 0 0 2px #0474f220',
  },
  paletteItem: {
    background: 'gray 0.9 -80',
    color: 'title',
    border: '1px solid #252540',
    ':hover': {
      background: 'gray 0.9 -65',
      borderColor: 'blue',
    },
  },
  toast: {
    background: '#e15c55',
    color: 'white',
  },
  'toast-success': {
    background: '#389d34',
    color: 'white',
  },
}
