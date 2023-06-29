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
 import reducers from './store/reducer';
 import * as Services from './services/RedisServices'
 import { platform } from 'custom-electron-titlebar/lib/common/platform';
 import * as child from 'child_process';
 import { updateStatOptionsFile } from './utils/globalUtility'
 import process from 'process';
import { smallerDependencies } from 'mathjs';
import { Children } from 'hoist-non-react-statics/node_modules/@types/react';
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
    if(type == ServerType.REDIS) {
      path = `${folderPath}\\redis-server-win\\redis-server.exe --requirepass test123`
    }
    else if(type == ServerType.BACKEND) {
      path = `${folderPath}\\backend-win\\sigma.exe runserver`
    }

    serverProcess = await child_proc.spawn(path, [], {
      encoding: 'utf8',
      shell: true,
      // detached:true,
      // windowsHide :true,
    });
   
      
           serverProcess.on('close', (code) => {
      //      console.log(`child process exited with code ${code}`);
       });

    serverProcess.on('error', function (err) {
        
      console.log('Following error occurred : ' + err.code);
      app.quit();
      return null;
    });
    serverProcess.on('data', (data) => {
       
   return serverProcess
 })
  }

 }

 const stopServer = async (proc:child.ChildProcess, type)=>{
    if(process.platform === PlatformType.DARWIN) {
      if(type === ServerType.REDIS){
        await child.exec(`kill -9 $(lsof -ti:6379) `)
      } else if( type == ServerType.BACKEND) {
       await child.exec(`kill -9 $(lsof -ti:8000)`)
      }
    }
   
    if(process.platform === PlatformType.WINDOWS){
      if(type === ServerType.REDIS){
        console.log("valuesredis")
        child.exec(`taskkill /IM "redis-server.exe" /T`)
          // child.exec(`${RESOURCES_PATH}\\redis-server-win\\redis-cli.exe shutdown`)
          // child.exec(`for /f "tokens=5" %a in ('netstat -aon ^| findstr LISTENING ^| findstr 6379') do taskkill /F /PID %~nxa`)      
        } else if(type === ServerType.BACKEND) {         
          child.exec(` taskkill /IM "sigma.exe" /T`)
        }
    }

 }

// end server

 const redisStart = async ()=>{
  redisProcess = await startServer( RESOURCES_PATH, ServerType.REDIS);
if(redisProcess) {
  backendStart();
}
}

redisStart();

const backendStart = async ()=>{
  backendProcess = await startServer( RESOURCES_PATH, ServerType.BACKEND);
}

  export const createWizatdWindow = async(param) => {
    wizardWindow = new BrowserWindow({
      show: false,
      width: param.width ?  param.width : 700,
      height: param.height ?  param.height :600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
      alwaysOnTop : true
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



  ipcMain.on('request-mainprocess-action', (event, arg) => {
    createWizatdWindow(arg);
  });



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

    let x;
    let y;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      const [currentWindowX, currentWindowY] = currentWindow.getPosition();
      x = currentWindowX + 24;
      y = currentWindowY + 24;
    }
   newWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      minWidth :700,
      minHeight :800,
      titleBarStyle:process.platform === PlatformType.DARWIN ? "hidden" : "default",
      frame:process.platform === PlatformType.WINDOWS ? false : true,
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
    
    ipcMain.on('wizToMainWindowReport', (event, arg) => {
      newWindow.webContents.send( 'sendtoMainWindowReports', arg );
      });

      ipcMain.on('mainwindowReportwinOpen', (event, arg) => {
        newWindow.webContents.send( 'openMainReport', arg );
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

client = redis.createClient(
  {
    port: 6379,
    host: '127.0.0.1',
    password: 'test123'
  });
client.on('connect', () => {
  console.clear();
  console.log('Connected to Redis');
});

client.on('ready',()=>{
  console.clear();
  console.log('Redis is ready!');
  app.whenReady().then(createWindow).catch(console.log);
});

ipcMain.on('window_closed', (e, item)=>{
  wizardWindow?.close()
})

ipcMain.on('window_close_all', (e, item)=>{
//   stopServer(redisProcess)

//   // stop backend server

//  stopServer(backendProcess)
 wizardWindow?.close();

  if (process.platform !== 'darwin') {
    updateStatOptionsFile();
    app.quit();
  }
})

/**
 * Add event listeners...
 */

process.on('uncaughtException',(err)=>{
  console.clear();
  console.log(err);
  // app.quit();
});

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    console.log("hello in windows")
   wizardWindow?.close();

    if (process.platform !== 'darwin') {
      updateStatOptionsFile();
      app.quit();
      console.log("hello in windows")
    }
  });

  //  app.whenReady().then(createWindow).catch(console.log);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (newWindow === null) createWindow();
    if (windows.size === 0) createWindow();
  });

  app.on('before-quit',()=>{
    stopServer(backendProcess, ServerType.BACKEND)
    stopServer(redisProcess, ServerType.REDIS)
  })


  ipcMain.on('request-mainprocess-action', (event, arg) => {
    createWizatdWindow(arg);
  });
