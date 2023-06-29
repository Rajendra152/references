import * as React from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  Toggle,
  ContextualMenu,
  IIconProps,
  TextField,
  Stack,
  IStackTokens,
  IStackStyles,
  Label,
  Checkbox,
  IStackProps,
} from '@fluentui/react';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from '@fluentui/react/lib/Dropdown';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { createNewClient } from '../../../../services/RedisServices'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formatCellAction from '../../../../store/Worksheet/FormatCell/actions';

import { CSSProperties, useEffect, useState } from 'react';
const dragOptions: IDragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };

export interface StylesDictionary {
  [Key: string]: CSSProperties;
}

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const stackTokens = { childrenGap: 20 };

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200 } },
};

const stackStyles: IStackStyles = {
  root: {
    // marginBottom: 10,
    // marginTop: 10,
    width: 'auto',
  },
};

// Token initialization
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const sectionStackTokens: IStackTokens = { childrenGap: 15 };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 150 } };

const dropdownControlledExampleOptions = [
  {
    key: 'fruitsHeader',
    text: 'Fruits',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  {
    key: 'vegetablesHeader',
    text: 'Vegetables',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

const MultipleControl: React.FunctionComponent = (props) => {
  var redis = require('redis');
 
  const publisher = createNewClient()

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(true);
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [versusLevelTitle, setversusLevelTitle] = useState('');
  const [versusLevel, setversusLevel] = useState([]);
  const [versusLevel2, setversusLevel2] = useState([]);
  const [versusLevelIndex, setversusLevelIndex] = useState(0);

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setSelectedItem(item);
  };
  useEffect(() => {
    // Update the document title using the browser API
    console.log('inside use effect multiple control level 1');
    console.log(props.formatCellState.isOutput);
    console.log(props.modalData);
    console.log(props.modalData);
    if (props.modalData.length !== 0) {
      console.log('inside if');
      console.log(props.modalData.OnlyVersusControl.VersusLevel2);
      console.log(props.modalData.OnlyVersusControl.VersusLevel2);
      setversusLevelTitle(props.modalData.OnlyVersusControl.VersusLevel1Title);
      setversusLevel(props.modalData.OnlyVersusControl.VersusLevel1);
      setversusLevel2(props.modalData.OnlyVersusControl.VersusLevel2);
    }
  });

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds]
  );

  const multipleComparisonStyle: StylesDictionary = {
    sectionDivider: {
      marginBottom: 10,
    },
    gapBetweenColumns: {
      padding: 5,
    },
    wrapperContainer: {
      border: '1px solid #efefef',
      padding: 10,
      margin: '0 0 15px 0',
    },
    fieldSet: {
      margin: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#efefef',
    },
    legend: {
      position: 'relative',
      top: -35,
      left: -3,
      backgroundColor: '#FFFFFF',
      width: 'fit-content',
    },
    copy: {
      color: 'black',
    },
    //New Style Declaration
    titleText: {
      position: 'relative',
      top: -33,
      backgroundColor: 'white',
      padding: '4px 10px',
      fontSize: 16,
      width: 'fit-content',
    },
    title: {
      position: 'relative',
      top: 15,
      height: 20,
    },
    defaultbutton: {
      color: 'black',
    },
    textField: {
      height: 200,
      width: 10,
    },
  };
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');
  // const items = versusLevel && versusLevel.map(item => {
  //   return <li onClick={() => handleClick(item)} className="item-text" style={{ padding: '2px 0px' }}>
  //     {item}
  //     </li>
  // })
  const items =
    versusLevel &&
    versusLevel.map((item, index) => (
      <li
        onClick={() => handleClick(index)}
        className="item-text"
        style={{ padding: '2px 0px' }}
      >
        {item}
      </li>
    ));
  const handleClick = (index) => {
    console.log('item contains index', index);
    setversusLevelIndex(index);
    // console.log('item contains',item)
  };
  const cancelSubmit = () => {
    // console.log('indisde submit cancel');
    // console.log('publishing data to user-response!');
    // let outputFormat = props.formatCellState.isOutput;
    // console.log(outputFormat);
    // outputFormat.push(versusLevelIndex);
    // console.log(outputFormat);
    // let test = outputFormat.join(',');
    // console.log(test);
    // let newArray = [];
    // newArray[0] = test;
    // console.log(newArray);
    let cancelValue="0;"
    publisher.publish('STITWITHDATA_RES', cancelValue);

    props.actions.formatCellAction.isOpenMultipleControl({
      message: false,
    });
  };

  const finishSubmit = () => {
    console.log('indisde finsih ');
    console.log('publishing data to user-response!');
    let outputFormat = props.formatCellState.isOutput;
    console.log(outputFormat);
    outputFormat.push(versusLevelIndex);
    console.log(outputFormat);
    let test = outputFormat.join(',');
    console.log(test);
    let newArray = [];
    newArray[0] = test;
    console.log(newArray);

    var newArr = newArray.join(',').replace(/,/g, ';').split();
    console.log(newArr);
    publisher.publish('STITWITHDATA_RES', newArr);

    props.actions.formatCellAction.isOpenMultipleControl({
      message: false,
    });
  };
  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={props.isOpen}
        onDismiss={() =>
          props.actions.formatCellAction.isOpenMultipleControl({
            message: false,
          })
        }
        isBlocking={true}
        isModeless={true}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Multiple Comparison Options</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() =>
              props.actions.formatCellAction.isOpenMultipleControl({
                message: false,
              })
            }
          />
        </div>

        <div className={contentStyles.body}>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <Label>Please select a control group and click Finish</Label>
              <div className="ms-Grid-col ms-sm6 ms-xl7">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <Label>{versusLevelTitle}</Label>
                  <ul className={contentStyles.boxWrap}>{items}</ul>
                </Stack>
              </div>
            </div>
            {/* <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-xl12">
                <div className="ms-Grid-col ms-sm3 ms-xl5">
                  <Label>Suggested Test:</Label>
                
                </div>
                <div className="ms-Grid-col ms-sm9 ms-xl7" style={{marginLeft:"-60px"}}>
                <Dropdown
                    label=""
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChange}
                    placeholder="Select an option"
                    options={dropdownControlledExampleOptions}
                    styles={dropdownStyles}
                    />
                 
                </div>
              </div>
            </div> */}
            {/* <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-xl7">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                <Label>Description</Label>
                  <TextField
                    inputClassName={multipleComparisonStyle.textField}
                    multiline
                    readOnly
                    defaultValue="Dunn's Test is used for all pairwise comparisons"
                  />
                </Stack>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-xl5" style={{marginTop: "20px"}}>
                <Label>Comparison Type</Label>
                
                <input type="radio" id="html" name="fav_language" value="HTML"/>
                <label htmlFor="html">All Pairwise</label><br></br>
                <input type="radio" id="html" name="fav_language" value="HTML"/>
                <label htmlFor="html">Versus Control</label><br></br>
              </div>
            </div> */}
          </div>
          <br />
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <DefaultButton
                text="Help"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={() => cancelSubmit()}
                allowDisabledFocus
                disabled={disabled}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Back"
                className={`text-block`}
                onClick={() => {
                  props.actions.formatCellAction.isOpenMultipleControl({
                    message: false,
                  });
                  props.actions.formatCellAction.isOpenMultipleComparisons({
                    message: true,
                  });
                }}
                allowDisabledFocus
                disabled={disabled}
              />
            </Stack>
            <Stack {...columnProps}>
              {disabled}
              <DefaultButton
                text="Next"
                disabled={versusLevel2 === undefined ? true : false}
                // disabled={disabled}
                className={`text-block`}
                onClick={() => {
                  props.actions.formatCellAction.isOpenMultipleControlL2({
                    message: true,
                  });
                  props.actions.formatCellAction.isOpenMultipleControl({
                    message: false,
                  });
                }}
                allowDisabledFocus
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Finish"
                className={`text-block`}
                onClick={() => finishSubmit()}
                allowDisabledFocus
                disabled={disabled}
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
    alignItems: 'stretch',
    width:'502px',
    height: '380px',
  },
  boxWrap: {
    display: 'inline-block',
    border: '1px solid #000',
    padding: '20px',
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
    flex: '4 4 auto',
    minWidth: '300px',
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

function mapStateToProps(state) {
  return {
    formatCellState: state.formatCellReducer,
    referenceObjectState: state.instanceReducer.instance,
    range: state.instanceReducer.range,
    optionsState: state.optionsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MultipleControl);
