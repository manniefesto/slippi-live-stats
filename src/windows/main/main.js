import App from './Main.svelte';

const app = new App({
	target: document.body,
	props: {
		name: window.store.get('popupTimeoutMS')
	}
});

export default app;