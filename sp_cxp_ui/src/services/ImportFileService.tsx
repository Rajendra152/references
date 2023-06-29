import { post } from './DataService';
import * as Config from '../components/App/Config';

export async function getFileSelectionInfo(info) {
  const data = await post(
    Config.getFileSelectionInfo,
    info
  );
  return data;
}



export async function queryFileSelectionInfo(info) {
  const data = post(
    Config.queryFileSelectionInfo,
    info
  );
  return data;
}


export async function getImportTextInfo(info) {
  const data = post(
    Config.getImportTextInfo,
    info
  );
  return data;
}


export async function queryImportTextInfo(info) {
  const data = post(
    Config.queryImportTextInfo,
    info
  );
  return data;
}

export async function getSpreadSheetInfo(info) {
  const data = post(
    Config.getSpreadSheetInfo,
    info
  );
  return data;
}

export async function querySpreadSheetInfo(info) {
  const data = post(
    Config.querySpreadSheetInfo,
    info
  );
  return data;
}


export async function getRDataFileSelectionInfo(info) {
  const data = await post(
    Config.getRDataFileSelectionInfo,
    info
  );
  return data;
}
