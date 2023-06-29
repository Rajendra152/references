
import React, {useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { Slider, IStackTokens, Stack, IStackStyles } from '@fluentui/react';
import { getBarWidthModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';

import { ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';



const sliderAriaValueText = (value: number) => `${value} percent`;
const sliderValueFormat = (value: number) => `${value}%`;

const alignmentOptions: IDropdownOption[] = [
    { key: 'left', text: `Left`, },    
    { key: 'center', text: `Center`, },
    { key: 'right', text: `Right`, },
];
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
const widthStyleOptions: IDropdownOption[] = [
    { key: 'uniform', text: `Uniform`, },
    { key: 'variale', text: `Variable`, },
];


const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 100 },
};




const BarWidth = (props: any) => {
    console.log("barW",props)
    const [thickness, setThickness] = React.useState("slider");
    const [sliderValue, setSliderValue] = React.useState(50);
    const [widthStyle, setwidthStyle] = React.useState("uniform");
    const [alignment, setAlignment] = React.useState("center");
    
    const [groupSliderValue, setGroupSliderValue] = React.useState(props.barProp.bargroupgap);


    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__bar_widths")
      },[])

    useEffect(() => {       
        if(Array.isArray(props.barProp.width)){
            setThickness(props.barProp.barWidth)
            setSliderValue(Math.round(props.barProp.width[0]*100));
        }
        else{
            setThickness("slider")
            setSliderValue(Math.round(props.barProp.barWidth*100));
        }
        setGroupSliderValue(Math.round(props.barProp.bargroupgap*100))

    }, [props])

   

    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getBarWidthModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }


    const thickSliderOnChange = (value: number) => {
        // setSliderLowerValue(range[0]);
        const newProps = {
            width:value==0?0.01:value/100,
            barWidth:value==0?0.01:value/100,
            bargroupgap:groupSliderValue==0?0.01:groupSliderValue/100,
        }
        changeProperties(newProps);
    };
    
    const groupSliderOnChange = (value: number) => {
        console.log("7777",value)
        // setSliderLowerValue(range[0]);
        const newProps = {
            barWidth:sliderValue==0?0.01:sliderValue/100,
            bargroupgap:value==0?0.01:value/100
        }
        changeProperties(newProps);
    };

    const thicknessOptions: IDropdownOption[] = [
        { key: 'slider', text: `${sliderValue}%`, hidden: true },
        { key: 'col1', text: `Column 1`, disabled:true },
    ];
    return (
        // <div className="insets-container">
        //     <div className="insets-header">
        //         <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        //             Bars
        //         </Label>
        //     </div>
        //     <div className={'d-flex'} 
        //     >
        //         <Label>Bar thickness</Label>
        //         <div className="ms-Grid-col " 
        //         >
        //             Wide
        //         </div>
        //         <div className="ms-Grid-col">
        //             <Slider
        //                 max={100}
        //                 ariaValueText={sliderAriaValueText}
        //                 valueFormat={sliderValueFormat}
        //                 onChange={thickSliderOnChange}
        //                 value={sliderValue}
        //                 showValue={false}
        //                 className="slider-bar-width"
        //             />
        //             <div style={{ padding: '0px 8px' }}>
        //                 <Dropdown
        //                     selectedKey={thickness}
        //                     options={thicknessOptions}
        //                     styles={dropdownStyles}
        //                 />
        //             </div>
        //         </div>
        //         <div className="ms-Grid-col " 
        //         >
        //             Thin
        //         </div>
        //     </div>
        //     <div className="insets-header">
        //         <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        //             Spacing
        //         </Label>
        //     </div>
        //     <div className={'d-flex'} 
        //     >
        //         <Label>Group spacing</Label>
        //         <div className="ms-Grid-col" >
        //             Close
        //         </div>
        //         <div className="ms-Grid-col ">
        //             <Slider
        //                 max={100}         
        //                 ariaValueText={sliderAriaValueText}
        //                 valueFormat={sliderValueFormat}
        //                 onChange={groupSliderOnChange}
        //                 value={groupSliderValue}
        //                 showValue={false}
        //                 className="slider-bar-width"
        //                 disabled={props.layout.barmode!=="group"}
        //             />
        //             <div >
        //                 <TextField 
        //                     type="number" 
        //                     value={groupSliderValue} 
        //                     disabled={props.layout.barmode!=="group"}
        //                     onChange={(ev, value)=>groupSliderOnChange(value)}
        //                    styles={narrowTextFieldStyles}
        //                     suffix='%'
        //                     max={100}
        //                 />
        //             </div>
        //         </div>
        //         <div className="ms-Grid-col" >
        //             Far
        //         </div>
        //     </div>
        //     {/* <div className="insets-header">
        //         <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        //             Style
        //         </Label>
        //     </div> */}
        //     {/* <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        //         <div className="ms-Grid-col ms-sm4">
        //             <Label>Width style</Label>
        //         </div>
        //         <div className="ms-Grid-col ms-sm8">
        //             <Dropdown
        //                 selectedKey={widthStyle}
        //                 options={widthStyleOptions}
        //                 styles={dropdownStyles}
        //                 disabled
        //             />
        //         </div>
        //     </div> */}
        //     {/* <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        //         <div className="ms-Grid-col ms-sm4">
        //             <Label>Bar alignment</Label>
        //         </div>
        //         <div className="ms-Grid-col ms-sm8">
        //             <Dropdown
        //                 selectedKey={alignment}
        //                 options={alignmentOptions}
        //                 styles={dropdownStyles}
        //                 disabled
        //             />
        //         </div>
        //     </div> */}
        // </div>
           <div className="insets-container">
                <div className="insets-header" style={{marginTop:'20px', marginBottom:'10px'}}>
                   <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                       Bars
                   </Label>
                </div>
                <div  style={{display:'flex'}}>
                   <Label style={{fontWeight:'bold', fontSize:'12px', marginRight:'10px'}}>Bar thickness</Label>
                   <Label style={{marginRight:'10px'}} >Wide</Label>
                   <Slider
                        max={100}
                        ariaValueText={sliderAriaValueText}
                        valueFormat={sliderValueFormat}
                        onChange={thickSliderOnChange}
                        value={sliderValue}
                        showValue={false}
                        className="slider-bar-width"
                    />
                   <Label>Thin</Label>
                </div>
                <div style={{display:'flex' , width:'100%' , justifyContent:'center'}}>
                    <Dropdown
                        selectedKey={thickness}
                        options={thicknessOptions}
                        styles={dropdownStyles}
                    />
                </div>
                <div className="insets-header" style={{marginTop:'20px', marginBottom:'10px'}}>
                    <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                       Spacing
                    </Label>
                </div>
                <div  style={{display:'flex'}}>
                    <Label style={{fontWeight:'bold', fontSize:'12px', marginRight:'10px'}}>Group spacing</Label>
                    <Label style={{marginRight:'10px'}}>Close</Label>
                    <Slider
                        max={100}         
                        ariaValueText={sliderAriaValueText}
                        valueFormat={sliderValueFormat}
                        onChange={groupSliderOnChange}
                        value={groupSliderValue}
                        showValue={false}
                        className="slider-bar-width"
                        disabled={props.layout.barmode!=="group"}
                    />
                    <Label>Far</Label>
                </div>
                <div style={{display:'flex' , width:'100%' , justifyContent:'center'}}>
                    <TextField 
                        type="number" 
                        value={groupSliderValue} 
                        disabled={props.layout.barmode!=="group"}
                        onChange={(ev, value)=>groupSliderOnChange(value)}
                        styles={narrowTextFieldStyles}
                        suffix='%'
                        max={100}
                    />
                </div>
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
  export default connect(mapStateToProps, mapDispatchToProps)(BarWidth);
