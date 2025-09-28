<script lang="ts">
	import { enhance } from '$app/forms';
	import { X, XCircle } from '@lucide/svelte';
	import { blur } from 'svelte/transition';
	import ConfirmExitModal from '../ConfirmExitModal.svelte';

	let {
		handleDeleteConsulta,
		selectedConsulta,
		showDeleteConsultaModal = $bindable(false)
	} = $props();

	let showConfirmExit = $state(false);

	function tryClose() {
		showConfirmExit = true;
	}

	function confirmClose() {
		showConfirmExit = false;
		setTimeout(() => {
			showDeleteConsultaModal = false;
		}, 200);
	}

	function cancelClose() {
		showConfirmExit = false;
	}
</script>

{#if showDeleteConsultaModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		tabindex="0"
		transition:blur={{ duration: 300 }}
	>
		<dialog
			open
			class="relative z-50 mx-auto w-full max-w-lg rounded-lg bg-white shadow-xl"
			aria-labelledby="delete-consulta-modal-title"
			aria-describedby="delete-consulta-modal-description"
			onclick={(e) => e.stopPropagation()}
		>
			<form
				method="POST"
				action="/privado/actions/consultas?/deleteConsulta"
				use:enhance={handleDeleteConsulta}
				class="flex h-full max-h-[90dvh] flex-col overflow-hidden"
			>
				<!-- Header -->
				<header class="border-b border-gray-200 bg-white p-4 lg:p-6">
					<div class="flex items-start justify-between gap-4">
						<hgroup class="min-w-0 flex-1">
							<div class="flex items-center gap-3">
								<figure class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
									<XCircle class="h-5 w-5 text-red-600" />
								</figure>
								<div class="min-w-0 flex-1">
									<h2
										id="delete-consulta-modal-title"
										class="text-lg font-semibold text-gray-900 lg:text-xl"
									>
										Eliminar consulta
									</h2>
									<p
										id="delete-consulta-modal-description"
										class="mt-0.5 text-sm text-gray-500 lg:text-base"
									>
										¿Seguro que deseas eliminar esta consulta? Esta acción no se puede deshacer.
									</p>
								</div>
							</div>
						</hgroup>

						<button
							type="button"
							onclick={tryClose}
							class="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none lg:h-10 lg:w-10"
							aria-label="Cerrar modal de eliminar consulta"
						>
							<X class="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</header>

				<!-- Contenido -->
				<div class="flex-1 overflow-hidden p-4 lg:p-6">
					<div class="h-full max-h-[50dvh] space-y-6 overflow-y-auto px-1">
						<section class="space-y-4">
							<fieldset class="space-y-4">
								<legend class="sr-only">Información de la consulta</legend>

								<!-- ID oculto -->
								<input
									type="hidden"
									name="id_consulta"
									value={selectedConsulta?.id_consulta ?? ''}
								/>

								<!-- Nombre (solo lectura) -->
								<div class="space-y-1.5">
									<label
										for="delete-consulta-nombre"
										class="block text-sm font-medium text-gray-700"
									>
										Nombre
									</label>
									<input
										id="delete-consulta-nombre"
										type="text"
										disabled
										value={selectedConsulta?.nombre ?? ''}
										class="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
									/>
								</div>

								<!-- Mensaje (solo lectura) -->
								<div class="space-y-1.5">
									<label
										for="delete-consulta-mensaje"
										class="block text-sm font-medium text-gray-700"
									>
										Mensaje
									</label>
									<textarea
										id="delete-consulta-mensaje"
										rows="4"
										disabled
										class="w-full cursor-not-allowed resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
										>{selectedConsulta?.mensaje ?? ''}</textarea
									>
								</div>
							</fieldset>
						</section>

						<div class="h-40 md:h-16 lg:h-12"></div>
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
							class="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none lg:order-2 lg:flex-none"
							aria-label="Confirmar eliminación de consulta"
						>
							Eliminar consulta
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
