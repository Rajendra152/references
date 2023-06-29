import React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ProgressAction from "./../../store/Channel/Progress/actions";
import * as importfileAction from "./../../store/Worksheet/FileImport/actions";

const Progress_bar = (props) => {

  const CenterAlign = {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    width: '40%',
    top: '45%',
    borderRadius: '8px',
    left: '30%',
    background: '#fff',
    boxShadow: '-2px 2px 4px 2px #e6e6e6'
  }

  const CenterProgress = {
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 100,
    // width: '70%',
    // top: '45%',
    borderRadius: '8px',
    // left: '20%',
    background: '#fff',
    bottom: '0px'
    // boxShadow: '-2px 2px 4px 2px #e6e6e6'
  }

  const Parentdiv = {
    height: props.height,
    width: '50%',
    backgroundColor: 'whitesmoke',
    borderRadius: 0,
    margin: 5,
  }

  const Childdiv = {
    height: '100%',
    width: `${props.progress}%`,
    backgroundColor: props.bgcolor,
    borderRadius: 3,
    textAlign: 'right'
  }

  const progresstext = {
    padding: 5,
    color: 'black',
    fontWeight: 900,
    fontSize: 12,
    verticalAlign: 'super'
  }

  return (
    <div style={CenterAlign}>
      <div className={'pset text-left'} style={{fontSize: 14, marginTop: 5}}><b>Importing</b></div>
      <div className={'pset'}><p className={'m-0'} style={{fontSize: 12}}>Processing... Please Wait</p></div>
      <div style={CenterProgress}>
        <div style={Parentdiv}>
          <div style={Childdiv}>
            <span style={progresstext}>
              {`${props.progress}%`}
            </span>
          </div>
        </div>

      </div>
      {/* <div className={'pset'}><button>Cancel</button></div> */}
      {/* <div className={'pset'}><DefaultButton secondaryText="Cancel" onClick={()=>{
        props.actions.ProgressAction.isLoadBar({message: false});
        props.actions.importfileAction.isOpenFieldSelection({message: false});
        props.actions.importfileAction.isOpenImportfile({message:false});
        props.actions.importfileAction.isOpenImportText({ message: false });
      }} className={`text-block mb-1`} text="Cancel" /></div> */}
    </div>

  )
}

// export default Progress_bar;
function mapStateToProps(state) {
  return {
    channelState: state.progressBarReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importfileAction: bindActionCreators(importfileAction, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
    },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Progress_bar);
