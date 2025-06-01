frontend-ui.test.js

const { test, expect } = require('@playwright/test');

test('UI loads and distributes NFT rewards visually', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('NFT Syndicates');

  await page.click('text=Connect Wallet');
  await page.click('text=Distribute Rewards');
  await expect(page.locator('#status')).toHaveText('Distribution Complete');
});
