import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');

	// titulo
	await expect(page.locator('h2')).toBeVisible();

	const siguiente = await page.$('button:has-text("Siguiente")');
	expect(siguiente).not.toBeNull();

	const anterior = await page.$('button:has-text("Anterior")');
	expect(anterior).not.toBeNull();

	const isVisible = await anterior!.isVisible();
	expect(isVisible).toBeFalsy();
});
