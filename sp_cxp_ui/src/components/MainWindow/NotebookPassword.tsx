import React, { useState } from 'react';
import {
  Stack,
  IStackProps,
  IStackStyles,
} from 'office-ui-fabric-react/lib/Stack';
import {
  IStyleSet,
  Label,
  ILabelStyles,
  Pivot,
  PivotItem,
} from '@fluentui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ModalCompontent from './../RibbonMenu/NavBarRibbon/ModalCompontent/Modal/ModalCompontent';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  openNotebookFile
} from './../../services/NotebookManagerServicesNew';
import * as auditingAction from './../../store/MainWindow/Auditing/actions';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';

function NotebookPassword(props: {
  noteBookpanelClose: any;
  noteBookpanel: boolean;
  toggleOpen: boolean;
}) {
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    const currNbkId = props.auditingState.EncrpNotebook.decData.allNotebooks.allNotebooksId[0];
    const currNbk = props.auditingState.EncrpNotebook.decData.allNotebooks.byId[currNbkId];
    if(currNbk.password.password==password){
      props.actions.auditingAction.isOpenNotePass({message: false});
      openNotebookFile(props.auditingState.EncrpNotebook.decData, props.auditingState.EncrpNotebook.props);
    }else{
     alert('password wrong');
    }
    // openNotebookFile(decodeInfo, props);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <ModalCompontent
        component={
          <>
            <Stack horizontal className={`flex-container br-1 p-1`}>
              <PivotItem headerText="">
                <TextField
                  label=""
                  type="password"
                  value={password}
                  canRevealPassword
                  onChange={passwordChangeHandler}
                />
              </PivotItem>
            </Stack>
            <DefaultButton text="ok" className="mt-1" onClick={submitHandler} allowDisabledFocus />
            <DefaultButton text="cancel" className="ml-1 mr-1 mt-1" onClick={()=>{props.actions.auditingAction.isOpenNotePass({message: false});}} allowDisabledFocus />
          </>
        }
        className={''}
        close={() =>{
          props.actions.auditingAction.isOpenNotePass({message: false});
        }}
        title={'Notebook Password'}
      ></ModalCompontent>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    auditingState: state.auditingReducer
  };
}
function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    actions: {
      auditingAction: bindActionCreators(auditingAction, dispatch),
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotebookPassword);
