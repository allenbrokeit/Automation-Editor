export const ErrorToast = {
  position: 'absolute',
  bottom: 'B',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '500',
  flow: 'x',
  align: 'center',
  gap: 'Z',
  padding: 'Z B',
  borderRadius: 'Z',
  boxShadow: '0 C Z rgba(0,0,0,0.4)',
  pointerEvents: 'all',
  cursor: 'default',
  minWidth: 'G',
  maxWidth: 'J',

  if: (el, s) => {
    const root = s.root || s
    return root.toastVisible
  },

  isError: (el, s) => {
    const root = s.root || s
    return root.toastType === 'error'
  },
  isSuccess: (el, s) => {
    const root = s.root || s
    return root.toastType === 'success'
  },

  theme: (el, s) => {
    const root = s.root || s
    return root.toastType === 'success' ? 'toast-success' : 'toast'
  },

  ToastIconWrap: {
    extends: 'Icon',
    icon: (el, s) => {
      const root = s.root || s
      return root.toastType === 'success' ? 'assert' : 'warning'
    },
    width: 'A',
    height: 'A',
    color: 'white',
    flexShrink: '0',
  },

  ToastMsg: {
    text: (el, s) => {
      const root = s.root || s
      return root.toastMessage || 'Notification'
    },
    fontSize: 'Z',
    fontWeight: '600',
    color: 'white',
    flex: '1',
  },

  ToastCloseBtn: {
    tag: 'button',
    extends: 'Icon',
    icon: 'close',
    width: 'A',
    height: 'A',
    color: 'white.7',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    ariaLabel: 'Dismiss notification',
    flexShrink: '0',

    onClick: (e, el, s) => {
      const root = s.root || s
      root.update({ toastVisible: false, toastMessage: '' })
    },
  },
}
