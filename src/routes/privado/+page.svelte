<script lang="ts">
	import DeleteConsultaModal from '$lib/components/modals/consultas/DeleteConsultaModal.svelte';
	import { Clock, CheckCircle, MessageSquare, User, Phone, Trash2, Plus } from '@lucide/svelte';

	import type { ActionResult } from '@sveltejs/kit';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import type { GetConsulta } from '$lib/database/consultas/type.js';
	import ResponderConsultaModal from '$lib/components/modals/consultas/ResponderConsultaModal.svelte';
	import { tiempoTranscurrido } from '$lib/utils/time.js';
	import CreateConsultaModal from '$lib/components/modals/consultas/CreateConsultaModal.svelte';

	let { data } = $props();
	let { consultas, rol } = $derived(data);
	let showDeleteConsultaModal = $state(false);
	let showResponderConsultaModal = $state(false);
	let showCreateConsultaModal = $state(false);
	let notificationSystem: NotificationSystem;
	let selectedConsulta: GetConsulta | undefined = $state(undefined);

	const handleAction = (
		action: 'showDeleteConsultaModal' | 'showResponderConsultaModal' | 'showCreateConsultaModal',
		consulta?: GetConsulta
	) => {
		switch (action) {
			case 'showDeleteConsultaModal':
				showDeleteConsultaModal = true;
				selectedConsulta = consulta;
				break;

			case 'showCreateConsultaModal':
				showCreateConsultaModal = true;
				break;

			case 'showResponderConsultaModal':
				showResponderConsultaModal = true;
				selectedConsulta = consulta;
				break;
		}
	};

	const handleDeleteConsulta = () => {
		notificationSystem.notify.loading('Eliminando consulta...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(
					result.data?.message || 'Consulta eliminada exitosamente'
				);

				showDeleteConsultaModal = false;
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al eliminar la consulta');
			}
		};
	};

	const handleResponderConsulta = () => {
		notificationSystem.notify.loading('Enviando respuesta...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(result.data?.message || 'Respuesta enviada exitosamente');

				showResponderConsultaModal = false;
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al enviar la respuesta');
			}
		};
	};

	const handleCreateConsulta = () => {
		notificationSystem.notify.loading('Creando su consulta...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(
					result.data?.message || 'Su consulta ha sido creada exitosamente'
				);

				showCreateConsultaModal = false;
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al crear la consulta');
			}
		};
	};
</script>

<!-- Header de la Bandeja -->
<header class="border-b border-gray-200 bg-white px-6 py-6">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<div class="flex items-center gap-4">
			<h1 class="text-2xl font-bold text-gray-900">Bandeja de Entrada</h1>
			<div class="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 ring-1 ring-green-200">
				<Clock class="h-4 w-4 text-green-600" />
				<span class="text-sm font-medium text-green-700">Consultas: {consultas.length}</span>
			</div>
		</div>
		<div>
			<button
				class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
				onclick={() => {
					handleAction('showCreateConsultaModal');
				}}
			>
				<Plus class="h-4 w-4" />
				Realizar Consulta
			</button>
		</div>
	</div>
</header>

<!-- Lista de Consultas -->
<main class="py-4">
	{#if consultas.length === 0}
		<!-- Estado Vacío -->
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<div class="mb-4 rounded-full bg-gray-100 p-6">
				<MessageSquare class="h-12 w-12 text-gray-400" />
			</div>
			<h2 class="mb-2 text-xl font-semibold text-gray-900">No hay consultas</h2>
			<p class="text-sm text-gray-500">Las nuevas consultas aparecerán aquí</p>
		</div>
	{:else}
		<!-- Lista de Consultas Adaptable -->
		<div class="space-y-4">
			{#each consultas as consulta}
				<article
					class="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
				>
					<!-- Header de la consulta -->
					<header class="mb-4 flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
								<User class="h-5 w-5 text-gray-600" />
							</div>
							<div class="min-w-0 flex-1">
								<h3 class="font-semibold text-gray-900">{consulta.nombre}</h3>
								<div class="mt-1 flex items-center gap-2">
									<time class="text-xs text-gray-500"
										>{tiempoTranscurrido(consulta.created_at)}</time
									>
									{#if consulta.whatsapp}
										<div
											class="flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 ring-1 ring-green-200"
										>
											<Phone class="h-3 w-3 text-green-600" />
											<span class="text-xs font-medium text-green-700">{consulta.whatsapp}</span>
										</div>
									{/if}
								</div>
							</div>
						</div>

						<!-- Badge de Estado Mejorado -->
						<div
							class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 ring-1 {consulta.estado ===
							'Pendiente'
								? 'bg-amber-50 text-amber-800 ring-amber-200'
								: 'bg-emerald-50 text-emerald-800 ring-emerald-200'}"
						>
							{#if consulta.estado === 'Pendiente'}
								<Clock class="h-4 w-4" />
								<span class="text-sm font-semibold">Pendiente</span>
							{:else}
								<CheckCircle class="h-4 w-4" />
								<span class="text-sm font-semibold">Respondida</span>
							{/if}
						</div>
					</header>

					<!-- Contenido Principal -->
					<main class="space-y-4">
						<!-- Consulta Original -->
						<section>
							<h4 class="mb-2 text-sm font-medium text-gray-900">Consulta:</h4>
							<div class="rounded-lg bg-gray-50 p-3">
								<p class="text-sm text-gray-700">{consulta.mensaje}</p>
							</div>
						</section>

						<!-- Respuesta (si existe) -->
						{#if consulta.respuesta}
							<section>
								<h4 class="mb-2 text-sm font-medium text-gray-900">Respuesta:</h4>
								<div class="rounded-lg bg-yellow-50 p-3 ring-1 ring-yellow-200">
									<p class="text-sm text-gray-700">{consulta.respuesta}</p>
								</div>
							</section>
						{/if}
					</main>

					<!-- Footer: Información de contacto y acciones -->
					<footer class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<!-- Acciones -->
						<div class="flex gap-2 sm:flex-row">
							{#if rol === 'Abogado' || rol === 'Administrador'}
								<button
									class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700 sm:w-auto"
									onclick={() => {
										handleAction('showResponderConsultaModal', consulta);
									}}
								>
									<MessageSquare class="h-4 w-4" />
									{consulta.respuesta ? 'Editar Respuesta' : 'Responder'}
								</button>
							{/if}

							{#if rol === 'Administrador'}
								<button
									class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:w-auto"
									onclick={() => {
										handleAction('showDeleteConsultaModal', consulta);
									}}
								>
									<Trash2 class="h-4 w-4" />
									Eliminar
								</button>
							{/if}
						</div>
					</footer>
				</article>
			{/each}
		</div>
	{/if}
</main>

<!-- Modal para eliminar consulta -->
<DeleteConsultaModal bind:showDeleteConsultaModal {handleDeleteConsulta} {selectedConsulta} />

<!-- Modal para crear consultas -->
<CreateConsultaModal bind:showCreateConsultaModal {handleCreateConsulta} />

<!-- Modal para responder consulta -->
<ResponderConsultaModal
	bind:showResponderConsultaModal
	{selectedConsulta}
	{handleResponderConsulta}
/>

<NotificationSystem bind:this={notificationSystem} />
