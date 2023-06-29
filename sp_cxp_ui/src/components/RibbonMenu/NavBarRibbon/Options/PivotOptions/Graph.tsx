import React, { useState } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as optionsAction from '../../../../../store/MainWindow/Options/actions';
import { getSymbolTypes, getAllLineDash, fontDropdown, barThicknessDropdown } from "../../../../../utils/graphDailogProperty/differentPropertyList";
import { setPropertyValue } from '../OptionsService';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs/src/color-picker';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import * as ConstantFunc from '../../../../Constant/ConstantFunction';
import * as ConstantImage from '../../../../Constant/ConstantImage';

import {get_MIN_MAX, get_Step} from '../../../../../utils/conversion'

const dropdownStyles:Partial<IDropdownStyles>={
  dropdownItems: {maxHeight: 200}
}

const fontOptions: IDropdownOption[] = fontDropdown();
const barThicknessOptions: IDropdownOption[] = barThicknessDropdown();
const symbolOptions: IDropdownOption[] = getSymbolTypes();
const dashOptions: IDropdownOption[] = getAllLineDash();
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const FontColor: IIconProps = ConstantFunc.imageProp(
  ConstantImage.FontColor,
  'menuIcon'
);

function Graph(props: any) {
  const [type, setType] = useState(1);
  const { data, setData } = props;
  const pageData = JSON.parse(JSON.stringify(props.optionsState.optionsCollection.GraphPage));
  const [columnList, setColumnList] = useState([
    {
      key: 1,
      name: 'Symbols',
      value: 'Symbols',
      index: 1,
      selected: true,
    },
    {
      key: 2,
      name: 'Lines',
      value: 'Lines',
      index: 2,
      selected: false,
    },
    {
      key: 3,
      name: 'Fills',
      value: 'Fills',
      index: 3,
      selected: false,
    }
  ]);

  
  const suffix = `${pageData.defaultUnit}`;
  const [max, min] = get_MIN_MAX(suffix);
  const step = get_Step(suffix);

  const selectType = (index: number) => {
    const data = [...columnList];
    data.forEach((obj) => {
      if (obj.index === index) {
        obj.selected = true;
        setType(obj.index);
      } else {
        obj.selected = false;
      }
    });
    setColumnList(data);
  };

  const updateGraphData = (value: any, propName: string) =>{
    let typeObj = JSON.parse(JSON.stringify(data));
    setPropertyValue(propName, typeObj, value);
    setData({...typeObj});
  }

  const parseFloatValue = (value: string, step?: number, type?: string) => {
    let newVal = parseFloat(value.replace(suffix, ''));
    if(!step) {
      return newVal;
    }
    return type === 'increment' ? (newVal + step).toFixed(3) : (type === 'decrement' ? (newVal - step).toFixed(3) : newVal);
  }

  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
          <div className={'ms-lg6'}>
            <Label>Size and position</Label>
            <div className={'ms-lg-12 d-flex'}>
              <TextField type="number" step="0.1" label="Height" suffix={suffix} onChange={(e: any, param)=>updateGraphData(e.target.value, 'sizeAndPosition.height')} value={data.sizeAndPosition.height} className={'ms-lg6'} />
              <TextField type="number" step="0.1" label="Width" suffix={suffix} onChange={(e: any, param)=>updateGraphData(e.target.value, 'sizeAndPosition.width')} value={data.sizeAndPosition.width} className={'ml-1 ms-lg6'}/>
            </div>
            <div className={'ms-lg-12 d-flex'}>
              <TextField type="number" step="0.1" label="Top" suffix={suffix} onChange={(e: any, param)=>updateGraphData(e.target.value, 'sizeAndPosition.top')} value={data.sizeAndPosition.top} className={'ms-lg6'}/>
              <TextField type="number" step="0.1" label="Left" suffix={suffix} onChange={(e: any, param)=>updateGraphData(e.target.value, 'sizeAndPosition.left')} value={data.sizeAndPosition.left} className={'ml-1 ms-lg6'}/>
            </div>
          </div>
          <div className={'ms-lg6'} style={{marginTop: '28px'}}>
            <Dropdown
              placeholder="Select an option"
              label="Font"
              selectedKey={data.font}
              options={fontOptions}
              className={'w-100 ml-2'}
              onChange={(e, param: any)=>updateGraphData(param.key, 'font')}
            />
          </div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col d-flex w-100 mb-1" style={{flexFlow: 'column'}}>
          <Label>Settings For</Label>
          <div className={'ms-lg4 worksheetTable br-1-blk'}>
            {columnList.map((item) => {
              return (
                <div
                  className={'cursur-pointer list ' + ((item.selected) ? 'active' : '')}
                  onClick={() => selectType(item.index)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="ms-Grid-col d-flex w-100" style={{flexFlow: 'column'}}>
            {
              (type==1) &&
              <>
                <div className={'br-1-blk p-1'}>
                  <Label>Single Curve</Label>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Symbol</Label>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={data.Symbols.single.symbol}
                      options={symbolOptions}
                      styles = {dropdownStyles}
                      className={'ml-1 ms-lg6'}
                      onChange={(e, param: any)=>updateGraphData(param.key, 'Symbols.single.symbol')}
                    />
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Fill color</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.Symbols.single.fillcolor}
                      change={(args) => updateGraphData(args.value, 'Symbols.single.fillcolor')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                </div>
                <div className={'br-1-blk mt-1 p-1'}>
                  <Label>Multiple Curves</Label>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Symbol</Label>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={data.Symbols.multiple.symbol}
                      options={symbolOptions}
                      styles = {dropdownStyles}
                      className={'ml-1 ms-lg6'}
                      onChange={(e, param: any)=>updateGraphData(param.key, 'Symbols.multiple.symbol')}
                    />
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Fill color</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.Symbols.multiple.fillcolor}
                      change={(args) => updateGraphData(args.value, 'Symbols.multiple.fillcolor')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                </div>
                <div className={'br-1-blk mt-1 p-1'}>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Size</Label>
                    {/* <TextField type="number" onChange={(e: any)=>updateGraphData(e.target.value, 'Symbols.size')} value={data.Symbols.size} className={'ml-1 ms-lg6'}/> */}
                    {/* <SpinButton
                      className={'ml-1 ms-lg6'}
                      value={data.Symbols.size + suffix}
                      min={min}
                      max={max}
                      step={step}
                      styles={styles}
                      onChange={(e: any)=>updateGraphData(parseFloatValue(e.target.value), 'Symbols.size')}
                      onIncrement={(value)=>{updateGraphData(parseFloatValue(value,step, 'increment'), 'Symbols.size')}}
                      onDecrement={(value)=>updateGraphData(parseFloatValue(value, step, 'decrement'), 'Symbols.size')}
                    /> */}
                    <TextField 
                      type="number" 
                      step="0.1" 
                      suffix={suffix}
                      onChange={(e: any) => updateGraphData(e.target.value, 'Symbols.size')}
                      value={data.Symbols.size} 
                      className={'ml-1 ms-lg3'} 
                    />
                  </div>
                </div>
              </>
            }{
              (type==2) &&
              <>
                <div className={'br-1-blk p-1'}>
                  <Label>Single Curve</Label>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Line Type</Label>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={data.lines.single.linetype}
                      options={dashOptions}
                      className={'ml-1 ms-lg6'}
                      onChange={(e, param: any)=>updateGraphData(param.key, 'lines.single.linetype')}
                    />
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Color</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.lines.single.color}
                      change={(args) => updateGraphData(args.value, 'lines.single.color')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                </div>
                <div className={'br-1-blk mt-1 p-1'}>
                  <Label>Multiple Curves</Label>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Line Types</Label>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={data.lines.multiple.linetype}
                      options={dashOptions}
                      className={'ml-1 ms-lg6'}
                      onChange={(e, param: any)=>updateGraphData(param.key, 'lines.multiple.linetype')}
                    />
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Color</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.lines.multiple.color}
                      change={(args) => updateGraphData(args.value, 'lines.multiple.color')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                </div>
                <div className={'br-1-blk mt-1 p-1'}>
                  <div className={'ms-lg-12 d-flex'}>
                  <Label className={'ml-1 ms-lg6'}>Thickness</Label>
                    {/* <TextField type="number" onChange={(e: any)=>updateGraphData(e.target.value, 'lines.thickness')} value={data.lines.thickness} className={'ml-1 ms-lg6'}/> */}
                    <SpinButton
                      className={'ml-1 ms-lg6'}
                      value={data.lines.thickness + suffix}
                      min={min}
                      max={max}
                      step={step}
                      styles={styles}
                      onChange={(e: any)=>updateGraphData(parseFloatValue(e.target.value), 'lines.thickness')}
                      onIncrement={(value)=>{updateGraphData(parseFloatValue(value,step, 'increment'), 'lines.thickness')}}
                      onDecrement={(value)=>updateGraphData(parseFloatValue(value, step, 'decrement'), 'lines.thickness')}
                    />
                  </div>
                </div>
              </>
            }
            {
              (type==3) &&
              <>
                <div className={'br-1-blk p-1'}>
                  <Label>Bar properties</Label>
                  <div className={'ms-lg-12 d-flex'}>
                    <Label className={'ml-1 ms-lg6'}>Single series</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.fills.singleSeries}
                      change={(args) => updateGraphData(args.value, 'fills.singleSeries')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Multiple groups</Label>
                    <ColorPickerComponent
                      id="colorpicker"
                      value={data.fills.multipleGroups}
                      change={(args) => updateGraphData(args.value, 'fills.multipleGroups')}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                      />
                    </ColorPickerComponent>
                  </div>
                  <div className={'ms-lg-12 d-flex mt-1'}>
                    <Label className={'ml-1 ms-lg6'}>Bar thickness</Label>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={data.fills.barThickness}
                      options={barThicknessOptions}
                      className={'ml-1 ms-lg6'}
                      onChange={(e, param: any)=>updateGraphData(param.key, 'fills.barThickness')}
                    />
                  </div>
                </div>
              </>
            }
        </div>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    optionsState: state.optionsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      optionsAction: bindActionCreators(optionsAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph);
