# SOP — figma-mcp-go

**Standard Operating Procedure**
Using figma-mcp-go for Designer–Developer Collaboration

[https://github.com/vkhanhqui/figma-mcp-go](https://github.com/vkhanhqui/figma-mcp-go) (this link for setup)

## 1. Purpose

This SOP defines how designers and developers use figma-mcp-go, a free open-source Figma MCP (Model Context Protocol) server, to extract live design data (structure, styles, variables, components, and screenshots) directly from Figma into AI coding tools such as Claude or Cursor — without using Figma's rate-limited REST API.

## 2. Scope

Applies to any project where:

- A designer maintains the source-of-truth file in Figma.
- A developer uses an AI coding assistant (Claude, Cursor, GitHub Copilot, or any MCP-compatible tool) to translate design into code.
- The team wants to avoid Figma API rate limits on free or low-tier plans.

## 3. Prerequisites

- Figma Desktop app installed (the plugin only runs in Figma Desktop, not the browser).
- Node.js installed, since the MCP server runs via npx.
- An MCP-compatible AI tool installed (Claude, Cursor, VS Code + Copilot, etc.).
- No Figma API token is required.

## 4. One-Time Setup

### 4.1 Developer: configure the MCP client

Add a server entry pointing to the npm package. For Claude or other generic MCP tools, create or edit `.mcp.json` in the project root:

![MCP config example](images/image1.png)

![MCP config example continued](images/image2.png)

For Cursor / VS Code / GitHub Copilot, use the same structure under `.vscode/mcp.json` with `"type": "stdio"` added.

([https://github.com/vkhanhqui/figma-mcp-go](https://github.com/vkhanhqui/figma-mcp-go) — full setup is in this link)

No build step is required — npx downloads and runs the server on demand.

### 4.2 Designer: install the Figma plugin

1. Open Figma Desktop and the relevant file.
2. Go to **Plugins → Development → Import plugin from manifest**.

![Import plugin from manifest](images/image5.png)

![Plugin import dialog](images/image10.png)

3. Select `manifest.json` from the `plugin.zip` in the project's GitHub Releases page.
4. Run the plugin from inside the file. It must stay running for the MCP server to read the file.
5. Designers can also use the Claude Code CLI to interact with this plugin.

![Plugin running in Figma](images/image14.png)

![Plugin running in Figma, detail](images/image15.png)

If your CLI is not connected with the Figma file, the MCP server will show as disconnected.

Once the CLI and Figma file are connected, the MCP server will show as connected.

![MCP server connected status](images/image16.png)

## 5. Standard Working Procedure

### 5.1 Designer side

- Keep the target Figma file open with the plugin running for the duration of the session.
- Organize layers, name components, and define variables/styles clearly — this is what the developer's AI tool will read back.
- Share the page name or specific node names/IDs the developer should pull, rather than the whole file, to keep context small.

### 5.2 Developer side

- Confirm the MCP connection is active before issuing requests (the AI tool should list figma-mcp-go among available tools).
- Start broad, then narrow: call `get_metadata` first to confirm the right file/page, then `get_design_context` or `get_node` for the specific frame.
- Use `get_styles` and `get_variable_defs` to pull design tokens before hand-coding colors, spacing, or type styles.
- Use `get_screenshot` or `save_screenshots` for visual reference rather than describing layout from memory.
- For large files, prefer `get_design_context` (depth-limited) over `get_document` (full tree) to avoid excessive token usage.

## 6. Available Tools Reference

The screenshots below are actual outputs captured while using figma-mcp-go on a real project file, showing what each tool returns and how to read it.

### 6.1 `get_metadata`

![get_metadata output](images/image17.png)

*Returns file name, current page, page count, and the list of all pages with IDs.*

### 6.2 `get_pages` (vs. `get_metadata`)

![get_pages output](images/image18.png)

*Returns just the page list and current page ID. Use `get_pages` for simple page navigation; use `get_metadata` when you also need the file name and page count.*

### 6.3 `get_selection` — full output

![get_selection output](images/image19.png)

*Returns id, name, type, bounds, styles (fills, `cornerRadius`, padding), and the full children tree of whatever is selected in Figma.*

![get_selection size comparison](images/image20.png)

*`get_selection` returns exactly what is selected: select one small component for a small, manageable output, or a full screen for a much larger one.*

![Figma component used for example](images/image21.png)

*The actual Figma component ("Monthly Gross Payments" stat card) that produced the `get_selection` output above — shown here for reference.*

### 6.4 `get_node`

![get_node output](images/image22.png)

*`get_node` on a small stat card (node `47:6459`) — returns full detail of that one node and all its children recursively: id, name, type, bounds, styles (fills, `cornerRadius`, padding), and every child with its own full text and style properties.*

![get_node output continued](images/image23.png)

*Continued output, plus what this command returns: full detail of one specific node and all children, with every style property included.*

> **Key rule — node ID format:** use colons like `"47:6459"` (correct), not hyphens like `"47-6459"` (wrong — this is the format Figma URLs use, so convert hyphens to colons before passing an ID to any command).

Use `get_node` when you know the exact ID and need full detail; use `get_design_context` to explore without knowing IDs; use `get_nodes_info` when you need full detail on 2–5 nodes at once.

### 6.5 `get_nodes_info`

![get_nodes_info output](images/image24.png)

*`get_nodes_info` with 3 node IDs fetched in one call — returns an array with one entry per node, each formatted exactly like a `get_node` result, but all retrieved in a single round-trip instead of three separate calls.*

![get_node vs get_nodes_info comparison](images/image25.png)

*`get_node` vs `get_nodes_info`: `get_node` takes one ID and returns one object per call; `get_nodes_info` takes an array of IDs and returns an array of objects in one round-trip. Always prefer `get_nodes_info` over calling `get_node` multiple times — it's faster and saves round trips. Best for 2–5 nodes at once.*

### 6.6 `get_design_context` (recommended starting point)

![get_design_context output](images/image26.png)

*Scoped to the current selection, depth 2, compact detail. Returns `fileName`, `currentPage`, `selectionCount`, a `globalVars` block, and a context tree. Notice styles use short references like `"s1"` instead of repeating the same color value on every node.*

![get_design_context parameters and size comparison](images/image27.png)

*3 parameters you can control: `depth` (how many levels deep, default 2), `detail` (minimal / compact / full), and `dedupe_components` (collapses repeated instances to save tokens). `globalVars` stores a repeated value once and lets nodes reference it, keeping output small.*

> **Comparison:** `get_document` can return 40MB+ and should almost never be used; `get_node` returns ~4MB+ for one specific node; `get_design_context` returns just 5–20KB and should be the default starting command.

### 6.7 `scan_text_nodes`

![scan_text_nodes output](images/image28.png)

*Found 71 text nodes in the Dashboard frame in this example. Returns count plus a `textNodes` array, where each entry has id, characters (the actual text), `fontSize`, and `fontName` (family + style). Real-world uses: content audits, i18n/translation, finding hardcoded text that should be dynamic, and checking font consistency across nodes. It's a shorthand for `scan_nodes_by_types` with `types: ["TEXT"]`, but much faster to type.*

### 6.8 `scan_nodes_by_types`

![scan_nodes_by_types output](images/image29.png)

*Searching for INSTANCE, COMPONENT, VECTOR, and RECTANGLE found 46 matching nodes — breakdown: 42 vectors (icons/arrows/logo paths), 5 rectangles (image placeholders, decorative shapes), 2 instances (search bar, notifications bell), 0 raw components. This command finds any node type you specify (not just TEXT) and takes both a `nodeId` and a `types[]` array. Pass multiple types in one array to get all matching nodes from the entire subtree in a single call.*

Available types include: `FRAME`, `COMPONENT`, `INSTANCE`, `TEXT`, `RECTANGLE`, `ELLIPSE`, `VECTOR`, `GROUP`, `LINE`, `POLYGON`, `STAR`, `BOOLEAN_OPERATION`, `SECTION`, `SLICE`, `CONNECTOR`.

### 6.9 Font / typography audit

![Font audit output](images/image30.png)

*Lists every font family + style combination used on the page, sorted by how many nodes use it. Useful for a quick typography check before coding, with no node ID required.*

### 6.10 `get_styles`

![get_styles output](images/image31.png)

*Returns all effect styles (shadows), paint/color styles, grid styles, and text styles defined in the file, with counts for each category.*

### 6.11 `get_variable_defs`

![get_variable_defs output](images/image32.png)

*Returns every variable collection (color, spacing, radius, components, brand tokens, etc.) along with how many variables are in each.*

![Token collection breakdown](images/image33.png)

*Key insight from the same file — a breakdown of what each major token collection is for. Large outputs (70+ KB) are normal for a full design token system; use the `export_tokens` command to get tokens in W3C / Style Dictionary format for direct use in code.*

### 6.12 Handling errors — `get_local_components` example

![get_local_components error](images/image34.png)

*Example error from `get_local_components`: a broken Component Set in the Figma file (mismatched variant names, missing values, or corrupted structure) causes the command to fail. **Fix:** open the Assets panel, find the component with the warning icon, correct the variant property names so they're consistent across all variants, then re-run `get_local_components`.*

![get_local_components success output](images/image35.png)

*When `get_local_components` works correctly, it returns this instead: id (node ID), name (e.g. `Button/Primary`), type (`COMPONENT` or `COMPONENT_SET`), description (dev notes added in Figma), and variants (all variant properties and their values).*

### 6.13 `get_annotations`

![get_annotations empty output](images/image36.png)

*Returns an empty `annotatedNodes` array when no Dev Mode annotations exist on the page. Can be called without a `nodeId` to scan the entire page, or with a `nodeId` to scope it to one frame and its children.*

![get_annotations with data](images/image37.png)

*When annotations do exist, each annotation includes a label (the note text), `measurementType`, and an `annotationId`. `annotatedNodes` lists every node with a Dev Mode annotation, `nodeId` says which node it belongs to, and `measurementType` is `SPACING`, `DIMENSION`, `COLOR`, or `NONE`. Designers add these notes in Figma Dev Mode; an empty result is normal if no annotations have been added yet.*

### 6.14 `get_screenshot`

![get_screenshot output](images/image38.png)

*Returns an exports array with `nodeId`, `nodeName`, format, width, height, and the image as a base64 string (shown here decoded as the actual "Monthly Gross Payments" card). Parameters: `nodeIds` (defaults to current selection), `format` (default PNG), and `scale` (1, 2, 3, or 4 — default 2).*

### 6.15 `save_screenshots`

![save_screenshots output](images/image39.png)

*Exporting 3 nodes at once — total: 3, succeeded: 3, failed: 0. Each result includes `nodeId`, `nodeName`, the `outputPath` written to disk, format, width/height, `bytesWritten`, and success: true/false per item.*

![Saved screenshot files](images/image40.png)

*Result: 3 PNG files saved directly to the Downloads folder, with their sizes and dimensions.*

> **`get_screenshot` vs `save_screenshots`:** `get_screenshot` returns a large base64 string in the response (200KB+) and is best for using the image directly in code/AI; `save_screenshots` writes the file to disk with a tiny metadata-only response, and is best for simply saving files without bloating the conversation.

### 6.16 `get_document` (use with caution)

![get_document large output](images/image41.png)

*On a large file, output was 4.2 MB / over 4.2 million characters, too large to display inline so it was saved to disk instead. Only a preview of the structure is shown here — the full recursive node tree of the entire page, every node, child, style, and property, with nothing omitted.*

![Size comparison across commands](images/image42.png)

*Size comparison on the same file: `get_design_context` returned ~20KB and was easy to read, `get_node` on one frame returned 4.2MB (large), and `get_document` on the full page also returned 4.2MB and was too large to use comfortably. Avoid `get_document` on large files — always start with `get_design_context`, and only reach for `get_document` on very simple pages with just a few nodes.*

## 7. Roles and Responsibilities

| Step | Designer | Developer |
|------|----------|-----------|
| 1. Install plugin | Imports and runs the figma-mcp-go plugin inside the working file | Not required — handled once per file by the designer |
| 2. Configure MCP client | Not required, unless also using an AI tool directly | Adds the server entry to `.mcp.json` / `.vscode/mcp.json` |
| 3. Keep Figma open | Leaves the file and plugin running during a session | Confirms connection before running any MCP tool calls |
| 4. Request data | Shares file link, page name, or node names with developer | Calls `get_metadata`, `get_document`, or `get_node` to pull structure |
| 5. Review output | Confirms exported styles, tokens, and screenshots match design intent | Maps returned styles/variables to code, flags mismatches |

## 8. Troubleshooting

- **AI tool can't see the server** — restart the AI tool after editing the MCP config file; config changes require a reload.
- **No data returned** — confirm the Figma plugin is actually running (it must be open and active, not just imported) and the correct file is in focus.
- **Plugin only works in Figma Desktop** — the browser version of Figma is not supported for the plugin bridge.
- **Large file timeouts** — use `get_design_context` or `scan_nodes_by_types` with a narrower node ID instead of `get_document` on the whole page.

## 9. Notes and Limitations

- This project is in early alpha (v0.0.1-alpha) — treat it as experimental, not production-critical tooling.
- All reads are local; no design data is sent to Figma's cloud API, which is also why there are no rate limits.
- It is read-only: there are no tools to edit or write back to the Figma file.
