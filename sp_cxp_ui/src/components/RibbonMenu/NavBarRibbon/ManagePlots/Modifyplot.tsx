import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
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
import { connect } from 'react-redux';

import { DefaultButton, PrimaryButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';

const stackTokens: IStackTokens = { childrenGap: 20 };

const ModifyPlot: React.FunctionComponent = (props) => {
    const [modifyPlotId, setmodifyId] = useState('')
    const [Allplots, setAllPlot] = useState([])
    const [modifyPlot, setModify] = useState([])

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
        if(allGraphsInPage && allGraphsInPage.graphList) {

        if(allGraphsInPage && allGraphsInPage.graphList  && props.pageInstance?.selectedItems?.nodes.length > 0){

        for(let i=0;i<allGraphsInPage.graphList.length;i++){
            if(allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id){
              var allPlots = allGraphsInPage.graphList[i].plotData;
              setAllPlot(allPlots)
            }
          }
        }
    }

    }, [props])
    useEffect(() => {
        let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
        let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
        var allPlots = allGraphsInPage && allGraphsInPage.graphList[0]  ? allGraphsInPage.graphList[0].plotData : [];
        setModify(allPlots[0])
    }, [])

    const onDismiss=(ev)=>{
        ev.preventDefault();
        props.setModifyOpen(false)    
      }
    const modifyCurrentPlot = () => {
        props.setModifyOpen(false)
    }
    const titleId = useId('title');

    return (
        <div className="modify">
            <Modal
                titleAriaId={titleId}
                isOpen={props.isModifyOpen}
                onDismiss={(ev)=>onDismiss(ev)}
                isBlocking={false}
                isModeless={false}
                className="modify-plot"
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>More Plots</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={() => props.setModifyOpen(false)}
                    />
                </div>
                <div className="modify-main">
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm7 modify-bg">
                                {Allplots.map((e) => {
                                    return <div className="ms-Grid-row pointer">
                                        <div id={e.id} className={modifyPlotId == e.id ? "selectedPLot" : ""}>
                                            <Text variant={'smallPlus'} onClick={()=>{setmodifyId(e.id);setModify(e)}}>
                                                {e.name}
                                            </Text>
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className="ms-Grid-col ms-sm5">
                                <Stack tokens={stackTokens}>
                                    <DefaultButton text="Modify" allowDisabledFocus onClick={()=>{props.modifyPlot(modifyPlot);props.setModifyOpen(false)}}/>
                                    <DefaultButton text="Cancel" onClick={() => props.setModifyOpen(false)} allowDisabledFocus />
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
export default connect(mapStateToProps)(ModifyPlot)

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
