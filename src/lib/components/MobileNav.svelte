<script lang="ts">
	import { page } from '$app/state';
	import { X } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';

	let { navLinks, mobileOpen = $bindable(false) } = $props();

	function close() {
		mobileOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			close();
		}
	}
</script>

{#if mobileOpen}
	<!-- Fondo blur con transición y cierre al hacer click o teclado -->
	<div
		class="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm lg:hidden"
		role="button"
		tabindex="0"
		aria-label="Cerrar menú"
		onclick={close}
		onkeydown={handleKeydown}
		transition:fade={{ duration: 200 }}
	></div>

	<!-- Menú deslizante desde la derecha -->
	<nav
		class="fixed top-0 right-0 bottom-0 z-20 w-4/5 max-w-sm border-l border-gray-300 bg-white shadow-2xl lg:hidden"
		transition:fly={{ x: 320, duration: 300 }}
	>
		<!-- Header con botón de cerrar -->
		<div class="flex items-center justify-between border-b border-gray-300 px-6 py-4">
			<span class="text-lg font-semibold text-gray-900">Menú</span>
			<button
				class="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
				onclick={close}
				aria-label="Cerrar menú"
			>
				<X class="h-5 w-5" />
			</button>
		</div>

		<!-- Enlaces de navegación -->
		<ul class="flex flex-col gap-1 px-4 py-4">
			{#each navLinks as { href, label }}
				<li>
					<a
						{href}
						aria-current={String(page.url.pathname) === href ? 'page' : undefined}
						class="block cursor-pointer rounded-lg px-4 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-yellow-600"
						onclick={close}
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex-1"></div>

		<!-- Footer -->
		<div class="border-t border-gray-300 px-6 py-4">
			<span class="block text-xs text-gray-500">
				© {new Date().getFullYear()} Portal de Consulta Jurídica
			</span>
		</div>
	</nav>
{/if}
