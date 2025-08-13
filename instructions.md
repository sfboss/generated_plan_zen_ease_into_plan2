You are an autonomous documentation + content generation agent. Execute the following end-to-end plan. Output only files and their contents (no extraneous chatter). Goal: In project root create a new folder zen_plan containing a complete, high-quality MkDocs (Material theme) site delivering a culturally respectful, structured, day-numbered Zen practice onboarding plan (multi-phase) that is informative, unique, and aesthetically polished. Optimize for clarity, depth, accessibility, cultural respect, and sustainable habit formation.

PRIMARY OBJECTIVES

1. Create folder zen_plan with:
   mkdocs.yml
   docs/ (all markdown content)
   docs/assets/ (images, css)
   docs/stylesheets/
   docs/javascripts/ (if needed)
2. Provide a 90-day (easily extendable) plan broken into meaningful phases with taxonomy: Phase, Day Number, Practice Category, Tags.
3. Use Material for MkDocs + pymdownx extensions (details below) + admonitions + superfences + icons + tags + good navigation.
4. Ensure every page renders beautifully with consistent front matter metadata.
5. Include guidance on Zen basics (history, schools, posture, etiquette, glossary, practice types) while avoiding religious dogmatism and respecting cultural origins.
6. Include originality: layered habit loops, reflection scaffolds, metrics, weekly integration reviews, optional depth modules.
7. Ensure the site is immediately buildable: all links work, nav defined, index page compelling, no TODO placeholders—use fully written exemplar content plus scalable patterns.

INFORMATION ARCHITECTURE (docs/)
index.md (engaging portal, value proposition, quick start)
getting-started/
welcome.md
safety-wellbeing.md (disclaimers: not medical advice)
how-to-use-this-plan.md
glossary.md
posture-and-breath.md
etiquette.md
schools-of-zen.md (Soto / Rinzai / Ōbaku overview; neutral tone)
foundations/
core-practices.md (zazen, kinhin, bowing, chanting, koan intro, mindful tasks)
daily-structure-template.md
habit-formation.md
tracking-metrics.md
frequently-asked-questions.md
plan/
phases-overview.md
phase-01-orientation-days-01-07.md
phase-02-stabilization-days-08-21.md
phase-03-deepening-days-22-45.md
phase-04-integration-days-46-60.md
phase-05-expansion-days-61-90.md
days/
day01.md ... day90.md (generate all)
reflection/
weekly-reviews.md
journaling-prompts.md
obstacles-and-adaptations.md
enrichment/
historical-context.md
cultural-respect.md
comparative-practices.md (difference vs general mindfulness)
recommended-resources.md (books, audio, vetted; avoid copyright content)
koan-primer.md (gentle intro; caution for beginners)
tag-index/
index.md (auto tag usage explanation)
meta/
roadmap.md
methodology.md
assets/
(placeholder image references, alt text included)
stylesheets/
extra.css (custom minor styling: callouts, spacing)
LICENSE notice if needed (do not include copyrighted text)

TAXONOMY & METADATA
Front matter (YAML) for every substantive page:

---

title: "Readable Title"
summary: "1–2 sentence concise summary."
tags: [phase-x, day-##, practice:meditation, theme:consistency] (relevant tags)
phase: Phase X (if applicable)
day_number: NN (if single day)
est_time: "Main: 15m | Optional: 10m"
difficulty: starter|gentle|moderate|deepening

---

Provide consistent tags (phase-01 ... phase-05, practice:zazen, practice:walking, practice:reflection, skill:posture, meta:overview, theme:discipline, theme:compassion). Create a tag index page explaining taxonomy.

PHASE DEFINITIONS
Phase 01 Orientation (Days 01–07): Establish posture, breath, 5–10m sits.
Phase 02 Stabilization (08–21): Increase to 12–15m, introduce kinhin, begin journaling depth.
Phase 03 Deepening (22–45): 18–22m sits, introduce chanting or simple bowing, mindful daily tasks pattern.
Phase 04 Integration (46–60): Flexible scheduling, introduce micro-koan awareness concept (non-intensive).
Phase 05 Expansion (61–90): 25–30m sits, resilience strategies, personal adaptation module.

DAILY PAGE TEMPLATE (each dayNN.md fully written, not placeholder)
Sections (use consistent heading hierarchy):

1. Intent (clear, motivational)
2. Core Practice (duration, instructions)
3. Guided Structure (timeline mini-table using fenced code with pseudo-table or definition list)
4. Technique Focus (single refinement)
5. Optional Expansion (advanced or variation)
6. Micro-Habit (1-minute anchor behavior)
7. Reflection Prompts (2–3 rotating; encourage pattern recognition)
8. Cultural Insight (brief, respectful; cite school if relevant)
9. Mindful Action (apply in life: eating, walking, cleaning, listening)
10. Metrics to Track (sit minutes, restlessness episodes, subjective clarity 1–5)
11. Troubleshooting (common friction + remedy)
12. Safety & Wellbeing Note (stress, fatigue guidance)
13. Tomorrow Preview (creates continuity)
    Embed admonitions:
    !!! note / tip / example / caution / quote
    Use icons (material/emoji) for quick scanning (e.g. :seedling:, :lotus_position:, :footprints:, :thought_balloon:, :repeat:).
    Rotate focus dimensions (Posture, Breath, Attention Span, Attitude (Shoshin), Compassion, Consistency, Embodiment).

WEEKLY REVIEW STRUCTURE
Provide Weekly Review template: Wins, Challenges, Adjustments, Emerging Questions, Lifestyle Integration Score, Consistency Metrics, Gentle Self-Compassion Statement.

CONTENT STYLE & CULTURAL RESPECT

-   Use inclusive, non-appropriative tone. Credit Japanese origins where relevant.
-   Avoid overpromising outcomes; frame benefits as potential.
-   Distinguish secular adaptation vs traditional temple context.
-   Clarify that koan study traditionally guided by teacher; present only light orientation.
-   Use Japanese terms italicized once with parenthetical English explanation; subsequent uses plain.

MKDOCS CONFIG (mkdocs.yml)
Site metadata: site_name, site_description, site_url (placeholder), repo_url (placeholder), copyright.
Theme: material
features: - navigation.sections - navigation.tabs - navigation.top - content.code.copy - content.action.edit - content.tabs.link - search.highlight - search.suggest
palette: light + dark toggle
icon:
logo: material/meditation
repo: fontawesome/brands/github
font: (e.g. text: "Inter", code: "JetBrains Mono")
plugins:

-   search
-   tags
-   mkdocs_macros
-   glightbox (if images)
-   awesome-pages (optional for nav auto-structuring) OR define nav manually
    markdown_extensions:
-   admonition
-   pymdownx.superfences
-   pymdownx.tabbed
-   pymdownx.details
-   pymdownx.emoji:
    emoji_generator: !!python/name:pymdownx.emoji.to_svg
-   pymdownx.tasklist:
    custom_checkbox: true
-   pymdownx.arithmatex:
    generic: true
-   pymdownx.mark
-   pymdownx.inlinehilite
-   pymdownx.highlight:
    anchor_linenums: true
-   pymdownx.tilde
-   pymdownx.smartsymbols
-   pymdownx.keys
-   def_list
-   attr_list
-   footnotes
    extra:
    social: - icon: fontawesome/solid/book
    link: https://example.com - icon: fontawesome/brands/github
    link: https://github.com/example
    tags:
    enabled: true
    extra_css:
-   stylesheets/extra.css
    nav: (Explicit hierarchical nav matching folder tree; keep order logical)

STYLING (extra.css) suggestions:
:root { --md-primary-fg-color: #4d6f6a; --md-accent-fg-color: #d6a648; }
Refine admonition spacing, custom badge styling for phase labels (use span.badge-phase-x).
Provide CSS class .phase-banner and apply at top of each phase overview page via HTML block.

CROSS-LINKING & DISCOVERABILITY

-   Each day page links to previous & next (manual or macro).
-   Each phase overview links to all its days (grid or list).
-   Tag index aggregates category clusters (practice, phase, theme).
-   Provide mini-site map on index.md.

UNIQUENESS & VALUE ADD

-   Habit loops (Trigger -> Action -> Immediate Reward -> Long-term Meaning).
-   Reflection taxonomy (Sensations / Emotions / Thoughts / Behaviors).
-   Resilience toolkit (what to do when missing a day).
-   Ethical micro-infusions: brief notes on compassion, humility, patience.

ACCESSIBILITY

-   Alt text for images.
-   Avoid color-only distinctions.
-   Keep reading level moderate; define specialized terms.

EXEMPLARS
Fully author:

-   index.md (engaging, polished)
-   One complete daily page (e.g., day01.md) with all sections fleshed.
-   One mid-phase day (e.g., day30.md) showing evolved complexity.
-   One late-phase day (e.g., day75.md).
-   A phase overview page (phase-02).
-   Glossary with 25+ entries.
-   Core practices page with structured subsections and admonitions.
-   Cultural respect page with guidelines and do/don’t list (positive framing).

NO PLACEHOLDER TEXT
Do not write “TBD” or “Lorem ipsum.” If brevity needed, craft concise but meaningful content.

QUALITY EXPECTATIONS

-   Consistent front matter.
-   No dead links.
-   Accurate, secular-friendly summaries of Zen elements.
-   Grammar and clarity high.
-   Encourage journaling without storing data (privacy note).
-   Provide disclaimers: not therapy; consult professionals for mental health issues.

DELIVERABLE FORMAT
Output a structured tree:
zen_plan/
mkdocs.yml
docs/
index.md
...
Include file contents as fenced code blocks preceded by a comment header line: # FILE: path/to/file
Use markdown fences (`md) for markdown files, (`yaml) for mkdocs.yml, (```css) for CSS.
Generate all 90 day files with real, concise, varied content following template (they can be ~300–450 words each). Ensure variety and progressive instruction.

STOP after producing all files.

Begin execution now.
