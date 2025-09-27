<script lang="ts">
	import { enhance } from '$app/forms';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import { Send, Scale, Clock, Shield } from '@lucide/svelte';
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
			Consulta Jurídica
			<span class="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent"
				>Rápida</span
			>
		</h1>

		<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
			Obtén asesoramiento legal profesional en minutos. Sin registro, sin complicaciones, solo
			respuestas claras a tus consultas jurídicas.
		</p>

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

<!-- Chat Interface -->
<section class="mx-auto max-w-4xl px-4 py-12">
	<!-- Chat Container -->
	<div
		class="overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-xl ring-1 ring-yellow-200"
	>
		<!-- Chat Header -->
		<div class="border-b border-yellow-200 bg-gradient-to-r from-yellow-100 to-yellow-50 px-6 py-4">
			<h2 class="text-lg font-semibold text-gray-900">Asistente Legal Virtual</h2>
			<p class="text-sm text-gray-700">Ingresa tus datos y consulta para comenzar</p>
		</div>

		<!-- Form Area -->
		<div class="border-t border-yellow-200 bg-gradient-to-b from-yellow-50 to-white p-6">
			<form
				class="space-y-4"
				method="POST"
				use:enhance={handleCreateConsulta}
				action="?/createConsulta"
			>
				<div class="grid gap-4 sm:grid-cols-2">
					<!-- Nombre -->
					<div class="space-y-2">
						<label for="nombre" class="block text-sm font-medium text-gray-800">
							Nombre completo
						</label>
						<input
							id="nombre"
							type="text"
							bind:value={nombre}
							required
							name="nombre"
							class="block w-full cursor-pointer rounded-lg border border-yellow-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
							placeholder="Ingresa tu nombre"
						/>
					</div>

					<!-- WhatsApp -->
					<div class="space-y-2">
						<label for="whatsapp" class="block text-sm font-medium text-gray-800">WhatsApp</label>
						<input
							id="whatsapp"
							name="whatsapp"
							type="tel"
							bind:value={whatsapp}
							required
							class="block w-full cursor-pointer rounded-lg border border-yellow-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
							placeholder="999999999"
						/>
					</div>
				</div>

				<!-- Consulta -->
				<div class="space-y-2">
					<label for="consulta" class="block text-sm font-medium text-gray-800">
						Tu consulta jurídica
					</label>
					<textarea
						id="consulta"
						bind:value={consulta}
						required
						name="mensaje"
						rows="4"
						class="block w-full cursor-pointer resize-none rounded-lg border border-yellow-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
						placeholder="Describe tu situación legal o pregunta. Incluye todos los detalles relevantes para recibir la mejor asesoría..."
					></textarea>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 font-medium text-white shadow-sm transition-all hover:from-yellow-700 hover:to-yellow-600 hover:shadow-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none"
				>
					<Send class="h-5 w-5" />
					Enviar Consulta
				</button>
			</form>
		</div>
	</div>
</section>

<NotificationSystem bind:this={notificationSystem} />
