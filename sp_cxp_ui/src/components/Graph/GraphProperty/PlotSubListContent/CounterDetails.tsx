
import React,{useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import ContourSeries from './ContourDetailsSeries'
import ContourNumeric from './ContourDetailNumeric';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/Helpmenu/actions';

const labeTypeOptions = [
  { key: 'numeric', text: 'Numeric', disabled: false },
  { key: 'series', text: 'Series', disabled: false },
];



const ContourDetails = (props: any) => {
  const [labeType, setlabeType] = useState("numeric")
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "pub_dtlgraph_properties__contour_detail")
  },[])
  const typeOnChange = (ev, item) => {
    setlabeType(item.key)
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
          selectedKey={labeType}
          options={labeTypeOptions}
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

      {labeType === "numeric" ? <ContourNumeric {...props}/>  : <ContourSeries {...props}/> }
      
      
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
export default connect(mapStateToProps, mapDispatchToProps)(ContourDetails);
