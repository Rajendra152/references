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
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
} from '@fluentui/react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from './../../services/ImportODBCServices';
import * as Services from './../../services/RedisServices';
import BottomSection from './Compontent/BottomSection';
import * as ErrorMessage from './Compontent/ErrorCompontent';
import * as ConstFunc from "../../components/Constant/ConstantFunction";
import * as DBfunction from './DBFunction/DBFunction';
import * as ProgressAction from "../../store/Channel/Progress/actions";
import { createSubscribeChannel, subscriber, unSubscribeChannel } from "../../components/Constant/ConstantFunction";

const fs = require('fs');

const stackTokens = { childrenGap: 10 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 10 },
    styles: { root: { width: 150 } },
};

const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };

const onRenderOption = (item: IComboBoxOption) => {
  return <span>{item.text}</span>;
};

const basicStyles: Partial<IComboBoxStyles> = { root: { width: '100%', marginBottom: 20 } };
// const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };


export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

const constructObj = (param) =>{
  let data = [];
  if(param){
    param.map(a=>{
      data.push({
        key: a,
        text: a
      })
    })
  }
  return data;
}

function nl2br(str){
  return str.replace(/(?:\r\n|\r|\n)/g, '');
 }

 function checkString(query:String) {
   let params = query;
   params = params.split(' ');
   let wrongQuery = false;
   for (let i = 0; i < params.length; i++) {
    const element = params[i];
    if(ConstFunc.checkNotNull(element)){
      if(element.trim()){
        let chars = element.toLowerCase();
        console.log(chars);
        if(chars === 'update' || chars === 'delete' || chars === 'create' || chars === 'alert' || chars === 'insert'){
          console.log(chars, true);
          wrongQuery = true;
          break;
        }
      }
    }
  };
  return wrongQuery;
 }

function SQLQuery(props) {
  const [ODBCQuery, setODBCQuery] = useState("");
  const [currentTable, setCurrentTable] = useState("");
  const [recentQueryList, setRecentQueryList] = useState([]);
  // const optionsForCustomRender = constructObj(ConstFunc.getRecentQuery());
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const [statusBar, setStatusBar] = useState(0);

  useEffect(()=>{
    props.actions.ProgressAction.updatePercentageMessage({message: statusBar});
    if(statusBar==0||statusBar==100){
      props.actions.ProgressAction.isLoadBar({message: false});
      props.actions.ProgressAction.updatePercentageMessage({message: 0});
    }
  }, [statusBar]);

  const subscribeToChannel = async()=>{
    // alert("inside subscrbe")
    props.actions.ProgressAction.isLoadBar({message: true});
    console.log('subscribing to channel user input!')
    await subscriber.on("message", (channel,message) => {
      setStatusBar(parseInt(message));
   if(message==100||message=='100'){
      setStatusBar(0);
     unSubscribeChannel('progress');
   }
   //  return message;
    })
  }

  const executeQuery = async() =>{
    let dumpString = nl2br(ODBCQuery);
    console.log(dumpString);
    let status = checkString(dumpString);
    if(!status){
    let query = {
      "query": dumpString
    };
    props.actions.ProgressAction.isLoaderSM({message: true});
    let service = DBService.ODBCQuery(query);
    // subscribeToChannel();
    service.then(async(success)=>{
      let data = success.data;
      // props.actions.ProgressAction.isLoadBar({message: false});
      loaderClose();
      if(data.status==="success"){
        let queryKey = data.result.key;
        props.actions.importDBAction.isOpenImportTable({message: false})
        let client = await Services.getDataQueryKey(queryKey).then((res)=>{
          DBfunction.disConnection();
          props.actions.importDBAction.updateDataSheet({message: res});
          props.actions.importDBAction.isOpenImportTable({message: false})
        }).then(function(error){
          // console.log(reject);
          loaderClose();
          ErrorMessage.ErrorMessage(error);
        })

      }else{
        loaderClose();
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function(error){
      loaderClose();
      // console.error(error);
      ErrorMessage.ErrorMessage(error);
      // setSchemaList([]);
    })
  }else{
    loaderClose();
    ErrorMessage.ErrorMessage({error: 'Select query is only available'});
  }
  }
  const changeTable = (e, option) =>{
    if(ConstFunc.checkNotNull(option)){
      let data = option.text;
      setSelectedKey(data as string);
      setCurrentTable(data);
      if(fs.existsSync(data)){
        data = fs.readFileSync(data, 'utf8');
        setODBCQuery(data);
      }else{
        ConstFunc.removeRecentQuery(data);
        data = [...constructObj(ConstFunc.getRecentQuery())];
        setRecentQueryList(data);
        setSelectedKey("");
        alert("File is't exist");
      }
    }
  }


  const openFile = () =>{
    let data = "";
    // console.log(data);
    data = document.getElementById('openfileId').files;
    if(data.length > 0){
      data = data[0].path;
      if(data.includes('.txt')){
        data = fs.readFileSync(data, 'utf8');
        setODBCQuery(data);
      }else{
        alert('Text file only support');
      }
    }
  }


  const saveFile = async() =>{
    let data = ODBCQuery;
    if(data && selectedKey){
      ConstFunc.updateRecentQuery(selectedKey, data);
      alert('Saved');
    }else if(!ConstFunc.checkNotNull(selectedKey)){
      // document.querySelector('#openfileId').click();
      await ConstFunc.openSaveAs(data, __dirname).then((res)=>{
        let data = recentQueryList;
        data.push({ key: ConstFunc.savePath, text: ConstFunc.savePath});
        setRecentQueryList(data);
      });
    }else{
      alert('Please select recent used query and Type something');
    }
  }

  const loaderClose = () =>{
    props.actions.ProgressAction.isLoaderSM({message: false});
  }

  useEffect(() => {
    let recentQry = ConstFunc.getRecentQuery();
    let data = [...constructObj(recentQry)];
    setRecentQueryList(data);
  }, [])


  return (
    <>
    <Stack className={`flex-container br-1 p-1 mb-2`}>
      <Stack horizontal tokens={stackTokens}>
          <ComboBox
            // defaultSelectedKey={currentTable}
            value={currentTable}
            label="Recent Queries"
            autoComplete="on"
            allowFreeform
            selectedKey={selectedKey}
            options={recentQueryList}
            onRenderOption={onRenderOption}
            styles={basicStyles}
            onChange={changeTable}
            className={`w-100`}
          />
      </Stack>

          <Stack horizontal className={`w-100 mb-1`}>
            <Stack className={`w-100`}>
              <Label>SQL</Label>
              <p id='res-1' className={`d-none`}></p>
              <textarea id={`queryPart`} cols={10} placeholder={`Type something...`} value={ODBCQuery} rows={15} onChange={(e)=>setODBCQuery(e.target.value)}>
              </textarea>
              </Stack>
            </Stack><br />
            <Stack horizontal className={`w-100 mb-1`}>

            <div className="ms-Grid w-100" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12 p-0">
                  <div className="ms-Grid-col d-flex ms-lg8 ms-lgOffset4" style={{justifyContent: 'flex-end'}}>
                      <DefaultButton
                          text="Save"
                          className={`bg-green mb-5px`}
                          allowDisabledFocus
                          // disabled={disabled}
                          // checked={checked}
                          onClick={saveFile}
                      />
                      {/* <DefaultButton
                          text="Open"
                          type={`file`}
                          id={`openfileId`}
                          className={`text-block`}
                          allowDisabledFocus
                          // disabled={disabled}
                          // checked={checked}
                          onClick={openFile}
                      /> */}
                      <DefaultButton
                          text="Save As"
                          className={`text-block mb-5px ml-2`}
                          allowDisabledFocus
                          // disabled={disabled}
                          // checked={checked}
                          onClick={()=>{ConstFunc.openSaveAs(ODBCQuery, selectedKey)}}
                      />
                      <input
                          type={`file`}
                          id="openfileId"
                          onChange={openFile}
                          className={`custom-file-input ml-2`}
                          style={{width: 100, display: 'none'}}
                      />
                  </div>
                </div>
              </div>
            </div>
            </Stack>
      </Stack>
          <Stack horizontal tokens={stackTokens} styles={stackStyles} className={`mb-1`}>
            <BottomSection
              type={'all'}
              component={
                <>
                <div className={`ms-lg6`}>
                  <Stack>
                    <Label>Overwrite at Row 1, Column 1</Label>
                  </Stack>
                </div>
                <div className={`ms-lg6 ms-lgOffset1 d-flex`}>
                  <Stack {...columnProps}>
                    <DefaultButton
                        text="Import"
                        className={`bg-green`}
                        allowDisabledFocus
                        // disabled={disabled}
                        // checked={checked}
                        onClick={executeQuery}
                    />
                  </Stack>
                  <Stack {...columnProps} className={`offset1`}>
                      <DefaultButton
                          text="Cancel"
                          className={`text-block`}
                          // onClick={hideModal}
                          onClick={()=>{DBfunction.disConnection();props.actions.importDBAction.isOpenImportTable({message: false})}}
                          allowDisabledFocus
                          // disabled={disabled}
                          // checked={checked}
                      />
                  </Stack>
                </div>

                </>
              }
            />
          </Stack>

    </>
  )
}


const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch'
    },
    leftContainer: {
        width: '70%',
        border: '1px solid #efefef',
        padding: '10px',
        height: '250px',
    },
    rightContainer: {
        width: '20%',
        marginLeft: '20px !important',
    },
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '1 1 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

function mapStateToProps(state) {
  return {
    importDBState: state.importDBReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SQLQuery);
