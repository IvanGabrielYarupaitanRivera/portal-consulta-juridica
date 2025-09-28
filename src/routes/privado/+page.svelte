<script lang="ts">
	import { Clock, CheckCircle, MessageSquare, Search, Filter, User, Phone } from '@lucide/svelte';

	let { data } = $props();
	let { consultas } = data;

	let filtro = $state('todas');
	let busqueda = $state('');
	let consultaSeleccionada = $state(null);
	let modalAbierto = $state(false);
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
				<span class="text-sm font-medium text-yellow-700"
					>Consultas Pendientes: {consultas.length}</span
				>
			</div>
		</div>

		<!-- Filtros y Búsqueda -->
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
			<div class="relative flex items-center">
				<Search class="absolute left-3 h-4 w-4 text-gray-400" />
				<input
					type="text"
					placeholder="Buscar por nombre o contenido..."
					bind:value={busqueda}
					class="cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
				/>
			</div>

			<div class="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
				<button
					onclick={() => (filtro = 'todas')}
					class="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors {filtro ===
					'todas'
						? 'bg-white text-gray-900 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					Todas
				</button>
				<button
					onclick={() => (filtro = 'pendientes')}
					class="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors {filtro ===
					'pendientes'
						? 'bg-white text-gray-900 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					Pendientes
				</button>
				<button
					onclick={() => (filtro = 'respondidas')}
					class="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors {filtro ===
					'respondidas'
						? 'bg-white text-gray-900 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					Respondidas
				</button>
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
		<!-- Lista de Consultas Unificada -->
		<div class="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
			{#each consultas as consulta}
				<!-- Mobile Card / Desktop Row -->
				<div
					class="border-b border-gray-200 p-4 transition-colors last:border-b-0 hover:bg-gray-50 lg:table-row lg:p-0"
				>
					<!-- Mobile Layout -->
					<div class="lg:hidden">
						<!-- Header Mobile -->
						<div class="mb-3 flex items-start justify-between">
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
									<User class="h-5 w-5 text-gray-600" />
								</div>
								<div>
									<h3 class="font-medium text-gray-900">{consulta.nombre}</h3>
									<time class="text-xs text-gray-500">hace 2 horas</time>
								</div>
							</div>

							<!-- Estado Badge Mobile -->
							<div
								class="flex items-center gap-1 rounded-full px-2 py-1 {consulta.estado ===
								'Pendiente'
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

						<!-- Contenido Mobile -->
						<div class="mb-3">
							<p class="line-clamp-3 text-sm text-gray-700">{consulta.mensaje}</p>
						</div>

						<!-- WhatsApp Mobile -->
						{#if consulta.whatsapp}
							<div class="mb-3 flex items-center gap-2 rounded-md bg-gray-50 p-2">
								<Phone class="h-4 w-4 text-gray-500" />
								<span class="text-sm text-gray-700">{consulta.whatsapp}</span>
							</div>
						{/if}

						<!-- Acción Mobile -->
						<button
							onclick={() => {
								consultaSeleccionada = consulta;
								modalAbierto = true;
							}}
							class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
						>
							<MessageSquare class="h-4 w-4" />
							Responder
						</button>
					</div>

					<!-- Desktop Layout (Table Cells) -->
					<div class="hidden lg:table-cell lg:px-6 lg:py-4">
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
								<User class="h-4 w-4 text-gray-600" />
							</div>
							<span class="font-medium text-gray-900">{consulta.nombre}</span>
						</div>
					</div>

					<div class="hidden lg:table-cell lg:max-w-xs lg:px-6 lg:py-4">
						<p class="truncate text-sm text-gray-700">{consulta.mensaje}</p>
					</div>

					<div class="hidden lg:table-cell lg:px-6 lg:py-4">
						{#if consulta.whatsapp}
							<div class="flex items-center gap-2">
								<Phone class="h-4 w-4 text-gray-500" />
								<span class="text-sm text-gray-700">{consulta.whatsapp}</span>
							</div>
						{:else}
							<span class="text-sm text-gray-500">No disponible</span>
						{/if}
					</div>

					<div class="hidden lg:table-cell lg:px-6 lg:py-4">
						<div
							class="inline-flex items-center gap-1 rounded-full px-2 py-1 {consulta.estado ===
							'Pendiente'
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

					<div class="hidden lg:table-cell lg:px-6 lg:py-4">
						<time class="text-sm text-gray-500">hace 2 horas</time>
					</div>

					<div class="hidden lg:table-cell lg:px-6 lg:py-4">
						<button
							onclick={() => {
								consultaSeleccionada = consulta;
								modalAbierto = true;
							}}
							class="inline-flex cursor-pointer items-center gap-2 rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
						>
							<MessageSquare class="h-4 w-4" />
							Responder
						</button>
					</div>
				</div>
			{/each}

			<!-- Desktop Table Header (Hidden on Mobile) -->
			<div class="hidden bg-gray-50 lg:table-header-group">
				<div class="lg:table-row">
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						Consultante
					</div>
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						Consulta
					</div>
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						WhatsApp
					</div>
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						Estado
					</div>
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						Fecha
					</div>
					<div
						class="lg:table-cell lg:px-6 lg:py-3 lg:text-left lg:text-xs lg:font-medium lg:tracking-wider lg:text-gray-500 lg:uppercase"
					>
						Acciones
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
