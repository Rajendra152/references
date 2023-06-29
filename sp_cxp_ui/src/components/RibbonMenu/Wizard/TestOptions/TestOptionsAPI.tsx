import { exit } from 'process';
import {
  getIndexByAlphaSeries,
  multipleDataGroup,
  groupDataColumns,
  groupDataColumnsDescriptive,
} from '../../../../utils/spreadsheet/spreadsheetUtility';

import { accessTestOptions } from '../../../RibbonMenu/Wizard/TestOptions/TestOptionsPlaceholders';

export function api_call_test_options(
  params: any,
  worksheetkey: any,
  rowIndex: any
) {
  console.log(params);
  const { url, body, testFlow } = accessTestOptions(params.testOptionsName);
  console.log('Url', url);
  console.log('Body', body);
  //alert(rowIndex);
  if (params.testOptionsName === 'One-Sample Signed Rank Test') {
    body.population_median = params.meanValue;
    var columData = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    body.worksheet = worksheetkey;
    body.data_columns[0].column = columData;
    body.data_columns[0].data_option = params.dataformatInfo[0].title;
    body.data_columns[0].end_row = rowIndex+1;

    return [url, body, testFlow];
  }

  if (params.testOptionsName === 'Rank Sum Test' && params.DATAFORMAT == 67) {
    console.log('here Rank Sum Test- Raw');
    //alert(rowIndex);
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.raw.data_columns[0].column = columData1;
    body.raw.data_columns[1].column = columData2;
    body.raw.data_columns[0].end_row = rowIndex + 1;
    body.raw.data_columns[1].end_row = rowIndex + 1;
    body.raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.raw);
    return [url, body.raw, testFlow];
  }
  if (params.testOptionsName === 'Rank Sum Test' && params.DATAFORMAT == 51) {
    console.log('here Rank Sum Test-Indexed');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.Indexed);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 't test' && params.DATAFORMAT == 66) {
    console.log('here t-test raw');
    //alert(rowIndex);
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Raw.data_columns[0].column = columData1;
    body.Raw.data_columns[1].column = columData2;
    body.Raw.data_columns[0].end_row = rowIndex + 1;
    body.Raw.data_columns[1].end_row = rowIndex + 1;
    body.Raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body.Raw, testFlow];
  }
  if (params.testOptionsName === 't test' && params.DATAFORMAT == 51) {
    console.log('here t-test Indexed');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.Indexed);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 't test' && params.DATAFORMAT == 52) {
    console.log('here t-test Deviation');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.Deviation.data_columns[0].column = columData1;
    body.Deviation.data_columns[1].column = columData2;
    body.Deviation.data_columns[2].column = columData3;
    body.Deviation.data_columns[0].end_row = rowIndex + 1;
    body.Deviation.data_columns[1].end_row = rowIndex + 1;
    body.Deviation.data_columns[2].end_row = rowIndex + 1;
    body.Deviation.worksheet = worksheetkey;
    console.log('Body final prepared', body.Deviation);
    return [url, body.Deviation, testFlow];
  }
  if (params.testOptionsName === 't test' && params.DATAFORMAT == 53) {
    console.log('here t-test Error');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.Error.data_columns[0].column = columData1;
    body.Error.data_columns[1].column = columData2;
    body.Error.data_columns[2].column = columData3;
    body.Error.data_columns[0].end_row = rowIndex + 1;
    body.Error.data_columns[1].end_row = rowIndex + 1;
    body.Error.data_columns[2].end_row = rowIndex + 1;
    body.Error.worksheet = worksheetkey;
    console.log('Body final prepared', body.Error);
    return [url, body.Error, testFlow];
  }
  if (
    params.testOptionsName === 'One Sample t-test' &&
    params.DATAFORMAT == 50
  ) {
    console.log('here one sample t-test raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);

    body.raw.data_columns[0].column = columData1;
    body.raw.data_columns[0].end_row = rowIndex + 1;
    body.raw.population_mean = Number(params.meanValue);

    body.raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.raw);
    return [url, body.raw, testFlow];
  }
  if (
    params.testOptionsName === 'One Sample t-test' &&
    params.DATAFORMAT == 52
  ) {
    console.log('here one sample t-test mean');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.deviation.data_columns[0].column = columData1;
    body.deviation.data_columns[1].column = columData2;
    body.deviation.data_columns[2].column = columData3;
    body.deviation.data_columns[0].end_row = rowIndex + 1;
    body.deviation.data_columns[1].end_row = rowIndex + 1;
    body.deviation.data_columns[2].end_row = rowIndex + 1;
    body.deviation.population_mean = Number(params.meanValue);

    body.deviation.worksheet = worksheetkey;
    console.log('Body final prepared', body.deviation);
    return [url, body.deviation, testFlow];
  }
  if (
    params.testOptionsName === 'One Sample t-test' &&
    params.DATAFORMAT == 53
  ) {
    console.log('here one sample t-test error');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.error.data_columns[0].column = columData1;
    body.error.data_columns[1].column = columData2;
    body.error.data_columns[2].column = columData3;
    body.error.data_columns[0].end_row = rowIndex + 1;
    body.error.data_columns[1].end_row = rowIndex + 1;
    body.error.data_columns[2].end_row = rowIndex + 1;
    body.error.population_mean = Number(params.meanValue);

    body.error.worksheet = worksheetkey;
    console.log('Body final prepared', body.error);
    return [url, body.error, testFlow];
  }
  if (params.testOptionsName === 'Paired T-test' && params.DATAFORMAT == 112) {
    console.log('here paired t-test raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);

    body.raw.data_columns[0].column = columData1;
    body.raw.data_columns[1].column = columData2;

    body.raw.data_columns[0].end_row = rowIndex + 1;
    body.raw.data_columns[1].end_row = rowIndex + 1;

    body.raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.raw);
    return [url, body.raw, testFlow];
  }
  if (params.testOptionsName === 'Paired T-test' && params.DATAFORMAT == 70) {
    console.log('here paired t-test indexed');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.indexed.data_columns[0].column = columData1;
    body.indexed.data_columns[1].column = columData2;
    body.indexed.data_columns[2].column = columData3;
    body.indexed.data_columns[0].end_row = rowIndex + 1;
    body.indexed.data_columns[1].end_row = rowIndex + 1;
    body.indexed.data_columns[2].end_row = rowIndex + 1;
    body.indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.indexed);
    return [url, body.indexed, testFlow];
  }

  if (
    params.testOptionsName === 'Fisher Exact Test' &&
    params.DATAFORMAT == 113
  ) {
    console.log('here fisher exact raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);

    body.raw.data_columns[0].column = columData1;
    body.raw.data_columns[1].column = columData2;

    body.raw.data_columns[0].end_row = rowIndex + 1;
    body.raw.data_columns[1].end_row = rowIndex + 1;

    body.raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.raw);
    return [url, body.raw, testFlow];
  }
  if (
    params.testOptionsName === 'Fisher Exact Test' &&
    params.DATAFORMAT == 114
  ) {
    console.log('here fisher exact tabulated');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);

    body.tabulated.data_columns[0].column = columData1;
    body.tabulated.data_columns[1].column = columData2;

    body.tabulated.data_columns[0].end_row = rowIndex + 1;
    body.tabulated.data_columns[1].end_row = rowIndex + 1;

    body.tabulated.worksheet = worksheetkey;
    console.log('Body final prepared', body.tabulated);
    return [url, body.tabulated, testFlow];
  }

  if (params.testOptionsName === 'One Way ANOVA' && params.DATAFORMAT == 68) {
    //console.log("here one way anova raw ");2
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.Raw)),
      worksheetkey,
      rowIndex
    );
    console.log('Body one way anova', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'One Way ANOVA' && params.DATAFORMAT == 51) {
    console.log('here one way anova Indexed ');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.Indexed);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 'One Way ANOVA' && params.DATAFORMAT == 52) {
    console.log('here one way anova Deviation ');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.Deviation.data_columns[0].column = columData1;
    body.Deviation.data_columns[1].column = columData2;
    body.Deviation.data_columns[2].column = columData3;
    body.Deviation.data_columns[0].end_row = rowIndex + 1;
    body.Deviation.data_columns[1].end_row = rowIndex + 1;
    body.Deviation.data_columns[2].end_row = rowIndex + 1;
    body.Deviation.worksheet = worksheetkey;
    console.log('Body final prepared', body.Deviation);
    return [url, body.Deviation, testFlow];
  }
  if (params.testOptionsName === 'One Way ANOVA' && params.DATAFORMAT == 53) {
    console.log('here one way anova Error');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.Error.data_columns[0].column = columData1;
    body.Error.data_columns[1].column = columData2;
    body.Error.data_columns[2].column = columData3;
    body.Error.data_columns[0].end_row = rowIndex + 1;
    body.Error.data_columns[1].end_row = rowIndex + 1;
    body.Error.data_columns[2].end_row = rowIndex + 1;
    body.Error.worksheet = worksheetkey;
    console.log('Body final prepared', body.Error);
    return [url, body.Error, testFlow];
  }
  if (params.testOptionsName === 'Two Way ANOVA') {
    console.log('here two way anova');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[2].column = columData3;
    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.data_columns[2].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'Chi-square' && params.DATAFORMAT == 63) {
    console.log('here chi-square raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.raw.data_columns[0].column = columData1;
    body.raw.data_columns[1].column = columData2;
    body.raw.data_columns[0].end_row = rowIndex + 1;
    body.raw.data_columns[1].end_row = rowIndex + 1;
    body.raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.raw);
    return [url, body.raw, testFlow];
  }
  if (params.testOptionsName === 'Chi-square' && params.DATAFORMAT == 72) {
    console.log('here chi-square tabulated');
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.tabulated)),
      worksheetkey,
      rowIndex
    );
    console.log('Body chi-square', group_data_columns);
    console.log('Body final prepared', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Three Way ANOVA') {
    console.log('here three way anova');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    var columData4 = getIndexByAlphaSeries(params.dataformatInfo[3].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[2].column = columData3;
    body.data_columns[3].column = columData4;
    body.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'ANOVA On Ranks' && params.DATAFORMAT == 68) {
    console.log('here anova on ranks raw++++ ');
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.Raw)),
      worksheetkey,
      rowIndex
    );
    console.log('Body one way anova', group_data_columns);
    console.log('Body final prepared', body.Raw);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'ANOVA On Ranks' && params.DATAFORMAT == 69) {
    console.log('hereanova on ranks Indexed ');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.Indexed);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 'One Way ANCOVA') {
    console.log('here one way ancova');
    console.log(rowIndex + 'rowIndex');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    //  var columData4 = getIndexByAlphaSeries(params.dataformatInfo[3].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[2].column = columData3;
    //body.data_columns[3].column = columData4;
    body.data_columns[0].end_row = rowIndex+1;
    body.data_columns[1].end_row = rowIndex+1;
    body.data_columns[2].end_row = rowIndex+1;
   // body.data_columns[3].end_row = rowIndex;
    body.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'Repeated Measures ANOVA On Ranks' && params.DATAFORMAT == 68) {
    console.log('here Repeated Measures Anova on Ranks raw');
    // var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    // var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    // body.Raw.data_columns[0].column = columData1;
    // body.Raw.data_columns[1].column = columData2;
    // body.Raw.data_columns[0].end_row = rowIndex+1;
    // body.Raw.data_columns[1].end_row = rowIndex+1;
    // body.Raw.worksheet = worksheetkey;
    // console.log('Body final prepared', body);
    // return [url, body.Raw, testFlow];
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.Raw)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Repeated Measures ANOVA On Ranks' && params.DATAFORMAT == 71) {
    console.log('here Repeated Measures Anova on Ranks index');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);

    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[2].column = columData3;

    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.data_columns[2].end_row = rowIndex + 1;

    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body.Indexed, testFlow];
  }
  if (
    params.testOptionsName === 'One Way Repeated Measures ANOVA' &&
    params.DATAFORMAT == 68
  ) {
    console.log('here One Way Repeated Measures Anova');
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.Raw)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
    // var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    // var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    // // var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    // // var columData4 = getIndexByAlphaSeries(params.dataformatInfo[3].value);
    // body.Raw.data_columns[0].column = columData1;
    // body.Raw.data_columns[1].column = columData2;
    // // body.Raw.data_columns[2].column = columData3;
    // // body.Raw.data_columns[3].column = columData4;
    // body.Raw.data_columns[0].end_row = rowIndex+1;
    // body.Raw.data_columns[1].end_row = rowIndex+1;
    // // body.Raw.data_columns[2].end_row = rowIndex+1;
    // // body.Raw.data_columns[3].end_row = rowIndex+1;
    // body.Raw.worksheet = worksheetkey;
    // console.log('Body final prepared', body);
    // return [url, body.Raw, testFlow];
  }
  if (
    params.testOptionsName === 'One Way Repeated Measures ANOVA' &&
    params.DATAFORMAT == 71
  ) {
    console.log('here One Way Repeated Measures Anova Index');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);

    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[2].column = columData3;

    body.Indexed.data_columns[0].end_row = rowIndex + 1;
    body.Indexed.data_columns[1].end_row = rowIndex + 1;
    body.Indexed.data_columns[2].end_row = rowIndex + 1;

    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 'Two Way Repeated Measures ANOVA') {
    console.log('here Two Way Repeated Measures Anova');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    var columData4 = getIndexByAlphaSeries(params.dataformatInfo[3].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[2].column = columData3;
    body.data_columns[3].column = columData4;

    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.data_columns[2].end_row = rowIndex + 1;
    body.data_columns[3].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'Descriptive Statistics') {
    console.log('inside descriptive statistics');

    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'One Way Frequency Tables') {
    console.log('inside One Way Frequency Tables');
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (
    params.testOptionsName === 'Signed Rank Test' &&
    params.DATAFORMAT == 103
  ) {
    console.log('inside raw of signed rank test');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Raw.data_columns[0].column = columData1;
    body.Raw.data_columns[1].column = columData2;
    body.Raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body.Raw, testFlow];
  }
  if (
    params.testOptionsName === 'Signed Rank Test' &&
    params.DATAFORMAT == 104
  ) {
    console.log('inside indexed of signed rank test');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    var columData3 = getIndexByAlphaSeries(params.dataformatInfo[2].value);
    body.Indexed.data_columns[0].column = columData1;
    body.Indexed.data_columns[1].column = columData2;
    body.Indexed.data_columns[2].column = columData3;
    body.Indexed.worksheet = worksheetkey;
    console.log('Body final prepared', body.Indexed);
    return [url, body.Indexed, testFlow];
  }
  if (params.testOptionsName === 'z-test') {
    console.log('inside Z-test');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    console.log('Body final prepared', body);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === "McNemar's Test" && params.DATAFORMAT == 63) {
    console.log("inside McNemar's test raw");
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Raw.data_columns[0].column = columData1;
    body.Raw.data_columns[1].column = columData2;
    body.Raw.data_columns[0].end_row = rowIndex+1
    body.Raw.data_columns[1].end_row = rowIndex+1
    body.Raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body.Raw, testFlow];
  }
  if (params.testOptionsName === "McNemar's Test" && params.DATAFORMAT == 72) {
    console.log("inside McNemar's test tablutaed data");
    let group_data_columns = multipleDataGroup(
      params,
      JSON.parse(JSON.stringify(body.Tabulated)),
      worksheetkey,
      rowIndex
    );
    console.log('Body final Multiple Logistic', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Relative Risk' && params.DATAFORMAT == 64) {
    console.log('inside Relative Risk raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Raw.data_columns[0].column = columData1;
    body.Raw.data_columns[1].column = columData2;
    body.Raw.data_columns[0].end_row = rowIndex + 1;
    body.Raw.data_columns[1].end_row = rowIndex + 1;
    body.Raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body.Raw, testFlow];
  }
  if (params.testOptionsName === 'Relative Risk' && params.DATAFORMAT == 65) {
    console.log('inside Relative Risk Tab');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Tabulated.data_columns[0].column = columData1;
    body.Tabulated.data_columns[1].column = columData2;
    body.Tabulated.data_columns[0].end_row = rowIndex + 1;
    body.Tabulated.data_columns[1].end_row = rowIndex + 1;
    body.Tabulated.worksheet = worksheetkey;
    console.log('Body final prepared', body.Tabulated);
    return [url, body.Tabulated, testFlow];
  }
  if (params.testOptionsName === 'Odds Ratio' && params.DATAFORMAT == 86) {
    console.log('inside Relative Risk raw');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Raw.data_columns[0].column = columData1;
    body.Raw.data_columns[1].column = columData2;
    body.Raw.data_columns[0].end_row = rowIndex + 1;
    body.Raw.data_columns[1].end_row = rowIndex + 1;
    body.Raw.worksheet = worksheetkey;
    console.log('Body final prepared', body.Raw);
    return [url, body.Raw, testFlow];
  }
  if (params.testOptionsName === 'Odds Ratio' && params.DATAFORMAT == 87) {
    console.log('inside Relative Risk Tab');
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.Tabulated.data_columns[0].column = columData1;
    body.Tabulated.data_columns[1].column = columData2;
    body.Tabulated.data_columns[0].end_row = rowIndex + 1;
    body.Tabulated.data_columns[1].end_row = rowIndex + 1;
    body.Tabulated.worksheet = worksheetkey;
    console.log('Body final prepared', body.Tabulated);
    return [url, body.Tabulated, testFlow];
  }
  if (params.testOptionsName === 'Linear') {
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    console.log(body.data_columns);
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'Multiple Logistic') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Multiple Linear') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Polynomial') {
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);
    var columData2 = getIndexByAlphaSeries(params.dataformatInfo[1].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    return [url, body, testFlow];
  }
  if (params.testOptionsName === 'Forward') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Backward') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Best Subset') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Deming') {
    let group_data_columns = groupDataColumns(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    group_data_columns.sd_of_x = parseInt(params.sdDeviationX);
    group_data_columns.sd_of_y = parseInt(params.sdDeviationY);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Principal Components') {
    console.log(params);
    console.log('inside Normality Tables');
    let group_data_columns = groupDataColumnsDescriptive(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }

  if (params.testOptionsName === 'Pearson Product Moment') {
    console.log(params);

    console.log('inside Person roduct Moment Tables');
    let group_data_columns = groupDataColumnsDescriptive(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }

  if (params.testOptionsName === 'Spearman Rank Order') {
    console.log(params);

    console.log('inside Spearman Rank order Tables');
    let group_data_columns = groupDataColumnsDescriptive(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }

  if (params.testOptionsName === 'Normality') {
    console.log(params);

    console.log('inside Normality Tables');
    let group_data_columns = groupDataColumnsDescriptive(
      params,
      JSON.parse(JSON.stringify(body)),
      worksheetkey,
      rowIndex
    );
    console.log('Body Descriptive', group_data_columns);
    return [url, group_data_columns, testFlow];
  }
  if (params.testOptionsName === 'Single Group') {
    let getTimeData = params.dataformatInfo.filter(
      (element) => element.title == 'Time'
    );
    let getStatusData = params.dataformatInfo.filter(
      (element) => element.title == 'Status'
    );
    var columData1 = getIndexByAlphaSeries(getTimeData[0].value);
    var columData2 = getIndexByAlphaSeries(getStatusData[0].value);
    body.data_columns[0].column = columData1;
    body.data_columns[1].column = columData2;
    body.data_columns[0].end_row = rowIndex + 1;
    body.data_columns[1].end_row = rowIndex + 1;
    body.worksheet = worksheetkey;
    params.statusSelectionInfo[0].status_label.map((eachvalue) => {
     if(eachvalue.value){
      JSON.parse(
        JSON.stringify(body.status_labels.push(eachvalue.value.toString()))
      );
     }
    
    });
    params.statusSelectionInfo[0].event_label.map((eachvalue) => {
      if(eachvalue.value){
        JSON.parse(
          JSON.stringify(body.event_labels.push(eachvalue.value.toString()))
        );
      }
    });
    params.statusSelectionInfo[0].censor_label.map((eachvalue) => {
      if(eachvalue.value){
        JSON.parse(
          JSON.stringify(body.censor_labels.push(eachvalue.value.toString()))
        );
      }

    });
    return [url, body, testFlow];
  }
  if (
    params.testOptionsName === 'LogRank' ||
    params.testOptionsName === 'Gehan-Breslow' ||
    params.testOptionsName === 'Proportional Hazards' ||
    params.testOptionsName === 'Stratified Model'
  ) {
    let bodyData = JSON.parse(JSON.stringify(body));
    console.log(bodyData);
    console.log(params);
    if (params.statusSelectionInfo[0].navigationFlowType == 'fromIndexed') {
      console.log("inside if")
      bodyData.groups = params.statusSelectionInfo[0].groups;
      bodyData.select_all_groups =
        params.statusSelectionInfo[0].selectallGroups;
      bodyData.data_format = 3;
    } else if (
      params.statusSelectionInfo[0].navigationFlowType == 'fromCovariant'
    ) {
      console.log("inside else");
      let groupCoordinates = [];
      params.statusSelectionInfo[0].covariates.map((eachCord) => {
        groupCoordinates.push(getIndexByAlphaSeries(eachCord));
      });
      bodyData.covariates = groupCoordinates;
    }
    params.dataformatInfo.map((eachData) => {
      if (eachData.title && eachData.value) {
        let obj = {
          data_option: eachData.title.startsWith('Covariate')
            ? 'Covariate'
            : eachData.title,
          column: getIndexByAlphaSeries(eachData.value),
          start_row: 0,
          end_row: rowIndex+1,
        };
        bodyData.data_columns.push(obj);
      }
    });
    bodyData.worksheet = worksheetkey;
    console.log(params.statusSelectionInfo);
    params.statusSelectionInfo[0].status_label.map((eachvalue) => {
      console.log(eachvalue)
      if(eachvalue.value){
        console.log("inside if status_label");
        console.log(eachvalue.value);
      bodyData.status_labels.push(eachvalue.value.toString());
    }
    });
    params.statusSelectionInfo[0].event_label.map((eachvalue) => {
      console.log(eachvalue)
      if(eachvalue.value){
        console.log("inside if event_label");
        console.log(eachvalue.value);
      bodyData.event_labels.push(eachvalue.value);
      }
    });
    params.statusSelectionInfo[0].censor_label.map((eachvalue) => {
      console.log(eachvalue)
      if(eachvalue.value){
        console.log("inside if censor_label");
        console.log(eachvalue.value);
      bodyData.censor_labels.push(eachvalue.value);
      }
    });
    console.log(bodyData);
    return [url, bodyData, testFlow];
  }

  if (params.testOptionsName === 'Histogram') {
    console.log('row index', rowIndex);
    console.log('params contains shree', params);
    if (params.dataformatInfo[0].value === 'First Empty') {
      alert(
        'Source cannot be empty. Please select a column with values as source.',
        'SigmaPlot 15'
      );
      return;
    } else {
      body.normalization = params.normalization;
    body.bin_edge = params.binEdge;
    body.graph_style = params.graphStyle;
    body.auto_binning = params.automaticBinning;
    body.no_of_bins = Number(params.binNumber);
    body.worksheet = worksheetkey;
    body.data_columns[0].end_row = rowIndex+1;
    var columData1 = getIndexByAlphaSeries(params.dataformatInfo[0].value);

      body.data_columns[0].column = columData1;
      return [url, body];
    }
  }
}
