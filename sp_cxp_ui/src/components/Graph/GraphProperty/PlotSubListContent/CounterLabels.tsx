
import React, { useState,useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Slider } from '@fluentui/react';

const CounterLabels = (props: any) => {

    const [isMajor, setIsMajor] = useState(false);
    const [isMinor, setIsMinor] = useState(false);
    const [isAlign, setIsAlign] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [prefixMajor, setPrefixMajor] = useState('');
    const [suffixMajor, setSuffixMajor] = useState('');
    const [prefixMinor, setPrefixMinor] = useState('');
    const [suffixMinor, setSuffixMinor] = useState('');



    const sliderOnChange = (value: number) => setSliderValue(value);
    console.log(props)
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__contour_labels")
      },[])

    return (
        <div className="insets-container count-lab">
            <div className="insets-header">
                <Label className="">
                    Contour Labels
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Checkbox label="Major contour labels" checked={isMajor} onChange="" disabled/>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Checkbox label="Minor contour labels" checked={isMinor} onChange="" disabled />
            </div>
            <div className="insets-header">
                <Label className="">
                    Label Appearance
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Checkbox label="Align to contour line" checked={isAlign} onChange="" disabled/>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <div className="ms-Grid-col pad-0 ms-sm4 scaler-text">Less frequent</div>

                <div className="ms-Grid-col pad-0 ms-sm4 ">
                    <Slider
                        max={360}
                        value={sliderValue}
                        showValue={false}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={sliderOnChange}
                        disabled
                    />
                </div>
                <div className="ms-Grid-col pad-0 ms-sm4 scaler-text">
                    More frequent</div>
            </div>
            <div className="insets-header">
                <Label className="">
                    Add To Major Labels
                </Label>
            </div>


            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Label className="ms-lg3">Prefix</Label>
                <TextField
                    name={`prefix`}
                    type="text"
                    className={'ms-lg5'}
                    value={prefixMajor} 
                // onChange={prefixOnChange}
                    disabled
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Label className="ms-lg3">Suffix</Label>
                <TextField
                    name={`sufix`}
                    type="text"
                    className={'ms-lg5'}
                    value={suffixMajor} 
                    // onChange={sufixOnChange}
                    disabled
                />
            </div>
            <div className="insets-header">
                <Label className="">
                    Add To Minor Labels
                </Label>
            </div>


            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Label className="ms-lg3">Prefix</Label>
                <TextField
                    name={`prefix`}
                    type="text"
                    className={'ms-lg5'}
                    value={prefixMinor}  
                // onChange={prefixOnChange}
                    disabled
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px' }}>
                <Label className="ms-lg3">Suffix</Label>
                <TextField
                    name={`sufix`}
                    type="text"
                    className={'ms-lg5'}
                    value={suffixMinor}
                // onChange={sufixOnChange}
                    disabled
                />
            </div>
        </div>
    );
};

export default CounterLabels
