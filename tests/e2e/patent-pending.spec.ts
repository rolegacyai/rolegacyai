import { test, expect } from '@playwright/test';

// Helper: fire a JS-level click on an element identified by CSS selector.
// This dispatches the DOM click event directly, bypassing Playwright's pointer
// simulation, and reliably fires addEventListener('click', …) handlers even
// when a layout element would otherwise intercept pointer events.
async function jsClick(page: import('@playwright/test').Page, selector: string) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) throw new Error(`jsClick: element not found for "${sel}"`);
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }, selector);
}

test.describe('Patent Pending Modal', () => {
  test.beforeEach(async ({ page }) => {
    page.on('pageerror', (err) => console.error('[pageerror]', err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error('[console error]', msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking Patent Pending nav button opens modal', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
  });

  test('modal contains Patent Pending heading', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#patent-modal-title')).toContainText('Patent Pending');
  });

  test('modal contains approved placeholder wording', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.patent-modal__body')).toContainText('patent pending');
    await expect(page.locator('.patent-modal__body')).toContainText('More details will be added soon');
  });

  test('Escape key closes modal', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await page.keyboard.press('Escape');
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('close button closes modal', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await jsClick(page, '#patent-modal-close');
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('backdrop click closes modal', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await jsClick(page, '#patent-modal-backdrop');
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('hero badge also opens modal', async ({ page }) => {
    await jsClick(page, '#patent-badge-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
  });

  test('modal does not contain invented patent claims', async ({ page }) => {
    await jsClick(page, '#patent-btn');
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    const bodyText = await page.locator('.patent-modal__body').innerText();
    expect(bodyText).not.toMatch(/patent number|filing date|claim \d|patented/i);
  });
});
