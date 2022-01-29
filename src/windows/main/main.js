import App from './Main.svelte';

const app = new App({
	target: document.body,
	props: {
		slippiSettings: window.store.get('slippiSettings'),
		popupSettings: window.store.get('popupSettings'),
		statsSettings: window.store.get('statsSettings')
	}
});

export default app;