<script>
	import List, { Item, Text } from "@smui/list";
	import Textfield from "@smui/textfield";
	import Paper, { Title, Subtitle, Content } from "@smui/paper";
	import Slider from "@smui/slider";
	import FormField from "@smui/form-field";
	import Switch from "@smui/switch";
	import Button, { Label } from '@smui/button';

	let selection = "Slippi";

	export let slippiSettings;
	export let popupSettings;
	export let statsSettings;
	let slippiWatcherStatus = false;

	$: {
		window.ipc.send("slippiSettingsChanged", slippiSettings);
	}
	$: {
		window.ipc.send("popupSettingsChanged", popupSettings);
	}
	$: {
		window.ipc.send("statsSettingsChanged", statsSettings);
	}

	window.ipc.receive("slippiWatcherStatus", (args) => {
		slippiWatcherStatus = args;
	});

	window.ipc.receive("slippiReplayDirectoryChosen", (directory) => {
		slippiSettings.replayDir = directory;
	});

	function restartSlippiWatcher() {
		window.ipc.send("restartSlippiWatcher", null);
	}

	function chooseSlippiReplayDir() {
		window.ipc.send("selectSlippiReplayFolder", null);
	}

	function demoPopup() {
		window.ipc.send("demoPopup", null);
	}
</script>

<main>
	<nav>
		<List class="demo-list">
			<Item
				selected={selection === "Slippi"}
				on:SMUI:action={() => (selection = "Slippi")}
				><Text>Slippi</Text></Item
			>
			<Item
				selected={selection === "Popup"}
				on:SMUI:action={() => (selection = "Popup")}
				><Text>Popup</Text></Item
			>
		</List>
	</nav>
	<div class="content">
		{#if selection === "Slippi"}
			<div>
				<Button on:click={restartSlippiWatcher} variant="raised">
					<Label>Restart replay monitor</Label>
				</Button>
				<Paper variant="unelevated">
					<Title>Replay directory</Title>
					<Subtitle>
						This is the location where your slippi replays are
						stored
					</Subtitle>
					<Content>
						<Textfield
							style="width: 100%;"
							variant="outlined"
							bind:value={slippiSettings.replayDir}
							on:click={chooseSlippiReplayDir}
						/>
					</Content>
				</Paper>
			</div>
		{/if}
		{#if selection === "Popup"}
			<div>
				<Button on:click={demoPopup} variant="raised">
					<Label>Test popup</Label>
				</Button>
				<Paper variant="unelevated">
					<Title>Timeout</Title>
					<Subtitle>
						How long should the popup stay on the screen?
					</Subtitle>
					<Content>
						<FormField align="end" style="display: flex;">
							<Slider
								style="flex-grow: 1;"
								bind:value={popupSettings.timeout}
								min={1}
								max={30}
								step={1}
								discrete
								input$aria-label="Discrete slider"
							/>
							<span
								slot="label"
								style="padding-right: 12px; width: max-content; display: block; min-width: 100px;"
							>
								{popupSettings.timeout} seconds
							</span>
						</FormField>
					</Content>
				</Paper>
				<Paper variant="unelevated">
					<Title>Statistics</Title>
					<Subtitle>Which statistics should be displayed?</Subtitle>
					<Content style="display: flex; flex-direction: column;">
						<FormField>
							<Switch
								bind:checked={statsSettings.showLCancelPercent}
							/>
							<span
								slot="label"
								style="padding-right: 12px; width: max-content; display: block;"
							>
								LCancel percentage
							</span>
						</FormField>
						<FormField>
							<Switch
								bind:checked={statsSettings.showAnalogAPM}
							/>
							<span
								slot="label"
								style="padding-right: 12px; width: max-content; display: block;"
							>
								Analog APM
							</span>
						</FormField>
						<FormField>
							<Switch
								bind:checked={statsSettings.showDigitalAPM}
							/>
							<span
								slot="label"
								style="padding-right: 12px; width: max-content; display: block;"
							>
								Digital APM
							</span>
						</FormField>
					</Content>
				</Paper>
			</div>
		{/if}
	</div>
</main>

<!-- <main>
	<pre class="status">Clicked: {clicked}</pre>

	<h1>Slippi settings</h1>
	<label for="tbSlippiSettingsTimeout">Replay dir: </label>
	<input id="tbSlippiSettingsTimeout" bind:value={slippiSettings.replayDir} />
	<h1>Popup settings</h1>
	<label for="tbPopupSettingsTimeout">Timeout: </label>
	<input id="tbPopupSettingsTimeout" bind:value={popupSettings.timeout} />

	SLippi watcher status: {slippiWatcherStatus}

	<button on:click={restartSlippiWatcher}>Restart slippi watcher</button>
</main> -->
<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	main {
		display: grid;
		grid-template-columns: 200px auto;
		height: 100%;
	}

	nav {
		background-color: white;
	}

	div.content {
		overflow-y: scroll;
		padding: 8px;
	}
</style>
