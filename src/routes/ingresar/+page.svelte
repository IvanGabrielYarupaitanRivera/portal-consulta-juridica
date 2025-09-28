<script lang="ts">
	import { enhance } from '$app/forms';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import { User } from '@lucide/svelte';
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

<div class="mx-auto mt-12 max-w-md">
	<div class="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
		<!-- Header -->
		<div class="bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-6 text-center">
			<div
				class="mb-4 inline-flex items-center justify-center rounded-full bg-yellow-100 p-3 ring-1 ring-yellow-200"
			>
				<User class="h-6 w-6 text-yellow-600" />
			</div>
			<h1 class="text-xl font-bold text-gray-900">Acceso Profesional</h1>
			<p class="mt-1 text-sm text-gray-700">Ingresa a tu panel de consultas</p>
		</div>

		<!-- Form -->
		<div class="px-6 py-8">
			<form class="space-y-6" method="POST" use:enhance={handleLogin} action="?/login">
				<div class="space-y-2">
					<label for="email" class="block text-sm font-medium text-gray-800">
						Correo electrónico
					</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={loginEmail}
						required
						autocomplete="email"
						class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
						placeholder="ejemplo@correo.com"
					/>
				</div>

				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium text-gray-800"> Contraseña </label>
					<input
						id="password"
						name="password"
						type="password"
						bind:value={loginPassword}
						required
						autocomplete="current-password"
						class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
						placeholder="••••••••"
					/>
				</div>

				<button
					type="submit"
					class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 font-medium text-white shadow-sm transition-all hover:from-yellow-700 hover:to-yellow-600 hover:shadow-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
					Ingresar al Sistema
				</button>
			</form>
		</div>
	</div>
</div>

<NotificationSystem bind:this={notificationSystem} />
