const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const slippiReplayWatcher = require('./modules/slippiReplayWatcher');
const slippiStatsManager = require('./modules/slippiStatsManager');
const fs = require('fs');

const Store = require('electron-store');
const store = new Store({
  defaults: {
    'slippiSettings': {
      'replayDir': '',
      'playerCode': ''
    },
    'popupSettings': {
      'timeout': 10,
      'positionX': 0,
      'positionY': 0
    },
    'statsSettings': {
      'showLCancelPercent': true,
      'showAnalogAPM': true,
      'showDigitalAPM': true
    }
  }
});

let mainWindow;
let popupWindow;

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
  awaitWriteFinish: true,
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "windows/main/preload.js")
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../public/main.html'));
};

const createPopup = () => {
  closePopup();

  popupWindow = new BrowserWindow({
    width: 600,
    height: 600,
    x: 0, y: 0,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "windows/popup/preload.js")
    }
  });

  popupWindow.loadFile(path.join(__dirname, '../public/popup.html'));
  popupWindow.setAlwaysOnTop(true, "screen-saver");

  setTimeout(() => {
    closePopup();
  }, store.get('popupSettings.timeout') * 1000);
};

const closePopup = () => {
  if (popupWindow != undefined && !popupWindow.isDestroyed()) popupWindow.close();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  tryStartSlippiWatcher();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//IPC routing

ipcMain.on('slippiSettingsChanged', (e, args) => {
  store.set('slippiSettings', args);
  tryStartSlippiWatcher();
});

ipcMain.on('popupSettingsChanged', (e, args) => {
  store.set('popupSettings', args);
});

ipcMain.on('statsSettingsChanged', (e, args) => {
  store.set('statsSettings', args);
});

ipcMain.on('restartSlippiWatcher', (e, args) => {
  tryStartSlippiWatcher();
});

ipcMain.on('demoPopup', (e, args) => {
  const exampleStats = JSON.parse(fs.readFileSync('./src/exampleData/stats.json', 'utf8'));
  let generatedStats = slippiStatsManager.generateSelectedStats(exampleStats.stats, exampleStats.gameSettings);
  store.set('gameSettings', exampleStats.gameSettings);
  store.set('generatedStats', generatedStats);
  createPopup();
});

ipcMain.on('selectSlippiReplayFolder', () => {
  dialog.showOpenDialog({properties: ['openDirectory']}).then(result => {
    mainWindow.webContents.send('slippiReplayDirectoryChosen', result.filePaths[0]);
  });
});

let tryStartSlippiWatcher = async () => {
  if (slippiReplayWatcher != undefined) slippiReplayWatcher.stop();
  var running = await slippiReplayWatcher.start(store.get('slippiSettings.replayDir'), () => {
    closePopup();
  }, (gameSettings, stats) => {
    let generatedStats = slippiStatsManager.generateSelectedStats(stats, gameSettings);
    store.set('gameSettings', gameSettings);
    store.set('generatedStats', generatedStats);
    createPopup();
  });

  mainWindow.webContents.send('slippiWatcherStatus', running);
}