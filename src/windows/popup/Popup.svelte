<script>
	import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
	import Paper, { Title, Subtitle, Content } from "@smui/paper";

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
		<Paper variant="unelevated" style="margin: 8px">
			<Title style="text-align: center"><img alt="" src="images/characters/{player.characterId}/{player.characterColor}/stock.png" style="height:50px"></Title>
			<Subtitle style="text-align: center">
				{player.displayName}
			</Subtitle>
			<Content>
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
			</Content>
		</Paper>
	{/each}
</main>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	main {
		display: flex;
		flex-direction: row;
	}

	/* Theme colors. */
	:root {
		--mdc-theme-primary: #ff3e00;
		--mdc-theme-secondary: #676778;
		--mdc-theme-background: #fff;
		--mdc-theme-surface: #fff;
		--mdc-theme-error: #b71c1c;
		--mdc-theme-on-primary: #fff;
		--mdc-theme-on-secondary: #fff;
		--mdc-theme-on-surface: #000;
		--mdc-theme-on-error: #fff;
		--mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-dark: white;
		--mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
		--mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
		--mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
		--mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);
	}

	/* Layout grid spacing. */
	:root {
		--mdc-layout-grid-margin-desktop: 24px;
		--mdc-layout-grid-gutter-desktop: 24px;
		--mdc-layout-grid-column-width-desktop: 72px;
		--mdc-layout-grid-margin-tablet: 16px;
		--mdc-layout-grid-gutter-tablet: 16px;
		--mdc-layout-grid-column-width-tablet: 72px;
		--mdc-layout-grid-margin-phone: 16px;
		--mdc-layout-grid-gutter-phone: 16px;
		--mdc-layout-grid-column-width-phone: 72px;
	}
</style>
