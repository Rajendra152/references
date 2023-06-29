import { globalShortcut } from 'electron';
import React, { Dispatch, useEffect, useRef, useState } from 'react';

export const GraphPage = (props) => {

  const [name, setName] = useState(props.graphPage.name);
  const graphData = props.graphPage;
  const inputRef = useRef(null);

  const setItemOnClick = (data, event) => {
    let allActiveItem = {
      notebook: data.parentNotebookId,
      section: data.parentSectionId,
      worksheet: null,
      graphPage: {
        id: data.id,
        objectId: null,
      },
      report: null,
      selectedItemOnNotebook: data.id,
      cursor: data.id,
    };

    props.setItemSelectedOnClick(allActiveItem, graphData, event);
    //props.onHandleClick(data,allActiveItem)
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }

  })

  useEffect(()=>{
    setName(props.graphPage.name);
  },[props.renameId])


  const itemRenamingOnBlur = () =>{
    props.onItemRenaming(graphData, name)
    if(name == ''){
      setName(graphData.name);
    }
  }


  return (
    <>
      {props.renameId !== graphData.id ? (
          <div
            className="subsheet-data"
            onClick={(event) => setItemOnClick(graphData, event)}
            onDoubleClick={() => props.openItemInCanvas(graphData)}
            >
            {graphData.name} {!graphData.isSaved && graphData.isSaved!== undefined && '*'}
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

export default GraphPage;
