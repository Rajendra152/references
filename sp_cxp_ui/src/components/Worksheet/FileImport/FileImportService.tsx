

export const getFilePath = (param: String[]) =>{

  let findExt = [];
  if(param){
    if(param.length > 0){
      if(process.platform === "win32"){
        param.map(a=> a.replace('\\', '\\\\'));
      }
      if(process.platform === "darwin"){
        param.map(a=> a.replaceAll('/', '\\\\'));
      }
      for (let i = 0; i < param.length; i++) {
        const element = param[i];
        let data = element.split('.');
        findExt.push(data[1]);
      }
    }
    console.log(param, 'File List');
    return findExt;
  }
}

const isSpreadsheetArr = ['xlsx', 'xls', 'wq1'];

const isImportTextArr = ['txt', 'prn','dat', 'asc', 'csv'];

const isOpenImportfileArr = ['sav', 'mtw','mpj','sd2', 'sas7bdat', 'rdata' ,'dta' ,'mat','xpt' ,'jmp',  'db', 'wk1', 'wri', 'wrk', 'wks', 'wk*', 'sys', 'syd'];

// const isTableQueryArr = ['mdb'];
const isTableQueryArr = [];

export const isSpreadSheetFormat = (param: String) =>{
  if(isSpreadsheetArr.includes(param)){
    return true
  }
  return false
}


export const isImportTextFormat = (param: String) =>{
  if(isImportTextArr.includes(param)){
    return true
  }
  return false
}


export const isTableQueryFormat = (param: String) =>{
  if(isTableQueryArr.includes(param)){
    return true
  }
  return false
}

export const isOpenImportfileFormat = (param: String) =>{
  if(isOpenImportfileArr.includes(param)){
    return true
  }
  return false
}
