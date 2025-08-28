<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Content, Description, Footer, Header, Root, Title } from '$lib/components/ui/dialog';

	let { title = 'ERROR', message = 'Error desconocido' } = $props();
</script>

<Root open>
	<Content class="max-w-[calc(100%-2rem)]  sm:max-w-lg">
		<Header>
			<Title>{title}</Title>
			<Description>{message}</Description>
		</Header>
		<Footer class="flex sm:justify-center">
			<Button>Ok</Button>
		</Footer>
	</Content>
</Root>
