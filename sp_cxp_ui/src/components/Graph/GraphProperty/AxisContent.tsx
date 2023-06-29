import React, { useState } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useEffect } from 'react';

import { useBoolean } from '@uifabric/react-hooks';
import { getAxisModifiedJSON } from "../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import * as actionCreators from '../../../store/Helpmenu/actions';
import { connect } from 'react-redux';

import TickLabelFont, {FontAttr} from './AxisSubListContent/TickLabelFont';

const AxisContent = (props: any) => {
  console.log(props)
  const [title, setTitle] = useState(props.axisProp.title.text);
  const [isShowFontDialog, { setTrue: showFontDialog, setFalse: hideFontDialog },] = useBoolean(false);

  useEffect(()=>{
    setTitle(props.axisProp.title.text)
  },[props])
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__axis")
  },[])
  
  const onRenameButtonClicked = () =>{
    const newTitle = {
      title:{
        ...props.axisProp.title,
        text: title
      }    
    }

    const [newLayout, newProperties] = getAxisModifiedJSON(newTitle, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout,newProperties)
  }

  const fontBoxOnClick = (fontAttr: FontAttr) => {
    const newTitle = {
      title:{
        ...props.axisProp.title,
        font:{
          ...fontAttr
        }
      }    
    }

    const [newLayout, newProperties] = getAxisModifiedJSON(newTitle, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout,newProperties)
    hideFontDialog();
  };

  return (
    <div className="insets-container">
      <div className="insets-header" style={{ marginBottom: '5px', marginTop: '5px'}}>
        <Label>
          Show Axis Title
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft:'5px' }}>
        <TextField 
          value={title} 
          onChange={(ev)=>setTitle(ev.target.value)}
          className={'ms-lg11'}/>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
        <DefaultButton
          text="Font"
          style={{ width: '80px', height: '27px' }}
          onClick={showFontDialog} />
        <DefaultButton
          text="Rename"
          style={{ marginLeft:'5px', width: '80px', height: '27px' }}
          onClick={onRenameButtonClicked} />
      </div>

      {isShowFontDialog && (
        <TickLabelFont
          hideFontDialog={hideFontDialog}
          handleSubmit={fontBoxOnClick}
          tickLabelFont={props.axisProp.title.font}
        />
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(AxisContent);

