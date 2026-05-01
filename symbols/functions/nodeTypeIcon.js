export const nodeTypeIcon = function (type) {
  const map = {
    action_click: 'click',
    action_type: 'type',
    action_navigate: 'navigate',
    action_scroll: 'scroll',
    action_wait: 'wait',
    action_screenshot: 'screenshot',
    assert_text: 'assert',
    logic_condition: 'condition',
    logic_loop: 'loop',
  }
  return map[type] || 'node'
}
