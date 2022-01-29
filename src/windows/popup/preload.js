const { contextBridge } = require("electron");
const Store = require('electron-store');

let store = new Store();

contextBridge.exposeInMainWorld(
    "store", {
    get: (key) => {
        return store.get(key);
    },
    set: (key, value) => {
        return store.set(key, value);
    },
    onDidChange: (key, callback) => {
        return store.onDidChange(key, callback);
    }
}
);