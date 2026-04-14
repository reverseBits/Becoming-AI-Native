const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title = "Becoming AI Native — Team Playbook";
pres.author = "reverseBits";

// Palette: Midnight Executive + one warm accent
const NAVY = "0F1E47";
const INK = "1A2550";
const ICE = "CADCFC";
const WHITE = "FFFFFF";
const MUTED = "8A9BC7";
const ACCENT = "F4B860"; // warm amber
const GREEN = "5FD68D";
const RED = "FF6B6B";
const CODE_BG = "0A1430";

const W = 13.3, H = 7.5;

// Reusable footer
function footer(slide, page, total) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.35, w: W, h: 0.35, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText("reverseBits · Becoming AI Native", { x: 0.5, y: H - 0.33, w: 6, h: 0.3, fontSize: 9, color: MUTED, fontFace: "Calibri", margin: 0 });
  slide.addText(`${page} / ${total}`, { x: W - 1.5, y: H - 0.33, w: 1, h: 0.3, fontSize: 9, color: MUTED, align: "right", fontFace: "Calibri", margin: 0 });
}

const TOTAL = 10;

// ---------- Slide 1: Title ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Accent block top-left
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });

  // Eyebrow
  s.addText("PLAYBOOK · TEAM TRAINING", {
    x: 0.9, y: 1.6, w: 10, h: 0.4,
    fontSize: 14, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0
  });

  // Title
  s.addText("Becoming AI Native", {
    x: 0.9, y: 2.1, w: 11, h: 1.5,
    fontSize: 60, bold: true, color: WHITE, fontFace: "Georgia", margin: 0
  });

  // Subtitle
  s.addText("How we track problems, document fixes, and share learnings — in the open.", {
    x: 0.9, y: 3.8, w: 11, h: 1,
    fontSize: 22, color: ICE, fontFace: "Calibri", italic: true, margin: 0
  });

  // Meta
  s.addText([
    { text: "github.com/reverseBits/Becoming-AI-Native", options: { bold: true, color: WHITE } },
    { text: "    ·    ", options: { color: MUTED } },
    { text: "reverseBits · April 2026", options: { color: ICE } }
  ], { x: 0.9, y: 6.5, w: 11, h: 0.4, fontSize: 14, fontFace: "Calibri", margin: 0 });
}

// ---------- Slide 2: Why ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Left accent column
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });

  s.addText("WHY THIS EXISTS", { x: 0.9, y: 0.5, w: 8, h: 0.4, fontSize: 12, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("LinkedIn posts won't save us.", { x: 0.9, y: 0.95, w: 12, h: 1, fontSize: 40, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  // Two-column body
  s.addText("What's happening:", { x: 0.9, y: 2.4, w: 5.5, h: 0.4, fontSize: 16, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "People tweet cheatsheets.", options: { bullet: true, breakLine: true } },
    { text: "Reels promise magic configs.", options: { bullet: true, breakLine: true } },
    { text: "Same problems, rediscovered weekly.", options: { bullet: true, breakLine: true } },
    { text: "Nothing is tracked. Nothing compounds.", options: { bullet: true } }
  ], { x: 0.9, y: 2.85, w: 5.5, h: 3.5, fontSize: 15, color: INK, fontFace: "Calibri", paraSpaceAfter: 6 });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, { x: 7, y: 2.3, w: 5.6, h: 4.3, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7, y: 2.3, w: 0.08, h: 4.3, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("What we're doing instead:", { x: 7.3, y: 2.5, w: 5.2, h: 0.4, fontSize: 16, bold: true, color: ACCENT, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "Every problem → an Issue.", options: { bullet: true, breakLine: true } },
    { text: "Every fix → a versioned doc.", options: { bullet: true, breakLine: true } },
    { text: "Every learning → public, linkable.", options: { bullet: true, breakLine: true } },
    { text: "Community can contribute back.", options: { bullet: true } }
  ], { x: 7.3, y: 3.0, w: 5.2, h: 3.3, fontSize: 15, color: WHITE, fontFace: "Calibri", paraSpaceAfter: 8 });

  footer(s, 2, TOTAL);
}

// ---------- Slide 3: The Loop ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("THE LOOP", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 12, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("One process. Every problem.", { x: 0.5, y: 0.85, w: 12, h: 1, fontSize: 38, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  // 5 numbered cards horizontally
  const steps = [
    { n: "1", t: "Raise", d: "Open an Issue with a template. Labels. Evidence." },
    { n: "2", t: "Triage", d: "Maintainer assigns owner, sets priority, moves to Investigating." },
    { n: "3", t: "Investigate", d: "Work happens in the thread. Public evidence trail." },
    { n: "4", t: "Document", d: "PR adds a doc under /docs. No doc, not solved." },
    { n: "5", t: "Share", d: "Close issue with doc link. Post in Discussions." }
  ];

  const cardW = 2.35, cardH = 3.2, gap = 0.15;
  const startX = (W - (5 * cardW + 4 * gap)) / 2;
  const cardY = 2.6;

  steps.forEach((st, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: cardH, fill: { color: ICE }, line: { color: ICE } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: 0.1, fill: { color: ACCENT }, line: { color: ACCENT } });
    s.addText(st.n, { x: x + 0.2, y: cardY + 0.25, w: 1, h: 0.8, fontSize: 48, bold: true, color: NAVY, fontFace: "Georgia", margin: 0 });
    s.addText(st.t, { x: x + 0.2, y: cardY + 1.15, w: cardW - 0.4, h: 0.5, fontSize: 20, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
    s.addText(st.d, { x: x + 0.2, y: cardY + 1.7, w: cardW - 0.4, h: 1.4, fontSize: 12, color: INK, fontFace: "Calibri", margin: 0 });
  });

  s.addText("→  Problem hit    →    Issue    →    Investigate publicly    →    Fix    →    Doc PR    →    Close    →    Share", {
    x: 0.5, y: 6.2, w: 12.3, h: 0.5, fontSize: 13, color: MUTED, italic: true, align: "center", fontFace: "Calibri", margin: 0
  });

  footer(s, 3, TOTAL);
}

// ---------- Slide 4: Example 1 header ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });

  s.addText("WORKED EXAMPLE 1", { x: 0.9, y: 2.3, w: 10, h: 0.4, fontSize: 14, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("MCP token bloat", { x: 0.9, y: 2.8, w: 12, h: 1.5, fontSize: 60, bold: true, color: WHITE, fontFace: "Georgia", margin: 0 });
  s.addText("A heavyweight problem. Measurement, investigation, 47% token reduction.", {
    x: 0.9, y: 4.5, w: 12, h: 1, fontSize: 22, color: ICE, italic: true, fontFace: "Calibri", margin: 0
  });

  // Big stat
  s.addText("42k → 22k", { x: 0.9, y: 5.7, w: 6, h: 1, fontSize: 40, bold: true, color: ACCENT, fontFace: "Georgia", margin: 0 });
  s.addText("tokens at session start, same tooling", { x: 0.9, y: 6.55, w: 8, h: 0.4, fontSize: 13, color: MUTED, fontFace: "Calibri", margin: 0 });
}

// ---------- Slide 5: Example 1 — the issue ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("EXAMPLE 1 · STEP 1-2", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 11, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Raise it. Don't Slack it.", { x: 0.5, y: 0.85, w: 12, h: 0.9, fontSize: 36, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  // Issue card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 12.3, h: 4.6, fill: { color: CODE_BG }, line: { color: CODE_BG } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 0.08, h: 4.6, fill: { color: ACCENT }, line: { color: ACCENT } });

  s.addText("Issue #14 · [Problem] MCP tool schemas consuming 42k tokens at session start", {
    x: 0.8, y: 2.25, w: 11.8, h: 0.4, fontSize: 14, bold: true, color: ACCENT, fontFace: "Consolas", margin: 0
  });
  s.addText([
    { text: "Labels: ", options: { color: MUTED } },
    { text: "problem  mcp  cost  p1", options: { color: ICE, bold: true } }
  ], { x: 0.8, y: 2.65, w: 11.8, h: 0.35, fontSize: 11, fontFace: "Consolas", margin: 0 });

  s.addText(
`## Environment
- Model: claude-opus-4-6
- MCPs enabled: github, figma, linear, sentry, crm

## Reproduction
1. Enable all 5 MCPs
2. Send one-word message
3. Check token count → 42,800

## Impact
Blocks delivery. Cost $8 for one debug session.`,
    { x: 0.8, y: 3.15, w: 11.8, h: 3.4, fontSize: 13, color: WHITE, fontFace: "Consolas", margin: 0 }
  );

  footer(s, 5, TOTAL);
}

// ---------- Slide 6: Example 1 — evidence ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("EXAMPLE 1 · STEP 3", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 11, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Evidence lives in the thread.", { x: 0.5, y: 0.85, w: 12, h: 0.9, fontSize: 36, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  // Chart
  s.addChart(pres.charts.BAR, [{
    name: "Tokens at session start",
    labels: ["github", "figma", "linear", "sentry", "crm", "baseline"],
    values: [11200, 9800, 6400, 4100, 8600, 2100]
  }], {
    x: 0.5, y: 2.2, w: 7.5, h: 4.4,
    barDir: "col",
    chartColors: [NAVY, NAVY, NAVY, NAVY, NAVY, MUTED],
    chartColorsOpacity: 90,
    chartArea: { fill: { color: WHITE }, roundedCorners: false },
    catAxisLabelColor: "64748B", catAxisLabelFontSize: 11,
    valAxisLabelColor: "64748B", valAxisLabelFontSize: 10,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: INK, dataLabelFontSize: 10,
    showLegend: false,
    showTitle: true, title: "Tokens per MCP (measured in isolation)",
    titleColor: INK, titleFontFace: "Calibri", titleFontSize: 14
  });

  // Takeaway card
  s.addShape(pres.shapes.RECTANGLE, { x: 8.3, y: 2.2, w: 4.5, h: 4.4, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.3, y: 2.2, w: 0.08, h: 4.4, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("TAKEAWAYS", { x: 8.55, y: 2.4, w: 4.1, h: 0.4, fontSize: 11, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "All 5 MCPs on: 42,200 tokens", options: { bullet: true, breakLine: true, color: WHITE } },
    { text: "114 tools exposed", options: { bullet: true, breakLine: true, color: WHITE } },
    { text: "We actually use ~15", options: { bullet: true, breakLine: true, color: WHITE } },
    { text: "Audit ran over 47 sessions", options: { bullet: true, color: WHITE } }
  ], { x: 8.55, y: 2.9, w: 4.1, h: 3.6, fontSize: 13, fontFace: "Calibri", paraSpaceAfter: 8 });

  footer(s, 6, TOTAL);
}

// ---------- Slide 7: Example 1 — doc ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("EXAMPLE 1 · STEP 4-5", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 11, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Fix → Doc → Closed.", { x: 0.5, y: 0.85, w: 12, h: 0.9, fontSize: 36, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  // Left: fix summary
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 6, h: 4.6, fill: { color: ICE }, line: { color: ICE } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 0.08, h: 4.6, fill: { color: GREEN }, line: { color: GREEN } });
  s.addText("The fix (two tiers)", { x: 0.75, y: 2.25, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "Baseline (always on):", options: { bold: true, color: INK, breakLine: true } },
    { text: "   github, reversebits-crm", options: { color: INK, breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "On-demand (per-project):", options: { bold: true, color: INK, breakLine: true } },
    { text: "   figma, linear, sentry", options: { color: INK, breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Forked our own MCPs to expose only", options: { color: INK, breakLine: true } },
    { text: "the 3-5 tools we actually call.", options: { color: INK } }
  ], { x: 0.75, y: 2.9, w: 5.5, h: 3.5, fontSize: 14, fontFace: "Calibri", paraSpaceAfter: 4 });

  // Right: the doc
  s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 2.1, w: 6, h: 4.6, fill: { color: CODE_BG }, line: { color: CODE_BG } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 2.1, w: 0.08, h: 4.6, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("docs/mcp/baseline-config-pattern.md", { x: 7.05, y: 2.25, w: 5.6, h: 0.4, fontSize: 13, bold: true, color: ACCENT, fontFace: "Consolas", margin: 0 });
  s.addText(
`---
title: MCP baseline + on-demand config
category: mcp
status: solved
source_issue: "#14"
last_validated: 2026-04-14
---

## Problem
40k+ tokens before work starts.

## Fix
Two-tier config. See left.

## Limits
Per-project discipline required.
Forking MCPs adds maintenance cost.`,
    { x: 7.05, y: 2.7, w: 5.6, h: 3.9, fontSize: 11, color: WHITE, fontFace: "Consolas", margin: 0 }
  );

  footer(s, 7, TOTAL);
}

// ---------- Slide 8: Example 2 ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("WORKED EXAMPLE 2", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 11, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("The 5-minute fix still gets a doc.", { x: 0.5, y: 0.85, w: 12.3, h: 0.9, fontSize: 34, bold: true, color: INK, fontFace: "Georgia", margin: 0 });
  s.addText("Problem: custom \"client-onboarding\" skill never triggered on natural phrasing.", {
    x: 0.5, y: 1.85, w: 12.3, h: 0.4, fontSize: 14, color: MUTED, italic: true, fontFace: "Calibri", margin: 0
  });

  // Before card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.6, w: 6, h: 4.1, fill: { color: "FFF2F2" }, line: { color: "FFF2F2" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.6, w: 0.08, h: 4.1, fill: { color: RED }, line: { color: RED } });
  s.addText("BEFORE", { x: 0.75, y: 2.75, w: 5.5, h: 0.35, fontSize: 11, bold: true, color: RED, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Marketing voice. No triggers.", { x: 0.75, y: 3.1, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
  s.addText(
`description: "A comprehensive 12-step
onboarding workflow for new agency
clients."`,
    { x: 0.75, y: 3.75, w: 5.5, h: 1.5, fontSize: 12, color: INK, fontFace: "Consolas", margin: 0 }
  );
  s.addText([
    { text: "No verbatim trigger phrases", options: { bullet: true, breakLine: true } },
    { text: "No negative examples", options: { bullet: true, breakLine: true } },
    { text: "Skill never fires on natural speech", options: { bullet: true } }
  ], { x: 0.75, y: 5.3, w: 5.5, h: 1.3, fontSize: 12, color: INK, fontFace: "Calibri", paraSpaceAfter: 4 });

  // After card
  s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 2.6, w: 6, h: 4.1, fill: { color: "EDFBF2" }, line: { color: "EDFBF2" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 2.6, w: 0.08, h: 4.1, fill: { color: GREEN }, line: { color: GREEN } });
  s.addText("AFTER", { x: 7.05, y: 2.75, w: 5.5, h: 0.35, fontSize: 11, bold: true, color: "1B8A4C", charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Retrieval prompt. Triggers explicit.", { x: 7.05, y: 3.1, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
  s.addText(
`description: |
  Run the 12-step onboarding flow.
  Trigger on "onboard [X]", "start
  onboarding for [X]", or signed SoW
  upload. Do not trigger for employee
  onboarding.`,
    { x: 7.05, y: 3.75, w: 5.5, h: 1.8, fontSize: 11, color: INK, fontFace: "Consolas", margin: 0 }
  );
  s.addText([
    { text: "Action verb + verbatim triggers", options: { bullet: true, breakLine: true } },
    { text: "Negative example prevents misfire", options: { bullet: true } }
  ], { x: 7.05, y: 5.6, w: 5.5, h: 1, fontSize: 12, color: INK, fontFace: "Calibri", paraSpaceAfter: 4 });

  footer(s, 8, TOTAL);
}

// ---------- Slide 9: Rules ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("HOW WE WORK", { x: 0.5, y: 0.4, w: 10, h: 0.4, fontSize: 12, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Four rules. Non-negotiable.", { x: 0.5, y: 0.85, w: 12, h: 0.9, fontSize: 38, bold: true, color: INK, fontFace: "Georgia", margin: 0 });

  const rules = [
    { n: "01", t: "Issues, not Slack.", d: "Problems belong in the tracker. Slack is for pinging, not archiving." },
    { n: "02", t: "Evidence in public.", d: "Measurements, logs, token counts — post them in the issue thread." },
    { n: "03", t: "No doc, not solved.", d: "Every resolved issue closes with a link to a merged doc under /docs." },
    { n: "04", t: "Share what works.", d: "Post solutions in Discussions. Cross-post externally. Build in public." }
  ];

  const grid = { x0: 0.5, y0: 2.2, w: 6.15, h: 2.1, gx: 0.2, gy: 0.2 };
  rules.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = grid.x0 + col * (grid.w + grid.gx);
    const y = grid.y0 + row * (grid.h + grid.gy);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: grid.w, h: grid.h, fill: { color: ICE }, line: { color: ICE } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: grid.h, fill: { color: ACCENT }, line: { color: ACCENT } });
    s.addText(r.n, { x: x + 0.3, y: y + 0.2, w: 1.5, h: 0.6, fontSize: 28, bold: true, color: MUTED, fontFace: "Georgia", margin: 0 });
    s.addText(r.t, { x: x + 0.3, y: y + 0.75, w: grid.w - 0.5, h: 0.6, fontSize: 20, bold: true, color: INK, fontFace: "Calibri", margin: 0 });
    s.addText(r.d, { x: x + 0.3, y: y + 1.3, w: grid.w - 0.5, h: 0.8, fontSize: 13, color: INK, fontFace: "Calibri", margin: 0 });
  });

  footer(s, 9, TOTAL);
}

// ---------- Slide 10: CTA ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });

  s.addText("YOUR FIRST WEEK", { x: 0.9, y: 1.2, w: 10, h: 0.4, fontSize: 14, color: ACCENT, bold: true, charSpacing: 6, fontFace: "Calibri", margin: 0 });
  s.addText("Three things to do now.", { x: 0.9, y: 1.7, w: 12, h: 1.2, fontSize: 48, bold: true, color: WHITE, fontFace: "Georgia", margin: 0 });

  const actions = [
    { n: "1", t: "Bookmark the repo.", d: "github.com/reverseBits/Becoming-AI-Native · Star it. Watch it." },
    { n: "2", t: "File one real issue.", d: "Something you hit this week. Use a template. Add labels." },
    { n: "3", t: "Read the two examples.", d: "/examples/example-1-mcp-token-bloat.md and example-2-skill-not-triggering.md" }
  ];

  actions.forEach((a, i) => {
    const y = 3.4 + i * 1.1;
    s.addText(a.n, { x: 0.9, y, w: 0.8, h: 0.8, fontSize: 36, bold: true, color: ACCENT, fontFace: "Georgia", margin: 0 });
    s.addText(a.t, { x: 1.7, y, w: 10, h: 0.5, fontSize: 22, bold: true, color: WHITE, fontFace: "Calibri", margin: 0 });
    s.addText(a.d, { x: 1.7, y: y + 0.5, w: 10, h: 0.5, fontSize: 14, color: ICE, fontFace: "Calibri", margin: 0 });
  });

  s.addText("reverseBits · hello@reversebits.tech", {
    x: 0.9, y: H - 0.85, w: 12, h: 0.4, fontSize: 12, color: MUTED, fontFace: "Calibri", margin: 0
  });
}

pres.writeFile({ fileName: "Becoming-AI-Native-Team-Training.pptx" })
  .then(f => console.log("Written:", f));
