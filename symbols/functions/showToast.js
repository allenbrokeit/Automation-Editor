export const showToast = function showToast (message, type) {
  const s = this.state
  const root = s.root || s

  root.update({
    toastVisible: true,
    toastMessage: message || 'Notification',
    toastType: type || 'error'
  })

  setTimeout(() => {
    const s2 = this.state
    const root2 = s2.root || s2
    root2.update({ toastVisible: false, toastMessage: '' })
  }, 3000)
}
