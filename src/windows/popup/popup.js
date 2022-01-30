import App from './Popup.svelte';

const app = new App({
	target: document.body,
	props: {
		popupSettings: window.store.get('popupSettings'),
		statsSettings: window.store.get('statsSettings'),
		gameSettings: window.store.get('gameSettings'),
		generatedStats: window.store.get('generatedStats')
	}
});

export default app;