import { test, expect } from '@playwright/test';

test.describe('Story Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/story.html');
    await page.waitForLoadState('domcontentloaded');
  });

  test('story page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Story/);
  });

  test('RolegacyAI brand is present on story page', async ({ page }) => {
    await expect(page.locator('body')).toContainText('RolegacyAI');
  });

  test('nav is visible on story page', async ({ page }) => {
    const nav = page.locator('.nav, nav').first();
    await expect(nav).toBeVisible();
  });

  test('a link back to homepage or overview tab exists', async ({ page }) => {
    const backLink = page.locator(
      'a[href="index.html"], a[href="/"], a[href="./"], a[href="."], .view-toggle__tab'
    );
    await expect(backLink.first()).toBeVisible();
  });

  test('story page has meaningful content sections', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toContainText('memory');
  });
});
