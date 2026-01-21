import { expect, test } from '@playwright/test';

test('home page has expected h3', async ({ page }) => {
	await page.goto('/demos/encuestas/test');

	// titulo
	const titulo = page.locator('h1');
	await expect(titulo).toBeVisible();
	await expect(titulo).toContainText(/Bienvenido/);
});

test('previous button is not visible on first question', async ({ page }) => {
	await page.goto('/demos/encuestas/test');

	// titulo
	const question = page.locator('h1');
	await expect(question).toBeVisible();
	await expect(question).toContainText(/^Bienvenido/);

	// Use locator instead of elementHandle for better reliability
	const comenzar = page.locator('button:has-text("Comenzar")');
	await expect(comenzar).toBeVisible();

	// click con Comenzar button
	await comenzar.click();
	await page.waitForSelector('h2', { timeout: 5000 });

	// Next and Previous button should be present
	const siguiente = page.locator('button:has-text("Siguiente")');
	await expect(siguiente).toBeVisible();

	const anterior = page.locator('button:has-text("Anterior")');
	await expect(anterior).toBeAttached();

	// but previous button should be invisible
	await expect(anterior).not.toBeVisible();
});
