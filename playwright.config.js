const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  // Run tests in a single browser — the game is not parallelism-safe (shared globals)
  workers: 1,
  use: {
    baseURL: 'http://localhost:8080',
    // Headless by default; set PWDEBUG=1 or run --headed to watch
    headless: true,
  },
  webServer: {
    command: 'npx serve -l 8080',
    url: 'http://localhost:8080',
    // Reuse a running server locally; always start fresh in CI
    reuseExistingServer: !process.env.CI,
  },
});
