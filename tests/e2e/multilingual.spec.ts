import { test, expect } from '@playwright/test';

// ── Localized page load tests ─────────────────────────────────────────────────
test.describe('Multilingual pages — Chinese Simplified', () => {
  test('ZH homepage loads with correct title', async ({ page }) => {
    const res = await page.goto('/zh/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/RolegacyAI/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  });

  test('ZH homepage contains translated headline', async ({ page }) => {
    await page.goto('/zh/');
    await expect(page.locator('body')).toContainText('记忆层');
  });

  test('ZH story page loads', async ({ page }) => {
    const res = await page.goto('/zh/story/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/RolegacyAI/);
  });

  test('ZH architecture page loads', async ({ page }) => {
    const res = await page.goto('/zh/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('架构');
  });

  test('ZH blog page loads', async ({ page }) => {
    const res = await page.goto('/zh/blog/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('洞察');
  });

  test('ZH prototype page loads with noindex', async ({ page }) => {
    const res = await page.goto('/zh/prototype/');
    expect(res?.status()).toBe(200);
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', 'noindex');
  });
});

test.describe('Multilingual pages — Hindi', () => {
  test('HI homepage loads with correct lang attribute', async ({ page }) => {
    const res = await page.goto('/hi/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  });

  test('HI homepage contains translated headline', async ({ page }) => {
    await page.goto('/hi/');
    await expect(page.locator('body')).toContainText('मेमोरी');
  });

  test('HI story page loads', async ({ page }) => {
    const res = await page.goto('/hi/story/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/RolegacyAI/);
  });

  test('HI architecture page loads', async ({ page }) => {
    const res = await page.goto('/hi/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('संरचना');
  });

  test('HI blog page loads', async ({ page }) => {
    const res = await page.goto('/hi/blog/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('अंतर्दृष्टि');
  });
});

test.describe('Multilingual pages — Marathi', () => {
  test('MR homepage loads with correct lang attribute', async ({ page }) => {
    const res = await page.goto('/mr/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'mr');
  });

  test('MR homepage contains translated headline', async ({ page }) => {
    await page.goto('/mr/');
    await expect(page.locator('body')).toContainText('मेमरी');
  });

  test('MR story page loads', async ({ page }) => {
    const res = await page.goto('/mr/story/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/RolegacyAI/);
  });

  test('MR architecture page loads', async ({ page }) => {
    const res = await page.goto('/mr/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('संरचना');
  });

  test('MR blog page loads', async ({ page }) => {
    const res = await page.goto('/mr/blog/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('अंतर्दृष्टी');
  });
});

// ── hreflang verification on English pages ────────────────────────────────────
test.describe('hreflang on English pages', () => {
  test('EN homepage has hreflang for all 4 locales', async ({ page }) => {
    await page.goto('/');
    const zhLink = page.locator('link[rel="alternate"][hreflang="zh-CN"]');
    await expect(zhLink).toHaveAttribute('href', 'https://rolegacyai.com/zh/');
    const hiLink = page.locator('link[rel="alternate"][hreflang="hi"]');
    await expect(hiLink).toHaveAttribute('href', 'https://rolegacyai.com/hi/');
    const mrLink = page.locator('link[rel="alternate"][hreflang="mr"]');
    await expect(mrLink).toHaveAttribute('href', 'https://rolegacyai.com/mr/');
    const xdefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xdefault).toHaveAttribute('href', 'https://rolegacyai.com/');
  });

  test('EN story page has hreflang pointing to localized story pages', async ({ page }) => {
    await page.goto('/story.html');
    const zhLink = page.locator('link[rel="alternate"][hreflang="zh-CN"]');
    await expect(zhLink).toHaveAttribute('href', 'https://rolegacyai.com/zh/story/');
  });

  test('EN architecture page has hreflang pointing to localized architecture pages', async ({ page }) => {
    await page.goto('/architecture.html');
    const zhLink = page.locator('link[rel="alternate"][hreflang="zh-CN"]');
    await expect(zhLink).toHaveAttribute('href', 'https://rolegacyai.com/zh/architecture/');
  });

  test('EN blog page has hreflang pointing to localized blog pages', async ({ page }) => {
    await page.goto('/blog.html');
    const zhLink = page.locator('link[rel="alternate"][hreflang="zh-CN"]');
    await expect(zhLink).toHaveAttribute('href', 'https://rolegacyai.com/zh/blog/');
  });
});

// ── hreflang on localized pages ───────────────────────────────────────────────
test.describe('hreflang on localized pages', () => {
  test('ZH homepage has hreflang back to EN', async ({ page }) => {
    await page.goto('/zh/');
    const enLink = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(enLink).toHaveAttribute('href', 'https://rolegacyai.com/');
  });

  test('HI story page has hreflang to all alternates', async ({ page }) => {
    await page.goto('/hi/story/');
    const enLink = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(enLink).toHaveAttribute('href', 'https://rolegacyai.com/story');
    const zhLink = page.locator('link[rel="alternate"][hreflang="zh-CN"]');
    await expect(zhLink).toHaveAttribute('href', 'https://rolegacyai.com/zh/story/');
  });
});

// ── canonical tags on localized pages ────────────────────────────────────────
test.describe('Canonical tags on localized pages', () => {
  test('ZH homepage has correct canonical', async ({ page }) => {
    await page.goto('/zh/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://rolegacyai.com/zh/');
  });

  test('HI architecture page has correct canonical', async ({ page }) => {
    await page.goto('/hi/architecture/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://rolegacyai.com/hi/architecture/');
  });

  test('MR blog page has correct canonical', async ({ page }) => {
    await page.goto('/mr/blog/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://rolegacyai.com/mr/blog/');
  });
});

// ── Patent modal works on localized pages ────────────────────────────────────
test.describe('Patent modal on localized pages', () => {
  test('Patent Pending nav button opens modal on ZH homepage', async ({ page }) => {
    await page.goto('/zh/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      const btn = document.getElementById('patent-btn') as HTMLElement | null;
      if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 8000 });
  });

  test('Patent Pending nav button opens modal on HI homepage', async ({ page }) => {
    await page.goto('/hi/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      const btn = document.getElementById('patent-btn') as HTMLElement | null;
      if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 8000 });
  });
});

// ── Nav on localized pages ────────────────────────────────────────────────────
test.describe('Nav on localized pages', () => {
  test('ZH homepage nav brand links to /zh/', async ({ page }) => {
    await page.goto('/zh/');
    const brand = page.locator('.nav__logo').first();
    await expect(brand).toHaveAttribute('href', '/zh/');
  });

  test('ZH homepage nav story link goes to /zh/story/', async ({ page }) => {
    await page.goto('/zh/');
    const storyLink = page.locator('.nav__links a[href="/zh/story/"]');
    await expect(storyLink).toBeVisible();
  });

  test('MR homepage nav story link goes to /mr/story/', async ({ page }) => {
    await page.goto('/mr/');
    const storyLink = page.locator('.nav__links a[href="/mr/story/"]');
    await expect(storyLink).toBeVisible();
  });
});
