import { test, expect } from '@playwright/test';

test.describe('Patent Pending Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking Patent Pending nav button opens modal', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
  });

  test('modal contains Patent Pending heading', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#patent-modal-title')).toContainText('Patent Pending');
  });

  test('modal contains approved placeholder wording', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.patent-modal__body')).toContainText('patent pending');
    await expect(page.locator('.patent-modal__body')).toContainText('More details will be added soon');
  });

  test('Escape key closes modal', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await page.keyboard.press('Escape');
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('close button closes modal', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await page.locator('#patent-modal-close').click();
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('backdrop click closes modal', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    await page.locator('#patent-modal-backdrop').click();
    await expect(page.locator('#patent-modal')).toBeHidden();
  });

  test('hero badge also opens modal', async ({ page }) => {
    await page.locator('#patent-badge-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
  });

  test('modal does not contain invented patent claims', async ({ page }) => {
    await page.locator('#patent-btn').click();
    await expect(page.locator('#patent-modal')).toBeVisible({ timeout: 10000 });
    const bodyText = await page.locator('.patent-modal__body').innerText();
    expect(bodyText).not.toMatch(/patent number|filing date|claim \d|patented/i);
  });
});
