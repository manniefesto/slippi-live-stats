<script>
	export let popupSettings;
	export let statsSettings;

	window.ipc.receive('popupSettingsChanged', () => {
		popupSettings = window.store.get('popupSettings');
	});
	
	window.ipc.receive('statsSettingsChanged', () => {
		statsSettings = window.store.get('statsSettings');
	});
</script>

<main>
	<h1>Popup settings</h1>
	<p>{JSON.stringify(popupSettings)}</p>
	<h1>Stats settings</h1>
	<p>{JSON.stringify(statsSettings)}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>