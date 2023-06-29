import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';


import { getAllColor } from "../../../../utils/graphDailogProperty/differentPropertyList";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 ,height:32},
};


const colorOptions: IDropdownOption[] = getAllColor();
const AxisFills = (props:any) => {

  console.log("grid Fills -->", props)
  
  const [color, setColor] = useState('white ');
  const [endColor, setEndColor] = useState('white ');
  const [style, setStyle] = useState(' ');

  useEffect(() => {
    // setColor(props.gridFills.plot_bgcolor);    

  }, [props])

  
  const colorOnChange = (value:any) => {

  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Fill Color
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Color</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
          <ColorPickerComponent
            id="colorpicker"
            value={color}
            mode="Palette"
            change={(args) => colorOnChange(args.value)}
            cssClass="e-hide-value"
            disabled
          />
        </div>

      </div>

      <div className="insets-header">
        <Label className="">
          Gradient
        </Label>
      </div>
      <div className={''} style={{ marginBottom: '0px' }}>
        
        <Checkbox label="Use gradient"
        // checked={showLine} onChange={showLineOnChnage} 
        disabled
        >
        </Checkbox>
        <div className={'d-flex'} style={{ marginBottom: '0px' }}>
          <div className="ms-Grid-col ms-sm4">
            <Label>End Color</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <ColorPickerComponent
              id="colorpicker"
              value={endColor}
              mode="Palette"
              change={(args) => colorOnChange(args.value)}
              cssClass="e-hide-value"
              disabled
            />
          </div>

        </div>


      </div>

      <div className="insets-header">
        <Label className="">
          Pattern
        </Label>
      </div>
      <div className={''} style={{ marginBottom: '0px' }}>
        <div className={'d-flex'} style={{ marginBottom: '0px' }}>
          <div className="ms-Grid-col ms-sm4">
            <Label>Style</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <Dropdown
              placeholder='(None)'
              // selectedKey={color}
              // options={colorOptions}
              // onChange={colorOnChange}
              styles={dropdownStyles}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AxisFills