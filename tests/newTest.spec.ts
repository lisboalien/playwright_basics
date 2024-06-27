import { test, expect } from '@playwright/test';

test('has title image', async ({ page }) => {
    await page.goto('https://www.debugbear.com/test/website-speed');

    // Expect a title "to contain" a substring.
    await expect(page.getByRole('link', { name: 'DebugBear logo DebugBear' })).toBeVisible();
});

test('start test of a page', async ({ page }) => {
    await page.goto('https://www.debugbear.com/test/website-speed');

    // Click the Test History button
    await page.getByPlaceholder('https://web.dev').fill('https://web.dev');

    await page.getByRole('button', { name: 'Start Test' }).click();

    await page.pause();

    // See if the page opened
    await expect(page.getByText('Testing https://web.dev')).toBeVisible();
});