import { RedisClient, Multi } from 'redis'
import {Promise} from 'bluebird'
Promise.promisifyAll(RedisClient.prototype);
Promise.promisifyAll(Multi.prototype);


import  { getAllKeys, createNewSet,getDataSetByKey, getRegressionDataBykey}  from '../../services/RedisServices'

export  async function getAllDataKeys() {
    const data = await getAllKeys();
    console.log(data[1]);
}

export  async function createDataSet(data, worksheetKey) {
    const keyIdentifier = await createNewSet(data, worksheetKey);
    return keyIdentifier;
}


export async function getDataSet(key:string){
    const value = await getRegressionDataBykey(key)
    return value
  }

