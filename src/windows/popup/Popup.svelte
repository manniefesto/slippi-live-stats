<script>
	import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

	export let popupSettings;
	export let statsSettings;
	export let gameSettings;
	export let generatedStats;

	window.ipc.receive("popupSettingsChanged", () => {
		popupSettings = window.store.get("popupSettings");
	});

	window.ipc.receive("statsSettingsChanged", () => {
		statsSettings = window.store.get("statsSettings");
	});
</script>

<main>
	{#each gameSettings.players as player, i}
		{player.nametag}
		<DataTable style="max-width: 100%;">
			<Body>
				{#each generatedStats[i] as stat}
					<Row>
						<Cell>{stat.label}</Cell>
						<Cell>{stat.value}</Cell>
					</Row>
				{/each}
			</Body>
		</DataTable>
	{/each}
</main>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>