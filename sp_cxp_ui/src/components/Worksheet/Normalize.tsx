import { updateSpreadSheet } from '../../utils/spreadsheet/spreadsheetUtility'
import {
    getCellAddress,
    getColIndex
  } from '@syncfusion/ej2-react-spreadsheet';

export function calculationNormalize(data,stepWiseValue,spreadsheet,destinationColumn1,destinationColumn2,destinationColumn3,notebookState) {
    let arrayData = [data[0].column.length, data[1].column.length, data[2].column.length]
    let maxLength = arrayData.sort((a, b) => b - a)[0];
    let status = stepWiseValue === "Unitary Scale(0.0 - 1.0)" ? 1 : 100;
    let destination1 = []
    let destination2 = []
    let destination3 = []
    let source1 = data[0].column;
    let source2 = data[1].column;
    let source3 = data[2].column;
    for (let i = 0; i < maxLength; i++) {
      if (source1[i] && source2[i] && source3[i]) {
        let sum = source1[i] + source2[i] + source3[i];
        destination1.push(((source1[i] / sum) * status).toFixed(4))
        destination2.push(((source2[i] / sum) * status).toFixed(4))
        destination3.push(((source3[i] / sum) * status).toFixed(4))
      } else {
        destination1.push("--")
        destination2.push("--")
        destination3.push("--")
      }
    }
    updateSpreadSheetNoramlize([destination1], [destination2], [destination3],spreadsheet,destinationColumn1,destinationColumn2,destinationColumn3,notebookState)

}

function updateSpreadSheetNoramlize(updateColumn1, updateColum2, updateColume3,spreadsheet,destinationColumn1,destinationColumn2,destinationColumn3,notebookState){
    console.log(updateColumn1);
    console.log(updateColum2);
    console.log(updateColume3);
    if(destinationColumn1){
    var newRange=destinationColumn1+1;
    var selcol = getColIndex(newRange.match(/[A-Z]+/i)[0].toUpperCase())
    var selrow = ((newRange.replace(/[^0-9]/g, '')) - 1)
    var TwoDdata = updateColumn1;
    console.log(TwoDdata)
    for (let i = 0; i < TwoDdata.length; i++) {
      var addrow = selrow
      for (let j = 0; j < TwoDdata[i].length; j++) {
        console.log(TwoDdata[i][j],"TwoDdata[i][j]");
       if(TwoDdata[i][j] !== "NaN"){
         console.log("inside if");
        var address = getCellAddress(addrow, selcol);
        spreadsheet.updateCell(
          { value: TwoDdata[i][j] },
          address
        );
        addrow = addrow + 1;
       }else{
         console.log("inside else");
        var address = getCellAddress(addrow, selcol);
        spreadsheet.updateCell(
          { value: "--" },
          address
        );
        addrow = addrow + 1;
       }
      
      
      }
      selcol = selcol + 1;
    }
  }
  if(destinationColumn2){
    var newRange=destinationColumn2+1;
    var selcol = getColIndex(newRange.match(/[A-Z]+/i)[0].toUpperCase())
    var selrow = ((newRange.replace(/[^0-9]/g, '')) - 1)
    let TwoDdata = updateColum2;
    for (let i = 0; i < TwoDdata.length; i++) {
      var addrow = selrow;
      for (let j = 0; j < TwoDdata[i].length; j++) {
        console.log(TwoDdata[i][j],"TwoDdata[i][j]");
        if(TwoDdata[i][j] !== "NaN"){
          console.log("inside if");
         var address = getCellAddress(addrow, selcol);
         spreadsheet.updateCell(
           { value: TwoDdata[i][j] },
           address
         );
         addrow = addrow + 1;
        }else{
          console.log("inside else");
         var address = getCellAddress(addrow, selcol);
         spreadsheet.updateCell(
           { value: "--" },
           address
         );
         addrow = addrow + 1;
        }
      }
      selcol = selcol + 1;
    }
  }
  if(destinationColumn3){
    var newRange=destinationColumn3+1;
    var selcol = getColIndex(newRange.match(/[A-Z]+/i)[0].toUpperCase())
    var selrow = ((newRange.replace(/[^0-9]/g, '')) - 1)
    let TwoDdata = updateColume3;
    for (let i = 0; i < TwoDdata.length; i++) {
      var addrow = selrow;
      for (let j = 0; j < TwoDdata[i].length; j++) {
        console.log(TwoDdata[i][j],"TwoDdata[i][j]");
        if(TwoDdata[i][j] !== "NaN"){
          console.log("inside if");
         var address = getCellAddress(addrow, selcol);
         spreadsheet.updateCell(
           { value: TwoDdata[i][j] },
           address
         );
         addrow = addrow + 1;
        }else{
          console.log("inside else");
         var address = getCellAddress(addrow, selcol);
         spreadsheet.updateCell(
           { value: "--" },
           address
         );
         addrow = addrow + 1;
        }
      }
      selcol = selcol + 1;
    }
   updateSpreadSheet(spreadsheet,notebookState)
  }
}