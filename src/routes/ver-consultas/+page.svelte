<script lang="ts">
	import { tiempoTranscurrido } from '$lib/utils/time.js';
	import { CheckCircle, MessageSquare, User } from '@lucide/svelte';

	let { data } = $props();
	let { consultas } = $derived(data);
</script>

<!-- Header de Consultas Respondidas -->
<header class="border-b border-gray-200 bg-white px-6 py-6">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<div class="flex items-center gap-4">
			<h1 class="text-2xl font-bold text-gray-900">Consultas Respondidas</h1>
			<div class="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 ring-1 ring-green-200">
				<CheckCircle class="h-4 w-4 text-green-600" />
				<span class="text-sm font-medium text-green-700">Consultas: {consultas.length}</span>
			</div>
		</div>
	</div>
</header>

<!-- Lista de Consultas Respondidas -->
<main class="p-6">
	{#if consultas.length === 0}
		<!-- Estado Vacío -->
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<div class="mb-4 rounded-full bg-gray-100 p-6">
				<MessageSquare class="h-12 w-12 text-gray-400" />
			</div>
			<h2 class="mb-2 text-xl font-semibold text-gray-900">No hay consultas respondidas</h2>
			<p class="text-sm text-gray-500">Las consultas respondidas aparecerán aquí</p>
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
								<time class="text-xs text-gray-500"
									>{tiempoTranscurrido(consulta.responded_at)}</time
								>
							</div>
						</div>

						<!-- Badge de Estado -->
						<div class="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-green-700">
							<CheckCircle class="h-3 w-3" />
							<span class="text-xs font-medium">Respondida</span>
						</div>
					</div>

					<!-- Contenido de la consulta -->
					<div class="mb-3">
						<p class="text-sm text-gray-700 lg:max-w-2xl lg:truncate">{consulta.mensaje}</p>
					</div>

					<!-- Respuesta -->
					<div class="rounded-lg bg-gray-50 p-4">
						<h4 class="mb-2 text-sm font-medium text-gray-900">Respuesta:</h4>
						<p class="text-sm text-gray-700">{consulta.respuesta}</p>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>
