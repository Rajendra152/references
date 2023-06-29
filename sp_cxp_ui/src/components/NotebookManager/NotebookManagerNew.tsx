import React, { Dispatch, useState, useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  IState,
  INotebook,
  IAction,
  IActive,
  IActiveItems,
} from '../Redux/notebookReducer';
import { CREATE_NOTEBOOK } from '../Redux/actionConstants';
import {
  Label,
  IconButton,
  Toggle,
  CommandBar,
  ActionButton,
  Image,
} from 'office-ui-fabric-react';
import NotebookComponent from './NotebookComponent';
import { checkNotNull } from '../Constant/ConstantFunction';
import {
  createNotebook,
  renameItem,
  deleteItem,
  createWorksheet,
  openCloseAsset,
  checkIsNameUnique,
  saveNotebook,
} from './../../services/NotebookManagerServicesNew';
import { isNotebookManagerDisplay } from '../../store/MainWindow';
import { getUpdatedNewProps } from "../../utils/notebookManagerUtils/notebookManagerUtility";

import {
  Pivot,
  PivotItem,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';
import * as ConstantImage from '../Constant/ConstantImage';

import { bindActionCreators } from "redux";

import { isWorksheetDialogHide} from "../../store/MainWindow/actions";
import { IWorksheet } from '../CanvasManager/CanvasManagerNew';
const { ipcRenderer } = require('electron');
import { ContextualMenu, ContextualMenuItemType, IContextualMenuItem, DirectionalHint } from '@fluentui/react/lib/ContextualMenu';
import { contextMenuItemsConst } from "./contextMenuItems";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@uifabric/react-hooks';
import * as ITEM_TYPE from "../../services/notebookManagerServices/ConstantsNotebookManager";
import { version } from "../Constant/ConstInfo";
import {
  setActiveWorksheet,
  storeWorksheet,
  storeGraph
} from '../../store/Worksheet/WorksheetOperation/actions';
import * as TransformAction from '../../store/Analysis/Transform/actions';
import FileImport from './../Worksheet/FileImport/FileImport'
import SummaryInfo from './SummaryInfo'
import  {summaryInfoAction} from "../../store/SummaryInfo/actions";
import  {recentSavedFileAction} from "../../store/RecentSavedFile/actions";
import { openNotebookFile } from './../../services/NotebookManagerServicesNew';
import { openNotebookFromFile } from '../../services/notebookManagerServices/OpenNotebookFromFile';
const NotebookManager = (props) => {
  const [showContextualMenu, setShowContextualMenu] = useState(false);
  const [contextTargetId, setcontextTargetId] = useState('');
  const [renameId, setRenameId] = useState('');
  const [notetoggle, setnotetoggle] = useState(true);
  const [sumtoggle, setsumtoggle] = useState(true);
  const [temptoggle, settemptoggle] = useState(false);
  //const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideWarningDialog, { toggle: toggleHideWarningDialog }] = useBoolean(true);
  const [warningMsgProps, setWarningMsgProps] = useState({
    type: DialogType.normal,
    title: version,
    subText: 'Worksheet in this section already Exist. Pasting Duplicate worksheet not allowed.',
    key: ITEM_TYPE.ALERT
  })

  const currNodeItem = useRef(null);
  const copiedNode = useRef(null);
  const currNbkItem = useRef(null);
  const canceledNbkId = useRef([])
  const [summaryInfo, setSummaryInfo] = useState({});

  // const dialogContentProps = {
  //   type: DialogType.normal,
  //   title: 'Notebook',
  //   subText: 'Are you certain you want to delete this entry?',
  //   key: ITEM_TYPE.DELETE_NODE_WARNING
  // };

  const wrkDialogContentProps = {
    type: DialogType.normal,
    title: version,
    subText: 'Pages in this section will become associated with this new worksheet and lose any data stored in them.',
    key: ITEM_TYPE.WORKSHEET_CREATE_WARNING
  };


  //const dialogStyles = { main: { maxWidth: "100px" } };
  const wrkDialogStyles = { main: { maxWidth: "200px" } };
  const warningDialogStyles = { main: { maxWidth: "200px" } };

  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };

  // const modalProps = React.useMemo(
  //   () => ({
  //     isBlocking: true,
  //     styles: dialogStyles,
  //     dragOptions: dragOptions,
  //     className: "warningDialog"
  //   }),
  //   [],
  // );

  const warningModalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: warningDialogStyles,
      dragOptions: dragOptions,
      className: "warningDialog"
    }),
    [],
  );

  const wrkModalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: wrkDialogStyles,
      dragOptions: dragOptions,
      className: "warningDialog"
    }),
    [],
  );

  const onDeleteItem = () =>{
    if(currNodeItem){
      deleteItem(currNodeItem.current, props)

      if(currNbkItem.current && currNbkItem.current.id === currNodeItem.current.id){
        currNbkItem.current=null
      }

      if(copiedNode.current && copiedNode.current.id === currNodeItem.current.id){
        copiedNode.current=null
      }
    }

  }

  const onChangeRenameId = (id) =>{
    setRenameId(id);
  }

  const onCopyingNode = (node) => {
    copiedNode.current = node;
    console.log(copiedNode.current);
  }

  const onShowContextualMenu = (ev: React.MouseEvent<HTMLElement>, item, isExpand?: boolean, expandCollapse?: Function) => {
      // ev.preventDefault(); // don't navigate
      // setShowContextualMenu(false);
      canceledNbkId.current = [];
      props.resetSelectedItems();
    if(item.type == ITEM_TYPE.ALL_NOTEBOOK){
      for (const object of contextMenuItemsConst) {
        object.clickedItem = item
        if(object.key == "expand-collapse"){
          object.text = "Expand/Collapse";
          object.disabled = true;
        }

        else if(object.key == "open"){
          object.text = "Open";
          object.disabled = true;
        }

        else if(object.key == "close"){
          object.props = props;
          object.text = "Close all notebooks";
          object.disabled = false;
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }

        else if(object.key == "copy" || object.key == "paste" || object.key == "delete" || object.key == "rename"){
          object.disabled = true;
        }

        else if(object.key == "save"){
          object.props = props;
          object.disabled = false;
        }
        else if(object.key == "save_as" || object.key == "print"){
          object.disabled = true;
        }

        if(object.key == "new"){

          for(const subObj of object.subMenuProps.items){
            subObj.clickedItem = item
            if(subObj.key == "create-notebook"){
              subObj.props = props;
              subObj.disabled = false
            }
            else{
              subObj.disabled = true
            }
          }
        }

      }
    }

    if(item.type == ITEM_TYPE.NOTEBOOK){
      let isAllOpen = true;
      let isAllClose = true;
      let allIds = {};
      currNodeItem.current = item;

      for (const el of props.activeItems) {
        allIds[el.id] = true;
      }
      for (const id of item.allAssetsId) {
        if(!allIds[id]){
          isAllOpen = false;
        }
        if(allIds[id]){
          isAllClose = false;
        }
      }

      for (const object of contextMenuItemsConst) {

        object.clickedItem = item
        object.props = props;
        if(object.key == "expand-collapse"){
          object.text = isExpand ? "Collpase" : "Expand";
          object.disabled = false;
          if(expandCollapse){
            object.expandCollapse = expandCollapse
          }

        }

        else if(object.key == "open"){
          object.text = "Open All items";
          object.disabled = isAllOpen;
        }

        else if(object.key == "close"){
          object.text = "Close Notebook";
          object.disabled = false;
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }

        else if(object.key == "copy" || object.key == "delete" || object.key == "rename"){
          object.disabled = true;
        }

        else if(object.key == "paste"){
          object.disabled = copiedNode.current ? false : true
          object.copiedItem = copiedNode.current
        }

        else if(object.key == "save_as"){
          object.disabled = false;
        }
        else if(object.key == "print"){
          object.disabled = false;
        }

        else if(object.key == "new"){
          for(const subObj of object.subMenuProps.items){
            subObj.clickedItem = item
            subObj.worksheetDialogHide = props.worksheetDialogHide;
            if(subObj.key == "create-notebook"){
              subObj.disabled = true
            }
            else{
              subObj.disabled = false
              subObj.props = props;
            }
          }
        }

      }

    }

    if(item.type == ITEM_TYPE.SECTION){
      let isAllOpen = true;
      let isAllClose = true;
      let allIds = {};

      currNodeItem.current = item;
      for (const el of props.activeItems) {
        allIds[el.id] = true;
      }

      for (const id of item.allAssetsId) {
        if(!allIds[id]){
          isAllOpen = false;
        }
        if(allIds[id]){
          isAllClose = false;
        }
      }

      for (const object of contextMenuItemsConst) {
        object.props = props;
        object.clickedItem = item
        if(object.key == "expand-collapse"){
          object.text = isExpand ? "Collpase" : "Expand";
          object.disabled= false;
          if(expandCollapse){
            object.expandCollapse = expandCollapse
          }
        }

        else if(object.key == "open"){
          object.text = "Open items";
          object.disabled = isAllOpen;
        }

        else if(object.key == "close"){
          object.text = "Close items";
          object.disabled = isAllClose;
        }

        else if(object.key == "rename"){
          object.rename = onChangeRenameId;
          object.disabled = false;
        }

        else if( object.key == "paste"){
          object.disabled = copiedNode.current ? false : true
          object.copiedItem = copiedNode.current
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }
        else if(object.key == "copy"){
          object.disabled = false;
          object.onCopyingNode = onCopyingNode;
        }

        else if(object.key === "delete"){
          object.disabled = false;
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }
        else if(object.key == "save_as" || object.key == "print"){
          object.disabled = false;
        }

        else if(object.key == "new"){
          for(const subObj of object.subMenuProps.items){
            subObj.clickedItem = item
            subObj.worksheetDialogHidelog = props.worksheetDialogHide;
            if(subObj.key == "create-notebook"){
              subObj.disabled = true
            }
            else{
              subObj.disabled = false
              subObj.props = props;
            }
          }
        }
      }
    }

    if(item.type ==  ITEM_TYPE.WORKSHEET || item.type ==  ITEM_TYPE.REPORT || item.type == ITEM_TYPE.GRAPHPAGE || item.type == ITEM_TYPE.TRANSFORM || item.type == ITEM_TYPE.EQUATION){
      let isOpen = false;
      currNodeItem.current = item;
      for (const el of props.activeItems) {
        if(item.id == el.id){
          isOpen = true;
          break;
        }
      }

      for (const object of contextMenuItemsConst) {
        object.props = props;
        object.clickedItem = item
        if(object.key == "expand-collapse"){
          object.text = "Expand/Collapse";
          object.disabled = true;
        }

        else if(object.key == "open"){
          object.text = "Open item";
          object.disabled = isOpen;
        }

        else if(object.key == "close"){
          object.text = "Close item";
          object.disabled = !isOpen;
        }

        else if(object.key == "rename"){
          object.rename = onChangeRenameId;
          object.disabled = false;
        }

        else if( object.key == "paste"){
          object.disabled = copiedNode.current ? false : true
          object.copiedItem = copiedNode.current;
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }

        else if(object.key == "copy"){
          object.disabled = false;
          object.onCopyingNode = onCopyingNode;
        }

        else if(object.key == "delete"){
          object.disabled = false;
          object.popupWarningMsgDailog = popupWarningMsgDailog;
        }


        else if(object.key == "save_as" || object.key == "print"){
          object.disabled = false;
        }

        else if(object.key == "new"){
          for(const subObj of object.subMenuProps.items){
            subObj.clickedItem = item
            subObj.worksheetDialogHide = props.worksheetDialogHide;
            if(subObj.key == "create-notebook"){
              subObj.disabled = true
            }
            else{
              subObj.disabled = false
              subObj.props = props;
            }
          }

        }
      }
    }

    setcontextTargetId(item.id);
    setTimeout(()=>setShowContextualMenu(true),0);

  }

  const onHideContextualMenu = React.useCallback(() => setShowContextualMenu(false), []);

  const onItemRenaming = (item:any, newName:string) =>{
    setRenameId('');
    if(newName === item.name){

    }
    else if(checkIsNameUnique(newName,item.parentNotebookId,props)){
      if(newName!== ''){
        item.name = newName
        renameItem(item, props)
        //props.renameItem(item);
      }
    }
    else{
      popupWarningMsgDailog({
        title: version,
        subText: "The name you entered is in use. Please pick a unique name.",
        key: ITEM_TYPE.ALERT
      })

    }

  }

  const popupWarningMsgDailog = (newMsg) => {
    setWarningMsgProps({
      ...warningMsgProps,
      ...newMsg
    })
    toggleHideWarningDialog();
  }


  // useEffect(() => {
  //   setTimeout(function () {
  //     let notebookHgt = document.getElementsByClassName("sidemenu-content");
  //     let ribbonHgt = document.getElementsByClassName("custom-pivot");
  //     let footerHgt = document.getElementsByClassName("footer-bar")
  //     if (notebookHgt.length && ribbonHgt.length) {
  //       notebookHgt[0].style.height = window.outerHeight - (ribbonHgt[0].offsetHeight + footerHgt[0].offsetHeight) + "px";
  //    let notebookContHgt = document.getElementsByClassName("sidemenu-notebook-list-content");
  //    let notbookId =document.getElementById("notbookMngr");
  //   //  let notebookLiHgt = document.getElementsByClassName("sidemenu-notebook-list");
  //   //  let notebookHdrHgt= document.getElementsByClassName("sidemenu-notebook-header");
  //    if (notebookContHgt && notebookContHgt.length && !notbookId){

  //     notebookContHgt[0].style.height = notebookHgt[0].offsetHeight - 150 + "px";
  //    }
  //     }
  //   }, 100);
  // }, []);


  useEffect(() => {

    if(copiedNode.current){
      if(copiedNode.current?.type=== ITEM_TYPE.SECTION){
        copiedNode.current =props.notebooks.allSections.byId[copiedNode.current?.id]

      }
      else if(copiedNode.current?.type=== ITEM_TYPE.WORKSHEET){
        copiedNode.current =props.notebooks.allWorksheets.byId[copiedNode.current?.id]

      }
      else if(copiedNode.current?.type=== ITEM_TYPE.GRAPHPAGE){
        copiedNode.current = props.notebooks.allGraphPages.byId[copiedNode.current?.id]

      }
      else if(copiedNode.current?.type=== ITEM_TYPE.REPORT){
        copiedNode.current = props.notebooks.allReports.byId[copiedNode.current?.id]

      }
      else if(copiedNode.current?.type=== ITEM_TYPE.TRANSFORM){
        copiedNode.current = props.notebooks.allTransforms.byId[copiedNode.current?.id]
      }
      else if(copiedNode.current?.type=== ITEM_TYPE.EQUATION){
        copiedNode.current = props.notebooks.allEquations.byId[copiedNode.current?.id]
      }
    }

    if(currNbkItem.current){
      if(currNbkItem.current?.type=== ITEM_TYPE.SECTION){
        currNbkItem.current = props.notebooks.allSections.byId[currNbkItem.current?.id]
           null;
      }
      else if(currNbkItem.current?.type=== ITEM_TYPE.WORKSHEET){
        currNbkItem.current = props.notebooks.allWorksheets.byId[currNbkItem.current?.id]

      }
      else if(currNbkItem.current?.type=== ITEM_TYPE.GRAPHPAGE){
        currNbkItem.current = props.notebooks.allGraphPages.byId[currNbkItem.current?.id]

      }
      else if(currNbkItem.current?.type=== ITEM_TYPE.REPORT){
        currNbkItem.current = props.notebooks.allReports.byId[currNbkItem.current?.id]

      }
      else if(currNbkItem.current?.type=== ITEM_TYPE.TRANSFORM){
        currNbkItem.current = props.notebooks.allTransforms.byId[currNbkItem.current?.id]
      }
      else if(currNbkItem.current?.type=== ITEM_TYPE.EQUATION){
        currNbkItem.current = props.notebooks.allEquations.byId[currNbkItem.current?.id]
      }
    }

  },[props.notebooks])


  const clearNotebooks = () => {
    props.clearNotebooks();
  };

  const handleClick = (activeItem: IActiveItems) => {
    console.log(props.activeItems)
    if (props.activeItems.indexOf(activeItem) == -1) {
      props.setActiveItem(activeItem);
    }
  };

  const openItemInCanvas = (activeItem: IActiveItems) => {
    const isItemPresent = props.activeItems.filter(item => item.id === activeItem.id)
    if(isItemPresent.length === 0){
      props.setActiveItem(activeItem);
    }
    props.setSelectedPivotItem(activeItem.id)
  }

  const setItemSelectedOnClick = (activeItem, currNode, event) => {
    if (event.shiftKey) {
      props.addSelectedItem(activeItem.selectedItemOnNotebook)
    } else {
      if(currNode){
        currNodeItem.current = currNode
        const newSummary = {
          id:currNode.id,
          type:currNode.type,
          createdDate: currNode.createdDate,
          modifiedDate: currNode.modifiedDate,
          author:currNode.author,
          description:currNode.description
        }
        props.summaryInfoAction(newSummary)
      }
      props.setAllActiveItem(activeItem)
      props.resetSelectedItems()
    }
  }

  const onCreateWorksheet = (ev, item, item2) => {
    console.log(ev,item,item2)
    createWorksheet(props, currNodeItem.current);
    props.worksheetDialogHide(true);
  }
  useEffect(() => {
    createNotebook(props)
  }, [])

  useEffect(() => {
    let node = props.notebooks.allWorksheets.byId[props.allActiveItem.selectedItemOnNotebook];
    console.log(node)
    if(!node){
      node = props.notebooks.allGraphPages.byId[props.allActiveItem.selectedItemOnNotebook];
    }
    if(!node){
      node = props.notebooks.allReports.byId[props.allActiveItem.selectedItemOnNotebook];
    }
    console.log(props.allActiveItem.selectedItemOnNotebook)
    currNbkItem.current = node;

  },[props.allActiveItem.selectedItemOnNotebook])


  const pin = { iconName: 'Pin' };
  const close = { iconName: 'ChromeClose' };
  const add = { iconName: 'Add' };
  const remove = { iconName: 'Delete' };

  const noteToggleclick = () => {
    setnotetoggle(!notetoggle);
  };
  const sumToggleclick = () => {
    setsumtoggle(!sumtoggle);
  };

 
  const dailog_YES_OnClick = async (warnMsg:any,) =>{
    if(warnMsg.key === ITEM_TYPE.SAVE_ALERT){
      if(warnMsg.multipleNbk){
        toggleHideWarningDialog()
        let allNbk = Object.values(props.notebooks.allNotebooks.byId)
        allNbk = allNbk.filter(obj => obj.id!== warnMsg.currItem.id)
        for (const cancelId of canceledNbkId.current) {
          allNbk = allNbk.filter(obj => obj.id!== cancelId)
        }

        const [allNewState, isSuccess] = await saveNotebook([warnMsg.currItem], props, false)
        if(!isSuccess){
          canceledNbkId.current.push(warnMsg.currItem.id);
        }

        let newProps = {
          ...props,
          ...allNewState,
        }

               //checking more notebook is there for save then next save dailog wll be popuped.
        triggerNextPopup(allNbk, newProps)

      }
      else{
        saveNotebook([warnMsg.currItem], props, false)
        toggleHideWarningDialog()
      }

    }
  }

  const dailog_NO_OnClick = async (warnMsg:any) =>{
    if(warnMsg.key === ITEM_TYPE.SAVE_ALERT){
      if(warnMsg.multipleNbk){
        toggleHideWarningDialog()
        let allNbk = Object.values(props.notebooks.allNotebooks.byId)
        allNbk = allNbk.filter(obj => obj.id!== warnMsg.currItem.id)
        for (const cancelId of canceledNbkId.current) {
          allNbk = allNbk.filter(obj => obj.id!== cancelId)
        }

        const updateState = await deleteItem(warnMsg.currItem, props)
        let newProps = getUpdatedNewProps(props, updateState)
        triggerNextPopup(allNbk, newProps)

      }
      else{
        deleteItem(warnMsg.currItem, props)
        toggleHideWarningDialog()
      }

    }

  }

  const dailog_OK_OnClick = (warnMsg:any) =>{
    if(warnMsg.key === ITEM_TYPE.DELETE_NODE_WARNING){
      onDeleteItem()
    }
    toggleHideWarningDialog()
  }

  const dailog_CANCEL_OnClick = (warnMsg:any) =>{

    if(warnMsg.key === ITEM_TYPE.SAVE_ALERT){

      canceledNbkId.current.push(warnMsg.currItem.id)
      if(warnMsg.multipleNbk){
        toggleHideWarningDialog()

        let allNbk = Object.values(props.notebooks.allNotebooks.byId)
        for (const cancelId of canceledNbkId.current) {
          allNbk = allNbk.filter(obj => obj.id!== cancelId)
        }
        //checking more notebook is there for save then next save dailog wll be popuped.
        triggerNextCancelPopup(allNbk, props)
      }
      else{
        toggleHideWarningDialog()
      }

    }
    else{
      toggleHideWarningDialog()
    }
  }

  const triggerNextPopup = (allNbk:any, newProps:any) => {

    let latProp = {...newProps}
    if(allNbk.length>0){
      for(let i = 0; i< allNbk.length; i++){
        console.log(allNbk[i])
        if(allNbk[i].isSaved){
          console.log(newProps)
          const updateState = deleteItem(allNbk[i], latProp);
          latProp = getUpdatedNewProps(latProp, updateState)
        }
        else{
          popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${allNbk[i].name}?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: allNbk[i],
            multipleNbk: allNbk
          });
          break;
        }

      }
    }
  }

  const triggerNextCancelPopup = (allNbk:any, newProps:any) => {

    let latProp = {...newProps}
    if(allNbk.length>0){
      for(let i = 0; i< allNbk.length; i++){
        console.log(allNbk[i])
        if(allNbk[i].isSaved){
          console.log(newProps)
          const updateState = deleteItem(allNbk[i], latProp);
          latProp = getUpdatedNewProps(latProp, updateState)
        }
        else{
          popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${allNbk[i].name}?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: allNbk[i],
            multipleNbk: allNbk
          });
          break;
        }

      }
    }
  }



  const siemenuCmdItems = useMemo(()=>{
    console.log(currNodeItem.current)
    return [
      {
        key: 'Open',
        text: 'Open',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        iconProps: { iconName: 'FabricFolder' },
        onClick: () => {
          if(currNbkItem.current)
            openCloseAsset(currNbkItem.current, props, true)
        },
      },
      {
        key: 'close',
        text: 'Close',
        iconProps: { iconName: 'Cancel' },
        onClick: () => {
          if(currNbkItem.current)
            openCloseAsset(currNbkItem.current, props, false)
        },
      },
      {
        key: 'remane',
        text: 'Rename',
        iconProps: { iconName: 'Rename' },
        onClick: (ev, item) => {
          if(currNbkItem.current){
            onChangeRenameId(currNbkItem.current.id);
          }

        },
      },
      {
        key: 'print',
        text: 'Print',
        iconProps: { iconName: 'Print' },
        onClick: () => console.log('Share'),
      },
      // {
      //   key: 'export',
      //   text: 'Export',
      //   iconProps: { iconName: 'Export' },
      //   onClick: () => console.log('Share'),
      //   subMenuProps: {
      //     items: [
      //       {
      //         key: 'emailMessage',
      //         text: 'Notebook',
      //         iconProps: { iconName: 'DietPlanNotebook' },
      //         ['data-automation-id']: 'newEmailButton', // optional
      //       },
      //       { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      //       {
      //         key: 'graph',
      //         text: 'Graph',
      //         iconProps: { iconName: 'TextDocument' },
      //       },
      //       {
      //         key: 'worksheet',
      //         text: 'Worksheet',
      //         iconProps: { iconName: 'GridViewSmall' },
      //       },
      //       {
      //         key: 'report',
      //         text: 'Report',
      //         iconProps: { iconName: 'PageList' },
      //       },
      //       {
      //         key: 'pdf',
      //         text: 'Pdf',
      //         iconProps: { iconName: 'Pdf' },
      //       },
      //     ],
      //   },
      // },
    ];
  },[currNbkItem.current, props.activeItems])


  
  return (
   
      <div className="sidemenu-notebook-continer">
        <div className="sidemenu-notebook-header">
          <Label>Notebook Manager</Label>
          <div className="icon-group">
            {/* <IconButton className="sidemenu-icon" iconProps={pin} onClick={() => props.addNotebooks(notebookSample)} /> */}
            <IconButton
              className="sidemenu-icon"
              iconProps={close}
              onClick={()=>props.changeNotebookManagerDisplay(false)}              
            />
          </div>
        </div>
        <div className="sidemenu-notebook-content">
          <div className="sidemenu-notebook-list">
            <Label>Notebooks</Label>
            {/* <div className="icon-group">
              <IconButton
                className="sidemenu-icon"
                iconProps={add}
                onClick={() => setTimeout(()=>createNotebook(props))}
              />
              <IconButton
                className="sidemenu-icon"
                iconProps={remove}
                onClick={() => clearNotebooks()}
              />
            </div> */}

            <Toggle defaultChecked onChange={noteToggleclick} />
            <Label className="toggle-text">
              {notetoggle ? 'Hide' : 'Show'}
            </Label>
          </div>
          {notetoggle && (
            <div className="sidemenu-notebook-list-content notebook-list"
              id="notbookMngr">
              <CommandBar
                className="sidemenu-notebook-commandbar"
                items={siemenuCmdItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
              />
              <div className="notebook-list-grid" id="nbkItemList">
                <div className="main-nav-div">
                  <div className="main-nav"
                        style={{paddingLeft: "0px"}}
                        id = "all-notebook"
                        onContextMenu={(ev)=> onShowContextualMenu(ev, {type:"all-notebook", id: "all-notebook"})}>
                    All Open Notebooks
                  </div>
                  {checkNotNull(props.notebooks)
                    ? Object.values(props.notebooks.allNotebooks.byId).length
                      ? Object.values(props.notebooks.allNotebooks.byId).map((item) => (
                          <NotebookComponent
                            //onNotebookClick={handleClick}
                            allActiveItem = {props.allActiveItem}
                            openItemInCanvas = {openItemInCanvas}
                            setItemSelectedOnClick= {setItemSelectedOnClick}
                            notebook={item}
                            onShowContextualMenu = {onShowContextualMenu}
                            onHideContextualMenu = {onHideContextualMenu}
                            renameId = {renameId}
                            onItemRenaming = {onItemRenaming}
                            allSections = {props.notebooks.allSections}
                            allReports = {props.notebooks.allReports}
                            allWorksheets = {props.notebooks.allWorksheets}
                            allGraphPages = {props.notebooks.allGraphPages}
                            allTransforms = {props.notebooks.allTransforms}
                            allEquations = {props.notebooks.allEquations}
                            summaryInfoAction={props.summaryInfoAction}
                          />
                        ))
                      : []
                    : []}
                    {
                      props.importfileState.isOpenImportfile && <FileImport />
                    }

                    {( showContextualMenu &&
                      <ContextualMenu
                      id="customContextMenu"
                      className = "custom-contextMenu"
                      target = {`#${contextTargetId}`}
                      alignTargetEdge= {true}
                      directionalHint = {DirectionalHint.bottomCenter}
                      items={contextMenuItemsConst}
                      hidden={!showContextualMenu}
                      onItemClick={onHideContextualMenu}
                      onDismiss={onHideContextualMenu}
                    />
                    )}
                    {/* {
                      (<Dialog
                        hidden={hideDialog}
                        onDismiss={toggleHideDialog}
                        dialogContentProps={dialogContentProps}
                        modalProps={modalProps}
                      >
                        <DialogFooter >
                          <DefaultButton onClick={onDeleteItem} text="OK" />
                          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                        </DialogFooter>
                      </Dialog>)
                    } */}
                    {
                      (<Dialog
                        hidden={props.isWorksheetDialogOpen}
                        onDismiss={props.worksheetDialogHide}
                        dialogContentProps={wrkDialogContentProps}
                        modalProps={wrkModalProps}
                      >
                        <DialogFooter>
                          <DefaultButton onClick={onCreateWorksheet} text="OK" />
                          <DefaultButton onClick={()=>props.worksheetDialogHide(true)} text="Cancel" />
                        </DialogFooter>
                      </Dialog>)
                    }
                    
                </div>
              </div>
            </div>
          )}

          <div className="sidemenu-notebook-list">
            <Label>Summary Information</Label>
            <Toggle defaultChecked onChange={sumToggleclick} />
            <Label className="toggle-text">
              {sumtoggle ? 'Hide' : 'Show'}
            </Label>
          </div>
          {sumtoggle && <SummaryInfo/>}
        </div>
        {
          (<Dialog
            hidden={hideWarningDialog}
            onDismiss={()=>dailog_CANCEL_OnClick(warningMsgProps)}
            dialogContentProps= {warningMsgProps}
            modalProps={warningModalProps}
          >
            <DialogFooter>
              {warningMsgProps.key === ITEM_TYPE.SAVE_ALERT &&
                (
                  <DefaultButton onClick={()=>dailog_YES_OnClick(warningMsgProps)} text="Yes" />
                )
              }

              {warningMsgProps.key === ITEM_TYPE.SAVE_ALERT &&
                (
                  <DefaultButton onClick={()=>dailog_NO_OnClick(warningMsgProps)} text="No" />
                )
              }

              {(warningMsgProps.key === ITEM_TYPE.ALERT ||
                warningMsgProps.key === ITEM_TYPE.ALERT ||
                warningMsgProps.key === ITEM_TYPE.DELETE_NODE_WARNING)
                && <DefaultButton onClick={()=>dailog_OK_OnClick(warningMsgProps)} text="OK" />
              }

              {(warningMsgProps.key === ITEM_TYPE.DELETE_NODE_WARNING ||
                warningMsgProps.key === ITEM_TYPE.SAVE_ALERT)
                && <DefaultButton onClick={()=>dailog_CANCEL_OnClick(warningMsgProps)} text="Cancel" />
              }

            </DialogFooter>

          </Dialog>)
        }
      </div>
     
  );
};

function mapStateToProps(state: any) {
  return {
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    allNotebookId: state.notebookReducer.allNotebookId,
    isWorksheetDialogOpen: state.mainWindowReducer.isHideWorksheetDialog,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    openGraphs: state.worksheetOperationReducer.openGraphs,
    importfileState: state.ImportfileReducer,
    summaryDetails: state.summaryInfoReducer,
    licenseInfo: state.licenseInfoReducer,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    addNotebook: (nObj: INotebook) => {
      dispatch({ type: 'ADD_NOTEBOOK', payload: nObj });
    },
    removeNotebook: (nObj: INotebook) => {
      dispatch({ type: 'REMOVE_NOTEBOOK', payload: nObj });
    },
    addOpenWorksheet: (wObj: IWorksheet) => {
      dispatch({ type: 'ADD_OPEN_NOTEBOOK', payload: wObj });
    },
    setActiveWorksheet: (wKey: string) => {
      dispatch({ type: 'SET_ACTIVE_WORKSHEET', payload: wKey });
    },
    clearNotebooks: () => {
      dispatch({ type: 'CLEAR_NOTEBOOK' });
      //dispatch({ type: 'CLEARNOTEBOOK' });
    },
    createNotebook: (nobj: INotebook) => {
      dispatch({ type: 'CREATE_NOTEBOOK', payload: nobj });
    },
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    addReport: (newReport: IActiveItems) => {
      dispatch({ type: 'ADD_REPORT', payload: newReport });
    },
    addTransform: (newTransform: IActiveItems) => {
      dispatch({ type: 'ADD_TRANSFORM', payload: newTransform });
    },
    addEquation: (newEquation: IActiveItems) => {
      dispatch({ type: 'ADD_EQUATION', payload: newEquation });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    removeActiveItem: (item) => {
      dispatch({ type: 'REMOVE_ACTIVE_ITEM', payload: item });
    },
    addGraphPage: (item) => {
      dispatch({ type: 'ADD_GRAPHPAGE', payload: item });
    },
    addWorksheet: (item) => {
      dispatch({ type: 'ADD_WORKSHEET', payload: item });
    },
    renameItem: (item) => {
      dispatch({ type: 'RENAME_ITEM', payload: item });
    },
    deleteItem: (item) => {
      dispatch({ type: 'DELETE_ITEM', payload: item });
    },
    pasteItem : (item) => {
      dispatch({type: 'PASTE_ITEM', payload: item})
    },
    saveItem : (item) => {
      dispatch({type: 'SAVE_ITEM', payload: item})
    },
    addSelectedItem: (id: string) => {
      dispatch({type: 'ADD_SELECTED_ITEM', payload: id})
    },
    resetSelectedItems: () => {
      dispatch({type: 'RESET_SELECTED_ITEMS'})
    },
    worksheetDialogHide: bindActionCreators(isWorksheetDialogHide, dispatch),
    storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
    setActiveWorksheet: bindActionCreators(setActiveWorksheet, dispatch),
    storeGraph: bindActionCreators(storeGraph, dispatch),
    TransformAction: bindActionCreators(TransformAction, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    changeNotebookManagerDisplay: bindActionCreators(isNotebookManagerDisplay, dispatch),
    recentSavedFileAction: bindActionCreators(recentSavedFileAction, dispatch),
    actions: {
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      setActiveWorksheet: bindActionCreators(setActiveWorksheet, dispatch),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NotebookManager);


