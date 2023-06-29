import * as ColorConst from './ColorConst';
import * as LineConst from './LineConst';
export const checkingPatterns = (cell, spreadsheet, range) =>{
  // let cellValue = "";
  if(cell.value!==""&&cell.value!==undefined){
    if(cell.value.includes('rgb')){
      // let value = cell.value.replace('@', '');
      let value = cell.value, found = false, data = {};
      for (let i = 0; i < ColorConst.color.length; i++) {
        const element = ColorConst.color[i];
        if(element.value == value){
          found = true;
          data = element;
          break;
        }
      }
      if(found){
        spreadsheet.cellFormat({ backgroundColor: data.backgroundColor, color: 'rgba(255,255,255,0)'}, range);
      }else{
        spreadsheet.updateCell({value: ""}, range);
        spreadsheet.cellFormat({backgroundColor: '#fff', color: '#333'}, range);
      }
    }
    if(cell.value.includes('@line')){
      // let value = cell.value.replace('@', '');
      let value = cell.value, found = false, data = {};
      for (let i = 0; i < LineConst.Line.length; i++) {
        const element = LineConst.Line[i];
        if(element.value == value){
          found = true;
          data = element;
          break;
        }
      }
      if(found){
        spreadsheet.updateCell({value: data.value, displayText: data.symbol}, range);
      }else{
        spreadsheet.updateCell({value: ""}, range);
        spreadsheet.cellFormat({backgroundColor: '#fff', color: '#333'}, range);
      }
    }
  }

  return spreadsheet;
}
