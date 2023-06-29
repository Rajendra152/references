import React, { useState } from 'react';
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
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as replaceAction from "../../../store/Worksheet/Replace/actions";
import Helpbutton from '../../../HelpButton';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 'auto' } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200 } },
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

const Replace: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const { disabled, checked } = props;
  const [findInputVal, setFindInputVal] = useState('');
  const [replaceObj, setReplaceObj] = useState({});
  const [disabledFind, setDisabledFind] = useState(true);
  const [disabledReplace, setDisabledReplace] = useState(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(true);
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
     [keepInBounds],
  );

  const _onChangeEntrieCell = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
    console.log(`The option has been changed to ${isChecked}.`);
    replaceObj.entrieCell = isChecked;
    setReplaceObj(replaceObj);
  }
  const _onChangeMatchCase = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
    console.log(`The option has been changed to ${isChecked}.`);
    replaceObj.matchcase = isChecked;
    setReplaceObj(replaceObj);
  }
  const _onChangeFindInput = (e: React.FormEvent<HTMLElement>) => {
    if(e.target.value === ""){
      setDisabledFind(true)
    }else{
      setDisabledFind(false)
      replaceObj.value = e.target.value;
      setReplaceObj(replaceObj);
    }  
  }
  const _onChangeReplaceInput = (e: React.FormEvent<HTMLElement>) => {
    if(e.target.value === ""){
      setDisabledReplace(true)
    }else{
      setDisabledReplace(false)
      replaceObj.replaceValue = e.target.value;
      setReplaceObj(replaceObj);
    }
   
  }
  const _onChangeFindText = () => {
    if(replaceObj.value){
      var beforeFind = props.referenceObjectState.getActiveSheet().activeCell;
      let findValue=replaceObj.value
      if(replaceObj.entrieCell && !replaceObj.matchcase){
        findValue=capitalizeFirstLetter(replaceObj.value);
      }
      let findOption = {
      value: findValue, sheetIndex: props.referenceObjectState.getActiveSheet().id, findOpt: "next", mode: "Sheet",isCSen:replaceObj.matchcase,
      isEMatch: replaceObj.entrieCell,searchBy: "By Row"
      };
      props.referenceObjectState.find(findOption);
      var afterCell = props.referenceObjectState.getActiveSheet().activeCell;
      console.log(afterCell);
      // if (beforeFind === afterCell) {
      //  alert('Item not found');
      // }
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  
  const _onChangeReplaceText = () =>{

    if(replaceObj.replaceValue && replaceObj.value){
    props.referenceObjectState.replace({replaceValue: replaceObj.replaceValue, replaceBy: 'replace', value: replaceObj.value});
  }
}
  const _onChangeReplaceAllText = () =>{
    if(replaceObj.replaceValue && replaceObj.value){
    props.referenceObjectState.replace({replaceValue: replaceObj.replaceValue, replaceBy: 'replaceall', value: replaceObj.value});
    }
  }

  return (
    <div>

      {/* <DefaultButton
        secondaryText="Replace"
        className={`text-block`}
        onClick={showModal}
        text="Replace"
      /> */}
      <Modal
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        // onDismiss={hideModal}
        onDismiss={()=>props.actions.replaceAction.isOpenReplace({message: false})}
        isModeless={true}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
        <span id={titleId}>Find & Replace</span>
        <div className="ms-Grid " dir="ltr">
            <div className="ms-Grid-row" style={{marginLeft:"216px"}}>
              <div className="ms-Grid-col ms-sm6 padding">
                {/* this is mapped to parent  */}
                <Helpbutton nodeId="Reference" />
              </div>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            // onClick={hideModal}
            onClick={()=>props.actions.replaceAction.isOpenReplace({message: false})}
          />
          </div>
          </div>
        </div>

        <div className={contentStyles.body}>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <TextField
                placeholder="Find What"
                onChange={(e) => _onChangeFindInput(e)}
                step={1}
                style={{ color: '#333' }}
              />
              <TextField
                placeholder="Replace With"
                onChange={(e) => _onChangeReplaceInput(e)}
                step={1}
                style={{ color: '#333' }}
              />
              <Checkbox
                label="Match entire cell text"
                onChange={_onChangeEntrieCell}
              />
              <Checkbox
                label="Match case"
                onChange={_onChangeMatchCase}
                // defaultChecked="Match case"
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Find Next"
                className={`text-block`}
                onClick={()=>_onChangeFindText()}
                allowDisabledFocus
                checked={checked}
                disabled={disabledFind}
              />
              <DefaultButton
                text="Replace"
                className={`text-block`}
                onClick={() => _onChangeReplaceText()}
                allowDisabledFocus
                // disabled={disabledReplace}
                disabled={disabledFind}
                checked={checked}
              />
              <DefaultButton
                text="Replace All"
                className={`text-block`}
                onClick={() =>  _onChangeReplaceAllText()}
                allowDisabledFocus
                // disabled={disabledReplace}
                disabled={disabledFind}
                checked={checked}
              />
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={()=>props.actions.replaceAction.isOpenReplace({message: false})}
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

// export default connect(
//   (state) => ({
//     isOpenReplace: state.replaceReducer.isOpenReplace
//   }),
//   (dispatch) => ({
//     replaceAction: bindActionCreators(
//       Object.assign({}, replaceAction),
//       dispatch
//     ),
//   })
// )(Replace)
function mapStateToProps(state) {
  return {
    isOpenReplace: state.replaceReducer.isOpenReplace,
    referenceObjectState:state.instanceReducer.instance
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      replaceAction: bindActionCreators(replaceAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Replace)

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
