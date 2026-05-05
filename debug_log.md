# AI_DEBUG_CONTEXT_DUMP

[ENVIRONMENT]
STACK: DOMQL v3 (@symbo.ls/cli 3.14.1)

[KNOWN_ARCHITECTURAL_CONSTRAINTS]
1. `children` mappings based on arrays must be immutable to trigger renders. `array.push()` silently fails. Must use `root.update({ array: [...array, newObj] })`.
2. Do NOT use custom traversal functions like `el.call('getRootState')` for reactive state access inside `if`, `d`, or mapping functions. Use `s.root || s` to ensure the exact same state Proxy reference is accessed across the tree.

[TARGET_BUG_1: GHOST WIRES NOT APPEARING]
- **Symptom**: Dragging from an output socket does not show the temporary dashed bezier curve.
- **Trigger**: `onMousedown` in `NodeSocketRow.js` sets `rootState.isDraggingWire` and `rootState.draftWire`. `CanvasViewport.js` updates `draftWire.x2/y2` on `onMousemove`.
- **Location**: `symbols/components/SvgWireLayer.js` -> `DraftWireGroup`
- **Hypothesis**: `DraftWireGroup` uses an `if` condition and `DraftWirePath` uses a `d` attribute that rely on `el.call('getRootState')`. This custom traversal breaks proxy reactivity. 
- **Action**: Change `el.call('getRootState')` to `s.root || s` inside `SvgWireLayer.js`. If it still fails, the `CanvasViewport`'s `onMousemove` might need to explicitly call `mainCanvas.SvgWireLayer.update()` just like we did for node dragging.

[TARGET_BUG_2: DYNAMIC WIRING NOT APPEARING AFTER DROP]
- **Symptom**: Dropping an active wire onto an input socket succeeds in data but fails to render the new persistent wire.
- **Trigger**: `onMouseup` in `NodeSocketRow.js`
- **Location**: `symbols/components/NodeSocketRow.js`
- **Hypothesis**: The `onMouseup` function does `conns.push(newConn)` and then `rootState.update({ forceRender: Date.now() })`. As discovered during the `addNode` bug, `Array.push` does not trigger DOMQL's structural child mounter. 
- **Action**: Refactor the array mutation in `NodeSocketRow.js` to perform an immutable replacement: `rootState.update({ connections: [...conns, newConn] })`.

[FILES_TO_TOUCH]
- `symbols/components/SvgWireLayer.js`
- `symbols/components/NodeSocketRow.js`
