import React, { Component } from "react";
import { ActionButton, DefaultButton, IButtonStyles, IconButton } from "office-ui-fabric-react";
import { Slider } from "office-ui-fabric-react/lib/Slider";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setZoomActionType,
  setPageMovement,
} from "../../store/CreateGraph/CreateDiagramPage/actions";

import { isStatusbarDisplay } from "../../store/MainWindow/actions";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerAction: [
        //     {
        //     index: '1',
        //     buttonText: 'OVR',
        //     onClick: ''
        // },
        // {
        //     index: '2',
        //     buttonText: 'REC',
        //     onClick: ''
        // },
        {
          index: "3",
          buttonText: "INS",
          onClick: "",
        },
        {
          index: "4",
          buttonText: "AUTO",
          onClick: "",
        },
        // {
        //     index: '5',
        //     buttonText: 'CAP',
        //     onClick: ''
        // },
        // {
        //     index: '6',
        //     buttonText: 'NUM',
        //     onClick: ''
        // },
        // {
        //     index: '7',
        //     buttonText: 'SCRL',
        //     onClick: ''
        // }
      ],
      zoomValue: 50,
      handClicked: false,
    };
  }

  sliderAriaValueText = (value: number) => `${value} percent`;
  sliderValueFormat = (value: number) => `${value}%`;

  sliderOnChange = (value: number) => {
    console.log(value)
    console.log(this.props.pageInstance)

    if(this.props.zoomPageType == ""){
      let zoomType = this.state.zoomValue < value ? "ZoomIn" : "ZoomOut";
      // let zoomValue = { type: zoomType, zoomFactor: value };
      // this.props.pageInstance.zoomTo(zoomValue);
      if(zoomType === 'ZoomIn' && this.state.zoomValue < 100 && this.state.zoomValue > 10){
        this.props.actions.setZoomAction("Zoom In")
      } else if(zoomType === 'ZoomOut' && this.state.zoomValue < 100 && this.state.zoomValue > 10){
        this.props.actions.setZoomAction("Zoom Out")
      }
      else{
        this.setState({ zoomValue: value });
      }
    }
    this.setState({ zoomValue: value });
  };

  render() {
    const { footerAction } = this.state;
    const panIcon = { iconName: "HandsFree" };
    const zoomIcon = { iconName: "Zoom" };
    const cplusIcon = { iconName: "CirclePlus" };
    const scminusIcon = { iconName: "SkypeCircleMinus" };

    const footerActionbtn = footerAction.map((fooact) => {
      return (
        <ActionButton className='text-btn' allowDisabledFocus>
          {fooact.buttonText}
        </ActionButton>
      );
    });

    let footerClass = this.props.isStatusbarDisplayState
      ? "footer-bar"
      : "footer-bar footer-hide";
    let showZoomIcons =
      this.props.allActiveItem.graphPage &&
      this.props.allActiveItem.graphPage.id
        ? "flex"
        : "none";
    return (
      <>
        <div className={footerClass} >
          <div className='button-grp' style={{display:'flex'}}>{footerActionbtn}</div>
          <div className='content-position'  style={{ display: showZoomIcons }}>
            <div className='cp-label'>Position</div>
            <div className='cp-cordinate'>
              <span className='cor-label-x'>X :</span> {this.props.pageCoordinates.x}{" "}
            </div>
            <div className='cp-cordinate'>
              <span className='cor-label-y'>Y :</span> {this.props.pageCoordinates.y}{" "}
            </div>
          </div>
          {/* <div className='content-coordinates ml-l'>
            <div className='cc-content'>
              <span className='cc-label-x'>X:</span> 114.25{", "}
              <span className='cc-label-y'>Y:</span> 155.91{" "}
            </div>
          </div>
           */}
          { this.props.spreadSheet.showCalculations &&
            (
            <div className="sheet-calculations" >
              <div className="cc-content" style={{display:'flex'}}>
                <span className="cc-label-x">Min: </span> {this.props.spreadSheet.min + ', '}
              </div>
              <div className="cc-content" style={{display:'flex'}}>
                <span className="cc-label-y">Max: </span> {this.props.spreadSheet.max + ', '}
              </div>
              <div className="cc-content" style={{display:'flex'}}>
                <span className="cc-label-x">Sum: </span> {this.props.spreadSheet.sum + ', '}
              </div>
              <div className="cc-content" style={{display:'flex'}}>
                <span className="cc-label-y">Average: </span> {this.props.spreadSheet.average + ' '}
              </div>
            </div>
            )
          }

          
          <div className='icon-grp'  style={{ display: showZoomIcons }}>
            <IconButton
              className="box-btn minusplus-btn-align" 
              iconProps={panIcon}
              onClick={() => {
                console.log(this.state.handClicked, "handClicked")
                const value = this.props.setZoomTool == true ? false : true;
                this.props.actions.setPageMovement(value);
                this.setState((prevState)=>{return {handClicked: !prevState.handClicked}})
              }}
              checked = {this.state.handClicked}
              // styles = {this.state.handClicked ? {root: {color: 'red'}} : {root: {color: 'green'}}}
              styles = {{root:{color: 'black'},rootChecked:{color: '#00a3e1'}, rootHovered:{color: '#00a3e1'}}}
              allowDisabledFocus
            />
            <ActionButton
              className='box-btn minusplus-btn-align'
              allowDisabledFocus>
              {this.state.zoomValue} %
            </ActionButton>
            <ActionButton
              className='minus-btn minusplus-btn-align'
              iconProps={scminusIcon}
              name='Zoom Out'
              onClick={() => {
                if(this.state.zoomValue <= 100 && this.state.zoomValue > 10){
                  this.props.actions.setZoomAction("Zoom Out")
                  this.setState({ zoomValue: this.state.zoomValue  - 5 });
                }}
              }
              allowDisabledFocus
            />

            <Slider
              max={100}
              min={10}
              step={5}
              value={this.state.zoomValue}
              showValue={false}
              ariaValueText={this.sliderAriaValueText}
              valueFormat={this.sliderValueFormat}
              onChange={this.sliderOnChange}
              
            />
            <ActionButton
              className='plus-btn minusplus-btn-align'
              iconProps={cplusIcon}
              name='Zoom In'
              onClick={() => {
                if(this.state.zoomValue < 100 && this.state.zoomValue >= 10){
                this.props.actions.setZoomAction("Zoom In")
                this.setState({ zoomValue: this.state.zoomValue  + 5 });
                }
                }
              }
              allowDisabledFocus
            />
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isStatusbarDisplayState: state.mainWindowReducer.isStatusbarDisplay,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    zoomPageType: state.createDiagramPageReducer.zoomType,
    setZoomTool: state.createDiagramPageReducer.enablePageMovement,
    allActiveItem: state.notebookReducer.allActiveItem,
    spreadSheet: state.instanceReducer,
    pageCoordinates : state.createDiagramPageReducer.pageCoordinates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      isStatusbarDisplay: bindActionCreators(isStatusbarDisplay, dispatch),
      setZoomAction: bindActionCreators(setZoomActionType, dispatch),
      setPageMovement: bindActionCreators(setPageMovement, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
