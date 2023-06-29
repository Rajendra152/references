import React, { useEffect, useState } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import {
  Stack,
  IStackProps,
  IStackStyles,
  IStackTokens,
} from 'office-ui-fabric-react/lib/Stack';
import { connect } from 'react-redux';
import { getDataSetByKey } from '../../../services/RedisServices';
import { transposeRowsToColumns } from '../../../services/graphPageServices/GraphServices';
import { bindActionCreators } from 'redux';
import * as componentInstance from '../../../store/Worksheet/SpreadSheet/actions';
import { ipcRenderer } from 'electron';
import { getCell } from '@syncfusion/ej2-react-spreadsheet';
import { summaryInfoAction } from '../../../store/SummaryInfo/actions';
import * as reportOptionsAction from '../../../store/Worksheet/report/actions';

const stackTokens = { childrenGap: 20 };
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
};
// const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 100, right: 0, position: 'inherit' } },
};

const optionsArray: any = [
  {
    onesamplettest: 'One Sample t-test',
  },
  { ttest: 't test' },
  { oneWayAnova: 'One Way ANOVA' },
  { twoWayAnova: 'Two Way ANOVA' },
  { ThreeWayAnova: 'Three Way ANOVA' },
  { oneWayAnCova: 'One Way ANCOVA' },
  { pairedttest: 'Paired t-test' },
  { OneWayRepeatedMeasuresAnova: 'One Way Repeated Measures ANOVA' },
  { OtwoWayRepeatedMeasuresAnova: 'Two Way Repeated Measures ANOVA' },
  { linear: 'Linear' },
  { multipleLinear: 'Multiple Linear' },
  { multipleLogistic: 'Multiple Logistic' },
  { polynomial: 'Polynomial' },
  { forward: 'Forward' },
  { backword: 'Backward' },
];
const OptionsFooter: React.FunctionComponent = (props) => {  
  const [optionsData, setOptionsData] = useState(null);

  const checkSheet = () => {
    var activeSheet = props.referenceObjectState.getActiveSheet();
    var address = activeSheet.usedRange;
    var colIndex = address.colIndex;
    var rowIndex = address.rowIndex;
    var isNotEmpty;
    if (rowIndex > 0 || colIndex > 0) {
      for (let i = 0; i <= rowIndex; i++) {
        for (let j = 0; j <= colIndex; j++) {
          let cell = getCell(i, j, activeSheet); // rowIndex, colIndex, sheetIndex
          if (cell && cell.value && !isNotEmpty) {
            isNotEmpty = true;
            console.log('sheet is Not Empty');
            return false;
            break;
          } else if (i == rowIndex && j == colIndex && !isNotEmpty) {
            console.log('sheet is Empty');
            return true;
          }
        }
        if (isNotEmpty) {
          break;
        }
      }
    } else {
      console.log('sheet is Empty');
      return true;
    }
  };

  const switchToWorksheet = () => {
    let active_item = props.allActiveItem;

    let actvItem = props.activeItems;

    if (active_item.worksheet === null) {
      for (let i = actvItem.length - 1; i >= 0; i--) {
        console.log(actvItem[i].type === ITEM_TYPE.WORKSHEET);

        if (actvItem[i].type === ITEM_TYPE.WORKSHEET) {
          let allActiveItem = {
            notebook: actvItem[i].parentNotebookId,
            section: actvItem[i].parentSectionId,
            worksheet: actvItem[i].id,
            graphPage: {
              id: '',
              object: null,
            },
            report: null,
            selectedItemOnNotebook: actvItem[i].id,
            cursor: actvItem[i].id,
          };
          const newSummary = {
            id: actvItem[i].id,
            type: actvItem[i].type,
            createdDate: actvItem[i].createdDate,
            modifiedDate: actvItem[i].modifiedDate,
            author: actvItem[i].author,
            description: actvItem[i].description,
          };
          props.summaryInfoAction(newSummary);

          props.setAllActiveItem(allActiveItem);

          props.setSelectedPivotItem(actvItem[i].id);

          break;
        }
      }
    }
  };

  const run = async () => {
    if (optionsData === null || optionsData === undefined) {
      alert('The selected test is not valid.');
      return;
    }
    console.log('test name ', optionsData);
    console.log('props', props);
    let checkEmptySpreadsheet = checkSheet();
    console.log(checkEmptySpreadsheet);
    if (checkEmptySpreadsheet === false) {
      switchToWorksheet();
      let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
      let getWorksheetData = [...props.openWorksheets];
      let activeWorksheet = getWorksheetData[0].key;
      let activeClient = getWorksheetData[0].client;
      let gridData = await getDataSetByKey(activeWorksheet, activeClient);
      gridData = transposeRowsToColumns(gridData);
      let rowIndex =
        props.referenceObjectState.getActiveSheet().usedRange.rowIndex;
      let colIndex =
        props.referenceObjectState.getActiveSheet().usedRange.colIndex;
      console.log('row & column in component create', rowIndex, colIndex);
      props.actions.rowIndexUpdate.updateRowIndex({
        message: rowIndex,
      });
      let Data = {
        message: 'Hi',
        someData: "Let's go",
        path: 'analysisTestWizard',
        sheetData: sheetData,
        testOptions: optionsData,
        width: 496,
        height: 480,
        openWorksheet: gridData,
      };
      ipcRenderer.send('request-mainprocess-action', Data);
    } else {
      alert('There is no data in your worksheet');
    }
  };

  useEffect(() => {
    let keyName = null;
    let testName = null;

    setOptionsData(props.testOptionName.testsValue)

  //   optionsArray.forEach((option) => {
  //     console.log(option);
  //     console.log(Object.keys(option));
  //     // if (Object.keys(option)[0] === props.testOptionName.testsKey)
  //     if (Object.keys(option)[0] === props.testOptionName.testsKey) {
  //       keyName = Object.keys(option)[0];
  //       console.log(keyName);
  //       testName = option[keyName];
  //       console.log(testName);
  //       setOptionsData(testName);
  //     }
  //   });
   }, []);

  return (
    <div>
      {/* <Stack horizontal tokens={stackTokens} >
        <Stack {...columnProps} className={`offset1`}>
          <DefaultButton
            text="Run Test"
            className={`text-block`}
            allowDisabledFocus
            onClick={() => {
              props.updateRedis;
              setTimeout(() => {
                run();
                props.actions.reportOptionsAction.isOpenReportOptions({
                  message: false,
                });
              }, 200);
            }}
          />
        </Stack>
        <Stack {...columnProps} className={`offset1`}>
          <DefaultButton
            text="Ok"
            className={`text-block`}
            onClick={props.updateRedis}
            allowDisabledFocus
          />
        </Stack>
        <Stack {...columnProps} className={`offset1`}>
          <DefaultButton
            text="Cancel"
            className={`text-block`}
            onClick={close}
            allowDisabledFocus
          />
        </Stack>
      </Stack> */}
      <Stack
        horizontal
        tokens={stackTokens}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <DefaultButton
          text="Run Test"
          className={`text-block`}
          allowDisabledFocus
          onClick={() => {
            props.updateRedis;

            setTimeout(() => {
              run();

              props.actions.reportOptionsAction.isOpenReportOptions({
                message: false,
              });
            }, 200);
          }}
        />

        <Stack horizontal tokens={horizontalGapStackTokens}>
          <DefaultButton
            text="Ok"
            className={`text-block`}
            onClick={props.updateRedis}
            allowDisabledFocus
          />

          <DefaultButton
            text="Cancel"
            className={`text-block`}
            onClick={props.close}
            allowDisabledFocus
          />
        </Stack>
      </Stack>
    </div>
  );
};

function mapStateToProps(state: any) {
  console.log(state.reportOptionsReducer);
  return {
    testOptionName: state.reportOptionsReducer.selectedOptionType,
    referenceObjectState: state.instanceReducer.instance,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    stateSpreadSheet: state.instanceReducer,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      rowIndexUpdate: bindActionCreators(componentInstance, dispatch),
      reportOptionsAction: bindActionCreators(reportOptionsAction, dispatch),
    },
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsFooter);
