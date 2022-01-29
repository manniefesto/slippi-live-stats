import App from './Popup.svelte';

const app = new App({
	target: document.body,
	props: {
		popupSettings: window.store.get('popupSettings'),
		statsSettings: window.store.get('statsSettings')
	}
});

export default app;