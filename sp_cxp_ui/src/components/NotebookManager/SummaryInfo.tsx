import React, { useEffect, useState } from 'react';
import { connect, } from 'react-redux';
import { bindActionCreators } from "redux";
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';


// import * as summaryInfo from "../../store/SummaryInfo/actions";

const SummaryInfo = (props: any) => {
  console.log("summary", props)
  let { id, type, createdDate, modifiedDate, author, description } = props.summaryDetails
  const [AuthorName, setAuthorName] = useState(author)
  const [DescriptionName, setDescription] = useState(description)

  
  const getExistSummary = () => {
    if (type == 'notebook') {
      return props.notebooks.allNotebooks.byId.hasOwnProperty(id)
    }
    else if (type == 'worksheet') {
      return props.notebooks.allWorksheets.byId.hasOwnProperty(id)
    }
    else if (type == 'report') {
      return props.notebooks.allReports.byId.hasOwnProperty(id)
    }
    else if (type == 'graphPage') {
      return props.notebooks.allGraphPages?.byId.hasOwnProperty(id)
    }
    else if (type == 'transform') {
      return props.notebooks.allTransforms?.byId.hasOwnProperty(id)
    }
    else if (type == 'equation') {
      return props.notebooks.allEquations?.byId.hasOwnProperty(id)
    }
  }

  if (type == 'section' || !getExistSummary()) {
    createdDate = '';
    modifiedDate = '';
    author = '';
    description = '';
    // setAuthorName('')

  }
  else {
    modifiedDate = new Date(modifiedDate).toLocaleString()
    createdDate = new Date(createdDate).toLocaleString()
  }
  useEffect(()=>{
    console.log("heye",props.summaryDetails.author)
    setAuthorName(props.summaryDetails.author)
    setDescription(props.summaryDetails.description)
  },[type])
  useEffect(()=>{
    console.log("heye22",type)
    if (type == 'section'){
      setAuthorName('')
      setDescription('')
    }  
    else{
      
    }  // setAuthorName(props.summaryDetails.author)
  })
  const AuthorChange = (event) => {
    setAuthorName(event.target.value)
  }
  const DescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  

  return (
    <div className="sidemenu-notebook-list-content summary-details">
      <div className="summary-row">
        <div className="summary-dd-label">
          <label className="lbl-vlu">Created:</label>
        </div>
        <div className="summary-dd-content">
          <span className="cont-vlu">{createdDate}</span>
        </div>
      </div>
      <div className="summary-row">
        <div className="summary-dd-label">
          <label className="lbl-vlu">Modified:</label>
        </div>
        <div className="summary-dd-content">
          <span className="cont-vlu">{modifiedDate}</span>
        </div>
      </div>
      <div className="summary-row" style={{marginTop:"2px"}}>
        <div className="summary-dd-label" style={{marginTop:"2px"}}>
          <label className="lbl-vlu">Author:</label>
        </div>
        <div className="summary-dd-content summary-input">
          <TextField defaultValue={author} borderless value={author=""?author:AuthorName} onChange={(ev) => AuthorChange(ev)} />

          {/* <span className="cont-vlu">{author} </span> */}
        </div>
      </div>
      <div className="summary-row" style={{marginTop:"2px"}}>
        <div className="summary-dd-label" style={{marginTop:"2px"}}>
          <label className="lbl-vlu">Description:</label>
        </div>
        <div className="summary-dd-content summary-input">
          <TextField defaultValue={DescriptionName} borderless value={DescriptionName} onChange={(ev) => DescriptionChange(ev)} />
            {/* This Section holds all the valuable data and graphs we need
                to do our work on important reasearch. We couldn't do our
                work without the wonderful SigmaPlot application */}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    summaryDetails: state.summaryInfoReducer,
    notebooks: state.notebookReducer.notebooks,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    //   summaryInfoUpdate: bindActionCreators(summaryInfo, dispatch),
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SummaryInfo);