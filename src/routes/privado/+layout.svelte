<script lang="ts">
	let { children } = $props();
</script>

<div class=" flex h-screen bg-gray-50">
	<!-- Main content -->
	<div class="mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden">
		<!-- Main content area -->
		<main class=" flex-1 overflow-auto p-6">
			{@render children()}
		</main>
	</div>
</div>
