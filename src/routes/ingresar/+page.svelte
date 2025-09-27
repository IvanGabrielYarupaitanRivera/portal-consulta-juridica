<script lang="ts">
	import { enhance } from '$app/forms';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import type { ActionResult } from '@sveltejs/kit';

	let notificationSystem: NotificationSystem;

	// Login
	let loginEmail = $state('');
	let loginPassword = $state('');

	const handleLogin = () => {
		notificationSystem.notify.loading('Iniciando sesión...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(result.data?.message || 'Sesión iniciada correctamente');
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al iniciar sesión');
			}
		};
	};
</script>

<form class="grid gap-4" method="POST" use:enhance={handleLogin} action="?/login">
	<label class="block">
		<span class="text-sm text-gray-800">Correo electrónico</span>
		<input
			name="email"
			type="email"
			class="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
			bind:value={loginEmail}
			required
			autocomplete="email"
		/>
	</label>

	<label class="block">
		<span class="text-sm text-gray-800">Contraseña</span>
		<input
			name="password"
			type="password"
			class="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
			bind:value={loginPassword}
			required
			autocomplete="current-password"
		/>
	</label>

	<button
		type="submit"
		class="mt-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm disabled:opacity-60"
	>
		Ingresar
	</button>
</form>

<NotificationSystem bind:this={notificationSystem} />
