<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, X, XCircle } from '@lucide/svelte';
	import { blur } from 'svelte/transition';
	import ConfirmExitModal from '../ConfirmExitModal.svelte';
	import { page } from '$app/state';
	import { PerfilDB } from '$lib/database/perfiles/db';
	import type { Perfil } from '$lib/database/perfiles/type';

	let { handleCreateConsulta, showCreateConsultaModal = $bindable(false) } = $props();
	let { data } = $derived(page);
	let { user, supabase } = $derived(data);

	let showConfirmExit = $state(false);
	let perfil: Perfil | null = $state(null);

	function tryClose() {
		showConfirmExit = true;
	}

	function confirmClose() {
		showConfirmExit = false;
		setTimeout(() => {
			showCreateConsultaModal = false;
		}, 200);
	}

	function cancelClose() {
		showConfirmExit = false;
	}

	$effect(() => {
		if (!user) {
			showCreateConsultaModal = false;
		}

		if (user) {
			(async () => {
				perfil = await PerfilDB.readPerfilById(supabase, user.id);
			})();
		} else {
			perfil = null;
		}
	});
</script>

{#if showCreateConsultaModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		tabindex="0"
		transition:blur={{ duration: 300 }}
	>
		<dialog
			open
			class="relative z-50 mx-auto w-full max-w-xl rounded-lg bg-white shadow-xl"
			aria-labelledby=" create-consulta-modal-title"
			aria-describedby=" create-consulta-modal-description"
			onclick={(e) => e.stopPropagation()}
		>
			<form
				method="POST"
				action="/privado/actions/consultas?/createConsulta"
				use:enhance={handleCreateConsulta}
				class="flex h-full max-h-[90dvh] flex-col overflow-hidden"
			>
				<!-- Header -->
				<header class="border-b border-gray-200 bg-white p-4 lg:p-6">
					<div class="flex items-start justify-between gap-4">
						<hgroup class="min-w-0 flex-1">
							<div class="flex items-center gap-3">
								<figure class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
									<Plus class="h-5 w-5 text-yellow-600" />
								</figure>
								<div class="min-w-0 flex-1">
									<h2
										id="create-consulta-modal-title"
										class="text-lg font-semibold text-gray-900 lg:text-xl"
									>
										Crear Consulta
									</h2>
									<p
										id="create-consulta-modal-description"
										class="mt-0.5 text-sm text-gray-500 lg:text-base"
									>
										Ingresa los detalles de tu consulta jurídica para enviarla a los abogados
										calificados.
									</p>
								</div>
							</div>
						</hgroup>

						<button
							type="button"
							onclick={tryClose}
							class="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none lg:h-10 lg:w-10"
							aria-label="Cerrar modal de crear consulta"
						>
							<X class="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</header>

				<!-- Contenido -->
				<div class="flex-1 overflow-hidden p-4 lg:p-6">
					<div class="h-full max-h-[60dvh] space-y-6 overflow-y-auto px-1">
						<section class="space-y-4">
							<fieldset class="space-y-4">
								<legend class="sr-only">Información de la consulta</legend>

								<!-- Nombre -->
								<div class="space-y-1.5">
									<label
										for="respond-consulta-nombre"
										class="block text-sm font-medium text-gray-700"
									>
										Nombre
									</label>
									<input
										id="respond-consulta-nombre"
										type="text"
										name="nombre"
										value={perfil?.nombres + ' ' + perfil?.apellidos}
										class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
									/>
								</div>

								<!-- WhatsApp -->
								<div class="space-y-1.5">
									<label
										for="respond-consulta-whatsapp"
										class="block text-sm font-medium text-gray-700"
									>
										WhatsApp
									</label>
									<input
										id="respond-consulta-whatsapp"
										type="text"
										name="whatsapp"
										value={perfil?.whatsapp}
										class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
									/>
								</div>

								<!-- Mensaje   -->
								<div class="space-y-1.5">
									<label
										for="respond-consulta-mensaje"
										class="block text-sm font-medium text-gray-700"
									>
										Mensaje
									</label>
									<textarea
										id="respond-consulta-mensaje"
										name="mensaje"
										rows="4"
										required
										class="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700"
										placeholder="Describe tu situación legal o pregunta. Incluye todos los detalles relevantes para recibir la mejor asesoría..."
									></textarea>
								</div>
							</fieldset>
						</section>
					</div>
				</div>

				<!-- Footer -->
				<footer class="border-t border-gray-200 bg-gray-50 p-4 lg:p-6">
					<div class="flex flex-col gap-3 lg:flex-row lg:justify-end">
						<button
							type="button"
							onclick={tryClose}
							class="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none lg:order-1 lg:flex-none"
						>
							Cancelar
						</button>

						<button
							type="submit"
							class="flex-1 cursor-pointer rounded-lg bg-yellow-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none lg:order-2 lg:flex-none"
							aria-label="Crear consulta"
						>
							Crear Consulta
						</button>
					</div>
				</footer>
			</form>
		</dialog>
	</div>

	{#if showConfirmExit}
		<ConfirmExitModal onConfirm={confirmClose} onCancel={cancelClose} />
	{/if}
{/if}
