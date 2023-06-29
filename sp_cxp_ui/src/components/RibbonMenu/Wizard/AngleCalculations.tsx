import React , {useState, useEffect} from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox } from '@fluentui/react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, ResponsiveMode } from '@fluentui/react/lib/Dropdown';
import * as TYPES from './../../Constant/ErrorCalculationTypes'

export let angleCalculationInfo = {};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: '100%' },
};

const symbolOptions: IDropdownOption[] = [
  { key: TYPES.DEGREES, text: 'Degrees'},
  { key: TYPES.RADIANS, text: 'Radians' },
  { key: TYPES.GRADS, text: 'Grads' },
  { key: TYPES.OTHERS, text: 'Others'}
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

function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

export const AngleCalculations: React.FunctionComponent = (props) => {
  console.log(props)
  const [disableInput, setDisableInput] = useState(true);
  const [symbolVal, setSymbolVal] = useState('');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [isClockWise,setIsClockWise] = useState(false);
  const [errorCalItem, setCalErrorItem] =useState(props.calculationInfo);

  const selectedType = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    let data = item;
    setSymbolVal(data);
    let errVal = {...errorCalItem};
    errVal.symbol = data;
    setCalErrorItem(errVal);
    if(item.key== TYPES.DEGREES){
      setLowerBound('0')
      setUpperBound('360')
      setDisableInput(true);
      errVal.upper = {key: TYPES.DEGREES, text: '360'};
      errVal.lower = {key: TYPES.DEGREES, text: '0'};
      errVal.isClockWise = isClockWise;
    }
    if(item.key==TYPES.RADIANS){
      setLowerBound('0')
      setUpperBound('2 pi')
      setDisableInput(true);
      errVal.upper = {key: TYPES.RADIANS, text: '2pi'};
      errVal.lower = {key: TYPES.RADIANS, text: '0'};
      errVal.isClockWise = isClockWise;
    }

    // Grads is not available in Plotly

    // if(item.key==TYPES.GRADS){
    //   setLowerBound('0')
    //   setUpperBound('400')
    //   setDisableInput(true);
    //   errVal.upper = {key: TYPES.GRADS, text: '400'};
    //   errVal.lower = {key: TYPES.GRADS, text: '0'};
    //   errVal.isClockWise = isClockWise;
    // }
    if(item.key==TYPES.OTHERS){
      setLowerBound('0')
      setUpperBound('2pi');
      setDisableInput(false);
      errVal.upper = {key: TYPES.OTHERS, text: '2pi'};
      errVal.lower = {key: TYPES.OTHERS, text: '0'};
      errVal.isClockWise = isClockWise;
    }
    setCalErrorItem(errVal);
    angleCalculationInfo = errVal;
    console.log(angleCalculationInfo)
    // props.calculationClick(errVal)
    // props.calculationClick(errorCalItem);
  };

  useEffect(() => {
    let calculationInfo = props.calculationInfo;
    setSymbolVal(calculationInfo.symbol.key);
    setUpperBound(calculationInfo.upper.key);
    setLowerBound(calculationInfo.lower.key);
    setIsClockWise(calculationInfo.isClockWise);
    if(calculationInfo.symbol.key==TYPES.DEGREES
    || calculationInfo.symbol.key==TYPES.RADIANS
    || calculationInfo.symbol.key==TYPES.GRADS
    ){
      setDisableInput(true)
    }else{
      setDisableInput(false);
    }
  }, []);

  const lowerClick = (e) =>{
    let value = e.target.value;
    setLowerBound(value);
    let errVal = {...errorCalItem};
    errVal.lower = {key: 'other', text: value};
    // props.calculationClick(errVal)
    angleCalculationInfo = errVal;
  }

  const upperClick = (e) =>{
    let value = e.target.value;
    setUpperBound(value);
    let errVal = {...errorCalItem};
    errVal.upper = {key: 'other', text: value};
    // props.calculationClick(errVal)
    angleCalculationInfo = errVal;
  }

  const changeDirection = (e)=>{
    let value = e.target.value;
    console.log(value, "anglecal")
    let anglevalue = value === 'on' ? true : false
    console.log(anglevalue, "anglevalue")
    setIsClockWise(anglevalue);
    let errVal = {...errorCalItem};
    errVal.isClockWise = isClockWise;
    angleCalculationInfo = errVal;
  }

  return (
    <Stack tokens={stackTokens}>
      <DropDownComp defaultValue={errorCalItem.symbol.key} label="Angular Unit" placeholder="Select an option" options={symbolOptions} onchange={selectedType}
      disabled={false}/>
      <Label>Range</Label>
      <TextField label="Lower Bound" onChange={(e)=>lowerClick(e)} value={errorCalItem.lower.text} defaultValue={errorCalItem.lower.key} disabled={disableInput}/>
      <TextField label="Upper Bound" onChange={(e)=>upperClick(e)} value={errorCalItem.upper.text} defaultValue={errorCalItem.upper.key} disabled={disableInput}/>
      <Checkbox label="Clockwise" onChange={(e)=>changeDirection(e)} />
    </Stack>
  );
};
