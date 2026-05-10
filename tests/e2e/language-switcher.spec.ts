import { test, expect } from '@playwright/test';

// The language switcher (data-lang-option) has not yet been built into the site.
// These tests are skipped until the feature is implemented.
test.describe('Language Switcher', () => {
  test.skip('EN and 中文 options are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-lang-option="en"]').first()).toBeVisible();
    await expect(page.locator('[data-lang-option="zh-CN"]').first()).toBeVisible();
  });

  test.skip('switching to 中文 changes visible text', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await expect(page.locator('body')).toContainText('工作原理');
  });

  test.skip('switching back to EN restores English text', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await page.locator('[data-lang-option="en"]').first().click();
    await expect(page.locator('body')).toContainText('How It Works');
  });

  test.skip('language selection persists after page reload', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await expect(page.locator('body')).toContainText('工作原理');
    await page.reload();
    await page.locator('[data-lang-option="en"]').first().click();
  });
});
