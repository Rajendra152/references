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
  IStackTokens,
} from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  TextField,
  MaskedTextField,
} from 'office-ui-fabric-react/lib/TextField';
import {
  Stack,
  IStackProps,
  IStackStyles,
} from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as replaceAction from '../../../store/Worksheet/Replace/actions';
import Helpbutton from '../../../HelpButton';

const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200 } },
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

export interface IButtonExampleProps {

  disabled?: boolean;
  checked?: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'up', text: 'Up' },
  { key: 'down', text: 'Down' },
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const ReplaceReport: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const { disabled, checked } = props;
  const [findInputVal, setFindInputVal] = useState('');
  const [replaceInputVal, setReplaceInputVal] = useState('');
  const [replaceObj, setReplaceObj] = useState({});
  const [disabledFind, setDisabledFind] = useState(true);
  const [disabledReplace, setDisabledReplace] = useState(true);
  const [searchOccurence, setSearchOccurence] = useState(0);

  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');

  const _onChangeEntrieCell = (
    ev: React.FormEvent<HTMLElement>,
    isChecked: boolean
  ) => {
    console.log(`The option has been changed to ${isChecked}.`);
    replaceObj.entrieCell = isChecked;
    setReplaceObj(replaceObj);
  };
  const _onChangeMatchCase = (
    ev: React.FormEvent<HTMLElement>,
    isChecked: boolean
  ) => {
    console.log(`The option has been changed to ${isChecked}.`);
    replaceObj.matchcase = isChecked;
    setReplaceObj(replaceObj);
  };
  const _onChangeFindInput = (e: React.FormEvent<HTMLElement>) => {
    if (e.target.value === '') {
      setDisabledFind(true);
    } else {
      setDisabledFind(false);
      replaceObj.value = e.target.value;
      setReplaceObj(replaceObj);
    }
  };
  const _onChangeReplaceInput = (e: React.FormEvent<HTMLElement>) => {
    // alert(e.target.value)
    if (e.target.value === '') {
      setDisabledReplace(true);
    } else {
      setDisabledReplace(false);
      replaceObj.replaceValue = e.target.value;
      setReplaceObj(replaceObj);
    }
  };

  const _onChangeFindText = () => {
    if (replaceObj.value) {
      // var beforeFind =  props.exportInstance.search.find(replaceObj.value);
      // console.log(beforeFind);
      if (replaceObj.matchcase) {
        props.exportInstance.documentEditor.search.findAll(
          replaceObj.value,
          'CaseSensitive'
        );
        setSearchOccurence(
          props.exportInstance.documentEditor.search.searchResults.length
        );
      } else if (replaceObj.entrieCell) {
        props.exportInstance.documentEditor.search.findAll(
          replaceObj.value,
          'WholeWord'
        );
        setSearchOccurence(
          props.exportInstance.documentEditor.search.searchResults.length
        );
      } else {
        props.exportInstance.documentEditor.search.findAll(replaceObj.value);
        setSearchOccurence(
          props.exportInstance.documentEditor.search.searchResults.length
        );
      }
      //var afterCell = props.exportInstance.search.find(replaceObj.value);
      if (
        props.exportInstance.documentEditor.searchModule.searchResults
          .length === 0
      ) {
        alert('Item not found');
      }
    }
  };

  const _onChangeReplaceText = () => {
    //   if(replaceObj.replaceValue && replaceObj.value){
    //   props.referenceObjectState.replace({replaceValue: replaceObj.replaceValue, replaceBy: 'replace', value: replaceObj.value});
    // }
    if (replaceObj.replaceValue && replaceObj.value) {
      //props.referenceObjectState.replace({replaceValue: replaceObj.replaceValue, replaceBy: 'replaceall', value: replaceObj.value});
      //props.exportInstance.searchModule.findAll(replaceObj.value);
      if (searchOccurence > 0) {
        props.exportInstance.documentEditor.searchModule.searchResults.replace(
          replaceObj.replaceValue
        );
      }
    }
  };
  const _onChangeReplaceAllText = () => {
    if (replaceObj.replaceValue && replaceObj.value) {
      //props.referenceObjectState.replace({replaceValue: replaceObj.replaceValue, replaceBy: 'replaceall', value: replaceObj.value});
      props.exportInstance.documentEditor.searchModule.findAll(
        replaceObj.value
      );
      if (
        props.exportInstance.documentEditor.searchModule.searchResults.length >
        0
      ) {
        props.exportInstance.documentEditor.searchModule.searchResults.replaceAll(
          replaceObj.replaceValue
        );
      }
    }
  };

  const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
  };

  return (
    <div>
      <Modal
       // titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        isBlocking={false}
        // onDismiss={hideModal}
        onDismiss={() => {
          props.exportInstance.documentEditor.searchModule.searchResults.clear();
          props.actions.replaceAction.isOpenReportReplace({ message: false });
        }}
        isModeless={false}
        isDarkOverlay={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Find & Replace</span>
          <div style={iconButtonStyles.root}>
            <IconButton
              styles={iconHelpButtonStyles}
              iconProps={helpIcon}
              ariaLabel="Help popup modal"

              // onClick={hideModal}
            />

            <IconButton
              //styles={iconButtonStyles}

              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              // onClick={hideModal}

              onClick={(e) => {
                // e.target.value = "";

                // replaceObj.value = "";

                setDisabledFind(true);

                setDisabledReplace(true);

                props.exportInstance.documentEditor.searchModule.searchResults.clear();

                props.actions.replaceAction.isOpenReportReplace({
                  message: false,
                });
              }}
            />
          </div>
        </div>

        <div className={contentStyles.body}>
          <Stack horizontal tokens={stackTokens}>
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
                defaultChecked="Match case"
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Find Next"
                className={`text-block`}
                onClick={() => _onChangeFindText()}
                allowDisabledFocus
                checked={checked}
                disabled={disabledFind}
              />
              <DefaultButton
                text="Replace"
                className={`text-block`}
                onClick={() => _onChangeReplaceText()}
                allowDisabledFocus
                disabled={disabledReplace}
                checked={checked}
              />
              <DefaultButton
                text="Replace All"
                className={`text-block`}
                onClick={() => _onChangeReplaceAllText()}
                allowDisabledFocus
                disabled={disabledReplace}
                checked={checked}
              />
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={() => {
                  setDisabledFind(true);
                  setDisabledReplace(true);
                  props.exportInstance.documentEditor.searchModule.searchResults.clear();
                  props.actions.replaceAction.isOpenReportReplace({
                    message: false,
                  });
                }}
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
    isOpenReportReplace: state.replaceReducer.isOpenReportReplace,
    referenceObjectState: state.instanceReducer.instance,
    exportInstance: state.instanceReducer.exportInstance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      replaceAction: bindActionCreators(replaceAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReplaceReport);

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
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
const iconHelpButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    position: 'relative',
    top: '2px',
    left: '6px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
