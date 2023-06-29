import * as math from  "mathjs";
import * as STList from '../../components/Analysis/StatisticalTransformation/StatisticalDataFormatList';

const rand = require('random-seed').create();
const randomNormal = require('random-normal');
const decimalPlaces = 2;

const Stack = (gridData: any, selectedCols: object[]) => {
  let finalArray: object[] = [];
  (selectedCols || []).forEach((col: any) => {
    if(col.title === 'Input') {
      const tempData = (gridData[parseInt(col.key)] || []).map((data: any) => {
        return !data ? {value: ''} : data;
      })
      finalArray = [...finalArray, ...tempData]
    }
  })
  return [finalArray];
}

const OneWayIndexing = (gridData: any, selectedCols: object[]) => {
  let factorArray: object[] = [];
  let outputArray: object[] = [];
  (selectedCols || []).forEach((col: any) => {
    if(col.title === 'Factor') {
      (gridData[parseInt(col.key)] || []).forEach((data: any) => {
        if(data && data.value !== "") {
          factorArray.push({value: col.value.replace('Column ', '')});
          outputArray.push(data);
        }
      })
    }
  })
  return [factorArray, outputArray];
}

const TwoWayIndexing = (gridData: any, selectedCols: object[]) => {
  let factorArray: object[] = [];
  let levelArray: object[] = [];
  let outputArray: object[] = [];
  (selectedCols || []).forEach((col: any) => {
    if(col.title === 'Group') {
      (gridData[parseInt(col.key)] || []).forEach((data: any) => {
        if(data && data.value !== "") {
          factorArray.push({value: 'Factor'});
          levelArray.push({value: 'Level'});
          outputArray.push(data);
        }
      })
    }
  })
  return [factorArray, levelArray, outputArray];
}

const OneWayUnIndexing = (gridData: any, selectedCols: object[]) =>{
  let finalArray: any = [];
  let columnsHeaderObj: any = {};
  let headerArray: any = [];
  (selectedCols || []).forEach((col: any) => {
    if(col.title === 'Factor') {
      headerArray = (gridData[parseInt(col.key)] || []).filter((data: any) => {
        if(data && data.value) {
          columnsHeaderObj[data.value] = [];
          return true;
        }
        return false;
      });
    } else if(col.title === 'Data') {
      (gridData[parseInt(col.key)] || []).forEach((data: any, index: number) => {
        let key = (headerArray[index] && headerArray[index].value) || '';
        if(columnsHeaderObj[key]) {
          if(columnsHeaderObj[key].length === 0) {
            finalArray[index] = [{value: key}];
            columnsHeaderObj[key].push(index);
          }
          finalArray[columnsHeaderObj[key][0]].push(data);
        }
      })
    }
  })
  finalArray = finalArray.filter((data: any) => {
    return data ? true : false;
  })
  return finalArray;
}

const TwoWayUnIndexing = (gridData: any, selectedCols: object[])=>{
  let finalArray: any = [];
  let columnsHeaderObj: any = {};
  let headerArray: any = [];
  let factorAArray: any = [];
  (selectedCols || []).forEach((col: any) => {
    if(col.title === 'Factor A') {
      factorAArray = (gridData[parseInt(col.key)] || []).filter((data: any) => {
        return (data && data.value) ?  true : false;
      });
    } else if(col.title === 'Factor B') {
      headerArray = (gridData[parseInt(col.key)] || []).filter((data: any, index: number) => {
        if(data && data.value) {
          let key = (factorAArray[index] && factorAArray[index].value) + ' - ' + data.value;
          columnsHeaderObj[key] = [];
          return true;
        }
        return false;
      });
    } else if(col.title === 'Data') {
      (gridData[parseInt(col.key)] || []).forEach((data: any, index: number) => {
        let key = ((factorAArray[index] && factorAArray[index].value) + ' - ' + (headerArray[index] && headerArray[index].value)) || ''
        if(columnsHeaderObj[key]) {
          if(columnsHeaderObj[key].length === 0) {
            finalArray[index] = [{value: key}];
            columnsHeaderObj[key].push(index);
          }
          finalArray[columnsHeaderObj[key][0]].push(data);
        }
      })
    }
  })
  finalArray = finalArray.filter((data: any) => {
    return data ? true : false;
  })
  return finalArray;
}

const Add = (gridData: any, selectedCols: object[]) => {
  return twoColOperation(gridData, selectedCols, math.add);
}

const Subtract = (gridData: any, selectedCols: object[]) => {
  return twoColOperation(gridData, selectedCols, math.subtract);
}

const Divide = (gridData: any, selectedCols: object[]) => {
  return twoColOperation(gridData, selectedCols, math.dotDivide);
}

const Interactions = (gridData: any, selectedCols: object[]) => {
  return twoColOperation(gridData, selectedCols, math.dotMultiply);
}

const twoColOperation = (gridData: any, selectedCols: object[], operation: Function) => {
  let { col1, col2 } = getTwoGridColumn(gridData, selectedCols);
  //const [array1, index1, array2, index2] = arrayOperations(col1, col2);
  const [array1, index1, array2, index2] = getColArrays(col1, col2);
  const indexes = [...new Set([...index1, ...index2])].sort();
  let result: any[] = operation(array1, array2);
  result = [...result.map((value: any) => {
    return {value};
  })];
  indexes.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const Square = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.dotPow, [2]);
}

const AbsValue = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.abs);
}

const Ln = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.log);
}

const log10 = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.log10);
}

const Reciprocal = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [array, index] = getModifiedArr(col1);
  let result = math.round(math.dotDivide(array, math.dotPow(array, 2)), 4);
  result = [...result.map((value: any) => {
    return {value};
  })]
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const Exponential = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.exp);
}

const SquareRoot = (gridData: any, selectedCols: object[]) => {
  return oneColOperation(gridData, selectedCols, math.sqrt);
}

const oneColOperation = (gridData: any, selectedCols: object[], operation: Function, args?: any[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [array, index] = getModifiedArr(col1);
  let result = args ? operation(array, ...args) : operation(array);
  result = result.map((value: any) => {
    return {value: typeof value === 'object' ? '--' : value};
  })
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const asinsqrt = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [array, index] = getModifiedArr(col1);
  let result = math.round(math.asin(math.sqrt(array)), 4);
  result = [...result.map((value: any) => {
    value = typeof value === 'object' ? '--' : value;
    return {value};
  })]
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const Center = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [array, index] = removeNonnumeric(col1)
  let result = math.subtract(array, math.mean(array));
  result = [...result.map((value: any) => {
    return {value};
  })]
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const Standardize = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [array, index] = removeNonnumeric(col1)
  let center = math.subtract(array, math.mean(array))
  let standard_deviation = math.std(array)
  let result = math.round(math.divide(center, standard_deviation), 4);
  result = [...result.map((value: any) => {
    return {value};
  })]
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const Rank = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const [arr, index] = removeNonnumeric(col1)
  let result: any = []
  let arrLen = arr.length
  for (var i = 0; i < arrLen; i++) {
    let r = 1,
    s = 1;
    for (var j = 0; j < arrLen; j++) {
      if (j != i && arr[j] < arr[i]) {
        r += 1;
      }
      if (j != i && arr[j] == arr[i]){
        s += 1;
      }
    }
    // Use formula to obtain rank
    result[i] = parseFloat(r + parseFloat(s - 1) / parseFloat(2));
  }
  result = result.map((value: any) => {
    return {value: value.toFixed(decimalPlaces)};
  })
  index.forEach((key: number) => {
    result.splice(key, 0, {value: "--"});
  })
  return [result];
}

const LaggedVariables = (gridData: any, selectedCols: object[]) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  col1.pop();
  col1.unshift('--');
  col1 = col1.map((value: any) => {
    return {value};
  });
  return [col1];
}

const DummyRefCoding = (gridData: any, selectedCols: object[], refValue: any) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const colMap: any = {};
  const colLen = col1.length;
  col1 = col1.filter((col: any, index: number) => {
    colMap[col] ? colMap[col].push(index) : colMap[col] = [index];
    if(col === refValue) {
      return false;
    }
    return true;
  })
  col1 = [...new Set(col1)];

  let result: any = [];

  for(let i = 0; i < col1.length ; i++){
    if(!result[i]) {
      result[i] = [];
    }
    for (let j = 0; j < colLen; j++){
      let value = 0;
      if(colMap[col1[i]] && colMap[col1[i]].length && colMap[col1[i]].includes(j)) {
        value = 1;
      }
      result[i][j] = {value};
      
    }
    result[i].unshift({value: "RC-"+ col1[i]});
  }
  return result;
}

const EffectsCoding = (gridData: any, selectedCols: object[], refValue: any) => {
  let col1 = getOneGridColumn(gridData, selectedCols);
  const colMap: any = {};
  const colLen = col1.length;
  let removedIndex: any = [];
  col1 = col1.filter((col: any, index: number) => {
    colMap[col] ? colMap[col].push(index) : colMap[col] = [index];
    if(col === refValue) {
      removedIndex.push(index);
      return false;
    }
    return true;
  })
  col1 = [...new Set(col1)];

  let result: any = [];

  for(let i = 0; i < col1.length ; i++){
    if(!result[i]) {
      result[i] = [];
    }
    for (let j = 0; j < colLen; j++){
      let value = 0;
      if(colMap[col1[i]] && colMap[col1[i]].length && colMap[col1[i]].includes(j)) {
        value = 1;
      }
      if(removedIndex.includes(j)) {
        value = -1;
      }
      result[i][j] = {value};
      
    }
    result[i].unshift({value: "EC-"+ col1[i]});
  }
  return result;
}

const Filter = (gridData: any, selectedCols: object[], modalData: any) => {
  const { filterType, upperBound, lower, keyLabel } = modalData;
  let cols = getAllGridColumn(gridData, selectedCols, ['Key', 'Input']);
  const keyIndexes: any = [];
  cols = (cols || []).map((col: any, index: number) => {
    col = (col || []).filter((data: any, colIndex: number) => {
      let flag = false;
      if(index === 0) {
        if(filterType) {
          if(!isNaN(data.value) && data.value < upperBound.key && data.value > lower.key) {
            flag = true;
          }
        } else {
          if(data.value == keyLabel) {
            flag = true;
          }
        }
        if(flag) {
          keyIndexes.push(colIndex);
        }
      } else if(keyIndexes.includes(colIndex)) {
        flag = true;
      }
      return flag;
    })
    return col;
  })
  return cols;
}

const RandomUniform = (modalData: any) => {
  const { min, max, quantity, seed } = modalData;
  const result = [];
  var d = new Date();
  var n = d.getTime();
  rand.seed(n);
  if(quantity) {
    for(let i = 0; i < parseInt(quantity); i++) {
      result.push({value: rand.floatBetween(min, max).toFixed(decimalPlaces)});
    }
  }
  return [result];
}

const RandomNormal = (modalData: any) => {
  const { min, max, quantity, seed } = modalData;
  const result = [];
  if(quantity) {
    for(let i = 0; i < parseInt(quantity); i++) {
      result.push({value: randomNormal({mean: min, dev: max}).toFixed(decimalPlaces)});
    }
  }
  return [result];
  /* var d = new Date();
  var n = d.getTime();
  seed(n);
  let randomArray = normal(0.0, 1.0).distributionSync(15); //(mu, std-dev).(quantity)
  console.log(randomArray) */
}

const missingValues = (gridData: any, selectedCols: object[], missing: any) => {
  let cols = getAllGridColumn(gridData, selectedCols, ['Input']);
  const missing_param = "--"; // Replacing value
  cols = (cols || []).map((col: any) => {
    col = (col || []).map((data: any) => {
      if(data.value == missing) {
        data.value = missing_param;
      }
      return data;
    })
    return col;
  });
  return cols;
}

const getOneGridColumn = (gridData: any, selectedCols: object[]) => {
  let col1: any = [];
  let emptyIndex = -1;
  (selectedCols || []).some((col: any) => {
    if(col.title === 'Input') {
      col1 = (gridData[parseInt(col.key)] || [])
      //.filter((data:any) => {return (data && data.value) ? true : false})
      .map((data: any, index: number) => {
        if(data && (data.value || data.value <= 0)) {
          emptyIndex = -1;
          return data.value;
        } else {
          if(emptyIndex === -1) {
            emptyIndex = index;
          }
          return '';
        }
      });
      if(emptyIndex !== -1) {
        col1.splice(emptyIndex);
      }
      return false;
    }
    return true;
  })
  return col1;
}

const getTwoGridColumn = (gridData: any, selectedCols: object[]) => {
  let col1: any = [];
  let col2: any = [];
  (selectedCols || []).some((col: any) => {
    if(col.title === 'Input') {
      if(!col1.length) {
        let emptyIndex = -1;
        col1 = (gridData[parseInt(col.key)] || [])
        //.filter((data:any) => {return (data && data.value) ? true : false})
        .map((data: any, index: number) => {
          if(data && (data.value || data.value <= 0)) {
            emptyIndex = -1;
            return data.value;
          } else {
            if(emptyIndex === -1) {
              emptyIndex = index;
            }
            return '';
          }
        });
        if(emptyIndex !== -1) {
          col1.splice(emptyIndex);
        }
      } else {
        let emptyIndex = -1;
        col2 = (gridData[parseInt(col.key)] || [])
        //.filter((data:any) => {return (data && data.value) ? true : false})
        .map((data: any, index: number) => {
          if(data && (data.value || data.value <= 0)) {
            emptyIndex = -1;
            return data.value;
          } else {
            if(emptyIndex === -1) {
              emptyIndex = index;
            }
            return '';
          }
        });
        if(emptyIndex !== -1) {
          col2.splice(emptyIndex);
        }
      }
      return false;
    }
    return true;
  })
  return {col1, col2};
}

const getAllGridColumn = (gridData: any, selectedCols: object[], titleArray?: any) => {
  let cols: any = [];
  (selectedCols || []).forEach((col: any) => {
    if(titleArray.includes(col.title)) {
      cols.push((gridData[parseInt(col.key)] || [])
      .map((data:any) => {return !data ? {value: ''} : data}));
    }
  })
  return cols;
}

const getModifiedArr = (arr: any) => {
    let result = []
    arr = arr.filter((entry, index) => {
      if(!isNaN(parseFloat(entry))) {
        entry = parseFloat(entry);
      }
      if(typeof(entry) !== 'number') {
          result.push(index);
          return false;
          //arr[index] = 0;
      }
      return true
    });
    return [arr, result];
}

const removeNonnumeric = (arr: any) => {
  let result: any[] = []
  let newarr: any[] = []
  arr.forEach((entry: any, index: number) => {
    if(!isNaN(parseFloat(entry))) {
      entry = parseFloat(entry);
    }
    if(typeof(entry) !== 'number') {
      result.push(index);
      return false;
    }
    newarr.push(entry);
    return true
  });
  return [newarr, result];
}


const getOriginalArray = (mod_array, index1, index2) => {
    let result = math.concat(index1, index2)
    result.forEach((entry, index) => {
      mod_array[result[index]] = "--";
    });
    return mod_array
}

const makeArraysEqual = (arr1: any, arr2:any) => {
    let max_arr = arr1
    let min_arr = arr2
    if(arr1.length > arr2.length) {
      let diff_length = arr1.length - arr2.length;
      for (let i =0; i < diff_length; i ++) {
        min_arr.push("--")
      }
    } else if (arr1.length < arr2.length) {
      let diff_length = arr2.length - arr1.length;
      for (let i =0; i < diff_length; i ++) {
        max_arr.push("--")
      }
    }
    return [max_arr, min_arr]
}

const getColArrays = (col1: [], col2: []) => {
  let [arr1, arr2] = makeArraysEqual(col1, col2);
  const index1: number[] = [];
  const index2: number[] = [];
  arr1.forEach((entry, index: number) => {
    if(!isNaN(parseFloat(entry))) {
      entry = parseFloat(entry);
    }
    if(typeof(entry) !== 'number') {
      index1.push(index);
      return false;
    }
    return true
  });
  arr2.forEach((entry, index: number) => {
    if(!isNaN(parseFloat(entry))) {
      entry = parseFloat(entry);
    }
    if(typeof(entry) !== 'number') {
      index2.push(index);
      return false;
    }
    return true
  });
  const indexes = [...new Set([...index1, ...index2])];
  arr1 = arr1.filter((data: any, index: number) => {
    if(indexes.includes(index)) {
      return false;
    }
    return true;
  })
  arr2 = arr2.filter((data: any, index: number) => {
    if(indexes.includes(index)) {
      return false;
    }
    return true;
  })
  return [arr1, index1, arr2, index2]
}

const arrayOperations = (col1:any, col2:any) => {
  const [arr1, arr2] = makeArraysEqual(col1, col2);
  const [array1, index1] = getModifiedArr(arr1);
  const [array2, index2] = getModifiedArr(arr2);
  return [array1, index1, array2, index2]
}

const printResults = (result:any , index1:any, index2: any) => {
  if ((Array.isArray(index1) && index1.length) || (Array.isArray(index2) && index2.length)) {
    console.log(getOriginalArray(result, index1, index2));
  } else {
    console.log(result);
  }
}

//setting onclick on Statistical Tests
const func_mapping: any = {
  [STList.Stack]: Stack,
  [STList.OneWayIndex]: OneWayIndexing,
  [STList.TwoWayIndex]: TwoWayIndexing,
  [STList.OneWayUnindex]: OneWayUnIndexing,
  [STList.TwoWayUnindex]: TwoWayUnIndexing,
  [STList.STAdd]: Add,
  [STList.STSubstract]: Subtract,
  [STList.STDivide]: Divide,
  [STList.STSquare]: Square,
  [STList.STAbsoluteValue]: AbsValue,
  [STList.STLn]: Ln,
  [STList.STLog10]: log10,
  [STList.STReciprocal]: Reciprocal,
  [STList.STExponential]: Exponential,
  [STList.STSquareRoot]: SquareRoot,
  [STList.STArcsinSquareRoot]: asinsqrt,
  [STList.Center]: Center,
  [STList.Standardize]: Standardize,
  [STList.Rank]: Rank,
  [STList.Interactions]: Interactions,
  [STList.ReferenceCoding]: DummyRefCoding,
  [STList.EffectsCoding] : EffectsCoding,
  [STList.LaggedVariables]: LaggedVariables,
  [STList.Filter]: Filter,
  [STList.RNUniform]: RandomUniform,
  [STList.RNNormal]: RandomNormal,
  [STList.MissingValues]: missingValues,
}

export const calculations = (columnsData: object[], selectedCols: object[], method_name: string, refValue?: any) => {
    //const [col1, col2] = await getColumnData(openWorksheets);
    return func_mapping[method_name](columnsData, selectedCols, refValue);
}
