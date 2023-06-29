
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { getAllColor } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getGraphPlanesModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

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

const onRenderColorOption = (coloroptions) => {
  return (
    <>
      <div style={{ background:coloroptions.key, height:"50%", width:"20px", border: "1px solid black" }}></div>
      <span style={{ marginLeft: '10px' }}>{coloroptions.text}</span>
    </>
  );
};


const GraphPlanes = (props: any) => {
  console.log(props)
  const [currPlane, setCurrPlane] = useState({ key: 'XY', text: 'XY Plane', data: { icon: 'Memo' } })
  const [planeColor, setPlaneColor] = useState(props.planeProp.plot_bgcolor)

  const allListData = useRef({
    planesOptions: [{ key: 'XY', text: 'XY Plane', data: { icon: 'Memo' } }],
    colorOptions: getAllColor(),
  })
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__graph_planes")
  },[])
  useEffect(() => {
    if (props.layout.hasOwnProperty('scene')) {
      allListData.current.planesOptions.push({ key: 'YZ', text: 'YZ Plane', data: { icon: 'Memo' } })
      allListData.current.planesOptions.push({ key: 'ZX', text: 'ZX Plane', data: { icon: 'Memo' } })
    }
    else if (props.layout.hasOwnProperty('polar')) {
      allListData.current.planesOptions=[{ key: 'polar', text: 'Ploar Plane', data: { icon: 'Memo' } }]
      setCurrPlane(allListData.current.planesOptions[0])
    }
    else if (props.layout.hasOwnProperty('geo')) {
      allListData.current.planesOptions=[{ key: 'geo', text: 'Geo Plane', data: { icon: 'Memo' } }]
      setCurrPlane(allListData.current.planesOptions[0])
    }
    
  }, [])

  const planeOnChange = (ev, item) => {
    console.log(item)
    setCurrPlane(item)
  }

  const colorOnChange = (value) => {

    const newProps = {
      plot_bgcolor: props.planeProp.plot_bgcolor
    }

    if (currPlane.key === 'XY') {
      newProps.plot_bgcolor = value
    }
    else if (currPlane.key === 'YZ') {
      newProps.plot_bgcolor = value
    }
    else if (currPlane.key === 'ZX') {
      //newProps.z_major.gridcolor = value
    }
    else if(currPlane.key === 'polar'){
      newProps.plot_bgcolor = value
    }
    else if(currPlane.key === 'geo'){
      newProps.plot_bgcolor = value
    }

    setPlaneColor(value)
    const [newLayout, newProperties] = getGraphPlanesModifiedJSON(newProps, props.properties, props.layout,currPlane)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Grid Planes
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Planes</Label>
        <Dropdown
          defaultSelectedKey={currPlane.key}
          options={allListData.current.planesOptions}
          disabled={props.layout.hasOwnProperty('zaxis') ? false : true}
          className={'ms-lg5'}
          onRenderOption={onRenderPlanesOption}
          onChange={planeOnChange}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={planeColor}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      {/* <div className="insets-header">
        <Label className="">
          Show Countour
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
        <Checkbox label="Far Plane " disabled={true} onChange="" />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
        <Checkbox label="Near Plane" defaultChecked disabled={true} onChange="" />
      </div> */}

    </div>
  );
};


export default GraphPlanes;
