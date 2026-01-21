<script lang="ts">
	import ErrorDialog from '$lib/components/error/ErrorDialog.svelte';

	import { page } from '$app/state';
</script>

<ErrorDialog message={page?.error?.message} />
