<script lang="ts">
	import '../app.css';

	import { Button } from '$lib/components/ui/button';

	import { Moon, Sun } from '@lucide/svelte/icons';

	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import EncuestasQrDialog from './qr/EncuestasQRDialog.svelte';

	type Props = { children?: import('svelte').Snippet };

	let { children }: Props = $props();
</script>

<ModeWatcher />

<EncuestasQrDialog />

<Button class="absolute top-4 right-4 z-10" size="icon" variant="outline" onclick={toggleMode}>
	<Sun
		class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>

{@render children?.()}
