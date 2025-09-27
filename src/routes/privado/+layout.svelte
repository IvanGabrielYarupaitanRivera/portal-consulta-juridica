<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import { LogOut } from '@lucide/svelte';
	import type { ActionResult } from '@sveltejs/kit';

	let { children } = $props();

	let notificationSystem: NotificationSystem;

	const handleLogout = () => {
		notificationSystem.notify.loading('Cerrando sesión...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(result.data?.message || 'Sesión cerrada correctamente');

				await goto('/ingresar', { replaceState: true });
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al cerrar sesión');
			}
		};
	};
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<form method="POST" action="?/logout" class="w-full lg:w-auto" use:enhance={handleLogout}>
		<button
			type="submit"
			class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none lg:w-auto"
			aria-label="Cerrar sesión"
		>
			<LogOut class="h-4 w-4 text-white" />
			<span>Cerrar sesión</span>
		</button>
	</form>
</header>

<main>
	{@render children()}
</main>

<NotificationSystem bind:this={notificationSystem} />
