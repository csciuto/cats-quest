const { test, expect } = require('@playwright/test');

test('all game tests pass', async ({ page }) => {
  await page.goto('/test.html');

  // runTests() is synchronous but triggered via requestAnimationFrame,
  // so wait for the summary element it injects into the DOM.
  const summary = page.locator('.tsum');
  await summary.waitFor({ timeout: 15_000 });

  const text = await summary.textContent();

  // Summary format: "N/M passed   F failed"
  // Fail the CI run if any tests failed, and include the full output for diagnosis.
  const failMatch = text.match(/(\d+) failed/);
  const failures = failMatch ? parseInt(failMatch[1], 10) : 0;

  if (failures > 0) {
    // Grab the full results for the error message
    const body = await page.locator('#_tov_body').innerText();
    throw new Error(`${failures} game test(s) failed:\n\n${body}`);
  }

  expect(failures).toBe(0);
});
