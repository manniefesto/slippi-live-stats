import App from './Popup.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Jeff'
	}
});

export default app;