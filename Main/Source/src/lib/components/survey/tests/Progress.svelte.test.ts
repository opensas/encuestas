import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Progress from '../Progress.svelte';

describe('Progress.svelte component', () => {
	it('should render Progress component', async () => {
		const props = $state({ current: 0, total: 5 });

		const progress = render(Progress, props);
		const bar = progress.container.querySelector('.bg-primary');

		await expectBar(bar, '0 / 5', '0% completado', 0);

		props.current = 1;
		await expectBar(bar, '1 / 5', '20% completado', 20);

		props.current = 5;
		await expectBar(bar, '5 / 5', '100% completado', 100);

		props.total = 10;
		await expectBar(bar, '5 / 10', '50% completado', 50);

		// edge case, total is zero
		props.total = 0;
		await expectBar(bar, '5 / 0', '0% completado', 0);

		// edge cases, current > total
		props.current = 10;
		props.total = 5;
		await expectBar(bar, '10 / 5', '200% completado', 200);
	});
});

async function expectBar(
	barEl: Element | null,
	xyText: string,
	percentageText: string,
	percentage: number
) {
	const xyElement = page.getByText(xyText, { exact: true });
	await expect.element(xyElement).toBeInTheDocument();

	const percentageElement = page.getByText(percentageText, { exact: true });
	await expect.element(percentageElement).toBeInTheDocument();

	expect(barEl).not.toBeNull();

	// if percentage is grater than 0, the bar removes the transform style attribute, the whole var is painted with bg-primary
	const translate = percentage > 100 ? '' : `translateX(${percentage - 100}%)`;
	expect((barEl as HTMLElement).style.transform).toBe(translate);
}
