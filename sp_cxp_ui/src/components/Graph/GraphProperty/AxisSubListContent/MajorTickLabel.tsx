
import React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DefaultButton } from '@fluentui/react/lib/Button';
import Series from './MajorTickLabelsSeries';
import Numeric from './MajorTickLabelsNumeric';
import { useState ,useEffect} from 'react';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const tickTypes = [
  { key: 'numeric', text: 'Numeric', disabled: false },
  // { key: 'series', text: 'Series', disabled: false },
];
import { useBoolean } from '@uifabric/react-hooks';
import TickLabelFont, {FontAttr} from './TickLabelFont';
// import { getLegendsModifiedJSON } from '../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON';
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import {getAxisJSON} from "../../../../utils/graphDailogProperty/axisSubListJSON/getAxisInsetsJSON";


const MajorTickLabels = (props: any) => {
  const [tickType, setTickType] = useState("numeric")
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__tick_label")
  },[])
  const typeOnChange = (ev: any, item: any) => {
    setTickType(item.key)
  }
  const [isShowFontDialog, { setTrue: showFontDialog, setFalse: hideFontDialog },] = useBoolean(false);
  const fontBoxOnClick = (fontAttr: FontAttr) => {
    let newProps = {
      ...props.majTckProp,
      tickfont: fontAttr
    };
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis);
    props.graphPropertyOnChange(newLayout, newProperties);
    hideFontDialog();
  };

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
          onClick={showFontDialog}
         />
         </div>
      </div> 

      {tickType === "numeric" ? <Numeric {...props}/>  : <Series {...props}/> }

      {isShowFontDialog && (
        <TickLabelFont
          hideFontDialog={hideFontDialog}
          handleSubmit={fontBoxOnClick}
          tickLabelFont={getAxisJSON(props.layout,{key: props.currAxis}).tickfont}
        />
      )}
    </div>
  );
};

function mapStateToProps(state:any) {
  return {
  };
}

function mapDispatchToProps(dispatch:any) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MajorTickLabels);
