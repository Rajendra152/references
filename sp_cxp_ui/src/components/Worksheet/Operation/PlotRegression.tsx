import { useState, useEffect, CSSProperties } from 'react';
import * as React from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
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
import { DefaultPalette, IStackItemStyles } from '@fluentui/react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { List, ScrollToMode, IList } from 'office-ui-fabric-react/lib/List';
import { useConst } from '@uifabric/react-hooks';
import { CustomDetailsList } from '../CustomDetailsList';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formatCellAction from '../../../store/Worksheet/FormatCell/actions';
import { getRangeIndexes } from '@syncfusion/ej2-react-spreadsheet';
import Helpbutton from '../../../HelpButton';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100, },
};
const suffix = ' in';
const minThickness = 0.005;
const minConfidenceThickness = 0.005;
const minPredectionThickness = 0.005;
const maxThickness = 0.250;
const maxConfidenceThickness = 0.250;
const maxPredectionThickness = 0.250;
const spinStyles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100 } };

const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};
const getConfidenceNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};
const getPredectionNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};
/** Increment the value (or return nothing to keep the previous value if invalid) */
const onIncrementThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.min(numericValue + 0.005, maxThickness).toFixed(3)) + suffix;

  }
};
const onIncrementConfidenceThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getConfidenceNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.min(numericValue + 0.005, maxConfidenceThickness).toFixed(3)) + suffix;

  }
};
const onIncrementPredectionThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getPredectionNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.min(numericValue + 0.005, maxPredectionThickness).toFixed(3)) + suffix;

  }
};
/** Decrement the value (or return nothing to keep the previous value if invalid) */
const onDecrementThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.max(numericValue - 0.005, minThickness).toFixed(3)) + suffix;
  }
};
const onDecrementConfidenceThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.max(numericValue - 0.005, minConfidenceThickness).toFixed(3)) + suffix;
  }
};
const onDecrementPredectionThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.max(numericValue - 0.005, minPredectionThickness).toFixed(3)) + suffix;
  }
};
/**
 * Clamp the value within the valid range (or return nothing to keep the previous value
 * if there's not valid numeric input)
 */
const onValidateThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, maxThickness);
    numericValue = Math.max(numericValue, minThickness);
    return String(numericValue) + suffix;
  }
};

const onValidateConfidenceThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getConfidenceNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, maxConfidenceThickness);
    numericValue = Math.max(numericValue, minConfidenceThickness);
    return String(numericValue) + suffix;
  }
};

const onValidatePredectionThickness = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getPredectionNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, maxPredectionThickness);
    numericValue = Math.max(numericValue, minPredectionThickness);
    return String(numericValue) + suffix;
  }
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
  { key: '18', text: '18' },
  { key: '24', text: '24' },
  { key: '36', text: '36' },
  { key: '48', text: '48' },
];


const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 400 } },
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

const dropdownControlledLinesOptions = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
  { key: '7', text: '7' },
  { key: '8', text: '8' },
  { key: '9', text: '9' },
  { key: '10', text: '10' },
];
const dropdownControlledResultDecimalsOptions = [
  { key: '1', text: '6' },
  { key: '2', text: '7' },
  { key: '3', text: '8' },
  { key: '5', text: '9' },
  { key: '6', text: '10' },
  { key: '7', text: '11' },
  { key: '8', text: '12' },
  { key: '9', text: '13' },
  { key: '10', text: '14' },
];

const dropdownControlledTypesOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Solid' },
  { key: '3', text: 'Monochrome' },
  { key: '4', text: 'Incrementing' },
  { key: '5', text: 'Long Dash' },
  { key: '6', text: 'Medium Dash' },
  { key: '7', text: 'Short Dash' },
  { key: '8', text: 'Dash-Dot' },
  { key: '9', text: 'Dash-Dot-Dot' },
  { key: '10', text: 'Medium-Medium' },
  { key: '11', text: 'Short-Short-Short' },
  { key: '12', text: 'Short-Short' },
  { key: '13', text: 'Short-Long' },
  { key: '14', text: 'Long-Short' },
  { key: '15', text: 'Long-Short-Short' },
  { key: '16', text: 'Short-Long-Short' },

];
const dropdownControlledConfidenceTypesOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Solid' },
  { key: '3', text: 'Monochrome' },
  { key: '4', text: 'Incrementing' },
  { key: '5', text: 'Long Dash' },
  { key: '6', text: 'Medium Dash' },
  { key: '7', text: 'Short Dash' },
  { key: '8', text: 'Dash-Dot' },
  { key: '9', text: 'Dash-Dot-Dot' },
  { key: '10', text: 'Medium-Medium' },
  { key: '11', text: 'Short-Short-Short' },
  { key: '12', text: 'Short-Short' },
  { key: '13', text: 'Short-Long' },
  { key: '14', text: 'Long-Short' },
  { key: '15', text: 'Long-Short-Short' },
  { key: '16', text: 'Short-Long-Short' },

];
const dropdownControlledPredectionTypesOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Solid' },
  { key: '3', text: 'Monochrome' },
  { key: '4', text: 'Incrementing' },
  { key: '5', text: 'Long Dash' },
  { key: '6', text: 'Medium Dash' },
  { key: '7', text: 'Short Dash' },
  { key: '8', text: 'Dash-Dot' },
  { key: '9', text: 'Dash-Dot-Dot' },
  { key: '10', text: 'Medium-Medium' },
  { key: '11', text: 'Short-Short-Short' },
  { key: '12', text: 'Short-Short' },
  { key: '13', text: 'Short-Long' },
  { key: '14', text: 'Long-Short' },
  { key: '15', text: 'Long-Short-Short' },
  { key: '16', text: 'Short-Long-Short' },

];
const dropdownControlledColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledConfidenceColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledPredectionColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledGapColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledConfidenceGapColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledPredectionGapColorsOptions = [
  { key: '1', text: 'None' },
  { key: '2', text: 'Black' },
  { key: '3', text: 'White' },
  { key: '4', text: 'Red' },
  { key: '5', text: 'Green' },
  { key: '6', text: 'Yellow' },
  { key: '7', text: 'Blue' },
  { key: '8', text: 'Pink' },
  { key: '9', text: 'Cyan' },
  { key: '10', text: 'Gray' },
  { key: '11', text: 'Dr. Red' },
  { key: '12', text: 'Dr. Green' },
  { key: '13', text: 'Dr. Pink' },
  { key: '14', text: 'Dr. Cyan' },
  { key: '15', text: 'Dr. Gray' },
  { key: '16', text: '(Custom)' },
  { key: '17', text: '(Color Scheme)' },

];
const dropdownControlledMethod = [
  { key: '1', text: '95%' },
  { key: '2', text: '99%' },
];
// Styles initialization
const stackStyles: IStackStyles = {
  root: {
    marginBottom: 10,
    marginTop: 10,
  },
};


// Token initialization
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const sectionStackTokens: IStackTokens = { childrenGap: 15 };
export interface StylesDictionary {
  [Key: string]: CSSProperties;
}
const PlotRegression: React.FunctionComponent = (props) => {
  console.log('propsasd', props);
  const [selectLines, setSelectLines] = React.useState<IDropdownOption>();
  const [selectType, setSelectType] = React.useState<IDropdownOption>();
  const [selectColor, setSelectColor] = React.useState<IDropdownOption>();
  const [selectConfidenceColor, setSelectConfidenceColor] = React.useState<IDropdownOption>();
  const [selectPredectionColor, setSelectPredectionColor] = React.useState<IDropdownOption>();
  const [selectGapColor, setSelectGapColor] = React.useState<IDropdownOption>();
  const [selectConfidenceGapColor, setSelectConfidenceGapColor] = React.useState<IDropdownOption>();
  const [selectPredectionGapColor, setSelectPredectionGapColor] = React.useState<IDropdownOption>();
  const [selectMethod, setSelectMethod] = React.useState<IDropdownOption>();
  const [selectConfidenceType, setSelectConfidenceType] = React.useState<IDropdownOption>();
  const [selectPredectionType, setSelectPredectionType] = React.useState<IDropdownOption>();
  const [thickness, setThickness] = React.useState('0.01');
  const [confidenceThickness, setConfidenceThickness] = React.useState('0.01');
  const [predectionThickness, setPredectionThickness] = React.useState('0.01');
  const [selectResultDecimal, setSelectResultDecimal] = React.useState('6');

  const onChangeThickness = React.useCallback((event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    if (newValue !== undefined) {
      // In reality this might have some additional validation or other special handling
      setThickness(newValue);
    }
  }, []);
  const onChangeConfidenceThickness = React.useCallback((event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    if (newValue !== undefined) {
      // In reality this might have some additional validation or other special handling
      setConfidenceThickness(newValue);
    }
  }, []);
  const onChangePredectionThickness = React.useCallback((event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    if (newValue !== undefined) {
      // In reality this might have some additional validation or other special handling
      setPredectionThickness(newValue);
    }
  }, []);
  const onChangeConfidenceTypes = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectConfidenceType(item);
  };
  const onChangePredectionTypes = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectPredectionType(item);
  };
  const onChangeResultDecimal = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectResultDecimal(item);
  };
  const onChangeMethod = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectMethod(item);
  };
  const onChangeLines = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectLines(item);
  };
  const onChangeTypes = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectType(item);
  };
  const onChangeColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectColor(item);
  };
  const onChangeConfidenceColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectConfidenceColor(item);
  };
  const onChangePredectionColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectPredectionColor(item);
  };

  const onChangeGapColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectGapColor(item);
  };
  const onChangeConfidenceGapColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectConfidenceGapColor(item);
  };
  const onChangePredectionGapColors = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => {
    setSelectPredectionGapColor(item);
  };

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
  const [decimal, setDecimal] = useState(4);
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
  ]);

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

  const _onChangeDisplay = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    setDisplay(option.key);
  };

  const _onChangeCol = (option: IDropdownOption, index?: number) => {
    console.log(`Col The option has been changed to ${option}.`);
    setWidth(option.key);
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
  };

  const _onChangeDecimal = (option: IDropdownOption, index?: number) => {
    console.log(`Row The option has been changed to ${option}.`);
    setDecimal(option.key);
  };

  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    setLastHeader(item.props.headerText);
  };
  const itemStyles: React.CSSProperties = {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
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
      props.actions.formatCellAction.isOpenPlotRegression({
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
          props.actions.formatCellAction.isOpenPlotRegression({
            message: false,
          });
        }
        if (data.display === '2') {
          console.log('Value of modRes', modRes);
          modVal = '0.00E' + modRes;
          console.log('Value of modVal', modVal);
          props.referenceObjectState.numberFormat('0.00E+00', range);
          props.actions.formatCellAction.isOpenPlotRegression({
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
              props.actions.formatCellAction.isOpenPlotRegression({
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

          props.actions.formatCellAction.isOpenPlotRegression({
            message: false,
          });
        }

        // if (data.timeFormat) {
        //   console.log('Time Format');
        //   props.referenceObjectState.numberFormat('h:mm:ss AM/PM', range);
        //   props.actions.formatCellAction.isOpenFormatCell({
        //     message: false,
        //   });
        // }
      }

      if (data.type === 'Text') {
        console.log('Text selected');
        props.referenceObjectState.wrap(range, true);
        props.actions.formatCellAction.isOpenPlotRegression({
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
  const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,

  };
  const plotRegressionStyle: StylesDictionary = {

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
      height: 200,
    }
  };
  const _applyHandler = () => {
    alert('Apply Button Clicked');
  }
  const _copyHandler = () => {
    alert('Copy Button Clicked');
  }
  const _okHandler = () => {
    alert('Ok Button Clicked');
  }

  const _cancelHandler = () => {
    alert('Cancel Button Clicked');
  }


  return (
    <div>
      {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Find Option" /> */}
      <Modal
        titleAriaId={titleId}
        // isOpen={isModalOpen}
        isOpen={props.isOpen}
        onDismiss={() =>
          props.actions.formatCellAction.isOpenPlotRegression({ message: false })
        }
        isModeless={false}
        isBlocking={true}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Plot Regression</span>
          <div className="ms-Grid " dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 padding">
                {/* this is mapped to parent  */}
                <Helpbutton nodeId="Reference" />
              </div>
              <div className="ms-Grid-col ms-sm6 padding">
                <IconButton
                  styles={iconHelpButtonStyles}
                  iconProps={helpIcon}
                  ariaLabel="Help popup modal"
                  onClick={() =>
                    props.actions.formatCellAction.isOpenPlotRegression({
                      message: false,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() =>
              props.actions.formatCellAction.isOpenPlotRegression({
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
              headerText="Regression Lines"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'Regression Lines',
              }}
            >
              <div className="ms-Grid" dir="ltr">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <div className="ms-Grid-row">
                    <Checkbox label="Use all data in plot" />
                  </div>
                  <div className="ms-Grid-row">
                    <Checkbox label="Each curve" />
                  </div>
                  <div className="ms-Grid-row">
                    <Checkbox label="Extend to axis" />
                  </div>
                  <div className="ms-Grid-row">
                    <Checkbox label="Pass through origin" />
                  </div>
                </Stack>
              </div>
              <div style={plotRegressionStyle.title}>
                <hr />
                <p style={plotRegressionStyle.titleText}>Line Properties</p>
              </div>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                    <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Order</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <Dropdown
                            selectedKey={selectLines ? selectLines.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeLines}
                            options={dropdownControlledLinesOptions}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>

                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Type</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <Dropdown
                            selectedKey={selectType ? selectType.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeTypes}
                            options={dropdownControlledTypesOptions}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>

                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Thickness</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <SpinButton
                            defaultValue={"Hairline"}
                            value={thickness}
                            onValidate={onValidateThickness}
                            onIncrement={onIncrementThickness}
                            onDecrement={onDecrementThickness}
                            min={minThickness}
                            max={maxThickness}
                            onChange={onChangeThickness}
                            styles={spinStyles}
                          />
                        </div>
                      </div>
                    </Stack>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg6">
                    <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Color</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <Dropdown
                            selectedKey={selectColor ? selectColor.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeColors}
                            options={dropdownControlledColorsOptions}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Gap color</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <Dropdown
                            selectedKey={selectGapColor ? selectGapColor.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeGapColors}
                            options={dropdownControlledGapColorsOptions}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>
                    </Stack>
                  </div>
                </div>
              </div>

            </PivotItem>
            <PivotItem
              headerText="Confidence Intervals"
              headerButtonProps={{
                'data-order': 2,
                'data-title': 'Confidence Intervals',
              }}
            >
              <div className="ms-Grid" dir="ltr">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                      <Label>Method</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg10">
                      <Dropdown
                        selectedKey={selectMethod ? selectMethod.key : undefined}
                        // eslint-disable-next-line react/jsx-no-bind
                        defaultSelectedKey="1"
                        onChange={onChangeMethod}
                        options={dropdownControlledMethod}
                        styles={dropdownStyles}
                      />
                    </div>
                  </div>
                </Stack>
                <div style={plotRegressionStyle.title}>
                  <hr />
                  <p style={plotRegressionStyle.titleText}>Confidence Intervals</p>
                </div>
                <div className="ms-Grid" dir="ltr">
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className="ms-Grid-row">
                      <Checkbox label="Confidence Intervals" />
                    </div>
                  </Stack>

                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                      <Stack styles={stackStyles} tokens={verticalGapStackTokens}>

                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Type</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectConfidenceType ? selectConfidenceType.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangeConfidenceTypes}
                              options={dropdownControlledConfidenceTypesOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Thickness</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <SpinButton
                              defaultValue={"Hairline"}
                              value={confidenceThickness}
                              onValidate={onValidateConfidenceThickness}
                              onIncrement={onIncrementConfidenceThickness}
                              onDecrement={onDecrementConfidenceThickness}
                              min={minConfidenceThickness}
                              max={maxConfidenceThickness}
                              onChange={onChangeConfidenceThickness}
                              styles={spinStyles}
                            />
                          </div>
                        </div>
                      </Stack>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                      <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Color</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectConfidenceColor ? selectConfidenceColor.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangeConfidenceColors}
                              options={dropdownControlledConfidenceColorsOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Gap color</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectConfidenceGapColor ? selectConfidenceGapColor.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangeConfidenceGapColors}
                              options={dropdownControlledConfidenceGapColorsOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>

                      </Stack>
                    </div>
                  </div>
                </div>

                <div style={plotRegressionStyle.title}>
                  <hr />
                  <p style={plotRegressionStyle.titleText}>Predection Intervals</p>
                </div>
                <div className="ms-Grid" dir="ltr">
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className="ms-Grid-row">
                      <Checkbox label="Predection Intervals" />
                    </div>
                  </Stack>
                  <div className="ms-Grid-row">

                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                      <Stack styles={stackStyles} tokens={verticalGapStackTokens}>

                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Type</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectPredectionType ? selectPredectionType.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangePredectionTypes}
                              options={dropdownControlledPredectionTypesOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Thickness</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <SpinButton
                              defaultValue={"Hairline"}
                              value={predectionThickness}
                              onValidate={onValidatePredectionThickness}
                              onIncrement={onIncrementPredectionThickness}
                              onDecrement={onDecrementPredectionThickness}
                              min={minPredectionThickness}
                              max={maxPredectionThickness}
                              onChange={onChangePredectionThickness}
                              styles={spinStyles}
                            />
                          </div>
                        </div>
                      </Stack>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                      <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Color</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectPredectionColor ? selectPredectionColor.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangePredectionColors}
                              options={dropdownControlledPredectionColorsOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                            <Label>Gap color</Label>
                          </div>
                          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                            <Dropdown
                              selectedKey={selectPredectionGapColor ? selectPredectionGapColor.key : undefined}
                              // eslint-disable-next-line react/jsx-no-bind
                              defaultSelectedKey="1"
                              onChange={onChangeGapColors}
                              options={dropdownControlledPredectionGapColorsOptions}
                              styles={dropdownStyles}
                            />
                          </div>
                        </div>

                      </Stack>
                    </div>
                  </div>
                </div>


              </div>

            </PivotItem>
            <PivotItem
              headerText="Results"
              headerButtonProps={{
                'data-order': 3,
                'data-title': 'Results',
              }}
            >
              <div className="ms-Grid" dir="ltr">
                <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                  <TextField inputClassName={plotRegressionStyle.textFeild} multiline autoAdjustHeight />
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className="ms-Grid-row">
                      <Checkbox label="Show function values" />
                    </div>
                  </Stack>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8">

                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">
                          <Label>Decimal Places</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg7">
                          <Dropdown
                            selectedKey={selectResultDecimal ? selectResultDecimal.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            defaultSelectedKey="1"
                            onChange={onChangeResultDecimal}
                            options={dropdownControlledResultDecimalsOptions}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      <Stack horizontal horizontalAlign="end">
                        <DefaultButton
                          text="Copy"
                          onClick={_copyHandler}
                        //disabled={true}
                        //checked={true}
                        />
                      </Stack>
                    </div>
                  </div>

                </Stack>

              </div>


            </PivotItem>
          </Pivot>



        </div>
        <div className={contentStyles.footer}>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                <Stack tokens={sectionStackTokens}>
                  <Stack horizontal horizontalAlign="space-between">
                    <DefaultButton
                      text="Apply"
                      onClick={_applyHandler}
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
                      text="Ok"
                      onClick={_okHandler}
                    //disabled={true}
                    //checked={true}
                    />
                    <DefaultButton
                      style={{ marginRight: 20 }}
                      text="Cancel"
                      onClick={_cancelHandler}
                    //disabled={true}
                    //checked={true}
                    />
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
        </div>
        {/*
            <PivotItem headerText="Results">
              <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
              <Stack {...columnProps}>
                <TextField multiline autoAdjustHeight />
              </Stack>

              </div>
              <div className="ms-Grid-row">
              <Stack horizontal tokens={horizontalGapStackTokens}>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" style={plotRegressionStyle.gapBetweenColumns}>
               <div className="ms-Grid-row">
                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" >
                  <DefaultButton
                  text="Copy"
                  //onClick={_alertClicked}
                  allowDisabledFocus
                  disabled={disabled}
                  checked={checked}
                  />
                </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" >
                <Text>Click to copy these results to the clipboard</Text>
              </div>
              </div>


              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" style={plotRegressionStyle.gapBetweenColumns}>
              <Stack>
              <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg9">
              <Text variant="medium">Show function values</Text>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3"></div>
              <Checkbox/>
              </div>

              </Stack>
              <Stack {...columnProps}>
              <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                <Text variant="medium">Decimal Places</Text>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg9"></div>
                      <Dropdown
                       selectedKey={selectResultDecimal ? selectResultDecimal.key : undefined}
                        // eslint-disable-next-line react/jsx-no-bind
                       defaultSelectedKey="1"
                       onChange={onChangeResultDecimal}
                       options={dropdownControlledResultDecimalsOptions}
                       styles={dropdownStyles}
                       />
              </div>
              </Stack>


              </div>
              </Stack>

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
                //onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
               // onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Apply"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
               // onClick={() => updateGrid()}
              />
            </Stack>
            <Stack {...columnProps}>
              <DefaultButton
                text="Help"
                className={`text-block`}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
               // onClick={() => updateGrid()}
              />
            </Stack>

          </Stack>
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
    marginLeft: '225px',
    position: 'relative',
    top: '2px',
    left: '6px',
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
export default connect(mapStateToProps, mapDispatchToProps)(PlotRegression);
