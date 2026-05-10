import { test, expect } from '@playwright/test';

test.describe('Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-lang-option]', { timeout: 5000 });
  });

  test('EN and 中文 options are visible', async ({ page }) => {
    await expect(page.locator('[data-lang-option="en"]').first()).toBeVisible();
    await expect(page.locator('[data-lang-option="zh-CN"]').first()).toBeVisible();
  });

  test('switching to 中文 changes visible text', async ({ page }) => {
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await expect(page.locator('body')).toContainText('工作原理');
  });

  test('switching back to EN restores English text', async ({ page }) => {
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await page.locator('[data-lang-option="en"]').first().click();
    await expect(page.locator('body')).toContainText('How It Works');
  });

  test('language selection persists after page reload', async ({ page }) => {
    await page.locator('[data-lang-option="zh-CN"]').first().click();
    await expect(page.locator('body')).toContainText('工作原理');
    await page.reload();
    await page.waitForSelector('[data-lang-option]', { timeout: 5000 });
    await expect(page.locator('body')).toContainText('工作原理');
    await page.locator('[data-lang-option="en"]').first().click();
  });
});
