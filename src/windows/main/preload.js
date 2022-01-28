const {
    contextBridge,
    ipcRenderer
} = require("electron");

const Store = require('electron-store');

let store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "ipc", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["settingsChanged"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "store", {
        get: (key) => {
            return store.get(key);
        },
        set: (key, value) => {
            store.set(key, value);
        },
        onDidChange: (key, callback) => {
            return store.onDidChange(key, callback);
        }
    }
);