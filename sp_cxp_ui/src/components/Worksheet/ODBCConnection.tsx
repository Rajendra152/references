import React, { useState, useEffect } from 'react';
import {
    DefaultButton
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from './../../services/ImportODBCServices';
import BottomSection from './Compontent/BottomSection';
import * as ErrorMessage from './Compontent/ErrorCompontent';
import * as ConstantFunc from "../Constant/ConstantFunction";

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 200 } },
};

const columnInputProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 400 } },
};

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

function ODBCConnection(props) {
  const [connectObj, setConnectObj] = useState({});
  const [loader, setLoader] = useState(false);
  const { disabled, checked } = props;
  const connectionObj = (e) =>{
    let data = {...connectObj};
    data[e.target.name] = e.target.value;
    setConnectObj(data);
  }

  const addODBCConn = () =>{
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
      props.actions.importDBAction.isOpenImportDB({message:false});

      props.actions.importDBAction.isOpenImportTable({message:true});
      // showModal(true);

    }else{
      ErrorMessage.ErrorMessage(data);
    }
  }).then(function(error){
    // console.error(error);
    ErrorMessage.ErrorMessage(error);
  })
  }

  const testODBCConn = () =>{
    if(connectObj.driver_name){
      let query = {
        "connection_string": connectObj.driver_name,
        "db_type": "odbc"
    };
    if(ConstantFunc.checkNotNull(connectObj.driver_name)){
    let service = DBService.ODBCConnStr(query);
      service.then(function(success){
        let data = success.data;
        if(data.status==="success"){
          console.log(data.result.success);
          // alert(data.result.success);
          setLoader(false);
          addODBCConn();
        }else{
          setLoader(false);
          ErrorMessage.ErrorMessage(data);
        }
      }).then(function(error){
        setLoader(false);
        // console.error(error);
        ErrorMessage.ErrorMessage(error);
        // setSchemaList([]);
      })
    }else{
      alert('Please enter your connection string');
    }
    }else{
      alert("Please enter the value")
    }

  }

  return (
    <div>
      <PivotItem headerText="Select ODBC Data Source">
        <Stack className={`flex-container br-1 p-1`}>
        <Label>Connection String:</Label>
            <Stack className={`w-75 table-h br-0`}>
              <TextField name={`driver_name`} value={connectObj.driver_name} onChange={(e)=>connectionObj(e)}/>
            </Stack>
        </Stack> <br />
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <BottomSection type={3} component={<>
            {!loader&&<Stack {...columnProps} className={``}>
                <DefaultButton
                    text="Connection Test"
                    className={`bg-green`}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                    onClick={testODBCConn}
                />
            </Stack>}
            {loader&&<Stack {...columnProps} className={`offset1`}>
              <DefaultButton
                    text="Loading..."
                    className={`text-block`}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                > <Spinner size={SpinnerSize.medium} />
                </DefaultButton>
                {/* <DefaultButton
                    text="Ok"
                    className={`bg-green`}
                    allowDisabledFocus
                    disabled={loader}
                    checked={checked}
                    onClick={addODBCConn}
                /> */}
            </Stack>}
            <Stack {...columnProps} className={`offset1`}>
                <DefaultButton
                    text="Cancel"
                    className={`text-block`}
                    // onClick={()=>props.actions.importDBAction.isOpenODBCConnStr({message:false})}
                    onClick={()=>props.actions.importDBAction.isOpenImportDB({message:false})}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                />
            </Stack>
          </>} />
        </Stack>
    </PivotItem>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    importDBState: state.importDBReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch)
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ODBCConnection);
