import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/RolegacyAI/);
  });

  test('RolegacyAI brand is visible', async ({ page }) => {
    await expect(page.locator('.nav__logo-text').first()).toBeVisible();
    await expect(page.locator('.nav__logo-text').first()).toContainText('RolegacyAI');
  });

  test('nav is visible', async ({ page }) => {
    await expect(page.locator('.nav')).toBeVisible();
  });

  test('Story nav link is present', async ({ page }) => {
    await expect(page.locator('.nav__links a[href="story.html"]')).toBeVisible();
  });

  test('Patent Pending nav button is visible', async ({ page }) => {
    await expect(page.locator('#patent-btn')).toBeVisible();
  });

  test('Patent Pending hero badge is visible', async ({ page }) => {
    await expect(page.locator('#patent-badge-btn')).toBeVisible();
  });

  test('no continuity-risk-stick element exists in DOM', async ({ page }) => {
    await expect(page.locator('.continuity-risk-stick')).toHaveCount(0);
  });

  test('no standalone RISK SVG text on page', async ({ page }) => {
    const riskTexts = await page.locator('svg text').allInnerTexts();
    const hasRiskVisual = riskTexts.some(t => t.trim() === 'RISK');
    expect(hasRiskVisual).toBe(false);
  });
});
