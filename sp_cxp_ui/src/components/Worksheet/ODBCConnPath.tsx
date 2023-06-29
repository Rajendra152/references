import React, { useState, useEffect } from 'react';
import {
    DefaultButton
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from './../../services/ImportODBCServices';
import BottomSection from './Compontent/BottomSection';
import * as ErrorMessage from './Compontent/ErrorCompontent';


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

function ODBCConnPath(props) {
  const [connectPath, setConnectPath] = useState({});
  const { disabled, checked } = props;
  const connectionObj = (e) =>{
    let data = {...connectPath};
    data[e.target.name] = e.target.value;
    setConnectPath(data);
  }

  const addODBCConn = () =>{
    let query = {
      "odbcini": connectPath.odbcini
  };
  let service = DBService.ODBCConnPath(query);
    service.then(success=>{
      let data = success.data;
      if(data.status==="success"){
        // console.log(data.result.success);
        // alert('Setup Successfully');
        props.actions.importDBAction.isOpenImportDB({message:false})
      }else{
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function(error){
      ErrorMessage.ErrorMessage(error);
      // setSchemaList([]);
    })
  };

  const fileOpen = (e) =>{
    let path = document.getElementById('filePath').files[0].path;
    let data = {...connectPath};
    data['odbcini'] = path;
    setConnectPath(data);
  };

  const getFilePath = () =>{
    let service = DBService.getODBCPath();
    service.then(success=>{
      let data = success.data;
      console.log(data);
      if(data.status==="success"){
        let data = {...connectPath};
        data['odbcini'] = data.result.path;
        setConnectPath(data);
      }else{
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function(error){
      ErrorMessage.ErrorMessage(error);
      // setSchemaList([]);
    })
  }


  useEffect(() => {
    getFilePath();
  }, []);

  return (
    <div>
      <PivotItem headerText="">
        {/* <Label>User DSN Path (ODBCINI):</Label> */}
        <Stack className={`flex-container br-1 p-1`}>
            <Label>Connection File Path:</Label>
            <Stack className={`table-h br-0`}>
              <div className={`d-flex`}>
              <TextField name={`odbcini`} className={`w-75`} value={connectPath.odbcini} onChange={(e)=>connectionObj(e)}/>
              <input
                    type={`file`}
                    id="filePath"
                    onChange={fileOpen}
                    className={`offset1 custom-file-input`}
                    style={{width: 100, marginLeft: 10}}
                />
                </div>
            </Stack>
        </Stack> <br />
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <BottomSection component={
            <>
            <Stack {...columnProps} className={`offset1`}>
                <DefaultButton
                    text="Ok"
                    className={`bg-green`}
                    allowDisabledFocus
                    // disabled={okDisable}
                    checked={checked}
                    onClick={addODBCConn}
                />
            </Stack>
            <Stack {...columnProps} className={`offset1`}>
                <DefaultButton
                    text="Cancel"
                    className={`text-block`}
                    // onClick={()=>props.actions.importDBAction.isOpenODBCConnPath({message:false})}
                    onClick={()=>props.actions.importDBAction.isOpenImportDB({message:false})}
                    allowDisabledFocus
                    disabled={disabled}
                    checked={checked}
                />
            </Stack>
            </>
          }
          type={2}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(ODBCConnPath);
