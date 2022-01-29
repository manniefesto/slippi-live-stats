<script>
	export let slippiSettings;
	export let popupSettings;
	export let statsSettings;
	let slippiWatcherStatus = false;

	$: { window.ipc.send('slippiSettingsChanged', slippiSettings); };
	$: { window.ipc.send('popupSettingsChanged', popupSettings); };
	$: { window.ipc.send('statsSettingsChanged', statsSettings); };

	window.ipc.receive('slippiWatcherStatus', (args) => {
		slippiWatcherStatus = args;
	});

</script>

<main>
	<h1>Slippi settings</h1>
	<label for="tbSlippiSettingsTimeout">Replay dir: </label>
	<input id="tbSlippiSettingsTimeout" bind:value={slippiSettings.replayDir}>
	<h1>Popup settings</h1>
	<label for="tbPopupSettingsTimeout">Timeout: </label>
	<input id="tbPopupSettingsTimeout" bind:value={popupSettings.timeout}>

	{slippiWatcherStatus}
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