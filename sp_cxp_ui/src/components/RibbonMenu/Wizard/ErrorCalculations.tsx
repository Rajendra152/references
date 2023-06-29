import React , {useState, useEffect} from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, ResponsiveMode } from '@fluentui/react/lib/Dropdown';
import * as ERRORTYPES from '../../Constant/ErrorCalculationTypes'

export let errorCalculationInfo = {};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: '100%' }, 
  dropdownItems : { maxHeight : '290px'},
};

const symbolOptionsDefault: IDropdownOption[] = [
  { key: ERRORTYPES.WORKSHEET_COLUMNS, text: 'WorksheetColumn'},
  { key: ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS, text: 'Asymmetric Error Bar Columns' },
  { key: ERRORTYPES.COLUMN_MEANS, text: 'Column Means' },
  { key: ERRORTYPES.ROW_MEANS, text: 'Row Means'},
  { key: ERRORTYPES.BY_CATERGORY_MEAN, text: 'By Category Mean' },
  { key: ERRORTYPES.COLUMN_MEDIAN, text: 'Column Median' },
  { key: ERRORTYPES.ROW_MEDIAN, text: 'Row Median' },
  { key: ERRORTYPES.BY_CATERGORY_MEDIAN, text: 'By Category Median' },
  { key: ERRORTYPES.FIRST_COLUMN_ENTRY, text: 'First Column Entry' },
  { key: ERRORTYPES.FIRST_ROW_ENTRY, text: 'First Row Entry' },
  { key: ERRORTYPES.LAST_COLUMN_ENTRY, text: 'Last Column Entry' },
  { key: ERRORTYPES.LAST_ROW_ENTRY, text: 'Last Row Entry' },
];

const symbolOptionsBidirectional: IDropdownOption[] = [
  { key: ERRORTYPES.WORKSHEET_COLUMNS, text: 'WorksheetColumn'},
  { key: ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS, text: 'Asymmetric Error Bar Columns' },
  { key: ERRORTYPES.COLUMN_MEANS, text: 'Column Means' },
  { key: ERRORTYPES.COLUMN_MEDIAN, text: 'Column Median' },
  { key: ERRORTYPES.FIRST_COLUMN_ENTRY, text: 'First Column Entry' },
  { key: ERRORTYPES.LAST_COLUMN_ENTRY, text: 'Last Column Entry' },
];

const symbolOptionsGroupedBars: IDropdownOption[] = [
  { key: ERRORTYPES.WORKSHEET_COLUMNS, text: 'WorksheetColumn'},
  { key: ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS, text: 'Asymmetric Error Bar Columns' },
  { key: ERRORTYPES.ROW_MEANS, text: 'Row Means'},
  { key: ERRORTYPES.BY_CATERGORY_MEAN, text: 'By Category Mean' },
  { key: ERRORTYPES.ROW_MEDIAN, text: 'Row Median' },
  { key: ERRORTYPES.BY_CATERGORY_MEDIAN, text: 'By Category Median' },
  { key: ERRORTYPES.FIRST_ROW_ENTRY, text: 'First Row Entry' },
  { key: ERRORTYPES.LAST_ROW_ENTRY, text: 'Last Row Entry' },
];




const upperErrorCalOptions: IDropdownOption[] = [
  { key: ERRORTYPES.MEAN, text: 'Mean'},
  { key: ERRORTYPES.STANDARD_DEVIATION, text: 'Standard Deviation' },
  { key: ERRORTYPES.STANDARD_DEVIATION_2, text: '2 Standard Deviation' },
  { key: ERRORTYPES.STANDARD_DEVIATION_3, text: '3 Standard Deviation'},
  { key: ERRORTYPES.STANDARD_ERROR, text: 'Standard Error' },
  { key: ERRORTYPES.STANDARD_ERROR_2, text: '2 Standard Error' },
  { key: ERRORTYPES.STANDARD_ERROR_3, text: '3 Standard Error' },
  { key: ERRORTYPES.CONFIDENCE_95, text: '95% Confidence' },
  { key: ERRORTYPES.CONFIDENCE_99, text: '99% Confidence' },
  { key: ERRORTYPES.PERCENTILE_75, text: '75th Percentile' },
  { key: ERRORTYPES.PERCENTILE_90, text: '90th Percentile' },
  { key: ERRORTYPES.MAXIMUM, text: 'Maximum' },
  { key: ERRORTYPES.LAST_ENTRY, text: 'Last Entry' },
  { key: ERRORTYPES.NONE, text: 'None' },
]

const lowerErrorCalOptions: IDropdownOption[] = [
  { key: ERRORTYPES.MEAN, text: 'Mean'},
  { key: ERRORTYPES.STANDARD_DEVIATION, text: 'Standard Deviation' },
  { key: ERRORTYPES.STANDARD_DEVIATION_2, text: '2 Standard Deviation' },
  { key: ERRORTYPES.STANDARD_DEVIATION_3, text: '3 Standard Deviation'},
  { key: ERRORTYPES.STANDARD_ERROR, text: 'Standard Error' },
  { key: ERRORTYPES.STANDARD_ERROR_2, text: '2 Standard Error' },
  { key: ERRORTYPES.STANDARD_ERROR_3, text: '3 Standard Error' },
  { key: ERRORTYPES.CONFIDENCE_95, text: '95% Confidence' },
  { key: ERRORTYPES.CONFIDENCE_99, text: '99% Confidence' },
  { key: ERRORTYPES.PERCENTILE_25, text: '25th Percentile' },
  { key: ERRORTYPES.PERCENTILE_10, text: '10th Percentile' },
  { key: ERRORTYPES.MINIMUM, text: 'Minimum' },
  { key: ERRORTYPES.FIRST_ENTRY, text: 'First Entry' },
  { key: ERRORTYPES.NONE, text: 'None' },
];


const stackTokens: IStackTokens = { childrenGap: 20 };

function DropDownComp({defaultValue, label, placeholder, options, onchange, disabled}) {
  return (
    <Dropdown
    placeholder={placeholder}
    label={label}
    defaultSelectedKey={defaultValue}
    options={options}
    styles={dropdownStyles}
    onChange={onchange}
    disabled={disabled}
    responsiveMode={ResponsiveMode.large}
  />
  )
}

export const ErrorCalculations: React.FunctionComponent = (props) => {
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const [disableDrop, setDisableDrop] = useState(false);
  const [symbolVal, setSymbolVal] = useState('');
  const [upperVal, setUpperVal] = useState('');
  const [lowerVal, setLowerVal] = useState('');
  const [errorCalItem, setCalErrorItem] = useState(props.calculationInfo);
  let symbolOptions: IDropdownOption[] = symbolOptionsDefault
  if(props.graphType == 'SP10'){
    symbolOptions= symbolOptionsBidirectional
  }
  else if (props.graphType == 'HBCP4' || props.graphType == 'VBCP4'){
    symbolOptions= symbolOptionsGroupedBars
  }

  const symbolValue = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log(item);    console.log('symbolValue');
    // setSymbolVal(item);
    let data = item;
    if(item.key==ERRORTYPES.WORKSHEET_COLUMNS || item.key==ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS){
      setDisableDrop(true)
    }else{
      setDisableDrop(false)
    }
    setSymbolVal(data.key);
    let errVal = errorCalItem;
    errVal.symbol = data;
    setCalErrorItem(errVal);
    errorCalculationInfo = errVal;
    // props.calculationClick(errVal);
  };

  const selectedUpper = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    let data = item;
    setUpperVal(data.key);
    let errVal = {...errorCalItem};
    errVal.upper = data
    setCalErrorItem(errVal);
    errorCalculationInfo = errVal;
    // props.calculationClick(errVal)
  };

  const selectedLower = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    let data = item;
    setLowerVal(data.key);
    let errVal = {...errorCalItem};
    errVal.lower = data
    setCalErrorItem(errVal);
    errorCalculationInfo = errVal;
    // props.calculationClick(errVal)
  };

  useEffect(() => {
    let calculationInfo = props.calculationInfo;
    setSymbolVal(calculationInfo.symbol.key);
    setUpperVal(calculationInfo.upper.key);
    setLowerVal(calculationInfo.lower.key);
    if(calculationInfo.symbol.key==ERRORTYPES.WORKSHEET_COLUMNS || calculationInfo.symbol.key==ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS){
      setDisableDrop(true)
    }else{
      setDisableDrop(false)
    }
  }, [])

  return (
    <Stack tokens={stackTokens} className={``}>
      <DropDownComp defaultValue={errorCalItem.symbol.key} label="Symbol Values" placeholder="Select an option" options={symbolOptions} onchange={symbolValue}
      disabled={false} />

      <DropDownComp defaultValue={errorCalItem.upper.key} label="Error Calculation - Upper" placeholder="Select an option" options={upperErrorCalOptions} onchange={selectedUpper}
     disabled= {disableDrop} />

      <DropDownComp defaultValue={errorCalItem.lower.key} label="Error Calculation - Lower" placeholder="Select an option" options={lowerErrorCalOptions} onchange={selectedLower}
      disabled= {disableDrop}/>

    </Stack>
  );
};
