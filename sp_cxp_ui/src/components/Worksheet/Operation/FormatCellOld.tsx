import React, { useState, useEffect } from 'react';
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
  IStackTokens,
} from 'office-ui-fabric-react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
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
import { getRangeIndexes, getCellAddress } from '@syncfusion/ej2-react-spreadsheet';
import { setOptions } from '../../RibbonMenu/NavBarRibbon/Options/OptionsService';
import * as optionsAction from '../../../store/MainWindow/Options/actions';
import * as actionCreators from '../../../store/Helpmenu/actions';
import {
  getIndexesFromAddress,
  getCell
} from '@syncfusion/ej2-react-spreadsheet';
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 250 },
};

const widthOptions: IDropdownOption[] = [
  { key: '10', text: '10' },
  { key: '12', text: '12' },
  { key: '14', text: '14' },
  { key: '18', text: '18' },
  { key: '24', text: '24' },
  { key: '30', text: '30' },
];

const heightOptions: IDropdownOption[] = [
  { key: '8', text: '8' },
  { key: '10', text: '10' },
  { key: '12', text: '12' },
  { key: '14', text: '14' },
  { key: '18', text: '18' },
  { key: '24', text: '24' },
  { key: '36', text: '36' },
  { key: '48', text: '48' },
];

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width:"auto" } };
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
  { key: 'down', text: 'Down' },
];

const displayOptions: IDropdownOption[] = [
  { key: '1', text: 'E Notation When Needed' },
  { key: '2', text: 'E Notation Always' },
  { key: '3', text: 'Fixed Decimal' },
  { key: '4', text: 'General' },
];

const decimalOptions: IDropdownOption[] = [
  { key: '0', text: '0' },
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
  { key: '4', text: '4' },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
];

const dateOptions: IDropdownOption[] = [
  { key: '1', text: 'M/d/yyyy' },
  { key: '2', text: 'M-d' },
  { key: '3', text: 'M-d-yy' },
  { key: '4', text: 'M-d-yyyy' },
  { key: '5', text: 'MM/dd/yyyy' },
];

const timeOptions: IDropdownOption[] = [
  { key: '1', text: 'HH:mm:ss' },
  { key: '2', text: 'H:mm:ss' },
  { key: '3', text: 'hh:mm:ss tt' },
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const FormatCell: React.FunctionComponent = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const { disabled, checked } = props;
  const [lastHeader, setLastHeader] = useState('Data');
  const [type, setType] = useState('Numeric');
  const [height, setHeight] = useState('12');
  const [width, setWidth] = useState('24');
  const [display, setDisplay] = useState('1');
  const [sampleFormat, setSampleFormat] = useState('1');
  const [dateFormat, setDateFormat] = useState('1');
  const [timeFormat, setTimeFormat] = useState('1');
  const [decimal, setDecimal] = useState('1');
  const [isChecked, setIsChecked] = useState(false);
  const [formatCell, setFormatCell] = useState({});
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
    {
      key: 4,
      name: 'Currency',
      value: 'Currency',
      index: 4,
      selected: false,
    },
    {
      key: 5,
      name: 'Percentage',
      value: 'Percentage',
      index: 5,
      selected: false,
    },
    {
      key: 6,
      name: 'Accounting',
      value: 'Accounting',
      index: 6,
      selected: false,
    },
    {
      key: 7,
      name: 'Fraction',
      value: 'Fraction',
      index: 7,
      selected: false,
    }
  ]);

  const help = (a:string,b:string,c:string)=>{
    props.OpenHelpWindow(a,b,c)
  }
  useEffect(()=>{
    help('wbasics','format_cells__data','')
  },[])
  useEffect(() => {
    setHeight(props.optionsState.optionsCollection.Worksheet.appearance.rowHeight);
    setWidth(props.optionsState.optionsCollection.Worksheet.appearance.colWidth);
    setDecimal(props.optionsState.optionsCollection.Worksheet.numeric.decimalPlaces);
    if (props.optionsState.optionsCollection.Worksheet.numeric.displayAs.includes('E Notation When Needed'))
    {
      setDisplay('1')
    }
    else if (props.optionsState.optionsCollection.Worksheet.numeric.displayAs.includes('E Notation Always')) {
      setDisplay('2')
    }
    else if (props.optionsState.optionsCollection.Worksheet.numeric.displayAs.includes('Fixed Decimal')) {
      setDisplay('3')
    }
    else
    { 
      setDisplay('4')
      }
    
  })

  // useEffect(() => {
  //   alert('Triggered');

  //   setHeight(props.optionsState.optionsCollection.Worksheet.appearance.rowHeight);
  //   setWidth(props.optionsState.optionsCollection.Worksheet.appearance.colWidth);
  // },[height, width]);

  const listRef: React.RefObject<IList> = React.useRef(null);
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');

  if (props) {
    // let selection = props.activeCell;
    // const row = selection['start']['i'];
    // const col = selection['start']['j'];
    // const element = props.grid[row][col];
    // if (
    //   element &&
    //   element.dateFormat &&
    //   (element.dateFormat !== dateFormat || element.timeFormat !== timeFormat)
    // ) {
    //   setDateFormat(element.dateFormat);
    //   setTimeFormat(element.timeFormat);
    // }
  }

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

  const selectedItem = (param) => {
    console.log(param);
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

  const _onChangeDisplay = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    console.log('Changing display as-options-index',option, index)
    setDisplay(option.key);
    setOptions("Worksheet.numeric.displayAs",option.text, props)
  };

  const _onChangeCol = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    setWidth(option.key);
    setOptions("Worksheet.appearance.colWidth",option.key, props)
  };

  const _onChangeTime = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    setTimeFormat(option.key);
  };

  const _onChangeDate = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    setDateFormat(option.key);
  };

  const _onChangeRow = (option: IDropdownOption, index?: number) => {
    console.log(`Row The option has been changed to ${option}.`);
    setHeight(option.key);
    setOptions("Worksheet.appearance.rowHeight",option.key, props)
  };

  const _onChangeDecimal = (option: IDropdownOption, index?: number) => {
    console.log(`Row The option has been changed to ${option.key}.`);
    setDecimal(option.key);
    setOptions("Worksheet.numeric.decimalPlaces",option.key, props)
    console.log('selected value',decimal);
  };

  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    setLastHeader(item.props.headerText);
    if(item.props.headerText == "Data"){
      help('wbasics','format_cells__data','')

    }
    else if(item.props.headerText == "Rows and Columns"){
      help('wbasics','format_cells__rows_and_columns_size','')

    }
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
       // props.referenceObjectState.setRowHeight(data.height, i, 0);
        props.referenceObjectState.setRowHeight(height*2, i, 0)
      // for column iteration
      for (let j = index[1]; j <= index[3]; j++)
        //props.referenceObjectState.setColWidth(data.width, j, 0);
        props.referenceObjectState.setColWidth(width*2, j, 0)

      // console.log(index);
      //
      //
      props.actions.formatCellAction.isOpenFormatCell({
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
          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
        }
        if (data.display === '2') {
          console.log('Value of modRes', modRes);
          modVal = '0.00E' + modRes;
          console.log('Value of modVal', modVal);
          props.referenceObjectState.numberFormat('0.00E+00', range);
          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
        }
        if (data.display === '4') {
          let val;
          props.referenceObjectState.getData(range).then((data) =>
          {
            console.log('4 Data contains',data)
            data.forEach((data) => {
              val = data.value.toString();
              let modValue = val.split('.');
              console.log('Modified Value is', modValue);
              props.referenceObjectState.numberFormat(modValue, range);
              props.actions.formatCellAction.isOpenFormatCell({
                message: false,
              });
            })
          }
          );
        }
        //setDecimal(data.decimal);
      }
      if (data.type === "Time") {
        console.log("Time Format");
        props.referenceObjectState.numberFormat("h:mm:ss AM/PM", range);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
      if (data.type === "Date") {
        // console.log("Data Format", data.dataFormat);
        console.log("Data Format", data);
        if (data.dateFormat === "1") {
          console.log("Date Format on range", range);
          props.referenceObjectState.numberFormat("mm-dd-yyyy", range);

          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
        }
        else {
          console.log("Date Format on range", range);
          props.referenceObjectState.numberFormat("dddd, mmmm dd, yyyy", range);

          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
        }

    
      }

      if (data.type === 'Text') {
        console.log('Text selected');
        props.referenceObjectState.wrap(range, true);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
      if (data.type === 'Currency') {
        console.log('Currency selected');
        props.referenceObjectState.numberFormat('$#,##0.00', range);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
      if (data.type === 'Accounting') {
        console.log('Accounting selected');
        props.referenceObjectState.numberFormat('_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)', range);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
      if (data.type === 'Percentage') {
        console.log('Percentage selected');
        props.referenceObjectState.numberFormat('0.00%', range);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
      if (data.type === 'Fraction') {
        console.log('Fraction selected');
        props.referenceObjectState.numberFormat('# ?/?', range);
        props.actions.formatCellAction.isOpenFormatCell({
          message: false,
        });
      }
    }
  };

  //This method is called when the Ok button of Format Cell is pressed
  const updateGrid = () => {
    if (lastHeader === 'Rows and Columns') {
      cellFormatter({
        height: height,
        width: width,
        lastHeader: lastHeader,
      });
    } else if (lastHeader === 'Data') {
      const data = {
        lastHeader: lastHeader,
        decimal: decimal,
        type: type,
        dateFormat: dateFormat,
        timeFormat: timeFormat,
        overflow: isChecked,
        display: display,
      };
      cellFormatter(data);
    }
  };

  const onChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
      setIsChecked(!!checked);
    },
    []
  );

  const getRegion = () =>{
    if(props.referenceObjectState){
      let data = getIndexesFromAddress(props.referenceObjectState.sheets[0].activeCell);
      if(Array.isArray(data)){
        return `Col(${data[1] + 1})Row(${data[0] + 1});Col(${data[1] + 1})Row(${data[0] + 1})`
      } 
    }    
  }

  return (
    <div>
      {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Find Option" /> */}
      <Modal 
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        onDismiss={() =>
          props.actions.formatCellAction.isOpenFormatCell({ message: false })
        }
        isModeless={true}
        containerClassName={contentStyles.container}
        // dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Format Cells</span>
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
            onClick={() =>
              props.actions.formatCellAction.isOpenFormatCell({
                message: false,
              })
            }
          />
        </div>

        <div className={contentStyles.body}>
          <Pivot
            aria-label="Basic Pivot Example"
            className="FormatContainer"
            onLinkClick={getSelectedItem}
          >
            <PivotItem
              headerText="Data"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'My Files Title',
              }}
              
            >
              <Stack tokens={stackTokens} styles={stackStyles}>
                <Stack>
                  <Label>Type</Label>
                </Stack>
                {/* <Stack {...columnProps}>
                  <Label styles={labelStyles}>Type</Label>
                  <CustomDetailsList
                    columnList={columnList}
                    columns={[
                      { key: 'column1', name: 'S.No', fieldName: 'index', minWidth: 25, maxWidth: 25 },
                      { key: 'column2', name: 'Name', fieldName: 'name', minWidth: 75, maxWidth: 75 },
                      { key: 'column3', name: 'Type', fieldName: 'typeName', minWidth: 45, maxWidth: 45 },
                    ]}
                    selectedItem={(param) => selectedItem(param)}
                  />
                </Stack> */}
                <Stack className="type-container">
                  {columnList.map((item) => {
                    return (
                      <div
                        className={'list ' + (item.selected ? 'active' : '')}
                        onClick={() => selectType(item.index)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                  {/* <div className='list'>Numeric</div>
                  <div className='list'>Text</div>
                  <div className='list'>Date and Time</div> */}
                </Stack>
              </Stack>
              <br />
              <Stack className="settings-container"  style={{height: "auto"}}>
                <Stack>
                  <Label>Settings</Label>
                </Stack>
                <br />
                {type === "Date" && (
                  <div style={{ overflow: "auto" }}>
                    {/* <Stack horizontal>
                      <Stack className="label-part">
                        <Label>Sample</Label>
                      </Stack>
                      <Stack {...columnProps}>
                        <TextField
                          placeholder=""
                          value={sampleFormat}
                          step={1}
                          style={{ color: '#333' }}
                        />
                      </Stack>
                    </Stack> */}
                    <br />
                    <Stack horizontal>
                      <Stack className="label-part">
                        <Label>Date</Label>
                      </Stack>
                      <Stack>
                        <Dropdown
                          defaultSelectedKey={dateFormat}
                          options={dateOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeDate}
                        />
                      </Stack>
                    </Stack>
                    <br />
                    {/* <Stack horizontal>
                      <Stack className="label-part">
                        <Label>Time</Label>
                      </Stack>
                      <Stack>
                        <Dropdown
                          defaultSelectedKey={timeFormat}
                          options={timeOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeTime}
                        />
                      </Stack>
                    </Stack> */}
                  </div>
                )}
                {type === 'Text' && (
                  <Stack horizontal>
                    <Checkbox
                      label="Wrap text"
                      checked={isChecked}
                      onChange={onChange}
                    />
                  </Stack>
                )}
                {type === 'Numeric' && (
                  <div>
                    <Stack horizontal>
                      <Stack className="label-part">
                        <Label>Display as:</Label>
                      </Stack>
                      <Stack>
                        <Dropdown
                          defaultSelectedKey={display}
                          options={displayOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeDisplay}
                        />
                      </Stack>
                    </Stack>
                    <br />
                    <Stack horizontal>
                      <Stack className="label-part">
                        <Label>Decimal Places</Label>
                      </Stack>
                      <Stack>
                        <Dropdown
                          disabled={display === '4'}
                          defaultSelectedKey={decimal}
                          options={decimalOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeDecimal}
                        />
                      </Stack>
                    </Stack>
                  </div>
                )}
              </Stack>
            </PivotItem>
            <PivotItem headerText="Rows and Columns" >
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row size-container">
                  <Stack>
                    <Label>Size</Label>
                  </Stack>
                  <Stack horizontal>
                    <Stack>
                      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                        <Label>Column Width</Label>
                        <Dropdown
                          placeholder="Column"
                          defaultSelectedKey={width}
                          options={widthOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeCol}
                        />
                      </div>
                    </Stack>
                    <Stack className="label-text">
                      <Label>Characters</Label>
                    </Stack>
                  </Stack>
                  <Stack horizontal>
                    <Stack>
                      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                        <Label>Row Height</Label>
                        <Dropdown
                          defaultSelectedKey={height}
                          options={heightOptions}
                          styles={dropdownStyles}
                          onChanged={_onChangeRow}
                        />
                      </div>
                    </Stack>
                    <Stack className="label-text">
                      <Label>Points</Label>
                    </Stack>
                  </Stack>
                </div>
                <div className="ms-Grid-row sheet-container">
                  <Label>Worksheet</Label>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                      <TextField
                        label="Selected Region"
                        disabled
                        defaultValue={getRegion()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>
          </Pivot>
          <br />
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <DefaultButton
                text="Ok"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
                onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={() =>
                  props.actions.formatCellAction.isOpenFormatCell({
                    message: false,
                  })
                }
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

function mapStateToProps(state) {
  console.log('So options is', state.optionsReducer);
  console.log('Range contains',getCellAddress(6,9))
  return {
    formatCellState: state.formatCellReducer,
    referenceObjectState: state.instanceReducer.instance,
    range: state.instanceReducer.range,
    optionsState: state.optionsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem))
,
    actions: {
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
    },
    optionsAction: bindActionCreators(optionsAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FormatCell);
