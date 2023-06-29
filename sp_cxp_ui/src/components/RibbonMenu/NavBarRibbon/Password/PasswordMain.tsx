import React, { useState, useEffect } from 'react';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  ContextualMenu,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  Stack,
  IStackProps,
  IStackStyles,
  IStackTokens
} from 'office-ui-fabric-react/lib/Stack';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalCompontent from '../ModalCompontent/Modal/ModalCompontent';
import BottomSection from '../ModalCompontent/Compontent/BottomSection';
import * as auditingAction from '../../../../store/MainWindow/Auditing/actions';
import AuditLog from '../../../../services/AuditLogService';
import { getDefaultAuditLogObject } from '../../../../services/notebookManagerServices/GetDefaultObject';

import {
  IStyleSet,
  Label,
  ILabelStyles,
  Pivot,
  PivotItem,
} from '@fluentui/react';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

function PasswordMain(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reconfirmPassword, setReconfirmPassword] = useState('');
  const [addPassword, setAddPassword] = useState(false);
  const [disabledOldPassword, setDisabledOldPassword] = useState(false);
  const oldPasswordChangeHandler = (event) => {
    setOldPassword(event.target.value);
  };

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const reconfirmPasswordChangeHandler = (event) => {
    setReconfirmPassword(event.target.value);
  };

  const changePassBtn = (event) =>{
    setAddPassword(true);
  }

  const changePassSubmitHandler = (event) =>{
    let pswStatus = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isPassword,
    status = false;
    if(pswStatus===true){
      let oldPass = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.password;
      if(oldPass == oldPassword){
        status = true
      }
    }
    if(pswStatus==true&&status==false){
      alert("The old password does not match. Please make sure you correctly type in the old password and that your Caps Lock key is turned off.")
    }else{
      setAddPassword(false);
      setDisabledOldPassword(false);
      const passwordObj = {
        oldPassword: undefined,
        newPassword: undefined,
        reconfirmPassword: undefined
      };
      props.actions.auditingAction.isPasswordUpdate({ message: passwordObj })
      const currentID = props.allActiveItem.notebook;
      const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
      currentNotebook.password = {...currentNotebook.password, ...{
        password: passwordObj.reconfirmPassword,
        isPassword: false,
      }};
    }
    
  }

  const submitHandler = (event) => {
    let pswStatus = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isPassword,
    status = false;
    if(pswStatus===true){
      let oldPass = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.password;
      if(oldPass == oldPassword){
        status = true;
      }
    }
    if(pswStatus==true&&status==false){
      alert("The old password does not match. Please make sure you correctly type in the old password and that your Caps Lock key is turned off.")
    }else {
      if(newPassword){     
      if(newPassword === reconfirmPassword){
        const passwordObj = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          reconfirmPassword: reconfirmPassword
        };
        props.actions.auditingAction.isPasswordUpdate({ message: passwordObj })
        const currentID = props.allActiveItem.notebook;
        const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
        currentNotebook.password = {...currentNotebook.password, ...{
          password: passwordObj.reconfirmPassword,
          isPassword: true,
        }},
          AuditLog.log(currentNotebook, getDefaultAuditLogObject('Auditing Password Set'));
          props.actions.auditingAction.isPasswordMain({
            message: false,
          })
        console.log(props.auditingState.isPasswordData, 'passwordObj');
      }else{
        alert("Mismatch Password");
        return false;
      }
    }else{
      alert("Please give your password");
        return false;
    }
    }
  }

const handleChangeCopy = (e) => {
  console.log(e.target.innerHTML); 
  alert("You cannot copy text from a password field");
  e.preventDefault();
  console.log("no");
};

useEffect(()=>{
    const currentNote =  props.notebooks.allNotebooks.byId[props.allActiveItem.notebook];
    if(currentNote){
      if(currentNote.password){
        setDisabledOldPassword(props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isPassword)
      }
    }else{
      props.actions.auditingAction.isPasswordMain({
        message: false,
      })
      alert('Please create new notebook')
    }
  })

// const disabledOldPassword = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isPassword;
console.log('PasswordMain1');
  return (
    <div>
      {!addPassword&& <ModalCompontent
        component={
          <>
            <Stack horizontal className={`flex-container p-1 pt-0`}>
              <PivotItem headerText="Auditing">
                {/* <TextField
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  canRevealPassword={disabledOldPassword}
                  onChange={oldPasswordChangeHandler}
                  disabled={!disabledOldPassword}
                /> */}
                 {/* <Stack {...columnProps}> */}
                <TextField
                  label="Password"
                  type="password"
                  onCopy={handleChangeCopy}
                  onCut={handleChangeCopy}
                  value={newPassword}
                  canRevealPassword={!disabledOldPassword}
                  onChange={newPasswordChangeHandler}
                  className={'custom-input-flex'}
                  disabled={disabledOldPassword}
                />
                {/* </Stack> */}
                <TextField
                  label="Verify"
                  type="password"
                  onCopy={handleChangeCopy}
                  onCut={handleChangeCopy}
                  value={reconfirmPassword}
                  canRevealPassword={!disabledOldPassword}
                  onChange={reconfirmPasswordChangeHandler}
                  className={'custom-input-flex'}
                  disabled={disabledOldPassword}
                />
                <DefaultButton text="Change Password" onClick={changePassBtn} disabled={!disabledOldPassword} style={{marginLeft: 120, marginTop: 20}}  allowDisabledFocus />
              </PivotItem>
            </Stack>
            <BottomSection
             type={3}
              component={
                <>
                <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton text="OK" className="w-65 bg-green mt-1" onClick={submitHandler} allowDisabledFocus />
                  </Stack>
                  <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton text="Cancel" className="w-65 mt-1" allowDisabledFocus onClick={()=>{ props.actions.auditingAction.isPasswordMain({
                      message: false,
                    })}}/>
                  </Stack>
                </>
              }
            />            
          </>
        }
        close={() =>
          props.actions.auditingAction.isPasswordMain({
            message: false,
          })
        }
        title={'Set Password'}
        windowSize={'small'}
        isDraggable={false}
        isModeless={false}
        keepInBounds={false}
        isBlocking={true}
      ></ModalCompontent>}
      {addPassword&& 
      <ModalCompontent
      component={
        <>
          <Stack horizontal className={`flex-container p-1 pt-0`}>
            <PivotItem headerText="Auditing">
              <TextField
                label="Password"
                type="password"
                value={oldPassword}
                onCopy={handleChangeCopy}
                onCut={handleChangeCopy}
                canRevealPassword={disabledOldPassword}
                onChange={oldPasswordChangeHandler}
                disabled={!disabledOldPassword}
              />
              {/* <DefaultButton text="Change Password" onClick={changePassBtn} disabled={!disabledOldPassword} style={{marginLeft: 120, marginTop: 20}}  allowDisabledFocus /> */}
            </PivotItem>
          </Stack>
          <BottomSection
            component={
              <>
              <Stack tokens={stackTokens} className={`offset1`}>
                <DefaultButton text="OK" className="w-65 bg-green mt-1" onClick={changePassSubmitHandler} allowDisabledFocus />
                </Stack>
                <Stack tokens={stackTokens} className={`offset1`}>
                <DefaultButton text="Cancel" className="w-65 mt-1" allowDisabledFocus onClick={()=>{ props.actions.auditingAction.isPasswordMain({
                    message: false,
                  })}}/>
                </Stack>
              </>
            }
            type={""}
          />
          
        </>
      }
      close={() =>
        props.actions.auditingAction.isPasswordMain({
          message: false,
        })
      }
      title={'Enter Password'}
      windowSize={'small'}
      isDraggable={false}
      isModeless={false}
      keepInBounds={false}
      isBlocking={true}
    ></ModalCompontent>
      }

    </div>
  );
}

function mapStateToProps(state) {
  return {
    auditingState: state.auditingReducer,
    notebooks: state.notebookReducer.notebooks,
    allActiveItem: state.notebookReducer.allActiveItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auditingAction: bindActionCreators(auditingAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordMain);
