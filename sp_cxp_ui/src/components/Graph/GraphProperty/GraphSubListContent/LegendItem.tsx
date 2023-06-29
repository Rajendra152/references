import React,{ useEffect, useState } from 'react';
import { Text, } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getGridModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { getLegendsItemModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'


let suffix = 'in';
let min = 0.3;
let max = 0.750;
let step=0.005;
// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: '22px' } };

const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    let numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        numericValue = Math.min(numericValue, max);
        numericValue = Math.max(numericValue, min);
        return String(numericValue) + suffix;
    }
};

const getNumericPart = (value: string): number | undefined => {
    const valueRegex = /^(\d+(\.\d+)?).*/;
    if (valueRegex.test(value)) {
        const numericValue = Number(value.replace(valueRegex, '$1'));
        return isNaN(numericValue) ? undefined : numericValue;
    }
    return undefined;
};

const LegendsItem = (props:any) => {
    console.log("peops",props)
    const [traces, setTraces] = useState(props.legendProp.traceDetails)
    const [itemwidth, setItemwidth] = useState(props.legendProp.legend.itemwidth)

    useEffect(()=>{
        suffix = props.properties?.defaultUnit;
        // [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        //Its beacuse symbolwidth min value should be 30. check plotlyjs jsavascript documentaion. We cant sync it. 
        //If then customization has to take place. SO here exception case we are forcefullt trying to sync it.
        if(suffix=='in'){
          [max, min] = [0.750,0.3]
        }
        else if(suffix =='mm'){
          [max, min] = [10,1]
        }
        else if(suffix == 'pt'){
          [max, min] = [50,20]
        }
        // let newTrace = JSON.parse(JSON.stringify(props.legendProp.traceDetails))
        setTraces(props.legendProp.traceDetails)
        let wid = convert_To_mmInchPoints(suffix, props.legendProp.legend.itemwidth)
        console.log("peops",wid)
        setItemwidth(wid)

    },[props])

    const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
        console.log('Value changed to ' + value);
    };
  
    let showLegendItemnChange = (leg, value) => {
        console.log(value)
        leg.isShow=value
        const newProps = {
          legend: {...props.legendProp.legend},
          traceDetails: traces.map((item, index) => leg.index == index ? leg : item)
        }
        const [newLayout, newProperties] = getLegendsItemModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout,newProperties)
    }

    let itemWidthOnChange = (value) => {
        const newProps = {
            ...props.legendProp,
          legend: {
              ...props.legendProp.legend,
              itemwidth:convert_To_Pixel(suffix, value)
            },
        }
        const [newLayout, newProperties] = getLegendsItemModifiedJSON(newProps, props.properties, props.layout)
        
        console.log("peops",newLayout)
        props.graphPropertyOnChange(newLayout,newProperties)
    }

    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
          let finalValue: any = Math.min(numericValue +step, max);
          // let calValue = finalValue*100
          itemWidthOnChange(finalValue)
          finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
          console.log("peops",finalValue)
          console.log(finalValue)
          return finalValue
        }
      };
    
      /** Decrement the value (or return nothing to keep the previous value if invalid) */
      const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
          let finalValue: any = Math.max(numericValue - step, min);
          // let calValue = finalValue*100
          itemWidthOnChange(finalValue)
        //   finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
          finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
          console.log("peops",finalValue)
          return finalValue
        };
      }

    return (
        <div className="insets-container legend-item">
          <div className="insets-header">
            <Label className="">
                Legend Appearance
            </Label>
          </div>
          <div className={'leg-info'} style={{ marginBottom: '5px', marginLeft:'5px' }}>  
            {traces.map(leg => {
                return (             
                    <Checkbox label={leg.name} checked={leg.isShow} onChange={(ev,value)=>showLegendItemnChange(leg, value)}/>
                )
            })}

          </div>
          {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
            <Label className="ms-lg5">Symbol Placement</Label>
            <Dropdown
                placeholder="Before Text"
            //   defaultSelectedKey={currPlane.key}
            //   options={allListData.current.planesOptions}
              className={'ms-lg5'}
            //   onRenderOption={onRenderPlanesOption}
            //   onChange={planeOnChange}
            disabled
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
            <Label className="ms-lg5">Symbol Style</Label>
            <Dropdown
            placeholder="Rectangle Only"
            //   defaultSelectedKey={currPlane.key}
            //   options={allListData.current.planesOptions}
            className={'ms-lg5'}
            //   onRenderOption={onRenderPlanesOption}
            //   onChange={planeOnChange}
            disabled
            />
          </div> */}

          <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
            <Label className="ms-lg5">Symbol Width</Label>
            <SpinButton
                defaultValue={'0.05' + suffix}
                value={itemwidth + suffix}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 0.05"
                decrementButtonAriaLabel="Decrease value by 0.05"
                styles={styles}
                className={'ms-lg5'}
            />
          </div>
          {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
            <Label className="ms-lg5">Symbol Height</Label>
            <SpinButton
                defaultValue={'0.05' + suffix}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 0.05"
                decrementButtonAriaLabel="Decrease value by 0.05"
                styles={styles}
                disabled
                className={'ms-lg5'}
            />
          </div> */}
          {/* <div className={'d-flex align-items-center justify-content-end'} style={{ marginBottom: '5px', marginLeft: '5px', }}>
                <DefaultButton text="Font" allowDisabledFocus onClick='' disabled/>
            </div> */}
        </div>
      );
}
export default LegendsItem