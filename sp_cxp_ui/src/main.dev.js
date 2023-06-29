"use strict";
// /* eslint global-require: off, no-console: off */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createWindow = exports.createWizatdWindow = void 0;
// /**
//  * This module executes inside of electron's main process. You can start
//  * electron renderer process from here and communicate with the other processes
//  * through IPC.
//  *
//  * When running `yarn build` or `yarn build-main`, this file is compiled to
//  * `./src/main.prod.js` using webpack. This gives us some performance wins.
//  */
//  import 'core-js/stable';
//  import 'regenerator-runtime/runtime';
//  import path from 'path';
//  import { app, BrowserWindow, shell } from 'electron';
//  import { autoUpdater } from 'electron-updater';
//  import log from 'electron-log';
//  import MenuBuilder from './menu';
//  import reducers from '../src/store/reducer';
//  import { platform } from 'custom-electron-titlebar/lib/common/platform';
//  import * as child from 'child_process';
//  import { updateStatOptionsFile } from './utils/globalUtility'
//  import process from 'process';
// import { smallerDependencies } from 'mathjs';
//   let redis = require('redis');
//  const child_proc = require('child_process');
//  const windows = new Set();
//  const {ipcMain} = require('electron');
//  let wizardWindow: BrowserWindow | null = null;
//  let port = 6379;
//  let redisProcess: child.ChildProcess;
//  let backendProcess: child.ChildProcess;
// let client;
//  //resource path
//  const RESOURCES_PATH = app.isPackaged
//  ? path.join(process.resourcesPath, 'assets')
//  : path.join(__dirname, '../assets');
//  const getAssetPath = (...paths: string[]): string => {
//    return path.join(RESOURCES_PATH, ...paths);
//  };
//  enum ServerType {
//   REDIS = 1,
//   BACKEND = 2
//  }
//  enum PlatformType {
//    DARWIN = 'darwin',
//    WINDOWS = 'win32'
//  }
// // Start server
// const startServer = async (folderPath:string,type:ServerType):child.ChildProcess=>{
//   let path:string ='';
//   let args:string[];
//   let serverProcess:child.ChildProcess;
//   if(process.platform === PlatformType.DARWIN){
//     // if(type == ServerType.REDIS){
//     //   console.log(process.platform)
//     //   path = `${folderPath}/redis-server`
//     //   args = []
//     //   serverProcess = child.execFile(path, args);
//     //   console.log(path,'Path')
//     //   console.log(serverProcess.pid,'Server process')
//     //   return serverProcess;
//     // }
//     if(type == ServerType.REDIS){
//       path = `${folderPath}/redis-server`;
//        args = []
//        serverProcess =  await child.execFile(path, args)
//        serverProcess.on('error', function(err) {
//         console.log('Following error occurred : ' + err.code);
//         app.quit();
//         return null;
//       });
//       return serverProcess;
//     }
//     else if(type == ServerType.BACKEND){
//       path = `${folderPath}/backend-mac/sigma`
//       args= ['runserver']
//       serverProcess = child.execFile(path, args);
//       return serverProcess;
//     }
//   }
//   else if(process.platform === PlatformType.WINDOWS){
//     if(type == ServerType.REDIS)
//       path = `${folderPath}\\redis-server-win\\redis-server.exe`
//     else if(type == ServerType.BACKEND)
//       path = `${folderPath}\\backend-win\\sigma.exe runserver`
//     serverProcess = child_proc.spawn(path, [], {
//       encoding: 'utf8',
//       shell: true,
//       // detached:true,
//       // windowsHide :true,
//     });
//     serverProcess.on('error', function(err) {
//       console.log('Following error occurred : ' + err.code);
//       app.quit();
//       return null;
//     });
//     return serverProcess;
//   }
//  }
//  const stopServer = (type : ServerType)=>{
//   if(process.platform === PlatformType.DARWIN)
//     if(type === ServerType.REDIS)
//       child.exec(`kill -9 $(lsof -ti:6379) `)
//     else(type === ServerType.BACKEND)
//       child.exec(`kill -9 $(lsof -ti:8000) `)
//   if(process.platform === PlatformType.WINDOWS){
//     if(type === ServerType.REDIS){
//       var processPid = child.exec(`netstat -ano|findstr PID :6379`)
//       console.log(processPid.pid, "processPid.pid")
//       child.exec(`taskkill /PID ${processPid.pid} /T /F`)
//     } else if(type === ServerType.BACKEND) {
//       var processPid = child.exec(`netstat -ano|findstr PID :8000`)
//       console.log(processPid.pid, "processPid.pid")
//       child.exec(`taskkill /PID ${processPid.pid} /T /F`)
//     }
//   }
//  }
// // end server
//  const redisStart = async ()=>{
//   redisProcess = await startServer( RESOURCES_PATH, ServerType.REDIS);
// }
// redisStart();
// const backendStart = async ()=>{
//   backendProcess = await startServer( RESOURCES_PATH, ServerType.BACKEND);
// }
// backendStart();
//   // // Start redis server
//   //  redisProcess = startServer(RESOURCES_PATH,ServerType.REDIS)
//    // Start backend server
//   //  backendProcess = startServer(RESOURCES_PATH,ServerType.BACKEND)
//   export const createWizatdWindow = async(param) => {
//     wizardWindow = new BrowserWindow({
//       show: false,
//       width: param.width ?  param.width : 700,
//       height: param.height ?  param.height :600,
//       resizable: false,
//       webPreferences: {
//         nodeIntegration: true,
//       },
//     });
//     let url = `file://${__dirname}/index.html#/${param.path}`;
//     if(param.type) {
//       url += `/${param.type}`;
//     }
//     wizardWindow.loadURL(url);
//     //wizardWindow.loadURL(`file://${__dirname}/index.html` + `#/` + param.path);
//     // Request to update the label in the renderer process of the second window
//     wizardWindow.webContents.on('did-finish-load', () => {
//      wizardWindow.webContents.send('action-update', param);
//       if (!wizardWindow) {
//         throw new Error('"newWindow" is not defined');
//       }
//       if (process.env.START_MINIMIZED) {
//         wizardWindow.minimize();
//       } else {
//         wizardWindow.show();
//         wizardWindow.focus();
//       }
//     });
//     wizardWindow.on('closed', () => {
//       windows.delete(wizardWindow);
//       wizardWindow = null;
//     });
//     windows.add(wizardWindow);
//     return wizardWindow;
//   }
//   export default class AppUpdater {
//     constructor() {
//       log.transports.file.level = 'info';
//       autoUpdater.logger = log;
//       autoUpdater.checkForUpdatesAndNotify();
//     }
//   }
//   let newWindow: BrowserWindow | null = null;
//   if (process.env.NODE_ENV === 'production') {
//     const sourceMapSupport = require('source-map-support');
//     sourceMapSupport.install();
//   }
//   if (
//     process.env.NODE_ENV === 'development' ||
//     process.env.DEBUG_PROD === 'true'
//   ) {
//     require('electron-debug')();
//   }
//   const installExtensions = async () => {
//     const installer = require('electron-devtools-installer');
//     const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//     const extensions = ['REACT_DEVELOPER_TOOLS'];
//     return installer
//       .default(
//         extensions.map((name) => installer[name]),
//         forceDownload
//       )
//       .catch(console.log);
//   };
//   export const createWindow = async () => {
//     if (
//       process.env.NODE_ENV === 'development' ||
//       process.env.DEBUG_PROD === 'true'
//     ) {
//       await installExtensions();
//     }
//     let x, y;
//     const currentWindow = BrowserWindow.getFocusedWindow();
//     if (currentWindow) {
//       const [currentWindowX, currentWindowY] = currentWindow.getPosition();
//       x = currentWindowX + 24;
//       y = currentWindowY + 24;
//     }
//     let newWindow = new BrowserWindow({
//       show: false,
//       width: 1024,
//       height: 728,
//       icon: getAssetPath('icon.png'),
//       webPreferences: {
//           nodeIntegration: true,
//           enableRemoteModule: true,
//       },
//   });
//     newWindow.loadURL(`file://${__dirname}/index.html`);
//     // newWindow.loadURL(`http://localhost:1212/`);
//     newWindow.webContents.on('did-finish-load', () => {
//      if (!newWindow) {
//        throw new Error('"newWindow" is not defined');
//      }
//      if (process.env.START_MINIMIZED) {
//        newWindow.minimize();
//      } else {
//        newWindow.show();
//        newWindow.focus();
//      }
//      newWindow.maximize();
//    });
//     newWindow.webContents.openDevTools()
//    newWindow.on('closed', () => {
//      // stop redis server
//       //  stopServer(redisProcess)
//      // stop backend server
//       //  stopServer(backendProcess)
//        wizardWindow?.close()
//      windows.delete(newWindow);
//      newWindow = null;
//    });
//    newWindow.on('focus', () => {
//      const menuBuilder = new MenuBuilder(newWindow);
//      menuBuilder.buildMenu();
//    });
//     // Open urls in the user's browser
//    newWindow.webContents.on('new-window', (event, url) => {
//      event.preventDefault();
//      shell.openExternal(url);
//    });
//    ipcMain.on('wizToMainWindow', (event, arg) => {
//    newWindow.webContents.send( 'fromWizard', arg );
//     if(arg & arg.closeWindow) {
//       newWindow.close();
//     }
//    });
//    ipcMain.on('wizToMainGraphWindow', (event, arg) => {
//     // newWindow.webContents.send( 'fromWizard', arg );
//     newWindow.webContents.send( 'fromWorksheetWizard', arg );
//   });
//   ipcMain.on('sendChildHeadData', (event, arg) => {
//     if(wizardWindow){
//       wizardWindow.webContents.send( 'mainHeadData', arg );
//     }
//   });
//   ipcMain.on('sendChildHeadDataToTestWizard', (event, arg) => {
//     if(wizardWindow){
//     wizardWindow.webContents.send( 'mainHeadDataToTestWizard', arg );
//     }
//   });
//   ipcMain.on('quitWizard', (e) => {
//     wizardWindow.close();
//   })
//    ipcMain.on('wizToMainWindowSpreadsheet', (event, arg) => {
//     newWindow.webContents.send( 'sendtoMainWindowSpreadSheet', arg );
//     });
//     ipcMain.on('openSmoothWizard', (event, arg) => {
//       newWindow.webContents.send( 'openSmoothWizards', arg );
//       });
//       ipcMain.on('openSampleSizeWizard', (event, arg) => {
//         newWindow.webContents.send( 'openSampleSizeWizards', arg );
//         });
//         ipcMain.on('openPowerWizard', (event, arg) => {
//           newWindow.webContents.send( 'openPowerWizards', arg );
//           });
//    windows.add(newWindow);
//    return newWindow;
//   };
//   /**
//    * Add event listeners...
//    */
// // setTimeout(()=>{
// //   client.get('testKey', function(err, res) {
// //     if (err) {
// //       console.log(err);
// //       app.quit();
// //     }
// //     if (res == null) {
// //       app.whenReady().then(createWindow).catch(console.log);
// //     }
// //   });
// // }, 0);
// client = redis.createClient(port, '127.0.0.1');
// // client = redis.createClient({
// //   port : 6379,
// //   host : '127.0.0.1',
// //   password : 'test@123',
// // })
// // client = redis.createClient({
// //   url: 'redis://:test123@127.0.0.1:6379',
// // });
// // client.auth('test@123');
// // client['auth'] = null;
// // client.send_command('AUTH', ['teja', 'test@123'], redis.print);
// client.on('connect', () => {
//   console.clear();
//   console.log('Connected to Redis');
// });
// client.on('ready',()=>{
//   console.clear();
//   console.log('Redis is ready!');
//   app.whenReady().then(createWindow).catch(console.log);
// });
// process.on('uncaughtException',(err)=>{
//   console.clear();
//   console.log(err);
//   // app.quit();
// });
//   app.on('window-all-closed', () => {
//     // Respect the OSX convention of having the application in memory even
//     // after all windows have been closed
//    wizardWindow?.close();
//     if (process.platform !== 'darwin') {
//       updateStatOptionsFile();
//       app.quit();
//     }
//   });
//    //app.whenReady().then(createWindow).catch(console.log);
//   app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     // if (newWindow === null) createWindow();
//     if (windows.size === 0) createWindow();
//   });
//   app.on('before-quit',()=>{
//     stopServer(ServerType.REDIS)
//     stopServer(ServerType.BACKEND)
//   })
//   // app.on('will-quit',()=>{
//   //   stopServer(redisProcess)
//   // })
//   ipcMain.on('request-mainprocess-action', (event, arg) => {
//     createWizatdWindow(arg);
//   });
/* eslint global-require: off, no-console: off */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
require("core-js/stable");
require("regenerator-runtime/runtime");
var path_1 = require("path");
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var electron_log_1 = require("electron-log");
var menu_1 = require("./menu");
var child = require("child_process");
var globalUtility_1 = require("./utils/globalUtility");
var process_1 = require("process");
var redis = require('redis');
var child_proc = require('child_process');
var windows = new Set();
var ipcMain = require('electron').ipcMain;
var wizardWindow = null;
var port = 6379;
var redisProcess;
var backendProcess;
var client;
//resource path
var RESOURCES_PATH = electron_1.app.isPackaged
    ? path_1["default"].join(process_1["default"].resourcesPath, 'assets')
    : path_1["default"].join(__dirname, '../assets');
var getAssetPath = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return path_1["default"].join.apply(path_1["default"], __spreadArray([RESOURCES_PATH], paths, false));
};
var ServerType;
(function (ServerType) {
    ServerType[ServerType["REDIS"] = 1] = "REDIS";
    ServerType[ServerType["BACKEND"] = 2] = "BACKEND";
})(ServerType || (ServerType = {}));
var PlatformType;
(function (PlatformType) {
    PlatformType["DARWIN"] = "darwin";
    PlatformType["WINDOWS"] = "win32";
})(PlatformType || (PlatformType = {}));
// Start server
var startServer = function (folderPath, type) { return __awaiter(void 0, void 0, void 0, function () {
    var path, args, serverProcess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("hellooo in here");
                console.log(process_1["default"].platform, "process.platform");
                path = '';
                if (!(process_1["default"].platform === PlatformType.DARWIN)) return [3 /*break*/, 4];
                if (!(type == ServerType.REDIS)) return [3 /*break*/, 2];
                path = folderPath + "/redis-server";
                args = [];
                return [4 /*yield*/, child.execFile(path, args)];
            case 1:
                serverProcess = _a.sent();
                serverProcess.on('error', function (err) {
                    console.log('Following error occurred : ' + err.code);
                    electron_1.app.quit();
                    return null;
                });
                return [2 /*return*/, serverProcess];
            case 2:
                if (type == ServerType.BACKEND) {
                    path = folderPath + "/backend-mac/sigma";
                    args = ['runserver'];
                    serverProcess = child.execFile(path, args);
                    return [2 /*return*/, serverProcess];
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                if (process_1["default"].platform === PlatformType.WINDOWS) {
                    if (type == ServerType.REDIS) {
                        path = folderPath + "\\redis-server-win\\redis-server.exe";
                    }
                    else if (type == ServerType.BACKEND) {
                        path = folderPath + "\\backend-win\\sigma.exe runserver";
                    }
                    console.log(path, "path-->");
                    serverProcess = child_proc.spawn(path, [], {
                        encoding: 'utf8',
                        shell: true
                    });
                    console.log(serverProcess, "serverProcess-->");
                    serverProcess.on('error', function (err) {
                        console.log('Following error occurred : ' + err.code);
                        electron_1.app.quit();
                        return null;
                    });
                    return [2 /*return*/, serverProcess];
                }
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var stopServer = function (proc, type) {
    if (process_1["default"].platform === PlatformType.DARWIN) {
        if (type === ServerType.REDIS) {
            child.exec("kill -9 $(lsof -ti:6379) ");
        }
        else if (type == ServerType.BACKEND) {
            child.exec("kill -9 $(lsof -ti:8000)");
        }
    }
    if (process_1["default"].platform === PlatformType.WINDOWS) {
        if (type === ServerType.REDIS) {
            // var processPid = child.exec(`netstat -ano | findstr :6379`)
            child.exec("npx kill-port 6379");
        }
        else if (type === ServerType.BACKEND) {
            // var processPid = child.exec(`netstat -ano | findstr :8000`)
            child.exec("npx kill-port 8000");
        }
    }
};
// end server
var redisStart = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.clear();
                console.log("inside redis");
                return [4 /*yield*/, startServer(RESOURCES_PATH, ServerType.REDIS)];
            case 1:
                redisProcess = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
redisStart();
var backendStart = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.clear();
                console.log("inside backend");
                return [4 /*yield*/, startServer(RESOURCES_PATH, ServerType.BACKEND)];
            case 1:
                backendProcess = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
backendStart();
var createWizatdWindow = function (param) { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        wizardWindow = new electron_1.BrowserWindow({
            show: false,
            width: param.width ? param.width : 700,
            height: param.height ? param.height : 600,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        url = "file://" + __dirname + "/index.html#/" + param.path;
        if (param.type) {
            url += "/" + param.type;
        }
        wizardWindow.loadURL(url);
        //wizardWindow.loadURL(`file://${__dirname}/index.html` + `#/` + param.path);
        // Request to update the label in the renderer process of the second window
        wizardWindow.webContents.on('did-finish-load', function () {
            wizardWindow.webContents.send('action-update', param);
            if (!wizardWindow) {
                throw new Error('"newWindow" is not defined');
            }
            if (process_1["default"].env.START_MINIMIZED) {
                wizardWindow.minimize();
            }
            else {
                wizardWindow.show();
                wizardWindow.focus();
            }
        });
        wizardWindow.on('closed', function () {
            windows["delete"](wizardWindow);
            wizardWindow = null;
        });
        windows.add(wizardWindow);
        return [2 /*return*/, wizardWindow];
    });
}); };
exports.createWizatdWindow = createWizatdWindow;
var AppUpdater = /** @class */ (function () {
    function AppUpdater() {
        electron_log_1["default"].transports.file.level = 'info';
        electron_updater_1.autoUpdater.logger = electron_log_1["default"];
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    }
    return AppUpdater;
}());
exports["default"] = AppUpdater;
var newWindow = null;
if (process_1["default"].env.NODE_ENV === 'production') {
    var sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}
if (process_1["default"].env.NODE_ENV === 'development' ||
    process_1["default"].env.DEBUG_PROD === 'true') {
    require('electron-debug')();
}
var installExtensions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var installer, forceDownload, extensions;
    return __generator(this, function (_a) {
        installer = require('electron-devtools-installer');
        forceDownload = !!process_1["default"].env.UPGRADE_EXTENSIONS;
        extensions = ['REACT_DEVELOPER_TOOLS'];
        return [2 /*return*/, installer["default"](extensions.map(function (name) { return installer[name]; }), forceDownload)["catch"](console.log)];
    });
}); };
var createWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var x, y, currentWindow, _a, currentWindowX, currentWindowY, newWindow;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(process_1["default"].env.NODE_ENV === 'development' ||
                    process_1["default"].env.DEBUG_PROD === 'true')) return [3 /*break*/, 2];
                return [4 /*yield*/, installExtensions()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                currentWindow = electron_1.BrowserWindow.getFocusedWindow();
                if (currentWindow) {
                    _a = currentWindow.getPosition(), currentWindowX = _a[0], currentWindowY = _a[1];
                    x = currentWindowX + 24;
                    y = currentWindowY + 24;
                }
                newWindow = new electron_1.BrowserWindow({
                    show: false,
                    width: 1024,
                    height: 728,
                    icon: getAssetPath('icon.png'),
                    webPreferences: {
                        nodeIntegration: true,
                        enableRemoteModule: true
                    }
                });
                newWindow.loadURL("file://" + __dirname + "/index.html");
                // newWindow.loadURL(`http://localhost:1212/`);
                newWindow.webContents.on('did-finish-load', function () {
                    if (!newWindow) {
                        throw new Error('"newWindow" is not defined');
                    }
                    if (process_1["default"].env.START_MINIMIZED) {
                        newWindow.minimize();
                    }
                    else {
                        newWindow.show();
                        newWindow.focus();
                    }
                    newWindow.maximize();
                });
                newWindow.webContents.openDevTools();
                newWindow.on('closed', function () {
                    // stop redis server
                    //  stopServer(redisProcess)
                    // stop backend server
                    //  stopServer(backendProcess)
                    wizardWindow === null || wizardWindow === void 0 ? void 0 : wizardWindow.close();
                    windows["delete"](newWindow);
                    newWindow = null;
                });
                newWindow.on('focus', function () {
                    var menuBuilder = new menu_1["default"](newWindow);
                    menuBuilder.buildMenu();
                });
                // Open urls in the user's browser
                newWindow.webContents.on('new-window', function (event, url) {
                    event.preventDefault();
                    electron_1.shell.openExternal(url);
                });
                ipcMain.on('wizToMainWindow', function (event, arg) {
                    newWindow.webContents.send('fromWizard', arg);
                    if (arg & arg.closeWindow) {
                        newWindow.close();
                    }
                });
                ipcMain.on('wizToMainGraphWindow', function (event, arg) {
                    // newWindow.webContents.send( 'fromWizard', arg );
                    newWindow.webContents.send('fromWorksheetWizard', arg);
                });
                ipcMain.on('sendChildHeadData', function (event, arg) {
                    if (wizardWindow) {
                        wizardWindow.webContents.send('mainHeadData', arg);
                    }
                });
                ipcMain.on('sendChildHeadDataToTestWizard', function (event, arg) {
                    if (wizardWindow) {
                        wizardWindow.webContents.send('mainHeadDataToTestWizard', arg);
                    }
                });
                ipcMain.on('quitWizard', function (e) {
                    wizardWindow.close();
                });
                ipcMain.on('wizToMainWindowSpreadsheet', function (event, arg) {
                    newWindow.webContents.send('sendtoMainWindowSpreadSheet', arg);
                });
                ipcMain.on('openSmoothWizard', function (event, arg) {
                    newWindow.webContents.send('openSmoothWizards', arg);
                });
                ipcMain.on('openSampleSizeWizard', function (event, arg) {
                    newWindow.webContents.send('openSampleSizeWizards', arg);
                });
                ipcMain.on('openPowerWizard', function (event, arg) {
                    newWindow.webContents.send('openPowerWizards', arg);
                });
                windows.add(newWindow);
                return [2 /*return*/, newWindow];
        }
    });
}); };
exports.createWindow = createWindow;
client = redis.createClient(port, '127.0.0.1');
client.on('connect', function () {
    console.clear();
    console.log('Connected to Redis');
});
client.on('ready', function () {
    console.clear();
    console.log('Redis is ready!');
    electron_1.app.whenReady().then(exports.createWindow)["catch"](console.log);
});
process_1["default"].on('uncaughtException', function (err) {
    console.clear();
    console.log(err, "inside uncaught");
    // app.quit();
});
electron_1.app.on('window-all-closed', function () {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    console.log("hello in windows");
    wizardWindow === null || wizardWindow === void 0 ? void 0 : wizardWindow.close();
    if (process_1["default"].platform !== 'darwin') {
        (0, globalUtility_1.updateStatOptionsFile)();
        electron_1.app.quit();
        console.log("hello in windows");
    }
});
//app.whenReady().then(createWindow).catch(console.log);
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (newWindow === null) createWindow();
    if (windows.size === 0)
        (0, exports.createWindow)();
});
electron_1.app.on('before-quit', function () {
    stopServer(redisProcess, ServerType.REDIS);
    stopServer(backendProcess, ServerType.BACKEND);
});
ipcMain.on('request-mainprocess-action', function (event, arg) {
    (0, exports.createWizatdWindow)(arg);
});
