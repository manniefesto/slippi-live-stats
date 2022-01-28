const { app, BrowserWindow } = require('electron');
const path = require('path');

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
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../public/main.html'));

};

const createPopup = () => {
  popupWindow = new BrowserWindow({
      width: 800,
      height: 300,
      x: 0, y: 0,
      frame: true
  });

  popupWindow.loadFile(path.join(__dirname, '../public/popup.html'));
  popupWindow.setAlwaysOnTop(true, "screen-saver");
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  createPopup();
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
    createPopup();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
