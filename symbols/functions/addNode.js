export const addNode = function addNode (nodeType, x, y) {
  const root = this.state.root || this.state
  console.log('ADD NODE CALLED', nodeType, x, y, root.nodes?.length)

  const id = 'node_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)

  const nodeTemplates = {
    action_click: {
      label: 'Click Element',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [{ id: id + '_out', type: 'output', label: 'Next', relativeX: 320, relativeY: 60 }],
      configuration: { selector: '' }
    },
    action_type: {
      label: 'Type Text',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [{ id: id + '_out', type: 'output', label: 'Next', relativeX: 320, relativeY: 60 }],
      configuration: { selector: '', text: '' }
    },
    action_navigate: {
      label: 'Navigate To URL',
      inputs: [],
      outputs: [{ id: id + '_out', type: 'output', label: 'Next', relativeX: 320, relativeY: 60 }],
      configuration: { url: '' }
    },
    action_scroll: {
      label: 'Scroll Page',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [{ id: id + '_out', type: 'output', label: 'Next', relativeX: 320, relativeY: 60 }],
      configuration: { direction: 'down', amount: 300 }
    },
    action_wait: {
      label: 'Wait',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [{ id: id + '_out', type: 'output', label: 'Next', relativeX: 320, relativeY: 60 }],
      configuration: { duration: 1000 }
    },
    action_screenshot: {
      label: 'Take Screenshot',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [{ id: id + '_out', type: 'output', label: 'Done', relativeX: 320, relativeY: 60 }],
      configuration: { filename: 'screenshot' }
    },
    assert_text: {
      label: 'Assert Text',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [],
      configuration: { selector: '', expected: '' }
    },
    logic_condition: {
      label: 'If/Else Condition',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [
        { id: id + '_true', type: 'output', label: 'True', relativeX: 320, relativeY: 60 },
        { id: id + '_false', type: 'output', label: 'False', relativeX: 320, relativeY: 100 }
      ],
      configuration: { condition: '' }
    },
    logic_loop: {
      label: 'Loop',
      inputs: [{ id: id + '_in', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 60 }],
      outputs: [
        { id: id + '_body', type: 'output', label: 'Body', relativeX: 320, relativeY: 60 },
        { id: id + '_done', type: 'output', label: 'Done', relativeX: 320, relativeY: 100 }
      ],
      configuration: { times: 3 }
    }
  }

  const template = nodeTemplates[nodeType] || nodeTemplates['action_click']
  const newNode = {
    id,
    type: nodeType,
    label: template.label,
    x: x || 200,
    y: y || 200,
    inputs: template.inputs,
    outputs: template.outputs,
    configuration: template.configuration
  }

  root.update({ 
    nodes: [...(root.nodes || []), newNode],
    forceRender: Date.now() 
  })
}
