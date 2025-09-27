<script lang="ts">
	import Toast from './Toast.svelte';
	import LoadingOverlay from './LoadingOverlay.svelte';

	type ToastType = 'success' | 'error';

	let toast = $state<{ show: boolean; message: string; type: ToastType }>({
		show: false,
		message: '',
		type: 'success'
	});

	let loading = $state<{ show: boolean; message: string }>({
		show: false,
		message: ''
	});

	const showToast = (message: string, type: ToastType): void => {
		toast = { show: true, message, type };
		setTimeout(() => (toast.show = false), 3000);
	};

	const setLoading = (show: boolean, message: string = ''): void => {
		loading = { show, message };
	};

	// Exponer funciones para el componente padre
	export const notify = {
		success: (message: string) => showToast(message, 'success'),
		error: (message: string) => showToast(message, 'error'),
		loading: (message: string) => setLoading(true, message),
		hideLoading: () => setLoading(false, '')
	};
</script>

{#if toast.show}
	<Toast message={toast.message} type={toast.type} />
{/if}

{#if loading.show}
	<LoadingOverlay message={loading.message} />
{/if}
