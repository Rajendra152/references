import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, remote, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { Promise } from 'bluebird';
const { promisify } = require('util');
import reducers from './store/reducer';
import * as Services from './services/RedisServices'
import { platform } from 'custom-electron-titlebar/lib/common/platform';
import * as child from 'child_process';
import { homeDir, updateStatOptionsFile, writeINIFile , appendConfigFile} from './utils/globalUtility'
import process from 'process';
import { print } from '@syncfusion/ej2-base';
// import detectPort from 'detect-port'
const detect = require('detect-port');
const { dialog } = require('electron');
const { createClient } = require('redis');
const child_proc = require('child_process');
const windows = new Set();
const { ipcMain } = require('electron');
import global from './components/CommonComp/global'
let wizardWindow: BrowserWindow | null = null;
const url = require('url');
let redisProcess: child.ChildProcess;
let backendProcess: child.ChildProcess;
let client: { on: (arg0: string, arg1: { (): void; (): void; (err: any): void; (): void; }) => void; };
//resource path
require('v8-compile-cache');
let ports = {
  redis : 6379,
  backend : 8000
}
const RESOURCES_PATH = app.isPackaged
  ? app.getAppPath().replace('app.asar','assets')
  : path.join(__dirname, '../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};
let configPath: string | undefined

let newWindow: BrowserWindow | null = null;
let loadingScreen : BrowserWindow | null = null


log.transports.file.resolvePath = () => RESOURCES_PATH + "/log.log";

enum ServerType {
  REDIS = 1,
  BACKEND = 2
}

enum PlatformType {
  DARWIN = 'darwin',
  WINDOWS = 'win32'
}
const gotTheLock = app.requestSingleInstanceLock()

if(process.platform === PlatformType.DARWIN){
  configPath = `${RESOURCES_PATH}/backend-mac/config/config.ini`
} else {
  configPath = `${RESOURCES_PATH}/backend-win/config/config.ini`
}

export const createHelpWindow = async (param: { width: any; height: any; path: any; type: any; }) => {
  // if (!(!wizardWindow || wizardWindow.size === 0)) return;
  wizardWindow = new BrowserWindow({
    parent: newWindow,
    show: false,
    width: param.width ? param.width : 800,
    height: param.height ? param.height : 600,
    titleBarStyle: process.platform === PlatformType.DARWIN ? "hidden" : "default",
    frame: process.platform === PlatformType.WINDOWS ? false : true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    // alwaysOnTop: true
  });
  wizardWindow.setMaxListeners(20)
  let url = `file://${__dirname}/index.html#/${param.path}`;
  if (param.type) {
    url += `/${param.type}`;
  }
  wizardWindow.loadURL(url);
  wizardWindow.show();
  wizardWindow.webContents.on('did-finish-load', () => {
    wizardWindow.webContents.send('action-update', param);
    //  wizardWindow.webContents.send('action-update', {sProductName1:sProductName1,sVersion1:sVersion1,sLicType1:sLicType1,sExpiryDays1:sExpiryDays1,sLicManager1:sLicManager1,sLicStatusMsg1:sLicStatusMsg1, validlicense: bpValidBuf1, trialLicense: bpTrialBuf1 ,C2VInfo:C2VInfo , LogInformation:LogInformation});
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

export const createWizatdWindow = async (param: { width: any; height: any; path: any; type: any; }) => {
  if (!(!wizardWindow || wizardWindow.size === 0)) return;
  wizardWindow = new BrowserWindow({
    parent: newWindow,
    show: false,
    width: param.width ? param.width : 500,
    height: param.height ? param.height : 500,
    titleBarStyle: process.platform === PlatformType.DARWIN ? "hidden" : "default",
    frame: process.platform === PlatformType.WINDOWS ? false : true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false
    },
    //  alwaysOnTop: true
  });
  wizardWindow.setMaxListeners(20)
let url
  if(param.path === 'graphWizard'){
     url = `file://${__dirname}/graphWizard.html#/${param.path}`;
  } else if (param.path === 'analysisTestWizard'){
  url = `file://${__dirname}/tests.html#/${param.path}`;
  } else {
    url = `file://${__dirname}/index.html#/${param.path}`;
  }
  if (param.type) {
    url += `/${param.type}`;
  }
  wizardWindow.loadURL(url);
  wizardWindow.show();
  wizardWindow.webContents.on('did-finish-load', () => {
    wizardWindow.webContents.send('action-update', param);
    //  wizardWindow.webContents.send('action-update', {sProductName1:sProductName1,sVersion1:sVersion1,sLicType1:sLicType1,sExpiryDays1:sExpiryDays1,sLicManager1:sLicManager1,sLicStatusMsg1:sLicStatusMsg1, validlicense: bpValidBuf1, trialLicense: bpTrialBuf1 ,C2VInfo:C2VInfo , LogInformation:LogInformation});
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

  //wizardWindow.loadURL(`file://${__dirname}/index.html` + `#/` + param.path);
  // Request to update the label in the renderer process of the second window
  // param.path
  // if(param.path == "license"){
  //   wizardWindow.webContents.send('action-update', {result:result,licenceproper:false});

  windows.add(wizardWindow);
  return wizardWindow;

}
ipcMain.on('request-mainprocess-action', (event: any, arg: { message: string; }) => {

  if (arg.message == "Help") {
    createHelpWindow(arg);

  }
  else {
    
    createWizatdWindow(arg);
  }
});
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}



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
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
  {
      /// define width and height for the window
      width: 220,
      height: 230,
      /// remove the window frame, so it will become a frameless window
      frame: false,
      /// and set the transparency, to remove any window background color
      transparent: true,
      webPreferences: { nodeIntegration: true, contextIsolation: false, enableRemoteModule : true }
    }
  );
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(
    `file://${__dirname}/splashScreen.html`
  );
 
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen?.center()
    loadingScreen?.show();
  });
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
    minWidth: 700,
    minHeight: 500,
    titleBarStyle: process.platform === PlatformType.DARWIN ? "hidden" : "default",
    frame: process.platform === PlatformType.WINDOWS ? false : true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  // newWindow.loadURL(`file://${__dirname}/index.html`);
  newWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

 
  newWindow.once('ready-to-show', () => {
    if (!newWindow) {
          throw new Error('"newWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
          newWindow.minimize();
        } else {
          if (loadingScreen) {
            loadingScreen.close();
            newWindow.show();
            newWindow?.focus();
           newWindow?.maximize();
          }
        }
      }
)
  newWindow.on('closed', () => {
    windows.delete(wizardWindow)
    windows.delete(newWindow);
    newWindow = null;
    if (process.platform !== 'darwin') {
      // let dataFromFile = readINIFile()
      updateStatOptionsFile(configPath);
      app.quit();
    } else {
      app.quit()
    }
  });
  newWindow.on('focus', () => {
    const menuBuilder = new MenuBuilder(newWindow);
    menuBuilder.buildMenu();
  });
  // Open urls in the user's browser
  newWindow.webContents.on('new-window', (event: { preventDefault: () => void; }, url: any) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ipcMain.on('printPdfFile', function (event: any, args: { path: any; }) {
    const pdfPath = homeDir + '/Documents/SigmaPlot/SPW15/sampleprint.pdf';
    let win = new BrowserWindow({
      webPreferences: {
        plugins: true
      }
    })
    win.loadURL(args && args.path ? args.path : pdfPath);
  })



  ipcMain.on('wizToMainWindow', (event: any, arg: number) => {
    newWindow.webContents.send('fromWizard', arg);
    if (arg & arg.closeWindow) {
      newWindow.close();
    }
  });
  ipcMain.on('print-to-pdf', (event: { sender: any; }, arg: string) => {
    // const pdfPath = path.join(os.tmpdir(), "some-ducking-pdf.pdf");
    const win = BrowserWindow.fromWebContents(event.sender);
    // var ele = document.querySelector('.spreadsheetComponent');
    let divele = document.createElement('div')
    divele.innerHTML = arg
    print(divele, newWindow)
  });
  ipcMain.on('wizToMainGraphWindow', (event: any, arg: any) => {
    // newWindow.webContents.send( 'fromWizard', arg );
    newWindow.webContents.send('fromWorksheetWizard', arg);
  });
  ipcMain.on('sendChildHeadData', (event: any, arg: any) => {
    if (wizardWindow) {
      wizardWindow.webContents.send('mainHeadData', arg);
    }
  });
  ipcMain.on('dataSelectionData', (event: any, arg: any) => {
    if (wizardWindow) {
      wizardWindow.webContents.send('dataSelectionChild', arg);
    }
  });
  ipcMain.on('dataSelectionTest', (event: any, arg: any) => {
      newWindow.webContents.send('dataSelectionTestChild', arg);
  });
  
  ipcMain.on('sendChildHeadDataToTestWizard', (event: any, arg: any) => {
    if (wizardWindow) {
      wizardWindow.webContents.send('mainHeadDataToTestWizard', arg);
    }
  });
  ipcMain.on('quitWizard', (e: any) => {
    newWindow.webContents.send('wizard-closed');
    wizardWindow.close();
  })
  ipcMain.on('wizToMainWindowSpreadsheet', (event: any, arg: any) => {
    newWindow.webContents.send('sendtoMainWindowSpreadSheet', arg);
  });

  ipcMain.on('wizToMainWindowReport', (event: any, arg: any) => {
    newWindow.webContents.send('sendtoMainWindowReports', arg);
  });
  ipcMain.on('wizToAnalysisMenu', (event: any, arg: any) => {
    console.log('Into wizard analysis',arg);
    newWindow.webContents.send('sendtoAnalysisMenu', arg);
  });

  ipcMain.on('mainwindowReportwinOpen', (event: any, arg: any) => {
    newWindow.webContents.send('openMainReport', arg);
  });
  ipcMain.on('openSmoothWizard', (event: any, arg: any) => {
    newWindow.webContents.send('openSmoothWizards', arg);
  });

  ipcMain.on('openSampleSizeWizard', (event: any, arg: any) => {
    newWindow.webContents.send('openSampleSizeWizards', arg);
  });
  ipcMain.on('openPowerWizard', (event: any, arg: any) => {
    newWindow.webContents.send('openPowerWizards', arg);
  });
  windows.add(newWindow);
  return newWindow;

};





const startServer = async (folderPath: string, type: ServerType, freep: undefined) => {
  log.info("--------------start here")
  log.info([folderPath, app.isPackaged, "inside redisstart"])
  let path: string = '';
  let args: string[];
  let serverProcess: child.ChildProcess;
  if (process.platform === PlatformType.DARWIN) {
    log.info("In Function: startServer - mac part ...")
    if (type == ServerType.REDIS) {
      path = `"${folderPath}"/redis-server --port ${freep} --requirepass MnU!G5Le#`;
      args = []
    }

    else if (type == ServerType.BACKEND) {
      path = `"${folderPath}"/backend-mac/sigma runserver 127.0.0.1:${freep}`
      args = []
    }
    serverProcess = child_proc.spawn(path, [], {
      encoding: 'utf8',
      shell: true,
    });

    log.info("In Function: startServer - Completed spawn the SERVER ...")
    log.info(["In Function: startServer - Trigger any events ..."])
    let data = ""

    for await (const chunk of serverProcess.stdout) {
      log.info(['inside process success'])
      data += chunk;
      if (type == 2) {
        console.log("inside backend start server")
        return serverProcess
      } else {
        return data
      }
    }
    let error = "";
    for await (const chunk of serverProcess.stderr) {
      error += chunk;
      console.log("errorss--?", error)
      return error
    }

  }
  else if (process.platform === PlatformType.WINDOWS) {
    log.info("In Function: startServer - WINDOWS part ...")
    if (type == ServerType.REDIS) {
      let redisPath = `"${folderPath}"\\redis-server-win\\redis-server.exe` 
      path = `${redisPath} --port ${freep} --requirepass MnU!G5Le#`
      console.log(path, "path========>")
    }
   
    else if (type == ServerType.BACKEND) {
     let pathnew =  String.raw `${folderPath}`
      path = `set JAVA_HOME=${pathnew}\\java-win\\jre1.8.0_301 & call "${folderPath}"\\backend-win\\sigma.exe runserver  127.0.0.1:${freep}`
    }

    log.info(["In Function: startServer - about to spawn the SERVER ...", path])
    // let messageOptions = {}
    // messageOptions.message = `config path ${path} resources path ${RESOURCES_PATH}`
    // messageOptions.type = 'info'
    // dialog.showMessageBox(messageOptions)
    serverProcess = child_proc.spawn(path, [], {
      encoding: 'utf8',
      shell: true,
      // detached:true,
      // windowsHide :true,
    });
    log.info("In Function: startServer - Completed spawn the SERVER ...")
    let data = ""
    for await (const chunk of serverProcess.stdout) {
      log.info(['inside process success'])
      data += chunk;
      if (type == 2) {
        console.log("inside backend start server")
        return serverProcess
      } else {
        return data
      }
    }
    let error = "";
    for await (const chunk of serverProcess.stderr) {
      error += chunk;
      console.log("errorss--?", error)
      return error
    }
  }
}

const stopServer = async (proc: child.ChildProcess, type: ServerType) => {
  log.info("windows here--->")
  if (process.platform === PlatformType.DARWIN) {
    if (type === ServerType.REDIS) {
      appendConfigFile('6379', configPath, true)
      await child.exec(`kill -9 $(lsof -ti:${ports.redis}) `)
    } else if (type == ServerType.BACKEND) {
      appendConfigFile('8000', configPath, false)
      await child.exec(`kill -9 $(lsof -ti:${ports.backend})`)
    }
  }
  if (process.platform === PlatformType.WINDOWS) {
    if (type === ServerType.REDIS) {
      log.info("valuesredis")
      appendConfigFile('6379', configPath, true)
      child.exec(`taskkill /IM "redis-server.exe" /F`)
    } else if (type === ServerType.BACKEND) {
      appendConfigFile('8000', configPath, false)
      child.exec(` \taskkill /IM "sigma.exe" /F`)
    }
  }

}
const backendStart = (port: undefined) => {
  log.info("In Function: backendStart - BEGIN ...")
  log.info("In Function: backendStart -Starting BACKEND Server ...")
  let returnedBackenedProcess = startServer(RESOURCES_PATH, ServerType.BACKEND, port);
  log.info("In Function: backendStart -After BACKEND Server called ...")
  log.info("backedn process started", returnedBackenedProcess)

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (newWindow) {
      if (newWindow.isMinimized()) newWindow.restore()
      newWindow.focus()
    }
  })
  // client.on('ready', () => {
    log.info("application starting ---> after backend start")
  createLoadingScreen()
    app.whenReady().then(createWindow).catch(console.log)
  // })
}

const checkRedisStart = (freep: any) => {
  let returnedProcess = startServer(RESOURCES_PATH, ServerType.REDIS, freep);
  returnedProcess.then((result: any, error: any) => {
    log.info(["In Function: redisStart -> into the returnedProcess ... ", result])
    if (error) {
      log.info(["failure in starting the redis server", error])
      app.quit()
    }
    if (result) {
      log.info("In Function: redisStart -> Redis is Started and result.pid is created ... ")
      log.info("In Function: redisStart -> Now checking the Redis Client ... ")
      let clientReturned = checkRedisClient(result.pid, freep)
      clientReturned.then((result) => {
        log.info("In Function: redisStart -> completed checkRedisClient call() and into success clientReturned.then ... ")
        if (result) {
          log.info("In Function: redisStart -> After checkRedisClient call(); OBject created About to START BACKEND ... ")
          checkPortAvailablity(8000, false)
          log.info("In Function: redisStart -> After BACKEND start... ")
        }
      })
    }
  })
}

const checkPortAvailablity = (port: number, isRedisProcess: boolean) => {

  detect(port)
  .then((_port: any) => {
    if (port == _port) {
      log.info(`port: ${port} was not occupied`, isRedisProcess);
      if(isRedisProcess){
        appendConfigFile(port, configPath, true)
        ports.redis = port
        checkRedisStart(port)
      } else {
        global.shared.backendPort = port;
        ports.backend = port
        appendConfigFile(port, configPath, false)
        backendStart(port)
      }
    } else {
      if(isRedisProcess) {
        global.shared.redisPort = _port;
        ports.redis = _port
        appendConfigFile(_port, configPath, true)
      //  writeINIFile(redisPort, configPath)
        checkRedisStart(_port)
      } else {
        // portDetails.backendPort = _port
        global.shared.backendPort = _port;
        ports.backend = _port
        appendConfigFile(_port, configPath, false)
        backendStart(_port)
      }
    }
   
  })
  .catch((err: any) => {
    console.log(err);
  });
} 
const redisStart = async () => {
  log.info("In Function: redisStart - BEGIN")
  log.info([RESOURCES_PATH, app.isPackaged, "redis path"])
  checkPortAvailablity(6379, true)
}
const checkRedisClient = async (pid: any, freep: any) => {
  log.info("In Function: checkRedisClient BEGIN ...")
  log.info("... about to connect to REDIS...", freep)
  client = await createClient({
    port: freep,
    host: '127.0.0.1',
    password: 'MnU!G5Le#',
  });
  log.info("...  after the call for connect to REDIS...")
  let messageOptions = {
    buttons: ["OK"],
    type: 'error',
    message: `Redis Connection Error.Quitting the Application`,
    title: "SigmaPlot 15"
  }
  if (client) {
    log.info("... Insdie the success part of the Connection to REIDS ...")
    client.on('reconnecting', () => {
      log.info("In EVENT: reconnecting ...")
      messageOptions.message = `connection retrying`
      messageOptions.type = 'info'
      dialog.showMessageBox(messageOptions)
    })
    client.on('error', (err) => {
      log.info("In EVENT: error ...")
      let dialog1 = dialog.showMessageBox(messageOptions)
      dialog1.then((res: { response: number; }) => {
        log.info("res", res, err, '================?', pid)
        if (res.response === 0) {
          log.info("In EVENT: error Closing the APP...")
          app.quit()
        }
      })
    });

    client.on('connect', () => {
      log.info("In EVENT: connect==> connection is ready with APP...")
      log.info('conection readdy')
    });

    return client
  }
}

if (!gotTheLock) {
  app.quit()
} else {
  redisStart();
}

ipcMain.on('window_closed', (e: any, item: any) => {
  newWindow.webContents.send('wizard-closed');
  wizardWindow?.close()
})

ipcMain.on('window_close_all', (e: any, item: any) => {
 
  wizardWindow?.close();

  if (process.platform !== 'darwin') {
    updateStatOptionsFile(configPath);
    stopServer(backendProcess, ServerType.BACKEND)
    stopServer(redisProcess, ServerType.REDIS)
    app.quit();
  } else {
    app.quit()
  }
})
const close = async () => {
  stopServer(backendProcess, ServerType.BACKEND)
  stopServer(redisProcess, ServerType.REDIS)
  wizardWindow?.close();

  if (process.platform !== 'darwin') {
    updateStatOptionsFile(configPath);
    app.quit();
  } else{
    app.quit();
  }
  // setTimeout(()=>{
  //   app.relaunch()
  //   app.quit()
  // } , 5000)
}
ipcMain.on('window_restart', (e: any, item: any) => {
  close()
})

/* event listeners */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  log.info("hello in windows")
  //  wizardWindow?.close();
  setTimeout(() => {
    // stop redis server
    wizardWindow?.close();

    if (process.platform !== 'darwin') {
      updateStatOptionsFile(configPath);
      app.exit();
      log.info("hello in windows")
    } else{
      app.quit()
    }
  }, 100)
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (newWindow === null) createWindow();
  if (windows.size === 0) createWindow();
});

app.on('before-quit', () => {
  stopServer(backendProcess, ServerType.BACKEND)
  stopServer(redisProcess, ServerType.REDIS)
})

process.on('uncaughtException', (error) => {
  console.log(error, "errorr")
})
