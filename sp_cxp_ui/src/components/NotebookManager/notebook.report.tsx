import React, { Dispatch, useState, useEffect, useRef } from 'react';

export const Report = (props) => {
  const reportData = props.report;
  const [name, setName] = useState(reportData.name);
  const inputRef = useRef(null);


  const setItemOnClick = (data, event) => {
    let allActiveItem = {
      notebook: data.parentNotebookId,
      section: data.parentSectionId,
      worksheet: null,
      graphPage: {
        id: null,
        objectId: null,
      },
      report: data.id,
      selectedItemOnNotebook: data.id,
      cursor: data.id,
    };

    props.setItemSelectedOnClick(allActiveItem, reportData, event);
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  })

  useEffect(()=>{
    setName(props.report.name);
  },[props.renameId])

  const itemRenamingOnBlur = () =>{
    props.onItemRenaming(reportData, name)
    if(name == ''){
      setName(reportData.name);
    }
  }

  return (
    <>
      {props.renameId !== reportData.id ? (
        <div
          className="subsheet-data"
          onClick={(event) => setItemOnClick(reportData, event)}
          onDoubleClick={() => props.openItemInCanvas(reportData)}
          >
          {reportData.name} {!reportData.isSaved && reportData.isSaved!== undefined && '*'}
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

export default Report;
