const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');

let store = new Store();

contextBridge.exposeInMainWorld(
    'ipc', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['slippiSettingsChanged', 'popupSettingsChanged', 'statsSettingsChanged'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
}
);

contextBridge.exposeInMainWorld(
    'store', {
    get: (key) => {
        return store.get(key);
    },
    set: (key, value) => {
        return store.set(key, value);
    }
}
);