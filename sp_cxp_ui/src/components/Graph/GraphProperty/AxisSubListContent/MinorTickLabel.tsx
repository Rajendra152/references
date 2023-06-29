
import React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import Series from './MinorTickLabelsSeries';
import Numeric from './MinorTickLabelsNumeric';
import { useState,useEffect } from 'react';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const tickTypes = [
  { key: 'numeric', text: 'Numeric', disabled: false },
  { key: 'series', text: 'Series', disabled: false },
];



const MinorTickLabels = (props: any) => {
  const [tickType, setTickType] = useState("numeric")
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__tick_label")
  },[])
  const typeOnChange = (ev, item) => {
    setTickType(item.key)
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
        Tick Label Type
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <Dropdown
          selectedKey={tickType}
          options={tickTypes}
          // styles={dropdownStyles}
          className={'ms-lg6'}
          onChange = {typeOnChange}
        />
        <div className="btn-tick">
         <DefaultButton   
          text="Font"
          className={'ms-lgOffset3 inset-btn '}
          disabled
         />
         </div>
      </div> 

      {tickType === "numeric" ? <Numeric {...props}/>  : <Series {...props}/> }
      
      
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
export default connect(mapStateToProps, mapDispatchToProps)(MinorTickLabels);
