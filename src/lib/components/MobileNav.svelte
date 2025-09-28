<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { LogOut, X } from '@lucide/svelte';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let { navLinks, mobileOpen = $bindable(false), session = null } = $props();
	let notificationSystem: NotificationSystem;

	function close() {
		mobileOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			close();
		}
	}

	const handleLogout = () => {
		notificationSystem.notify.loading('Cerrando sesión...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(result.data?.message || 'Sesión cerrada correctamente');
				close();
				await goto('/ingresar', { replaceState: true });
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al cerrar sesión');
			}
		};
	};
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
		class="fixed top-0 right-0 bottom-0 z-40 w-4/5 max-w-sm border-l border-gray-200 bg-white shadow-2xl lg:hidden"
		transition:fly={{ x: 320, duration: 300 }}
	>
		<!-- Header con botón de cerrar -->
		<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
			<span class="text-lg font-semibold text-gray-900">Menú</span>
			<button
				class="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
				onclick={close}
				aria-label="Cerrar menú"
			>
				<X class="h-5 w-5" />
			</button>
		</div>

		<!-- Contenido principal -->
		<div class="flex h-full flex-col">
			<!-- Enlaces de navegación -->
			<ul class="flex flex-col gap-2 px-6 py-6">
				{#each navLinks as { href, label }}
					<li>
						<a
							{href}
							aria-current={String(page.url.pathname) === href ? 'page' : undefined}
							class="block cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 {page
								.url.pathname === href
								? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200'
								: 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'}"
							onclick={close}
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Botón de cerrar sesión si hay sesión -->
			{#if session}
				<div class="border-t border-gray-200 px-6 py-4">
					<form method="POST" action="/actions/users?/logout" use:enhance={handleLogout}>
						<button
							type="submit"
							class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
						>
							<LogOut class="h-5 w-5" />
							Cerrar sesión
						</button>
					</form>
				</div>
			{/if}

			<!-- Footer con copyright -->
			<div class="border-t border-gray-200 px-6 py-4">
				<span class="block text-xs text-gray-500">
					© {new Date().getFullYear()} Portal de Consulta Jurídica
				</span>
			</div>
		</div>
	</nav>
{/if}

<NotificationSystem bind:this={notificationSystem} />
