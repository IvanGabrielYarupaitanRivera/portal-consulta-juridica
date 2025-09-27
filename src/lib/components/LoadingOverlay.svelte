<script lang="ts">
	import { Loader } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';

	let { message }: { message: string } = $props();
</script>

<div
	class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
	role="alert"
	aria-live="polite"
	transition:fade={{ duration: 200 }}
>
	<div class="flex flex-col items-center rounded-lg p-8" transition:scale={{ duration: 300 }}>
		<Loader class="h-10 w-10 animate-spin text-white" />
		<p class="mt-4 text-center text-base font-medium text-white">{message}</p>
	</div>
</div>
