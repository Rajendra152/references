import { getDataSetByKey,createNewClient } from '../../services/RedisServices';
import {
  getCellAddress,
  getColIndex,
  getColumnHeaderText,
  getIndexesFromAddress,
} from '@syncfusion/ej2-react-spreadsheet';
import {
  setWorksheetData,
  updateData,
} from './../../services/WorksheetServicesNew';
import { convertMetadata } from '../../components/Worksheet/Metadata';
import { post } from '../../services/DataService';
import * as Config from '../../components/App/Config';
import { dataService, showMessageBox } from '../globalUtility';
import { ipcRenderer } from 'electron';
import * as math from 'mathjs';
import { createGraphPage } from '../../services/NotebookManagerServicesNew';
import { transposeRowsToColumns } from '../../services/graphPageServices/GraphServices'
import graphHistogram from './graphHistogramStyles';
import { setTimeout } from 'timers';
import { ReportProps } from '../../services/notebookManagerServices/NotebookManagerInterfaces';

export const tranformDataToSource = (data) => {
  let gridData = [];
  for (const row of data) {
    gridData.push({ cells: row });
  }

  return gridData;
};

const statisticalDialogOptions  = {
  buttons: ["Overwrite","Insert","Cancel"],
  message: "The output column(s) are not empty. Do you want to overwrite existing data, insert the result at the top of the column(s), or cancel?",
  title: "Output Columns Are Not Empty"
}

/** Update Statistical Transformation Data in Spreadsheet */
export const updateSTInSpreadSheet = (
  spreadSheetInstance: any,
  data: any,
  notebookState: any,
  userOptions: any
) => {
  let { resultArray, selectedCols, firstEmpColIndex } = data;
  (selectedCols || []).forEach((col: any) => {
    if (col.title === 'Output' && col.value !== 'First Empty') {
      firstEmpColIndex = col.key;
    }
  });
  let selcol = firstEmpColIndex;
  const gridData = getActiveSheetData(spreadSheetInstance);
  if(gridData && gridData[selcol]) {
    let column = selcol - 1;
    if((resultArray || []).some(() => {
      column++;
      return gridData[column].some((grid: any) => {
        if(grid && grid.value) {
          return true;
        }
        return false;
      })
    })) {
      showMessageBox(statisticalDialogOptions).then((res: any) => {
        switch(res.response) {
          case 0:
            overWriteSpreadSheetData(resultArray, selcol, spreadSheetInstance, gridData, notebookState, userOptions);
            break;
          case 1:
            insertSpreadSheetData(resultArray, selcol, spreadSheetInstance, gridData, notebookState, userOptions);
            break;
          case 2:
            // updateSpreadSheetData(resultArray, selcol, spreadSheetInstance, notebookState, userOptions);
            break;
        }
      });
      return;
    }
  }
  updateSpreadSheetData(resultArray, selcol, spreadSheetInstance, notebookState, userOptions);
  updateWorksheetDataInRedis(spreadSheetInstance, notebookState);
};

const getNumberFormat = (decimalPlaces: any) => {
  console.log('vasu', decimalPlaces);
  decimalPlaces = parseInt(decimalPlaces);
  let result = "0."
  while(decimalPlaces > 0) {
    result += '0'
    decimalPlaces--;
  }
  return result;
}

const overWriteSpreadSheetData = (resultArray: [], selcol: number, spreadSheetInstance: any, gridData: any, notebookState: any, userOptions: any) => {
  const decimalPlaces = getNumberFormat(userOptions?.optionsCollection?.Worksheet?.numeric?.decimalPlaces || '4');
  (resultArray || []).forEach((data1: any) => {
    (data1 || []).forEach((data2: any, index: number) => {
      let address = getCellAddress(index, selcol);
      spreadSheetInstance.updateCell({...data2, format: decimalPlaces}, address);
    });
    ((gridData && gridData[selcol]) || []).forEach((data: any, index: number) => {
      if((data1 || []).length > index) return;
      let address = getCellAddress(index, selcol);
      spreadSheetInstance.updateCell({value: ''}, address);
    })
    selcol = selcol + 1;
  });
  updateWorksheetDataInRedis(spreadSheetInstance, notebookState);
}

const insertSpreadSheetData = (resultArray: [], selcol: number, spreadSheetInstance: any, gridData: any, notebookState: any, userOptions: any) => {
  const decimalPlaces = getNumberFormat(userOptions?.optionsCollection?.Worksheet?.numeric?.decimalPlaces || '4');
  (resultArray || []).forEach((data1: any) => {
    (data1 || []).forEach((data2: any, index: number) => {
      let address = getCellAddress(index, selcol);
      spreadSheetInstance.updateCell({...data2, format: decimalPlaces}, address);
    });
    let rowIndex = (data1 || []).length;
    ((gridData && gridData[selcol]) || []).forEach((data: any) => {
      let value = data ? data : {value: ''};
      let address = getCellAddress(rowIndex, selcol);
      spreadSheetInstance.updateCell(value, address);
      rowIndex++;
    })
    selcol = selcol + 1;
  });
  updateWorksheetDataInRedis(spreadSheetInstance, notebookState);
}

const updateSpreadSheetData = (resultArray: [], selcol: number, spreadSheetInstance: any, notebookState: any, userOptions: any) => {
  const decimalPlaces = getNumberFormat(userOptions?.optionsCollection?.Worksheet?.numeric?.decimalPlaces || '4');
  (resultArray || []).forEach((data1: any) => {
    (data1 || []).forEach((data2: any, index: number) => {
      let address = getCellAddress(index, selcol);
      spreadSheetInstance.updateCell({...data2, format: decimalPlaces}, address);
    });
    selcol = selcol + 1;
  });
  updateWorksheetDataInRedis(spreadSheetInstance, notebookState);
}

const updateWorksheetDataInRedis = async (spreadSheetInstance: any, notebookState: any) => {
  const updatedSheetData = getActiveSheetDataAsRows(spreadSheetInstance);
  const activeSheetId = getActiveWorksheet(notebookState);
  if (activeSheetId && activeSheetId.length) {
    const client = createNewClient();
    const key = activeSheetId[0].id;
    await updateData(client, updatedSheetData, key);
  }
}

export const isWorksheetActive = (notebookState: any) => {
  const activeSheetId = getActiveWorksheet(notebookState);
  if (activeSheetId && activeSheetId.length) {
    return true;
  }
  return false;
};

export const refreshWorksheetWithQuickTransforms = async (props: any) => {
  const trigonometricUnitsMap: any = {
    '0': 'Degrees',
    '1': 'Radians',
    '2': 'Grads',
  };
  const activeSheetId = getActiveWorksheet(props.notebookState);
  if (activeSheetId && activeSheetId.length) {
    const key = activeSheetId[0].id;
    const client = createNewClient();
    const transformData = await getDataSetByKey('QuickTransformData', client);
    if (transformData && transformData.equations.length) {
      const equations = transformData.equations.map((equation: any) => {
        return {
          equation: equation.equation,
          units: trigonometricUnitsMap[equation.trigonometricUnit],
        };
      });
      let data = await getDataSetByKey(key, client);
      data = data.map((_, colIndex: number) =>
        data.map((row: any) => (row[colIndex] ? row[colIndex] : {}))
      );
      const clientData = await setWorksheetData(
        [
          {
            sheetdata: data,
            metadata: convertMetadata(data),
          },
        ],
        'meta' + key
      );
      post(Config.quickTransform, {
        worksheet: clientData.key,
        //"units": trigonometricUnitsMap[transformData.equations[0].trigonometricUnit],
        quick_transform: equations,
      }).then(async (response: any) => {
        response = response.data;
        if (response && response.result) {
          const data = await getDataSetByKey(response.result.redis_id, client);
          if (data && data.length) {
            let sheetData = data[0].sheetdata;
            sheetData = sheetData.map((_, colIndex: number) =>
              sheetData.map((row: any) => (row[colIndex] ? row[colIndex] : {}))
            );
            await updateData(client, sheetData, key);
            dataService.sendData({ sheetId: key });
          }
        }
      });
    }
  }
};

export const getActiveWorksheet = (notebookState: any) => {
  const { activeItems, selectedPivotItem } = notebookState;
  let activeSheetId = [];
  if (activeItems && activeItems.length && selectedPivotItem) {
    activeSheetId = activeItems.filter((item: any) => {
      if (item.id === selectedPivotItem && item.type === 'worksheet') {
        return true;
      }
      return false;
    });
  }
  return activeSheetId;
};

export const getActiveSheetColNames = (referenceObjectState: any) => {
  var colNames = [];
  var sheet = referenceObjectState.getActiveSheet();
  let allRange =
    'A1:' + getColumnHeaderText(sheet.usedRange.colIndex + 1) + '1';
  var rangeIdx = getIndexesFromAddress(allRange);
  for (var cIdx = rangeIdx[1]; cIdx <= rangeIdx[3]; cIdx++) {
    var colName = getColumnHeaderText(cIdx + 1);
    colNames.push({ text: colName, key: cIdx });
  }
  return JSON.parse(JSON.stringify(colNames));
};

export const getActiveSheetData = (referenceObjectState: any) => {
  let sheetData: any = [];
  let sheetRows = referenceObjectState?.sheets?.[0]?.rows;
  sheetRows.forEach((row: any, index: number) => {
    (row.cells || []).forEach((data: any, rIndex: number) => {
      if (!sheetData[rIndex]) {
        sheetData[rIndex] = [];
      }
      sheetData[rIndex][index] = data;
    });
  });
  return JSON.parse(JSON.stringify(sheetData));
};

export const getActiveSheetDataAsRows = (referenceObjectState: any) => {
  let sheetData: any = [];
  let sheetRows = referenceObjectState?.sheets?.[0]?.rows;
  sheetRows.forEach((row: any, index: number) => {
    (row.cells || []).forEach((data: any, rIndex: number) => {
      if (!sheetData[index]) {
        sheetData[index] = [];
      }
      sheetData[index][rIndex] = data;
    });
  });
  return JSON.parse(JSON.stringify(sheetData));
};

const getAlphabetIndex = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
};

export const getIndexByAlphaSeries = (series: string) => {
  // console.log(series)
  const seriesArr = series.split('').reverse();

  let index = 0;
  for (let i = 0; i < seriesArr.length; i++) {
    // console.log("ser", seriesArr)
    const letter: string = seriesArr[i];
    index += getAlphabetIndex[letter] * Math.pow(26, i);
    // console.log("index", index)
  }

  return index;
};

export const getupdatedGridData = (newValue, address, gridData) => {
  let [col, rowIndex] = address.match(/[\d\.]+|\D+/g);
  let colIndex = getIndexByAlphaSeries(col) - 1;
  rowIndex--;

  if (gridData.length <= rowIndex) {
    const newGrid = [...gridData];
    for (let i = gridData.length; i <= rowIndex; i++) {
      newGrid[i] = [{}];
    }
    //console.log(newGrid)

    newGrid[rowIndex][colIndex] = { value: newValue };

    for (let index = 0; index < newGrid[rowIndex].length; index++) {
      if (!newGrid[rowIndex][index]) {
        newGrid[rowIndex][index] = {};
      }
    }
    return newGrid;
  } else if (gridData[rowIndex].length < colIndex) {
    let preLen = gridData[rowIndex].length;
    gridData[rowIndex][colIndex] = { value: newValue };

    for (let index = preLen; index < gridData[rowIndex].length; index++) {
      if (!gridData[rowIndex][index]) {
        gridData[rowIndex][index] = {};
      }
    }
  } //[[],[],[]] 2 3
  else {
    gridData[rowIndex][colIndex] = { value: newValue };
  }

  return gridData;
};

export const transformDataSourceTo2DArray = (gridData) => {
  const newData = [...gridData];
  for (let i = 0; i < newData.length; i++) {
    if (newData[i]) {
      newData[i] = newData[i].cells;
    } else {
      newData[i] = [];
    }
  }
  return newData;
};
//[[],[],[]]

export const getUpdatedGridOnActionComplete = (allRows: [{}]) => {
  let newSourceGrid = [];
  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    if (row !== undefined && row !== null) {
      if (Array.isArray(row.cells)) {
        row.cells = row.cells.map((cell) => (cell ? cell : {}));
        newSourceGrid.push({ cells: row.cells });
      } else {
        newSourceGrid.push({ cells: [{}] });
      }
    } else {
      newSourceGrid.push({ cells: [{}] });
    }
  }
  // const newSourceGrid = allRows.map(row => {

  // })
  // const newSourceGrid = allRows.map(row => {
  //   if (row!==undefined&&row!==null) {
  //     if(Array.isArray(row.cells)){
  //       row.cells = row.cells.map(cell => cell ? cell : {})
  //       return { cells: row.cells }
  //     }else{
  //       return { cells: [{}] }
  //     }
  //   }
  //   else {
  //     return { cells: [{}] }
  //   }
  // })

  //console.log(newSourceGrid)
  const new2DGrid = transformDataSourceTo2DArray(newSourceGrid);

  return [newSourceGrid, new2DGrid];
};
export const getSpreadsheetColumn = async (
  openedWorksheet: any,
  colIndex: any
) => {
  let gridData = await getDataSetByKey(
    openedWorksheet[0].key,
    openedWorksheet[0].client
  );
  gridData = transposeRowsToColumnsForSpreadsheet(gridData);
  const columnData = getDataFromGrid(gridData[colIndex]);
  return columnData;
};

export const transposeRowsToColumnsForSpreadsheet = (grid) => {
  const transposedData = grid[0].map((_, colIndex) =>
    grid.map((row) => row[colIndex])
  );
  return transposedData;
};

export const getDataFromGrid = (column) => {
  console.log(column)
  if(column !== undefined){
  return column
    .filter((item) => {
      return item && item.value != '' && item.value != undefined;
    })
    .map((item) => {
      return item.value;
    });
  }
};

export const updateSpreadSheet = async (
  spreadSheetInstance: any,
  notebookState: any
) => {
  const updatedSheetData = getActiveSheetDataAsRows(spreadSheetInstance);
  const { activeItems, selectedPivotItem } = notebookState;
  let activeSheetId = [];
  if (activeItems && activeItems.length && selectedPivotItem) {
    activeSheetId = activeItems.filter((item: any) => {
      if (item.id === selectedPivotItem && item.type === 'worksheet') {
        return true;
      }
      return false;
    });
  }
  if (activeSheetId && activeSheetId.length) {
    const client = createNewClient();
    const key = activeSheetId[0].id;
    // console.log("here");
    await updateData(client, updatedSheetData, key);
  }
};
export const multipleDataGroup = (
  getparams: any,
  getBodyData: any,
  worksheetkey: any,
  updatedRow: any
) => {
  console.log(updatedRow + 'updatedRow');
  let body_column_data = getBodyData;
  let getdata_options_type = body_column_data.data_columns[0];
  getdata_options_type.end_row = updatedRow+1;
  body_column_data.data_columns.splice(0, 1);
  for (let i = 0; i <= getparams.dataformatInfo.length - 1; i++) {
    let group_getdata_options_type = {
      ...getdata_options_type,
      column: getIndexByAlphaSeries(getparams.dataformatInfo[i].value),
      end_row: updatedRow+1,
    };
    body_column_data.data_columns.push(group_getdata_options_type);
    body_column_data.worksheet = worksheetkey;
    // body_column_data.end_row = updatedRow;
  }
  return body_column_data;
};
//for sample chi square
export const chiSquareDataGrouping = (
  getparams: any,
  getBodyData: any,
  labelThreeValue: any,
  labelFourValue: any,
  worksheetkey: any,
  rowIndex:any
) => {
  let body_column_data = getBodyData.body;
  let getdata_options_type = body_column_data.data_columns[0];
  body_column_data.data_columns.splice(1, 1);
  body_column_data.data_columns.splice(0, 1);
  
  for (let i = 0; i <= getparams.dataformatInfo.length - 1; i++) {
    let group_getdata_options_type = {
      ...getdata_options_type,
      column: getIndexByAlphaSeries(getparams.dataformatInfo[i].value),
      end_row:rowIndex+1
    };
    body_column_data.data_columns.push(group_getdata_options_type);
    body_column_data.worksheet = worksheetkey;
    body_column_data.dpower = Number(labelThreeValue);
    body_column_data.alpha = Number(labelFourValue);
  }
  return body_column_data;
};
//for power chi square
export const chiSquareDataGroupingPower = (
  getparams: any,
  getBodyData: any,
  labelThreeValue: any,
  labelFiveValue: any,
  worksheetkey: any,
  rowIndex:any,
) => {
  let body_column_data = getBodyData.body;
  let getdata_options_type = body_column_data.data_columns[0];
  body_column_data.data_columns.splice(1, 1);
  body_column_data.data_columns.splice(0, 1);
  for (let i = 0; i <= getparams.dataformatInfo.length - 1; i++) {
    let group_getdata_options_type = {
      ...getdata_options_type,
      column: getIndexByAlphaSeries(getparams.dataformatInfo[i].value),
      end_row: rowIndex + 1,
    };
    body_column_data.data_columns.push(group_getdata_options_type);
    body_column_data.worksheet = worksheetkey;
    body_column_data.dsample = Number(labelThreeValue);
    body_column_data.alpha = Number(labelFiveValue);
  }
 
  return body_column_data;
};
export const groupDataColumns = (
  getparams: any,
  { ...getBodyData }: any,
  worksheetkey: any,
  updatedRow: any
) => {
  //set data column options 1 with selected dependent value
  let columData1 = getIndexByAlphaSeries(getparams.dataformatInfo[0].value);
  getBodyData.data_columns[0].column = columData1;
  getBodyData.data_columns[0].end_row = updatedRow + 1;
  //loop to set remaining data options in data columns
  let body_column_data = getBodyData;
  let getdata_options_type = body_column_data.data_columns[1];
  body_column_data.data_columns.splice(1, 1);
  for (let i = 1; i <= getparams.dataformatInfo.length - 1; i++) {
    let group_getdata_options_type = {
      ...getdata_options_type,
      column: getIndexByAlphaSeries(getparams.dataformatInfo[i].value),
      end_row: updatedRow + 1,
    };
    body_column_data.data_columns.push(group_getdata_options_type);
    body_column_data.worksheet = worksheetkey;
  }

  //set forced_variables data
  if (getparams.dataformatInfoNext.length) {
    (getparams.dataformatInfoNext || []).forEach((eachObj: any) => {
      body_column_data.forced_variables.push(
        getIndexByAlphaSeries(eachObj.value)
      );
    });
  }
  return body_column_data;
};

export const groupDataColumnsDescriptive = (
  getparams: any,
  getBodyData: any,
  worksheetkey: any,
  rowIndex: any
) => {
  let body_column_data = getBodyData;
  let getdata_options_type = body_column_data.data_columns[0];
  getdata_options_type.end_row = rowIndex + 1;
  body_column_data.data_columns.splice(0, 1);
  for (let i = 0; i <= getparams.dataformatInfo.length - 1; i++) {
    let group_getdata_options_type = {
      ...getdata_options_type,
      column: getIndexByAlphaSeries(getparams.dataformatInfo[i].value),
      end_row: rowIndex + 1,
    };
    body_column_data.data_columns?.push(group_getdata_options_type);
    body_column_data.worksheet = worksheetkey;
  }
  if (getparams.testOptionsName === 'Principal Components') {
    (getparams.dataformatInfoNext || []).forEach((eachObj: any) => {
      body_column_data.label?.push(getIndexByAlphaSeries(eachObj.value));
    });
  }
  return body_column_data;
};

export const calculateSelectedRange = (
  spreadsheet: any,
  args: any,
  updateCalculations: Function
) => {
  // Reverse the range if selected from backside
  if (args && args.range) {
    const cols = args.range.replace(/[0-9]/g, '').split(':');
    if (
      !(cols[0].length <= cols[1].length) ||
      (cols[0].length === cols[1].length && cols[0] > cols[1])
    ) {
      const columns = args.range.split(':');
      const temp = columns[0];
      columns[0] = columns[1];
      columns[1] = temp;
      args.range = columns[0] + ':' + columns[1];
    }
    const numCols = args.range.replace(/[^\d:]/g, '').split(':');
    const strCols = args.range.replace(/[0-9]/g, '').split(':');
    if(parseInt(numCols[0]) > parseInt(numCols[1])) {
      args.range = strCols[0] + numCols[1] + ':' + strCols[1] + numCols[0];
    }
  }
  // Get the sheet data and calculate the values
  spreadsheet
    .getData(spreadsheet.getActiveSheet().name + '!' + args.range)
    .then((cells: any) => {
      if (cells.size > 1) {
        let sum = 0;
        let min: number;
        let max: number;
        let average = 0;
        let numberCellsCount = 0;
        cells.forEach((cell: any, key: any) => {
          if ((cell.value || cell.value <= 0) && !isNaN(cell.value)) {
            if(cell.value <= 0) {
              cell.value = parseFloat(cell.value);
            }
            numberCellsCount += 1;
            sum += cell.value;
            if (min === undefined || min > cell.value) {
              min = cell.value;
            }
            if (max === undefined || max < cell.value) {
              max = cell.value;
            }
          }
        });
        sum = typeof sum == 'number' ? parseFloat(sum.toFixed(2)) : 0;
        min =
          typeof min == 'number' ? (min ? parseFloat(min.toFixed(2)) : 0) : 0;
        max =
          typeof max == 'number' ? (max ? parseFloat(max.toFixed(2)) : 0) : 0;
        average =
          numberCellsCount > 0
            ? parseFloat((sum / numberCellsCount).toFixed(2))
            : 0;
        updateCalculations({ message: true, sum, min, max, average });
      } else {
        updateCalculations({ message: false });
      }
    });
};

  

export const loadTestDataToSpreadsheet = (spreadsheet: object, outputData: []) => {
  console.log('output data in loadTestDataToSpreadsheet', outputData);
  let emptyColumnIndex = spreadsheet.getActiveSheet().usedRange.colIndex + 1;
  var address = getCellAddress(0, emptyColumnIndex);
  console.log('address', address);
  //To find the column name from its index
  var outputColumnName = address.match(/[\d\.]+|\D+/g);
  let arr = [[1,2,3],[4,5,6],[7,8,9]]
 //let results = math.transpose(outputData.result_data[0].sheetdata);
  //let results = math.transpose(arr);

  let results = transposeRowsToColumns(outputData.result_data[0].sheetdata)
  console.log(arr)
  console.log(results);
  loadDataToSpreadsheet(spreadsheet, `${outputColumnName[0]}1`, results)
  }

export const calculateHistogram = async (
  spreadsheet: object,
  outputColumnData: object,
  outputData: [],
  props: any,
  currentreport ?: ReportProps,
  testGraphName ?: String
  
) => {
  let outputColumnName = outputColumnData.dataformatInfo[1].value;
  let outputColumnIndex = outputColumnData.dataformatInfo[1].idx;
  console.log(
    'Output Column: Column Index',
    currentreport,'currentreport',
    "testGraphName",testGraphName,"==============================>",
    outputColumnName,
    outputColumnIndex
  );
  console.log('Output Data: ', outputData.graph[0].sheetdata);

  //To get column name of the first empty column
  let outputColumn2Index = spreadsheet.getActiveSheet().usedRange.colIndex + 1;
  console.log('index', outputColumn2Index);
  var address = getCellAddress(0, outputColumn2Index);
  console.log('address', address);
  //To find the column name from its index
  var outputColumn2Name = address.match(/[\d\.]+|\D+/g);

  //To get the data of the output column
  var range = spreadsheet.getActiveSheet().usedRange;
  let data = outputColumnName + '1' + ':' + outputColumnName + range.rowIndex;

  console.log('data', data);

  let columnValues = await spreadsheet.getData(data);
  console.log('column Values', columnValues);
  console.log('output data', outputData.graph[0].sheetdata);
  //To transpose column values into rows.
  let results = math.transpose(outputData.graph[0].sheetdata);

  console.log(
    'Data contained in column' + outputColumnName + 'is' + columnValues
  );

  //To check whether the output column has data or not by checking the length of the keys of the Map returned by SyncFusion
  let sizeOfColumn = 0;
  columnValues.forEach((key: any) => {
    if (Object.keys(key).length > 0) {
      sizeOfColumn = 1;
    }
    console.log('length', sizeOfColumn);
  });
  console.log("spreadsheet",spreadsheet)

  //If the output column contains data user will be notified whether to override or paste it in first empty
  if (sizeOfColumn > 0) {
    if (
      confirm(
        `The contents of column ${outputColumnName} will be replaced with output data from the wizard. Do you wish to continue?\n \nOk will override column ${outputColumnName}. Cancel will insert into column ${outputColumn2Name[0]}.`
  )
    ) {
      loadDataToSpreadsheet(spreadsheet, `${outputColumnName}1`, results);

    console.log(currentreport, "currentreport", testGraphName)
      setTimeout(() => {createGraphFromSpreadsheet(spreadsheet,outputColumnIndex, outputColumnData, props, currentreport,'Histogram')},2000)
      
    } else {
      console.log('Cancel selected');
      let outputColumn2Index =
        spreadsheet.getActiveSheet().usedRange.colIndex + 1;
      console.log('index', outputColumn2Index);
      var address = getCellAddress(0, outputColumn2Index);
      console.log('address', address);
      //To find the column name from its index
      var outputColumn2Name = address.match(/[\d\.]+|\D+/g);
      console.log('ouputcolumn2name',outputColumn2Name);
     
      loadDataToSpreadsheet(spreadsheet, `${outputColumn2Name[0]}1`, results)

      setTimeout(() => {
        createGraphFromSpreadsheet(spreadsheet,outputColumn2Index, outputColumnData, props, currentreport, 'Histogram')
      },2000)
     
         //   let sheetData = [...spreadsheet.stateSpreadSheet.spreadSheetColumnData];
    // let Data = {
    //   message: 'Hi',
    //   someData: "Let's go",
    //   path: 'analysisTestWizard',
    //   sheetData: sheetData,
    //   testOptions: 'Histogram',
    //   width: 496,
    //   height: 400,

    //   //spreadSheetReference:props.referenceObjectState
    // };

    // ipcRenderer.send('request-mainprocess-action', Data);
    }
  }
  else if (outputColumnName === 'First Empty') {
   
    loadDataToSpreadsheet(spreadsheet, `${outputColumn2Name[0]}1`, results)
    setTimeout(() => {
      createGraphFromSpreadsheet(spreadsheet,outputColumnIndex, outputColumnData, props, currentreport, 'Histogram')
    }, 1000)
  }
  else {
console.log("spreadsheet",spreadsheet)
    loadDataToSpreadsheet(spreadsheet, `${outputColumnName}1`, results) 
    setTimeout(() => {
      createGraphFromSpreadsheet(spreadsheet,outputColumnIndex, outputColumnData, props, currentreport, 'Histogram')
    }, 1000)
   
    
  }
  console.log(' result', results);

 
};

export const loadDataToSpreadsheet = (spreadsheet: any, outputColumn: string, outputData: []) => {
  console.log('spreadSheetInstance',spreadsheet);
  console.log('loading data to spreadsheet', outputColumn, outputData);
  let arr = [[1, 2], [4, 5, 6], [7, 8, 9]]
 //Specifies the column name where the data will be loaded
  spreadsheet.sheets[0].ranges[0].startCell = outputColumn;

  //Assigns the output data to Spreadsheet's data source
  spreadsheet.sheets[0].ranges[0].dataSource = outputData;

  //To ensure data persists even when we switch tabs 
  spreadsheet.actionComplete(); 
}


export const createGraphFromSpreadsheet = (spreadsheet: object, outputColumnIndex: number, outputData: object, props: any, currentreport ?: ReportProps | undefined | null , testGraphName ?: String | undefined | null) => {
  console.log('props contains graph histogram', props, currentreport, testGraphName)
  console.log('outputColumnIndex', outputColumnIndex); 
  console.log('outputData', outputData);
  let { body } = graphHistogram(outputData.graphStyle)
  
  console.log('body before', body);

  body.data.x.push(outputColumnIndex);
  body.data.y.push(outputColumnIndex + 1);
  console.log('body after', body);

  // let graphHistogr = {
  
  //     graphType: 'vertical_bar_plot',
  //     subGraphType: 'simpleBar',
  //     format: 'XYpair',
  //   data: {
  //     x: [1],
  //     y: [3]
  //     }
  // }
  

   createGraphPage(props, body, props.currentReport, props.currentReport?.id, testGraphName)
}
