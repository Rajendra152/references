import * as allTypeList from './DataFormatList';
import { isDirectDataformat, isCalculation, isAngleCalculation,isDirectDataSelect } from "./../WizardServices";
import * as ERRORTYPES from '../../../Constant/ErrorCalculationTypes'

export const getTypeList = (param:[]) =>{
  let returnTypeList = [];
  for (let i = 0; i < allTypeList.typeList.length; i++) {
    const element = allTypeList.typeList[i];
    param.forEach(a=>{
      if(element.id==a){
        returnTypeList.push(element);
      }
    })
  }
  console.log(returnTypeList);
  return returnTypeList;
}


export const getAllFormatList = (content, calculationInfo) =>{
  console.log(content['GRAPHSTYLE'])
  if(isDirectDataformat(content['GRAPHTYPE'])){
    console.log('Direct')
    let param = content['GRAPHTYPE'];
    return getFormatList(param);
  }
  else{
    let param = content['GRAPHSTYLE'];
    // Checking Error Bar Calculation
    if(isCalculation(param)){
      console.log('Error')
      return getErrorTypeList(calculationInfo,content);
    }else if(isAngleCalculation(param)){
      console.log('Angle')
      return getAnguleTypeList(calculationInfo);
    }else{
      console.log("Normal")
      return getFormatList(param);
    }
  }
};

export const getAnguleTypeList = (param: Object) =>{
  // if(param){
  //   if(param.hasOwnProperty('symbol')){
  //     let symbol = param.symbol.key;
  //     if(symbol == ERRORTYPES.DEGREES || symbol == ERRORTYPES.RADIANS || symbol == ERRORTYPES.GRADS || symbol == ERRORTYPES.OTHERS){
  //       return getTypeList(['19','20', '21', '22', '23', '11']);
  //     }
  //   }
  // }
  return getTypeList(['19','20', '21', '22', '23', '11']);
}

export const getErrorTypeList = (param: Object,content: Object) =>{
  if(param){
    if(param.hasOwnProperty('symbol')){
      let symbol = param.symbol.key;
      if(symbol == ERRORTYPES.WORKSHEET_COLUMNS){

        if(content['GRAPHSTYLE'] == 'SP5' || content['GRAPHSTYLE'] == 'LSP5')
          return getTypeList(['50','51','73']);
 
        else if(content['GRAPHSTYLE'] == 'SP6' || content['GRAPHSTYLE'] == 'LSP6')
          return getTypeList(['53','54','56']);

        else if(content['GRAPHSTYLE'] == 'SP9' || content['GRAPHSTYLE'] == 'LSP7')
          return getTypeList(['55','57','58']); 

        else if(content['GRAPHSTYLE'] == 'SP10' || content['GRAPHSTYLE'] == 'LSP8')
          return getTypeList(['53']); 

        else if(content['GRAPHSTYLE'] == 'VBCP4')
          return getTypeList(['54','56']);

        else if(content['GRAPHSTYLE'] == 'VBCP3')
          return getTypeList(['50','71']);

        else if(content['GRAPHSTYLE'] == 'HBCP4')
          return getTypeList(['55','57']);

        else if(content['GRAPHSTYLE'] == 'HBCP3')
          return getTypeList(['68','51']);
           

        else
          return getTypeList(['50']);

      }

      if(symbol == ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS){
        if(content['GRAPHSTYLE'] == 'SP5'  || content['GRAPHSTYLE'] == 'LSP5')
          return getTypeList(['59','60','61']);

        else if(content['GRAPHSTYLE'] == 'SP6' || content['GRAPHSTYLE'] == 'LSP6')
          return getTypeList(['62','63','65']);

        else if(content['GRAPHSTYLE'] == 'SP9' || content['GRAPHSTYLE'] == 'LSP7')
          return getTypeList(['64','66','67']); 

        else if(content['GRAPHSTYLE'] == 'SP10' || content['GRAPHSTYLE'] == 'LSP8')
          return getTypeList(['62']);

        else if(content['GRAPHSTYLE'] == 'VBCP4')
          return getTypeList(['63','65']);

        else if(content['GRAPHSTYLE'] == 'VBCP3')
          return getTypeList(['59','61']);

        else if(content['GRAPHSTYLE'] == 'HBCP4')
          return getTypeList(['64','66']);

        else if(content['GRAPHSTYLE'] == 'HBCP3')
          return getTypeList(['69','60']);
      }

      if(symbol == ERRORTYPES.COLUMN_MEANS || symbol == ERRORTYPES.COLUMN_MEDIAN || symbol == ERRORTYPES.FIRST_COLUMN_ENTRY || symbol == ERRORTYPES.LAST_COLUMN_ENTRY){
        if(content['GRAPHSTYLE'] == 'SP5'  || content['GRAPHSTYLE'] == 'LSP5' || content['GRAPHSTYLE'] == 'SP6' || content['GRAPHSTYLE'] == 'LSP6')
        return getTypeList(['4','7']);

        else if(content['GRAPHSTYLE'] == 'SP9' || content['GRAPHSTYLE'] == 'LSP7')
          return getTypeList(['5','6']); 

        else if(content['GRAPHSTYLE'] == 'SP10' || content['GRAPHSTYLE'] == 'LSP8')
          return getTypeList(['11']);

        else if(content['GRAPHSTYLE'] == 'VBCP3')
          return getTypeList(['4','7']);

        else if(content['GRAPHSTYLE'] == 'HBCP3')
          return getTypeList(['5','6']);
      }
      if(symbol == ERRORTYPES.ROW_MEANS || symbol == ERRORTYPES.ROW_MEDIAN || symbol == ERRORTYPES.FIRST_ROW_ENTRY || symbol == ERRORTYPES.LAST_ROW_ENTRY){
        if(content['GRAPHSTYLE'] == 'SP5'  || content['GRAPHSTYLE'] == 'LSP5')
          return getTypeList(['13','14']);

        else if(content['GRAPHSTYLE'] == 'SP6' || content['GRAPHSTYLE'] == 'LSP6')
          return getTypeList(['15','16']);

        else if(content['GRAPHSTYLE'] == 'SP9' || content['GRAPHSTYLE'] == 'LSP7')
          return getTypeList(['31','42']); 

        else if(content['GRAPHSTYLE'] == 'VBCP4')
          return getTypeList(['13','14']);

        else if(content['GRAPHSTYLE'] == 'VBCP3')
          return getTypeList(['15','16']);

        else if(content['GRAPHSTYLE'] == 'HBCP4')
          return getTypeList(['30','31','42']);

        else if(content['GRAPHSTYLE'] == 'HBCP3')
          return getTypeList(['31','42']);
      }
      if(symbol == ERRORTYPES.BY_CATERGORY_MEAN || symbol == ERRORTYPES.BY_CATERGORY_MEDIAN){
        return getTypeList(['33']);
      }
    }
  }
}

export const getGPStyle = (param: any) =>{
  if(param=='GP1' || param=='GP5'){
    return allTypeList.XYpair;
  }
  if(param=='GP2'){
    return allTypeList.XBarpair;
  }
  if(param=='GP3'){
    return allTypeList.XSetError;
  }
  if(param=='GP4'){
    return allTypeList.ManyXYError;
  }
  if(param=='PC1'){
    return allTypeList.SingleColumn;
  }
}

export const getVPStyle = (param: any) =>{
  if(param=='44'){
    return allTypeList.XYpair;
  }
}

export const getFormatList = (param: any) =>{
  // If know SP,LP those are id value please check Graphstyle.tsx file
  if(param=='SP1') return getTypeList(['1','2','3']);

  if(param=='SP2') return getTypeList(['11','4','5','6','7','8','9','10']);

  if(param=='SP3') return getTypeList(['1','2','3']);

  if(param=='SP4') return getTypeList(['11','4','5','6','7','8','9','10']);

  // Error Bars... this is temparay code
  // if(param=='SP5'||param=='SP6'||param=='SP7'||param=='SP8'||param=='SP9'||param=='SP10'||param=='SP11'||param=='SP12'||param=='SP13'){
  //  return  getTypeList(['1','2','3']);
  // }

  // if(param=='SP11') return getTypeList(['4','7','11']);
  if(param=='SP11') return getTypeList(['62','63','65']);

  if(param=='SP12') return getTypeList(['64','66','67']);

  if(param=='SP13') return getTypeList(['62']);

  if(param=='SP14') return getTypeList(['15','16','4','7','9']);

  if(param=='SP15') return getTypeList(['42','31','5','6','8']);

  if(param=='SP16') return getTypeList(['11','4','7']);

  if(param=='SP17') return getTypeList(['5','6','12']);

  // Line
  if(param=='LP1' || param=='LP3' || param=='LP5' || param=='LP7' || param=='LP9' || param=='LP11') return getTypeList(['1','2','3']);

  if(param=='LP2' || param=='LP4' || param=='LP6' || param=='LP8' || param=='LP10' || param=='LP12') return getTypeList(['11','4','5', '6','7', '8','9','10']);


  // Line and Scatter plot
  if(param=='LSP1' || param=='LSP3' || param == 'LSP9' || param == 'LSP11' || param == 'LSP13' || param == 'LSP15') return getTypeList(['1','2','3']);

  if(param=='LSP2' || param=='LSP4' || param == 'LSP10' || param == 'LSP12' || param == 'LSP14' || param == 'LSP16') return getTypeList(['11','4','5', '6','7', '8','9','10']);

  // Error Bars... this is temparay code LSP
  if (param=='LSP5'||param=='LSP6'||param=='LSP7'||param=='LSP8') return  getTypeList(['1','2','3']);

  //  Vector plot
   // Need more correction
  if(param == '4'){
    // return getTypeList(['43', '44']);
    return getTypeList(['70']);
  }


  // Area Plot AP
  if(param == 'AP1') return getTypeList(['1','2']);

  if(param == 'AP2') return getTypeList(['11','4','7']);

  if(param == 'AP3') return getTypeList(['29','2']);

  if(param == 'AP4') return getTypeList(['5','6', '12']);

  if(param == 'AP5') return getTypeList(['11','4', '5', '6','7']);

  // Polar Plot
  // need more
  if(param=='PP1'||param=='PP2'||param=='PP3'){
    return  getTypeList(['1','2','3']);
   }

  //Radar Plot
  if(param == 'RP1' || param == 'RP2' || param == 'RP3' || param == 'RP4' || param == 'RP6') return getTypeList(['24','26']);

  if(param == 'RP5') return getTypeList(['27','28']);

  // Vertical Bar Chart
  //  Error bar pending
  if(param == 'VBCP1') return getTypeList(['3','1']);
  
/* if(param == 'VBCP4'){
  console.log('Vbc', param)
  return getTypeList(['4','7'])
} */
  if(param == 'VBCP2' || param == 'VBCP5') return getTypeList(['15','16','7','4']);


  // Horizontal Bar Chart
  //  Error bar pending
  if(param == 'HBCP1' ) return getTypeList(['2','29']);

  if(param == 'HBCP2' || param == 'HBCP5') return getTypeList(['42','31','6', '5']);

  // Box Plot
  if(param == 'BP1') return getTypeList(['4','7']);

  if(param == 'BP2') return getTypeList(['5','6']);

  // Pi Chart
  if(param == '11') return getTypeList(['41']);

  // Contour Plot
  if(param == 'CP1' || param == 'CP2') return getTypeList(['34','35', '36']);

  // 3D Scatter Plot
  if(param == '13') return getTypeList(['34','35', '36']);

  // 3D Line Plot
  if(param == '_3DLP1') return getTypeList(['34']);

  if(param == '_3DLP2') return getTypeList(['35', '36']);

  // 3D Mesh Plot
  if(param == '15') return getTypeList(['34','35', '36']);

   // 3D Bar Plot
   if(param == '16') return getTypeList(['35', '36']);


   // Ternary Plot
   if(param == 'TP1' || param == 'TP2' || param == 'TP3') return getTypeList(['38', '39','40']);

   // Bubble Plot
   if(param == '18') return getTypeList(['72', '74','75']);

   // graph Gallery
   if(param == '19') return getTypeList(['1']);

   //Forest format
   if(param=='20') return getTypeList(['45', '46']);

}
