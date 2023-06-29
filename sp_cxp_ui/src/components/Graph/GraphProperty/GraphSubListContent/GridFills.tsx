import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getAllColor } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getGraphPlanesModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100, height: 24 },
  callout: { maxHeight: 250, overflowY: 'auto' }
};


const colorOptions: IDropdownOption[] = getAllColor();

const GridFills = (props: any) => {

  console.log("grid Fills -->", props)

  const [color, setColor] = useState(props.gridFills.plot_bgcolor);
  const [endColor, setEndColor] = useState('white ');
  const [style, setStyle] = useState(' ');

  useEffect(() => {
    setColor(props.gridFills.plot_bgcolor);

  }, [props])


  const colorOnChange = (value: any) => {
    const newProps = {
      plot_bgcolor: value
    }
    const [newLayout, newProperties] = getGraphPlanesModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Fill Color
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          mode="Palette"
          value={color}
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />

      </div>

      {/* <div className="insets-header">
        <Label className="">
          Gradient
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Checkbox label=""
          // checked={showLine} onChange={showLineOnChnage} 
          disabled
        />
        <Label >Use gradient</Label>

      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}> 
          <Label className="ms-lg2">End Color</Label>  
          <ColorPickerComponent
          id="colorpicker"
          mode="Palette"
          value={endColor}
          change={(args) => console.log(args.value)}
          cssClass="e-hide-value"
          disabled
          />
      </div> */}

      {/* <div className="insets-header">
        <Label className="">
          Pattern
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Style</Label>
        <Dropdown
          placeholder='(None)'
          // selectedKey={color}
          // options={colorOptions}
          // onChange={colorOnChange}
          styles={dropdownStyles}
          disabled
        />

      </div> */}
    </div>
  )
}
export default GridFills