<script>
	import { AlertTriangle } from '@lucide/svelte';
	import { blur } from 'svelte/transition';

	let { onConfirm, onCancel } = $props();
</script>

<div
	class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
	role="dialog"
	aria-modal="true"
	tabindex="0"
	transition:blur={{ duration: 300 }}
>
	<dialog
		open
		class="relative z-[60] mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Ícono de advertencia -->
		<figure class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
			<AlertTriangle class="h-6 w-6 text-red-600" />
		</figure>

		<!-- Contenido -->
		<div class="text-center">
			<h3 class="mb-2 text-lg font-semibold text-gray-900">¿Descartar cambios?</h3>
			<p class="mb-6 text-sm text-gray-600">
				Los datos ingresados se perderán si sales sin guardar.
			</p>

			<!-- Botones -->
			<div class="flex gap-3">
				<button
					type="button"
					onclick={onCancel}
					class="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					Continuar editando
				</button>
				<button
					type="button"
					onclick={onConfirm}
					class="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
				>
					Descartar
				</button>
			</div>
		</div>
	</dialog>
</div>
