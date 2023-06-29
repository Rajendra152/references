import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TransformAction from '../../store/Analysis/Transform/actions';

export const Transform = (props: any) => {
  const transformData = props.transform;
  const [name, setName] = useState(transformData.name);
  const inputRef = useRef(null);


  const setItemOnClick = (data: any, event) => {
    let allActiveItem = {
      notebook: data.parentNotebookId,
      section: data.parentSectionId,
      worksheet: null,
      graphPage: {
        id: null,
        objectId: null,
      },
      transform: data.id,
      selectedItemOnNotebook: data.id,
      cursor: data.id,
    };

    props.setItemSelectedOnClick(allActiveItem, transformData, event);
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  })

  useEffect(()=>{
    setName(props.transform.name);
  },[props.renameId])

  const itemRenamingOnBlur = () =>{
    props.onItemRenaming(transformData, name)
    if(name == ''){
      setName(transformData.name);
    }
  }

  const openTransform = (transformData: any) => {
    console.log(transformData, props.actions);
    props.actions.TransformAction.isOpenUserDefined({
      message: true,
      transformId: transformData.id
    })
  }

  return (
    <>
      {props.renameId !== transformData.id ? (
        <div
          className="subsheet-data"
          onClick={(event) => setItemOnClick(transformData, event)}
          onDoubleClick={() => openTransform(transformData)}
          >
          {transformData.name} {!transformData.isSaved && transformData.isSaved!== undefined && '*'}
        </div>

      ) : (
        <div className="subsheet-data">
          <input
              value={name}
              onChange = {(ev)=>setName(ev.target.value)}
              style = {{width: (name.length) + "ch"}}
              onBlur = {itemRenamingOnBlur}
              ref ={inputRef}></input>
        </div>
      )}
    </>
  );

};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      TransformAction: bindActionCreators(TransformAction, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(Transform);