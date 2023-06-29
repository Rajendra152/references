/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
 import 'core-js/stable';
 import 'regenerator-runtime/runtime';
 import path from 'path';
 import { app, BrowserWindow, shell } from 'electron';
 import { autoUpdater } from 'electron-updater';
 import log from 'electron-log';
 import MenuBuilder from './menu';
 import reducers from '../src/store/reducer';
 import { platform } from 'custom-electron-titlebar/lib/common/platform';
 import * as child from 'child_process';
 import { updateStatOptionsFile } from './utils/globalUtility'
 import process from 'process';
import { smallerDependencies } from 'mathjs';
  let redis = require('redis');
 



 const child_proc = require('child_process');


 const windows = new Set();
 const {ipcMain} = require('electron');

 let wizardWindow: BrowserWindow | null = null;
 let port = 6379;
 let redisProcess: child.ChildProcess;
 let backendProcess: child.ChildProcess;
let client;

 //resource path
 const RESOURCES_PATH = app.isPackaged
 ? path.join(process.resourcesPath, 'assets')
 : path.join(__dirname, '../assets');

 const getAssetPath = (...paths: string[]): string => {
   return path.join(RESOURCES_PATH, ...paths);
 };

 enum ServerType {
  REDIS = 1,
  BACKEND = 2
 }

 enum PlatformType {
   DARWIN = 'darwin',
   WINDOWS = 'win32'
 }


// Start server

const startServer = async (folderPath:string,type:ServerType):child.ChildProcess=>{
  let path:string ='';
  let args:string[];
  let serverProcess:child.ChildProcess;
  if(process.platform === PlatformType.DARWIN){
    // if(type == ServerType.REDIS){
    //   console.log(process.platform)
    //   path = `${folderPath}/redis-server`
    //   args = []
    //   serverProcess = child.execFile(path, args);
    //   console.log(path,'Path')
    //   console.log(serverProcess.pid,'Server process')

    //   return serverProcess;
    // }
    if(type == ServerType.REDIS){
      path = `${folderPath}/redis-server`;
       args = []

       serverProcess =  await child.execFile(path, args)
       serverProcess.on('error', function(err) {
        console.log('Following error occurred : ' + err.code);
        app.quit();
        return null;
      });
      return serverProcess;
    }

    else if(type == ServerType.BACKEND){
      path = `${folderPath}/backend-mac/sigma`
      args= ['runserver']
      serverProcess = child.execFile(path, args);
      return serverProcess;
    }

  }
  else if(process.platform === PlatformType.WINDOWS){
    if(type == ServerType.REDIS)
      path = `${folderPath}\\redis-server-win\\redis-server.exe`
    else if(type == ServerType.BACKEND)
      path = `${folderPath}\\backend-win\\sigma.exe runserver`

    serverProcess = child_proc.spawn(path, [], {
      encoding: 'utf8',
      shell: true,
      // detached:true,
      // windowsHide :true,
    });

    serverProcess.on('error', function(err) {
      console.log('Following error occurred : ' + err.code);
      app.quit();
      return null;
    });
    return serverProcess;
  }

 }

 const stopServer = (type : ServerType)=>{
  if(process.platform === PlatformType.DARWIN)
    if(type === ServerType.REDIS)
      child.exec(`kill -9 $(lsof -ti:6379) `)
    else(type === ServerType.BACKEND)
      child.exec(`kill -9 $(lsof -ti:8000) `)
  if(process.platform === PlatformType.WINDOWS)
      if(type === ServerType.REDIS){
        let processid = child.exec(`netstat -ano | findstr :6379`)
        console.log(processid, "processid", processid.pid)
        child.exec(`taskkill /PID ${processid.pid} /T /F`)
      } else if(type === ServerType.BACKEND) {
        let processid = child.exec(`netstat -ano | findstr :8000`)
        child.exec(`taskkill /PID ${processid.pid} /F`)
      }
   
 }


// end server

 const redisStart = async ()=>{
  redisProcess = await startServer( RESOURCES_PATH, ServerType.REDIS);
}

redisStart();


const backendStart = async ()=>{
  backendProcess = await startServer( RESOURCES_PATH, ServerType.BACKEND);
}

backendStart();




 

  // // Start redis server
  //  redisProcess = startServer(RESOURCES_PATH,ServerType.REDIS)


   // Start backend server
  //  backendProcess = startServer(RESOURCES_PATH,ServerType.BACKEND)


  export const createWizatdWindow = async(param) => {
    wizardWindow = new BrowserWindow({
      show: false,
      width: param.width ?  param.width : 700,
      height: param.height ?  param.height :600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    let url = `file://${__dirname}/index.html#/${param.path}`;
    if(param.type) {
      url += `/${param.type}`;
    }
    wizardWindow.loadURL(url);

    //wizardWindow.loadURL(`file://${__dirname}/index.html` + `#/` + param.path);
    // Request to update the label in the renderer process of the second window

    wizardWindow.webContents.on('did-finish-load', () => {
     wizardWindow.webContents.send('action-update', param);
      if (!wizardWindow) {
        throw new Error('"newWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        wizardWindow.minimize();
      } else {
        wizardWindow.show();
        wizardWindow.focus();
      }
    });

    wizardWindow.on('closed', () => {
      windows.delete(wizardWindow);
      wizardWindow = null;
    });


    windows.add(wizardWindow);
    return wizardWindow;

  }


  export default class AppUpdater {
    constructor() {
      log.transports.file.level = 'info';
      autoUpdater.logger = log;
      autoUpdater.checkForUpdatesAndNotify();
    }
  }

  let newWindow: BrowserWindow | null = null;

  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    require('electron-debug')();
  }

  const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log);
  };



  export const createWindow = async () => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      await installExtensions();
    }

    let x, y;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      const [currentWindowX, currentWindowY] = currentWindow.getPosition();
      x = currentWindowX + 24;
      y = currentWindowY + 24;
    }


    

    let newWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
      },
  });

    newWindow.loadURL(`file://${__dirname}/index.html`);

    // newWindow.loadURL(`http://localhost:1212/`);
    newWindow.webContents.on('did-finish-load', () => {

     if (!newWindow) {
       throw new Error('"newWindow" is not defined');
     }
     if (process.env.START_MINIMIZED) {
       newWindow.minimize();
     } else {
       newWindow.show();
       newWindow.focus();
     }
     newWindow.maximize();
   });
    newWindow.webContents.openDevTools()
   newWindow.on('closed', () => {
     // stop redis server

      //  stopServer(redisProcess)

     // stop backend server

      //  stopServer(backendProcess)
       wizardWindow?.close()
     windows.delete(newWindow);
     newWindow = null;
   });
   newWindow.on('focus', () => {
     const menuBuilder = new MenuBuilder(newWindow);
     menuBuilder.buildMenu();
   });

    // Open urls in the user's browser
   newWindow.webContents.on('new-window', (event, url) => {
     event.preventDefault();
     shell.openExternal(url);
   });

   

   ipcMain.on('wizToMainWindow', (event, arg) => {
   newWindow.webContents.send( 'fromWizard', arg );
    if(arg & arg.closeWindow) {
      newWindow.close();
    }
   });
   ipcMain.on('wizToMainGraphWindow', (event, arg) => {
    // newWindow.webContents.send( 'fromWizard', arg );
    newWindow.webContents.send( 'fromWorksheetWizard', arg );
  });
  ipcMain.on('sendChildHeadData', (event, arg) => {
    if(wizardWindow){
      wizardWindow.webContents.send( 'mainHeadData', arg );
    }
  });
  ipcMain.on('sendChildHeadDataToTestWizard', (event, arg) => {
    if(wizardWindow){
    wizardWindow.webContents.send( 'mainHeadDataToTestWizard', arg );
    }
  });
  ipcMain.on('quitWizard', (e) => {
    wizardWindow.close();
  })
   ipcMain.on('wizToMainWindowSpreadsheet', (event, arg) => {
    newWindow.webContents.send( 'sendtoMainWindowSpreadSheet', arg );
    });
    ipcMain.on('openSmoothWizard', (event, arg) => {
      newWindow.webContents.send( 'openSmoothWizards', arg );
      });

      ipcMain.on('openSampleSizeWizard', (event, arg) => {
        newWindow.webContents.send( 'openSampleSizeWizards', arg );
        });
        ipcMain.on('openPowerWizard', (event, arg) => {
          newWindow.webContents.send( 'openPowerWizards', arg );
          });
   windows.add(newWindow);
   return newWindow;

  };

 

  /**
   * Add event listeners...
   */


// setTimeout(()=>{
//   client.get('testKey', function(err, res) {
//     if (err) {
//       console.log(err);
//       app.quit();
//     }
//     if (res == null) {
//       app.whenReady().then(createWindow).catch(console.log);
//     }
//   });
// }, 0);

client = redis.createClient(port, '127.0.0.1');
// client = redis.createClient({
//   port : 6379,
//   host : '127.0.0.1',
//   password : 'test@123',
// })
// client = redis.createClient({
//   url: 'redis://:test123@127.0.0.1:6379',
// });


// client.auth('test@123');

// client['auth'] = null;
//client.send_command('AUTH', ['teja', 'test@123'], redis.print);

client.on('connect', () => {
  console.clear();
  console.log('Connected to Redis');
});

client.on('ready',()=>{
  console.clear();
  console.log('Redis is ready!');
  app.whenReady().then(createWindow).catch(console.log);
});

process.on('uncaughtException',(err)=>{
  console.clear();
  console.log(err);
  // app.quit();
});



  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed

   wizardWindow?.close();

    if (process.platform !== 'darwin') {
      updateStatOptionsFile();
      app.quit();
    }
  });

   //app.whenReady().then(createWindow).catch(console.log);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (newWindow === null) createWindow();
    if (windows.size === 0) createWindow();
  });

  app.on('before-quit',()=>{
    stopServer(ServerType.REDIS)
    stopServer(ServerType.BACKEND)
  })

  // app.on('will-quit',()=>{
  //   stopServer(redisProcess)
  // })


  ipcMain.on('request-mainprocess-action', (event, arg) => {
    createWizatdWindow(arg);
  });
