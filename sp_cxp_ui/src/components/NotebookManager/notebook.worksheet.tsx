import React, { Dispatch, useState, useRef, useEffect } from 'react';

export const Worksheet = (props) => {

  const [name, setName] = useState(props.worksheet.name);
  const worksheetData = props.worksheet;
  const inputRef = useRef(null);

  const setItemOnClick = (data, event) => {
    let allActiveItem = {
      notebook: data.parentNotebookId,
      section: data.parentSectionId,
      subSection: data.parentSubSectionId,
      worksheet: data.id,
      graphPage: {
        id: null,
        objectId: null,
      },
      report: null,
      selectedItemOnNotebook: data.id,
      cursor: data.id,
    };

    props.setItemSelectedOnClick(allActiveItem,worksheetData, event);
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  })

  useEffect(()=>{
    setName(props.worksheet.name);
  },[props.renameId])

  const itemRenamingOnBlur = () =>{
    props.onItemRenaming(worksheetData, name)
    if(name == ''){
      setName(worksheetData.name);
    }
  }

  return (
    <>
      {props.renameId !== worksheetData.id ? (
        <div
          className="subsheet-data"
          onClick={(event) => setItemOnClick(worksheetData, event)}
          onDoubleClick={() => props.openItemInCanvas(worksheetData)}
        >
          <span>{worksheetData.name} {!worksheetData.isSaved && worksheetData.isSaved!== undefined && '*'}</span>
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

export default Worksheet;
