import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  ContextualMenu,
  IconButton,
  IIconProps,
  IStackTokens
} from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as gotoAction from "../../../store/Worksheet/Goto/actions";

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200 } },
};

const dragOptions: IDragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };
export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
  { key: '4', text: '4' },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
  { key: '7', text: '7' },
  { key: '8', text: '8' },
  { key: '9', text: '9' },
  { key: '10', text: '10' },
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const GoTo: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showGotoModal, setFalse: hideGotoModal }] = useBoolean(false);
  const { disabled, checked } = props;
  const [goToObj, setGoToObj] = useState({});
  const [extendCell,setExtendCell] = useState(false);
  // const [options, setOptions] = IDropdownOption[]: useState([]);
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');
  

  const _onChangeCol = (option: IDropdownOption, index?: number) => {
    goToObj.col = parseInt(option.key);
    setGoToObj(goToObj);
  }

  const _onChangeRow = (e: React.FormEvent<HTMLElement>) => {
    goToObj.row = parseInt(e.target.value);
    setGoToObj(goToObj);
  }

  const _onChangeExtendToCell = (input) => {
    if(input.target.checked){
      setExtendCell(true);
    }else{
      setExtendCell(false);
    }
  }
  const _onChangeFindGoTo = () =>{
   // alert(goToObj.col)
   if(goToObj.col === undefined || goToObj.col === ""){
     alert("'' is not a valid column number or title.");
     return
   }
   if(goToObj.row === undefined || goToObj.row === ""){
    alert("'' is not a valid row number.");
    return
   }
   
    if(goToObj.col && goToObj.row && extendCell === false){
     var numberConversionCol= numToSSColumn(goToObj.col);
      var goToCell=numberConversionCol+goToObj.row;
      props.referenceObjectState.goTo(goToCell);
      goToObj.col="";
      goToObj.row="";
      setGoToObj(goToObj);
    }
    if(goToObj.col && goToObj.row && extendCell === true){
      var numberConversionCol= numToSSColumn(goToObj.col);
      var colRef=numberConversionCol+goToObj.col;
      var rowRef=numberConversionCol+goToObj.row
      props.referenceObjectState.goTo(colRef+":"+rowRef);
      goToObj.col="";
      goToObj.row="";
      setGoToObj(goToObj);
    }
    props.actions.gotoAction.isOpenGoto({message: false});
    setExtendCell(false);
  }

   function numToSSColumn(num){
    var s = '', t;
  
    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t)/26 | 0;
    }
    return s || undefined;
  }

  return (

    <div>
      {/* <DefaultButton secondaryText="Go To" className={`text-block`} onClick={showGotoModal} text="Go To" /> */}
      <Modal
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        // onDismiss={hideGotoModal}
        isOpen={props.isOpen}
        onDismiss={()=>props.actions.gotoAction.isOpenGoto({message: false})}
        isModeless={true}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Go to cell - notebook</span>
          <IconButton
              // styles={iconButtonStyles}
              iconProps={helpIcon}
              ariaLabel="Help popup modal"
              // onClick={hideModal}
          />
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            // onClick={hideGotoModal}
            onClick={()=>props.actions.gotoAction.isOpenGoto({message: false})}
          />
        </div>

        <div className={contentStyles.body}>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              {/* <TextField placeholder="Column" onChange={(e)=>_onChangeFindInput(e)} step={1} style={{color: '#333'}}/> */}
              <Dropdown
                placeholder="Column"
                options={options}
                styles={dropdownStyles}
                onChanged={_onChangeCol}
              />
              <TextField
                placeholder="Row"
                onChange={(e) => _onChangeRow(e)}
                step={1}
                style={{ color: '#333' }}
              />
              <Checkbox onChange={(inputValue) => _onChangeExtendToCell(inputValue)} label="Extend selection to cell" />
              <br/>
            </Stack>
          </Stack>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <DefaultButton
                text="Ok"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
                onClick={() => _onChangeFindGoTo()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                // onClick={() => hideGotoModal()}
                onClick={()=>props.actions.gotoAction.isOpenGoto({message: false})}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
              />
            </Stack>
          </Stack>
        </div>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isOpenGoto: state.gotoReducer.isOpenGoto,
    referenceObjectState:state.instanceReducer.instance
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gotoAction: bindActionCreators(gotoAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GoTo)

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
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
});
const toggleStyles = { root: { marginBottom: '20px' } };
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
