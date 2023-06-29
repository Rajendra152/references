import axios from 'axios';
import * as Config from '../components/App/Config';
import { updateData } from './WorksheetServicesNew';
import { getDataSetByKey, createNewClient } from './RedisServices';
import * as child from 'child_process';
const detect = require('detect-port');
const {remote, app}  = require('electron')
import {appendConfigFile, getOS} from '../utils/globalUtility'
const child_proc = require('child_process');
import global from '../components/CommonComp/global'
let ports = {
    redis : 6379,
    backend : 8000
}
let basePath 
let configPath
basePath =  remote.app.isPackaged ? remote.app.getAppPath().replace('app.asar','assets') : remote.app.getAppPath().replace('src', 'assets')

const client = createNewClient();
const tokens = {
    accessToken: '',
    refreshToken: ''
}

setTokenFromRedis();

const startServer = async (folderPath: string, osType : string, freep: undefined) => {
    console.log(folderPath)
    let path: string = '';
    let args: string[];
    let serverProcess: child.ChildProcess;
 
    if (osType === 'Mac OS') {
       configPath = `${basePath}/backend-mac/config/config.ini`
        path = `${folderPath}/backend-mac/sigma runserver 127.0.0.1:${freep}`
        args = []
        console.log(path, "path----->")
      serverProcess = child_proc.spawn(path, [], {
        encoding: 'utf8',
        shell: true,
      });
      let data = ""
      console.log(serverProcess, "path----->")
      for await (const chunk of serverProcess.stdout) {
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
    else if (osType === 'Windows') {
      path = `set JAVA_HOME=${folderPath}\\java-win\\jre1.8.0_301 & call ${folderPath}\\backend-win\\sigma.exe runserver  127.0.0.1:${freep}`  
      serverProcess = child_proc.spawn(path, [], {
        encoding: 'utf8',
        shell: true,
      });
      let data = ""
      for await (const chunk of serverProcess.stdout) {
        data += chunk;
        if (osType == 'Windows') {
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

const checkPortAvailablity = (port: number, isRedisProcess: boolean) => {
    let ostype = getOS()
    if(ostype === 'Mac OS'){
      configPath = `${basePath}/backend-mac/config/config.ini`
    } else {
      configPath = `${basePath}/backend-win/config/config.ini`
    }
    detect(port)
    .then((_port: any) => {
      if (port == _port) {
          global.shared.backendPort = port;
          ports.backend = port
          appendConfigFile(port, configPath, false)
          startServer(basePath, ostype, port);
      } else {
          global.shared.backendPort = _port;
          ports.backend = _port
          appendConfigFile(_port, configPath, false)
          startServer(basePath, ostype, _port);        
      }
     
    })
    .catch((err: any) => {
      console.log(err);
    });
  } 


export const post = async (url: string, payload: any) => {
    console.log('inside post');
    const data = await axios.post(url, payload, {
        headers: {
            authorization: `Bearer ${tokens.accessToken}`
        }
    }).catch((e) => {
        if (e == "Error: Network Error") {
            // alert("Please restart the backend server!");
             //options object for dialog.showMessageBox(...)
  let options = {}
  //Can be "none", "info", "error", "question" or "warning".
  options.type = "info"
  //Array of texts for buttons.
  options.buttons = ["&OK"]

  //Index of the button in the buttons array which will be selected by default when the message box opens.
  options.defaultId = 2

  //Title of the message box
  options.title = "Sigmaplot"
  //Content of the message box
  options.message = "Please restart the backend"

  //More information of the message
  options.detail = "Press OK"

  //Normalize the keyboard access keys
  options.normalizeAccessKeys = true




  

 let valuesReturned =  remote.dialog.showMessageBox(options) 
      console.log(valuesReturned, "valuesReturned")
      valuesReturned.then((value) => {
           checkPortAvailablity(8000)
      })
      return
   
        }
        if (e.response.status && e.response.status === 401) {
            return getNewToken(url, post, payload);
        } else {
            return e.response;
        }
    })
    console.log('data in post: ' + post)
    return data;
}

export const get = async (url: string) => {
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${tokens.accessToken}`
        }
    }).catch((e) => {
        if (e.response.status !== undefined) {
            if (e.response.status && e.response.status === 401) {
                return getNewToken(url, get);
            } else {
                return e.response;
            }
        }
    })
    return data;
}

async function getNewToken(url: string, callback: Function, payload?: any) {
    const data = await updateToken(url, callback, payload);
    return data;
}

async function updateToken(url: string, callback: Function, payload?: any) {
    try {
        if (tokens.refreshToken) {
            const response = await axios.post(Config.refreshToken, {
                refresh: tokens.refreshToken
            })
            if (response && response.data && response.data.access) {
                tokens.accessToken = response.data.access;
                await updateTokenInRedis({ refresh: tokens.refreshToken, access: response.data.access });
                const data = await callback(url, payload);
                return data;
            }
        } else {
            const data = await getToken(url, callback, payload);
            return data;
        }
    } catch (e) {
        const data = await getToken(url, callback, payload);
        return data;
    }
}

async function getToken(url?: string, callback?: Function, payload?: any) {
    try {
        const response = await axios.post(Config.getToken, {
            username: Config.username,
            password: Config.password
        });
        await updateTokenInRedis(response.data);
        if (callback) {
            const data = await callback(url, payload);
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

async function setTokenFromRedis() {
    const data = await getDataSetByKey(Config.tokensRedisKey, client);
    if (data) {
        tokens.accessToken = data.access;
        tokens.refreshToken = data.refresh;
    }
}

async function updateTokenInRedis(token: any) {
    tokens.accessToken = token.access;
    tokens.refreshToken = token.refresh;
    await updateData(
        client,
        token,
        Config.tokensRedisKey
    );
}