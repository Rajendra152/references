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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formatCellAction from '../../../../store/Worksheet/FormatCell/actions';
import { createNewClient } from '../../../../services/RedisServices'
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

// const dropdownControlledExampleOptions = [
// ];
const SuggestedType = [
  { key: '0', text: 'Holm-Sidak' },
  { key: '1', text: 'Tukey' },
  { key: '2', text: 'Student-Newman-Keuls' },
  { key: '3', text: 'Dunnett' },
  { key: '4', text: 'Bonferroni' },
  { key: '6', text: 'Fisher LSD' },
  { key: '7', text: 'Duncan Multiple Range' },
];

const MultipleComparison: React.FunctionComponent = (props) => {
  var redis = require('redis');
  const publisher = createNewClient()
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(true);
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const [isChecked, setIsChecked] = useState(false);
  const [treatmentvalue, settreatment] = useState('');
  const [
    dropdownControlledExampleOptions,
    setdropdownControlledExampleOptions,
  ] = useState([]);
  const [factorControl, setFactorControl] = useState([]);
  const [comparisonType, setComparisonType] = useState([]);
  const [checkBoxSelected, setcheckBoxSelected] = useState(true);
  const [selectedSuggestedTest, setselectedSuggestedTest] = useState(0);
  const [ComparisonTypedropdown, setComparisonTypedropdown] = useState(0);
  const [description, setdescription] = useState([]);
  const [output, setOutput] = useState(['1', '1', '1', '0', '0', '1', '0']);
  const [disabled, setDisabled] = useState(false);
  const [factorIndexValue, setfactorIndexValue] = useState('1');
  const [disablednext, setdisablednext] = useState(true);
  const [isNext, setNext] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [disablePairWise, setdisablePairWise] = useState(false);
  useEffect(() => {
    console.log('inside use effect');
    console.log(props.outputFormat);
    if (props.modalData.length !== 0) {
      var treatments =
        'Treatments are significantly different : ' + props.modalData.Treatment;
      settreatment(treatments);
      console.log(props.modalData);
      //console.log(typeof props.modalData.FactorControl)
      setFactorControl(props.modalData.FactorControl);
      console.log(props.modalData.ComparisonType.Options)
      setComparisonType(props.modalData.ComparisonType.Options);
      setdropdownControlledExampleOptions(
        props.modalData.Suggested.SuggestedType
      );
      setselectedSuggestedTest(props.modalData.Suggested.SuggestedSelection);
      //alert(props.modalData.ComparisonType.ComparisonSelection)
      if(props.modalData.ComparisonType.ComparisonSelection == 0){
       // alert("inside if");
        //alert(disablednext);
       // setdisablednext(true)
       setNext(true)
        //alert(disablednext);
      }
      console.log(props.modalData.ComparisonType.ComparisonSelection) //selected index
      setComparisonTypedropdown(
        props.modalData.ComparisonType.ComparisonSelection
      );
      setdescription(
        props.modalData.Description[
          props.modalData.Suggested.SuggestedSelection
        ]
      );
      console.log(props.modalData.OnlyVersusControl.VersusLevel1Title);
      if (props.modalData.OnlyVersusControl.VersusLevel1Title !== undefined) {
        //setNext(false);
      }
    }
  }, [props.modalData]);
  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setSelectedItem(item);
  };

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
      height: 100,
    },
  };
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');

  const handleCheckBox = (event, index) => {
    console.log(checkBoxSelected);
    if (checkBoxSelected === true) {
      setcheckBoxSelected(false);
      setfactorIndexValue("0");
    } else {
      setcheckBoxSelected(true);
      setfactorIndexValue("1");
    }
    console.log(index + 'index');
  };
  const handleComaprsionValue = (event, index) => {
    console.log(index)
    if(index == 1){
      setNext(false)
    }else if(index == 0){
      setNext(true)
    }else{
      
    }
    console.log(event);
    console.log(index);
    setComparisonTypedropdown(index);
  };
  const handleSuggestedTest = (e) => {
    console.log(e.target.value);
    setdescription(props.modalData.Description[e.target.value]);
    setselectedSuggestedTest(e.target.value);
    if(e.target.value == 3){
      setComparisonTypedropdown(1)
      setNext(false);
      setFinish(true);
      setdisablePairWise(true)
    }else{
      setNext(false);
      setFinish(false);
      setdisablePairWise(false)
    }
  };
  const submitDataFinish = () => {
    console.log('indisde submit');
    console.log('publishing data to user-response!');
    var outputFormat = ['1', '0', '0', '0'];
    console.log(outputFormat);
    console.log(selectedSuggestedTest);
    let suggestedTest = selectedSuggestedTest.toString();
    console.log(suggestedTest,+"suggestedTest")
    outputFormat.splice(1, 1, suggestedTest);
    let factorSelected = factorIndexValue.toString();
    console.log(factorSelected,+"factorSelected")
    outputFormat.splice(2, 1, factorSelected);
    let comparsionType = ComparisonTypedropdown.toString();
    console.log(comparsionType,+"comparsionType");
    outputFormat.splice(3, 1, comparsionType);
    console.log(outputFormat);
    let test = outputFormat.join(',');
    console.log(test);
    let newArray = [];
    newArray[0] = test;
    console.log(newArray);
    var newArr = newArray.join(',').replace(/,/g, ';').split();
    console.log(newArr+"newArr")
    // let test1=["1", "1","1", "0"]
    // var newArr1 = test1.join(',').replace(/,/g, ';').split();
    // console.log(newArr1+"newArr")
    publisher.publish('STITWITHDATA_RES', newArr);
    props.actions.formatCellAction.isOpenMultipleComparisons({
      message: false,
    });
  };
  const submitCancel = () => {
    // console.log('indisde submit cancel');
    // console.log('publishing data to user-response!');
    // var outputFormat = ['0', '0', '0', '0'];
    // console.log(outputFormat);
    // console.log(selectedSuggestedTest);
    // let suggestedTest = selectedSuggestedTest.toString();
    // outputFormat.splice(1, 1, suggestedTest);
    // let factorSelected = factorIndexValue.toString();
    // outputFormat.splice(2, 1, factorSelected);
    // let comparsionType = ComparisonTypedropdown.toString();
    // outputFormat.splice(3, 1, comparsionType);
    // console.log(outputFormat);
    // let test = outputFormat.join(',');
    // console.log(test);
    // let newArray = [];
    // newArray[0] = test;
    // console.log(newArray);
    // var newArr = newArray.join(',').replace(/,/g, ';').split();
    // console.log(newArr)
    let cancelValue="0;"
    publisher.publish('STITWITHDATA_RES', cancelValue);

    props.actions.formatCellAction.isOpenMultipleComparisons({
      message: false,
    });
  };
  const nextPage = () => {
    console.log('indisde next');
    console.log('passng the values to next page');
    var outputFormat = ['0', '0', '0', '0'];
    console.log(outputFormat);
    console.log(selectedSuggestedTest);
    let suggestedTest = selectedSuggestedTest.toString();
    outputFormat.splice(1, 1, suggestedTest);
    let factorSelected = factorIndexValue.toString();
    outputFormat.splice(2, 1, factorSelected);
    let comparsionType = ComparisonTypedropdown.toString();
    outputFormat.splice(3, 1, comparsionType);
    console.log(outputFormat);
    //props.outputFormat=outputFormat;
    props.actions.formatCellAction.isOutputFormatAvaialble({
      message: outputFormat,
    });
    props.actions.formatCellAction.isOpenMultipleComparisons({
      message: false,
    });
    props.actions.formatCellAction.isOpenMultipleControl({
      message: true,
    });
  };
  return (
    <div>
      <Modal
      style="width:502px"
        titleAriaId={titleId}
        isOpen={props.isOpen}
        onDismiss={() =>
          props.actions.formatCellAction.isOpenMultipleComparisons({
            message: false,
          })
        }
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
              props.actions.formatCellAction.isOpenMultipleComparisons({
                message: false,
              })
            }
          />
        </div>

        <div className={contentStyles.body}>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-xl7">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <TextField
                    value={treatmentvalue}
                    inputClassName={multipleComparisonStyle.textField}
                    multiline
                  />
                </Stack>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-xl5">
                <Label>Select Factors to compare</Label>
                {/* {props.modalData &&
	                props.modalData.FactorControl.map((factor)=>{
            	    <Checkbox label={factor.name} ></Checkbox>
	                })
                  } */}
                {/* {(props.modalData.FactorControl !== null || props.modalData.FactorControl !== undefined) &&
          Object.keys(props.modalData.FactorControl).map((oneKey,i)=>{
            return (
                <li key={i}>{props.modalData.FactorControl[oneKey]}</li>
              )
          })
        } */}

                {/* {factorControl && factorControl.map(item => (
          <Checkbox label={item.Name}  ></Checkbox>
          
        ))} */}

                {factorControl.map((item, index) => (
                  <div>
                    <input
                      name={item.Check}
                      type="checkbox"
                      //checked={item.Check === "1" ? true :false}
                      checked={checkBoxSelected}
                      onChange={(event) => handleCheckBox(event, index)}
                    />
                    {item.Name}
                  </div>
                ))}
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-xl12">
                <div className="ms-Grid-col ms-sm3 ms-xl5">
                  <Label>Suggested Test:</Label>
                </div>
                <div
                  className="ms-Grid-col ms-sm9 ms-xl7"
                  style={{ marginLeft: '-60px' }}
                >
                  {/* <Dropdown
                    label=""
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChange}
                    placeholder="Select an option"
                    options={SuggestedType}
                    styles={dropdownStyles}
                    /> */}
                  <select
                    style={{ height: '31px' }}
                    onChange={() => handleSuggestedTest(event)}
                  >
                    {dropdownControlledExampleOptions.map((item, index) => (
                      <option
                        value={index}
                        selected={
                          selectedSuggestedTest == index ? 'selected' : ''
                        }
                        onChange={(event) => handleSuggestedTest(event, index)}
                      >
                        {' '}
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-xl7">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <Label>Description</Label>
                  <TextField
                    inputClassName={multipleComparisonStyle.textField}
                    multiline
                    readOnly
                    value={description}
                  />
                </Stack>
              </div>
              <div
                className="ms-Grid-col ms-sm6 ms-xl5"
                style={{ marginTop: '20px' }}
              >
                <Label>Comparison Type</Label>

                {/* <input type="radio" id="html" name="fav_language" value="HTML"/>
                <label htmlFor="html">All Pairwise</label><br></br>
                <input type="radio" id="html" name="fav_language" value="HTML"/>
                <label htmlFor="html">Versus Control</label><br></br> */}

                {/* {comparisonType && comparisonType.map(item => (
         
            <>
              <input type="radio" readOnly name="comparsion" /> 
              <label htmlFor="html">{item}</label><br></br>
            </>
         
        ))} */}
                {comparisonType.map((item, index) => (
                  <div>
                    <input
                      checked={ComparisonTypedropdown == index ? true : false}
                      type="radio"
                      name="comparsion"
                      disabled={disablePairWise && index == 0}
                      onChange={(event) => handleComaprsionValue(event, index)}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <DefaultButton
                text="Help"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                //onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={() => submitCancel()}
                allowDisabledFocus
              />
            </Stack>
            {/* <Stack {...columnProps}>
              <DefaultButton
                text='Back'
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenMultipleComparisons({
                    message: false,
                  })
                }
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
              />
            </Stack> */}
            <Stack {...columnProps}>
              <DefaultButton
                text="Next"
                className={`text-block`}
                onClick={() => {
                  nextPage();
                }}
                disabled={isNext}
              />
            
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Finish"
                className={`text-block`}
                onClick={() => submitDataFinish()}
                allowDisabledFocus
                disabled={isFinish}
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
    height: '462px',
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
export default connect(mapStateToProps, mapDispatchToProps)(MultipleComparison);
