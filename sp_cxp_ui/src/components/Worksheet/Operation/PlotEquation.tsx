import React, { useState, useEffect, CSSProperties } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  PrimaryButton,
  Toggle,
  ContextualMenu,
  IconButton,
  IIconProps,
  IStackTokens,
} from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Image, IImageProps } from '@fluentui/react/lib/Image';
import {
  Stack,
  IStackProps,
  IStackStyles,
} from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { List, ScrollToMode, IList } from 'office-ui-fabric-react/lib/List';
import { useConst } from '@uifabric/react-hooks';
import { CustomDetailsList } from '../CustomDetailsList';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from 'office-ui-fabric-react/lib/Dropdown';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formatCellAction from '../../../store/Worksheet/FormatCell/actions';
import { getRangeIndexes } from '@syncfusion/ej2-react-spreadsheet';
import Helpbutton from '../../../HelpButton';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: '100%' },
};
const stackStyles: IStackStyles = {
  root: {
    marginBottom: 10,
    marginTop: 10,
  },
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

// Example formatting
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
};

export interface StylesDictionary {
  [Key: string]: CSSProperties;
}
const dropdownControlledName = [
  { key: '1', text: 'Untitled' },
];
const dropdownControlledFunction = [
  { key: '1', text: 'Select From List' },
];
const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: '100%' } };
const PlotEquation: React.FunctionComponent = (props) => {
  console.log('propsasd', props);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );

  const [lastHeader, setLastHeader] = useState('Data');
  const [type, setType] = useState('Numeric');

  const [dateFormat, setDateFormat] = useState('1');
  const [timeFormat, setTimeFormat] = useState('1');
  const [decimal, setDecimal] = useState(4);
  const [columnList, setColumnList] = useState([
    {
      key: 1,
      name: 'Numeric',
      value: 'Numeric',
      index: 1,
      selected: true,
    },
    {
      key: 2,
      name: 'Text',
      value: 'Text',
      index: 2,
      selected: false,
    },
    {
      key: 3,
      name: 'Date and Time',
      value: 'Date and Time',
      index: 3,
      selected: false,
    },
  ]);
  const titleId = useId('title');

  useEffect(() => {
    setDisplayFormatVal();
  }, [dateFormat, timeFormat]);

  const setDisplayFormatVal = () => {
    // let selection = props.activeCell;
    // const row = selection['start']['i'];
    // const col = selection['start']['j'];
    // let selectedDate;
    // let selectedTime;
    // if (element && element.dateFormat && ((element.dateFormat !== dateFormat) || (element.timeFormat !== timeFormat))) {
    //   // selectedDate = dateOptions.filter(({key}) => key === element.dateFormat);
    //   // selectedTime = timeOptions.filter(({key}) => key === element.timeFormat);
    //   // setDateFormat(element.dateFormat);
    //   // setTimeFormat(element.timeFormat);
    // } else {
    // selectedDate = dateOptions.filter(({ key }) => key === dateFormat);
    // selectedTime = timeOptions.filter(({ key }) => key === timeFormat);
    // }
    // if (selectedDate)
    // const format = selectedDate[0].text + ' ' + selectedTime[0].text;
    // const displayFormat = moment().format(format);
    // setSampleFormat(displayFormat);
  };


  const selectType = (i) => {
    const data = [...columnList];
    data.forEach((obj) => {
      if (obj.index === i) {
        obj.selected = true;
        setType(obj.name);
      } else {
        obj.selected = false;
      }
    });
    setColumnList(data);
  };



  // function addZeroes(num) {
  //   // Convert input string to a number and store as a variable.
  //   var value = Number(num);
  //   // Split the input string into two arrays containing integers/decimals
  //   var res = num.split('.');
  //   // If there is no decimal point or only one decimal place found.
  //   if (res.length == 1 || res[1].length < 3) {
  //     // Set the number to specified decimal places
  //     value = value.toFixed(decimal);
  //   }
  //   // Return updated or original number.
  //   return value;
  // }

  function addZeroes(num) {
    let val = '';
    while (num != 0) {
      val = val + '0';
      num--;
    }
    return val;
  }

  //This method is used for implementing the functionality of Format Cell operations
  const cellFormatter = (data) => {
    let modVal;
    let modRes;
    let index;
    let range = props.range.range;
    console.log('Inside the new formatter', data);
    if (data.lastHeader === 'Rows and Columns') {
      console.log('Rows and Columns');

      console.log('Inside cell formatter', range);
      console.log('Selected Height & Weight', data.height, data.width);
      //props.referenceObjectState.autoFit(range);
      index = getRangeIndexes(range);
      // for rows iteration
      for (let i = index[0]; i <= index[2]; i++)
        props.referenceObjectState.setRowHeight(data.height, i, 0);
      // for column iteration
      for (let j = index[1]; j <= index[3]; j++)
        props.referenceObjectState.setColWidth(data.width, j, 0);

      console.log(index);
      //
      //
      props.actions.formatCellAction.isOpenPlotEquation({
        message: false,
      });
    } else if (data.lastHeader === 'Data') {
      console.log('Data contains', data);
      if (data.type === 'Numeric' && data.decimal) {
        modRes = addZeroes(decimal);
        if (data.display === '1' || data.display === '3') {
          console.log('Decimal number');
          modRes = '0.' + modRes;
          console.log('Zeroes Added', modRes);
          props.referenceObjectState.numberFormat(modRes, range);
          // props.referenceObjectState.getData(range).then((data) =>
          //   data.forEach((data) => {
          //     modVal = data.value.toString();

          //     console.log('Fetched values', modVal);
          //     console.log('Decimal place is', decimal);

          //     console.log('Adding decimal places in ranges', modVal, range);

          //     // props.referenceObjectState.updateCell({value:res},range)
          //   })
          // );
          props.actions.formatCellAction.isOpenPlotEquation({
            message: false,
          });
        }
        if (data.display === '2') {
          console.log('Value of modRes', modRes);
          modVal = '0.00E' + modRes;
          console.log('Value of modVal', modVal);
          props.referenceObjectState.numberFormat('0.00E+00', range);
          props.actions.formatCellAction.isOpenPlotEquation({
            message: false,
          });
        }
        if (data.display === '4') {
          let val;
          props.referenceObjectState.getData(range).then((data) =>
            data.forEach((data) => {
              val = data.value.toString();
              let modValue = val.split('.');
              console.log('Modified Value is', modValue);
              props.referenceObjectState.numberFormat(modValue, range);
              props.actions.formatCellAction.isOpenPlotEquation({
                message: false,
              });
            })
          );
        }
        //setDecimal(data.decimal);
      }

      if (data.type === 'Date and Time') {
        if (data.dateFormat) {
          console.log('Date Format on range', range);
          props.referenceObjectState.numberFormat('mm-dd-yyyy', range);

          props.actions.formatCellAction.isOpenPlotEquation({
            message: false,
          });
        }

        // if (data.timeFormat) {
        //   console.log('Time Format');
        //   props.referenceObjectState.numberFormat('h:mm:ss AM/PM', range);
        //   props.actions.formatCellAction.isOpenPlotEquation({
        //     message: false,
        //   });
        // }
      }

      if (data.type === 'Text') {
        console.log('Text selected');
        props.referenceObjectState.wrap(range, true);
        props.actions.formatCellAction.isOpenPlotEquation({
          message: false,
        });
      }
    }
  };

  const plotEquationStyle: StylesDictionary = {

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

      paddingBottom: 10,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#efefef'
    },

    legend: {
      position: 'relative',
      top: -35,
      left: -3,
      backgroundColor: '#FFFFFF',
      width: 'fit-content'
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
      color: 'black'
    },

    textFeild: {
      height: 100,
    },

    radio: {
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center'
    }
  };

  const [selectName, setSelectName] = React.useState<IDropdownOption>();
  const [selectFunction, setSelectFunction] = React.useState<IDropdownOption>();
  const [nameTextName2D, setNameTextName2D] = React.useState('');
  const [minimumTextName2D, setMinimumTextName2D] = React.useState('');
  const [maximumTextName2D, setMaximumTextName2D] = React.useState('');
  const [intervalsTextName2D, setIntervalsTextName2D] = React.useState('');
  const [nameTextName3D, setNameTextName3D] = React.useState('');
  const [minimumTextName3D, setMinimumTextName3D] = React.useState('');
  const [maximumTextName3D, setMaximumTextName3D] = React.useState('');
  const [intervalsTextName3D, setIntervalsTextName3D] = React.useState('');

  const onChangeMaximumTextName3D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setMaximumTextName3D(newValue || '');
    },
    [],
  );
  const onChangeIntervalsTextName3D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setIntervalsTextName3D(newValue || '');
    },
    [],
  );
  const onChangeNameTextName3D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setNameTextName3D(newValue || '');
    },
    [],
  );
  const onChangeMinimumTextName3D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setMinimumTextName3D(newValue || '');
    },
    [],
  );
  const onChangeMaximumTextName2D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setMaximumTextName2D(newValue || '');
    },
    [],
  );
  const onChangeIntervalsTextName2D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setIntervalsTextName2D(newValue || '');
    },
    [],
  );
  const onChangeNameTextName2D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setNameTextName2D(newValue || '');
    },
    [],
  );
  const onChangeMinimumTextName2D = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setMinimumTextName2D(newValue || '');
    },
    [],
  );
  const onChangeName = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectName(item);
  };
  const onChangeFunction = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectFunction(item);
  };
  const _plotHandler = () => {
    alert('plot button clicked')
  }
  const _addAsHandler = () => {
    alert('Add as button clicked')
  }


  const sectionStackTokens: IStackTokens = { childrenGap: 15 };
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    setLastHeader(item.props.headerText);
  };

  return (
    <div>
      <Modal
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        onDismiss={() =>
          props.actions.formatCellAction.isOpenPlotEquation({ message: false })
        }
        isModeless={false}
        isBlocking={true}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Plot Equation</span>
          <div className="ms-Grid " dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 padding">
                {/* this is mapped to parent  */}
                <Helpbutton nodeId="Reference" />
              </div>
              <div className="ms-Grid-col ms-sm6 padding">
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={() =>
                    props.actions.formatCellAction.isOpenPlotEquation({
                      message: false,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className={contentStyles.body}>
          <Pivot
            aria-label="Basic Pivot Example"
            className="FormatContainer"
            onLinkClick={getSelectedItem}
          >
            <PivotItem
              headerText="Equation"
              headerButtonProps={{
                'data-order': 1,
              }}
            >
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div style={plotEquationStyle.title}>
                    <hr />
                    <p style={plotEquationStyle.titleText}>Equation</p>
                  </div>
                </div>
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <Label>Name</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg10">
                      <Dropdown
                        selectedKey={selectName ? selectName.key : undefined}
                        // eslint-disable-next-line react/jsx-no-bind
                        defaultSelectedKey="1"
                        onChange={onChangeName}
                        options={dropdownControlledName}
                        styles={dropdownStyles}
                      />
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"> <Label>f=</Label></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg10">
                      <TextField multiline autoAdjustHeight />
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg10">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <Label>Functions</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg9">
                          <Dropdown
                            selectedKey={selectFunction ? selectFunction.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeFunction}
                            options={dropdownControlledFunction}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Stack>
                <div className="ms-Grid-row">
                  <div style={plotEquationStyle.title}>
                    <hr />
                    <p style={plotEquationStyle.titleText}>Variables</p>
                  </div>
                </div>
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4"></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">Name</div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">Minimum</div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">Maximum</div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">Intervals</div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      <div style={plotEquationStyle.radio}>
                        <input
                          type="radio"
                          value="2D"
                        />
                        <Label>2D</Label>
                      </div>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={nameTextName2D}
                        onChange={onChangeNameTextName2D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={minimumTextName2D}
                        onChange={onChangeMinimumTextName2D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={maximumTextName2D}
                        onChange={onChangeMaximumTextName2D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={intervalsTextName2D}
                        onChange={onChangeIntervalsTextName2D}
                        styles={textFieldStyles}
                      />
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      <div style={plotEquationStyle.radio}>
                        <input
                          type="radio"
                          value="3D"
                        />
                        <Label>3D</Label>
                      </div>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={nameTextName3D}
                        onChange={onChangeNameTextName3D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={minimumTextName3D}
                        onChange={onChangeMinimumTextName3D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={maximumTextName3D}
                        onChange={onChangeMaximumTextName3D}
                        styles={textFieldStyles}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <TextField
                        //label="Basic controlled TextField"
                        value={intervalsTextName3D}
                        onChange={onChangeIntervalsTextName3D}
                        styles={textFieldStyles}
                      />
                    </div>
                  </div>
                </Stack>
              </div>


            </PivotItem>
            <PivotItem
              headerText="Options"
              headerButtonProps={{
                'data-order': 2,
              }}
            ></PivotItem>
            <PivotItem
              headerText="Library"
              headerButtonProps={{
                'data-order': 3,
              }}
            ></PivotItem>
            <PivotItem
              headerText="Solve"
              headerButtonProps={{
                'data-order': 4,
              }}
            ></PivotItem>

          </Pivot>
        </div>
        <div className={contentStyles.footer}>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                <Stack tokens={sectionStackTokens}>
                  <Stack horizontal horizontalAlign="space-between">
                    <DefaultButton
                      text="Add as"
                      onClick={_addAsHandler}
                    //disabled={true}
                    //checked={true}
                    />
                  </Stack>
                </Stack>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg6">
                <Stack tokens={sectionStackTokens}>
                  <Stack horizontal horizontalAlign="end">
                    <PrimaryButton
                      style={{ marginRight: 20 }}
                      text="Plot"
                      onClick={_plotHandler}
                    //disabled={true}
                    //checked={true}
                    />
                    <DefaultButton
                      style={{ marginRight: 20 }}
                      text="Close"
                      onClick={() =>
                        props.actions.formatCellAction.isOpenPlotEquation({
                          message: false,
                        })
                      }
                    //onClick={_cancelHandler}
                    //disabled={true}
                    //checked={true}
                    />
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={contentStyles.body}>
          <Pivot
            aria-label="Basic Pivot Example"
            className="FormatContainer"
            onLinkClick={getSelectedItem}
          >
            <PivotItem
              headerText="Equation"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'My Files Title',
              }}
            >
              <Stack
                tokens={stackTokens}
                className="settings-container"
                style={{ height: 'auto' }}
              >
                <Stack>
                  <Label>Equation</Label>
                  <Stack>
                    <div className="ms-Grid" dir="ltr">
                      <div className="ms-Grid-row">
                        <div
                          className="ms-Grid-col ms-sm2 ms-xl4"
                          style={{ width: '15%' }}
                        >
                          <Label>Name</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm10 ms-xl8">
                          <Dropdown
                            defaultSelectedKey={nameFormat}
                            options={nameOptions}
                            styles={dropdownStyles}
                            onChanged={_onChangeDate}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div className="ms-Grid-row">
                        <div
                          className="ms-Grid-col ms-sm2 ms-xl4"
                          style={{ width: '15%' }}
                        >
                          <Label>f =</Label>
                        </div>
                        <div
                          className="ms-Grid-col ms-sm10 ms-xl8"
                          style={{ width: '85%' }}
                        >
                          <TextField multiline resizable={false} />
                        </div>
                      </div>
                      <br></br>
                      <div className="ms-Grid-row">
                        <div
                          className="ms-Grid-col ms-sm2 ms-xl4"
                          style={{ width: '25%' }}
                        >
                          <Label>Functions</Label>
                        </div>
                        <div
                          className="ms-Grid-col ms-sm10 ms-xl8"
                          style={{ width: '35%' }}
                        >
                          <Dropdown
                            defaultSelectedKey={nameFormat}
                            options={nameOptions}
                            styles={dropdownStyles}
                            onChanged={_onChangeDate}
                          />
                        </div>
                      </div>
                    </div>
                  </Stack>
                </Stack>
               </Stack>
              <br />
              <Stack className="settings-container" style={{ height: 'auto' }}>
                <Stack>
                  <Label>Variables</Label>
                </Stack>
                <br />
                <div className="ms-Grid" dir="ltr">
                  <div
                    className="ms-Grid-row"
                    style={{ width: '127%', marginLeft: '73px' }}
                  >
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <Label>Name </Label>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <Label>Minimum </Label>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <Label>Maximum </Label>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <Label>Interval </Label>
                    </div>
                  </div>
                  <div className="ms-Grid-row" style={{ width: '127%' }}>
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '15%' }}
                    >
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label htmlFor="html">2D</label>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                  </div>
                  <br></br>
                  <div className="ms-Grid-row" style={{ width: '127%' }}>
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '15%' }}
                    >
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        value="HTML"
                      />
                      <label htmlFor="html">3D</label>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-xl2">
                      <TextField multiline resizable={false} />
                    </div>
                  </div>
                  <br></br>
                </div>
              </Stack>
            </PivotItem>
            <PivotItem headerText="Options">
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">
                  <Stack>
                    <div className="ms-Grid-row">
                      <div
                        className="ms-Grid-col ms-sm6 ms-xl6"
                        // style={{ width: '15%' }}
                      >
                        <Checkbox
                          label="Add to current plot"
                          onChange={onChange}
                        />
                      </div>
                      <div
                        className="ms-Grid-col ms-sm6 ms-xl6"
                        // style={{ width: '15%' }}
                      >
                        <Checkbox
                          label="Create new graph"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="ms-Grid-row">
                      <div
                        className="ms-Grid-col ms-sm2 ms-xl4"
                        style={{ width: '34%' }}
                      >
                        <Label>Trigonometric Units</Label>
                      </div>
                      <div
                        className="ms-Grid-col ms-sm10 ms-xl8"
                        style={{ width: '35%' }}
                      >
                        <Dropdown
                          defaultSelectedKey={'Radians'}
                          placeholder="Radians"
                          options={angleOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeDate}
                        />
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="ms-Grid-row sheet-container">
                  <Label>Definitions</Label>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                      <TextField multiline resizable={false} />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="ms-Grid-row sheet-container">
                  <Label>Parameters</Label>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                      <TextField multiline resizable={false} />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="ms-Grid-row sheet-container">
                  <Label>Results</Label>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <div className="ms-Grid-row">
                      <div
                        className="ms-Grid-col ms-sm2 ms-xl4"
                        style={{ width: '19%' }}
                      >
                        <Label>Columns</Label>
                      </div>
                      <div
                        className="ms-Grid-col ms-sm10 ms-xl8"
                        style={{ width: '30%' }}
                      >
                        <Dropdown
                          defaultSelectedKey={'1'}
                          placeholder="First Empty"
                          options={columnOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeDate}
                        />
                      </div>
                      <div
                        className="ms-Grid-col ms-sm2 ms-xl4"
                        style={{ width: '42%', marginLeft: '28px' }}
                      >
                        <TextField
                          multiline
                          resizable={false}
                          placeholder="x column:
                         y column:"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>
            <PivotItem headerText="Library">
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">

                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '32%' }}
                    >
                      <Label>Equation Category</Label>
                    </div>
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl8"
                      style={{ width: '52%' }}
                    >
                      <Dropdown
                        defaultSelectedKey={'1'}
                        placeholder="Exponential rise to maximum"
                        options={columnOptions}
                        styles={dropdownStyles}
                        onChanged={_onChangeDate}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '32%' }}
                    >
                      <Label>Equation name</Label>
                    </div>
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl8"
                      style={{ width: '52%' }}
                    >
                      <Dropdown
                        defaultSelectedKey={'1'}
                        placeholder="Simple exponent, 3 parameters"
                        options={columnOptions}
                        styles={dropdownStyles}
                        onChanged={_onChangeDate}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '32%' }}
                    >
                      <DefaultButton
                        text="Select"
                        allowDisabledFocus
                        disabled={disabled}
                        checked={checked}
                        className={`text-block`}
                      />
                    </div>
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl8"
                      style={{ width: '52%' }}
                    >
                      <Image
                        {...imageProps}
                        alt="Example with no image fit value and height or width is specified."
                        width={263}
                        height={208}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl10"
                      style={{ width: '72%' }}
                    >
                      <TextField
                        label=""
                        readOnly
                        defaultValue="Path to library"
                      />
                    </div>
                    <div
                      className="ms-Grid-col ms-sm4 ms-x4"
                      style={{ width: '28%' }}
                    >
                      <DefaultButton
                        text="..."
                        allowDisabledFocus
                        disabled={false}
                        checked={checked}
                        className={`text-block`}
                        onClick = {()=>{

                        await fileOpen(props)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>
            <PivotItem headerText="Solve">
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">
                  <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                    <Label>Expression</Label>
                  </Stack>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '15%' }}
                    >
                      <Label>f =</Label>
                    </div>
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl8"
                      style={{ width: '85%' }}
                    >
                      <TextField multiline resizable={false} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">
                  <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                    <Label>Options</Label>
                  </Stack>
                  <div className="ms-Grid-row">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html">Evaluate f at</label>
                  </div>
                  <div className="ms-Grid-row">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html">Solve Equation x within range</label>
                  </div>
                  <br></br>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm4 ms-xl4"
                      style={{ width: '37%' }}
                    >
                      <div
                        className="ms-Grid-col ms-sm4 ms-xl4"
                        style={{ width: '26%' }}
                      >
                        <Label>x =</Label>
                      </div>
                      <div
                        className="ms-Grid-col ms-sm8 ms-xl8"
                        style={{ width: '67%' }}
                      >
                        <TextField multiline resizable={false} />
                      </div>
                    </div>
                    <div
                      className="ms-Grid-col ms-sm4 ms-xl4"
                      style={{ width: '37%' }}
                    >
                      <div
                        className="ms-Grid-col ms-sm4 ms-xl4"
                        style={{ width: '27%' }}
                      >
                        <Label>y =</Label>
                      </div>
                      <div
                        className="ms-Grid-col ms-sm8 ms-xl8"
                        style={{ width: '67%' }}
                      >
                        <TextField multiline resizable={false} />
                      </div>
                    </div>
                    <div
                      className="ms-Grid-col ms-sm2 ms-xl4"
                      style={{ width: '15%' }}
                    >
                      <DefaultButton
                        text="Copy"
                        className={`text-block`}
                        allowDisabledFocus
                        disabled={disabled}
                        checked={checked}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">
                  <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                    <Label>Results</Label>
                  </Stack>
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm10 ms-xl10"
                      style={{ width: '72%' }}
                    >
                      <TextField multiline resizable={false} />
                    </div>
                    <div
                      className="ms-Grid-col ms-sm4 ms-x4"
                      style={{ width: '28%' }}
                    >
                      <DefaultButton
                        text="Copy"
                        className={`text-block`}
                        allowDisabledFocus
                        disabled={false}
                        checked={checked}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>
          </Pivot>
          <br />
          <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6" >
            <DefaultButton
                text="Add as"
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenPlotEquation({
                    message: false,
                  })
                }
                allowDisabledFocus
                disabled={disabled}
                  checked={checked}
                  style={{ marginRight: '10px' }}
                />
                 <DefaultButton
                text="Plot"
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenPlotEquation({
                    message: false,
                  })
                }
                allowDisabledFocus
                disabled={disabled}
              />

            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6" >
            <PrimaryButton
                text="Ok"
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenPlotEquation({
                    message: false,
                  })
                }
                allowDisabledFocus
                disabled={disabled}
                  checked={checked}
                  style={{ marginRight: '10px' }}
                />
                 <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenPlotEquation({
                    message: false,
                  })
                }
                allowDisabledFocus
                disabled={disabled}
              />
              </div>
              </div>
              </div>
        </div> */}
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column',
    // alignItems: 'stretch',
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
  footer: {
    padding: 10,
    marginBottom: 10,
  }
});
const iconHelpButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: '225px',
    position: 'relative',
    top: '2px',
    left: '6px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
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
  // console.log('So range is', state.instanceReducer.range);
  return {
    formatCellState: state.formatCellReducer,
    referenceObjectState: state.instanceReducer.instance,
    range: state.instanceReducer.range,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlotEquation);
