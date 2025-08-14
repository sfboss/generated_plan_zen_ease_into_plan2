# Zen Practice Onboarding Plan

A comprehensive 90-day guided journey into Zen meditation practice, designed with cultural respect and progressive skill building.

🌐 **Live Site**: https://sfboss.github.io/generated_plan_zen_ease_into_plan2/

## Local Development

### Prerequisites

-   Python 3.x
-   pip

### Setup and Build

1. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

2. **Build the site:**

    ```bash
    mkdocs build --clean
    ```

3. **Serve locally:**
    ```bash
    mkdocs serve
    ```
    Visit http://localhost:8000 to view the site.

### Quick Deploy

Run the deployment script:

```bash
./deploy.sh
```

## GitHub Pages Deployment

This site automatically deploys to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

### Deployment Workflow

1. Push changes to `main` branch
2. GitHub Actions automatically builds the site
3. Site is deployed to GitHub Pages

### Manual Deployment

If you need to deploy manually:

```bash
mkdocs gh-deploy --force
```

## File Structure

-   `docs/` - Source markdown files
-   `mkdocs.yml` - MkDocs configuration
-   `requirements.txt` - Python dependencies
-   `.github/workflows/deploy.yml` - GitHub Actions workflow
-   `site/` - Generated site (excluded from git)

## Troubleshooting

### Common Issues

1. **Styling not loading**: Ensure `extra.css` is properly linked in `mkdocs.yml`
2. **Build failures**: Check that all referenced files exist in the navigation
3. **GitHub Pages not updating**: Check the Actions tab for build errors

### GitHub Pages Settings

Ensure your repository settings have:

-   Source: "Deploy from a branch" set to "GitHub Actions"
-   Or if using branch deployment: Source branch set to `gh-pages`

## Contributing

1. Make changes to files in the `docs/` directory
2. Test locally with `mkdocs serve`
3. Commit and push to trigger automatic deployment
