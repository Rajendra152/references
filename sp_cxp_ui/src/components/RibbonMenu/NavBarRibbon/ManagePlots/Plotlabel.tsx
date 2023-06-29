import React, { useState } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { connect } from 'react-redux';

import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,
  IIconProps,
  Stack,
  IStackTokens,
  IStackProps,
} from '@fluentui/react';
import { DefaultButton, PrimaryButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { useEffect } from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { useRef } from 'react';
import { Slider, IStackStyles } from '@fluentui/react';
import { updateGraphProperties } from '../../../../services/graphPageServices/GraphServices';
import { bindActionCreators } from 'redux';
import * as graphPropertyAction from './../../../../store/GraphProperty/GraphProperty';
import * as ACTION from '../../../Redux/actionConstants';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import {getProperties}  from '../../../../services/graphPageServices/DefaultGraphProperties';
import { isRedoDataAvailable, isUndoDataAvailable } from '../../../../store/Worksheet/SpreadSheet/actions';
import { isReRenderGraph } from '../../../../store/CreateGraph/CreateDiagramPage/actions';


const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: '100%', height: 23 },
};
const stackTokens: IStackTokens = { childrenGap: 20 };

const PlotLabel: React.FunctionComponent = (props) => {
  const [selectedPlot, setSelectedPlot] = useState('')
  const [textPositions, setTextPosition] = useState('middle center')
  const [selectedPlotobject, setSelectedPlotObject] = useState({})
  const [text, setText] = React.useState('');
  const [GraphList, setGraphList] = useState('')
  const [PlotList, setPlotList] = useState('')

  const [keepInBounds,{toggle:toggleKeepInBounds}] = useBoolean(true);
  
  const onDismiss=(ev)=>{
    ev.preventDefault();
    props.setLabelOpen(false)
  }

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds],
  );

  const property = getProperties()
  const DataList = useRef([])
  const titleId = useId('title');
 useEffect(()=>{
  setTextPosition(property.textposition);
  setText(property.text);
 },[])
  useEffect(() => {
   
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {

      for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
        if (allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id) {
          setGraphList(allGraphsInPage.graphList[i])
          var allPlots = allGraphsInPage.graphList[i].plotData;
          setPlotList(allPlots[0])
          DataList.current = allPlots.map((item) => {
            return { key: item.id, text: item.name }
          })
          setSelectedPlot(DataList.current[0].key)
          setSelectedPlotObject(DataList.current[0])
        }
      }
    }


  }, [props])


  
  const selectedPlots = (ev, item) => {
    setSelectedPlot(item.key)
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
      if (GraphList == allGraphsInPage.graphList[i]) {

        for (let j = 0; j < allGraphsInPage.graphList[i].plotData.length; j++) {
          if (item.text == allGraphsInPage.graphList[i].plotData[j].name) {
            setPlotList(allGraphsInPage.graphList[i].plotData[j])
            // }
          }

        }
      }
    }

  }
  const options: IDropdownOption[] = [
    { key: 'x', text: 'Data from plot' }
  ]
  const textPosition: IDropdownOption[] = [
    { key: 'middle center', text: 'middle center' },
    { key: 'bottom left', text: 'bottom left' },
    { key: 'bottom center', text: 'bottom center' },
    { key: 'bottom right', text: 'bottom right' },
    { key: 'top left', text: 'top left' },
    { key: 'top center', text: 'top center' },
    { key: 'top right', text: 'top right' },
    { key: 'middle left', text: 'middle left' },
    { key: 'middle right', text: 'middle right' }
  ]
  const selectedTextPosition = (ev, item) => {
    setTextPosition(item.key)
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
      if (GraphList == allGraphsInPage.graphList[i]) {
        setGraphList(GraphList[i])
        for (let j = 0; j < allGraphsInPage.graphList[i].plotData.length; j++) {
          if (selectedPlot == allGraphsInPage.graphList[i].plotData[j].id) {
            // setPlotList(GraphList.plotData[j])
            const NewProperties = {
              ...allGraphsInPage.graphList[i].plotData[j].properties,
              textposition: item.key,
              text: text
            }
            updateGraphProperties(
              allGraphsInPage,
              GraphList,
              PlotList,
              GraphList.layout,
              NewProperties,
              props
            );
            // }
          }

        }
      }
    }
  }



  const textChange = (ev, value) => {
    setText(value)
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
      if (GraphList == allGraphsInPage.graphList[i]) {
        setGraphList(GraphList[i])
        for (let j = 0; j < allGraphsInPage.graphList[i].plotData.length; j++) {
          if (selectedPlot == allGraphsInPage.graphList[i].plotData[j].id) {
            // setPlotList(GraphList.plotData[j])
            const NewProperties = {
              ...allGraphsInPage.graphList[i].plotData[j].properties,
              textposition: textPositions,
              text: value
            }
            updateGraphProperties(
              allGraphsInPage,
              GraphList,
              PlotList,
              GraphList.layout,
              NewProperties,
              props
            );
            // }
          }

        }
      }
    }

  }
  return (
    <div className="delete">
      <Modal
        titleAriaId={titleId}
        isOpen={props.isLabelOpen}
        className='delete-plot plot-label'
        onDismiss={(ev)=>onDismiss(ev)}
        isBlocking={false}
        isModeless={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Label Plot</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() => props.setLabelOpen(false)}
          />
        </div>
        <div className="delete-main">
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm3">
                <Text variant={'smallPlus'} >
                  Plot:
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm9">
                <Dropdown
                  selectedKey={selectedPlot}
                  options={DataList.current}
                  styles={dropdownStyles}
                  onChange={selectedPlots}
                />
              </div>
            </div>
            <div className="ms-Grid-row" style={{ padding: '10px 0px 0px 0px' }}>
              <div className="ms-Grid-col ms-sm4">
                <Text variant={'smallPlus'} >
                  Label source
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm8">
                <Dropdown
                  selectedKey={options[0].key}
                  options={options}
                  styles={dropdownStyles}
                // onChange={selectedPlots}
                />
              </div>
            </div>
            <div className="ms-Grid-row" style={{ padding: '10px 0px 0px 0px' }}>
              <div className="ms-Grid-col ms-sm4">
                <Text variant={'smallPlus'} >
                  Text
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm8">
                <TextField value={text} onChange={textChange} />
              </div>
            </div>
            <div className="ms-Grid-row" style={{ padding: '10px 0px 15px 0px' }}>
              <div className="ms-Grid-col ms-sm4">
                <Text variant={'smallPlus'} >
                  Text position
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm8">
                <Dropdown
                  selectedKey={textPositions}
                  options={textPosition}
                  styles={dropdownStyles}
                  onChange={selectedTextPosition}
                  disabled
                />
              </div>
            </div>


            {/* <div className="ms-Grid-row" style={{ padding: '10px 0px 0px 0px' }}>
              <div className="ms-Grid-col ms-sm5">
                <Text variant={'smallPlus'} >
                  Vertical offset
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm2">
                <Text variant={'smallPlus'} style={{ border: '1px solid grey', padding: '1px 7px', }}>
                  {sliderValue}
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm5">
                <Slider
                  // label="Controlled example"
                  max={10}
                  value={sliderValue}
                  showValue={false}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={sliderOnChange}
                />
              </div>
            </div> */}
            {/* <div className="ms-Grid-row" style={{ padding: '10px 0px 0px 0px' }}>
              <div className="ms-Grid-col ms-sm5">
                <Text variant={'smallPlus'} >
                  Horizontal offset
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm2">
                <Text variant={'smallPlus'} style={{ border: '1px solid grey', padding: '1px 7px', }}>
                  {sliderValue}
                </Text>
              </div>
              <div className="ms-Grid-col ms-sm5">
                <Slider
                  // label="Controlled example"
                  max={10}
                  value={sliderValue}
                  showValue={false}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={sliderOnChange}
                />
              </div>
            </div> */}
            <div className="ms-Grid-row">
              <Stack tokens={stackTokens} horizontal style={{ float: 'right' }}>
                <DefaultButton text="OK" onClick={() => props.setLabelOpen(false)}  allowDisabledFocus />
                <DefaultButton text="Cancel" onClick={() => props.setLabelOpen(false)} allowDisabledFocus />
              </Stack>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
function mapStateToProps(state: any) {
  return {
    notebooks: state.notebookReducer.notebooks,
    allActiveItem: state.notebookReducer.allActiveItem,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    graphPropertyState: state.graphPropertyReducer,
    allGraphPages: state.notebookReducer.notebooks.allGraphPages.byId,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    stateSpreadSheet: state.instanceReducer

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    },
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlotLabel)

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: 200
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '0px 8px 0px 24px',
      fontSize: '15px'
    },
  ],
  body: {
    flex: '4 4 auto',
    fontWeight: 500,
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const stackProps: Partial<IStackProps> = {
  horizontal: true,
  tokens: { childrenGap: 40 },
  styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
