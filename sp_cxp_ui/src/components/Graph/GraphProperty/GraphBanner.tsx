import React, {FormEvent, useState} from 'react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { AnyNaptrRecord } from 'dns';

const Banner = (props:any) => {

  const graphOptions: IDropdownOption[] = [];
  const plotOptions: IDropdownOption[] = [];
  const axisOptions: IDropdownOption[] = [];

  for(const graph of props.allGraph){
    const obj:IDropdownOption = {
      key: graph.id,
      text: graph.layout.title.text,
      disabled: false,
    }
    graphOptions.push(obj)
  }

  for(const plot of props.allPlot){
    const obj:IDropdownOption = {
      key: plot.id,
      text: plot.isChecked ? plot.name :`${plot.name}  (Hidden)`,
      disabled: false,
    }
    plotOptions.push(obj)
  }

  for(const axis of props.allAxis){
    const obj:IDropdownOption = {
      key: axis.key,
      text: axis.text,
      disabled: false,
    }
    axisOptions.push(obj)
  }


  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200 },
  }

  const graphDropOnChange = (ev:FormEvent<HTMLDivElement>, item:IDropdownOption) =>{
    console.log(ev)
    console.log(item)
    const currSelGraph = props.allGraph.filter((ele:any) => ele.id === item.key)[0]
    props.graphOptionOnChange(currSelGraph);
  }

  const axisDropOnChange = (ev:FormEvent<HTMLDivElement>, item:IDropdownOption) =>{
    console.log(item)
    props.axisOptionOnChange(item)
  }

  const plotDropOnChange = (ev:FormEvent<HTMLDivElement>, item:IDropdownOption) =>{
    console.log(ev)
    console.log(item)
    props.plotOptionOnChange(item)
  }

  return (
    <div className='graphBanner'>
      <div className={'d-flex '} style={{ marginBottom: '5px' }}>
        <Label style={{ width: 50,padding: '5px 7px 0px 0px'}}>Graph</Label>
        <Dropdown
          defaultSelectedKey={props.currGraph.id}
          options={graphOptions}
          styles={dropdownStyles}
          className={'ml-1 mb-0'}
          onChange={graphDropOnChange}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '5px' }}>
        <Label style={{ width: 50, padding: '5px 7px 0px 0px'}}>Axis</Label>
        <Dropdown
          defaultSelectedKey={props.currAxis}
          options={axisOptions}
          styles={dropdownStyles}
          className={'ml-1 mb-0'}
          onChange={axisDropOnChange}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <Label style={{ width: 50,padding: '5px 7px 0px 0px'}}>Plot</Label>
        <Dropdown
          defaultSelectedKey={props.currPlot.id}
          options={plotOptions}
          styles={dropdownStyles}
          className={'ml-1 mb-0'}
          onChange={plotDropOnChange}
        />
      </div>
    </div>
  );
};

export default Banner
