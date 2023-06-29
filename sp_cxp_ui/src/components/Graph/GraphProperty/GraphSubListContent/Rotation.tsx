import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Checkbox } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const suffix = ' °';
const suffix_pers = '%';
const min = 0;
const max = 360;
const max_pers = 750;
const min_pers = 0
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





const Rotation = (props: any) => {
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__rotation")
      },[])
    console.log("rotation",props)
    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + 5, max);
            // thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
            console.log(finalValue)
            return finalValue
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.max(numericValue - 5, min);
            // thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
            return finalValue
        };
    }
       
    return (
            <div className="insets-container rotation">
                <div className="insets-header">
                    <Label className="">
                        Rotation
                    </Label>
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <div className="rot-img"></div>
                </div>


                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg3">Horizontal view</Label>
                    <SpinButton
                        defaultValue={'360' + suffix}
                        // value={thickness + suffix}
                        min={min}
                        max={max}
                        onValidate={onValidate}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        incrementButtonAriaLabel="Increase value by 0.005"
                        decrementButtonAriaLabel="Decrease value by 0.005"
                        styles={styles}
                        disabled
                        className="ms-lg3"
                    />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg3">Vertical view</Label>
                    <SpinButton
                        defaultValue={'360' + suffix}
                        // value={thickness + suffix}
                        min={min}
                        max={max}
                        onValidate={onValidate}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        incrementButtonAriaLabel="Increase value by 0.005"
                        decrementButtonAriaLabel="Decrease value by 0.005"
                        styles={styles}
                        disabled
                        className="ms-lg3"
                    />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg3">Perspective</Label>
                    <SpinButton
                        defaultValue={'20' + suffix_pers}
                        // value={thickness + suffix}
                        min={min_pers}
                        max={max_pers}
                        onValidate={onValidate}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        incrementButtonAriaLabel="Increase value by 0.005"
                        decrementButtonAriaLabel="Decrease value by 0.005"
                        styles={styles}
                        disabled 
                        className="ms-lg3"
                        />
                </div>


                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '10px' }}>
                    <Checkbox
                        label=""
                        checked={false}
                        disabled={true}
                        className=""
                    />
                    <Label className="ms-lg5">Enable light source</Label>
                </div>

                <div className={'d-flex align-items-center justify-content-end'} style={{ marginBottom: '2px', marginLeft: '10px' }}>
                    <DefaultButton text="Reset to last saved"
                        //  onClick={_alertClicked} 
                        allowDisabledFocus
                        disabled />

                </div>

            </div>
        )
}
function mapStateToProps(state) {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Rotation);
