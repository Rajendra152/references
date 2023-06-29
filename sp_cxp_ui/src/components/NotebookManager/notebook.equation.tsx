import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TransformAction from '../../store/Analysis/Transform/actions';

export const Equation = (props: any) => {
  const equationData = props.equation;
  const [name, setName] = useState(equationData.name);
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
      equation: data.id,
      selectedItemOnNotebook: data.id,
      cursor: data.id,
    };

    props.setItemSelectedOnClick(allActiveItem, equationData, event);
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  })

  useEffect(()=>{
    setName(props.equation.name);
  },[props.renameId])

  const itemRenamingOnBlur = () =>{
    props.onItemRenaming(equationData, name)
    if(name == ''){
      setName(equationData.name);
    }
  }

  const openEquation = (equationData: any) => {
    console.log(equationData, props.actions);
    props.actions.TransformAction.isOpenEquation({
      message: true,
      equationId: equationData.id
    })
  }

  return (
    <>
      {props.renameId !== equationData.id ? (
        <div
          className="subsheet-data"
          onClick={(event) => setItemOnClick(equationData, event)}
          onDoubleClick={() => openEquation(equationData)}
          >
          {equationData.name} {!equationData.isSaved && equationData.isSaved!== undefined && '*'}
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
export default connect(null, mapDispatchToProps)(Equation);