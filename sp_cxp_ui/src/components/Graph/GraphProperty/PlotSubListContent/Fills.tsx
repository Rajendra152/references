import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getAllColor, getFillDirection,getFillColorScale, areafillOptions } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getFillsModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import {
  Image,
} from 'office-ui-fabric-react';
import { Properties } from '../../../Constant/ConstantImage';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout: { maxHeight: 250, overflowY: 'auto' }
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const suffix = ' °';
let suffixInch = 'in';
let min = 0.005;
let max = 0.750;
let step= 0.005;
// By default the field grows to fit available width. Constrain the width instead.

/** Remove the suffix or any other text after the numbers, or return undefined if not a number */
const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};



/**
* Clamp the value within the valid range (or return nothing to keep the previous value
* if there's not valid numeric input)
*/
const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, max);
    numericValue = Math.max(numericValue, min);
    return String(numericValue) + suffix;
  }
};

/** This will be called after each change */
const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
  console.log('Value changed to ' + value);
};

const onRenderSymbolOption = (symbolsOptions) => {
  return (
      <div style={{display:"flex", alignItems:"center"}} className="colorScheme">
          {symbolsOptions.image && (<Image
              alt="ribbon-icon"
              src={symbolsOptions.image}
          />)}
          <span style={{ marginLeft: '2px' }}>{symbolsOptions.text}</span>
      </div>
  );
};
const onRenderTitleOption = (titleOptions) => {
  console.log("susu",titleOptions)
  return (
      <div style={{display:"flex", alignItems:"center"}} className="colorScheme">
          {titleOptions[0].image && (<Image
              alt="ribbon-icon"
              src={titleOptions[0].image}
          />)}
          <span style={{ marginLeft: '5px' }}>{titleOptions[0].text}</span>
      </div>
  );
};

const colorOptions: IDropdownOption[] = getAllColor();



const Fill = (props: any) => {
  console.log("color_check", props)
  const [color, setColor] = useState(props.fillProp.color);
  const [lineColor, setlineColor] = useState(props.fillProp.line.color);
  const [edgethickness, setEdgeThickness] = useState(props.fillProp.line.width);
  const [fillColorScheme, setFillColorScheme] = useState(props.fillProp.color);
  const [edgeColorScheme, setEdgeColorScheme] = useState(props.fillProp.color);  
  const [style, setStyle] = useState(props.fillProp.fillPattern);

  const options = useRef({
    colorSchemeOptions:getFillColorScale(),
    areafillOptions: areafillOptions()
  })

  useEffect(() => {
    suffixInch = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffixInch)
        step = get_Step(suffixInch)
    setColor(props.fillProp.color);
    setlineColor(props.fillProp.line.color)
    setFillColorScheme(props.fillProp.color)
    //Fill mapping for Bar Plot
    if(props.properties.type == 'bar'){
      setFillColorScheme(props.fillProp.colorscale)
      setEdgeColorScheme(props.fillProp.line.colorscale)
      setStyle(props.fillProp.fillPattern)
    }
    //Fills Mapping for Pie Flot
    else if(typeof props.fillProp.color !== 'number' && props.fillProp.color.startsWith('#')){  
      setFillColorScheme('none')
    }
    // Fills Mapping for Box Plot
    if(props.properties.type == 'box'){
      setEdgeColorScheme(props.fillProp.line.colorscheme)
    }
    //Fills Mapping for Pie
    else if(props.properties.type == 'pie'){
      setEdgeColorScheme(props.fillProp.line.colorscale)
    }
    
    let wid = convert_To_mmInchPoints(suffixInch, props.fillProp.line.width);
    setEdgeThickness(wid);
    options.current.colorSchemeOptions = getFillColorScale();
    if(props.graphicCell.graphCellPlot[props.worksheetId]){
      props.graphicCell.graphCellPlot[props.worksheetId].clrColIdx.map(clm => {
          options.current.colorSchemeOptions.push({ key: clm, text: `Column ${clm}`, disabled: false, })
      })  
    }

  }, [props])


  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getFillsModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const colorOnChange = (value) => {
    const newProps = {
      ...props.fillProp,
      color: value
    }
    if(props.properties.type == 'bar'){
      newProps.colorscale = 'none'
    }
    if(props.properties.type == 'box'){
      newProps.fillColorScheme = 'none'
    }
    
    changeProperties(newProps);
  }

  const fillColorSchemeOnChange = (ev, item) => {
    let newProps = {
      ...props.fillProp,
      color: item.key,
      fillPattern : 'none',
    }
    if(props.properties.type == 'bar'){
      newProps.colorscale = item.key
    }
    if(props.properties.type == 'box'){
      newProps.fillColorScheme = item.key
    }
    if (item.key == 'none') {
      newProps = {
       ...props.fillProp,
       color: "#ffffffff",  
     }

   }
    changeProperties(newProps);
  }

  const lineColorOnChange = (value) => {
    const newProps = {
      ...props.fillProp,
      line: {
        ...props.fillProp.line,
        color: value,
        colorscale:'none'
      }
    }
    if(props.properties.type == 'bar'){
      newProps.line.colorscale = 'none'
    }
    if(props.properties.type == 'box'){
      newProps.line.colorscheme = 'none'
    }
    changeProperties(newProps);
  }


  const styleOnChange = (ev, item) => {
    const newProps = {
      ...props.fillProp,
      colorscale : 'none',
      color: '#f2f2f2ff'
    }
    if(props.properties.type == 'bar'){
      newProps.fillPattern = item.key
    }
    newProps.fillPattern = item.key
    changeProperties(newProps);
  }

  const edgeColorSchemeOnChange = (ev, item) => {
    const newProps = {
      ...props.fillProp,
      line: {
        ...props.fillProp.line,
        colorscale: item.key
      }

    }
    if(props.properties.type == 'bar'){
      newProps.line.colorscale = item.key
    }
    if(props.properties.type == 'box'){
      newProps.line.colorscheme = item.key
    }
    changeProperties(newProps);
  }

  const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.min(numericValue + step, max);
      thicknessOnChange(finalValue)
      finalValue = String(display_mmPxPt(suffixInch,finalValue)) + suffixInch;
      console.log(finalValue)
      return finalValue
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - step, min);
      thicknessOnChange(finalValue)
      finalValue = String(display_mmPxPt(suffixInch,finalValue)) + suffixInch;
      return finalValue
    };
  }

  const thicknessOnChange = (value) => {
    const newProps = {
      ...props.fillProp,
      line: {
        ...props.fillProp.line,
        width: convert_To_Pixel(suffixInch, value)
      }
    }
    changeProperties(newProps);
  }

  return (
    <div className="insets-container fills">
      <div className="insets-header">
        <Label className="">
          Fill Color
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={color}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color Scheme</Label>
        <Dropdown
          selectedKey={fillColorScheme}
          options={options.current.colorSchemeOptions}
          styles={dropdownStyles}
          onChange={fillColorSchemeOnChange}
          className="ms-lg2"
          onRenderOption={onRenderSymbolOption}
          onRenderTitle={onRenderTitleOption}
        />
      </div>
      {/* <div className="insets-header">
        <Label className="">
          Gradient
        </Label>
      </div> */}

      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Checkbox label="" disabled />
        <Label className="ms-lg2">Use gradient</Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Angle</Label>
        <SpinButton
          label=""
          defaultValue={'270' + suffix}
          min={min}
          max={max}
          onValidate={onValidate}
          // onIncrement={onIncrement}
          // onDecrement={onDecrement}
          onChange={onChange}
          incrementButtonAriaLabel="Increase value by 2"
          decrementButtonAriaLabel="Decrease value by 2"
          styles={styles}
          disabled
        />
      </div> */}

      <div className="insets-header">
        <Label className="">
          Edge and Pattern
        </Label>
      </div>

      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={lineColor}
          mode="Palette"
          change={(args) => lineColorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color Scheme</Label>
        <Dropdown
          selectedKey={edgeColorScheme}
          options={options.current.colorSchemeOptions}
          styles={dropdownStyles}
          onChange={edgeColorSchemeOnChange}
          className="ms-lg2"
          onRenderOption={onRenderSymbolOption}
          onRenderTitle={onRenderTitleOption}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Pattern</Label>
        <Dropdown
          // placeholder="(None)"
          selectedKey={style}
          options={options.current.areafillOptions}
          styles={dropdownStyles}
          className={'ms-lg2'}
          disabled={props.properties.type == 'pie' || props.properties.type == 'box'}
         onChange={styleOnChange}
        />
      </div>

      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Thickness</Label>
        <SpinButton
          value={edgethickness + suffixInch}
          min={min}
          max={max}
          onValidate={onValidate}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          incrementButtonAriaLabel="Increase value by 0.005"
          decrementButtonAriaLabel="Decrease value by 0.005"
          styles={styles}
          className="ms-lg2"
        />
      </div>

    </div>
  )
}
export default Fill