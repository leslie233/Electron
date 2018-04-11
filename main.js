const electron = require('electron')
// const app = electron.app
// const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow, Tray, Menu} = require('electron')
let mainWindow

function createWindow(){
    //resizable: false,
    mainWindow = new BrowserWindow({width: 400,height: 300,autoHideMenuBar: true,frame: false,resizable: false,icon: './icon/icon.ico' })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

  //  mainWindow.webContents.openDevTools()

    mainWindow.on('closed',function(){
        mainWindow = null
    })
}

function initTrayIcon(){
    // const tray = new Tray('./icon/icon.ico');
    // const trayContextMenu = Menu.buildFromTemplate([
    //     {
    //         label: '打开',
    //         click: () => {
    //             this.showAndFocusWindow();
    //         }
    //     }, {
    //         label: '退出',
    //         click: () => {
    //             uiWin.webContents.send(remote.app.quit, 'quit');
    //         }
    //     }
    // ]);
    // tray.setToolTip('饭饭音乐');

    // tray.on('click', () => {
    //     this.showAndFocusWindow();
    // });
    // tray.on('right-click', () => {
    //     tray.popUpContextMenu(trayContextMenu);
    // });
}

app.on('ready',function(){
    createWindow()
    initTrayIcon()
})
//app.on('ready',createWindow)

app.on('window-all-closed',function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate',function(){
    if(mainWindow === null){
        createWindow()
    }
})

ipcMain.on('login', function(event, arg) {
  if(arg == 'login'){
        let win = new BrowserWindow({width: 800,height: 600,icon: './icon/icon.ico',autoHideMenuBar: true})
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'music.html'),
            protocol: 'file:',
            slashes: true
        }))
        //win.webContents.openDevTools()
        mainWindow.close()
  }
  else if(arg == 'small'){
    mainWindow.minimize()
  }
  else if(arg == 'close'){
    mainWindow.close()
  }
});

// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(1,arg);  // prints "ping"
//   if(arg == 'ping'){
//     mainWindow.setContentSize(400, 300)
//   }
//   event.sender.send('asynchronous-reply', 'pong');
// });

// ipcMain.on('synchronous-message', function(event, arg) {
//   console.log(2,arg);  // prints "ping"
//   event.returnValue = 'pong';
// });
