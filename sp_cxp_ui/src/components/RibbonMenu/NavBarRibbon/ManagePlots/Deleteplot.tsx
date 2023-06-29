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

const stackTokens: IStackTokens = { childrenGap: 20 };

const DeletePlot: React.FunctionComponent = (props) => {
  const [deletePlotId, setDeleteId] = useState('')
  const [deletePlot, setDelete] = useState([])

  const [Allplots, setAllPlot] = useState([])

  const titleId = useId('title');
  const [keepInBounds,{toggle:toggleKeepInBounds}] = useBoolean(true);
  
  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds],
  );  

  useEffect(() => {
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if(allGraphsInPage && allGraphsInPage.graphList  && props.pageInstance?.selectedItems?.nodes.length > 0){

    for(let i=0;i<allGraphsInPage.graphList.length;i++){
      if(allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id){
        var allPlots = allGraphsInPage.graphList[i].plotData;
        setAllPlot(allPlots)
      }
    }
  }
  }, [props])


  useEffect(() => {
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    var allPlots = allGraphsInPage && allGraphsInPage.graphList[0] ? allGraphsInPage.graphList[0].plotData : [];
    setDelete(allPlots[0])
  }, [])

  const onDismiss=(ev)=>{
    ev.preventDefault();
    props.setDeleteOpen(false)
  }

  const DeleteCurrentPlot = () => {
    props.DeleteCurrentplot(deletePlot)
    if (Allplots.length == 2) {
      props.setDeleteOpen(false)
    }
  }
  return (
    <div className="delete">
      <Modal
        titleAriaId={titleId}
        isOpen={props.isDeleteOpen}
        onDismiss={(ev)=>onDismiss(ev)}
        className='delete-plot'
        isBlocking={false}
        isModeless={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>More Plots</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() => props.setDeleteOpen(false)}
          />
        </div>
        <div className="delete-main">
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm7 delete-bg">

                {Allplots.map((e) => {
                  return <div className="ms-Grid-row pointer">
                     <div id = {e.id} className = { deletePlotId == e.id ? "selectedPLot" :""}>
                    <Text variant={'smallPlus'} onClick={() => {setDelete(e);setDeleteId(e.id)}}>
                      {e.name}
                    </Text>
                    </div>
                  </div>
                })}
              </div>
              <div className="ms-Grid-col ms-sm5">
                <Stack tokens={stackTokens}>
                  <DefaultButton text="Delete" allowDisabledFocus onClick={DeleteCurrentPlot} />
                  <DefaultButton text="Cancel" onClick={() => props.setDeleteOpen(false)} allowDisabledFocus />
                </Stack>
              </div>
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
  }
}
export default connect(mapStateToProps)(DeletePlot)
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
