import { test, expect } from '@playwright/test';

async function jsClick(page: import('@playwright/test').Page, selector: string) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) throw new Error(`jsClick: element not found for "${sel}"`);
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }, selector);
}

test.describe('Architecture page — EN', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/architecture.html');
    await page.waitForLoadState('networkidle');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/RolegacyAI Architecture/);
  });

  test('hero heading is present', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('RolegacyAI Architecture');
  });

  test('system flow section is present', async ({ page }) => {
    await expect(page.locator('.arch-flow')).toBeVisible();
    await expect(page.locator('.arch-flow__step')).toHaveCount(5);
  });

  test('core capabilities section has 7 cards', async ({ page }) => {
    await expect(page.locator('.arch-core__card')).toHaveCount(7);
  });

  test('architecture deep dive has 20 cards', async ({ page }) => {
    await expect(page.locator('.arch-layer')).toHaveCount(20);
  });

  test('enterprise trust section has 4 items', async ({ page }) => {
    await expect(page.locator('.arch-trust__item')).toHaveCount(4);
  });

  test('verticals section has 6 tiles', async ({ page }) => {
    await expect(page.locator('.arch-vertical')).toHaveCount(6);
  });

  test('nav shows Architecture as current page', async ({ page }) => {
    await expect(page.locator('.nav__links a[aria-current="page"]')).toContainText('Architecture');
  });

  test('nav CTA says Register Interest', async ({ page }) => {
    await expect(page.locator('.nav__cta')).toContainText('Register Interest');
  });

  test('patent modal opens from nav button', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('#patent-modal-title')).toContainText('Patent Pending');
  });

  test('patent modal closes with Escape', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 8000 });
    await page.keyboard.press('Escape');
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('arch-layer card descriptions are in English', async ({ page }) => {
    const firstCardDesc = await page.locator('.arch-layer__desc').first().innerText();
    expect(firstCardDesc).toMatch(/[a-zA-Z]{5,}/);
  });

  test('no English text leaks into ZH architecture cards', async ({ page }) => {
    await page.goto('/zh/architecture/');
    await page.waitForLoadState('networkidle');
    const descs = await page.locator('.arch-layer__desc').allInnerTexts();
    for (const desc of descs) {
      expect(desc).not.toMatch(/^How RolegacyAI/);
    }
  });
});

test.describe('Architecture page — ZH', () => {
  test('ZH architecture page loads with Chinese content', async ({ page }) => {
    const res = await page.goto('/zh/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
    await expect(page.locator('h1')).toContainText('RolegacyAI');
    await expect(page.locator('.arch-flow')).toBeVisible();
  });

  test('ZH nav has Chinese labels', async ({ page }) => {
    await page.goto('/zh/architecture/');
    const navHtml = await page.locator('.nav__links').innerHTML();
    expect(navHtml).toContain('架构');
    expect(navHtml).toContain('洞察');
  });
});

test.describe('Architecture page — HI', () => {
  test('HI architecture page loads', async ({ page }) => {
    const res = await page.goto('/hi/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('.arch-flow')).toBeVisible();
  });

  test('HI arch-layer cards have Hindi descriptions', async ({ page }) => {
    await page.goto('/hi/architecture/');
    const descs = await page.locator('.arch-layer__desc').allInnerTexts();
    for (const desc of descs) {
      expect(desc).not.toMatch(/^How RolegacyAI/);
    }
  });
});

test.describe('Architecture page — MR', () => {
  test('MR architecture page loads', async ({ page }) => {
    const res = await page.goto('/mr/architecture/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'mr');
    await expect(page.locator('.arch-flow')).toBeVisible();
  });

  test('MR arch-layer cards have Marathi descriptions', async ({ page }) => {
    await page.goto('/mr/architecture/');
    const descs = await page.locator('.arch-layer__desc').allInnerTexts();
    for (const desc of descs) {
      expect(desc).not.toMatch(/^How RolegacyAI/);
    }
  });
});
