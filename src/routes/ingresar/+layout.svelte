<script lang="ts">
	let { children } = $props();
</script>

<header>
	<nav>
		<a href="/">Inicio</a>
	</nav>
</header>

{@render children?.()}
