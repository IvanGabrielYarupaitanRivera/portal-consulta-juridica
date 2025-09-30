<script lang="ts">
	let { children } = $props();
</script>

<!-- Main content -->
<div class="bg-gray-50">
	<div class="mx-auto flex max-w-7xl flex-1">
		<!-- Main content area -->
		<main class=" flex-1 overflow-auto p-6">
			{@render children()}
		</main>
	</div>
</div>
