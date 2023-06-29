import * as Constinfo from './ConstInfo';
import * as FileImportFormat from './FileImportFormat';
import * as ProgressAction from './../../store/Channel/Progress/actions';
import path from 'path';
const {remote} = require('electron');
const fs = require('fs');
var redis = require("redis");
import {createNewClient, createNewSet, getDataSetByKey} from '../../services/RedisServices'
import { readINIFile } from '../../utils/globalUtility';
export const subscriber = createNewClient();
export const publisher = createNewClient();
// don't enable this one because of problem occured for wizard
// const dialog = remote.dialog;
// const browserWindow = remote.getCurrentWindow();
export var savePath = '';
let RESOURCES_PATH = "", fileName = "recentquery.json";
let FORMAT_RESOURCES_PATH = "", format_fileName = "formatname.json";

if (process.env.NODE_ENV === 'production') {
  RESOURCES_PATH = path.join(process.resourcesPath, 'assets');
  FORMAT_RESOURCES_PATH = path.join(process.resourcesPath, 'assets');
  if(process.platform === "darwin") {
    RESOURCES_PATH =  RESOURCES_PATH + "/" + fileName;
    FORMAT_RESOURCES_PATH =  FORMAT_RESOURCES_PATH + "/" + format_fileName;
  }

  if(process.platform === "win32") {
    RESOURCES_PATH =  RESOURCES_PATH + "\\" + fileName;
    FORMAT_RESOURCES_PATH =  FORMAT_RESOURCES_PATH + "\\" + format_fileName;
  }
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  RESOURCES_PATH = path.join(__dirname, '../assets');
  FORMAT_RESOURCES_PATH = path.join(__dirname, '../assets');
  if(process.platform === "darwin") {
    RESOURCES_PATH =  RESOURCES_PATH + "/" + fileName;
    FORMAT_RESOURCES_PATH =  FORMAT_RESOURCES_PATH + "/" + format_fileName;
  }

  if(process.platform === "win32") {
    RESOURCES_PATH =  RESOURCES_PATH + "\\" + fileName;
    FORMAT_RESOURCES_PATH =  FORMAT_RESOURCES_PATH + "\\" + format_fileName;
  }
}

const recentQueryPath = `${RESOURCES_PATH}`;
const formatQueryPath = `${FORMAT_RESOURCES_PATH}`;

  const options = {
    title: "Save file",
    defaultPath : "query",
    buttonLabel : "Save",
    filters :[
        {name: 'Text File(*.txt)', extensions: ['txt']},
        {name: 'All Files', extensions: ['*']}
    ]
  };

export const imageProp = (src, className) =>{
    return {
        imageProps: {
            src: src,
            className: className
        }
    }
}

export const checkNotNull = (param) =>{
  return (param === null || param === undefined || param === "" || param === 'undefined')?
          false :
          true
}


export const openSaveAs = async(param, keyname) =>{
  let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
  await saveDialog.then(function(saveTo) {
      if(saveTo.filePath){
        fs.writeFileSync(saveTo.filePath, param, 'utf-8');
        savePath = saveTo.filePath;
        let recentQuery = getRecentQuery();
        recentQuery.push(saveTo.filePath);
        recentQuery = [...new Set(recentQuery)];
        recentQuery = JSON.stringify(recentQuery);
        fs.writeFileSync(recentQueryPath, recentQuery, 'utf-8');
      }
  });
};

// Checking JSON file
export const isRecentQryJson = (param) =>{
  try {
    console.log(param);
    if (fs.existsSync(param)) {
      console.log('is file ? ' + true);
    }else {
      console.log('File was found')
      // fs.writeFile(recentQueryPath, "");
      fs.writeFile (param, "", function(err) {
        // if (err) throw err;
        console.log('complete');
        }
    );
    }
  } catch(err) {
    console.error(err)
  }
}

export const readReportOptionsFromINIFile = async () => {
  let testResultOptions: Object = {
    significant_digits: 0,
    scientific_notations: 0,
    explain_test_results: 0,
    significant_p_value: 0,
    max_char_length: 30
  }
  console.log('INI file contains',readINIFile());  
  let dataKey = readINIFile();
  console.log(dataKey);
 
  try {
    let { significant_digits, scientific_notations, explain_test_results, significant_p_value, max_char_length } = dataKey.Options.Editor;
    if (Number(significant_digits) < 1 || Number(significant_digits) > 16) {
      // alert("Please enter a significant digits value between 1 and 16")
      
      return;
    }
    if (Number(significant_p_value) < 0 || Number(significant_p_value) > 1) {
      alert("Please enter a P Value between 0 and 1")
     
      return;
    }
    if (Number(max_char_length) < 30 || Number(max_char_length) > 255) {
      alert("Enter an integer between 30 and 255")
      return;
    }
    if(significant_digits)
      testResultOptions.significant_digits = Number(significant_digits);
    if(scientific_notations)
      testResultOptions.scientific_notations = Number(scientific_notations);
    if(explain_test_results)
      testResultOptions.explain_test_results = Number(explain_test_results);
    if(significant_p_value)
      testResultOptions.significant_p_value = Number(significant_p_value);
    if(max_char_length)
      testResultOptions.max_char_length = Number(max_char_length);
    
    console.log(testResultOptions);
  }
  catch (err) {
    console.log(err);
  }
 
  createNewSet(testResultOptions, 'global_options');
  const client = createNewClient(); 
  let optionsData = await getDataSetByKey('global_options', client)
  console.log(optionsData);
  return optionsData;
}

export const getRecentQuery = () =>{
  isRecentQryJson(recentQueryPath);
  var data=fs.readFileSync(recentQueryPath, 'utf8');
  if(checkNotNull(data)){
    return JSON.parse(data);
  }
  return [];
}

export const removeRecentQuery = (param) =>{
  let data = getRecentQuery();
  if(data.length > 0){
    let index = data.findIndex((a)=>a===param);
    if(index !== -1){
      data.splice(index, 1);
    }
  }
  data = [...new Set(data)];
  data = JSON.stringify(data);
  fs.writeFileSync(recentQueryPath, data, 'utf-8');
}


export const updateRecentQuery = (param, info) =>{
  fs.writeFileSync(param, info, 'utf-8');
}
//  Reference
//  https://www.electronjs.org/docs/api/dialog#dialogshowmessageboxbrowserwindow-options-callback

export const showMessageBox = (param) =>{
  let option = {
    message: param.message,
    type: param.type,
    detail: (param.detail)? "More... \n\n" + param.detail: "",
    title: Constinfo.version
  }
  remote.dialog.showMessageBoxSync(remote.getCurrentWindow(), option);
}


export const openImportfile = async() =>{
  let fileOptions = {
    title: "Open File",
    // defaultPath : "query",
    buttonLabel : "Open",
    filters : FileImportFormat.FileImport
  }
  let saveDialog = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), fileOptions);
  return saveDialog;
}


export const ExcelDateToJSDate = (serial) =>{
  var utc_days  = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

export const saveFormatSchema = async(param, keyname) =>{
  let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
  await saveDialog.then(function(saveTo) {
      if(saveTo.filePath){
        fs.writeFileSync(saveTo.filePath, param, 'utf-8');
        savePath = saveTo.filePath;
        let recentFormatSchema = getFormatSchemaQuery();
        recentFormatSchema.push(saveTo.filePath);
        recentFormatSchema = [...new Set(recentFormatSchema)];
        recentFormatSchema = JSON.stringify(recentFormatSchema);
        fs.writeFileSync(formatQueryPath, recentFormatSchema, 'utf-8');
      }
  });
};

export const getFormatSchemaQuery = () =>{
  isRecentQryJson(formatQueryPath);
  var data=fs.readFileSync(formatQueryPath, 'utf8');
  if(checkNotNull(data)){
    return JSON.parse(data);
  }
  return [];
}


export const removeFormatQuery = (param) =>{
  let data = getFormatSchemaQuery();
  if(data.length > 0){
    let index = data.findIndex((a)=>a===param);
    if(index !== -1){
      data.splice(index, 1);
    }
  }
  data = [...new Set(data)];
  data = JSON.stringify(data);
  fs.writeFileSync(formatQueryPath, data, 'utf-8');
}

export const createSubscribeChannel = (param)=>{
  subscriber.subscribe(param);
}

export const unSubscribeChannel = (param)=>{
  subscriber.unsubscribe(param);
  subscriber.removeAllListeners();
  publisher.removeAllListeners();
}


export const subscribeToChannel = ()=>{
  // alert("inside subscrbe")
   ProgressAction.isLoadBar({message: true});
   console.log('subscribing to channel user input!')
   subscriber.on("message",(channel,message) => {
   console.log(message);
   ProgressAction.updatePercentageMessage({message: message});
  //  console.log("Calling InteractiveFlow test");
  if(message==100||message=='100'){
    ProgressAction.updatePercentageMessage({message: 0});
    ProgressAction.isLoadBar({message: false});
    unSubscribeChannel('progress');
  }
  //  return message;
   })
 }

 export const publishToChannel = ()=>{
  console.log('publishing data to progress!')
  publisher.publish("progress",'progressbar')
 }
//   const publishToChannelCanceledByUser = ()=>{
//   console.log('publishing data to progress!')
//   publisher.publish("progress",'No need to run one sample t test')
//  }

// const InteractiveFlow=(message:any)=>{
//   console.log("Interactive calling")
//   let response=message;
//   console.log("message",response)

//   if(response === "Do you want to run the One Sample T Test"){
//     if(confirm ('Do you want to run the One Sample T Test?')) {
//      publishToChannel();
//      //subscriber.unsubscribe();
//     // subscriber.quit();
//     }
//     else {
//       publishToChannelCanceledByUser();
//     }
//   }
// }
