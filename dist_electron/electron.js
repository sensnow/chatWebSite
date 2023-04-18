const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut //快捷键
const { session } = require('electron')
const { useCookie } = require('./useCookie');


let mainWindow
useCookie(mainWindow);
const Menu = electron.Menu

function createWindow () {
  const partitionName = 'myapp'

  // 创建一个名为 myapp 的分区
  session.fromPartition(partitionName)

  Menu.setApplicationMenu(null)
  // Create the browser window.
  mainWindow = new BrowserWindow({

    width: 980,
    height: 640
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // 通过快捷键就可以打开调试模式 ctrl + shift + l
  globalShortcut.register('CommandOrControl+Shift+L', () => {
    let focusWin = BrowserWindow.getFocusedWindow()
    focusWin && focusWin.toggleDevTools()
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})