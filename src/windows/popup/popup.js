import App from './Popup.svelte';

const app = new App({
	target: document.body,
	props: {
		popupSettings: window.store.get('popupSettings'),
		statsSettings: window.store.get('statsSettings'),
		gameSettings: window.store.get('gameSettings'),
		port1Stats: window.store.get('port1Stats'),
		port2Stats: window.store.get('port2Stats')
	}
});

export default app;