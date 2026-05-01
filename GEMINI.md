# Project Overview

**AutomationEditor** is a frontend web application built using the [Symbols.app](https://symbols.app/) design system framework and [DOMQL](https://github.com/domql/domql). It functions as a visual node-based automation editor, allowing users to drag, drop, configure, and connect various nodes (representing actions, assertions, and logic) on an infinite canvas to create automation workflows.

## Key Technologies
- **Framework:** Symbols.app (DOMQL v3)
- **CLI/Build Tool:** `@symbo.ls/cli` (`smbls`)
- **Language:** JavaScript
- **State Management:** DOMQL built-in state (accessed via `el.getState()`, `s` in callbacks)

## Architecture
The application is structured around the `symbols/` directory, conforming to standard Symbols project conventions:
- **`symbols.json`:** Defines the project configuration (`AutomationEditor`).
- **`symbols/pages/`:** Contains top-level route views (e.g., `EditorPage.js` acting as the root workspace).
- **`symbols/components/`:** Reusable UI elements structured as DOMQL objects (e.g., `AutomationNode.js`, `CanvasViewport.js`).
- **`symbols/functions/`:** Encapsulated business logic and actions (e.g., loading/saving workspace, calculating wire paths).
- **`symbols/designSystem/`:** Configuration for theme, tokens, colors, typography, spacing, etc.

The editor manages complex state for dragged nodes, active selections, zoom/pan transforms on the canvas, and wire connections between node sockets.

## Building and Running

The project relies on `npm` (or `bun`) and the `smbls` CLI. Key commands are defined in `package.json`:

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Start development server:**
    ```bash
    npm start
    # internally runs: bunx smbls start
    ```
*   **Build for production:**
    ```bash
    npm run build
    # internally runs: bunx smbls build
    ```
*   **Deploy:**
    ```bash
    npm run deploy
    ```
*   **Symbols AI Assistant:**
    ```bash
    npx smbls ask "your question here"
    ```

## Development Conventions

- **DOMQL Component Syntax:** UI components are written as plain JavaScript objects defining structure, styling properties (e.g., `flow`, `padding`, `theme`), and behavior. They do not use HTML or JSX.
- **Styling:** Uses Symbols Design System tokens directly as object properties (e.g., `width: 'G'`, `theme: 'nodeSelected'`).
- **State Handling:** Callbacks (like `onClick`, `onMousedown`) receive `(event, element, state)` arguments. State updates trigger reactive UI renders via `state.update({...})`.
- **Shared Libraries:** The project utilizes Symbols Shared Libraries (e.g., `system/default`), which are fetched into `.symbols_local/` and merged at build/runtime. Manually editing `sharedLibraries.js` is discouraged.
- **State Updates:** Prioritize updating the root state for global changes (e.g., `el.getState().root.update({...})`).

---

# Project Instructions (from CLAUDE.md)

## Symbols MCP

Always use `symbols-mcp` tools (e.g. `search_symbols_docs`, `get_sdk_reference`, `get_project_rules`, `audit_component`, etc.) when working on this project. Before writing or modifying any component, consult Symbols documentation and framework rules to ensure compliance with the Symbols.app design-system framework and DOMQL v3 syntax.

## Critical Rules

- Components are plain objects, never functions
- No imports between project files — reference by PascalCase key name
- `extends` and `childExtends` must be quoted strings
- Design system keys are ALWAYS lowercase (color, theme, typography — never UPPERCASE)
- ALL values must use design system tokens — no raw px, no hex colors
- Use `el.router(path, el.getRoot())` for navigation — never `window.location`
- Use `extends: 'Link'` with `href` as prop — never `attr: { href }`
- No `document.querySelector` or raw DOM methods — use DOMQL element tree
- Use `children` + `childExtends` — never `$collection`
- Define each color once, use shading modifiers (`'blue.7'`, `'gray+50'`) — no Tailwind-style palettes
- Never chain CSS selectors (`'@dark :hover'`) — use nesting (`'@dark': { ':hover': {} }`)
- `cases.js` belongs at root level, NOT inside `designSystem/`

---

# Shared Libraries (from NEW_LEARNINGS.md)

## Key Format: `owner/key`

All shared library identifiers use the `owner/key` format. The default owner is `system`.

| Input | Normalized |
|---|---|
| `system/default` | `system/default` |
| `default` | `system/default` |
| `default.symbo.ls` | `system/default` (deprecated) |
| `myorg/mylib` | `myorg/mylib` |

The `.symbo.ls` suffix is deprecated and stripped automatically for backwards compatibility.

## Configuration

In `symbols.json`:
```json
{
  "sharedLibraries": ["system/default"]
}
```

Supported config formats:
- Array of strings: `["system/default", "system/landing"]`
- Object with versions: `{ "system/default": "1.0.0" }`
- Object with config: `{ "system/default": { "version": "1.0.0", "destDir": "./custom" } }`

All formats normalize keys to `owner/key`.

## File Structure

After `smbls fetch`, shared libraries are scaffolded to:
```
.symbols_local/libs/
  system--default/        # directory name = owner--key (double dash separator)
    context.js
    components/
    designSystem/
    ...
```

The `owner--key` directory convention matches mermaid hosting URLs (`key--owner.preview.symbols.app`).

The CLI auto-generates `symbols/sharedLibraries.js`:
```js
import systemDefault from '../.symbols_local/libs/system--default/context.js'

export default [systemDefault]
```

This file should not be edited manually — it is overwritten on every fetch/sync.

## CLI Commands

```bash
smbls project libs available          # List all available libraries (shows owner/key)
smbls project libs list               # List libraries linked to current project
smbls project libs add system/default # Add by owner/key
smbls project libs add default        # Bare key -> system/default
smbls project libs remove default     # Remove library
```

## Project Creation

```bash
smbls create my-app                           # Default: adds system/default + fetches
smbls create my-app --blank-shared-libraries  # Blank: no shared libraries, skips fetch
```

When creating with default libraries:
1. Project is created on the platform
2. `system/default` library is attached via API
3. Local files are scaffolded
4. `smbls fetch` runs to pull library data into `.symbols_local/libs/`

## Runtime String Resolution (CDN Mode)

For CDN/browser mode where there's no build step, `sharedLibraries.js` can export strings instead of imported objects:

```js
export default ['system/default']
```

The runtime detects string entries and fetches library data on the fly from KV store (default) with API fallback. This is **not recommended** for production — use `smbls fetch` to scaffold locally when possible.

Fetch strategy (configurable):
- **KV** (default): `GET https://smbls-kv.nika-980.workers.dev/kv/{owner/key}`
- **API** (fallback): resolves library ID from available list, then fetches full data

Mixed arrays work — objects pass through, strings get fetched:
```js
export default [{ components: { Custom: {} } }, 'system/default']
```

## Production Build Pre-Merge

`smbls build` / `smbls brender` pre-merges shared libraries at build time:
1. Loads `sharedLibraries.js` (resolves any string references)
2. Merges all library data into the main context (components, designSystem, etc.)
3. Production output has **zero runtime fetching and zero runtime merging**

Dev mode keeps current behavior — runtime merge on the fly via `prepareSharedLibs`.

## Shared Logic in smbls-utils

`@symbo.ls/utils` (`smbls-utils/src/sharedLibraries.js`) exports:
- `normalizeLibraryKey(raw)` — key normalization (same logic as CLI)
- `deepDefaults(target, source)` — non-destructive recursive merge
- `mergeSharedLibraries(context, libraries)` — merge library data into context
- `fetchLibraryData(identifier, opts)` — fetch from KV/API
- `resolveSharedLibraries(libraries, opts)` — resolve mixed string/object arrays

Used by both the runtime (`smbls/src/prepare.js`, `smbls/src/createDomql.js`) and build tools (`brender/load.js`).

## Central CLI Utility

`helpers/libraryKeyUtils.js` exports `normalizeLibraryKey(raw)` which returns `{ owner, key, full }`. Used across:
- `symbolsConfig.js` — config normalization
- `fs.js` — directory naming and config matching
- `fetch.js` — version lock keys
- `libs/shared.js` — library resolution
- `libs/list.js`, `libs/available.js` — display formatting
- `validate-domql-runner.js` — origin labels
- `project/commands/create.js` — library lookup
