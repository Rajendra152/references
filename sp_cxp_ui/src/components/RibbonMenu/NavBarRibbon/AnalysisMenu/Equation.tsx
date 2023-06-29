import React, { useState } from 'react';
import {
  Modal,
  getTheme,
  DefaultButton,
  mergeStyleSets,
  FontWeights,
  ChoiceGroup,
  IChoiceGroupOption,
  IDragOptions,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';
import {
    ContextualMenu
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalCompontent from './../ModalCompontent/Modal/ModalCompontent';
import * as TransformAction from '../../../../store/Analysis/Transform/actions';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { useEffect } from 'react';
import { EquationDataProps } from '../../../../services/notebookManagerServices/NotebookManagerInterfaces';
import { createEquation } from '../../../../services/NotebookManagerServicesNew';
import { showMessageBox } from '../../../../utils/globalUtility';
import { checkIsNameUnique } from "../../../../services/NotebookManagerServicesNew";
import * as ITEM_TYPE from '../../../../services/NotebookManagerServices/ConstantsNotebookManager'

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 200, right: 0, position: 'inherit' } },
};

const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};

const trigonometricUnitOptions: IChoiceGroupOption[] = [
    { key: '0', text: 'Degrees' },
    { key: '1', text: 'Radians' },
    { key: '2', text: 'Grads' }
]

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

const uniqueWarning  = {
    buttons: ["OK"],
    message: "The name you have chosen for this equation is currently being used by another item in this notebook. Please select a different name.",
    title: "SigmaPlot 15"
}

const emptyWarning  = {
    buttons: ["OK"],
    message: "You must supply a non-empty name for the equation.",
    title: "SigmaPlot 15"
}

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

function Equation(props) {
  const [fileName, setFileName] = useState('');
  const [addFileName, setAddFileName] = useState('');
  const [equation, setEquation] = useState('');
  const [variables, setVariables] = useState('');
  const [initialParams, setInitialParams] = useState('');
  const [constraints, setConstraints] = useState('');
  const [iterations, setIterations] = useState('200');
  const [stepSize, setStepSize] = useState('1');
  const [tolerance, setTolerance] = useState('1e-10');
  const [trigonometricUnit, setTrigonometricUnit] = useState('0');
  const [openAddAsModal, setOpenAddAsModal] = useState(false);
  // To store notebook equation Id
  const [equationId, setEquationId] = useState('');
  const [saveFile, setSaveFile] = useState(false);

  useEffect(() => {
    loadData();
  }, [])

  // Loads initial data
  const loadData = () => {
    let equationId = props.transformState.equationId;
    if(equationId) {
        setEquationId(equationId);
        const equationData = props.notebooks?.allEquations?.byId?.[equationId] || {};
        const { name,
            equation,
            variables,
            initialParams,
            constraints,
            trigonometricUnit,
            iterations,
            stepSize,
            tolerance } = equationData.equationData;

        setFileName(name);
        setEquation(equation);
        setVariables(variables);
        setInitialParams(initialParams);
        setConstraints(constraints);
        setTrigonometricUnit(trigonometricUnit);
        setIterations(iterations);
        setStepSize(stepSize);
        setTolerance(tolerance);
    }
  }

  // Save and close equation modal
  const saveAndCloseEquation = () => {
      if(!fileName) {
        openFileNameModal();
        setSaveFile(true);
      } else {
        saveEquationData();
        closeEquation();
      }
  }

  // Create/Update equation data
  const saveEquationData = (newFileName?: string) => {
    const equationData = {
        name: newFileName ? newFileName : fileName,
        equation,
        variables,
        initialParams,
        constraints,
        trigonometricUnit,
        equationId,
        iterations,
        stepSize,
        tolerance
    };
    if(equationId) {
        props.updateEquationData(equationData)
    } else {
        let clickedItem = props.transformState.itemClicked;
        if(!(typeof clickedItem === 'object' && Object.keys(clickedItem).length)) {
            clickedItem = undefined;
        }
        createEquation(props, clickedItem, equationData);
    }
  }

  // Open Add as modal and set filename if any
  const openFileNameModal = () => {
    setAddFileName(fileName);
    setOpenAddAsModal(true);
  }

  // Update filename and closes add as modal
  const updateFileName = () => {
    if(validateFileName(addFileName)) {
        setFileName(addFileName);
        setOpenAddAsModal(false);
        if(saveFile) {
            saveEquationData(addFileName);
            closeEquation();
        }
    }
  }

  const validateFileName = (fileName: string) => {
    let notebookId = props.allActiveItem.notebook;
    let clickedItem = props.transformState.itemClicked;
    if(!(typeof clickedItem === 'object' && Object.keys(clickedItem).length)) {
        clickedItem = undefined;
    }
    if (clickedItem) {
        if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
            return true;
        } else {
            notebookId = clickedItem.parentNotebookId;
        }
    }
    if(!fileName) {
        showMessageBox(emptyWarning);
        return false;
    }

    const activeNotebook = props.notebooks.allNotebooks.byId[notebookId];
    if(!checkIsNameUnique(fileName, activeNotebook.id, props)) {
        showMessageBox(uniqueWarning);
        return false;
    }
    return true;
  }

  // Closes equation modal
  const closeEquation = () => {
    props.TransformAction.isOpenEquation({
        message: false
    })
  }

  return (
    <div>
      <ModalCompontent component={
        <>
            <div className={contentStyles.columns}>
                <div style={{flex: '0 0 45%'}}>
                    <label>Equation</label>
                    <TextField value={equation} onChange={(e: any) => setEquation(e.target.value)} rows={6} multiline resizable={false} />
                </div>
                <div style={{flex: '0 0 45%', marginLeft: '10%'}}>
                    <label>Variables</label>
                    <TextField value={variables} onChange={(e: any) => setVariables(e.target.value)} rows={6} multiline resizable={false} />
                </div>
            </div>
            <div className={contentStyles.columns}>
                <div style={{flex: '0 0 45%'}}>
                    <label>Initial Parameters</label>
                    <TextField value={initialParams} onChange={(e: any) => setInitialParams(e.target.value)} rows={7} multiline resizable={false} />
                </div>
                <div style={{flex: '0 0 45%', marginLeft: '10%'}}>
                    <label>Constraints</label>
                    <TextField value={constraints} onChange={(e: any) => setConstraints(e.target.value)} rows={7} multiline resizable={false} />
                </div>
            </div>
            <div className={contentStyles.columns}>
                <label style={{marginTop: '5px'}}>Iterations</label>
                <div style={{width: '100px'}} className="ml-1">
                    <TextField value={iterations} onChange={(e: any) => setIterations(e.target.value)} name="Iteraions"/>
                </div>
                <label style={{margin: '5px 0 0 20px'}}>Step size</label>
                <div style={{width: '100px'}} className="ml-1">
                    <TextField value={stepSize} onChange={(e: any) => setStepSize(e.target.value)} name="stepSize"/>
                </div>
                <label style={{margin: '5px 0 0 20px'}}>Tolerance</label>
                <div style={{width: '100px'}} className="ml-1">
                    <TextField value={tolerance} onChange={(e: any) => setTolerance(e.target.value)} name="stepSize"/>
                </div>
            </div>
            <div style={{width: '70%', margin: '10px 0 15px 0'}}>
                <ChoiceGroup className={"equation-units group-flex fieldGroupFlex"} selectedKey={trigonometricUnit} options={trigonometricUnitOptions} label={'Trigonometric units:'} onChange={(e, item: any) => setTrigonometricUnit(item.key)}/>
            </div>
            <div className={contentStyles.columns}>
                <div style={{flex: '0 0 30%'}}>
                    <DefaultButton
                        text="Add As..."
                        className={`text-block`}
                        onClick={() => setOpenAddAsModal(true)}
                        allowDisabledFocus
                    />
                    <DefaultButton
                        text="Run"
                        className={`text-block ml-1`}
                        style={{ padding: '0 27px 0 27px'}}
                        onClick={() => console.log('Run!')}
                        allowDisabledFocus
                        disabled
                    />
                </div>
                <div style={{flex: '0 0 27%', marginLeft: '43%'}}>
                    <DefaultButton
                        text="OK"
                        className={`text-block bg-green whiteColor`}
                        style={{ padding: '0 27px 0 27px'}}
                        onClick={() => saveAndCloseEquation()}
                        allowDisabledFocus
                    />
                    <DefaultButton
                        text="Cancel"
                        className={`text-block ml-1`}
                        onClick={closeEquation}
                        allowDisabledFocus
                    />
                </div>
            </div>
            <Modal
                titleAriaId={'titleAriaId'}
                isOpen={openAddAsModal}
                onDismiss={() => setOpenAddAsModal(false)}
                isModeless={true}
                containerClassName={'addAsModal'}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                <span id={'title2'} style={{fontSize: 18}}>Add As</span>
                <div style={iconButtonStyles.root}>
                    <IconButton
                        // styles={iconButtonStyles}
                        iconProps={helpIcon}
                        ariaLabel="Help popup modal"
                        // onClick={hideModal}
                    />
                    <IconButton
                        // styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={() => setOpenAddAsModal(false)}
                    />
                    </div>
                </div>
                <div className={contentStyles.body}>
                    <label>Equation name</label>
                    <TextField value={addFileName} onChange={(e: any) => setAddFileName(e.target.value)} name="equationName" autoFocus/>
                    <div style={{textAlign: 'right', marginTop: '15px'}}>
                        <DefaultButton
                            style={{marginRight: '10px'}}
                            text="OK"
                            className={`text-block`}
                            onClick={() => updateFileName()}
                            allowDisabledFocus
                        />
                        <DefaultButton
                            text="Cancel"
                            className={`text-block`}
                            onClick={() => {setOpenAddAsModal(false)}}
                            allowDisabledFocus
                        />
                    </div>
                </div>
            </Modal>
        </>
        }
        close={closeEquation}
        title={'Function - ' + (fileName ? fileName : '(untitled)')}></ModalCompontent>
    </div>
  )
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
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
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '1 1 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    columns: {
        display: 'flex',
        marginTop: '10px'
    },
    column: {
        flex: '0 0 50%',
        marginBottom: '15px'
    },
    fieldSet: {
        border: '1px solid rgb(211, 211, 218, 0.7)',
        marginBottom: '10px'
    },
});

const iconButtonStyles = {
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

function mapStateToProps(state) {
  return {
    transformState: state.transformReducer,
    notebooks: state.notebookReducer.notebooks,
    allActiveItem: state.notebookReducer.allActiveItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TransformAction: bindActionCreators(TransformAction, dispatch),
    updateEquationData: (equationData: EquationDataProps) => {
        dispatch({ type: 'UPDATE_EQUATION_DATA', payload: equationData });
    },
    addEquation: (newEquation: any) => {
        dispatch({ type: 'ADD_EQUATION', payload: newEquation });
    },
    addSection: (newSection: any) => {
        dispatch({ type: 'ADD_SECTION', payload: newSection });
      },
    setAllActiveItem: (allactiveItem: any) => {
        dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Equation);
