import React, { Component } from 'react';

import { IconButton, CommandBar } from 'office-ui-fabric-react';
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
// import styles from './Home.css';
import WorkSheetHeader from './NavBarRibbon/WorkSheetMenu';
import CreateGraph from './NavBarRibbon/CreateGraphMenu';
import GraphPage from './NavBarRibbon/GraphPageMenu';
import Analysis from './NavBarRibbon/AnalysisMenu';
import Report from './NavBarRibbon/ReportMenu';
import ToolBox from './NavBarRibbon/ToolBoxMenu';
import './ThemeScss/lightribbonstyle.scss';
import MainMenu from './NavBarRibbon/MainMenu';
import HomeMenu from './NavBarRibbon/HomeMenu';
import Help from './NavBarRibbon/HelpMenu';
import { SigmaAppIcon } from '../Constant/ConstantImage';
import TitleBar from './TitleBar';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
class Header extends Component {
  ribbonPivot: IRefObject;
  keys: { tab: boolean; arrowRight: boolean; arrowLeft: boolean };

  constructor(props) {
    super(props);
    this.state = {
      isScroll: '',
      sideMenuPanel: '',
      toggleRibbon: false,
      simplyfyRibbon: false,
      noteBookpanel: false,
      toggleOpen: true,
      selectedNavKey: '0',
    };
    this.keys = {
      tab: false,
      arrowRight: false,
      arrowLeft: false,
    };
  }
  ToggleRibbon = () => {
    this.setState({
      toggleRibbon: !this.state.toggleRibbon,
    });
  };
  SimplyfyRibbon = () => {
    this.setState({
      simplyfyRibbon: !this.state.simplyfyRibbon,
    });
  };
  toggleNotebook = () => {
    this.setState({
      toggleOpen: !this.state.toggleOpen,
    });
  };
  noteBookpanelClose = () => {
    this.setState({
      noteBookpanel: false,
    });
  };

  noteBookpanelOpen = () => {
    this.setState({
      noteBookpanel: true,
    });
  };
  handleLinkClick = (item: PivotItem) => {
    this.setState({ selectedNavKey: item.props.itemKey });
  };
  componentDidMount() {
    let _this = this;
    window.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          _this.keys['arrowLeft'] = true;
          break;
        case 'Tab':
          _this.keys['tab'] = true;
          break;
        case 'ArrowRight':
          _this.keys['arrowRight'] = true;
          break;
      }
      if (_this.keys['tab'] && _this.keys['arrowRight']) {
        _this.setState((prevState) => {
          return { selectedNavKey: (prevState.selectedNavKey + 1) % 7 };
        });
      }
      if (_this.keys['tab'] && _this.keys['arrowLeft']) {
        _this.setState((prevState) => {
          return { selectedNavKey: (prevState.selectedNavKey + 6) % 7 };
        });
      }
    });
    window.addEventListener('keyup', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          _this.keys['arrowLeft'] = false;
          break;
        case 'Tab':
          _this.keys['tab'] = false;
          break;
        case 'ArrowRight':
          _this.keys['arrowRight'] = false;
          break;
      }
    });
  }

  render() {
    const {
      toggleRibbon,
      simplyfyRibbon,
      selectedNavKey,
      noteBookpanel,
      toggleOpen,
    } = this.state;
    const chevDown = { iconName: 'ChevronDownMed' };
    const chevUp = { iconName: 'ChevronUpMed' };
    const commandBaritems = [
      {
        key: 'menu',
        text: '',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        iconProps: { iconName: 'WaffleOffice365' },
        onClick: () => {
          this.setState({
            noteBookpanel: !this.state.noteBookpanel,
          });
        },
      },
    ];
    return (
      <>
        <TitleBar />
        {!noteBookpanel ? (
          ''
        ) : (
          <MainMenu
            noteBookpanelClose={this.noteBookpanelClose}
            toggleOpen={toggleOpen}
            noteBookpanel={noteBookpanel}
          />
        )}
        {/* <div className="title-items">
          <CommandBar
            className="titleBar"
            items={commandBaritems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <button onClick={commandBaritems[0].onClick}><img src={SigmaAppIcon} alt=""/></button>
        </div> */}
        <div className="ribbon-tab">
          <div
            className="file-menu-label"
            onClick={() => {
              this.noteBookpanelOpen();
            }}
            style={{ zIndex: 1 }}
          >
            File
          </div>
          {/* <div className="ribbon-toggle">
            <div className="smart-toggle">
              <Toggle label="Smart Menu" onChange={this.SimplyfyRibbon} />
            </div>
            <IconButton iconProps={!toggleRibbon ? chevUp : chevDown} onClick={this.ToggleRibbon} />
          </div> */}
          {/* <Pivot className={`${styles.pivotControl} custom-pivot`} */}

          <Pivot
            className={`custom-pivot`}
            aria-label="Large Link Size Pivot Example"
            linkSize={PivotLinkSize.large}
            componentRef={(obj) => (this.ribbonPivot = obj)}
            selectedKey={String(selectedNavKey)}
            onLinkClick={this.handleLinkClick}
          >
            <PivotItem headerText="Home" itemKey= "0">
              {!toggleRibbon ? (
                <HomeMenu smartToggle={simplyfyRibbon} />
              ) : (
                ''
              )}
            </PivotItem>
            <PivotItem headerText="Worksheet"  itemKey= "1">
              {!toggleRibbon ? (
                <WorkSheetHeader smartToggle={simplyfyRibbon} />
              ) : (
                ''
              )}
            </PivotItem>
            <PivotItem headerText="Create Graph"  itemKey= "2">
              {!toggleRibbon ? (
                <CreateGraph smartToggle={simplyfyRibbon} />
              ) : (
                ''
              )}
            </PivotItem>
            <PivotItem headerText="Graph Page"  itemKey= "3">
              {!toggleRibbon ? <GraphPage smartToggle={simplyfyRibbon} /> : ''}
            </PivotItem>
            <PivotItem headerText="Analysis"  itemKey= "4">
              {!toggleRibbon ? <Analysis smartToggle={simplyfyRibbon} /> : ''}
            </PivotItem>
            <PivotItem headerText="Report"  itemKey= "5">
              {!toggleRibbon ? <Report smartToggle={simplyfyRibbon} /> : ''}
            </PivotItem>
            <PivotItem headerText="Help"  itemKey= "6">
              {!toggleRibbon ? <Help smartToggle={simplyfyRibbon} /> : ''}
            </PivotItem>
            {/* <PivotItem headerText="ToolBox">
              {!toggleRibbon ?
                <ToolBox /> : ""}
            </PivotItem> */}
          </Pivot>
        </div>
      </>
    );
  }
}
export default Header;
