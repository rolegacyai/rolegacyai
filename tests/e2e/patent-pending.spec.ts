import { test, expect } from '@playwright/test';

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
      const t = msg.type();
      if (t === 'error') console.error('[browser error]', msg.text());
      else console.log(`[browser ${t}]`, msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('DIAG: JS execution and element state', async ({ page }) => {
    const state = await page.evaluate(() => {
      const modal = document.getElementById('patent-modal') as HTMLElement | null;
      const btn   = document.getElementById('patent-btn')   as HTMLElement | null;

      const beforeHidden = modal?.hidden;
      if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      const afterHidden = modal?.hidden;
      if (modal && !afterHidden) modal.hidden = true;

      return {
        langStyleInjected:   !!document.getElementById('rolegacy-language-style'),
        langSwitcherInDOM:   !!document.querySelector('.language-switcher'),
        patentBtnInDOM:      !!btn,
        patentBadgeBtnInDOM: !!document.getElementById('patent-badge-btn'),
        patentModalInDOM:    !!modal,
        modalHiddenBefore:   beforeHidden,
        modalHiddenAfter:    afterHidden,
        listenerAttached:    typeof beforeHidden === 'boolean' && typeof afterHidden === 'boolean'
                             && beforeHidden && !afterHidden,
        dataLayer:           Array.isArray((window as any).dataLayer),
        gtagType:            typeof (window as any).gtag,
        htmlLang:            document.documentElement.lang,
        scriptTags:          Array.from(document.scripts).map(s => s.src || '(inline)'),
      };
    });

    console.log('[DIAG] page state:\n' + JSON.stringify(state, null, 2));

    expect(state.patentBtnInDOM,   'patent-btn must exist').toBe(true);
    expect(state.patentModalInDOM, 'patent-modal must exist').toBe(true);
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
