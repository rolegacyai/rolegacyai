import { test, expect } from '@playwright/test';

test.describe('Language Switcher — URL-based routing', () => {
  test('EN language switcher is injected on the English homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const sw = page.locator('.lang-sw').first();
    await expect(sw).toBeVisible();
  });

  test('All four language buttons are present on the English homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // EN button is active and links to /
    const enBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="en"]').first();
    await expect(enBtn).toBeVisible();
    await expect(enBtn).toHaveClass(/lang-sw__btn--active/);

    // ZH, HI, MR buttons are present
    await expect(page.locator('.lang-sw .lang-sw__btn[hreflang="zh-CN"]').first()).toBeVisible();
    await expect(page.locator('.lang-sw .lang-sw__btn[hreflang="hi"]').first()).toBeVisible();
    await expect(page.locator('.lang-sw .lang-sw__btn[hreflang="mr"]').first()).toBeVisible();
  });

  test('ZH button on homepage links to /zh/', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const zhBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="zh-CN"]').first();
    await expect(zhBtn).toHaveAttribute('href', '/zh/');
  });

  test('HI button on homepage links to /hi/', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hiBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="hi"]').first();
    await expect(hiBtn).toHaveAttribute('href', '/hi/');
  });

  test('MR button on homepage links to /mr/', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const mrBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="mr"]').first();
    await expect(mrBtn).toHaveAttribute('href', '/mr/');
  });

  test('ZH homepage has static lang-sw with ZH active', async ({ page }) => {
    await page.goto('/zh/');
    await page.waitForLoadState('load');
    const sw = page.locator('.lang-sw').first();
    await expect(sw).toBeVisible();
    const zhBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="zh-CN"]').first();
    await expect(zhBtn).toHaveClass(/lang-sw__btn--active/);
  });

  test('HI homepage has static lang-sw with HI active', async ({ page }) => {
    await page.goto('/hi/');
    await page.waitForLoadState('load');
    const hiBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="hi"]').first();
    await expect(hiBtn).toHaveClass(/lang-sw__btn--active/);
  });

  test('MR homepage has static lang-sw with MR active', async ({ page }) => {
    await page.goto('/mr/');
    await page.waitForLoadState('load');
    const mrBtn = page.locator('.lang-sw .lang-sw__btn[hreflang="mr"]').first();
    await expect(mrBtn).toHaveClass(/lang-sw__btn--active/);
  });

  test('clicking ZH button on homepage navigates to /zh/', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.lang-sw .lang-sw__btn[hreflang="zh-CN"]').first().click();
    await expect(page).toHaveURL(/\/zh\//);
  });
});
