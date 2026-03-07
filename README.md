A zero-human-code, claude-written retro adventure!

## Development

No build step. The game is plain HTML/CSS/JS — open `index.html` in a browser or serve it locally.

```bash
npx serve . -l 8080
# then open http://localhost:8080
```

## Testing

Tests run in a real Chromium browser via [Playwright](https://playwright.dev). This is intentional — the game uses canvas and Web Audio APIs that only exist in a browser.

### Setup (first time)

```bash
npm install
npx playwright install chromium --with-deps
```

### Run tests

```bash
npm test
```

### Debug tests (watch mode)

```bash
npm run test:ui
```

### Manual test page

Open `test.html` in a browser (or via the local server at `http://localhost:8080/test.html`). Tests run automatically on load. There is also a link at the bottom of the game page.

## Deployment

Push to `main`. GitHub Actions runs the test suite on every push and pull request. If tests pass, GitHub Pages deploys automatically (configured separately in repo settings).
