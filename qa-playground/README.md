# QA Playground tests

This Playwright suite checks that the QA Playground homepage loads and that its
primary practice link opens the practice area.

Run the suite from the repository root:

```powershell
npm run test:qa-playground
```

The test uses the shared Playwright configuration and runs in its configured
browser projects. Install browser binaries with `npx playwright install` if
they are not already installed locally.