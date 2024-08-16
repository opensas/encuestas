<script lang="ts">
	import { Encuesta, encuesta02 } from '$lib/components/encuesta';

	function onsave(encuesta: import('$lib/types').Encuesta) {
		console.log('!encuesta saved!!!', { encuesta });
	}
</script>

<div class="my-20 flex h-screen items-center justify-center px-10">
	<Encuesta encuesta={encuesta02} {onsave} />
</div>
