const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');

let store = new Store();

contextBridge.exposeInMainWorld(
    'ipc', {
    receive: (channel, func) => {
        let validChannels = ['popupSettingsChanged', 'statsSettingsChanged'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
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