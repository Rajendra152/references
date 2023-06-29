import { mean, median, sqrt, std  } from 'mathjs';
import * as jstat from 'jstat'
import { getDataFromGrid } from './GraphServices';
import * as ERRORTYPES from '../../components/Constant/ErrorCalculationTypes';


export const getErrorCals = (data: Number[] , errorType: string) =>{
  switch(errorType){
    case ERRORTYPES.COLUMN_MEANS:
      return jstat.mean(data)
    case ERRORTYPES.MEAN:
      return jstat.mean(data)
    case ERRORTYPES.COLUMN_MEDIAN:
      return jstat.median(data)
    case ERRORTYPES.ROW_MEANS:
      return jstat.mean(data);
    case ERRORTYPES.ROW_MEDIAN:
      return jstat.median(data);
    case ERRORTYPES.STANDARD_DEVIATION:
      return jstat.stdev(data);
    case ERRORTYPES.STANDARD_DEVIATION_2:
      return 2 * jstat.stdev(data);
    case ERRORTYPES.STANDARD_DEVIATION_3:
      return 3 * jstat.stdev(data);
    case ERRORTYPES.STANDARD_ERROR:
      return jstat.stdev(data)/(jstat([data.length]).pow(1/2))[0][0]
    case ERRORTYPES.STANDARD_ERROR_2:
      return 2 * jstat.stdev(data)/(jstat([data.length]).pow(1/2))[0][0]
    case ERRORTYPES.STANDARD_ERROR_3:
      return 3 * jstat.stdev(data)/(jstat([data.length]).pow(1/2))[0][0]
    case ERRORTYPES.CONFIDENCE_99:
      return jstat.stdev(data) * jstat.studentt.cdf( 0.01, data.length - 1)
    case ERRORTYPES.CONFIDENCE_95:
      return jstat.stdev(data) * jstat.studentt.cdf( 0.05, data.length - 1)
    case ERRORTYPES.PERCENTILE_90:
      return jstat.percentile(data, 90);
    case ERRORTYPES.PERCENTILE_75:
      return jstat.percentile(data,75);
    case ERRORTYPES.PERCENTILE_10:
      return jstat.percentile(data, 10);
    case ERRORTYPES.PERCENTILE_25:
      return jstat.percentile(data,25);
    case ERRORTYPES.MAXIMUM:
      return jstat.max(data);
    case ERRORTYPES.MINIMUM:
      return jstat.min(data);
    case ERRORTYPES.FIRST_ENTRY:
      return data[0] >= data[data.length-1] ? data[data.length-1] : data[0];
    case ERRORTYPES.LAST_ENTRY:
      return data[0] >= data[data.length-1] ? data[data.length-1] : data[0];
    case ERRORTYPES.FIRST_COLUMN_ENTRY:
      return data[0];
    case ERRORTYPES.LAST_COLUMN_ENTRY:
      return data[data.length -1];
    case ERRORTYPES.FIRST_ROW_ENTRY:
      return data[0];
    case ERRORTYPES.LAST_ROW_ENTRY:
      return data[data.length -1]; 
    case ERRORTYPES.BY_CATERGORY_MEAN:
      return jstat.mean(data)
    case ERRORTYPES.BY_CATERGORY_MEDIAN:
      return jstat.median(data)
  }
}

// export const getErrorCals = (data: Number[] , param: ErrorObject) =>{
//   if(param.symbol_values=='columnmean'){
//     let keys =Object.keys(param);
//     for (let i = 0; i < keys.length; i++) {
//       const element = keys[i];
//       if(param[element] !==null && param !== 'symbol_values'){
//         param[element] = mean(param[element]);
//       }
//     }
//     return param;
//   }
//   if(param.symbol_values=='Median'){
//     let keys =Object.keys(param);
//     for (let i = 0; i < keys.length; i++) {
//       const element = keys[i];
//       if(param[element]!==null&&param!=='symbol_values'){
//         param[element] = median(param[element]);
//       }
//     }
//     return param;
//   }
//   if(param.symbol_values=='std'){
//     let keys =Object.keys(param);
//     for (let i = 0; i < keys.length; i++) {
//       const element = keys[i];
//       if(param[element]!==null&&param!=='symbol_values'){
//         param[element] = std(param[element], 'unbiased'); // n-s
//         param[element] = std(param[element], 'biased'); // n+s
//       }
//       // 2 std and 3 std (we want loop 2 or 3 times add)
//       if(param[element]!==null&&param!=='symbol_values'){
//         param[element] = std(param[element], 'unbiased'); // n-s
//         param[element] = std(param[element], 'biased'); // n+s
//       }
//     }
//     return param;
//   }

//   if(param.symbol_values=='std err'){
//     let keys =Object.keys(param);
//     for (let i = 0; i < keys.length; i++) {
//       const element = keys[i];
//       if(param[element]!==null&&param!=='symbol_values'){
//         param[element] = std(param[element], 'unbiased') / param[element].length; // n+s
//         param[element] = std(param[element], 'biased') / param[element].length; // n+s
//       }
//       // 2 std and 3 std (we want loop 2 or 3 times add)
//       if(param[element]!==null&&param!=='symbol_values'){
//         param[element] = std(param[element], 'unbiased') / param[element].length; // n+s
//         param[element] = std(param[element], 'biased') / param[element].length; // n+s
//       }
//     }
//     return param;
//   }

// }
