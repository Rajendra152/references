import { getDataSetByKey,createNewClient } from '../services/RedisServices';
import { remote } from 'electron';
import { Subject } from 'rxjs';
import Options from '../store/MainWindow/Options';
import { config } from 'process';

const os = require('os');
const fs = require('fs');
const ini = require('ini');
// import { remote } from 'electron'

export const homeDir = os.homedir();
const path = '/Documents/SigmaPlot/SPW15';
const statOptionsFileName = 'spw32.optx';
let userSettings = homeDir + path + '/spwUserSettings.ini';


export const createSigmaPlotDir = () => {
    const dir = homeDir + path;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}

export const createNewFile = (fileName: string, content: any) => {
    if(!fileName) {
        return;
    }
    let filePath = homeDir + path + '/' + fileName;
    fs.writeFile(filePath, content, (err: any) => {
        if(err){
            console.log("An error ocurred creating the file "+ err.message)
        }
                    
        console.log(fileName + " The file has been succesfully saved");
    });
}

export const updateStatOptionsFile = async (configPath) => {
const client = createNewClient(configPath);
    let optionsData = await getDataSetByKey(os.userInfo().username, client);
    if(!(!optionsData ||
        optionsData == 'nil' ||
        typeof optionsData !== 'object' ||
        (typeof optionsData === 'object' && Object.keys(optionsData).length === 0))) {
        createSigmaPlotDir();
        createNewFile(statOptionsFileName, JSON.stringify(optionsData));
    }
}

export const showMessageBox = (options: any) => {
    return remote.dialog.showMessageBox(options);
}

export const showOpenDialog = (options: any) => {
    const WIN = remote.getCurrentWindow();
    return remote.dialog.showOpenDialog(WIN, options);
}

export const showSaveDialog = (options: any) => {
    const WIN = remote.getCurrentWindow();
    return remote.dialog.showSaveDialog(WIN, options);
}

export const readFile = (filePath: string, callback: Function) => {
    fs.readFile(filePath, 'utf8', callback);
}

export const writeFile = (filePath: string, content: any, callback: Function) => {
    if(!filePath) {
        return;
    }
    fs.writeFile(filePath, content, callback);
}

export const writeINIFile = (options: any, configPath ?: string | undefined) => {
    const iniText = ini.stringify(options, { section: 'Options' });
    console.log("hello in here=====>")
    console.log(iniText)
    if(configPath){
         fs.writeFileSync(configPath, iniText);
    } else {
        fs.writeFileSync(userSettings, iniText);
    }
    console.log("writeini", configPath, userSettings)
    console.log(`Data written to ${userSettings}`);
}

export const appendConfigFile = (port: any,  configPath: string | undefined, isRedisPort: boolean) => {
    let data = readINIFile(configPath, true)

    console.log(typeof(data), "hellooooooooooo9867>", configPath)
    // let section 
    if(isRedisPort) {
       if(data['redis']?.port == undefined){
        data['redis'] = {port : 6379}
       } else {
        data['redis'].port = port
       }
    } else {
        data['backend']= {port : port }
    }
    fs.writeFileSync(configPath, ini.stringify(data))
}
export const readINIFile = (configPath: string | undefined) => {
    console.log("hefdsdhdfjghjd", "gdfhsdhfgh", configPath)
    let path
    if(configPath){
        path = configPath
    } else {
        path = userSettings
    }
try {
        return ini.parse(fs.readFileSync(path, 'utf-8'));
    } catch(err) {
        return {};
    }
}

export const transposeArray = (data: any) => {
    if(!data || !Array.isArray(data)) return data;

    let dataArray: any = [];
    if(data.length > 0){
    if(data[0].length > data.length) {
        dataArray = [...data[0]];
    } else if(data[0].length <= data.length) {
        dataArray = [...data];
    }
}
    const transposedData = dataArray.map((_,colIndex: number)=> data.map((row: any) => (row[colIndex])? row[colIndex]: {value: ''}));
    return transposedData;
}

const subject = new Subject();

export const dataService = {
    sendData: (data: any) => subject.next(data),
    getData: () => subject.asObservable()
};

export const  getOS = () => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  };


export const  getSystemHostName = () => {
    return os.hostname();
  };

  
export const debounce = (fn: (arg0: any) => void, delay: number) => {
   let timeoutId: NodeJS.Timeout;
   return (...args: any) => {
      if(timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(()=>{fn(...args)}, delay)
  }
}

export const writeIntoINIFile = (data: any, file?:any) => {
    const filePath = `${homeDir}${path}/${file}`
    const iniText = ini.stringify(data);
    fs.writeFileSync(filePath, iniText);
}

export const readFromINIFile = (file?:any, isBackendConfig?: boolean) => {
    let filePath
    if(isBackendConfig){
        filePath = file
    } else {
        filePath  = `${homeDir}${path}/${file}`
    }
    try {
        return ini.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch(err) {
        return {};
    }
}