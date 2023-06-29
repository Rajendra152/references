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
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as deleteAction from "../../../store/Worksheet/Delete/actions";

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
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const BulkDeleteCol: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const { disabled, checked } = props;
  const [bulkDelete, setBulkDelete] = useState({});
  const _onChangeCol = (option: IDropdownOption, index?: number) => {
    console.log(`The option has been changed to ${option}.`);
    bulkDelete.before = parseInt(option.key);
    setBulkDelete(bulkDelete);
  }
  const _onChangeFindInput = (e: React.FormEvent<HTMLElement>) =>{
    console.log(`The option has been changed to ${e.target.value}.`);
    bulkDelete.deleteCol = e.target.value;
    setBulkDelete(bulkDelete);
  }

  const _handleDeleteColumn = () => {
    console.log("_handleDeleteCols")
    // console.log(typeof( bulkInsert.atRow) , typeof(bulkInsert.deleteRow),  parseInt(bulkInsert.atRow - 1)+parseInt(bulkInsert.deleteRow),  " bulkInsert.before+bulkInsert.insertRow",  parseInt(bulkInsert.atRow - 1)+parseInt(bulkInsert.deleteRow))
      props.referenceObjectSpreadSheet.instance.delete( bulkDelete.before,  parseInt(bulkDelete.before - 1)+parseInt(bulkDelete.deleteCol), "Column")
      props.actions.deleteAction.isOpenDelCol({message: false})
  }
  return (
    <div>

      {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Delete Col" /> */}
      <Modal
        titleAriaId={'title1'}
        // isOpen={isModalOpen}
        //onDismiss={hideModal}
        isOpen={props.isOpen}
        onDismiss={()=>props.actions.deleteAction.isOpenDelCol({message: false})}
        isModeless={true}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={'title1'}>Delete Columns</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            // onClick={hideModal}
            onClick={()=>props.actions.deleteAction.isOpenDelCol({message: false})}
          />
        </div>

        <div className={contentStyles.body}>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
               <TextField
                  label="Delete"
                  placeholder="1 Columns"
                  onChange={(e)=>_onChangeFindInput(e)}
                  step={1}
                  style={{color: '#333'}}
                />
                <Dropdown
                label="From"
                placeholder="Column"
                options={options}
                styles={dropdownStyles}
                onChanged={_onChangeCol}
              />
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
                onClick={_handleDeleteColumn}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                // onClick={hideModal}
                onClick={()=>props.actions.deleteAction.isOpenDelCol({message: false})}
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
function mapStateToProps(state) {
  return {
    deleteState: state.deleteReducer,
    referenceObjectSpreadSheet: state.instanceReducer,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteAction: bindActionCreators(deleteAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BulkDeleteCol)
