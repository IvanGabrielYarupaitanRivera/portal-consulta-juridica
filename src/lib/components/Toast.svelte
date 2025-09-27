<script lang="ts">
	import { CheckCircle, XCircle } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	type ToastType = 'success' | 'error';

	let { message, type = 'success' }: { message: string; type: ToastType } = $props();

	const config: Record<
		ToastType,
		{
			icon: typeof CheckCircle;
			bgColor: string;
			borderColor: string;
			textColor: string;
			iconColor: string;
		}
	> = {
		success: {
			icon: CheckCircle,
			bgColor: 'bg-green-50',
			borderColor: 'border-green-200',
			textColor: 'text-green-800',
			iconColor: 'text-green-600'
		},
		error: {
			icon: XCircle,
			bgColor: 'bg-red-50',
			borderColor: 'border-red-200',
			textColor: 'text-red-800',
			iconColor: 'text-red-600'
		}
	};

	const currentConfig = config[type];
</script>

<div
	transition:fly={{ x: 300, duration: 300 }}
	class="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl {currentConfig.bgColor} {currentConfig.borderColor} border-2 px-5 py-4 text-sm {currentConfig.textColor} shadow-xl"
	role="alert"
>
	<currentConfig.icon class="h-5 w-5 {currentConfig.iconColor}" />
	<span class="font-semibold">{message}</span>
</div>
