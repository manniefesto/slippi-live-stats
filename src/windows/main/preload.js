const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');

let store = new Store();

contextBridge.exposeInMainWorld(
    'ipc', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['slippiSettingsChanged', 'popupSettingsChanged', 'statsSettingsChanged', 'restartSlippiWatcher', 'selectSlippiReplayFolder'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['slippiWatcherStatus', 'slippiReplayDirectoryChosen'];
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
    },
    reset: (key) => {
        store.reset(key);
    }
}
);