import React from 'react';
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  getColumnHeaderText,
  getIndexesFromAddress,
  getRangeIndexes,
  getCellAddress,
  RangeDirective,
  ColumnsDirective,
  ColumnDirective,
  getColIndex,
  getCell,
} from '@syncfusion/ej2-react-spreadsheet';
import {
  getCellIndexes,
  setCell,
  setColumn,
  setRow,
} from '@syncfusion/ej2-spreadsheet';
import { connect } from 'react-redux';
import * as componentInstance from '../../store/Worksheet/SpreadSheet/actions';
import { summaryInfoAction } from '../../store/SummaryInfo/actions';
import { bindActionCreators } from 'redux';
import Find from './Operation/Find';
import Replace from './Operation/Replace';
import GoTo from './Operation/GoTo';
import Sort from './Operation/Sort';
import FormatCell from './Operation/FormatCell';
import PlotEquation from './Operation/PlotEquation';
import PlotRegression from './Operation/PlotRegression';
// import { summaryInfoAction } from '../../store/SummaryInfo/actions';
import * as formatCellAction from '../../store/Worksheet/FormatCell/actions';
import '/src/app.global.scss';
import {
  updateData,
  initGrid,
  setWorksheetData,
} from './../../services/WorksheetServicesNew';
import { createWorksheet } from './../../services/NotebookManagerServicesNew';
import BulkInsertCol from './Operation/BulkInsertCol';
import BulkInsertRow from './Operation/BulkInsertRow';
import BulkDeleteCol from './Operation/BulkDeleteCol';
import BulkDeleteRow from './Operation/BulkDeleteRow';
import Titles from './Operation/Titles';
import {
  setActiveWorksheet,
  storeWorksheet,
} from '../../store/Worksheet/WorksheetOperation/actions';
import withStyles from 'react-jss';
import { pastingItemIntoNode } from '../../services/NotebookManagerServices/PastingItems';
import { getDataSetByKey } from '../../services/RedisServices';
import { setActionData } from '@syncfusion/ej2-react-spreadsheet';
import ModalCompontent from './Modal/ModalCompontent';
import * as importDBAction from '../../store/Worksheet/ImportDB/actions';
import JDBCConnection from './JDBCConnection';
import OpenImportTable from './OpenImportTable';
import ImportDB from './ImportDB';
import FileImport from './FileImport/FileImport';
import {
  tranformDataToSource,
  getupdatedGridData,
  transformDataSourceTo2DArray,
  getUpdatedGridOnActionComplete,
  calculateSelectedRange,
} from '../../utils/spreadsheet/spreadsheetUtility';
import AnalysisSampleWizard from '../RibbonMenu/Wizard/AnalysisSampleModal';
import AnalysisPowerModal from '../RibbonMenu/Wizard/AnalysisPowerModal';
import {
  getIndexByAlphaSeries,
  getSpreadsheetColumn,
  getActiveSheetDataAsRows,
  updateSpreadSheet,
} from '../../utils/spreadsheet/spreadsheetUtility';
import * as sampleSizeAction from '../../store/Analysis/SampleSize';
import * as powerAction from '../../store/Analysis/Power';
import { showCalculations } from '../../store/Worksheet/Spreadsheet/actions';

import {
  Stack,
  IStackProps,
  IStackStyles,
} from 'office-ui-fabric-react/lib/Stack';
import {
  DefaultButton,
  IDropdownOption,
  IDropdownStyles,
} from 'office-ui-fabric-react';
import GraphicCell from './Cells/GraphicCell';
import * as PatternCheck from './Cells/PatternCheck';
import * as Pattern from './Cells/Pattern';
import * as Line from './Cells/LineConst';
import * as SHAPE from './Cells/Shape';
import * as ColorConst from './Cells/ColorConst';
import * as graphicCellAction from '../../store/Worksheet/GraphicCell/actions';
import * as importfileAction from '../../store/Worksheet/FileImport/actions';
import { calculationNormalize } from '../Worksheet/Normalize';
import { ipcRenderer } from 'electron';
import * as optionsAction from '../../store/MainWindow/Options/actions';
import Advisor from './Operation/Advisor/Advisor';
import { convertMetadata } from './Metadata';
import { setTimeout } from 'timers';
// import { ipcRenderer } from 'electron';
import * as math from 'mathjs';
import { dataService } from '../../utils/globalUtility';
import { Subject, Subscription } from 'rxjs';
import MultipleComparison from '../RibbonMenu/Wizard/TestOptions/MultipleComparison';
import MultipleControl from '../RibbonMenu/Wizard/TestOptions/MultipleControl';
import MultipleControlL2 from '../RibbonMenu/Wizard/TestOptions/MultipleControlL2';
import MultipleControlL3 from '../RibbonMenu/Wizard/TestOptions/MultipleControlL3';

import { setViewDataSecObj } from '../../store/CreateGraph/CreateDiagramPage/actions';
import { storeGraph } from '../../store/Worksheet/WorksheetOperation/actions';
import { renameItem } from './../../services/NotebookManagerServicesNew';
import * as transformAction from '../../store/Analysis/Transform/actions';
import * as replaceAction from '../../store/Worksheet/Replace/actions';

const patternPosList = [
  '@r(',
  '@rb(',
  '@rb(',
  '@g(',
  '@gb(',
  '@gb(',
  '@b(',
  '@bg(',
  '@br(',
];

function splitHeaderText(params: any) {
  if (params) {
    let param = params.split(':');
    let start = param[0].replace(/[0-9]/g, '');
    let end = param[1].replace(/[0-9]/g, '');
    if (start + '1' == param[0]) {
      if (start === end) {
        let data = param[1].replace(end, '');
        if (parseInt(data) > 50) {
          return {
            text: start,
            isHead: true,
          };
        }
      }
    }
    return {
      headerText: '',
      isHead: false,
    };
  }
}

const styles = {
  rootPosition: {},
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const dropdownOptions: IDropdownOption[] = [
  { key: 'Blue', text: 'Blue', data: { icon: 'Checkbox', color: 'Blue' } },
  { key: 'Red', text: 'Red', data: { icon: 'Checkbox', color: 'Red' } },
  {
    key: 'Orange',
    text: 'Orange',
    data: { icon: 'Checkbox', color: 'Orange' },
  },
];

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 150 } },
};
var initialLine = '';

@withStyles(styles)
class Spreadsheet extends React.Component {
  height: number;
  subscriptions: Subscription;
  constructor(props) {
    super(props);
    this.state = {
      // grid: tranformDataToSource(initGrid()),
      activeCell: {
        name: 'select',
        range: 'A1:A1',
      },
      grid: [],
      destinationColumn1: '',
      destinationColumn2: '',
      destinationColumn3: '',
      showTab: false,
    };
    this.height =
      window.innerHeight -
      document.getElementsByClassName('ribbon-tab')[0].clientHeight -
      document.getElementsByClassName('footer-bar')[0].clientHeight -
      document.getElementById('title-bar').clientHeight -
      40;

    this.subscriptions = dataService.getData().subscribe((data: any) => {
      if (data && data.sheetId) {
        this.Oninit();
      }
    });
  }

  componentWillUnmount() {
    this.subscriptions.unsubscribe();
    ipcRenderer.removeAllListeners('sendtoMainWindowSpreadSheet');
    window.removeEventListener('resize', this.updateSize);
    this.props.transformAction.setSelectedRange({
      range: [],
    });
  }

  line(param) {
    if (param) {
      param = param.toLowerCase();
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      let data = Line.Line.filter((a) => a.lineCode == param);
      if (data.length > 0) {
        return data[0].lineSymbol;
      }
    }
  }

  shapes(param) {
    if (param) {
      param = param.toLowerCase();
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      let data = SHAPE.SHAPE.filter((a) => a.shapeCode == param);
      if (data.length > 0) {
        return data[0].shapeSymbol;
      }
    }
  }

  pattern(param) {
    if (param) {
      param = param.toLowerCase();
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      param = param.match(/[,0-9A-Za-z-_ ]+/i)[0];
      let data = Pattern.Pattern.filter((a) => a.patternCode == param);
      if (data.length > 0) {
        return data[0].patternSymbol;
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
    this.Oninit();
    let currentRef = this;
    ipcRenderer.on('sendtoMainWindowSpreadSheet', function (event, Data) {
      currentRef.createDynamicData(Data);
    });
    ipcRenderer.once('openSampleSizeWizards', (event, arg) => {
      this.props.actions.sampleSizeAction.isChiSquareDataAvailable({
        message: arg,
      });
      this.props.actions.sampleSizeAction.isOpenSaChisquare({ message: true });
      ipcRenderer.removeAllListeners('openSampleSizeWizards');
    });
    ipcRenderer.once('openPowerWizards', (event, arg) => {
      this.props.actions.sampleSizeAction.isChiSquareDataAvailable({
        message: arg,
      });
      this.props.actions.powerAction.isOpenPwChisquare({ message: true });
      ipcRenderer.removeAllListeners('openPowerWizards');
    });
    this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
      message: 'disableUndo',
    });
    this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
      message: 'disableRedo',
    });

    // let replaceAction = this.props.actions.replaceAction;
    // window.addEventListener('keydown', function (event) {
    //   if (event.key === 'f'){
    //     console.log("F is pressed")
    //     if (event.ctrlKey && this.spreadsheet){
    //       console.log("CTRL+F is pressed")
    //       replaceAction.isOpenReplace({
    //         message: true,
    //       });
    //     }
    //   }
    // })
  }

  componentDidUpdate(prevProps) {
    window.addEventListener('resize', this.updateSize);
    if (this.props.isViewData) {
      let graphPage =
        this.props.notebooks.allGraphPages.byId[
          this.props.isViewData.graphPageId
        ];
      let newSection =
        this.props.notebooks.allSections.byId[this.props.isViewData.sectionID];
      pastingItemIntoNode(newSection, graphPage, this.props);
      console.log('hello inside spreadsheet inside', graphPage, newSection);
      this.props.actions.setViewDataSecObj('');
    }
    if (
      prevProps.isNotebookManagerDisplay !==
        this.props.isNotebookManagerDisplay ||
      prevProps.isStatusbarDisplay !== this.props.isStatusbarDisplay
    ) {
      this.updateSize();
    }
  }

  updateSize = () => {
    if (this.spreadsheet) {
      this.spreadsheet.height =
        window.innerHeight -
        document.getElementsByClassName('ribbon-tab')[0].clientHeight -
        document.getElementsByClassName('footer-bar')[0].clientHeight -
        document.getElementById('title-bar').clientHeight -
        40;
      this.spreadsheet.resize();
    } else {
      //  console.log("Spreadsheet doesn't exist");
    }
  };

  createDynamicData(Data) {
    var dynamicData = [];
    this.setState({ destinationColumn1: Data.dataformatInfo[3].value });
    this.setState({ destinationColumn2: Data.dataformatInfo[4].value });
    this.setState({ destinationColumn3: Data.dataformatInfo[5].value });
    Data.dataformatInfo.forEach(async (element, index, array) => {
      var columData = getIndexByAlphaSeries(element.value);
      let openedWorksheet = this.props.openWorksheets.filter(
        (item) => item.key == this.props.worksheetKey
      );
      var spreadSheetColumnData = await getSpreadsheetColumn(
        openedWorksheet,
        columData - 1
      );
      dynamicData.push({
        source: element.title,
        column: spreadSheetColumnData,
      });
      if (dynamicData.length === 6) {
        calculationNormalize(
          dynamicData,
          Data.stepWiseValue,
          this.spreadsheet,
          Data.dataformatInfo[3].value,
          Data.dataformatInfo[4].value,
          Data.dataformatInfo[5].value,
          this.props.notebookState
        );
      }
    });
  }

  loopWorksheet = async () => {
    let allSheetData = this.props.importfileState.spreadsheetData;
    let count = this.props.importDBState.countSheet;
    count = count + 1;
    this.props.actions.importDBAction.countSheet({
      message: count,
    });
    if (count > 0) {
      if (count != allSheetData.length && count < allSheetData.length) {
        const element = allSheetData[count];
        let sheetData = [...element.sheetdata];
        let metaData = [...element.metadata];
        sheetData = math.transpose(sheetData);
        if (metaData.length > 0) {
          metaData.map((a) => {
            a.value = a.columnname;
          });
        }
        createWorksheet(this.props, undefined, sheetData, metaData);
      }
      if (count == allSheetData.length || count > allSheetData.length) {
        this.props.actions.importDBAction.countSheet({
          message: 0,
        });
        this.props.actions.importfileAction.spreadsheetUpdate({
          message: [],
        });
      }
    }
  };

  Oninit = async () => {
    let openedWorksheet = this.props.openWorksheets.filter(
      (item) => item.key == this.props.worksheetKey
    );
    if (openedWorksheet.length) {
      let gridData = await getDataSetByKey(
        openedWorksheet[0].key,
        openedWorksheet[0].client
      );
      this.props.actions.isRangeAvailable.updateColumnData({ message: [] });
      let transformGrid = tranformDataToSource(gridData);
      let gridHeadData = await getDataSetByKey(
        'sheetHead' + openedWorksheet[0].key,
        openedWorksheet[0].client
      );
      let reduxHeadData = await getDataSetByKey(
        'reduxHead' + openedWorksheet[0].key,
        openedWorksheet[0].client
      );
      // if(typeof gridHeadData == `object` && gridHeadData !== undefined && gridHeadData !== null){
      //   transformGrid.splice(0,0,{cells: gridHeadData});
      // }
      this.setState({ client: openedWorksheet[0] });
      this.setState({ grid: [...transformGrid] });

      if (this.spreadsheet) {
        // this.spreadsheet.sheets[0].rows = [...transformGrid];
        if (gridHeadData) {
          // this.cellUpdateSheetHead(gridHeadData)
          if (gridHeadData.length > 0) {
            transformGrid.splice(0, 0, { cells: gridHeadData });
            this.spreadsheet.sheets[0].rows = transformGrid;
            this.getColumnHeadList(gridHeadData);
          } else {
            this.spreadsheet.sheets[0].rows = [...transformGrid];
          }
        } else {
          this.spreadsheet.sheets[0].rows = [...transformGrid];
        }
        if (reduxHeadData) {
          if (reduxHeadData.length > 0) {
            this.props.actions.isRangeAvailable.updateColumnData({
              message: reduxHeadData,
            });
          }
        }
      }

      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.line, 'LINE');
          // this.spreadsheet?.addCustomFunction(this.shapes, 'SHAPE');
          // this.spreadsheet?.addCustomFunction(this.pattern, 'PATTERN');
        }
      } catch (error) {
        console.error(error);
      }

      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.shapes, 'SHAPE');
        }
      } catch (error) {
        console.error(error);
      }

      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.pattern, 'PATTERN');
        }
      } catch (error) {
        console.error(error);
      }
      // if(this.spreadsheet){
      //   this.spreadsheet.sheets[0].rows = transformGrid;
      // }
      // setGrid(gridData);
      /* @Teja */
      this.props.actions.setActiveWorksheet(openedWorksheet[0].key);
      /* @Teja */
      // this.spreadsheet?.addCustomFunction(this.line, 'LINE');
      // this.spreadsheet?.addCustomFunction(this.shapes, 'SHAPE');
      // this.spreadsheet?.addCustomFunction(this.pattern, 'PATTERN');
      if (this.props.importDBState.countSheet > 0) {
        this.loopWorksheet();
      }
    } else {
      const clientData = await setWorksheetData(
        initGrid(),
        this.props.worksheetKey
      );

      this.setState({ client: clientData });
      this.props.actions.storeWorksheet(clientData);
      this.props.actions.setActiveWorksheet(clientData.key);
      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.line, 'LINE');
        }
      } catch (error) {
        console.error(error);
      }

      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.shapes, 'SHAPE');
        }
      } catch (error) {
        console.error(error);
      }

      try {
        if (this.spreadsheet) {
          this.spreadsheet?.addCustomFunction(this.pattern, 'PATTERN');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  data2DArray = (gridData) => {
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

  async newData() {
    // console.log(this.spreadsheet, "newDatanewDatanewDatanewDatanewDatanewData")
    if (this.spreadsheet == undefined) {
    } else {
      this.spreadsheet.saveAsJson().then(async (Json) => {
        const new2DGrid = this.data2DArray(this.spreadsheet?.sheets[0].rows);
        const key = await updateData(
          this.state.client.client,
          new2DGrid,
          this.state.client.key
        );
      });
    }

    this.getColumnHeadList();
    let wrkItem =
      this.props.notebooks.allWorksheets.byId[this.props.worksheetKey];
    if (wrkItem.isSaved || wrkItem.isSaved == undefined) {
      wrkItem.isSaved = false;
      renameItem(wrkItem, this.props);
    }
  }

  // sourceChanged() {
  //   this.Oninit();
  // }

  // GridHeadData it's come to intial Load.. don't remove it
  getColumnHeadList = (gridHeadData) => {
    if (this.spreadsheet) {
      if (this.spreadsheet?.sheets[0].rows.length > 0) {
        var colNames = [];
        var sheet = this.spreadsheet.getActiveSheet();
        var lastColumn = this.spreadsheet.getActiveSheet().usedRange.colIndex;
        var lastRow = this.spreadsheet.getActiveSheet().usedRange.rowIndex;
        lastRow =
          lastRow !== -1 && lastRow > 0
            ? lastRow
            : this.spreadsheet?.sheets[0].rows.length;
        var activeColums = [];
        if (lastColumn === 0) {
          if (gridHeadData) {
            lastColumn = gridHeadData.length;
          }
        }
        var header_collections =
          this.spreadsheet.element.getElementsByClassName('e-header-cell');
        for (let i = 0; i <= lastColumn; i++) {
          for (let j = 0; j <= lastRow; j++) {
            let cell = getCell(j, i, this.spreadsheet.getActiveSheet());
            if (cell && cell.value) {
              if (header_collections[i]) {
                let textData = parseInt(header_collections[i].innerText);
                if (isNaN(textData)) {
                  colNames.push({
                    text: header_collections[i].innerText,
                    key: i,
                  });
                  break;
                }
              }
            }
          }
        }
        // console.log([...colNames], "<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>")
        // if(!allRange.includes('@')){
        //   var rangeIdx = getIndexesFromAddress(allRange);
        //   for (var cIdx = rangeIdx[1]; cIdx <= rangeIdx[3] + 1; cIdx++) {
        //     var colName = getColumnHeaderText(cIdx + 1);
        //     colNames.push({ text: colName, key: cIdx });
        //   }
        // }else if(allRange.includes('@')){
        //   var rangeIdx = getIndexesFromAddress("A1:A1");
        //   for (var cIdx = rangeIdx[1]; cIdx <= rangeIdx[3]; cIdx++) {
        //     var colName = getColumnHeaderText(cIdx + 1);
        //     colNames.push({ text: colName, key: cIdx });
        //   }
        // }
        this.onSheetHeadUpdate([...colNames]);
      }
    }
  };

  async onComponentCreated() {
    this.props.actions.findReference.isInstanceAvailable({
      message: this.spreadsheet,
    });
    //   console.log(args);
    //   let rowIndex =this.spreadsheet.getActiveSheet().usedRange.rowIndex;
    //   let colIndex = this.spreadsheet.getActiveSheet().usedRange.colIndex;
    //  // console.log(this.props)

    //  // let index = getRangeIndexes(range);
    //   // for rows iteration
    //   for (let i = 0; i <= rowIndex; i++)
    //     // props.referenceObjectState.setRowHeight(data.height, i, 0);
    //    {
    //    this.spreadsheet.setRowHeight(10 * 2, i);
    //    }
    //   // for column iteration
    //   for (let j = 0; j <= colIndex; j++)
    //     //props.referenceObjectState.setColWidth(data.width, j, 0);
    //     this.spreadsheet.setColWidth(10 * 2, j, 0);
    //   this.spreadsheet.cellFormat(
    //     { fontWeight: 'bold', textAlign: 'center', rowHeight: "70 px", colWidth: "10"},
    //     'A1:F1'
    //   );
    // this.spreadsheet.saveAsJson().then(Json => (this.jsonData = Json));
    // this.newData();
    if (this.spreadsheet) {
      this.spreadsheet.hideRibbonTabs([
        'Insert',
        'View',
        'Data',
        'File',
        'Home',
        'Formulas',
      ]);
      this.spreadsheet.addRibbonTabs([
        {
          header: { text: 'Menu' },
          content: [
            {
              text: 'Show Menu',
              tooltipText: 'Menu',
              click: () => {
                this.showMenus();
              },
            },
            {
              text: 'Hide Menu',
              tooltipText: 'Hide Menu',
              click: () => {
                this.hideMenus();
              },
            },
            {
              text: 'Show/Hide Worksheet Tab',
              tooltipText: 'Menu',
              click: () => {
                this.setState({ showTab: !this.state.showTab });
              },
            },
          ],
        },
      ]);
      //   var col_collection = this.spreadsheet.getActiveSheet().usedRange.colIndex;
      // var header_collection =
      //   this.spreadsheet.element.getElementsByClassName('e-header-cell');
      // for (let i = 0; i < col_collection + 1; i++) {
      //   header_collection[i].innerText = 'Col ' + header_collection[i].innerText;
      // }
    }

    var _this = this;
    this.spreadsheet.element.addEventListener('keydown', function (e) {
      var usedRange = _this.spreadsheet.getActiveSheet().usedRange;
      var rowIndex = usedRange.rowIndex;
      var colIndex = usedRange.colIndex;

      if (e.ctrlKey) {
        let activeCell = _this.spreadsheet.getActiveSheet().activeCell;
        var index = getCellIndexes(activeCell);
        var activeRow = index[0];
        var activeColumn = index[1];
        //  console.log(activeColumn);
        switch (e.key) {
          case 'ArrowLeft':
            _this.spreadsheet.goTo(getCellAddress(activeRow, 0));
            break;
          case 'ArrowRight':
            _this.spreadsheet.goTo(getCellAddress(activeRow, colIndex));
            break;
          case 'ArrowUp':
            _this.spreadsheet.goTo(getCellAddress(0, activeColumn));
            break;
          case 'ArrowDown':
            _this.spreadsheet.goTo(getCellAddress(rowIndex, activeColumn));
            break;
        }
      }
    });
    this.spreadsheet.element.addEventListener('keydown', (e) => {
      if (e.keyCode == 70 && e.ctrlKey) {
        var element = document.getElementsByClassName('e-findtool-dlg')[0];
        // ctrl + f key
        if (element) {
          element.style.display = 'none';
        } // to hide the find tool
        this.props.actions.replaceAction.isOpenReplace({
          message: true,
        });
      }
    });

    let openedWorksheet = this.props.openWorksheets.filter(
      (item) => item.key == this.props.worksheetKey
    );
    if (openedWorksheet.length) {
      let gridHeadData = await getDataSetByKey(
        'sheetHead' + openedWorksheet[0].key,
        openedWorksheet[0].client
      );
      if (gridHeadData) {
        if (gridHeadData.length > 0) {
          this.getColumnHeadList(gridHeadData);
        }
      }
    }
  }

  showMenus = () => {
    this.spreadsheet.hideRibbonTabs(
      ['Insert', 'View', 'Data', 'File', 'Home', 'Formulas'],
      false
    );
  };

  hideMenus = () => {
    this.spreadsheet.hideRibbonTabs(
      ['Insert', 'View', 'Data', 'File', 'Home', 'Formulas'],
      true
    );
  };

  sendData = async (data) => {
    //console.clear();
    // console.log(data, 'send Data');
    const newdata = [...data];
    for (let i = 0; i < newdata.length; i++) {
      newdata[i] = data[i].cells;
    }
    //  console.log(newdata);
    const key = await updateData(
      this.state.client.client,
      newdata,
      this.state.client.key
    );
    // console.log(data);
    // console.log(key);

    if (key) {
      // setGrid(data);
      this.setState({ newdata });
    }
  };

  onSheetHeadUpdate = async (param) => {
    const key = await updateData(
      this.state.client.client,
      param,
      'reduxHead' + this.state.client.key
    );
    this.props.actions.isRangeAvailable.updateColumnData({
      message: [...param],
    });
  };

  onSelect(args) {
    // var actCellIdx = getRangeIndexes(args.range);
    // this.spreadsheet.freezePanes(actCellIdx[0],actCellIdx[1]);

    calculateSelectedRange(
      this.spreadsheet,
      args,
      this.props.actions.showCalculations
    );
    // console.log(this.spreadsheet);
    let range = args;
    this.setState({ activeCell: range });
    let headerData = splitHeaderText(args.range);
    this.props.transformAction.setSelectedRange({
      range: getIndexesFromAddress(args.range),
    });
    if (this.props.transformState.isOpenQuickTransform) {
      dataService.sendData({
        isHead: headerData.isHead,
        range: getIndexesFromAddress(args.range),
      });
    }
    if (headerData.isHead) {
      let headidx = getIndexesFromAddress(args.range);
      headerData.idx = headidx[1];
      headerData.key = headidx[1];
      //  console.log("here")
      //  console.log(headerData)
      ipcRenderer.send('sendChildHeadData', headerData);
      ipcRenderer.removeAllListeners('sendChildHeadData');
    }
    // this.spreadsheet.conditionalFormat({ format: 'General', style: {borderTop: '1px solid #333'}, range: 'A2:B9' });
    // console.log(args.range);
    //console.log('Inside onSelect method', this.spreadsheet)
    // this.spreadsheet.autoFit(args.range);

    this.props.actions.isRangeAvailable.isRangeAvailable({ message: range });
    this.getColumnHeadList();
    // this.newData();
  }

  cellUpdateSheet = async (param, _2Data, idx) => {
    if (this.state.activeCell.range.includes(':')) {
      let range = this.state.activeCell.range.split(':');
      // var selectedcol = getColIndex(range[0].match(/[A-Z]+/i)[0].toUpperCase())
      // var selectedrow = ( (range[0].replace(/[^0-9]/g,'')) - 1 );
      // var _2Data = param;

      var sheet = this.spreadsheet.getActiveSheet();
      let sheetIndex = this.spreadsheet.activeSheetIndex;
      var usedRange = this.spreadsheet?.sheets[0].usedRange;
      // var address = getCellAddress(usedRange.rowIndex, usedRange.colIndex);
      let activeCell = sheet.activeCell;
      var rowno = range[0].match(/[0-9]+/i)[0];
      if (rowno == 1) {
        activeCell = activeCell.replace('1', '2');
      }
      // console.log(activeCell)
      param = math.transpose(param);
      // let heading = [];
      // for (let i = 0; i < _2Data.length; i++) {
      //   heading.push({ value: _2Data[i].columnname });
      // }

      //param.splice(0, 0, heading);

      this.cellUpdateSheetHead(_2Data);
      if (_2Data) {
        _2Data = _2Data.map((a) => {
          if (a) if (a.hasOwnProperty('columnname')) a.value = a.columnname;

          return a;
        });
        const key = await updateData(
          this.state.client.client,
          _2Data,
          'sheetHead' + this.state.client.key
        );
      }
      this.spreadsheet.sheets[sheetIndex].ranges[0].startCell = activeCell;

      this.spreadsheet.sheets[sheetIndex].ranges[0].dataSource = param;

      this.spreadsheet.saveAsJson().then(async (Json) => {
        const key = await updateData(
          this.state.client.client,
          param,
          this.state.client.key
        ).then(() => {
          this.loopWorksheet();
        });

        this.getColumnHeadList();
      });
    }
  };

  cellUpdateSheetHead = async (param) => {
    if (this.state.activeCell.range.includes(':')) {
      let range = this.state.activeCell.range.split(':');
      var _2Data = param;
      var headRow = range[0].replace(/[^0-9]/g, '') - 1;
      var selectCol = getColIndex(range[0].match(/[A-Z]+/i)[0].toUpperCase());
      for (let i = 0; i < _2Data.length; i++) {
        var address = getCellAddress(0, selectCol);
        this.spreadsheet.updateCell({ value: _2Data[i].columnname }, address);
        // this.spreadsheet.cellFormat({ fontWeight: 600}, address);
        selectCol = selectCol + 1;
        headRow = headRow + 1;
      }
      const key = await updateData(
        this.state.client.client,
        param,
        'sheetHead' + this.state.client.key
      );
    }
  };

  addZeroes(num: any) {
    let val = '';
    while (num != 0) {
      val = val + '0';
      num--;
    }
    return val;
  }

  // queryCellInfo(args) {
  //   console.log(this.props.optionsState)
  //   console.log(args)
  //   let fontStyle = this.props.optionsState.optionsCollection.Worksheet.appearance.font.style;
  //   let fontSize = this.props.optionsState.optionsCollection.Worksheet.appearance.font.size;
  //   let numberSetting = this.props.optionsState.optionsCollection.Worksheet.numeric;
  //   let decimalZeroes = this.addZeroes(this.props.optionsState.optionsCollection.Worksheet.numeric.decimalPlaces);
  //   let rowHeight = this.props.optionsState.optionsCollection.Worksheet.appearance.rowHeight;
  //   let colWidth = this.props.optionsState.optionsCollection.Worksheet.appearance.colWidth;

  //   let sheet = this.spreadsheet.getActiveSheet();

  //   if (numberSetting.displayAs.includes("E Notation Always") || numberSetting.engineeringNotation === true)
  //   {
  //     setCell(args.rowIndex, args.colIndex, sheet, { format: '0.00E+00', style: { fontFamily: fontStyle, fontSize: fontSize+'pt', } }, true);
  //   }

  //   else if (numberSetting.displayAs.includes("E Notation When Needed") || numberSetting.displayAs.includes("Fixed Decimal")) {
  //     decimalZeroes = '0.' + decimalZeroes;
  //     console.log(decimalZeroes);
  //     setCell(args.rowIndex, args.colIndex, sheet, { format: decimalZeroes, style: { fontFamily: fontStyle, fontSize: fontSize+'pt'} }, true);
  //   }

  //   else {
  //     setCell(args.rowIndex, args.colIndex, sheet, { format: 'General', style: { fontFamily: fontStyle, fontSize: fontSize+'pt'} }, true);
  //   }

  //   console.log("Column Width, Row Height, sheet ID", colWidth, rowHeight, sheet.id)
  //   setColumn(sheet, args.colIndex, { width: Number(colWidth), customWidth: true });
  //   setRow(sheet, args.rowIndex, { height: Number(rowHeight), customHeight: true });
  //   //this.spreadsheet.resize();
  // }

  updateStateRedux = (spridx) => {
    // if (this.props.graphicCellState.isOpenGraphicCell)
    if (this.props && this.spreadsheet) {
      let graphCellInfo = this.props.graphicCellState.graphCellInfo;
      let param = this.state.activeCell.range.split(':');
      let startltr = param[0].replace(/[0-9]/g, '');
      let startno = param[1].replace(/[A-Za-z]/g, '');
      let cell = startltr + (parseInt(startno) + 1);
      let grapData = {};
      if (graphCellInfo.hasOwnProperty('backgroundColor')) {
        this.spreadsheet.updateCell(
          { value: graphCellInfo.value },
          this.state.activeCell.range
        );
        this.spreadsheet.cellFormat(
          {
            backgroundColor: graphCellInfo.backgroundColor,
            color: 'rgba(255,255,255,0)',
          },
          this.state.activeCell.range
        );
        this.spreadsheet.selectRange(cell);
        // this.props.referenceObjectState.actionComplete();
        this.props.actions.graphicCellAction.GraphicCellUpdate({ message: {} });
        if (this.updateGraphicPlot(graphCellInfo).status) {
          this.updateRexGrapPlot(graphCellInfo, cell);
        }
        var sheet = this.spreadsheet.getActiveSheet();
        let data = this.state.activeCell;
        data.range = cell + ':' + cell;
        this.setState({ activeCell: data });
        this.newData();
      }

      let graphCellInforgb = this.props.graphicCellState.graphCellrgbInfo;
      let cellrgb = graphCellInforgb.cellvalue;
      let Range = `${cellrgb}:${cellrgb}`;
      if (graphCellInforgb.hasOwnProperty('backgroundColor')) {
        this.spreadsheet.updateCell({ value: graphCellInforgb.value }, Range);
        this.spreadsheet.cellFormat(
          {
            backgroundColor: graphCellInforgb.backgroundColor,
            color: 'rgba(255,255,255,0)',
          },
          Range
        );
        this.spreadsheet.selectRange(cellrgb);
        this.props.actions.graphicCellAction.GraphicCellRGBUpdate({
          message: {},
        });

        // this.props.referenceObjectState.actionComplete();
        if (this.updateGraphicPlot(graphCellInforgb).status) {
          this.updateRexGrapPlot(graphCellInforgb, cellrgb);
        }
        var sheet = this.spreadsheet.getActiveSheet();
        let data = this.state.activeCell;
        data.range = cellrgb + ':' + cellrgb;
        this.setState({ activeCell: data });
        this.newData();
      }

      if (graphCellInfo.hasOwnProperty('lineCode')) {
        grapData.value = '=LINE("' + graphCellInfo.lineCode + '")';
        this.spreadsheet.updateCell(
          { value: graphCellInfo.lineSymbol },
          this.state.activeCell.range
        );
        this.spreadsheet.updateCell(
          { formula: grapData.value },
          this.state.activeCell.range
        );
        this.spreadsheet.cellFormat(
          {
            backgroundColor: '',
            color: '',
          },
          this.state.activeCell.range
        );
        this.spreadsheet.selectRange(cell);
        // this.props.referenceObjectState.actionComplete();
        this.props.actions.graphicCellAction.GraphicCellUpdate({ message: {} });

        if (this.updateGraphicPlot(grapData).status) {
          this.updateRexGrapPlot(grapData, cell);
        }
        var sheet = this.spreadsheet.getActiveSheet();
        let data = this.state.activeCell;
        data.range = sheet.activeCell + ':' + sheet.activeCell;
        this.setState({ activeCell: data });
        this.newData();
      }
      if (graphCellInfo.hasOwnProperty('shapeCode')) {
        grapData.value = '=SHAPE("' + graphCellInfo.shapeCode + '")';
        this.spreadsheet.updateCell(
          { value: graphCellInfo.shapeSymbol },
          this.state.activeCell.range
        );
        this.spreadsheet.updateCell(
          { formula: '=SHAPE("' + graphCellInfo.shapeCode + '")' },
          this.state.activeCell.range
        );
        this.spreadsheet.cellFormat(
          {
            backgroundColor: '',
            color: '',
          },
          this.state.activeCell.range
        );
        // this.props.referenceObjectState.actionComplete();
        this.spreadsheet.selectRange(cell);
        // this.props.referenceObjectState.actionComplete();
        this.props.actions.graphicCellAction.GraphicCellUpdate({ message: {} });

        if (this.updateGraphicPlot(grapData).status) {
          this.updateRexGrapPlot(grapData, cell);
        }
        var sheet = this.spreadsheet.getActiveSheet();
        let data = this.state.activeCell;
        data.range = sheet.activeCell + ':' + sheet.activeCell;
        this.setState({ activeCell: data });
        this.newData();
      }

      if (graphCellInfo.hasOwnProperty('patternCode')) {
        grapData.value = '=PATTERN("' + graphCellInfo.patternCode + '")';
        this.spreadsheet.updateCell(
          { value: graphCellInfo.patternSymbol },
          this.state.activeCell.range
        );
        this.spreadsheet.updateCell(
          { formula: '=PATTERN("' + graphCellInfo.patternCode + '")' },
          this.state.activeCell.range
        );
        this.spreadsheet.cellFormat(
          {
            backgroundColor: '',
            color: '',
          },
          this.state.activeCell.range
        );
        // this.props.referenceObjectState.actionComplete();
        this.spreadsheet.selectRange(cell);
        // this.props.referenceObjectState.actionComplete();
        this.props.actions.graphicCellAction.GraphicCellUpdate({ message: {} });

        if (this.updateGraphicPlot(grapData).status) {
          this.updateRexGrapPlot(grapData, cell);
        }
        var sheet = this.spreadsheet.getActiveSheet();
        let data = this.state.activeCell;
        data.range = sheet.activeCell + ':' + sheet.activeCell;
        this.setState({ activeCell: data });
        this.newData();
      }
      if (this.props.importDBState.isUpdateSheet) {
        this.props.actions.importDBAction.isUpdateSheet({ message: false });
        // let grid = [...this.state.grid];
        // let selection = this.state.activeCell;
        if (this.props.importDBState.dataSheet) {
          let sheetData = [...this.props.importDBState.dataSheet[0].sheetdata];
          let metaData = [...this.props.importDBState.dataSheet[0].metadata];
          // if(metaData!==undefined&&metaData!==null&&metaData!==""){
          //   this.cellUpdateSheetHead(metaData);
          // }
          if (
            sheetData !== undefined &&
            sheetData !== null &&
            sheetData !== ''
          ) {
            this.cellUpdateSheet(sheetData, metaData);
          }
        }
      }
      if (
        this.props.importfileState.isOpenSpreadsheet &&
        this.props.importfileState.spreadsheetData.length > 0
      ) {
        // this.props.actions.importfileAction.isOpenSpreadsheet({message: false});
        // let sheetData = [...this.props.importfileState.spreadsheetData[0].sheetdata];
        //   let metaData = [...this.props.importfileState.spreadsheetData[0].metadata];
        //   if(metaData!==undefined&&metaData!==null&&metaData!==""){
        //     this.cellUpdateSheetHead(metaData);
        //   }
        //   if(sheetData!==undefined&&sheetData!==null&&sheetData!==""){
        //   this.cellUpdateSheet(sheetData, metaData);
        //   }

        // this.props.actions.importfileAction.spreadsheetUpdate({message: []});
        this.props.actions.importfileAction.isOpenSpreadsheet({
          message: false,
        });
        let AllSheetData = this.props.importfileState.spreadsheetData;
        // for (let i = 0; i < AllSheetData.length; i++) {
        // spridx = 0;
        spridx = spridx ? spridx : 0;
        const element = AllSheetData[spridx];
        let sheetData = [...element.sheetdata];
        let metaData = [...element.metadata];
        if (sheetData !== undefined && sheetData !== null && sheetData !== '') {
          // this.cellUpdateSheetHead(metaData, spridx);
          this.cellUpdateSheet(sheetData, metaData, spridx);
        }
        // if(metaData!==undefined&&metaData!==null&&metaData!==""){
        //   this.cellUpdateSheetHead(metaData, spridx);
        // }
        // }
        // this.props.actions.importfileAction.spreadsheetUpdate({ message: [] });
      }
      if (
        this.props.importfileState.isOpenImportText &&
        this.props.importfileState.importText.length > 0
      ) {
        // this.cellUpdateSheet(this.props.importfileState.importText[0].sheetdata);
        let sheetData = [...this.props.importfileState.importText[0].sheetdata];
        let metaData = [...this.props.importfileState.importText[0].metadata];
        // if(metaData!==undefined&&metaData!==null&&metaData!==""){
        //   this.cellUpdateSheetHead(metaData);
        // }
        if (sheetData !== undefined && sheetData !== null && sheetData !== '') {
          this.cellUpdateSheet(sheetData, metaData);
        }

        this.props.actions.importfileAction.importTextUpdate({ message: [] });
        this.props.actions.importfileAction.isOpenImportText({
          message: false,
        });
      }
      if (
        this.props.importfileState.isOpenFieldSelection &&
        this.props.importfileState.fieldSelection.length > 0
      ) {
        // this.cellUpdateSheet(this.props.importfileState.importText[0].sheetdata);
        let sheetData = [
          ...this.props.importfileState.fieldSelection[0].sheetdata,
        ];
        let metaData = [
          ...this.props.importfileState.fieldSelection[0].metadata,
        ];
        // if(metaData!==undefined&&metaData!==null&&metaData!==""){
        //   this.cellUpdateSheetHead(metaData);
        // }
        if (sheetData !== undefined && sheetData !== null && sheetData !== '') {
          this.cellUpdateSheet(sheetData, metaData);
        }
        this.props.actions.importfileAction.fieldSelectionUpdate({
          message: [],
        });
        this.props.actions.importfileAction.isOpenFieldSelection({
          message: false,
        });
      }
    }
    // this.getColumnHeadList();
  };

  updateGraphicPlot = (cell) => {
    let data = {
      rgb: false,
      pattern: false,
      line: false,
      shape: false,
      status: false,
    };
    if (cell) {
      if (cell.hasOwnProperty('value')) {
        let getVal = cell.value;
        if (getVal) {
          getVal = getVal.toUpperCase();
          if (getVal.startsWith('@RGB')) {
            return { ...data, ...{ rgb: true, status: true } };
          }
          if (getVal.startsWith('=PATTERN')) {
            return { ...data, ...{ pattern: true, status: true } };
          }
          if (getVal.startsWith('=LINE')) {
            return { ...data, ...{ line: true, status: true } };
          }
          if (getVal.startsWith('=SHAPE')) {
            return { ...data, ...{ shape: true, status: true } };
          }
        }
      }
    }
    return data;
  };

  dataforPlot = (getType, data, currWorksheet, colIdx) => {
    // if(data==undefined||data==null||data==''||Object.keys(data).length==0){
    //   data =  {clrColIdx: [], ptrColIdx: [], shpColIdx: [], lnColIdx: [] }
    // }
    if (getType.rgb == true) {
      //  console.log(data, data[currWorksheet].clrColIdx);
      if (data[currWorksheet].clrColIdx.length > 0) {
        if (!data[currWorksheet].clrColIdx.includes(colIdx)) {
          data[currWorksheet].clrColIdx.push(colIdx);
        }
      } else {
        data[currWorksheet].clrColIdx.push(colIdx);
      }
    }
    if (getType.pattern == true) {
      if (data[currWorksheet].ptrColIdx.length > 0) {
        if (!data[currWorksheet].ptrColIdx.includes(colIdx)) {
          data[currWorksheet].ptrColIdx.push(colIdx);
        }
      } else {
        data[currWorksheet].ptrColIdx.push(colIdx);
      }
    }
    if (getType.line == true) {
      if (data[currWorksheet].lnColIdx.length > 0) {
        if (!data[currWorksheet].lnColIdx.includes(colIdx)) {
          data[currWorksheet].lnColIdx.push(colIdx);
        }
      } else {
        data[currWorksheet].lnColIdx.push(colIdx);
      }
    }
    if (getType.shape == true) {
      if (data[currWorksheet].shpColIdx.length > 0) {
        if (!data[currWorksheet].shpColIdx.includes(colIdx)) {
          data[currWorksheet].shpColIdx.push(colIdx);
        }
      } else {
        data[currWorksheet].shpColIdx.push(colIdx);
      }
    }
    let result = this.props.graphicCellState.graphCellPlot;
    result[currWorksheet] = data[currWorksheet];
    this.props.actions.graphicCellAction.GraphicCellPlotUpdate({
      message: result,
    });
    //  console.log(this.props.graphicCellState.graphCellPlot);
  };

  updateRexGrapPlot = (cell, address) => {
    let colIdx = -1;
    // Address is C1:C1, D1:C3
    if (address) {
      let Idx = getIndexesFromAddress(address);
      colIdx = Idx[1];
    }
    if (colIdx !== -1) {
      let keys = Object.keys(this.props.graphicCellState.graphCellPlot);
      let currWorksheet = this.props.allActiveItem.worksheet;
      let data = this.props.graphicCellState.graphCellPlot;
      let getType = this.updateGraphicPlot(cell);
      if (keys.includes(currWorksheet)) {
        data = this.props.graphicCellState.graphCellPlot;
        this.dataforPlot(getType, data, currWorksheet, colIdx);
      } else {
        data = {
          [currWorksheet]: {
            clrColIdx: [],
            ptrColIdx: [],
            shpColIdx: [],
            lnColIdx: [],
          },
        };
        this.dataforPlot(getType, data, currWorksheet, colIdx);
      }
    }
  };

  async cellOnChange(cell) {
    // if(cell){
    // if(cell.address){
    //   if(cell.address.includes('!')){
    //     const [sheet, address] = cell.address.split('!');
    //     this.spreadsheet.updateCell({ value: cell.value}, address);
    //     // this.newData();
    //     // const newdata = transformDataSourceTo2DArray(this.state.grid)
    //     // const changedGridData = getupdatedGridData(cell.value, address, newdata);
    //     // // console.log(changedGridData , 'after cell changed')
    //     // const key = await updateData(
    //     //   this.state.client.client,
    //     //   changedGridData,
    //     //   this.state.client.key
    //     // );
    //   }
    // }
    // }
    let rowIndex = this.spreadsheet.getActiveSheet().usedRange.rowIndex;
    // let colIndex = this.spreadsheet.getActiveSheet().usedRange.colIndex;
    //console.log('row & column', rowIndex, colIndex)
    if (rowIndex !== -1) {
      this.props.actions.rowIndexUpdate.updateRowIndex({
        message: rowIndex,
      });
    }
    // console.log("near undo and redo")
    // console.log(this.spreadsheet.undoredoModule)
    // console.log(this.spreadsheet.undoredoModule.undoCollection.length !== 0)
    if (this.spreadsheet.undoredoModule.undoCollection.length > 0) {
      this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
        message: 'enableUndo',
      });
    } else {
      this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
        message: 'disableUndo',
      });
    }
    if (this.spreadsheet.undoredoModule.redoCollection.length > 0) {
      this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
        message: 'enableUndo',
      });
    } else {
      this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
        message: 'disableUndo',
      });
    }
    // if (this.spreadsheet.undoredoModule.undoCollection.length !== 0) {
    //   // console.log("inside if");
    //   this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
    //     message: "enableUndo",
    //   });
    // } else {
    //   // console.log("inside else");
    //   this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
    //     message: "disableUndo",
    //   });
    // }
    // if (this.spreadsheet.undoredoModule.redoCollection.length !== 0) {
    //   // console.log("inside redo collection")
    //   this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
    //     message: "enableUndo",
    //   });
    // } else {
    //   this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
    //     message: "disableUndo",
    //   });
    // }
    // if (this.spreadsheet.undoredoModule.undoCollection.length !== 0) {
    //   this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
    //     message: "enableUndo",
    //   });
    // } else {
    //   this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
    //     message: "disableUndo",
    //   });
    // }
    // if (this.spreadsheet.undoredoModule.redoCollection.length !== 0) {
    //   this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
    //     message: "enableRedo",
    //   });
    // } else {
    //   this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
    //     message: "disableRedo",
    //   });
    // }
  }

  isPattern = (param) => {
    if (param) {
      if (patternPosList.includes(param)) {
        return true;
      }
    }
  };

  cellSave = (param) => {
    let value = param.value;
    console.log('value here', param.value);
    // console.log(value, typeof value,  "inside spreadsheet")
    if (value !== '' && value !== null && typeof value === 'string') {
      if (value.includes('@rgb')) {
        let data = ColorConst.color.filter((a) => a.value == value);
        if (data.length > 0) {
          this.spreadsheet.cellFormat(
            {
              backgroundColor: data[0].backgroundColor,
              color: 'rgba(255,255,255,0)',
            },
            this.state.activeCell.range
          );
          this.spreadsheet.updateCell(
            { value: value },
            this.state.activeCell.range
          );
        } else {
          this.spreadsheet.cellFormat(
            {
              backgroundColor: value.replace('@', ''),
              color: 'rgba(255,255,255,0)',
            },
            this.state.activeCell.range
          );
          this.spreadsheet.updateCell(
            { value: value },
            this.state.activeCell.range
          );
        }
      }
      if (!value.includes('@rgb')) {
        this.spreadsheet.cellFormat(
          {
            backgroundColor: '',
            color: '',
          },
          this.state.activeCell.range
        );
        this.spreadsheet.updateCell(
          { value: value },
          this.state.activeCell.range
        );
      }
      if (this.isPattern(value)) {
        this.spreadsheet.updateCell(
          { formula: '', value: '' },
          this.state.activeCell.range
        );
        this.spreadsheet.cellFormat(
          {
            backgroundColor: '',
            color: '',
          },
          this.state.activeCell.range
        );
      }
    }
  };

  showTab = () => {
    this.setState({ showTab: !this.state.showTab });
  };

  render() {
    this.updateStateRedux();
    return (
      <>
        <div className="spreadsheetComponent">
          <SpreadsheetComponent
            id="spreadsheet"
            created={this.onComponentCreated.bind(this)}
            select={this.onSelect.bind(this)}
            ref={(ssObj) => {
              this.spreadsheet = ssObj;
            }}
            showRibbon={true}
            cellEditing={this.cellOnChange.bind(this)}
            //dataSourceChanged={this.sourceChanged.bind(this)}
            // cellEdit = {this.newData.bind(this) }
            cellSave={this.cellSave.bind(this)}
            showFormulaBar={true}
            showSheetTabs={this.state.showTab}
            allowDataValidation={true}
            // contextMenuBeforeOpen={this.oncreated.bind(this)}
            actionComplete={this.newData.bind(this)}
            //queryCellInfo={this.queryCellInfo.bind(this)}
            sheets={[
              {
                ranges: [{ dataSource: [], showFieldAsHeader: false }],
                rows: [],
              },
            ]}
            height={this.height}
            // saveComplete={this.getColumnHeadList()}
          ></SpreadsheetComponent>
        </div>

        <Find isOpen={this.props.isOpenFind} />
        <Replace isOpen={this.props.isOpenReplace} />
        <GoTo isOpen={this.props.isOpenGoto} />
        <Sort isOpen={this.props.isOpenSort} />
        <FormatCell isOpen={this.props.formatCellState.isOpenFormatCell} />
        <Advisor />
        <PlotEquation isOpen={this.props.formatCellState.isOpenPlotEquation} />
        <PlotRegression
          isOpen={this.props.formatCellState.isOpenPlotRegression}
        />
        {this.props.insertState.isOpenInsRow && (
          <BulkInsertRow isOpen={this.props.insertState.isOpenInsRow} />
        )}

        {this.props.deleteState.isOpenDelRow && (
          <BulkDeleteRow isOpen={this.props.deleteState.isOpenDelRow} />
        )}

        {this.props.insertState.isOpenInsCol && (
          <BulkInsertCol isOpen={this.props.insertState.isOpenInsCol} />
        )}

        {this.props.deleteState.isOpenDelCol && (
          <BulkDeleteCol
            isOpen={this.props.deleteState.isOpenDelCol}
            deleteBulkCol={(param: Object) => this.deleteBulkCol(param)}
          />
        )}

        {this.props.titlesState.isOpenTitles && (
          <Titles isOpen={this.props.titlesState.isOpenTitles} />
        )}
        {this.props.sampleSizeState.isOpenSaTtest && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaTtest}
            title="t-test"
            label1="Expected Difference in Means"
            label2="Expected Standard Deviation"
            label3="Desired Power"
            label4="Alpha"
          />
        )}
        {this.props.sampleSizeState.isOpenSaPairedTtest && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaPairedTtest}
            title="Paired t-test"
            label1="Change to be Detected"
            label2="Expected Standard Deviation of Change"
            label3="Desired Power"
            label4="Alpha"
          />
        )}
        {this.props.sampleSizeState.isOpenSaProportions && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaProportions}
            title="Proportions"
            label1="Group 1 Proportion"
            label2="Group 2 Proportions"
            label3="Desired Power"
            label4="Alpha"
          />
        )}
        {this.props.sampleSizeState.isOpenSaAnova && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaAnova}
            title="Anova"
            label1="Minimum Detectable Difference in Means"
            label2="Expected Standard Deviation of Residuals"
            label3="Desired Power"
            label4="Alpha"
          />
        )}
        {this.props.sampleSizeState.isOpenSaChisquare && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaChisquare}
            title="Chi-square"
            label1=""
            label2=""
            label3="Desired Power"
            label4="Alpha"
          />
        )}
        {this.props.sampleSizeState.isOpenSaCorrelation && (
          <AnalysisSampleWizard
            isOpen={this.props.sampleSizeState.isOpenSaCorrelation}
            title="Correlation"
            label1="Correlation Cofficient"
            label2=""
            label3="Desired Power"
            label4="Alpha"
          />
        )}

        {this.props.powerState.isOpenPwTtest && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwTtest}
            title="t-test"
            label1="Expected Difference in Means"
            label2="Expected Standard Deviation"
            label3="Group 1 Size"
            label4="Group 2 Size"
            label5="Alpha"
          />
        )}
        {this.props.powerState.isOpenPwPairedTtest && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwPairedTtest}
            title="Paired t-test"
            label1="Change to be Detected"
            label2="Expected Standard Deviation of Change"
            label3="Desired Sample Size"
            labe4=""
            label5="Alpha"
          />
        )}
        {this.props.powerState.isOpenPwProportions && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwProportions}
            title="Proportions"
            label1="Expected Group 1 Proportion"
            label2="Expected Group 2 Proportion"
            label3="Group 1 Size"
            label4="Group 2 Size"
            label5="Alpha"
          />
        )}
        {this.props.powerState.isOpenPwAnova && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwAnova}
            title="Anova"
            label1="Minimum Detectable Difference in Means"
            label2="Expected Standard Deviation of Residuals"
            label3="Number of Groups"
            label4="Group Size"
            label5="Alpha"
          />
        )}
        {this.props.powerState.isOpenPwChisquare && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwChisquare}
            title="Chi-square"
            label1=""
            label2=""
            label3="Desired Sample Size"
            label4=""
            label5="Alpha"
          />
        )}
        {this.props.powerState.isOpenPwCorrelation && (
          <AnalysisPowerModal
            isOpen={this.props.powerState.isOpenPwCorrelation}
            title="Correlation"
            label1="Correlation Cofficient"
            label2="Desired Sample Size"
            label3=""
            label4=""
            label5="Alpha"
          />
        )}

        {this.props.importDBState.isOpenImportDB && (
          <ImportDB isOpen={this.props.importDBState.isOpenImportDB} />
        )}

        {this.props.importDBState.isODBCOption && (
          <ModalCompontent
            close={() =>
              this.props.actions.importDBAction.isOpenODBCOption({
                message: false,
              })
            }
            component={
              <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenImportDB({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN"
                  />
                </Stack>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN Less"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenODBCConnStr({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN Less"
                  />
                </Stack>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN File Setting"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenODBCConnPath({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN File Setting"
                  />
                </Stack>
              </Stack>
            }
            title={'ODBC Option'}
          ></ModalCompontent>
        )}
        {/* 
        {this.props.importDBState.isODBCOption && (
          <ModalCompontent
            close={() =>
              this.props.actions.importDBAction.isOpenODBCOption({
                message: false,
              })
            }
            component={
              <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenImportDB({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN"
                  />
                </Stack>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN Less"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenODBCConnStr({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN Less"
                  />
                </Stack>
                <Stack {...columnProps}>
                  <DefaultButton
                    secondaryText="DSN File Setting"
                    onClick={() => {
                      this.props.actions.importDBAction.isOpenODBCConnPath({
                        message: true,
                      });
                      this.props.actions.importDBAction.isOpenODBCOption({
                        message: false,
                      });
                    }}
                    className={`text-block`}
                    text="DSN File Setting"
                  />
                </Stack>
              </Stack>
            }
            title={'ODBC Option'}
          ></ModalCompontent>
        )} */}

        {this.props.importDBState.isOpenImportTable && (
          <ModalCompontent
            close={() =>
              this.props.actions.importDBAction.isOpenImportTable({
                message: false,
              })
            }
            component={<OpenImportTable />}
            title={`${
              this.props.importDBState.recentConn + ' Import - Data Source 1'
            }`}
            isDraggable={false}
            isModeless={false}
            keepInBounds={false}
            isBlocking={true}
          ></ModalCompontent>
        )}

        {this.props.importDBState.isOpenJDBCConn && (
          <ModalCompontent
            close={() =>
              this.props.actions.importDBAction.isOpenJDBCConn({
                message: false,
              })
            }
            component={<JDBCConnection />}
            title={'JDBC Configuration'}
            isDraggable={false}
            isModeless={false}
            keepInBounds={false}
            isBlocking={true}
          ></ModalCompontent>
        )}

        {this.props.graphicCellState.isOpenGraphicCell && (
          <ModalCompontent
            close={() => {
              this.props.actions.graphicCellAction.GraphicCellUpdate({
                message: {},
              });
              this.props.actions.graphicCellAction.isOpenGraphicCell({
                message: false,
              });
            }}
            component={<GraphicCell />}
            title={'Insert Graphic Cells'}
            isDraggable={true}
            isModeless={true}
            keepInBounds={true}
            isBlocking={false}
          ></ModalCompontent>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    referenceObjectSpreadSheet: state.instanceReducer.isOpenFind,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    isOpenReplace: state.replaceReducer.isOpenReplace,
    isOpenFind: state.findReducer.isOpenFind,
    isOpenGoto: state.gotoReducer.isOpenGoto,
    isOpenSort: state.sortReducer.isOpenSort,
    formatCellState: state.formatCellReducer,
    insertState: state.insertReducer,
    importDBState: state.importDBReducer,
    deleteState: state.deleteReducer,
    titlesState: state.titlesReducer,
    sampleSizeState: state.sampleSizeReducer,
    powerState: state.powerReducer,
    graphicCellState: state.graphicCellReducer,
    importfileState: state.ImportfileReducer,
    auditingState: state.auditingReducer,
    optionsState: state.optionsReducer,
    notebookState: state.notebookReducer,
    referenceObjectState: state.instanceReducer.instance,
    transformState: state.transformReducer,
    allActiveItem: state.notebookReducer.allActiveItem,
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allNotebookId: state.notebookReducer.allNotebookId,
    isViewData: state.createDiagramPageReducer.isViewData,
    isOpenAdvisor: state.advisorReducer.isOpenAdvisor,
    isNotebookManagerDisplay: state.mainWindowReducer.isNotebookManagerDisplay,
    isStatusbarDisplay: state.mainWindowReducer.isStatusbarDisplay,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    addGraphPage: (item) => {
      dispatch({ type: 'ADD_GRAPHPAGE', payload: item });
    },
    renameItem: (item) => {
      dispatch({ type: 'RENAME_ITEM', payload: item });
    },
    storeGraph: bindActionCreators(storeGraph, dispatch),
    transformAction: bindActionCreators(transformAction, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    actions: {
      hideUndoRedoButtons: bindActionCreators(componentInstance, dispatch),
      findReference: bindActionCreators(componentInstance, dispatch),
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      setActiveWorksheet: bindActionCreators(setActiveWorksheet, dispatch),
      isRangeAvailable: bindActionCreators(componentInstance, dispatch),
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
      replaceAction: bindActionCreators(replaceAction, dispatch),
      importDBAction: bindActionCreators(importDBAction, dispatch),
      graphicCellAction: bindActionCreators(graphicCellAction, dispatch),
      importfileAction: bindActionCreators(importfileAction, dispatch),
      optionsAction: bindActionCreators(optionsAction, dispatch),
      sampleSizeAction: bindActionCreators(sampleSizeAction, dispatch),
      powerAction: bindActionCreators(powerAction, dispatch),
      showCalculations: bindActionCreators(showCalculations, dispatch),
      rowIndexUpdate: bindActionCreators(componentInstance, dispatch),
      setViewDataSecObj: bindActionCreators(setViewDataSecObj, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Spreadsheet);
