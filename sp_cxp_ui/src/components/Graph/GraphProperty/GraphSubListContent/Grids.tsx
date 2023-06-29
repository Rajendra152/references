
import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getAllColor, getAllLineStyle } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getGridModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

const legendarray = [{ value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }];
const Legendli = legendarray.map((legendvalue, index) =>
  <li>{legendvalue.value} {index + 1}</li>
);
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout:{maxHeight:250, overflowY:'auto'}
};



const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step=0.005;

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

const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
  console.log('Value changed to ' + value);
};


const onRenderPlanesOption = (planesOptions) => {
  return (
    <div>
      {planesOptions.data && planesOptions.data.icon && (
        <Icon iconName={planesOptions.data.icon} aria-hidden="true" title={planesOptions.data.icon} />
      )}
      <span style={{ marginLeft: '10px' }}>{planesOptions.text}</span>
    </div>
  );
};

const onRenderGridOption = (gridOptions) => {

  return (
    <div>
      {gridOptions.data && gridOptions.data.icon && (
        <Icon iconName={gridOptions.data.icon} aria-hidden="true" title={gridOptions.data.icon} />
      )}
      <span style={{ marginLeft: '10px' }}>{gridOptions.text}</span>
    </div>
  );
};

const Grids = (props: any) => {
  console.log(props.gridProp)
  const [currPlane, setCurrPlane] = useState({ key: 'XY', text: 'XY Plane', data: { icon: 'Memo' } })
  const [currGrid, setCurrGrid] = useState({ key: 'X_Maj', text: 'X Major', disabled: false })

  const [lineStyle, setLineStyle] = useState(props.gridProp.x_major.gridStyle)
  const [gridThickness, setGridThickness] = useState(props.gridProp.x_major.gridwidth)
  const [gridColor, setGridColor] = useState(props.gridProp.x_major.gridcolor)
  const [gapColor, setGapColor] = useState("#000000ff")

  const allListData = useRef({
    lineStylesOptions: getAllLineStyle(),
    planesOptions: [{ key: 'XY', text: 'XY Plane', data: { icon: 'Memo' } }],
    gridOptions: [{ key: 'X_Maj', text: 'X Major', disabled: false }],
    colorOptions: getAllColor(),
    gapColorOptions: getAllColor(),
  })
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__grid_lines")
  },[])
  useEffect(() => {
    if (props.layout.hasOwnProperty('scene')) {
      allListData.current.planesOptions.push({ key: 'YZ', text: 'YZ Plane', data: { icon: 'Memo' } })
      allListData.current.planesOptions.push({ key: 'ZX', text: 'ZX Plane', data: { icon: 'Memo' } })
    }
    else if (props.layout.hasOwnProperty('ternary')) {
      allListData.current.planesOptions = [{ key: 'XYZ', text: 'XYZ Plane for ternary', data: { icon: 'Memo' } }]
    }
    else if (props.layout.hasOwnProperty('geo')) {
      allListData.current.planesOptions = [{ key: 'geo', text: 'Geo Plane for Map', data: { icon: 'Memo' } }]
    }
    else if (props.layout.graphType==='polarPlot') {
      allListData.current.planesOptions = [{ key: 'polar', text: 'Polar Plane', data: { icon: 'Memo' } }]
    }
    else if (props.layout.graphType==='radarPlot') {
      allListData.current.planesOptions = [{ key: 'radar', text: 'Radar Plane', data: { icon: 'Memo' } }]
    }
    setCurrPlane(allListData.current.planesOptions[0])

  }, []) 


  useEffect(() => {
    if (currPlane.key === 'XY') {
      allListData.current.gridOptions = [{ key: 'X_Maj', text: 'X Major', disabled: false },
      { key: 'Y_Maj', text: 'Y Major', disabled: false },
      // { key: 'X_Min', text: 'X Minor', disabled: true },
      // { key: 'Y_Min', text: 'Y Minor', disabled: true },
      ]
    }
    else if (currPlane.key === 'YZ') {
      allListData.current.gridOptions = [{ key: 'Y_Maj', text: 'Y Major', disabled: false },
      { key: 'Z_Maj', text: 'Z Major', disabled: false },
      // { key: 'Y_Min', text: 'Y Minor', disabled: true },
      // { key: 'Z_Min', text: 'Z Minor', disabled: true },
    ]
    }
    else if (currPlane.key === 'ZX') {
      allListData.current.gridOptions = [{ key: 'Z_Maj', text: 'Z Major', disabled: false },
      { key: 'X_Maj', text: 'X Major', disabled: false },
      // { key: 'Z_Min', text: 'Z Minor', disabled: true },
      // { key: 'X_Min', text: 'X Minor', disabled: true },
    ]
    }
    else if (currPlane.key === 'XYZ') {
      allListData.current.gridOptions = [
        { key: 'X_Maj', text: 'X Major', disabled: false },
        { key: 'Y_Maj', text: 'Y Major', disabled: false },
        { key: 'Z_Maj', text: 'Z Major', disabled: false },
        // { key: 'X_Min', text: 'X Minor', disabled: true },
        // { key: 'Y_Min', text: 'Y Minor', disabled: true },
        // { key: 'Z_Min', text: 'Z Minor', disabled: true }
      ]
    }
    else if (currPlane.key === 'polar') {
      allListData.current.gridOptions = [
        { key: 'X_Maj', text: 'Radial major', disabled: false },
        { key: 'Y_Maj', text: 'Angular major', disabled: false },
        // { key: 'X_Min', text: 'Radial Minor', disabled: true },
        // { key: 'Y_Min', text: 'Angular Minor', disabled: true }
      ]
    }
    else if (currPlane.key === 'radar') {
      allListData.current.gridOptions = [
        { key: 'X_Maj', text: 'Major', disabled: false },
        // { key: 'X_Min', text: 'Minor', disabled: true }
      ]
    }
    else if (currPlane.key === 'geo') {
      allListData.current.gridOptions = [
        { key: 'X_Maj', text: 'Latitude', disabled: false },
        { key: 'Y_Maj', text: 'Longitude', disabled: false }]
    }
    setCurrGrid(allListData.current.gridOptions[0])
  }, [currPlane])


  useEffect(() => {
    console.log("I am Grid Changed", currGrid)
    if (currGrid.key === 'X_Maj') {
      setLineStyle(props.gridProp.x_major.gridStyle)
      
      let wid = convert_To_mmInchPoints(suffix, props.gridProp.x_major.gridwidth)
      setGridThickness(wid)
      setGridColor(props.gridProp.x_major.gridcolor)
      setGapColor(props.gridProp.x_major.gridGapColor)
    }
    else if (currGrid.key === 'Y_Maj') {
      setLineStyle(props.gridProp.y_major.gridStyle)
      let wid = convert_To_mmInchPoints(suffix, props.gridProp.y_major.gridwidth)
      setGridThickness(wid)
      setGridColor(props.gridProp.y_major.gridcolor)
      setGapColor(props.gridProp.y_major.gridGapColor)
    }
    else if (currGrid.key === 'Z_Maj') {
      setLineStyle(props.gridProp.z_major.gridStyle)
      let wid = convert_To_mmInchPoints(suffix, props.gridProp.z_major.gridwidth)
      setGridThickness(wid)
      setGridColor(props.gridProp.z_major.gridcolor)
      setGapColor(props.gridProp.z_major.gridGapColor)
    }
    console.log(props.gridProp)
  }, [currGrid])

  useEffect(()=>{
    suffix = props.properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
  },[props])

  const planeOnChange = (ev, item) => {
    console.log(item)
    setCurrPlane(item)
  }

  const gridOnChange = (ev, item) => {
    setCurrGrid(item)
  }

 
  const styleOnChange = (ev, item) => {
    const newProps = {
      x_major: { ...props.gridProp.x_major },
      y_major: { ...props.gridProp.y_major },
      z_major: { ...props.gridProp.z_major }
    }

    if (currGrid.key === 'X_Maj') {
      newProps.x_major.showgrid = item.key !== "none" ? true : false;
      newProps.x_major.gridStyle = item.key;
    }
    else if (currGrid.key === 'Y_Maj') {
      newProps.y_major.showgrid = item.key !== "none" ? true : false;
      newProps.y_major.gridStyle = item.key;
    }
    else if (currGrid.key === 'Z_Maj') {
      newProps.z_major.showgrid = item.key !== "none" ? true : false;
      newProps.z_major.gridStyle = item.key;
    }
    
    const [newLayout, newProperties] = getGridModifiedJSON(newProps, props.properties, props.layout)
    setLineStyle(item.key)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const thicknessOnChange = (value) => {

    const newProps = {
      x_major: { ...props.gridProp.x_major },
      y_major: { ...props.gridProp.y_major },
      z_major: { ...props.gridProp.z_major }
    }

    if (currGrid.key === 'X_Maj') {
      newProps.x_major.gridwidth = convert_To_Pixel(suffix, value)
    }
    else if (currGrid.key === 'Y_Maj') {
      newProps.y_major.gridwidth = convert_To_Pixel(suffix, value)
    }
    else if (currGrid.key === 'Z_Maj') {
      newProps.z_major.gridwidth = convert_To_Pixel(suffix, value)
    }
    //let wid = (props.gridProp.y_major.gridwidth * 10) / 1000
    let wid = display_mmPxPt(suffix,value)

    setGridThickness(wid)
    const [newLayout, newProperties] = getGridModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }


  const colorOnChange = (value) => {
    console.log(value)
    const newProps = {
      x_major: { ...props.gridProp.x_major },
      y_major: { ...props.gridProp.y_major },
      z_major: { ...props.gridProp.z_major }

    }

    if (currGrid.key === 'X_Maj') {
      newProps.x_major.gridcolor = value
    }
    else if (currGrid.key === 'Y_Maj') {
      newProps.y_major.gridcolor = value
    }
    else if (currGrid.key === 'Z_Maj') {
      newProps.z_major.gridcolor = value
    }

    setGridColor(value)
    const [newLayout, newProperties] = getGridModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.min(numericValue + step, max);
      thicknessOnChange(finalValue)
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
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
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      return finalValue
    };
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Grid Lines
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Planes</Label>
        <Dropdown
          defaultSelectedKey={currPlane.key}
          options={allListData.current.planesOptions}
          disabled={props.layout.hasOwnProperty('scene') ? false : true}
          className={'ms-lg5'}
          onRenderOption={onRenderPlanesOption}
          onChange={planeOnChange}
          styles={dropdownStyles}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Grid</Label>
        <Dropdown
          defaultSelectedKey={currGrid.key}
          options={allListData.current.gridOptions}
          className={'ms-lg5'}
          onChange={gridOnChange}
          styles={dropdownStyles}
        />
      </div>
      <div className="insets-header">
        <Label className="">
          Line Properties
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Style</Label>
        <Dropdown
          selectedKey={lineStyle}
          defaultSelectedKey={lineStyle}
          options={allListData.current.lineStylesOptions}
          styles={dropdownStyles} 
          className={'ms-lg4'}
          onChange={styleOnChange}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px', }}>
        <Label className="ms-lg2">Thickness</Label>
        <SpinButton
          defaultValue={'0.005' + suffix}
          value={gridThickness + suffix}
          min={min}
          max={max}
          onValidate={onValidate}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          className={'ms-lg5'}
          incrementButtonAriaLabel="Increase value by 0.005"
          decrementButtonAriaLabel="Decrease value by 0.005"
          styles={styles}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={gridColor}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Gap Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          mode="Palette"
          value={gapColor}
          change={(args) => console.log(args)}
          cssClass="e-hide-value"
          disabled
        />
      </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Grids);
