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
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from './../../services/ImportODBCServices';
import BottomSection from './Compontent/BottomSection';
import * as ErrorMessage from './Compontent/ErrorCompontent';
import RequiredIcon from "./Compontent/RequiredIcon";

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 200 } },
};

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}


function JDBCConnection(props) {

  const [connectObj, setConnectObj] = useState({});
  const { disabled, checked } = props;
  const [loader, setLoader] = useState(false);

  const addJDBCConn = () =>{
    setLoader(true);
    let conn = {connection_string: connectObj, db_type: "jdbc"};
    if(inputValid()){
      let data = DBService.addNewSchema(conn);
      data.then(success=>{
        let data = success.data;
        if(data.status==="success"){
          console.log(data.result.success);
          let query = {
            "type": "default"
        };
          let service = DBService.executeODBCDNSQuery(query);
          service.then(success=>{
            let data = success.data;
            if(data.status==="success"){
              console.log(data.result);
              // setTableList(data.result);
              props.actions.importDBAction.addTableList({message:data.result});
              // props.actions.importDBAction.isOpenTableQuery({message:true});
              props.actions.importDBAction.isOpenImportTable({message:true});
              // showModal(true);
              props.actions.importDBAction.isOpenJDBCConn({message: false})
            }else{
              setLoader(false);
              ErrorMessage.ErrorMessage(data);
            }
          }).then(function(error){
            // console.error(error);
            setLoader(false);
            ErrorMessage.ErrorMessage(error);
          })
        }else{
          setLoader(false);
          ErrorMessage.ErrorMessage(data);
        }
      }).then(function(error){
        // console.error(error);
        setLoader(false);
        ErrorMessage.ErrorMessage(error);
      });
    }else{
      setLoader(false);
    }
    
  }

  const connectionObj = (e) =>{
    let data = {...connectObj};
    data[e.target.name] = e.target.value;
    setConnectObj(data);
  }

  const inputValid = () =>{
    if(Object.keys(connectObj).length > 2){
      let driver = connectObj.driver_name || undefined, url = connectObj.url || undefined,
      jarfile = connectObj.jarfile || undefined;
      if(driver && url && jarfile){
        return true;
      }else{
        alert('Please fill all details');
        return false;
      }
    }else{
      alert('Please fill all details')
      return false;
    }
    return false;
  }

  return (
    <div>
      <PivotItem headerText="Select JDBC Data Source"><br />
        {/* <Label>JDBC Connections:</Label> */}
        <Stack horizontal>
            <Stack className={`w-100`}>
              <Label>Driver </Label>
              <TextField name={`driver_name`} value={connectObj.driver_name} onChange={(e)=>connectionObj(e)}/>
              <Label>Url </Label>
              <TextField name={`url`} value={connectObj.url} onChange={(e)=>connectionObj(e)}/>
              <Label>Username </Label>
              <TextField name={`user`} value={connectObj.user} onChange={(e)=>connectionObj(e)}/>
              <Label>Password </Label>
              <TextField name={`password`} value={connectObj.password} onChange={(e)=>connectionObj(e)}/>
              <Label>Driver Jar File Path </Label>
              <TextField name={`jarfile`} value={connectObj.jarfile} onChange={(e)=>connectionObj(e)}/>
            </Stack>
        </Stack> <br />
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <BottomSection type={2} component={<>
            <Stack {...columnProps}>
            {!loader&&<DefaultButton
                    text="Connection Test"
                    className={`bg-green`}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                    onClick={addJDBCConn}
                />}

               {loader&&<DefaultButton
                    text="Loading..."
                    className={`text-block`}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                > <Spinner size={SpinnerSize.medium} />
                </DefaultButton>}
            </Stack>
            <Stack {...columnProps} className={`offset1`}>
                <DefaultButton
                    text="Cancel"
                    className={`text-block`}
                    onClick={()=>props.actions.importDBAction.isOpenJDBCConn({message: false})}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                />
            </Stack>
            </> }
            />
        </Stack>
    </PivotItem>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isOpenImportDB: state.importDBReducer.isOpenImportDB
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(JDBCConnection)
