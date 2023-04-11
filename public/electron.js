const path = require('path');
let ffi = require('ffi-napi');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { dialog, ipcMain } = require('electron')

let logDir = "";
let cadFile = "";

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });
  
  ipcMain.on('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog(window, {
        properties: ['openDirectory']
    })
    console.log('directories selected', result.filePaths)
    logDir = result.filePaths[0]
  });

  ipcMain.on('import-cad', async (event, arg) => {
    cadFile = arg.path
  });

  ipcMain.on('run-dll', async (event, arg) => {
    window.Dll = ffi.Library('dll/Dll1.dll', {
      'Add': ['float', ['float', 'float']],
      'WriteXLSX': ['int', ['string','string','bool','bool','bool','float','float','float']]
    })
    
    console.log('fii.Library result:',window.Dll);
    window.Dll.WriteXLSX(cadFile, logDir, arg.xChecked, arg.yChecked,
      arg.zChecked, arg.xPlane, arg.yPlane, arg.zPlane);
  });
  // and load the index.html of the app.
  // window.loadFile("index.html");
  window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    window.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});