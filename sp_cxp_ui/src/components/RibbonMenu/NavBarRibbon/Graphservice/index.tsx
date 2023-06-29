import { graphTypes, graphStyle } from './../../Wizard/GraphList/GraphTypes';
import { typeList } from './../../Wizard/GraphList/DataFormatList';
import * as ERRORTYPES from './../../../Constant/ErrorCalculationTypes'

const generateJSON = (param, errorCalculation, angleCalculation) =>{

  if(param.length > 0){
    let result = {}, unique=[], isErrorCals=false;
    // if(angleCalculation){
    //   if(Object.keys(angleCalculation).length > 0){
    //     result.units = angleCalculation.symbol.key;
    //     result.lower = angleCalculation.lower.text;
    //     result.upper = angleCalculation.upper.text;
    //     result.isClockWise = angleCalculation.isClockWise;
        
    //   }
    // }
     if(errorCalculation){
      if(Object.keys(errorCalculation).length > 0){
        result.symbol_values = errorCalculation.symbol.key;
        result.lower = errorCalculation.lower.key;
        result.upper = errorCalculation.upper.key;
        isErrorCals = true;
      }
    }

    unique = [...new Set(param.map(item => item.data_key))];
    for (let i = 0; i < unique.length; i++) {
      const element = unique[i];
      console.log(element,'Index.ts')
      result[element] = [];
      if(element != undefined ){
        if(unique.length==1 || result.symbol_values == ERRORTYPES.WORKSHEET_COLUMNS){
          if(element.toLowerCase()=='x' || element.toLowerCase()=='y') result.error1 = [];
        }
        
        else if(result.symbol_values == ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS){
          if(element.toLowerCase()=='x' || element.toLowerCase()=='y') {
            result.error1 = [];
            result.error2 = [];
          }
        }

        // else{
        //   if(element.toLowerCase()=='x') result.error1 = [];

        //   if(element.toLowerCase()=='y') result.error2 = [];
        // }
      }


      param.map(a=>{
        if(element==a.data_key){
          if(isErrorCals===true){
            if(unique.length==1 || result.symbol_values == ERRORTYPES.WORKSHEET_COLUMNS){
              if(element.toLowerCase()=='x' || element.toLowerCase()=='y') result['error1'].push(a.idx);
            }

            else if(result.symbol_values == ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS){
              if(element.toLowerCase()=='error1') {
                result['error1'].push(a.idx);
              }
              else if(element.toLowerCase()=='error2')
                result['error2'].push(a.idx);
            }
            
            // else{
            //     if(element.toLowerCase()=='x') result['error1'].push(a.idx);

            //     if(element.toLowerCase()=='y') result['error1'].push(a.idx);
              
            // }
          }

          result[element].push(a.idx);

        }
      });
    }

    return result;
  }
}

export const getGraphType = (param) =>{
  let result = {};
  for (let i = 0; i < graphTypes.length; i++) {
    const element = graphTypes[i];
    if(element.id==param.GRAPHTYPE){
      result = element;
      break;
    }
  }
  return result;
}

export const getSubGraphType = (param) =>{
  let result = {};
  let nameList = graphStyle[param.GRAPHTYPE];
  for (let i = 0; i < nameList.length; i++) {
    const element = nameList[i];
    if(element.id==param.GRAPHSTYLE){
      result = element;
      break
    }
  }
  return result;
}


export const getDataformat = (param) =>{
  let result = {};
  for (let i = 0; i < typeList.length; i++) {
    const element = typeList[i];
    if(element.id==param.DATAFORMAT){
      result = element;
      break
    }
  }
  return result;
}

export const getGraphInfo= (param) =>{
  console.clear();
  console.log(param);
  let graphtypeName = getGraphType(param);
  let graphStyle = getSubGraphType(param);
  let dataformat = getDataformat(param);
  let result = generateJSON(param.dataformatInfo, param.errorCalculation, param.angleCalculation);
  if(param['GRAPHSTYLE'] == 'SP11' || param['GRAPHSTYLE'] == 'SP12' || param['GRAPHSTYLE'] == 'SP13')
    result.symbol_values = ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS
  let response = { graphtype: graphtypeName.name, graphstyle: graphStyle.name, dataformat: dataformat.value,  result };
  if(!graphStyle){
    response.graphstyle=graphtypeName;
  }
  return response;
}
