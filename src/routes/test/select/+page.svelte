<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select/index.js';

	const fruits = [
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blackberry', label: 'Blackberry' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'cantaloupe', label: 'Cantaloupe' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'honeydew', label: 'Honeydew' },
		{ value: 'kiwi', label: 'Kiwi' },
		{ value: 'mango', label: 'Mango' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'papaya', label: 'Papaya' },
		{ value: 'peach', label: 'Peach' },
		{ value: 'pear', label: 'Pear' },
		{ value: 'pineapple', label: 'Pineapple' },
		{ value: 'plum', label: 'Plum' },
		{ value: 'raspberry', label: 'Raspberry' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blackberry', label: 'Blackberry' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'cantaloupe', label: 'Cantaloupe' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'honeydew', label: 'Honeydew' },
		{ value: 'kiwi', label: 'Kiwi' },
		{ value: 'mango', label: 'Mango' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'papaya', label: 'Papaya' },
		{ value: 'peach', label: 'Peach' },
		{ value: 'pear', label: 'Pear' },
		{ value: 'pineapple', label: 'Pineapple' },
		{ value: 'plum', label: 'Plum' },
		{ value: 'raspberry', label: 'Raspberry' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'watermelon', label: 'Watermelon' }
	];
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex flex-col space-y-2">
		<Select.Root items={fruits} portal={null} preventScroll={false}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select a fruit" />
			</Select.Trigger>
			<Select.Content side="bottom">
				<ScrollArea class="--w-48 h-60">
					<Select.Group>
						<Select.Label>Fruits</Select.Label>
						{#each fruits as fruit}
							<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
						{/each}
					</Select.Group>
				</ScrollArea>
			</Select.Content>
			<Select.Input name="favoriteFruit" />
		</Select.Root>
	</div>
</div>
