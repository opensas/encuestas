import { expect, test } from '@playwright/test';

test('home page has expected h3', async ({ page }) => {
	await page.goto('/encuestas/test');

	// titulo
	const titulo = page.locator('h3');
	await expect(titulo).toBeVisible();
	await expect(titulo).toContainText(/Bienvenido/);
});

test('previous button is not visible on first question', async ({ page }) => {
	await page.goto('/encuestas/test');

	// titulo
	const question = page.locator('h3');
	await expect(question).toBeVisible();
	await expect(question).toContainText(/^Bienvenido/);

	const comenzar = await page.$('button:has-text("Comenzar")');
	expect(comenzar).not.toBeNull();

	// click con Comenzar button
	await comenzar!.click();
	await page.waitForSelector('h3', { timeout: 5000 });

	// Next and Previous button should be present
	const siguiente = await page.$('button:has-text("Siguiente")');
	expect(siguiente).not.toBeNull();

	const anterior = await page.$('button:has-text("Anterior")');
	expect(anterior).not.toBeNull();

	// but previous button should be invisible
	const isVisible = await anterior!.isVisible();
	expect(isVisible).toBeFalsy();
});
