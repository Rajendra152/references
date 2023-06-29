import React, { Component } from 'react';
// import Worksheet from '../Worksheet/Worksheet';
import Header from '../RibbonMenu/Header';
import Footer from '../RibbonMenu/Footer';
import SideMenu from './../RibbonMenu/SideMenu';
import NotebookManager from './../NotebookManager/NotebookManagerNew';
import CanvasManager from '../CanvasManager/CanvasManagerNew';
import { connect } from 'react-redux';
import Equation from '../RibbonMenu/NavBarRibbon/AnalysisMenu/Equation';
import UserDefinedCompontent from '../RibbonMenu/NavBarRibbon/AnalysisMenu/UserDefined';
import AuditMain from '../RibbonMenu/NavBarRibbon/Auditing/AuditMain';
import AuditList from '../RibbonMenu/NavBarRibbon/Auditing/AuditList';
import Options from '../RibbonMenu/NavBarRibbon/Options/Options';
const { ipcRenderer } = require('electron');

import PasswordMain from '../RibbonMenu/NavBarRibbon/Password/PasswordMain';
import Progressbar from './Progress_bar';
import Loader from './Loader';
import NotebookPassword from './NotebookPassword';
import { isNotebookManagerDisplay } from "../../store/MainWindow/actions";
import * as ProgressAction from '../../store/Channel/Progress/actions';
import { summaryInfoAction } from "../../store/SummaryInfo/actions";
import * as componentInstance from '../../store/Worksheet/SpreadSheet/actions';

import { isStatusbarDisplay, isLoaderDisplay } from "../../store/MainWindow/actions";
import { bindActionCreators } from 'redux';
import { checkLicense, fingerprint } from "../App/Config";
import { post, get } from "../../services/DataService";
import { getOS, readFromINIFile, readINIFile } from "../../utils/globalUtility";
import { createNewSet, getDataSetByKey, createNewClient } from '../../services/RedisServices';
import { readReportOptionsFromINIFile } from '../Constant/ConstantFunction';

class MainWindow extends Component {
  //   keys: { tab: boolean; arrowRight: boolean; arrowLeft: boolean };
  constructor(props) {
    super(props);
    this.state = {
      // toggleSidemenu: true,
      // closeSidemenu: false,
      helpWindowId: '',
      initialPos: 250,
      initialSize: 250,
      userClick: true,
      winheight: "",
    };
  }

  componentDidUpdate = () => {
    this.props.isNotebookManagerDisplay2 ? window.addEventListener('resize', this.updateNoteManager) :
      window.removeEventListener("resize", this.updateNoteManager)
  }

  async componentDidMount() {
    const _this = this
    ipcRenderer.on("dataSelectionTestChild", function (event, arg) {
      // alert("hi",arg)
      console.log("hey",arg)
      _this.props.actions.dataSelectionObject.updateDataSelectionStepWiseData({
        message:[arg],
      });
    })
    readReportOptionsFromINIFile();

    this.setState({
      winheight:
        window.innerHeight -
        document.getElementsByClassName('ribbon-tab')[0].clientHeight -
        document.getElementsByClassName('footer-bar')[0].clientHeight -
        // document.getElementById('title-bar').clientHeight -
        40
    })

    let checkOs = getOS()
    if(checkOs== "Windows"){
    let sendRes = await get(checkLicense);
    if (sendRes !== undefined) {
      if (sendRes.data.result !== undefined) {
        if (sendRes.data.result.validity == false) {
          this.setState({ userClick: false })
          let Data = {
            message: 'license',
            someData: "LicenseInactive",
            path: 'license',
            modal: true,
            width: 650,
            height: 600
          };
          ipcRenderer.send('request-mainprocess-action', Data);
        }
        else if(sendRes.data.code==1002){
          this.setState({ userClick: false })
          let Data = {
            message: 'license',
            someData: "LicenseInactive",
            path: 'license',
            modal: true,
            width: 650,
            height: 600
          };
          ipcRenderer.send('request-mainprocess-action', Data);
        }
      }
      else{
        this.setState({ userClick: false })
        let Data = {
          message: 'license',
          someData: "LicenseInactive",
          path: 'license',
          modal: true,
          width: 650,
          height: 600
        };
        ipcRenderer.send('request-mainprocess-action', Data);
      }
    }
    }
    let helpEvent = this.props;
    let current = '';

    window.addEventListener(
      'keydown',
      function (event) {
        console.log('key pressed f1');
        if (event.code == 'F1' || event.key == 'F1') {
          console.log('entered f1', document);
          if (helpEvent.helpMenu.HelpValue[0].selectedItem !== '') {
            current = helpEvent.helpMenu.HelpValue[0].selectedItem;
          } else if (helpEvent.helpMenu.HelpValue[0].selectedElement !== '') {
            current = helpEvent.helpMenu.HelpValue[0].selectedElement;
          } else {
            current = helpEvent.helpMenu.HelpValue[0].RibbonMenu;
          }
          let Data = {
            message: 'Help',
            someData: "Let's go",
            path: `helpMenu/${current}`,
          };
          ipcRenderer.send('request-mainprocess-action', Data);
        }
      },
      true
    );
  }

  updateNoteManager = () => {
    if (window.innerWidth <= 760) {
      this.props.actions.changeNotebookManagerDisplay(false)
    } else {
      this.props.actions.changeNotebookManagerDisplay(true)
    }
  }
  initial = (e) => {
    let resizable = document.getElementsByClassName("sidemenu-content");
    this.setState({
      initialPos: e.clientX,
      initialSize: resizable[0].offsetWidth,
    });

  };


  resize = (e) => {
    let resizable = document.getElementsByClassName("sidemenu-content");
    let resizableSpreadSheet = document.getElementsByClassName("main-content");
    console.log('INITIAL SIZE', this.state.initialSize)
    console.log('INITIAL POSITION', this.state.initialPos)
    console.log('INITIAL POSITION', e.clientX)
    if (e.clientX >= 250) {
      let resizableWidth =
        parseInt(this.state.initialSize) +
        parseInt(e.clientX - this.state.initialPos);
      resizable[0].style.width = `${resizableWidth}px`;
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateNoteManager);
  }
  render() {
    const { toggleSidemenu, closeSidemenu } = this.state;
    return (
      // inactiveApp className={`${this.state.userClick == false ? "inactiveApp" : ""}`}
      <div className={`${this.state.userClick == false ? " main-window" : "main-window"}`} >
        <Header />
        {this.props.channelState.isLoadBar && (
          <Progressbar
            bgcolor="#8fbce6"
            progress={parseInt(this.props.channelState.percentage)}
            height={18}
          />
        )}
        {this.props.channelState.isLoaderSM && <Loader></Loader>}
        <div className="ms-Grid main-content-area" dir="ltr" >
          <div className="ms-Grid-row" style={{ width: '100vw', display: 'flex' }}>
            <div
              className={
                this.props.mainWindowState.isNotebookManagerDisplay
                  ? 'ms-Grid-col ms-sm6 ms-md4 ms-lg4 sidemenu-content'
                  : 'ms-Grid-col ms-sm6 ms-md4 ms-lg4 sidemenu-content sidemenu-hide'
              }
            >
              {/* <SideMenu toggSidemenuprop={toggleSidemenu} ToggleSidemenuClick={this.ClickSidemenu} CloseSidemenuClick={this.CloseSidemenu}></SideMenu> */}
              <NotebookManager />
            </div>
            <div
              id='Draggable'
              // className='ms-Grid-col'
              draggable='true'
              onDragStart={this.initial}
              onDrag={this.resize}

            />
            <div
              className={
                this.props.mainWindowState.isNotebookManagerDisplay
                  ? "ms-Grid-col ms-sm6 ms-md8 ms-lg8 main-content"
                  : "ms-Grid-col ms-sm6 ms-md8 ms-lg8 main-content main-content-full"
              }
            //  style={{overflow: 'scroll'}}
            >
              {/* <div> */}
                {this.props.mainWindowState.isLoaderDisplay && <Loader />}
                <CanvasManager />
              {/* </div> */}
              {/* <Worksheet/> */}
            </div>
          </div>
        </div>
        {this.props.transformState.isOpenEquation && <Equation />}
        {this.props.transformState.isOpenUserDefined && (
          <UserDefinedCompontent />
        )}
        {this.props.auditingState.isAuditMain && <AuditMain />}
        {this.props.auditingState.isPasswordMain && <PasswordMain />}
        {this.props.auditingState.isAuditing && <AuditList></AuditList>}
        {this.props.auditingState.isOpenNotePass && (
          <NotebookPassword></NotebookPassword>
        )}
        {this.props.optionsState.isOptions && <Options />}
        <Footer></Footer>
      </div>



      // <Graph></Graph>
      // <Report></Report>
    );
  }
}

function mapStateToProps(state) {
  return {
    transformState: state.transformReducer,
    auditingState: state.auditingReducer,
    optionsState: state.optionsReducer,
    helpMenu: state.helpMenuReducer,
    channelState: state.progressBarReducer,
    mainWindowState: state.mainWindowReducer,
    isNotebookManagerDisplay: state.mainWindowReducer.isNotebookManagerDisplay,
    isNotebookManagerDisplay2: state.mainWindowReducer.isNotebookManagerDisplay2,
  };
}
function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    actions: {
      changeStatusbarDisplay: bindActionCreators(isStatusbarDisplay, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
      changeNotebookManagerDisplay: bindActionCreators(isNotebookManagerDisplay, dispatch),
      dataSelectionObject: bindActionCreators(componentInstance, dispatch),

    },
    
    isLoaderDisplay: bindActionCreators(isLoaderDisplay, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
