import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as gotoAction from "../../store/Worksheet/Goto/actions";

export function Test(props) {

  // async () => {
  // const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // console.log(result);
  // result.then((success)=>{
  //   console.log(success);
  // })
  // }
  const data = () =>{
    console.log(props);
  }

  return (
    <div>
      <h2 onClick={()=>props.actions.gotoAction.isOpenGoto({message: false})}>I am test page</h2>
      <p>{JSON.stringify(props.isOpenGoto)}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isOpenGoto: state.gotoReducer.isOpenGoto
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gotoAction: bindActionCreators(gotoAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)
