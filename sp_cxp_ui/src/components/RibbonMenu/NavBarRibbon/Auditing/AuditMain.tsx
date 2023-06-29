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
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalCompontent from '../ModalCompontent/Modal/ModalCompontent';
import BottomSection from '../ModalCompontent/Compontent/BottomSection';
import PasswordMain from '../Password/PasswordMain';
import * as auditingAction from '../../../../store/MainWindow/Auditing/actions';
import AuditLog from '../../../../services/AuditLogService';
import { getDefaultAuditLogObject } from '../../../../services/notebookManagerServices/GetDefaultObject';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: '100%', marginTop: 10 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200, right: 0, position: 'inherit' } },
};

const dragOptions: IDragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}



function AuditMain(props) {
  const [isEnableList, setisEnableList] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [reconfirmPassword, setReconfirmPassword] = useState('');
  const [openAuditPass, setOpenAuditPass] = useState(false);
  const [oldAuditPassword, setOldAuditPassword] = useState('');
  const [addPassword, setAddPassword] = useState(false);
  const [disabledOldPassword, setDisabledOldPassword] = useState(false);

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const reconfirmPasswordChangeHandler = (event) => {
    setReconfirmPassword(event.target.value);
  };

  const _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    console.log(`The option has been changed to ${isChecked}.`);
      setisEnableList(isChecked);
      const currentID = props.allActiveItem.notebook;
       const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
       currentNotebook.password = {...currentNotebook.password, ...{isEnableView: isChecked}}   
  }

  const submitHandler = (event) => {
    let oldPass = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.auditPassword;
    if(newPassword===oldPass|| oldPass==="" || oldPass === undefined || oldPass === null){
      props.actions.auditingAction.isEnableView({ message: isEnableList });
      const currentID = props.allActiveItem.notebook;
      const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
      currentNotebook.password = { ...currentNotebook.password, ...{ isEnableView: isEnableList } }
      if (isEnableList == true) {
        AuditLog.log(currentNotebook, getDefaultAuditLogObject('Auditing Enabled'));
      } else {
        AuditLog.log(currentNotebook, getDefaultAuditLogObject('Auditing Disabled'));
      }
      props.actions.auditingAction.isAuditMain({
        message: false
      })
    } else {
      alert("Auditing Password Wrong");
      return false;
    }


      // if(newPassword === reconfirmPassword){
      //   const passwordObj = {
      //     auditPassword: newPassword
      //   };
      //   const currentID = props.allActiveItem.notebook;
      //   const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
      //   currentNotebook.password = {...currentNotebook.password, ...{
      //     auditPassword: passwordObj.auditPassword
      //   }}
      //   console.log(props.auditingState.isPasswordData, 'passwordObj');
      //   props.actions.auditingAction.isAuditMain({
      //     message: false
      //   })
      // }else{
      //   alert("Mismatch Password");
      //   return false;
      // }
  };

  const openPassword = () =>{
    setOpenAuditPass(true)
  }

  const newAuditPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const reconfirmAuditPasswordChangeHandler = (event) => {
    setReconfirmPassword(event.target.value);
  };

  const changePassBtn = (event) =>{
    setNewPassword("");
    setReconfirmPassword("");
    setOldAuditPassword("")
    setAddPassword(true);
  }

  const changeAuditPassSubmitHandler = (event) =>{
    let pswStatus = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isAuditPassword,
    status = false;
    if(pswStatus===true){
      let oldPass = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.auditPassword;
      if(oldPass == oldAuditPassword){
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
      props.actions.auditingAction.isAuditPasswordUpdate({ message: passwordObj })
      const currentID = props.allActiveItem.notebook;
      const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
      currentNotebook.password = {...currentNotebook.password, ...{
        auditPassword: passwordObj.reconfirmPassword,
        isAuditPassword: false,
      }};
    }
    
  }

  const submitAuditHandler = (event) => {
    let pswStatus = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.isAuditPassword,
    status = false;
    if(pswStatus===true){
      let oldPass = props.notebooks.allNotebooks.byId[props.allActiveItem.notebook].password.auditPassword;
      if(oldPass == oldAuditPassword){
        status = true;
      }
    }
    if(pswStatus==true&&status==false){
      alert("The old password does not match. Please make sure you correctly type in the old password and that your Caps Lock key is turned off.")
    }else {
      if(newPassword === reconfirmPassword){
        const passwordObj = {
          oldPassword: oldAuditPassword,
          newPassword: newPassword,
          reconfirmPassword: reconfirmPassword
        };
          props.actions.auditingAction.isAuditPasswordUpdate({ message: passwordObj })
          const currentID = props.allActiveItem.notebook;
          const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
          currentNotebook.password = {...currentNotebook.password, ...{
            auditPassword: passwordObj.reconfirmPassword,
            isAuditPassword: true,
            isEnableView: true
          }};
          setDisabledOldPassword(true);
          AuditLog.log(currentNotebook, getDefaultAuditLogObject('Auditing Password Set'));
          AuditLog.log(currentNotebook, getDefaultAuditLogObject('Auditing Enabled'));         
          cancelAuditPass();

          // props.actions.auditingAction.isPasswordMain({
          //   message: false,
          // })
        console.log(props.auditingState.isPasswordData, 'passwordObj');
      }else{
        alert("Mismatch Password");
        return false;
      }
    }
  }

  const oldAuditPasswordChangeHandler = (event) => {
    setOldAuditPassword(event.target.value);
  };

  const cancelAuditPass = () =>{
      setOpenAuditPass(false);
      setAddPassword(false);
  }

  useEffect(() => {
    const currentID = props.allActiveItem.notebook;
    console.log("currentID", currentID)
    const currentNotebook = props.notebooks.allNotebooks.byId[currentID];
    setisEnableList(currentNotebook?.password?.isEnableView);
    // setIsCheckbox(currentNotebook.password.isEnableView);
    if(currentNotebook){ 
      if(currentNotebook.password){
        setDisabledOldPassword(currentNotebook?.password?.isAuditPassword)
      }
    }else{
      cancelAuditPass();
      alert('Please create new notebook');
      props.actions.auditingAction.isAuditMain({
        message: false
      })   
    }
    // currentNotebook.password = {...currentNotebook.password, ...{isEnableView: isChecked}}
  }, [])

  return (
    <div>
      {!openAuditPass&&<ModalCompontent component={<>
        <Stack horizontal className={`flex-container`}>
          <PivotItem headerText="Auditing">
            {/* <Checkbox label="Enable Audit List" checked={isEnableList} onChange={_onChange} /> */}
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
              <Toggle checked={isEnableList} onText="Disable Audit List" offText="Enable Audit List" onChange={_onChange} />
              </Stack>
              <Stack {...columnProps}>
              <DefaultButton disabled={!isEnableList} className={'black'} text="View Audit List" onClick={() => props.actions.auditingAction.isAuditList({ message: true })} allowDisabledFocus />
              </Stack>
              </Stack>
            
            {/* <TextField label="Auditing Password (optional)" />
            <TextField label="Reconfirm"  className={'mb-1'}/> */}
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                <Label>Audit Password  (optional)</Label>
              </Stack>
              <Stack {...columnProps}>
                <DefaultButton className={'black'} text="Password" onClick={openPassword} allowDisabledFocus />
              </Stack>
            {/* <TextField
                  label="Auditing Password  (optional)"
                  type="password"
                  value={newPassword}
                  canRevealPassword
                  onChange={newPasswordChangeHandler}
                />
                <TextField
                  label="Reconfirm"
                  type="password"
                  value={reconfirmPassword}
                  canRevealPassword
                  onChange={reconfirmPasswordChangeHandler}
                  className={'mb-1'}
                /> */}
                </Stack>
                <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <BottomSection 
                  component={
                    <>
              <DefaultButton  className={'bg-green text-white ml-1'} text="Ok" onClick={submitHandler} allowDisabledFocus />
              <DefaultButton  className={'black ml-1'} text="Cancel" onClick={() =>  props.actions.auditingAction.isAuditMain({
                message: false
              })} allowDisabledFocus />
                    </>
                  }
                  type=""
                />
            </Stack>
          </PivotItem>
        </Stack>
      </>
      }
        close={() => props.actions.auditingAction.isAuditMain({
          message: false
        })}
        title={'Auditing'}
        windowSize="small"
        isDraggable={false}
        isModeless={false}
        keepInBounds={false}
        isBlocking={true}
        ></ModalCompontent>}
        {openAuditPass && !addPassword &&
        <ModalCompontent
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
                  value={newPassword}
                  canRevealPassword={!disabledOldPassword}
                  onChange={newAuditPasswordChangeHandler}
                  className={'custom-input-flex'}
                  disabled={disabledOldPassword}
                />
                {/* </Stack> */}
                <TextField
                  label="Verify"
                  type="password"
                  value={reconfirmPassword}
                  canRevealPassword={!disabledOldPassword}
                  onChange={reconfirmAuditPasswordChangeHandler}
                  className={'custom-input-flex'}
                  disabled={disabledOldPassword}
                />
                <DefaultButton text="Change Password" onClick={changePassBtn} disabled={!disabledOldPassword}  style={{marginLeft: 120, marginTop: 20}}  allowDisabledFocus />
              </PivotItem>
            </Stack>
            <BottomSection
              component={
                <>
                <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton text="ok" className="bg-green text-white mt-1" onClick={submitAuditHandler} allowDisabledFocus />
                  </Stack>
                  <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton text="Cancel" className="mt-1" allowDisabledFocus onClick={() =>cancelAuditPass()}/>
                  </Stack>
                </>
              }
              type={""}
            />            
          </>
        }
        close={() =>cancelAuditPass()}
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
                value={oldAuditPassword}
                canRevealPassword={disabledOldPassword}
                onChange={oldAuditPasswordChangeHandler}
                disabled={!disabledOldPassword}
              />
            </PivotItem>
          </Stack>
          <BottomSection
            component={
              <>
              <Stack tokens={stackTokens} className={`offset1`}>
                <DefaultButton text="ok" className="bg-green mt-1" onClick={changeAuditPassSubmitHandler} allowDisabledFocus />
                </Stack>
                <Stack tokens={stackTokens} className={`offset1`}>
                <DefaultButton text="Cancel" className="mt-1" allowDisabledFocus onClick={()=>cancelAuditPass()}/>
                </Stack>
              </>
            }
            type={""}
          />
          
        </>
      }
      close={() =>cancelAuditPass()}
      title={'Enter Password'}
      windowSize={'small'}
      isDraggable={false}
      isModeless={false}
      keepInBounds={false}
      isBlocking={true}
    ></ModalCompontent>
      }

      
    </div>
  )
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
export default connect(mapStateToProps, mapDispatchToProps)(AuditMain);
