import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { openImportfile } from './../../Constant/ConstantFunction';
import * as importfileAction from "../../../store/Worksheet/FileImport/actions";
import {
  getFilePath, isSpreadSheetFormat, isImportTextFormat,
  isTableQueryFormat, isOpenImportfileFormat
} from './FileImportService';
import ImportSpreadsheet from './FileImportModule/ImportSpreadsheet';
import TableQuery from './FileImportModule/TableQuery';
import FieldSelection from './FileImportModule/FieldSelection';
import ImportText from './FileImportModule/ImportText';
import ModalCompontent from './../Modal/ModalCompontent';
import * as ErrorMessage from '../Compontent/ErrorCompontent';
import * as DBService from './../../../services/ImportFileService';
import * as importDBAction from "./../../../store/Worksheet/ImportDB/actions";
import * as FileImportFormat from './../../Constant/FileImportFormat';
const { remote } = require('electron');
import { createSubscribeChannel, subscribeToChannel, unSubscribeChannel, publishToChannel } from './../../Constant/ConstantFunction';
let fileOptions = {
  title: "Open File",
  // defaultPath : "query",
  buttonLabel: "Open",
  filters: FileImportFormat.FileImport
}


export const FileImport = (props) => {
  const [fileList, setFileList] = useState([]);
  const [fieldsList, setFieldsList] = useState([]);
  const [importText, setImportText] = useState({});
  const [spreadsheet, setSpreadsheet] = useState({});

  const getFileSelectionInfo = (param) => {
    let query = {
      "file": param
    };
    let service;
    if(param.includes('.rdata')){
      service = DBService.getRDataFileSelectionInfo(query);
    }else{
      service = DBService.getFileSelectionInfo(query);
    }
    service.then(success => {
      let data = success.data;
      if (data.status === "success") {
        console.log(data.result);
        let resultInfo = data.result;
        let keys = Object.keys(resultInfo);
        let original: Object[] = [];
        if (keys.length > 0) {
          (keys).map((a, index) => {
            original.push({
              name: resultInfo[a][0],
              key: resultInfo[a][1],
              idx: index
            })
          })
        }
        setFieldsList(original);
        props.actions.importfileAction.isOpenFieldSelection({ message: true });
        // props.actions.importDBAction.addTableList({message: original});
      } else {
        closeWin();
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function (error) {
      // console.error(error);
      ErrorMessage.ErrorMessage(error);
    })
  }


  const getImportTextInfo = (param) => {
    let query = {
      "file": param
    };
    let service = DBService.getImportTextInfo(query);
    service.then(success => {
      let data = success.data;
      if (data.status === "success") {
        console.log(data.result);
        setImportText(data.result);
        props.actions.importfileAction.isOpenImportText({ message: true });
        // props.actions.importDBAction.addTableList({message: original});
      } else {
        closeWin();
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function (error) {
      // console.error(error);
      ErrorMessage.ErrorMessage(error);
    })
  }

  const getSpreadSheetInfo = (param) => {
    let query = {
      "file": param
    };
    let service = DBService.getSpreadSheetInfo(query);
    service.then(success => {
      let data = success.data;
      if (data.status === "success") {
        console.log(data.result);
        setSpreadsheet(data.result);
        props.actions.importfileAction.isOpenSpreadsheet({message: true});
        // props.actions.importDBAction.addTableList({message: original});
      } else {
        closeWin();
        ErrorMessage.ErrorMessage(data);
      }
    }).then(function (error) {
      // console.error(error);
      ErrorMessage.ErrorMessage(error);
    })
  }

  const findFileFormat = (param) => {
    console.log(param);
    let urlList = param;
    if (param) {
      if (param.length > 0) {
        let fileExt = param[0].split('.').pop();;
        if (isSpreadSheetFormat(fileExt)) {
          // props.actions.importfileAction.isOpenSpreadsheet({message: true});
          getSpreadSheetInfo(param[0]);
        }
        if (isImportTextFormat(fileExt)) {
          getImportTextInfo(param[0]);
        }
        if (isTableQueryFormat(fileExt)) {
          props.actions.importfileAction.isOpenTableQuery({ message: true });
        }
        if (isOpenImportfileFormat(fileExt)) {
          getFileSelectionInfo(param[0]);
        }
        // props.actions.importfileAction.isOpenImportfile({message: false})
      }
    }

  }

  const loadFileOpen = () => {
    // props.actions.importfileAction.isOpenImportfile({message: false})
    // props.actions.importfileAction.isOpenSpreadsheet({message: true});
    // props.actions.importfileAction.isOpenTableQuery({message: true});
    // props.actions.importfileAction.isOpenFieldSelection({message: true});
    // props.actions.importfileAction.isOpenImportText({message: true});



    //   let formatList = getFilePath(resolve);
    //   findFileFormat(formatList);
    // return saveDialog
    // openImportfile().then((resolve)=>{
    //   let formatList = getFilePath(resolve);
    //   findFileFormat(formatList);
    // }).then((reject)=>{
    //   console.log(reject);
    // });
  }

  const closeWin = () => {
    props.actions.importfileAction.isOpenImportfile({ message: false });
  }
  useEffect(() => {
    // loadFileOpen();
    let saveDialog = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), fileOptions);
    console.log(saveDialog);
    setFileList(saveDialog);
    if (saveDialog) {
      if (saveDialog.length > 0) {
        findFileFormat(saveDialog);
      }else{
        closeWin();
      }
    }else{
      closeWin();
    }
    // unSubscribeChannel('progress');
    publishToChannel();
    createSubscribeChannel("progress");
  }, [])

  return (
    <div>
      {
        props.importfileState.isOpenSpreadsheet && (
          <ModalCompontent
            close={() => { closeWin(); props.actions.importfileAction.isOpenSpreadsheet({ message: false }) }}
            component={<ImportSpreadsheet worksheet={spreadsheet}/>}
            title={'Import Spreadsheet'}
          ></ModalCompontent>
        )
      }
      {/* {
        props.importfileState.isOpenTableQuery && (
          <ModalCompontent
            close={() => { closeWin(); props.actions.importfileAction.isOpenTableQuery({ message: false }) }}
            component={<TableQuery tableList={{ database_related_table: props.importDBState.tableList }} />}
            title={'Import Spreadsheet'}
          ></ModalCompontent>
        )
      } */}
      {
        props.importfileState.isOpenFieldSelection && (
          <ModalCompontent
            close={() => { closeWin(); props.actions.importfileAction.isOpenFieldSelection({ message: false }) }}
            component={<FieldSelection fieldsList={fieldsList} />}
            title={'Import Spreadsheet'}
          ></ModalCompontent>
        )
      }
      {
        props.importfileState.isOpenImportText && (
          <ModalCompontent
            close={() => { closeWin(); props.actions.importfileAction.isOpenImportText({ message: false }) }}
            component={<ImportText importText={importText} />}
            title={'Import Text'}
          ></ModalCompontent>
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    importfileState: state.ImportfileReducer,
    importDBState: state.importDBReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importfileAction: bindActionCreators(importfileAction, dispatch),
      importDBAction: bindActionCreators(importDBAction, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileImport)
