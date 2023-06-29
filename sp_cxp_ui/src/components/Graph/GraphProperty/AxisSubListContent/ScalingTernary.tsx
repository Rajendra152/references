import React, { useState, useEffect } from 'react';
import { Slider} from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 }, 
};


const ternaryScaleoptions: IDropdownOption[] = [
    { key: '%', text: 'Percentage (0 - 100%)', disabled:true },
    { key: 'unitary', text: 'Unitary (0 - 1.0)', disabled:true },
];

const ternaryDirectionoptions: IDropdownOption[] = [
    { key: 'counterClock', text: 'Counter clockwise',disabled:true },
    { key: 'clockwise', text: 'Clockwise',disabled:true },
];


const ScalingTernary = (props) => {


    const [scaleType, setScaleType] = useState("%");
    const [direction, setDirection] = useState("counterClock");
    const [xStart, setxStart] = useState(0);
    const [xEnd, setxEnd] = useState(0);
    const [yStart, setyStart] = useState(0);
    const [yEnd, setyEnd] = useState(0);
    const [zStart, setzStart] = useState(0);
    const [zEnd, setzEnd] = useState(0);


    const [sliderValue, setSliderValue] = useState(0);
    const sliderOnChange = (value: number) => setSliderValue(value);

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_scaling")
      },[])


    const sliderMax = scaleType=="%" ? 100 : 1
    return (
    <div className="ms-Grid ter-scale" dir="ltr" style={{paddingTop:'17px'}}>
        <div className="ms-Grid-row insets-container" >
        <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">Scale Type</p>
            </div>
            <div className="ms-Grid-col ms-sm12" style={{padding:'1px 7px'}}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "11px", fontWeight: 600 }}>Scale Type</div>
                    <div className="ms-Grid-col ms-sm7"> 
                    <Dropdown
                        selectedKey = {scaleType}
                        options={ternaryScaleoptions}
                        styles={dropdownStyles}
                    />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12" style={{padding:'1px 7px'}}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "11px", fontWeight: 600 }}>Direction</div>
                    <div className="ms-Grid-col ms-sm7"> 
                    <Dropdown
                        selectedKey={direction}
                        options={ternaryDirectionoptions}
                        styles={dropdownStyles}
                    />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">X Range</p>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>Start</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={xStart}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>End</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={xEnd}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">Y Range</p>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>Start</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={yStart}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>End</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={yEnd}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 insets-header">
                <p className="text">Z Range</p>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>Start</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={zStart}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ">
                <div className="ms-Grid-row pad-1">
                    <div className="ms-Grid-col ms-sm2 " style={{ lineHeight: "13px", fontSize: "11px", fontWeight: 600 }}>End</div>
                    <div className="ms-Grid-col ms-sm2 slider-value">
                        {sliderValue}</div>
                    <div className="ms-Grid-col ms-sm7 ">
                        <Slider
                            max={sliderMax}
                            value={zEnd}
                            showValue={false}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={sliderOnChange}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>)
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
  export default connect(mapStateToProps, mapDispatchToProps)(ScalingTernary);
