<script lang="ts">
	import { enhance } from '$app/forms';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import { Send, Scale, Clock, Shield, LogIn } from '@lucide/svelte';
	import type { ActionResult } from '@sveltejs/kit';

	let nombre = $state('');
	let consulta = $state('');
	let whatsapp = $state('');
	let notificationSystem: NotificationSystem;

	const handleCreateConsulta = () => {
		notificationSystem.notify.loading('Registrando su consulta...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(
					result.data?.message || 'Su consulta ha sido registrada exitosamente'
				);
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al registrar consulta');
			}
		};
	};
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
	<div class="bg-grid-pattern absolute inset-0 opacity-5"></div>
	<div class="relative mx-auto max-w-4xl px-4 text-center">
		<div
			class="mb-8 inline-flex items-center justify-center rounded-full bg-yellow-50 p-3 ring-1 ring-yellow-200"
		>
			<Scale class="h-8 w-8 text-yellow-600" />
		</div>

		<h1 class="mb-6 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
			Portal Privado de
			<span class="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent"
				>Consulta Jurídica</span
			>
		</h1>

		<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
			Accede a asesoramiento legal profesional exclusivo para personal autorizado. Ingresa con tus
			credenciales para hacer consultas y recibir respuestas de abogados calificados.
		</p>

		<!-- Call to Action Button -->
		<div class="mb-8">
			<a
				href="/ingresar"
				class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 px-8 py-4 font-medium text-white shadow-sm transition-all hover:from-yellow-700 hover:to-yellow-600 hover:shadow-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
			>
				<LogIn class="h-5 w-5" />
				Iniciar Sesión
			</a>
		</div>

		<!-- Features -->
		<div class="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
			<div
				class="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100"
			>
				<Clock class="h-5 w-5 text-yellow-600" />
				<span class="text-sm font-medium text-gray-700">Respuesta rápida</span>
			</div>
			<div
				class="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100"
			>
				<Shield class="h-5 w-5 text-yellow-600" />
				<span class="text-sm font-medium text-gray-700">100% Confidencial</span>
			</div>
			<div
				class="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100"
			>
				<Scale class="h-5 w-5 text-yellow-600" />
				<span class="text-sm font-medium text-gray-700">Profesional</span>
			</div>
		</div>
	</div>
</section>

<NotificationSystem bind:this={notificationSystem} />
