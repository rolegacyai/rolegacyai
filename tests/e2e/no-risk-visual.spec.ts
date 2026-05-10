import { test, expect } from '@playwright/test';

test.describe('No Risk Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('no continuity-risk-stick element exists', async ({ page }) => {
    await expect(page.locator('.continuity-risk-stick')).toHaveCount(0);
  });

  test('no risk-stick__spark element exists', async ({ page }) => {
    await expect(page.locator('.risk-stick__spark')).toHaveCount(0);
  });

  test('no risk-stick__fuse-glow element exists', async ({ page }) => {
    await expect(page.locator('.risk-stick__fuse-glow')).toHaveCount(0);
  });

  test('no risk-stick__tick element exists', async ({ page }) => {
    await expect(page.locator('.risk-stick__tick')).toHaveCount(0);
  });

  test('riskFusePulse keyframe is not injected into any stylesheet', async ({ page }) => {
    const found = await page.evaluate(() => {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if (rule instanceof CSSKeyframesRule && rule.name === 'riskFusePulse') return true;
          }
        } catch { /* cross-origin sheets */ }
      }
      return false;
    });
    expect(found).toBe(false);
  });

  test('riskTick keyframe is not injected into any stylesheet', async ({ page }) => {
    const found = await page.evaluate(() => {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if (rule instanceof CSSKeyframesRule && rule.name === 'riskTick') return true;
          }
        } catch { /* cross-origin sheets */ }
      }
      return false;
    });
    expect(found).toBe(false);
  });

  test('no standalone RISK text in SVG elements', async ({ page }) => {
    const svgTexts = (await page.locator('svg text').allInnerTexts()).filter(Boolean);
    const hasRisk = svgTexts.some(t => t.trim() === 'RISK');
    expect(hasRisk).toBe(false);
  });

  test('rolegacy-trust-risk-style stylesheet is not injected', async ({ page }) => {
    const el = page.locator('#rolegacy-trust-risk-style');
    await expect(el).toHaveCount(0);
  });
});
