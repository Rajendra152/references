import React, { Component } from "react";
import { connect } from "react-redux";
import { IButtonStyles, IconButton } from "@fluentui/react";
import * as storeSpreadsheetAction from "../../store/Worksheet/SpreadSheet/index";
import { bindActionCreators } from "redux";
import { closeWindow } from "../RibbonMenu/Wizard/DataTransfer/DataTransfer";
const elecRemote = require('electron').remote

//CSS for this can be found in wizard.scss
interface IWizardTitleBarState {
  OS: string;
  subtitle: string;
}

interface IWizardTitleBarProps {
  title: string | undefined;
  stepType: string;
}

const wizardTitleBarButtonStyles: IButtonStyles = {
  icon: { color: "#f3f3f3" },
  rootHovered: { backgroundColor: "none" },
};

class WizardTitleBar extends Component<
  IWizardTitleBarProps,
  IWizardTitleBarState
> {
  constructor(props: IWizardTitleBarProps) {
    super(props);
    this.state = {
      OS: this.getOS(),
      subtitle: "",
    };
  }
  
  componentDidMount() {
    this.makeTitle();
  }  

  componentDidUpdate(prevProps: IWizardTitleBarProps) {
    if (prevProps.title !== this.props.title || prevProps.stepType !== this.props.stepType){
      this.makeTitle();
      console.log("STEP TYPE", this.props.stepType);
    }
  }

  makeTitle = () => {
    let option: string;
    if (this.props.stepType == "DATASELECTION") {
      option = " - Select Data";
    } 
    else if (this.props.stepType == "DATAFORMAT") {
      option = " - Data Format";
    } 
    else if (this.props.stepType == "CACULATION") {
      option = " - Calculation";
    }
    else if (this.props.stepType == "MEDIAN") {
      option = " - Population Value";
    }
    else if (this.props.stepType == "DATASELECTIONSTEPWISE"){
      if (this.props.title === "Principal Components"){
        option = " - Select Observation Labels"  
      } else if (this.props.title === "LogRank" || this.props.title === "Gehan-Breslow"){
        option = " - Select Groups"  
      } else if (this.props.title === "Proportional Hazards" || this.props.title === "Stratified Model"){
        option = " - Categorical Covariates"  
      } else {
        option = " - Select Forced Variables"
      }
    }
    else if (this.props.stepType == "STATUSLABEL"){
      option = " - Select Status Labels"
    }
    else if (this.props.stepType == "BINOPTIONS"){
      option = " - Bin Options"
    }
    else if (this.props.stepType == "SELECTGRAPHSTYLE"){
      option = " - Select Graph Style"
    }
    else{
      option = ""
    }
    this.setState({subtitle : option});
  }
  
  handleCloseClick = () => {
    closeWindow();
  };

  handleMinimizeClick = () => {
    const window = elecRemote.getCurrentWindow();
    window.minimize();
  }
  handleMaximizeClick = () => {
    const window = elecRemote.getCurrentWindow();

    if (!window.isMaximized()) {

      window.maximize();

    } else {

      window.unmaximize();

    }  }



  getOS = () => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }

    return os;
  };

  render() {
    let alignIcons = this.state.OS === 'Mac OS' ? 'macWizardIcons' : '';
    return (
      <>
        <div className="wizard-title-bar">
          <div className={`wizard-title ${alignIcons}`}>{this.props.title + this.state.subtitle}</div>
          <div className="title-bar-btns">
            {this.state.OS !== "Mac OS" && (
              <>
              <IconButton
                  alt="min-icon"
                  iconProps={{ iconName: "ChromeMinimize" }}
                  styles={wizardTitleBarButtonStyles}
                  onClick={this.handleMinimizeClick}
                />

             
                  <IconButton
                  alt="close-icon"
                  iconProps={{ iconName: "Stop" }}
                  styles={wizardTitleBarButtonStyles}
                  onClick={this.handleMaximizeClick}
                />
                   <IconButton
                  alt="close-icon"
                  iconProps={{ iconName: "ChromeClose" }}
                  styles={wizardTitleBarButtonStyles}
                  onClick={this.handleCloseClick}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isWizardOpen: state.instanceReducer.isWizardOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeSpreadsheet: bindActionCreators(storeSpreadsheetAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(WizardTitleBar);
