<script>
	let darkMode = false;
	function toggle() {
        darkMode = !darkMode;
        window.document.body.classList.toggle('dark');
    }
</script>

<button on:click={toggle}>
	{#if darkMode }
		Dark
	{:else}
		Light
	{/if}
</button>

<style>
	button {
		background: var(--bg-color);
		border: 1px solid var(--border);
		border-radius: 8px;
		color: var(--text-color);
		width: 5rem;
		height: 1.75rem;
		font-size: 12px;
		display: grid;
		place-items: center;
	}
	
	button:active {
		background: inherit;
	}
</style>