import * as Config from '../components/App/Config';
import { get, post } from './DataService';

export async function addNewSchema(info) {
  const data = await post(
    Config.dbConnection,
    info
  );
  return data;
}


export async function schemaList(info) {
  const data = await get(Config.schemaList);
  return data;
}


export async function ODBCQuery(param) {
  const data = await post(
    Config.ODBCQuery,
    param
  );
  return data;
}


export async function executeODBCDNSQuery(param) {
  const data = await post(
    Config.executeODBCDNSQuery,
    param
  );
  return data;
}


export async function disConnection() {
  const data = await get(
    Config.disConnection,
  );
  return data;
}


export async function getTableCols(param) {
  const data = await post(
    Config.getTableCols,
    param
  );
  return data;
}


export async function importData(param) {
  const data = await post(
    Config.importData,
    param
  );
  return data;
}


export async function ODBCConnStr(param) {
  const data = await post(
    Config.dbConnection,
    param
  );
  return data;
}


export async function ODBCConnPath(param) {
  const data = await post(
    Config.ODBCConnPath,
    param
  );
  return data;
}


export async function getODBCPath() {
  const data = await get(
    Config.getODBCPath,
  );
  return data;
}
