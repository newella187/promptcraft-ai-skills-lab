# PromptCraft — AI Skills Lab v2

A GitHub-ready training app for practical AI prompting, audit support and safer workflow design.

## What changed in v2

- Removed the Perplexity preview/inline-edit script from the original exported HTML.
- Replaced outdated chain-of-thought wording with **reasoning summaries, assumptions, checks and evidence gaps**.
- Removed unsupported accuracy claims.
- Added current terminology: prompt design, instruction design, Custom GPTs, agents, workflow controls and unsupported outputs.
- Added a prompt builder aimed at ISO audit-style work.
- Added confidentiality and human-review warnings.
- Added a proper source structure for GitHub.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build for release

```bash
npm run build
npm run preview
```

The production files will be created in the `dist` folder.

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload these files.
3. In GitHub, go to **Settings > Pages**.
4. Choose your deployment method:
   - For a simple manual deployment, upload the contents of the built `dist` folder to your Pages branch; or
   - Use a GitHub Actions workflow to build with `npm run build`.

## Safe use note

Do not upload client confidential information, personal data or commercially sensitive material into public AI tools unless your organisation has approved that use. Redact where possible and keep a human review step before issuing audit reports.
