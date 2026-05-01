export default {
  // GraphState — persisted to JSON on save, hydrated on load
  nodes: [
    {
      id: 'node_1',
      type: 'action_navigate',
      label: 'Navigate To URL',
      x: 120,
      y: 100,
      inputs: [],
      outputs: [
        { id: 'out_1', type: 'output', label: 'Next', relativeX: 320, relativeY: 55 }
      ],
      configuration: { url: 'https://example.com' }
    },
    {
      id: 'node_2',
      type: 'action_click',
      label: 'Click Element',
      x: 420,
      y: 100,
      inputs: [
        { id: 'in_1', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 55 }
      ],
      outputs: [
        { id: 'out_2', type: 'output', label: 'Next', relativeX: 320, relativeY: 55 }
      ],
      configuration: { selector: '#submit-btn' }
    },
    {
      id: 'node_3',
      type: 'assert_text',
      label: 'Assert Text',
      x: 720,
      y: 100,
      inputs: [
        { id: 'in_2', type: 'input', label: 'Trigger', relativeX: 0, relativeY: 55 }
      ],
      outputs: [],
      configuration: { selector: '.result', expected: 'Success' }
    }
  ],

  connections: [
    {
      id: 'conn_1',
      sourceNodeId: 'node_1',
      sourceSocketId: 'out_1',
      targetNodeId: 'node_2',
      targetSocketId: 'in_1'
    },
    {
      id: 'conn_2',
      sourceNodeId: 'node_2',
      sourceSocketId: 'out_2',
      targetNodeId: 'node_3',
      targetSocketId: 'in_2'
    }
  ],

  transform: { x: 40, y: 40, scale: 1 },

  // Runtime UI state — NOT persisted to JSON
  activeSelection: null,
  isDraggingNode: false,
  draggingNodeId: null,
  dragOffset: { x: 0, y: 0 },
  isDraggingWire: false,
  draftWire: null,
  isPanning: false,
  panStart: { x: 0, y: 0 },
  toastVisible: false,
  toastMessage: '',
  toastType: 'error',
  showClearConfirm: false,
}
