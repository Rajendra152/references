
import React, {useState, useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { getAxisModifiedJSON, getPolarModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const suffix = ' °';
const min = 0;
const max = 360;

const scltypeoptions = [
  { key: 'linear', text: 'Linear', disabled: false },
  { key: 'category', text: 'Category', disabled: false },
];


const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout:{maxHeight:250, overflowY:'auto'}
};

let axisunitOptions = [
  { key: 'degrees', text: 'Degrees', disabled: false },
  { key: 'radians', text: 'Radians', disabled: false },
  // { key: 'grads', text: 'Grads', disabled: true },
  // { key: '12', text: 'Months', disabled: true },
  // { key: '52', text: 'Weeks', disabled: true },
  // { key: '7', text: 'Days', disabled: true },
  // { key: '24', text: 'Hours', disabled: true },
  // { key: '60', text: 'Minutes/Seconds', disabled: true },
  // { key: 'others', text: 'Others', disabled: true },
];


const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};

const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, max);
    numericValue = Math.max(numericValue, min);
    return String(numericValue) + suffix;
  }
};


const onRenderPlanesOption = (planesoptions) => {
  return (
    <div>
      {planesoptions.data && planesoptions.data.icon && (
        <Icon iconName={planesoptions.data.icon} aria-hidden="true" title={planesoptions.data.icon} />
      )}
      <span style={{ marginLeft: '10px' }}>{planesoptions.text}</span>
    </div>
  );
};

const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
  console.log('Value changed to ' + event.target.value);
};

const ScalingAngular = (props: any) => {

  console.log("SaclingAngular",props)
  const [scaleType, setscaleType] = useState(props.scaleProp.type);
  const [axisUnit, setAxisUnit] = useState(props.scaleProp.thetaunit);
  const [fromPos, setFromPos] = useState(0);
  const [toPos, setToPos] = useState(360);
  const [arc, setArc] = useState(props.scaleProp.sector[0]);
  const [angle, setAngle] = useState(props.scaleProp.rotation);
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_scaling")
  },[])
  useEffect(() => {
    setscaleType(props.scaleProp.type)
    scaleType === 'linear' ? setAxisUnit(props.scaleProp.thetaunit) : setAxisUnit(props.scaleProp.period)
    setArc(props.scaleProp.sector[0])
    setAngle(props.scaleProp.rotation)
    axisunitOptions = axisunitOptions.map(item => {
      if(item.key === 'degrees' || item.key === 'radians' || item.key === 'others'){
        item.disabled = props.scaleProp.type === 'linear' ? false : true
      }
      else if(item.key === 'grads'){
        item.disabled =  true
      }
      else {
        item.disabled = props.scaleProp.type === 'linear' ? true : false
      }
      return item

    })
  }, [props])

  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    console.log(newLayout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const fromRangeOnChange = (value:any) => {

  }

  const toRangeOnChange = (value:any) => {

  }

  const arcOnChange = (value:any) => {
    const newProps = {
      sector:[value,props.scaleProp.sector[1]],
     
    }
    const [newLayout, newProperties] = getPolarModifiedJSON(newProps, props.properties, props.layout, props.currAxis);
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const angleOnChange = (value:any) => {
    console.log("Angle",value)
    const newProps = {
      ...props.scaleProp,
      rotation:value

    }
    changeProperties(newProps);
  }

  const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.min(numericValue + 1, max);
      if (name === "fromPos") {
        fromRangeOnChange(finalValue)
        finalValue = finalValue + "";
      }
      else if (name === "toPos") {
        toRangeOnChange(finalValue)
        finalValue = finalValue + "";
      }
      else if (name === "arc") {
        arcOnChange(finalValue)
        finalValue = finalValue + suffix;
      }
      else if (name === "angle") {
        angleOnChange(finalValue)
        finalValue = finalValue + suffix;
      }
      
      // console.log(finalValue)
      return finalValue
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - 1, min);
      if (name === "fromPos") {
        fromRangeOnChange(finalValue)
        finalValue = finalValue + "";
      }
      else if (name === "toPos") {
        toRangeOnChange(finalValue)
        finalValue = finalValue + "";
      }
      else if (name === "arc") {
        arcOnChange(finalValue)
        finalValue = finalValue + suffix;
      }
      else if (name === "angle") {
        angleOnChange(finalValue)
        finalValue = finalValue + suffix;
      }
      
      return finalValue
    };
  }

  const typeOnChange = (ev, item) => {
    console.log(item)
    const newProps = {
      type:item.key
    }
    changeProperties(newProps);
  }

  const unitOnChange = (ev, item) => {
    let newProps: any

    if(scaleType === 'linear'){
      newProps = {
        thetaunit:item.key
      }
    }
    else{
      newProps = {
        period:item.key
      }
    }
    changeProperties(newProps);
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Scale Type
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">Scale Type</Label>
        <Dropdown
          selectedKey={scaleType}
          options={scltypeoptions}
          styles={dropdownStyles}
          className={'ms-lg7'}
          onChange={typeOnChange}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">Axis Units</Label>
        <Dropdown
          selectedKey={axisUnit}
          options={axisunitOptions}
          styles={dropdownStyles}
          className={'ms-lg7'}
          onChange={unitOnChange}
        />
      </div>
      <div className="insets-header">
        <Label className="">
          Range
        </Label>
      </div>
      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">From</Label>
        <SpinButton
            className={'ms-lg3'}
            value={""+fromPos}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "fromPos")}
            onDecrement={(value, ev) => onDecrement(value, ev, "fromPos")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
            disabled
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">To</Label>
        <SpinButton
            className={'ms-lg3'}
            value={""+toPos}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "toPos")}
            onDecrement={(value, ev) => onDecrement(value, ev, "toPos")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
            disabled
          />
      </div> */}
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">Arc</Label>
        {/* <TextField name={`arc`} type="number" className={'ms-lg3'} value="" onChange="" /> */}
        <SpinButton
            className={'ms-lg3'}
            value={arc + suffix}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "arc")}
            onDecrement={(value, ev) => onDecrement(value, ev, "arc")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">Start Angle</Label>
        {/* <TextField name={`startangle`} type="number" className={'ms-lg3'} value="" onChange="" /> */}
        <SpinButton
            className={'ms-lg3'}
            value={angle + suffix}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "angle")}
            onDecrement={(value, ev) => onDecrement(value, ev, "angle")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
          />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScalingAngular);
