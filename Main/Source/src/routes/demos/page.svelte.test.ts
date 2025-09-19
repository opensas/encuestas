import { page } from '@vitest/browser/context';

import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render Card.Title', async () => {
		render(Page);

		// see: https://vitest.dev/guide/browser/context.html#page
		// see: https://vitest.dev/guide/browser/locators
		const title = page.getByText('Demos');
		await expect.element(title).toBeInTheDocument();
	});
});
