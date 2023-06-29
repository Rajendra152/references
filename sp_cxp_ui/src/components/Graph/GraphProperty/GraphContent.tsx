import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@uifabric/react-hooks';
import TickLabelFont, {FontAttr} from './AxisSubListContent/TickLabelFont';
const GraphContent = (props:any) => {
  const [title, setTitle] = useState(props.layout.title.text);
  const [isShowFontDialog, { setTrue: showFontDialog, setFalse: hideFontDialog },] = useBoolean(false);
 
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "")
  },[])

  useEffect(()=>{
    setTitle(props.layout.title.text);
  },[props.layout.title.text])

  const onRenameButtonClicked = () =>{
    const newTitle = {
      ...props.titleObj,
      text: title
    }
    const newLayout = {
      ...props.layout,
      title: newTitle
    }
    const newProperties = {
      ...props.properties
    }

    props.graphPropertyOnChange(newLayout,newProperties)
  }

  const fontBoxOnClick = (fontAttr: FontAttr) => {
    const newTitle = {
      ...props.titleObj,
      font:{
        ...fontAttr
      }
    }
    const newLayout = {
      ...props.layout,
      title: newTitle
    }
    const newProperties = {
      ...props.properties
    }
    props.graphPropertyOnChange(newLayout, newProperties);
    hideFontDialog();
  };

  return (
    <div className="insets-container">
      <div className="insets-header" style={{ marginBottom: '5px', marginTop: '5px'}}>
        <Label>
          Graph Title
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
          tickLabelFont={props.layout.title.font}
        />
      )}
    </div>
  );
};

export default GraphContent
