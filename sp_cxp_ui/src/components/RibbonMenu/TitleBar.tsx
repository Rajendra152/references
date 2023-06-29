import React, { Component } from 'react';
import * as ConstantImage from '../Constant/ConstantImage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from '@fluentui/react/lib/Tooltip';
import * as toolTipId from '../RibbonMenu/NavBarRibbon/ToolTipIDs';
import * as componentInstance from '../../store/Worksheet/SpreadSheet/actions';
import { recentSavedFileAction } from '../../store/RecentSavedFile/actions';
import {
  saveNotebook,
  deleteItem,
} from '../../services/NotebookManagerServicesNew';
import {
  storeWorksheet,
  storeGraph,
} from '../../store/Worksheet/WorksheetOperation/actions';
import { isReRenderGraph } from '../../store/CreateGraph/CreateDiagramPage/actions';
import * as ACTION from '../Redux/actionConstants';
import {
  undoGraphState,
  redoGraphState,
} from '../../services/UndoRedoServices';
import {
  isRedoDataAvailable,
  isUndoDataAvailable,
} from '../../store/Worksheet/SpreadSheet/actions';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import {
  DefaultButton,
  IButtonStyles,
  IconButton,
} from '@fluentui/react/lib/Button';
import { getUpdatedNewProps } from '../../utils/notebookManagerUtils/notebookManagerUtility';
import * as ITEM_TYPE from '../../services/notebookManagerServices/ConstantsNotebookManager';
import { version } from '../Constant/ConstInfo';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import PgeSetupModal from '../RibbonMenu/NavBarRibbon/PgeSetupModal';
import { writeIntoINIFile, readFromINIFile } from '../../utils/globalUtility';
import { saveAllFileAction } from '../../store/RecentSavedFile/actions';
import equal from 'fast-deep-equal';
import { ipcRenderer } from 'electron';

const elecRemote = require('electron').remote;

const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};
const calloutProps = { gapSpace: 0 };

const undoRedoButtonStyles: IButtonStyles = {
  icon: { color: 'black' },
  rootDisabled: { backgroundColor: '#a9a9a9' },
  iconDisabled: { color: 'grey' },
  rootHovered: { backgroundColor: 'none' },
};
const SAVEFILEPATH = 'savedFilePath.ini';
class TitleBar extends Component {
  canceledNbkId;
  constructor(props) {
    super(props);
    this.state = {
      TextUndoRedo: false,
      UndoText: '',
      RedoText: '',
      sideMenuOpen: true,
      sidemenuTogOpen: true,
      disableButton: '',
      setOS: '',
      hideWarningDialog: true,
      warningMsgProps: {
        type: DialogType.normal,
        title: version,
        subText:
          'Worksheet in this section already Exist. Pasting Duplicate worksheet not allowed.',
        key: ITEM_TYPE.SAVE_ALERT,
      },
    };
    this.canceledNbkId = [];
  }
  dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };
  warningDialogStyles = { main: { maxWidth: '200px' } };
  warningModalProps = {
    isBlocking: true,
    styles: this.warningDialogStyles,
    dragOptions: this.dragOptions,
    className: 'warningDialog',
  };

  toggleHideWarningDialog = () => {
    this.setState({ hideWarningDialog: !this.state.hideWarningDialog });
  };

  componentDidUpdate(prevProps) {
    if (!equal(this.props.previosSelectedNode, prevProps.previosSelectedNode)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      if (this.props.previosSelectedNode == 'TEXT') {
        this.setState({
          TextUndoRedo: true,
          UndoText: 'Undo Text Editing (Ctrl + Z)',
          RedoText: 'Redo Text Editing (Ctrl + Y)',
        });
      } else if (this.props.previosSelectedNode == 'LINE') {
        this.setState({
          TextUndoRedo: true,
          UndoText: 'Undo Drawing Line (Ctrl + Z)',
          RedoText: 'Redo Drawing Line (Ctrl + Y)',
        });
      } else if (this.props.previosSelectedNode == 'RECTANGLE') {
        this.setState({
          TextUndoRedo: true,
          UndoText: 'Undo Drawing Box (Ctrl + Z)',
          RedoText: 'Redo Drawing Box (Ctrl + Y)',
        });
      } else if (this.props.previosSelectedNode == 'ELLIPSE') {
        this.setState({
          TextUndoRedo: true,
          UndoText: 'Undo Drawing Ellipse (Ctrl + Z)',
          RedoText: 'Redo Drawing Ellipse (Ctrl + Y)',
        });
      } else {
        this.setState({ TextUndoRedo: false });
      }
    }
  }
  componentDidMount() {
    console.log('inside title bar', this.props.previosSelectedNode);

    console.log('titlebar');

    console.log('Active Item -------->  ', this.props.allActiveItem);
    this.init();
    var OS = this.getOS();
    const allFilePath = readFromINIFile(SAVEFILEPATH);
    this.props.saveAllFileAction(allFilePath);
    this.setState({ setOS: OS });
    console.log(OS);
  }

  closeWindowAfter() {
    writeIntoINIFile(this.props.recentSavedFile, SAVEFILEPATH);
    const window = elecRemote.getCurrentWindow();
    window.close();
  }
  // disableFeatureOnLoad = () => {
  //   let active_item = this.props.allActiveItem;
  //   if (active_item.graphPage.id && active_item.graphPage.id !== null) {
  //     console.log('inside graph');
  //   } else if (active_item.worksheet && active_item.worksheet !== null) {
  //     console.log('inside spreadsheet');
  //   } else if (active_item.report && active_item.report !== null) {
  //     console.log('inside report');
  //     console.log('inside if');
  //   } else {
  //     console.log('not openend any thing');
  //     this.setState({ disableButton: 'disabled' });
  //   }
  // };
  //   componentDidUpdate() {
  //     alert("update");
  // }
  undoFunction = () => {
    let active_item = this.props.allActiveItem;
    if (active_item.graphPage.id && active_item.graphPage.id !== null) {
      undoGraphState(active_item.graphPage.id, this.props);
      setTimeout(() => {
        this.props.isReRenderGraph(true);
      });
    } else if (active_item.worksheet && active_item.worksheet !== null) {
      console.log('inside spreadsheet');
      this.props.spreadSheetInstance.undo();
    } else if (active_item.report && active_item.report !== null) {
      console.log('inside report');
      this.props.reportInstance.documentEditor.editorHistory.undo();
    } else {
      console.log('not openend any thing');
    }
  };

  redoFunction = () => {
    let active_item = this.props.allActiveItem;
    if (active_item.graphPage.id && active_item.graphPage.id !== null) {
      redoGraphState(active_item.graphPage.id, this.props);
      setTimeout(() => {
        this.props.isReRenderGraph(true);
      });
    } else if (active_item.worksheet && active_item.worksheet !== null) {
      console.log('inside spreadsheet');
      this.props.spreadSheetInstance.redo();
    } else if (active_item.report && active_item.report !== null) {
      console.log('inside report');
      this.props.reportInstance.documentEditor.editorHistory.redo();
    } else {
      //alert('not openend any thing');
    }
  };

  init() {
    const remote = require('electron').remote;
    const check = require('electron')
      .remote.getCurrentWebContents()
      .getProcessId();
    document.getElementById('min-btn').addEventListener('click', function (e) {
      const window = remote.getCurrentWindow();
      window.minimize();
    });

    document.getElementById('max-btn').addEventListener('click', function (e) {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
    });

    // document
    //   .getElementById('close-btn')
    //   .addEventListener('click', function (e) {
    //     const window = remote.getCurrentWindow();
    //     window.close();
    //   });
  }

  closeWindowOnClick = () => {
    const allNbk = Object.values(this.props.notebooks.allNotebooks.byId);
    let latProp = { ...this.props };
    let isAllNbkAlreadySaved = true;
    console.log(allNbk);
    console.log(latProp);
    if (allNbk.length > 0) {
      for (let i = 0; i < allNbk.length; i++) {
        if (allNbk[i].isSaved === undefined) {
          const updateState = deleteItem(allNbk[i], latProp);
          console.log(updateState);
          latProp = getUpdatedNewProps(latProp, updateState);
         ipcRenderer.send('window_close_all');
        } else {
          isAllNbkAlreadySaved = false;
          this.popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${allNbk[i].name} ?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: allNbk[i],
            multipleNbk: allNbk,
          });
          break;
        }
        if(isAllNbkAlreadySaved){
        ipcRenderer.send('window_close_all');
        }
      }
      
    } else {
    //  console.log(`ELSE STATEMENT: length is equal to 0`);
     ipcRenderer.send('window_close_all')
    }
      };
  // componentDidUpdate(prevProps) {
  //   var scope=this;
  //   console.log('inside in title bar update');
  //   let active_item = this.props.allActiveItem;
  //   console.log(this.props.allActiveItem);
  //   if (active_item.graphPage.id && active_item.graphPage.id !== null) {
  //     console.log('inside graph');
  //   } else if (active_item.worksheet && active_item.worksheet !== null) {
  //     console.log('inside spreadsheet');
  //     this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
  //       message: "enableUndo",
  //     });
  //     this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
  //       message: "enableRedo",
  //     });
  //   } else if (active_item.report && active_item.report !== null) {
  //     console.log('inside report');
  //     // this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
  //     //   message: "disableUndo",
  //     // });
  //     // this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
  //     //   message: "disableRedo",
  //     // });
  //   } else {
  //     console.log('not openend any thing');
  //   }

  // }
  saveFunction = () => {
    const currentNotebook =
      this.props.notebooks.allNotebooks.byId[this.props.allActiveItem.notebook];
    saveNotebook([currentNotebook], this.props, true);
  };
  getOS = () => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  };

  popupWarningMsgDailog = (newMsg) => {
    this.setState({
      warningMsgProps: {
        ...this.state.warningMsgProps,
        ...newMsg,
      },
    });
    this.toggleHideWarningDialog();
  };

  triggerNextPopup = (allNbk: any, newProps: any) => {
    let latProp = { ...newProps };
    let isAllNbkAlreadySaved = true;
    if (allNbk.length > 0) {
      for (let i = 0; i < allNbk.length; i++) {
        console.log(allNbk[i]);
        if (allNbk[i].isSaved) {
          console.log(newProps);
          const updateState = deleteItem(allNbk[i], latProp);
          latProp = getUpdatedNewProps(latProp, updateState);
        } else {
          isAllNbkAlreadySaved = false;
          this.popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${allNbk[i].name} ?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: allNbk[i],
            multipleNbk: allNbk,
          });
          break;
        }
      }
      if (isAllNbkAlreadySaved) {
        this.closeWindowAfter();
      }
    } else {
      // this.closeWindowAfter();
    }
  };

  dailog_CANCEL_OnClick = (warnMsg: any) => {
    this.toggleHideWarningDialog();
  };

  dailog_YES_OnClick = async (warnMsg: any) => {
    if (warnMsg.multipleNbk) {
      this.toggleHideWarningDialog();
      let allNbk = Object.values(this.props.notebooks.allNotebooks.byId);
      allNbk = allNbk.filter((obj) => obj.id !== warnMsg.currItem.id);
      for (const cancelId of this.canceledNbkId) {
        allNbk = allNbk.filter((obj) => obj.id !== cancelId);
      }

      const [allNewState, isSuccess] = await saveNotebook(
        [warnMsg.currItem],
        this.props,
        false
      );
      if (!isSuccess) {
        this.canceledNbkId.push(warnMsg.currItem.id);
      }

      let newProps = {
        ...this.props,
        ...allNewState,
      };

      //checking more notebook is there for save then next save dailog wll be popuped.
      this.triggerNextPopup(allNbk, newProps);
    } else {
      saveNotebook([warnMsg.currItem], this.props, false);
      this.toggleHideWarningDialog();
    }
  };

  dailog_NO_OnClick = async (warnMsg: any) => {
    if (warnMsg.multipleNbk) {
      this.toggleHideWarningDialog();
      let allNbk = Object.values(this.props.notebooks.allNotebooks.byId);
      allNbk = allNbk.filter((obj) => obj.id !== warnMsg.currItem.id);
      for (const cancelId of this.canceledNbkId) {
        allNbk = allNbk.filter((obj) => obj.id !== cancelId);
      }

      const updateState = await deleteItem(warnMsg.currItem, this.props);
      let newProps = getUpdatedNewProps(this.props, updateState);
      this.triggerNextPopup(allNbk, newProps);
    } else {
      deleteItem(warnMsg.currItem, this.props);
      this.toggleHideWarningDialog();
    }
  };

  render() {
    let alignIcons = this.state.setOS === 'Mac OS' ? 'alignTitleIcons' : '';
    return (
      <>
        <PgeSetupModal />
        <div id="title-bar">
          <div id="drag-region">
            <div id="title-bar-btns-left" className={alignIcons}>
              <TooltipHost
                content={'Save the active document (Ctrl + S)'}
                closeDelay={100}
                id={toolTipId.tooltipIdSave}
                calloutProps={calloutProps}
                styles={styles}
                directionalHint={DirectionalHint.bottomCenter}
              >
                <IconButton
                  alt="save-icon"
                  className="save_icons"
                  onClick={() => this.saveFunction()}
                  iconProps={{ iconName: 'Save' }}
                  styles={{
                    icon: { color: 'black' },
                    rootHovered: { backgroundColor: 'none' },
                  }}
                />
              </TooltipHost>{' '}
              <TooltipHost
                content={
                  this.props.hidebuttonUndo == 'disableUndo'
                    ? 'Cannot Undo (Ctrl + Z)'
                    : this.state.TextUndoRedo == true
                    ? this.state.UndoText
                    : 'Undo the last action (Ctrl + Z)'
                }
                closeDelay={100}
                id={toolTipId.tooltipIdUndo}
                calloutProps={calloutProps}
                styles={styles}
                directionalHint={DirectionalHint.bottomCenter}
              >
                <IconButton
                  onClick={() => {
                    this.undoFunction();
                  }}
                  alt="undo-icon"
                  className={`titlebar_icons_one`}
                  iconProps={{ iconName: 'Undo' }}
                  styles={undoRedoButtonStyles}
                  disabled={this.props.hidebuttonUndo == 'disableUndo'}
                />
              </TooltipHost>{' '}
              <TooltipHost
                content={
                  this.props.hidebuttonRedo == 'disableRedo'
                    ? 'Cannot Redo  (Ctrl + Y)'
                    : this.state.TextUndoRedo == true
                    ? this.state.RedoText
                    : 'Redo the previously undone action (Ctrl + Y)'
                }
                closeDelay={100}
                id={toolTipId.tooltipIdRedo}
                calloutProps={calloutProps}
                styles={styles}
                directionalHint={DirectionalHint.bottomCenter}
              >
                <IconButton
                  onClick={() => this.redoFunction()}
                  alt="redo-icon"
                  className={`titlebar_icons_one`}
                  iconProps={{ iconName: 'Redo' }}
                  styles={undoRedoButtonStyles}
                  disabled={this.props.hidebuttonRedo == 'disableRedo'}
                />
              </TooltipHost>{' '}
              &nbsp;
            </div>
            <div id="title">
              <img src={ConstantImage.Title}  style= {{userDrag: "none",
webkitUserDrag: "none",
userSelect: "none",
MozUserSelect: "none",
webkitUserSelect: "none",
msUserSelect: "none"}} alt="Sigmaplot ng" />
            </div>

            <div id="title-bar-btns">
              {this.state.setOS !== 'Mac OS' && (
                <>
                  <IconButton
                    alt="min-icon"
                    className="titlebar_icons_right"
                    id="min-btn"
                    iconProps={{ iconName: 'ChromeMinimize' }}
                    styles={{
                      icon: { color: 'black' },
                      rootHovered: { backgroundColor: 'none' },
                    }}
                  />
                  <IconButton
                    alt="maxi-icon"
                    className="titlebar_icons_right"
                    id="max-btn"
                    iconProps={{ iconName: 'Stop' }}
                    styles={{
                      icon: { color: 'black' },
                      rootHovered: { backgroundColor: 'none' },
                    }}
                  />
                  <IconButton
                    alt="close-icon"
                    className="titlebar_icons_right"
                    id="close-btn"
                    onClick={this.closeWindowOnClick}
                    iconProps={{ iconName: 'ChromeClose' }}
                    styles={{
                      icon: { color: 'black' },
                      rootHovered: { backgroundColor: 'none' },
                    }}
                  />
                  &nbsp;&nbsp;
                </>
              )}
            </div>
          </div>
        </div>
        {
          <Dialog
            hidden={this.state.hideWarningDialog}
            onDismiss={() =>
              this.dailog_CANCEL_OnClick(this.state.warningMsgProps)
            }
            dialogContentProps={this.state.warningMsgProps}
            modalProps={this.warningModalProps}
          >
            <DialogFooter>
              <DefaultButton
                onClick={() =>
                  this.dailog_YES_OnClick(this.state.warningMsgProps)
                }
                text="Yes"
              />
              <DefaultButton
                onClick={() =>
                  this.dailog_NO_OnClick(this.state.warningMsgProps)
                }
                text="No"
              />
              <DefaultButton
                onClick={() =>
                  this.dailog_CANCEL_OnClick(this.state.warningMsgProps)
                }
                text="Cancel"
              />
            </DialogFooter>
          </Dialog>
        }
      </>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state);
  return {
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    hidebuttonUndo: state.instanceReducer.undo,
    hidebuttonRedo: state.instanceReducer.redo,
    spreadSheetInstance: state.instanceReducer.instance,
    reportInstance: state.instanceReducer.exportInstance,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    recentSavedFile: state.recentSavedFileReducer,
    previosSelectedNode: state.createDiagramPageReducer.previosSelectedNode,
    selectedNodeType: state.createDiagramPageReducer.selectedNodeType,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      hideUndoRedoButtons: bindActionCreators(componentInstance, dispatch),
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      storeGraph: bindActionCreators(storeGraph, dispatch),
    },
    saveItem: (item) => {
      dispatch({ type: 'SAVE_ITEM', payload: item });
    },
    recentSavedFileAction: bindActionCreators(recentSavedFileAction, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    deleteItem: (item) => {
      dispatch({ type: 'DELETE_ITEM', payload: item });
    },
    saveAllFileAction: bindActionCreators(saveAllFileAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TitleBar);
