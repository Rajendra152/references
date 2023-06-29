
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { getAllLocationMode } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getLocationModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
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

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };


const Location = (props: any) => {
    console.log(props)
    const [locationmode, setLocationMode] = useState(props.location.locationmode)

    const allListData = useRef({
        modeOptions: getAllLocationMode()
    })


    useEffect(() => {
        setLocationMode(props.location.locationmode)
    }, [props])

 

    const modeOnChange = (ev,value: any) => {
        
        console.log("hi", value)
        const newProps = {
            locationmode:value.key
        }

        const [newLayout, newProperties] = getLocationModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
        
    }


    return (
        <div className="insets-container">
            <div className="insets-header">
                <Label className="">
                    Location Mode
                </Label>
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Mode</Label>
                <Dropdown
                    selectedKey={locationmode}
                    options={allListData.current.modeOptions}
                    className={'ms-lg5'}
                    onChange={modeOnChange}
                />
            </div>
        </div>
    );
};


export default Location;