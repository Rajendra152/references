import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

import { openCloseNotebook,
          openCloseSection,
          createNotebook,
          createBlankSection,
          createGraphPage,
          createReport,
          openCloseAsset,
          createWorksheet,
          pasteItem,
          onSave,
          saveNotebook,
          openSaveAs,
          getMaxDepthOfTree,
          deleteItem,
          createTransform,
          createEquation
         } from "../../services/NotebookManagerServicesNew";

import  * as ErrorMessage from "../../components/Worksheet/Compontent/ErrorCompontent";
import * as ITEM_TYPE from '../../services/notebookManagerServices/ConstantsNotebookManager'
import { getUpdatedNewProps } from "../../utils/notebookManagerUtils/notebookManagerUtility";
import { version } from "../Constant/ConstInfo";
export const contextMenuItemsConst= [
  {
    key: 'expand-collapse',
    text: 'Expand/Collapse',
    disabled: false,
    onClick: (ev,item) => {
      item.expandCollapse(ev);
    },
  },
  {
    key: 'open',
    text: 'Open',
    disabled: false,
    onClick: (ev,item) => {

      if(item.clickedItem.type === ITEM_TYPE.NOTEBOOK ){
        openCloseNotebook(item.clickedItem, item.props, true)
      }
      else if(item.clickedItem.type === ITEM_TYPE.SECTION ){
        openCloseSection(item.clickedItem, item.props, true)
      }
      else{
        openCloseAsset(item.clickedItem, item.props, true)
      }

    },
  },
  {
    key: 'close',
    text: 'Close',
    disabled: false,

    onClick: (ev,item) => {
      if(item.clickedItem.type === ITEM_TYPE.ALL_NOTEBOOK){
        const allNbk = Object.values(item.props.notebooks.allNotebooks.byId)
        let latProp = {...item.props}
        if(allNbk.length>0){
          for(let i = 0; i< allNbk.length; i++){
            if(allNbk[i].isSaved){
              const updateState = deleteItem(allNbk[i], latProp);
              latProp = getUpdatedNewProps(latProp, updateState);
            }
            else{
              item.popupWarningMsgDailog({
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
      else if(item.clickedItem.type == ITEM_TYPE.NOTEBOOK ){
        if(item.clickedItem.isSaved){
          deleteItem(item.clickedItem, item.props)
        }
        else{
          item.popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${item.clickedItem.name}?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: item.clickedItem,
            multipleNbk: null
          });
        }

        //openCloseNotebook(item.clickedItem, item.props, false)
      }
      else if(item.clickedItem.type == ITEM_TYPE.SECTION ){
        openCloseSection(item.clickedItem, item.props, false)
      }
      else{
        openCloseAsset(item.clickedItem, item.props, false)
      }
    },
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'copy',
    text: 'Copy',
    disabled: false,
    onClick: (ev , item) => {
      item.onCopyingNode(item.clickedItem)
    },
  },
  {
    key: 'paste',
    text: 'Paste',
    disabled: false,
    onClick: (ev, item) => {

      if(item.copiedItem.type === ITEM_TYPE.WORKSHEET && item.clickedItem.worksheetId){
        item.popupWarningMsgDailog({
          title: version,
          subText: 'Worksheet in this section already Exist. Pasting Duplicate worksheet not allowed.',
          key: ITEM_TYPE.ALERT
        });
      }
      else if(item.copiedItem.type === ITEM_TYPE.SECTION){
        if(item.clickedItem.type === ITEM_TYPE.NOTEBOOK){

        }
        else if(item.clickedItem.type === ITEM_TYPE.SECTION){
          const size = getMaxDepthOfTree(item.copiedItem, item.props.notebooks)
          if(size+item.clickedItem.level > 3){
            item.popupWarningMsgDailog({
              title: version,
              subText: `Section deep level exceeded more than 3.`,
              key: ITEM_TYPE.ALERT
            });
            // ErrorMessage.ErrorMessage({
            //   'error':'Paste Not Allowed',
            //   'details' : `Section deep level exceded more than 3. `

            // })
            return false;
          }
        }
        else{
          const size = getMaxDepthOfTree(item.copiedItem, item.props.notebooks)
          if(size+item.clickedItem.level > 2){
            item.popupWarningMsgDailog({
              title: version,
              subText: `Section deep level exceeded more than 3.`,
              key: ITEM_TYPE.ALERT
            });
            // ErrorMessage.ErrorMessage({
            //   'error':'Paste Not Allowed',
            //   'details' : `Section deep level exceded more than 3. `

            // })
            return false;
          }
        }

        pasteItem(item.clickedItem, item.copiedItem, item.props);
      }
      else{
        pasteItem(item.clickedItem, item.copiedItem, item.props);
      }



    },
  },
  {
    key: 'delete',
    text: 'Delete',
    disabled: false,
    onClick: (ev, item) => {
      item.popupWarningMsgDailog({
        title: 'Notebook',
        subText: 'Are you certain you want to delete this entry?',
        key: ITEM_TYPE.DELETE_NODE_WARNING
      });
    },
  },
  {
    key: 'rename',
    text: 'Rename',
    disabled: false,
    onClick: (ev,item) => {
      item.rename(item.clickedItem.id);
    },
  },
  {
    key: 'divider_2',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'save',
    text: 'Save',
    disabled: false,
    onClick: (ev,item) => {
      if(item.clickedItem.type === ITEM_TYPE.ALL_NOTEBOOK){
        const allNbk = Object.values(item.props.notebooks.allNotebooks.byId)
        saveNotebook(allNbk, item.props, true);
      }
      else if(item.clickedItem.type == ITEM_TYPE.NOTEBOOK){
        saveNotebook([item.clickedItem], item.props, true);
      }
      else{
        const actNbk = item.props.notebooks.allNotebooks.byId[item.clickedItem.parentNotebookId]
        saveNotebook([actNbk], item.props, true);
      }
    }
  },
  {
    key: 'save_as',
    text: 'Save As...',
    disabled: false,
    onClick: (ev,item) => {
      if(item.clickedItem.type == ITEM_TYPE.NOTEBOOK){
        openSaveAs(item.clickedItem, item.props, true);
      }
      else{
        const actNbk = item.props.notebooks.allNotebooks.byId[item.clickedItem.parentNotebookId]
        openSaveAs(actNbk, item.props, true);
      }
    },
  },
  {
    key: 'print',
    text: 'Print...',
    disabled: false,
    onClick: () => console.log('Properties clicked'),
  },
  {
    key: 'divider_3',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'new',
    text: 'New',
    subMenuProps: {
      items: [
        {
          key: 'create-worksheet',
          text: 'Worksheet',
          disabled: false,
          onClick: (ev,item) => {
            let isWarningReq = false;
            if(item.clickedItem.type === ITEM_TYPE.NOTEBOOK){

            }
            else if(item.clickedItem.type === ITEM_TYPE.SECTION){
              const activeSec= item.props.notebooks.allSections.byId[item.clickedItem.id];
              isWarningReq = !activeSec.worksheetId && activeSec.graphPage.length > 0 ? true : false;
            }
            else {
              const activeSec= item.props.notebooks.allSections.byId[item.clickedItem.parentSectionId];
              isWarningReq = !activeSec.worksheetId && activeSec.graphPage.length > 0 ? true : false;
            }

            if(isWarningReq){
              item.worksheetDialogHide(false);
            }
            else{
              createWorksheet(item.props, item.clickedItem);
            }

          },
        },
        {
          key: 'create-graphPage',
          text: 'Graph Page',
          disabled: false,
          onClick: (ev,item) => {
            createGraphPage(item.props, null , item.clickedItem);
          },
        },
        {
          key: 'create-report',
          text: 'Report',
          disabled: false,
          onClick: (ev,item) => {
            createReport(item.props, item.clickedItem)
          },
        },
        // {
        //   key: 'create-equation',
        //   text: 'Equation',
        //   disabled: false,
        //   onClick: (ev, item) => {
        //     // createEquation(item.props, item.clickedItem)
        //     item.props.TransformAction.isOpenEquation({
        //       message: true,
        //       clickedItem: item.clickedItem
        //     })
        //   },
        // },
        {
          key: 'create-section',
          text: 'Section',
          disabled: false,
          onClick: (ev,item) => {
            createBlankSection(item.props, item.clickedItem)
          },
        },
        {
          key: 'create-transform',
          text: 'Transform',
          disabled: false,
          onClick: (ev, item) => {
            createTransform(item.props, item.clickedItem)
          }
        },
        {
          key: 'create-notebook',
          text: 'Notebook',
          disabled: true,
          onClick: (ev,item) => {
            createNotebook(item.props)
          },
        },
      ],
    },
  },

];
