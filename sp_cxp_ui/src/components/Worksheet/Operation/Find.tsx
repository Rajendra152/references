import React, { useState } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  Toggle,
  ContextualMenu,
  IconButton,
  IIconProps,
  IStackTokens
} from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as findAction from "../../../store/Worksheet/Find/actions";

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

const options: IChoiceGroupOption[] = [
  { key: 'up', text: 'Up' },
  { key: 'down', text: 'Down' }
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const Find: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const { disabled, checked } = props;
  const [findObj, setFindObj] = useState({});
  const [disabledFind, setDisabledFind] = useState(true);
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');
  const _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) =>{
    console.log(`The option has been changed to ${option}.`);
    findObj.direction = option.key;
    setFindObj(findObj);
  }
  const _onChangeEntrieCell = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) =>{
    console.log(`The option has been changed to ${isChecked}.`);
    findObj.entrieCell = isChecked;
    setFindObj(findObj);
  }
  const _onChangeMatchCase = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) =>{
    console.log(`The option has been changed to ${isChecked}.`);
    findObj.matchcase = isChecked;
    setFindObj(findObj);
  }
  const _onChangeFindInput = (e: React.FormEvent<HTMLElement>) =>{
    console.log(`The option has been changed to ${e.target.value}.`);
    if(e.target.value === ""){
      setDisabledFind(true)
    }else{
      setDisabledFind(false)
      findObj.value = e.target.value;
      setFindObj(findObj);
    }
  
  }
  const _onChangeFindText = () => {
    
    if(findObj.value){
    var beforeFind = props.referenceObjectState.getActiveSheet().activeCell; 
    let findOption = {
      value: findObj.value, sheetIndex: props.referenceObjectState.getActiveSheet().id, findOpt: "next", mode: "Sheet",isCSen:findObj.matchcase,
      isEMatch: findObj.entrieCell, searchBy: findObj.direction == "down" ? "By Column" : "By Row"
      };
      props.referenceObjectState.find(findOption);
      var afterCell = props.referenceObjectState.getActiveSheet().activeCell; 
      if (beforeFind === afterCell) { 
       alert('Item not found'); 
      } 
    }
  }
  const onClose=()=>{
    setDisabledFind(true)
    props.actions.findAction.isOpenFind({message: false});
  }
  
  return (
    <div>

      {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Find Option" /> */}
      <Modal
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        onDismiss={()=>props.actions.findAction.isOpenFind({message: false})}
        isModeless={true}
        containerClassName={contentStyles.container}
        // dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Find</span>
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
            onClick={()=>onClose()}
          />
        </div>

        <div className={contentStyles.body}>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
               <TextField
                  placeholder="Find What"
                  onChange={(e)=>_onChangeFindInput(e)}
                  step={1}
                  style={{color: '#333'}}
                />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Find"
                disabled={disabledFind}
                className={`text-block`}
                onClick={()=>_onChangeFindText()}
                allowDisabledFocus
                checked={checked}
              />
            </Stack>
          </Stack>
          <br/>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
            <Checkbox
              label="Match entire cell text"
              onChange={_onChangeEntrieCell}
            />
            <Checkbox
              label="Match case"
              onChange={_onChangeMatchCase}
              defaultChecked="Match case"
            />
            </Stack>
            <Stack {...columnProps}>
              <ChoiceGroup
                defaultSelectedKey="down"
                options={options}
                onChange={_onChange}
                label="Pick one"
                required={true}
              />
            </Stack>
          </Stack>
        </div>
      </Modal>
    </div>
  );
};

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

// export default connect(
//   (state) => ({
//     isOpenFind: state.findReducer.isOpenFind
//   }),
//   (dispatch) => ({
//     findAction: bindActionCreators(
//       Object.assign({}, findAction),
//       dispatch
//     ),
//   })
// )(Find)
function mapStateToProps(state) {
  return {
    isOpenFind: state.findReducer.isOpenFind,
    referenceObjectState:state.instanceReducer.instance
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      findAction: bindActionCreators(findAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Find)
