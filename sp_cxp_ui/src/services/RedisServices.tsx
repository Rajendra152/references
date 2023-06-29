 import { RedisClient, Multi , createClient, addCommand } from 'redis';
 import {Promise} from 'bluebird';
 const {promisify} = require('util');
 const NOTEBOOKSPATH = 'notebookspath'
 import { readINIFile, getOS} from '../utils/globalUtility'
//  const {  app } = require('electron');
 import { remote, app } from 'electron'
//  const {remote} = require('electron');
//  const {app} = remote;

//  let sharedVariable = remote.getGlobal('shared')

//  var client = createClient({
//   port: 6379,
//   host: '127.0.0.1',
//   password: 'MnU!G5Le#',
//   });


 Promise.promisifyAll(RedisClient.prototype);
 Promise.promisifyAll(Multi.prototype);

 let cmds = ["json.del", "json.get", "json.mget", "json.set", "json.type", "json.numincrby", "json.nummultby", "json.strappend", "json.strlen", "json.arrappend", "json.arrindex", "json.arrinsert", "json.arrlen", "json.arrpop", "json.arrtrim", "json.objkeys", "json.objlen", "json.debug", "json.forget", "json.resp"];

  cmds.forEach(function(aCmd) {
    addCommand(aCmd);
  });


// const client = createClient();

// const client2 = createClient({
//   port: 6379,
//   host: '127.0.0.1',
//   password: 'MnU!G5Le#',
//   })

export async function createNewSet(data: any, worksheetKey: any) {
    const keyIdentifier = worksheetKey;
    const client = createNewClient()
    const checkPublish = await publishData(client, keyIdentifier, data)
    const res = await client.set(keyIdentifier,JSON.stringify(data));
    const clientData  = {
        client : client,
        key : keyIdentifier
    }
    return Promise.resolve(clientData);
}

export async function getRegressionDataBykey(keyIdentifier:string){
  const client2 = createNewClient()
  const data = await client2.getAsync(keyIdentifier).then(function(response:string) {
    return JSON.parse(response);
  })
  return Promise.resolve(data);
}

export async function getDataSetByKey(keyIdentifier: any , client: { getAsync: (arg0: any) => Promise<any>; }){

  const data = await client.getAsync(keyIdentifier).then(function(response: string) {
    return JSON.parse(response);
  })
  return Promise.resolve(data);
}
export async function getDataSetByKeyHistogram(keyIdentifier: any , client: { getAsync: (arg0: any) => Promise<any>; }){

  const data = await client.getAsync(keyIdentifier).then(function(response: string) {

    return JSON.parse(response);
  })
  return Promise.resolve(data);
}

// function getRandomInt(max:any) {
//     return Math.floor(Math.random() * Math.floor(max));
// }


export async function updatDatasetInRedis(client: { set: (arg0: any, arg1: string) => any; }, data: any, worksheetId: any){
    let checkPublish = false
     const res = await client.set(worksheetId,JSON.stringify(data));
 
     if(res){
        checkPublish =  await publishData(client, worksheetId, data)
     }
     return Promise.resolve(checkPublish)
}

/* @Rahul */

// Creating New Client
export function createNewClient(configPath?: any){
 let basePath 
  if(!configPath){
    basePath =  remote.app.isPackaged ? remote.app.getAppPath().replace('app.asar','assets') : remote.app.getAppPath().replace('src', 'assets')
  }
  
  let path
  if(configPath){
    path = configPath
  } else {
  let OsType = getOS()
 
    if(OsType == 'Windows') {
      path = `${basePath}/backend-win/config/config.ini`
    } else {
      path = `${basePath}/backend-mac/config/config.ini`
    }
  }

  const configData =  readINIFile(path)
    return createClient({
      port: configData['redis'].port,
      host: '127.0.0.1',
      password: 'MnU!G5Le#',
      });
}

// Publishing Item to Channel
export async function publishData(client, keyIdentifier, data){
    const check = await client.publish(keyIdentifier, JSON.stringify(data))
    return keyIdentifier;
}

// Subscribing Channel
export async function subscribToChannel(client: { subscribe: (arg0: any) => any; }, keyIdentifier: any) {
  return client.subscribe(keyIdentifier);
}

//Listening To Publisher
export async function listenToChanges(client: { on: (arg0: string, arg1: (channel: any, message: any) => void) => void; }, callbackfn: (arg0: any, arg1: any) => void) {
  client.on("message",(channel: any,message: any) => {
    callbackfn(channel, message);
  })
}

// UnSubscribing Channel
export async function unsubscribToChannel(client: { unsubscribe: (arg0: any, arg1: any) => any; }, keyIdentifier: any, callbackfn: any) {
  return client.unsubscribe(keyIdentifier, callbackfn);
}


// End-- @Rahul


//@Narayanan

export async function loadRedisCli(){
 createNewClient()
}

export const getDataQueryKey = async(param: any) =>{
    let client = createNewClient();
    const data = await client.getAsync(param).then(function(response: string) {
      return JSON.parse(response);
    })
    return Promise.resolve(data);
  
}


export const setNotebookFilePath =  async (notebookId:string,path:string)=>{
  const client = createNewClient()
  const setAsync = promisify(client.json_set).bind(client);
  const getAsync = promisify(client.json_get).bind(client);
  // const data = await setAsync('NP-'+ notebookId, '.',JSON.stringify({[notebookId]: path}))
  const notebooklist = await getAsync(NOTEBOOKSPATH);
  let data: null | string = '';
  if(notebooklist === null){
    let setList = await setAsync(NOTEBOOKSPATH, '.' , '{}')
    if(setList === 'OK')
      data = await setAsync(NOTEBOOKSPATH,`.${notebookId}`, JSON.stringify({'filepath': path}))
  }
  else{
    data = await setAsync(NOTEBOOKSPATH,`.${notebookId}`, JSON.stringify({'filepath': path}))
  }
  return data
}

export const getNotebookFilePath = async (notebookId: string)=>{
  const client = createNewClient()
  const getAsync = promisify(client.json_get).bind(client);
  const getObjectKeysAsync = promisify(client.json_objkeys).bind(client);
  const objkeys = await getObjectKeysAsync(NOTEBOOKSPATH, '.')
  if(objkeys && objkeys.includes(notebookId)){
     const data = await getAsync(NOTEBOOKSPATH, `.${notebookId}`)
     return JSON.parse(data).filepath
  }
  else{
    return null
  }
}

//@Teja
