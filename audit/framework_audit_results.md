---
project: AutomationEditor
audit-runs: 1
---

# Framework bugs found during audit

This file logs cases where the strict rules from RULES.md / FRAMEWORK.md / DESIGN_SYSTEM.md are correct, but applying them caused failures because of bugs in the framework itself (smbls/, plugins/). Each entry is a specific symptom + recommended-fix-attempted + why it broke + likely framework module.

## STRICTNESS GAPS
None observed yet.

---

### [FA601 / FA602] Dynamic SVG Paths flagged as Icon Violations

- **Finding ID:** rx-morfkxbm-zriwkr5q
- **Origin file (project):** `components/SvgWireLayer.js` and `components/WirePath.js`
- **Suspected framework file:** `frank-audit/src/rules/icons.js`
- **What the rule says should work:** Icons must be rendered using `Icon` from the design system, and inline `<svg>` or `<path>` tags are forbidden.
- **What actually happens when you apply the fix:** Applying the `Icon` framework breaks the application's core functionality (dynamic bezier paths tracing between canvas nodes). The `Icon` component only accepts string names from the `designSystem.icons` registry and doesn't easily support reactive paths calculating their `d` attributes dynamically via state functions.
- **Repro:**
  1. Inspect `SvgWireLayer` and `WirePath`.
  2. Notice the paths have attributes like `d: (el, s) => getBezierPath(...)`
- **Suggested framework patch:** Allow inline `svg` and `path` tags if they include dynamic functional properties mapped directly to reactive state, or introduce a specialized `Vector` / `Shape` component distinct from `Icon` that supports dynamic rendering.

---

### [Brender] SSR Document Reference Error

- **Origin file (project):** `designSystem/theme.js`
- **Suspected framework file:** `smbls/brender` or `smbls/ssr`
- **What the rule says should work:** `smbls brender` should successfully statically render the project HTML payload.
- **What actually happens when you apply the fix:** The command fails with `Brender failed: document is not defined`.
- **Hypothesis:** The project's `theme.js` uses the `document:` theme block extension (`document: { ... }`). Brender reads the theme system but attempts to hydrate/access `document` in a Node.js SSR context, throwing a reference error.
- **Suggested framework patch:** Ensure SSR safely ignores or polyfills `document` when parsing the design system's `document` block.
