import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('key nav links are present on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav__links a[href="story.html"]')).toBeVisible();
    await expect(page.locator('.nav__links a[href="architecture.html"]')).toBeVisible();
    await expect(page.locator('.nav__links a[href="blog.html"]')).toBeVisible();
    await expect(page.locator('#patent-btn')).toBeVisible();
  });

  test('nav CTA says Register Interest on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav__cta')).toContainText('Register Interest');
  });

  test('nav does not contain removed items on homepage', async ({ page }) => {
    await page.goto('/');
    const navHtml = await page.locator('.nav__links').innerHTML();
    expect(navHtml).not.toContain('Founder Story');
    expect(navHtml).not.toContain('The Report');
    expect(navHtml).not.toContain('Prototype');
    expect(navHtml).not.toContain('Partner With Us');
  });

  test('Story page loads without error', async ({ page }) => {
    const response = await page.goto('/story.html');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/RolegacyAI/);
  });

  test('Architecture page loads without error', async ({ page }) => {
    const response = await page.goto('/architecture.html');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/RolegacyAI Architecture/);
  });

  test('mobile menu toggle opens nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggle = page.locator('.nav__menu-toggle');
    await toggle.click();
    await expect(page.locator('.nav__links')).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('mobile menu toggle closes nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggle = page.locator('.nav__menu-toggle');
    await toggle.click();
    await toggle.click();
    await expect(page.locator('.nav__links')).not.toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('homepage returns 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });
});
