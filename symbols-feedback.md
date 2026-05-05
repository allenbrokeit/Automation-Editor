# Symbols / DOMQL Feedback Log

## Bugs Discovered in DOMQL v3 Reactivity
1. **Dynamic SVG Namespacing**: SVG child elements dynamically rendered via `children` array and `childExtends` must have explicit `namespace: 'http://www.w3.org/2000/svg'` declarations on **every** component in the chain (`tag: 'g'`, `tag: 'path'`). Without this, dynamically added paths silently fall back to HTML namespace and are invisible in the browser despite appearing in the DOM tree.
2. **`childrenAs: 'state'` Reactivity Constraints**:
   - Re-assigning an array (e.g., `nodes = [...nodes]`) in root state does not reliably trigger child component re-renders if the component does not explicitly register a dependency hook (e.g. reading `root.nodes`).
   - Using `state: 'nodes'` and `children: (el, s) => s` when the state is a raw array completely breaks child mapping. DOMQL expects the bound state to be an object (`state: { data: [] }`).
3. **Proxy Direct Mutation vs Reactivity**:
   - Mutating a DOMQL proxy (`el.state.update({x,y})`) correctly forces a localized update. However, finding that proxy dynamically using `__children` iteration is brittle and unstable when arrays resize.
4. **Array Mutation Strategies**: 
   - For frequent high-performance updates (like mouse drag), immutably replacing the array (`[...nodes]`) disconnects the DOMQL state proxies of the child components, causing them to freeze visually. To fix drag, we had to locate the exact DOMQL component instance (`nodesGroup`) and call `nodeComp.state.update({ x: newX, y: newY })` directly.
   - For structural updates (like adding/removing nodes), mutating the array in-place (`root.nodes.push`) silently fails to render the new component. We MUST immutably replace the array (`root.update({ nodes: [...nodes, newNode] })`) for DOMQL's diffing engine to mount new children.
5. **Inconsistent State Resolution (`el.call('getRootState')` vs `s.root || s`)**:
   - Custom traversal functions like `getRootState` return a different proxy reference than DOMQL's built-in `s.root || s`. Mixing these across components causes reactivity splits, where one component updates but another misses the tick.
11. **Strict Icon Rules vs Dynamic SVG Generation (FA601/FA602)**: The design system rules strictly prohibit inline `<svg>` and `<path>` tags, mandating the use of the `Icon` component. However, `Icon` does not natively support dynamically rendering reactive SVG curves (e.g., bezier paths mapped to moving nodes). This creates a direct conflict between "strict frankability" and dynamic visual web features.
12. **SSR Theme Issue**: `smbls brender` crashes with `document is not defined` if `designSystem/theme.js` uses `document: { ... }` as a key. The node environment attempts to evaluate the `document` key implicitly rather than treating it simply as a design system token definition.
13. **CLI Flag Issue**: The `@symbo.ls/cli` `project create` command errors out asking to pass `--owner <slug>` in non-interactive mode when multiple orgs exist, but simultaneously throws `error: unknown option '--owner'` when provided.

## Wrong Solutions
- ❌ `state: 'nodes'` applied to a group element expecting an array to map. *Result: Fails to map children entirely.*
- ❌ Direct proxy property mapping (`const _tickle = root.nodes`) injected inside the `children` getter function. *Result: Solved initial array propagation, but failed when deep object changes occurred without full array replacement.*
- ❌ `obj: { tag: 'path' }` syntax for dynamic SVG arrays. *Result: Namespace inheritance fails inside DOMQL object maps.*
- ❌ Relying on `window.addEventListener('keydown', ...)` or direct DOM modifications like `document.body.appendChild(...)` (Violates FA503/FA508). *Result: Components fail the strict `frank-audit` and cause memory leaks across hydration boundaries.*
- ❌ Nesting component aliases into custom semantic names like `NodeTypeIcon: { extends: 'Icon' }` (Violates FA806). *Result: Auto-extend-wrapper warnings and potential bundle duplication.*
- ❌ Immutably replacing the nodes array `[...nodes]` on every `onMousemove` frame. *Result: The DOMQL state proxy disconnects from the child components, freezing their visual position on the canvas.*
- ❌ Mutating the root array in-place `root.nodes.push(newNode)` when adding a node. *Result: DOMQL fails to detect the array length change, and the new child component is never mounted to the DOM.*

## Right Solutions
- ✅ `childExtends: 'WirePath'` for SVG element collections.
- ✅ Utilize DOMQL reactive event callbacks directly on root components (e.g., `onKeydown: (e, el, s) => { ... }`) instead of reaching for `window` events.
- ✅ Create blob URLs and download natively by just calling `.click()` on the unattached dynamically created `<a>` tag rather than relying on DOM manipulation.
- ✅ Keep component nesting names perfectly aligned with underlying types (e.g. `Button: { Icon: {} }`) to maintain strict `frankability`.
- ✅ For continuous high-frequency updates (dragging), mutate the specific child component's proxy state directly by traversing the DOMQL instance tree (`mainCanvas.NodesGroup`), finding the specific `nodeComp`, and calling `nodeComp.state.update()`.
- ✅ For structural collection changes (adding/removing), immutably replace the entire array (`root.update({ nodes: [...nodes, newNode] })`) so the DOMQL mapper detects the change and mounts/unmounts appropriately.
- ✅ Always use DOMQL's native `s.root || s` for global state access rather than custom tree-traversal functions (`getRootState`), ensuring all components share the exact same Proxy reference.