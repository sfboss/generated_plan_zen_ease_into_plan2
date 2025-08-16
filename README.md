# Zen Practice Onboarding Plan

<div align="center">

[![Deploy MkDocs to GitHub Pages](https://github.com/sfboss/generated_plan_zen_ease_into_plan2/actions/workflows/deploy.yml/badge.svg)](https://github.com/sfboss/generated_plan_zen_ease_into_plan2/actions/workflows/deploy.yml)

**A comprehensive 90-day guided journey into Zen meditation practice**

[🌐 **Visit Site**](https://sfboss.github.io/generated_plan_zen_ease_into_plan2/) • [📖 **Get Started**](https://sfboss.github.io/generated_plan_zen_ease_into_plan2/getting-started/welcome/) • [🧘 **Day 1**](https://sfboss.github.io/generated_plan_zen_ease_into_plan2/days/day01/)

_Designed with cultural respect and progressive skill building_

</div>

---

## Overview

This project provides a structured, culturally respectful introduction to Zen meditation practice through:

-   **90-day progressive curriculum** organized in 5 phases
-   **Daily practice guides** with specific techniques and reflections
-   **Interactive features** including meditation timers, progress tracking, and achievement systems
-   **Cultural context** and historical background with proper attribution
-   **Modern accessibility** while honoring traditional practices

## Features

-   📅 **Phase-based Learning**: 5 structured phases from orientation to expansion
-   🧘 **Daily Practice Pages**: Complete guidance for each day of practice
-   ⏱️ **Meditation Timer**: Built-in timer with ambient sounds
-   📊 **Progress Tracking**: Visual progress garden and achievement badges
-   🎵 **Breathing Guide**: Interactive breathing exercises
-   📝 **Reflection Tools**: Journaling prompts and weekly reviews
-   🏛️ **Cultural Respect**: Proper context for Zen traditions and schools

## Local Development

### Prerequisites

-   Python 3.x
-   pip

### Quick Start

1. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

2. **Serve locally:**

    ```bash
    mkdocs serve
    ```

    Visit http://localhost:8000 to view the site.

3. **Build for production:**
    ```bash
    mkdocs build
    ```

## Deployment

This site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Automatic Deployment

1. Push changes to `main` branch
2. GitHub Actions builds the site automatically
3. Site deploys to GitHub Pages

### Manual Deployment (if needed)

```bash
mkdocs gh-deploy --force
```

## Project Structure

```
├── docs/                          # Source content
│   ├── getting-started/           # Introduction and setup
│   ├── foundations/               # Core practices and concepts
│   ├── plan/                      # Phase overviews
│   ├── days/                      # Daily practice guides (day01.md - day90.md)
│   ├── progress/                  # Tracking and metrics
│   ├── reflection/                # Journaling and review tools
│   ├── enrichment/                # Cultural context and resources
│   ├── javascripts/               # Interactive features
│   └── stylesheets/               # Custom styling
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── mkdocs.yml                     # Site configuration
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

## Contributing

1. Make changes to files in the `docs/` directory
2. Test locally with `mkdocs serve`
3. Commit and push to trigger automatic deployment

## Cultural Notice

This project approaches Zen meditation with deep respect for its Japanese Buddhist origins. All traditional terms are used with cultural acknowledgment, and the content includes proper historical context while making the practices accessible to contemporary practitioners.

## Technical Stack

-   **MkDocs** with **Material Theme** for documentation site generation
-   **GitHub Actions** for automated deployment
-   **GitHub Pages** for hosting
-   **Python** with pymdownx extensions for enhanced markdown features
-   **Interactive JavaScript** components for meditation tools and progress tracking

## Features in Detail

### 🏛️ **Cultural Authenticity**

-   Proper Japanese terminology with cultural context
-   Historical background of different Zen schools
-   Respectful presentation of traditional practices
-   Attribution to original sources and teachers

### 📚 **Progressive Learning Structure**

-   **Phase 1 (Days 1-7)**: Orientation - Basic posture, breathing, and foundational concepts
-   **Phase 2 (Days 8-21)**: Stabilization - Developing regular practice habits
-   **Phase 3 (Days 22-45)**: Deepening - Advanced techniques and longer sessions
-   **Phase 4 (Days 46-60)**: Integration - Bringing practice into daily life
-   **Phase 5 (Days 61-90)**: Expansion - Exploring different approaches and maintaining long-term practice

### 🧘 **Interactive Practice Tools**

-   **Meditation Timer**: Configurable timer with different bell sounds
-   **Breathing Guide**: Visual breathing exercises with customizable pace
-   **Progress Garden**: Visual representation of practice consistency with growing elements
-   **Achievement System**: Milestone tracking and celebration
-   **Weekly Reviews**: Structured reflection and planning tools

### 📖 **Educational Resources**

-   Daily practice instructions with clear step-by-step guidance
-   Frequently asked questions addressing common concerns
-   Glossary of Zen terminology
-   Historical context for each major practice
-   Safety and wellbeing guidelines

## Content Quality Standards

This project maintains high standards for:

-   **Accuracy**: All traditional practices are researched and properly presented
-   **Accessibility**: Content is approachable for beginners while remaining authentic
-   **Respect**: Cultural elements are presented with proper context and attribution
-   **Practicality**: All guidance is actionable and suitable for daily practice
-   **Safety**: Appropriate warnings and modifications for different practitioners

## Deployment Status

The site automatically builds and deploys via GitHub Actions. The deployment workflow:

1. Triggers on pushes to `main` branch or manual dispatch
2. Sets up Python environment and installs dependencies
3. Builds the MkDocs site
4. Deploys to GitHub Pages with proper permissions

## License

This educational content is provided for personal meditation practice. Traditional Zen teachings and cultural elements are presented with respect and proper attribution to their sources.

**Please note**: This is a modern adaptation of traditional practices. For authentic Zen training, we encourage seeking guidance from qualified teachers and established meditation centers.
