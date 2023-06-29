import React, { useState }from 'react';
import CommonModalComp from "./../../CommonComp/CommonModalComp";
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import * as graphPropertyAction from "./../../../store/GraphProperty/GraphProperty/actions";
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Checkbox, Stack } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const options: IDropdownOption[] = [
  { key: 'graph', text: 'Graph', disabled: false },
  { key: 'banana', text: 'Banana', disabled: false },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
}

function ListCompontent(props) {
  let list = props.list;
  return (
    <>
      <ul>
      {
        list.map((a, index)=>
        <>
          <li key={index} className={'type'} onClick={()=>props.selectedGraph(a.type)}>{a.type}</li>
          {
            (a.subType) && <ListCompontent list={a.subType} selectedGraph={(param)=>selectedGraph(param)}></ListCompontent>
          }
        </>
        )
        }
      </ul>

    </>
  )
}

function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

const GraphProperty =(props)=>{
  const graphJSON = [
    {type: 'Graph', subType: [
      {type: 'Legends'},
      {type: 'Grids'},
      {type: 'Graph Planes'},
    ]},
    {type: 'Axis', subType: [
      {type: 'Lines'},
      {type: 'Scaling'},
      {type: 'Major Labels'},
      {type: 'Minor Labels'},
      {type: 'Major Tick Labels'},
      {type: 'Minor Tick Labels'},
      {type: 'Major Ticks'},
      {type: 'Minor Ticks'},
      {type: 'Breaks'},
    ]},
    {type: 'Plot', subType: [
      {type: 'Data'},
      {type: 'Symbols'},
      {type: 'Lines'},
      {type: 'Area Fills'},
      {type: 'Reference Lines'},
      {type: 'Drop Lines'},
    ]}
  ]

  const [layout, setlayout] = useState('');

  const selectedGraph = (param) =>{
    console.log(param);
    param = param.toLowerCase();
    if(param==='graph'){
      setlayout(param);
    }
    if(param==='axis'){
      setlayout(param);
    }
    if(param==='plot'){
      setlayout(param);
    }
  }

    return (
      <>
      <CommonModalComp
          close={()=>props.actions.graphPropertyAction.isOpenGraphProperty({message: false})}
          component={
            <>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      {
                        <ul className={'p-0 mainGraph'}>
                          {
                            graphJSON.map((a, index)=>
                            <>
                              <li key={index} className={'type'} onClick={()=>selectedGraph(a.type)}>{a.type}</li>
                              {
                                (a.subType) && <ListCompontent list={a.subType} selectedGraph={(param)=>selectedGraph(param)}></ListCompontent>
                              }
                            </>
                            )
                          }
                        </ul>
                      }
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                    <div className={'d-flex'} style={{marginBottom: '10px'}}>
                        <Label style={{width: 75}}>Graph</Label>
                        <Dropdown
                        placeholder="Select an option"
                        options={options}
                        styles={dropdownStyles}
                        className={'ml-2 mb-0'}
                        />
                    </div>
                    <div className={'d-flex'} style={{marginBottom: '10px'}}>
                        <Label style={{width: 75}}>Axis</Label>
                        <Dropdown
                        placeholder="Select an option"
                        options={options}
                        styles={dropdownStyles}
                        className={'ml-2 mb-0'}
                        />
                    </div>
                    <div className={'d-flex'} style={{marginBottom: '10px'}}>
                        <Label style={{width: 75}}>Plot</Label>
                        <Dropdown
                        placeholder="Select an option"
                        options={options}
                        styles={dropdownStyles}
                        className={'ml-2 mb-0'}
                        />
                    </div>
                    {
                      (layout==='graph')?
                      <>
                        <Label className="" style={{marginBottom: '10px'}}>Graph</Label>
                        <div style={{marginBottom: '10px'}}>
                          <Checkbox label="Show Title" onChange={_onChange} />
                        </div>
                        <div className={'d-flex'}>
                          <TextField  />
                          <DefaultButton text="Rename" className={'ml-2 text-black'}/>
                        </div>
                      </>:
                      (layout==='axis')?
                      <>
                      <Label className={''} style={{marginBottom: '10px'}}>Axis</Label>
                      <div className={'d-flex'}>
                          <TextField  />
                          <DefaultButton text="Rename" className={'ml-2 text-black'}/>
                        </div>
                      </>:
                      (layout==='plot')?
                      <>
                      <Label className={''} style={{marginBottom: '10px'}}>Show/Hide Plots</Label>
                      <div className={'d-flex'}>
                        <TextField  />
                        <DefaultButton text="Rename" className={'ml-2 text-black'}/>
                      </div>
                      </>: ''
                    }
                  </div>
                </div>
              </div>
            </>
          }
          title={'Graph Property'}
        ></CommonModalComp>
      </>
    )
}

function mapStateToProps(state) {
  return {
    graphPropertyState: state.graphPropertyReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GraphProperty);
