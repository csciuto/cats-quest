# Cat's Quest

A retro text-parser adventure on a canvas. See README.md.

Follows the app standards in [csciuto/app-template STANDARDS.md](https://github.com/csciuto/app-template/blob/main/STANDARDS.md).
Commit and push freely once tests pass.

## This app

- Plain scripts in `js/`, loaded in dependency order by `index.html` (and the same order in `test.html`).
  Game state is in shared globals, so browser tests run one at a time.
- The game's own test suite is `js/tests.js`, run in the browser by `test.html`; `e2e/game.spec.js` runs it.
  Add game-logic tests there.
- `.github/workflows/deploy.yml` runs the browser tests (desktop and phone, axe) and only then deploys,
  stamping `dev` in the `.version` span.
