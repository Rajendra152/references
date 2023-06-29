import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getExplodeTypes } from '../../../../utils/graphDailogProperty/differentPropertyList';
import { MaskedTextField } from '@fluentui/react';
import { getPieSlicesModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
// rotation text field implementation 
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200 },
    callout: { maxHeight: 250, overflowY: 'auto' }
};
const maskFormat: { [key: string]: RegExp } = {
    '*': /[0-9_]/,
};
const PieSlice = (props: any) => {
    console.log('pie prop', props)

    const [rotation, setRotation] = React.useState(props.sliceProp.rotation);
    const [explode, setExplode] = React.useState(props.sliceProp.explode);
    const [sliceIndex, setSliceIndex] = React.useState(props.sliceProp.sliceIndex);


    const sliceIndexOption = ()=>{
        let allSliceIndex =[]
        for(let i =0;i<props.sliceProp.pull.length ; i++){
            allSliceIndex.push(
                { key: i, text: i+1 , disabled: false },)
        }
        return allSliceIndex
    }

    const allList = useRef({
        explodeOption: getExplodeTypes(),
        sliceIndexOption: sliceIndexOption()
    })
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__pie_slices")
      },[])

    useEffect(() => { 
        allList.current.sliceIndexOption = sliceIndexOption()
        setRotation(props.sliceProp.rotation)
        setExplode(props.sliceProp.explode)
        setSliceIndex(props.sliceProp.sliceIndex)
        allList.current.sliceIndexOption= sliceIndexOption()

    }, [props])

    const sliderTextOnChange =(e,val)=>{
        e.preventDefault()
        sliderOnChange(val)
    }
    const sliderOnChange = (value: number) => {
        setRotation(value);
        const newProp = {
            ...props.sliceProp,
            rotation: value
        }
        changeProperties(newProp)
    }
    const explodeOnchange = (ev, item) => {
        const newProp = {
            ...props.sliceProp,
            explode: item.key
        }
        changeProperties(newProp)
    }

    const sliceIndexOnChange = (ev, item) => {
        const newProp = {
            ...props.sliceProp,
            sliceIndex: item.key
        }
        changeProperties(newProp)
    }

    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getPieSlicesModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    return (<div className="ms-Grid" dir="ltr" style={{ paddingTop: '17px' }}>
        <div className="ms-Grid-row insets-container" >
            <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">First slice Starts</p>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "11px", fontWeight: 600 }}>Counter Clockwise at</div>
                    <div className="ms-Grid-col ms-sm2 " style={{padding:'0px'}}>
                    <MaskedTextField mask="***" maskFormat={maskFormat} maskChar=""
  value= {`${rotation}°`} onChange={(e,value)=>sliderTextOnChange(e,value)}/>

                       </div>
                    <div className="ms-Grid-col ms-sm5 ">
                        <Slider
                            max={360}
                            value={rotation}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">Exploded Slices</p>
            </div>
            <div className="ms-Grid-col ms-sm12">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "11px", fontWeight: 600 }}>Explode</div>
                    <div className="ms-Grid-col ms-sm8"> <Dropdown
                        // placeholder="Select an option"
                        onChange={explodeOnchange}
                        selectedKey={explode}
                        options={allList.current.explodeOption}
                        styles={dropdownStyles}
                    />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12" style={{ padding: '3px 7px' }}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "11px", fontWeight: 600 }}>Explode slice</div>
                    <div className="ms-Grid-col ms-sm8"> <Dropdown
                        // placeholder="Select an option"
                        onChange={sliceIndexOnChange}
                        selectedKey={sliceIndex}
                        options={allList.current.sliceIndexOption}
                        styles={dropdownStyles}
                        disabled={explode !== 'single'}
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default PieSlice