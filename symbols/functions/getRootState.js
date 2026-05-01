export const getRootState = function () {
  let current = this
  while (current) {
    if (current.state && current.state.nodes !== undefined) {
      return current.state
    }
    current = current.parent
  }
  return this.state || {}
}
