<script lang="ts">
	import DeleteConsultaModal from '$lib/components/modals/consultas/DeleteConsultaModal.svelte';
	import { Clock, CheckCircle, MessageSquare, User, Phone, Trash2 } from '@lucide/svelte';

	import type { ActionResult } from '@sveltejs/kit';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import type { GetConsulta } from '$lib/database/consultas/type.js';

	let { data } = $props();
	let { consultas } = data;
	let showDeleteConsultaModal = $state(false);
	let notificationSystem: NotificationSystem;
	let selectedConsulta: GetConsulta | undefined = $state(undefined);

	const handleAction = (action: 'showDeleteConsultaModal', consulta?: GetConsulta) => {
		switch (action) {
			case 'showDeleteConsultaModal':
				showDeleteConsultaModal = true;
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

	export function tiempoTranscurrido(created_at: string | null | undefined): string {
		if (!created_at) return 'Fecha desconocida';

		const ahora = new Date();
		const fechaCreacion = new Date(created_at);
		const diferenciaMilisegundos = ahora.getTime() - fechaCreacion.getTime();

		const minutos = Math.floor(diferenciaMilisegundos / (1000 * 60));
		const horas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
		const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

		if (minutos < 1) return 'hace un momento';
		if (minutos < 60) return `hace ${minutos} minuto${minutos === 1 ? '' : 's'}`;
		if (horas < 24) return `hace ${horas} hora${horas === 1 ? '' : 's'}`;
		if (dias < 7) return `hace ${dias} día${dias === 1 ? '' : 's'}`;

		return fechaCreacion.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			year: fechaCreacion.getFullYear() !== ahora.getFullYear() ? 'numeric' : undefined
		});
	}
</script>

<!-- Header de la Bandeja -->
<header class="border-b border-gray-200 bg-white px-6 py-6">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<div class="flex items-center gap-4">
			<h1 class="text-2xl font-bold text-gray-900">Bandeja de Entrada</h1>
			<div
				class="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 ring-1 ring-yellow-200"
			>
				<Clock class="h-4 w-4 text-yellow-600" />
				<span class="text-sm font-medium text-yellow-700">Consultas: {consultas.length}</span>
			</div>
		</div>
	</div>
</header>

<!-- Lista de Consultas -->
<main class="p-6">
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
					class="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
				>
					<!-- Header de la consulta -->
					<div class="mb-3 flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
								<User class="h-5 w-5 text-gray-600" />
							</div>
							<div>
								<h3 class="font-medium text-gray-900">{consulta.nombre}</h3>
								<time class="text-xs text-gray-500">{tiempoTranscurrido(consulta.created_at)}</time>
							</div>
						</div>

						<!-- Badge de Estado -->
						<div
							class="flex items-center gap-1 rounded-full px-2 py-1 {consulta.estado === 'Pendiente'
								? 'bg-yellow-50 text-yellow-700'
								: 'bg-green-50 text-green-700'}"
						>
							{#if consulta.estado === 'Pendiente'}
								<Clock class="h-3 w-3" />
								<span class="text-xs font-medium">Pendiente</span>
							{:else}
								<CheckCircle class="h-3 w-3" />
								<span class="text-xs font-medium">Respondida</span>
							{/if}
						</div>
					</div>

					<!-- Contenido de la consulta -->
					<div class="mb-3">
						<p class="text-sm text-gray-700 lg:max-w-2xl lg:truncate">{consulta.mensaje}</p>
					</div>

					<!-- Información de contacto y acción -->
					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<!-- WhatsApp -->
						<div class="flex items-center gap-2">
							{#if consulta.whatsapp}
								<div class="flex items-center gap-2 rounded-md bg-green-50 px-2 py-1">
									<Phone class="h-4 w-4 text-green-500" />
									<span class="text-sm text-green-700">{consulta.whatsapp}</span>
								</div>
							{:else}
								<span class="text-sm text-green-500">Sin WhatsApp</span>
							{/if}
						</div>

						<!-- Acción -->
						<div class="flex gap-2 sm:flex-row">
							<button
								class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700 sm:w-auto"
							>
								<MessageSquare class="h-4 w-4" />
								Responder
							</button>

							<button
								class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:w-auto"
								onclick={() => {
									handleAction('showDeleteConsultaModal', consulta);
								}}
							>
								<Trash2 class="h-4 w-4" />
								Eliminar
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>

<!-- Modal para eliminar consulta -->
<DeleteConsultaModal bind:showDeleteConsultaModal {handleDeleteConsulta} {selectedConsulta} />

<NotificationSystem bind:this={notificationSystem} />
