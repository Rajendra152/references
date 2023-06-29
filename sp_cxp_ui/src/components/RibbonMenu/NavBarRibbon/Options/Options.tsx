import React, { useState, useEffect } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BottomSection from '../ModalCompontent/Compontent/BottomSection';
import * as optionsAction from '../../../../store/MainWindow/Options/actions';
import Worksheet from './PivotOptions/Worksheet';
import OptionsReport from './PivotOptions/OptionsReport';
import Page from './PivotOptions/Page';
import Graph from './PivotOptions/Graph';
import { Pivot, PivotItem } from '@fluentui/react';
import ModalCompontent from '../../../Worksheet/Modal/ModalCompontent';
import {
  isShowGrids,
  isSetRuler,
  setPageZoomValue,
  setZoomActionType,
} from '../../../../store/CreateGraph/CreateDiagramPage/actions';
import { isOptionsUpdated } from '../../../../store/Worksheet/FormatCell';
import { getRangeIndexes, getCellAddress } from '@syncfusion/ej2-spreadsheet';
// import console from 'console';
import GeneralOptions from './PivotOptions/GeneralOptions';
import { writeINIFile } from '../../../../utils/globalUtility';
import { post } from '../../../../services/DataService';
import * as Config from '../../../App/Config';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import * as currencies from '../../../currencies.json';
import * as numberingSystems from '../../../numberingSystems.json';
import * as numbers from '../../../../numbers.json';
import * as conversion from '../../../../utils/conversion';
import { readReportOptionsFromINIFile } from '../../../Constant/ConstantFunction';



const stackTokens = { childrenGap: 50 };
export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

function addZeroes(num) {
  let val = '';
  while (num != 0) {
    val = val + '0';
    num--;
  }
  return val;
}

function Options(props) {


  let rowIndex;
  let colIndex;
  if (props.referenceObjectState) {
    // console.log(props.referenceObjectState)
    rowIndex = props.referenceObjectState.getActiveSheet().usedRange.rowIndex;
    colIndex = props.referenceObjectState.getActiveSheet().usedRange.colIndex;
    console.log('rowIndex', rowIndex, colIndex);
  }
  let range = 'A0:A0';
  let decimalZeroes = '0';

  const [generalData, setGeneralData] = useState(
    JSON.parse(JSON.stringify(props.optionsState.optionsCollection.General))
  );
  const [pageData, setPageData] = useState(
    JSON.parse(JSON.stringify(props.optionsState.optionsCollection.GraphPage))
  );
  const [graphData, setGraphData] = useState(
    JSON.parse(JSON.stringify(props.optionsState.optionsCollection.Graph))
  );
  const [reportData, setReportData] = useState(
    JSON.parse(JSON.stringify(props.optionsState.optionsCollection.Editor))
  );
  const [worksheetData, setWorksheetData] = useState(
    JSON.parse(JSON.stringify(props.optionsState.optionsCollection.Worksheet))
  );

  const help = (a: string, b: string, c: string) => {
    props.OpenHelpWindow(a, b, c);
  };
  useEffect(() => {
    help('wbasics', 'options__worksheet', '');
  }, []);

  const updateOptions = async (close?: boolean) => {
    console.log('Inside update options');
    console.log('checking options', props.allA)
    let collection = JSON.parse(JSON.stringify(props.optionsState.optionsCollection));
    collection.Graph = { ...updateGraphDataBasedOnUnit(collection.GraphPage.defaultUnit || 'in', pageData.defaultUnit) };
    collection.GraphPage = { ...pageData };
    collection.Editor = { ...reportData };
    const sheetData = { ...worksheetData };
    if (sheetData.numeric.displayAs === 'General') {
      sheetData.numeric.decimalPlaces =
        collection.Worksheet.numeric.decimalPlaces;
    }
    collection.Worksheet = { ...sheetData };
    collection.General = { ...generalData };
    triggerOptionsUpdateCall();
    props.actions.optionsAction.OptionsUpdateCollection({
      message: collection,
    });
    if (props.allActiveItem.worksheet) {
      setDataInWorksheet();
      updateRegionalSettings();
    }
    console.log(props.allActiveItem.graphPage)
    console.log(props.allActiveItem.report)
    if (props.allActiveItem.graphPage.id != null) {
      setDataInGraphPage();
    }
    if (props.allActiveItem.report != null) {
      setDatainReport();
    }


    writeINIFile(props.optionsState.optionsCollection);
    readReportOptionsFromINIFile();
    if (close) {
      closeModal();
    }
  };

  const updateGraphDataBasedOnUnit = (oldUnit: string, newUnit: string) => {
    const newGraphData = JSON.parse(JSON.stringify(graphData));
    if (oldUnit === newUnit) return newGraphData;

    const { width, height, top, left } = newGraphData.sizeAndPosition;
    const methodName: Function = conversion[`${oldUnit}_to_${newUnit}`];
    newGraphData.sizeAndPosition.width = methodName(parseFloat(width));
    newGraphData.sizeAndPosition.height = methodName(parseFloat(height));
    newGraphData.sizeAndPosition.top = methodName(parseFloat(top));
    newGraphData.sizeAndPosition.left = methodName(parseFloat(left));
    newGraphData.Symbols.size = methodName(
      parseFloat(newGraphData.Symbols.size)
    );
    newGraphData.lines.thickness = methodName(
      parseFloat(newGraphData.lines.thickness)
    );
    setGraphData(newGraphData);
    return newGraphData;
  };

  const setGridStyle = (size) => {
    range = getCellAddress(rowIndex, colIndex);

    let activeRange = `A0:${range}`;
    if (worksheetData.appearance.grid.color === 'red') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #FF0000`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'black') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #000000`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'white') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #FFFFFF`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'green') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #00FF00`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'yellow') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #FFFF00`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'pink') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #FFC0CB`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'gray') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #808080`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === 'cyan') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #00FFFF`,
        },
        activeRange
      );
    }
    if (worksheetData.appearance.grid.color === '(None)') {
      props.referenceObjectState.setBorder(
        {
          border: `${size} solid #e0e0e0`,
        },
        activeRange
      );
    }
  };

  const setDataInGraphPage = () => {
    const value = {
      showGrid: pageData.Grids.showgrids,
      showHorizontal: pageData.Grids.ShowHorizontalLines,
      showVertical: pageData.Grids.ShowVerticleLines,
    };
    props.actions.isSetRuler(pageData.Rulers);
    props.actions.isShowGrids(value);

    const diagram = props.pageInstance
    if (diagram != '') {
      if (pageData.defaultZoom === 'fit') {
        console.log('true')
        diagram.fitToPage(
          {
            mode: 'Page',
            region: 'Content',
            margin: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }
          }
        );
      } else {
        const currentZoom = diagram?.scrollSettings?.currentZoom;
        const zoom = {};
        switch (pageData.defaultZoom) {
          case '400':
            zoom.zoomFactor = (4 / currentZoom) - 1;
            break;
          case '350':
            zoom.zoomFactor = (3.5 / currentZoom) - 1;
            break;
          case '300':
            zoom.zoomFactor = (3 / currentZoom) - 1;
            break;
          case '250':
            zoom.zoomFactor = (2.5 / currentZoom) - 1;
            break;
          case '200':
            zoom.zoomFactor = (2 / currentZoom) - 1;
            break;
          case '150':
            zoom.zoomFactor = (1.5 / currentZoom) - 1;
            break;
          case '100':
            zoom.zoomFactor = (1 / currentZoom) - 1;
            break;
          case '75':
            zoom.zoomFactor = (0.75 / currentZoom) - 1;
            break;
          case '50':
            zoom.zoomFactor = (0.5 / currentZoom) - 1;
            break;
          case '25':
            zoom.zoomFactor = (0.25 / currentZoom) - 1;
            break;
        }
        if (diagram != undefined) {
          diagram?.zoomTo(zoom);
        }
      }
    }

  };

  const setDataInWorksheet = () => {
    console.log('Trying to print something');
    console.log(
      'range contains',
      props.referenceObjectState.getActiveSheet().usedRange
    );
    range = getCellAddress(rowIndex, colIndex);
    console.log('active range contains', range);
    let activeRange = `A0:${range}`;

    //Numeric
    if (worksheetData.numeric) {
      decimalZeroes = addZeroes(worksheetData.numeric.decimalPlaces);
      if (
        worksheetData.numeric.displayAs.includes('E Notation When Needed') ||
        worksheetData.numeric.displayAs.includes('Fixed Decimal')
      ) {
        // if (worksheetData.numeric.engineeringNotation === true) {
        //   props.referenceObjectState.numberFormat('0.00E+00', activeRange);
        // }

        decimalZeroes = '0.' + decimalZeroes;
        console.log('Zeroes Added', decimalZeroes);
        props.referenceObjectState.numberFormat(decimalZeroes, activeRange);
        //props.referenceObjectState.actionComplete()
      } else if (
        worksheetData.numeric.displayAs.includes('E Notation Always') ||
        worksheetData.numeric.engineeringNotation === true
      ) {
        props.referenceObjectState.numberFormat('0.00E+00', activeRange);
        // props.referenceObjectState.actionComplete()
      }
      else {
        props.referenceObjectState.numberFormat('General', activeRange);
      }
    }

    //Appearance
     if (worksheetData.appearance.rowIndex) {
    console.log('Row Height value Options ', worksheetData.appearance.rowHeight)
    for (let i = 0; i <= rowIndex; i++)
      props.referenceObjectState.setRowHeight(
        worksheetData.appearance.rowHeight ,
        i
      );
    for (let j = 0; j <= colIndex; j++)
      props.referenceObjectState.setColWidth(
        worksheetData.appearance.colWidth ,
        j
      );
    
    }

    if (worksheetData.appearance.font) {
      props.referenceObjectState.cellFormat(
        {
          fontFamily: worksheetData.appearance.font.style,
        },
        activeRange
      );
      props.referenceObjectState.cellFormat(
        {
          fontSize: worksheetData.appearance.font.size + `pt`,
        },
        activeRange
      );
    }

    if (worksheetData.appearance.grid.thickness === 'thin') {
      setGridStyle('1px');
    }

    if (worksheetData.appearance.grid.thickness === 'Thick') {
      setGridStyle('3px');
    }

    if (worksheetData.appearance.grid.thickness === 'medium') {
      setGridStyle('2px');
    } 

    props.actions.isWorksheetChanged(true);
    props.referenceObjectState.actionComplete();
    //props.referenceObjectState.queryCellInfo();
  };

  const setDatainReport = () => {
    if (reportData.enableToolbar) {
      props.actions.optionsAction.EnableToolbar({
        message: true,
      });
    } else if (reportData.enableToolbar === false) {
      props.actions.optionsAction.EnableToolbar({
        message: false,
      });
    }

    if (reportData.showPropertiesPane) {
      //props.exportInstance.showPropertiesPane = true;
      console.log('Options props contains', props.actions.optionsAction);
      props.actions.optionsAction.ShowPropertiesPane({
        message: true,
      });
    } else {
      // props.exportInstance.showPropertiesPane = false;
      props.actions.optionsAction.ShowPropertiesPane({
        message: false,
      });
    }
  };

  const updateRegionalSettings = () => {
    console.log(worksheetData.regionalSettings);
    console.log(worksheetData)
    let regionKey = worksheetData.regionalSettings;
    //alert(JSON.stringify(regionKey))
    console.log(regionKey);
    loadCldr(currencies, numbers, numberingSystems);

    setCulture(regionKey);
    return;
    // setCurrencyCode(regionKey);
  };

  const triggerOptionsUpdateCall = () => {
    const masterGeneralData = props.optionsState.optionsCollection.General;
    if (
      ['loggingLevel', 'logFileRotation', 'backupCount'].some((prop: any) => {
        if (masterGeneralData[prop] !== generalData[prop]) {
          return true;
        }
        return false;
      })
    ) {
      const payload = {
        level: generalData.loggingLevel,
        log_file_size: generalData.logFileRotation,
        backup_count: generalData.backupCount,
      };
      post(Config.optionsUpdate, payload).then((res) =>
        console.log(res && res.data)
      );
    }
  };
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == 'Worksheet') {
      help('wbasics', 'options__worksheet', '');
    } else if (item.props.headerText == 'Page') {
      help('wbasics', 'options__page', '');
    } else if (item.props.headerText == 'General') {
      help('wbasics', 'options__general', '');
    } else if (item.props.headerText == 'Report') {
      help('wbasics', 'options__report', '');
    } else if (item.props.headerText == 'Graph') {
      help('wbasics', 'options__graph', '');
    }
  };
  const closeModal = () => {
    props.actions.optionsAction.isOptions({ message: false });
  };

  return (
    <ModalCompontent
      isModeless={false}
      isBlocking={true}
      close={closeModal}
      component={
        <>
          <Stack horizontal className={'mb-1 p-0'} tokens={stackTokens}>
            <Pivot
              aria-label="Basic Pivot Example"
              onLinkClick={getSelectedItem}
            >
              <PivotItem
                headerText="Worksheet"
                headerButtonProps={{
                  'data-order': 1,
                  'data-title': 'My Files Title',
                }}
                className="FormatContainer"
              >
                <Worksheet
                  data={worksheetData}
                  setData={setWorksheetData}
                ></Worksheet>
              </PivotItem>
              <PivotItem headerText="Page">
                <Page data={pageData} setData={setPageData}></Page>
              </PivotItem>
              <PivotItem headerText="General">
                <GeneralOptions
                  data={generalData}
                  setData={setGeneralData}
                ></GeneralOptions>
              </PivotItem>
              <PivotItem headerText="Report">
                <OptionsReport
                  data={reportData}
                  setData={setReportData}
                ></OptionsReport>
              </PivotItem>
              <PivotItem headerText="Graph">
                <Graph data={graphData} setData={setGraphData} />
              </PivotItem>
            </Pivot>
          </Stack>
          <Stack horizontal className={'mb-1 p-0'} tokens={stackTokens}>
            <BottomSection
              type={'3'}
              component={
                <>
                  <DefaultButton
                    className={'black'}
                    text="OK"
                    allowDisabledFocus
                    onClick={() => {
                      updateOptions(true);
                    }}
                  />
                  <DefaultButton
                    className={'black ml-1'}
                    text="Cancel"
                    allowDisabledFocus
                    onClick={closeModal}
                  />
                  <DefaultButton
                    className={'black ml-1'}
                    text="Apply"
                    allowDisabledFocus
                    onClick={() => {
                      updateOptions();
                    }}
                  />
                </>
              }
            />
          </Stack>
        </>
      }
      title={'Options'}
      isDraggable={false}
      isModeless={false}
      keepInBounds={false}
      isBlocking={true}
    ></ModalCompontent>
  );
}

function mapStateToProps(state) {
  console.log('active item', state.notebookReducer.allActiveItem);
  return {
    optionsState: state.optionsReducer,
    referenceObjectState: state.instanceReducer.instance,
    exportInstance: state.instanceReducer.exportInstance,
    reportProperties: state.optionsReducer.showReportProperties,
    allActiveItem: state.notebookReducer.allActiveItem,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (
      RibbonMenu: string,
      selectedElement: string,
      selectedItem: string
    ) =>
      dispatch(
        actionCreators.setHelpWindowOpen(
          RibbonMenu,
          selectedElement,
          selectedItem
        )
      ),

    actions: {
      optionsAction: bindActionCreators(optionsAction, dispatch),
      isShowGrids: bindActionCreators(isShowGrids, dispatch),
      isSetRuler: bindActionCreators(isSetRuler, dispatch),
      isWorksheetChanged: bindActionCreators(isOptionsUpdated, dispatch),
      setPageZoom: bindActionCreators(setPageZoomValue, dispatch),
      setZoomAction: bindActionCreators(setZoomActionType, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Options)
