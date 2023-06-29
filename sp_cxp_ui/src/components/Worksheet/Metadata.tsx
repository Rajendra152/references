import { ExcelDateToJSDate } from './../Constant/ConstantFunction';
import moment from 'moment';

export const isNumeric = (n) =>{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const isString = (param) =>{
  // let data = (paramArray).filter(a=>{
  //   if(a.hasOwnProperty('formula')){
  //     return (typeof a.value === 'string')? true: false;
  //   }
  // });
  // return data;
  let stringType = 0,numberType=0,formulaStr = 0,formulaNum = 0;
  for (let i = 0; i < param.length; i++) {
    const element = param[i];
    if(element.hasOwnProperty('value')){
      let formula = false;
      if(element.hasOwnProperty('formula')){
       if(element.formula !== "" && element.formula !== undefined && element.formula !== null){
          formula = true
       }
      }
      if(formula){
        if(typeof element.value === 'number'){
          formulaNum++;
        }
        if(typeof element.value === 'string'){
          formulaStr++;
        }
      }else {        
        if(typeof element.value === 'number'){
          numberType++;
        }
        if(typeof element.value === 'string'){
          if(element.value !== "" && element.value !== undefined && element.value !== null){
            let typeNum = isNumeric(element.value);
            if(typeof typeNum === 'number'){
              element.value = Number(element.value);
              numberType++;
            }else{
              stringType++;
            }            
          }         
        }
      }
    }
  }

  return (stringType>0)? true: false;
}


export const isBigword = (paramArray) =>{
  let wordlen = 0;
  for (let i = 0; i < paramArray.length; i++) {
    const a = paramArray[i];
    if(a.hasOwnProperty('value')){
      if(a.value || typeof a.value === 'number'){
        let letter = a.value.toString().length;
        if(wordlen < letter){
          wordlen = letter;
        }
      }
    }
  }
  return wordlen;
}

export const getFormat = (param) =>{
  let data = (param).filter(a=>a.hasOwnProperty('value')==true);
  let formula = (param).filter(a=>a.hasOwnProperty('formula')==true);
  let formatflt = (param).filter(a=>a.hasOwnProperty('format')==true);
  let formulaStr = '', listofformulalen = 0, datalen = 0, formatStr = '', listofformatlen = 0;
  if(formula.length > 0){
    formulaStr = formula[0].formula;
  }
  if(formatflt.length > 0){
    formatStr = formatflt[0].format;
  }
  let listofFormula = (param).filter(a=>{
    if(a.hasOwnProperty('formula')==true){
      if(a.formula == formulaStr){
        return a;
      }
    }
  });

  let listofFormat = (param).filter(a=>{
    if(a.hasOwnProperty('format')==true){
      if(a.format == formatStr){
        return a;
      }
    }
  });

  listofformulalen = listofFormula.length;
  listofformatlen = listofFormat.length;
  datalen = data.length;
  if(listofformulalen === datalen && (datalen !== 0 && listofformulalen !== 0)){
    return {isFormat: true, formula: listofFormula[0].formula, data: listofFormula }
  }
  if(listofformatlen === datalen && (datalen !== 0 && listofformatlen !== 0)){
    return {isFormat: true, format: listofFormat[0].format, data: listofFormat }
  }
  return {isFormat: false, formula: '' }
}

export const getOriginalFormat = (param) =>{
  if(param.hasOwnProperty('formula')){
    if(param.formula.includes('LINE')){
      return 'symbol';
    }
    if(param.formula.includes('PATTERN')){
      return 'symbol';
    }
    if(param.formula.includes('SHAPE')){
      return 'symbol';
    }
  }
  // if(param.hasOwnProperty('format')){
  //   let format = param.format.toLowerCase();
  //   if(format=='mm-dd-yyyy'){
  //     return 'date';
  //   }
  // }

}

export const checkNumber = (obj, maxWid) =>{
  // let maxWid = 0;
  if(obj.hasOwnProperty('value')){
    if(typeof obj.value == 'number'){
      let value = obj.value.toString();
      if(value.includes('.')){
        let dot = value.split('.');
        if(dot.length > 0){
          if(dot[1]){
            let width = dot[1].length;
            if(width > maxWid){
              maxWid = width
            }
          }
        }
      }
    }
  }
  return maxWid;
}

export const convertNumToDate = (grid) =>{
  for (let j = 0; j < grid.length; j++) {
      if(grid[j]){
        if(grid[j].hasOwnProperty('format')){
          console.log(grid[j]);
          if(grid[j].format === 'mm-dd-yyyy'){
            let d = ExcelDateToJSDate(grid[j].value);
            if(moment.isDate(d)){
              let val = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
              grid[j].value = val;
              grid[j].format = 'mm-dd-yyyy';
            }else{
              grid[j].value = val;
              delete grid[j].format;
            }
          }
            
          // if(grid[j].format.includes('$')){
          //   grid[j].value = '$' + grid[j].value;
          // }
        }
        if(grid[j].hasOwnProperty('value')){
          if(grid[j].value !== "" && grid[j].value !== undefined && grid[j].value !== null){
            if(isNumeric(grid[j].value)){
              grid[j].value = Number(grid[j].value);
            }           
          }
        }
        // else{
        //   let singleVal = grid[j];
        //   if(singleVal){
        //     if(singleVal.value){
        //       let dateVals = singleVal.value.toString();
        //       if(dateVals.includes('/') || dateVals.includes('-')){
        //         if(moment.isDate(new Date(dateVals))){
        //           // grid[j].format = 'mm/dd/yyyy';
        //           console.log("dateVals");
        //           console.log(moment(dateVals))
        //           // grid[j].value = moment(new Date(dateVals)).format("mm/dd/yyyy");
        //           grid[j].value = moment(dateVals);
        //         }
        //       }
        //     }
        //   }
        // }
      }
  }
  return grid;
}

export const convertMetadata = (grid) => {
console.log(grid, "grid===========>")
  let result = [];
  // let grid = newdata.map((_,colIndex)=> newdata.map(row => (row[colIndex])? row[colIndex]: {}))
  
  for (let i = 0; i < grid.length; i++) {
    grid[i] = convertNumToDate(grid[i]);
    let isstr = isString(grid[i]);
    let res = {};
    res.maxrow = grid[i].length;
    res.datatype = (isstr)? 'string': 'number';
    res.colIdx = i;
    res.columnname = grid[i][0].value || i == 0 && i == 0 ? 1 : grid[i][0].value | i 
    res.maxwidth = isBigword(grid[i]);
    res.maxdecimals = 0;
    // if(isstr !== true){
      for (let j = 0; j < grid[i].length; j++) {
        if(j!==0){
        let obj = grid[i][j];
        if (obj.hasOwnProperty('style')) {
          if(obj.hasOwnProperty('value')){
            let width = obj.value.length;
            if(width > res.maxwidth){
              res.maxwidth = width
            }
          }
        }
        res.maxdecimals = checkNumber(obj, res.maxdecimals);
      }
      if(j==0){
        let listformat = getFormat(grid[i]);
        if(listformat.isFormat){
          if(listformat.data){
            let myformat = listformat.data[0];
            let mydata = getOriginalFormat(myformat);
            if(mydata){
              if(mydata=='date'){
                res.dateformat = myformat.format;
                res.datatype = 'date';
              }
              if(mydata=='symbol'){
                res.dateformat = myformat.formula;
                res.datatype = 'symbol';
              }
            }
          }
        };
      }
    }

    result.push(res);
  }
  return result;
}

export const convertNegtoPos = (grid) =>{
  for (let i = 0; i < grid.length; i++) {
    // grid[i] = convertNumToDate(grid[i]);    
    if(grid[i]){    
      for (let j = 0; j < grid[i].length; j++) {
        if(grid[i][j]){
          if(grid[i][j].hasOwnProperty('value')){
            if(grid[i][j].value !== "" && grid[i][j].value !== undefined && grid[i][j].value !== null){
              if(isNumeric(grid[i][j].value)){
                grid[i][j].value = Number(grid[i][j].value);
              }           
            }
          }
        }
      }
    }
  }
  return grid;
}


