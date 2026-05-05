// EditorPage — Root page for the Visual Node-Based Automation Editor
// Manages the full application layout: toolbar + body (sidebar + canvas)
export const EditorPage = {
  extends: 'Page',
  flow: 'y',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  theme: 'document',
  position: 'relative',

  onKeydown: (e, el, s) => {
    const rootState = el.call('getRootState')
    if (e.key === ' ' && e.target === document.body) {
      e.preventDefault()
      rootState.update({ isSpacePressed: true })
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && e.target === document.body) {
      el.call('deleteSelection')
    }
  },

  onKeyup: (e, el, s) => {
    if (e.key === ' ') {
      const rootState = el.call('getRootState')
      rootState.update({ isSpacePressed: false, isPanning: false })
    }
  },

  TopToolbar: {},

  EditorBody: {
    flow: 'x',
    flex: '1',
    overflow: 'hidden',
    minHeight: '0',

    NodeSidebar: {},

    CanvasViewport: {},
  },

  // Hidden file input for JSON import — triggered programmatically
  HiddenFileInput: {
    tag: 'input',
    type: 'file',
    accept: '.json,application/json',
    position: 'absolute',
    opacity: '0',
    pointerEvents: 'none',
    width: '0',
    height: '0',
    overflow: 'hidden',
    ariaHidden: 'true',
    tabindex: '-1',

    onChange: (e, el, s) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      el.call('loadWorkspace', file)
      // Reset input so same file can be re-selected
      el.update({ value: '' })
    },
  },

  // Error/success toast overlay (absolutely positioned over everything)
  ErrorToast: {},
}
