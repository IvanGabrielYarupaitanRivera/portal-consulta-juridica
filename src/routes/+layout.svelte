<script lang="ts">
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { LogOut, Menu } from '@lucide/svelte';
	import Seo from '$lib/components/SEO.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import logo from '$lib/assets/logo.svg';
	import NotificationSystem from '$lib/components/NotificationSystem.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let mobileOpen = $state(false);
	let notificationSystem: NotificationSystem;

	const navLinks = $derived([
		{ href: '/', label: 'Inicio' },
		...(session ? [{ href: '/privado', label: 'Bandeja de entrada' }] : []),
		...(!session ? [{ href: '/ingresar', label: 'Ingresar' }] : [])
	]);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	const handleLogout = () => {
		notificationSystem.notify.loading('Cerrando sesión...');

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();
			notificationSystem.notify.hideLoading();

			if (result.type === 'success') {
				notificationSystem.notify.success(result.data?.message || 'Sesión cerrada correctamente');

				await goto('/ingresar', { replaceState: true });
			} else if (result.type === 'failure') {
				notificationSystem.notify.error(result.data?.message || 'Error al cerrar sesión');
			}
		};
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

<!-- Componente SEO -->
<Seo />

<header class="sticky top-0 z-30 w-full border-b border-gray-100 bg-white shadow-sm">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-6">
		<a href="/" class="flex cursor-pointer items-center gap-3">
			<img src={logo} alt="Logo" class="h-12 w-auto" />

			<div class="hidden sm:block">
				<h1 class="text-lg font-bold text-gray-900">Portal Jurídico</h1>
				<p class="text-xs text-gray-600">Consulta Legal</p>
			</div>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-6 lg:flex">
			<ul class="flex items-center gap-8">
				{#each navLinks as { href, label }}
					<li>
						<a
							{href}
							aria-current={String(page.url.pathname) === href ? 'page' : undefined}
							class="relative cursor-pointer px-4 py-2 font-medium text-gray-700 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-500 after:transition-all after:duration-200 hover:text-yellow-600 hover:after:w-full"
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>

			{#if session}
				<form method="POST" action="/actions/users?/logout" use:enhance={handleLogout}>
					<button
						type="submit"
						class="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
					>
						<LogOut class="h-4 w-4" />
						Cerrar sesión
					</button>
				</form>
			{/if}
		</div>

		<!-- Mobile menu button -->
		<button
			class="cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
			onclick={toggleMobile}
			aria-label="Abrir menú"
		>
			<Menu class="h-6 w-6" />
		</button>
	</nav>

	<MobileNav {navLinks} bind:mobileOpen {session} />
</header>

<main>
	{@render children?.()}
</main>

<footer class="mt-12 w-full border-t border-gray-300 bg-black">
	<div
		class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 py-8 lg:flex-row lg:py-12"
	>
		<div class="text-center lg:text-left">
			<p class="text-sm text-gray-400">
				&copy; {new Date().getFullYear()} Portal de Consulta Jurídica. Todos los derechos reservados.
			</p>
			<p class="mt-1 text-xs text-gray-500">Asesoramiento legal rápido y accesible para todos.</p>
		</div>

		<nav class="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
			<div class="flex gap-6">
				<a
					href="/"
					class="cursor-pointer text-sm text-gray-400 transition-colors hover:text-yellow-500"
					>Inicio</a
				>
				<a
					href="/#consulta"
					class="cursor-pointer text-sm text-gray-400 transition-colors hover:text-yellow-500"
					>Consulta</a
				>
			</div>
			<div class="h-px w-12 bg-gray-600 lg:h-4 lg:w-px"></div>
			<p class="text-xs text-gray-500">Hecho con ❤️ en Perú</p>
		</nav>
	</div>
</footer>

<NotificationSystem bind:this={notificationSystem} />
