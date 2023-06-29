import React, { useState, useEffect } from 'react';
import {
  IStackTokens,
} from '@fluentui/react';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import { color, Symbol } from './ColorConst';
import { Line } from './LineConst';
import { SHAPE } from './Shape';
import { Pattern } from './Pattern';
import * as graphicCellAction from '../../../store/Worksheet/GraphicCell/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DefaultButton } from 'office-ui-fabric-react';
import { CustomColorPicker } from "./CustomColorPicker";
import ModalCompontent from './../../RibbonMenu/NavBarRibbon/ModalCompontent/Modal/ModalCompontent';
import BottomSection from './../../RibbonMenu/NavBarRibbon/ModalCompontent/Compontent/BottomSection';
import * as actionCreators from '../../../store/Helpmenu/actions';
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const GraphicCell: React.FunctionComponent = (props) => {
    const [listOfColor, setListOfColor] = useState(color);
    const [listOfLine, setListOfLine] = useState(Line);
    // const [listOfSymbol, setListOfSymbol] = useState(Symbol);
    const [listOfShape, setListOfShape] = useState(SHAPE);
    const [listOfPattern, setListOfPattern] = useState(Pattern);
    const [customColorPic, setCustomColorPic] = useState(false)
    const [colorCode, setColorCode] = useState({})

    const setShape = (item) =>{
      console.log(item);
      if(item.hasOwnProperty("custom")){
        if(item.custom==true){
          setCustomColorPic(true);
        }
      }else{
        props.actions.graphicCellAction.GraphicCellUpdate({ message: item });
      }
      // props.actions.graphicCellAction.GraphicCellUpdate({ message: item });
      // props.actions.graphicCellAction.isOpenGraphicCell({ message: false });
    }

    const updateColor = (color) =>{
      let colorCode =  '@rgb('+color.r+','+color.g+','+color.b+')';
      let backgroundColor = 'rgb('+color.r+','+color.g+','+color.b+')';
      let item = {value: colorCode,  backgroundColor: backgroundColor, text: 'Custom', custom: true};
      setColorCode(item);
      // props.actions.graphicCellAction.GraphicCellUpdate({ message: item });
    }

    const getSelectedItem = (
      item?: PivotItem,
      ev?: React.MouseEvent<HTMLElement>
    ) => {
      if(item.props.headerText == "Color"){
        help('wbasics','insert_graphic_cells__colors','')
  
      }
      else if(item.props.headerText == "Line"){
        help('wbasics','insert_graphic_cells__lines','')
  
      }
      else if(item.props.headerText == "Symbol Shapes"){
        help('wbasics','insert_graphic_cells__symbol_shapes','')
  
      }
      else if(item.props.headerText == "Patterns"){
        help('wbasics','insert_graphic_cells__patterns','')
  
      }
    };
    const help = (a:string,b:string,c:string)=>{
      props.OpenHelpWindow(a,b,c)
    }
    useEffect(()=>{
      help('wbasics','insert_graphic_cells__colors','')
    },[])

    const Oksubmit = () =>{
      setCustomColorPic(false);
      setTimeout(()=>{
        let colorCodeList = [...listOfColor];
        // colorCodeList.push(colorCode)
        colorCodeList[colorCodeList.length - 1] = colorCode;
        setListOfColor(colorCodeList);
        props.actions.graphicCellAction.GraphicCellUpdate({ message: colorCode });
      },1000)      
      // props.actions.graphicCellAction.GraphicCellUpdate({ message: item });
    }
  return (
    <Pivot aria-label="Basic Pivot Example"
    onLinkClick={getSelectedItem}
    >
      <PivotItem
        headerText="Color"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Stack horizontal className={`flex-container  p-1 mb-2`} style={{backgroundColor:"lightgray"}}>
            <Stack className={`w-100`}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg10 br-1"  style={{padding:"5px",backgroundColor:"white"}}>
                      {listOfColor.map(a=>
                              <>
                              <div className="ms-Grid-col ms-lg4 cursur-pointer" onClick={()=>setShape(a)}>
                                  <div className={`d-flex`}>
                                      <div className="bgcolor" style={{backgroundColor: a.backgroundColor}}></div>
                                      <div className="textinfo">{a.text}</div>
                                  </div>
                              </div>
                              </>
                          )}
                    </div>
                    <div className="ms-Grid-col ms-lg2 text-center text-graphic">
                    Single-click to insert into selected cell
                    </div>
                    </div>
                </div>
                {customColorPic && (
                    <ModalCompontent
                      close={() => setCustomColorPic(false)}
                      component={
                        <>
                      <Stack horizontal className={`flex-container br-1 p-1`}>
                      <Stack horizontal className={'mb-1 p-0'}  tokens={stackTokens} styles={stackStyles}>
                          <CustomColorPicker updateColor={updateColor}/>
                        </Stack>
                        <Stack horizontal className={'mb-1 p-0'} tokens={stackTokens} styles={stackStyles}>
                          <BottomSection type={'2'} component={<>
                            <DefaultButton className={'black'} text="Ok" allowDisabledFocus onClick={()=>Oksubmit()}/>
                            <DefaultButton className={'black ml-2'} text="Close" onClick={() => setCustomColorPic(false)} allowDisabledFocus />
                          </>} />
                        </Stack>
                      </Stack>
                      </>
                      }
                      title={`${
                        'Color Picker'
                      }`}
                      className={'z_index_100'}
                    ></ModalCompontent>
                  )}
                {/* {customColorPic&&<>
                  <CustomColorPicker />
                </>} */}
            </Stack>
        </Stack>
      </PivotItem>
      <PivotItem headerText="Line">
      <Stack horizontal className={`flex-container p-1 mb-2`} style={{backgroundColor:"lightgray"}}>
            <Stack className={`w-100`}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg10 lineoflist br-1" style={{backgroundColor:"white"}}>
                      {listOfLine.map(a=>
                              <>
                              <div className="ms-Grid-col ms-lg4 cursur-pointer" onClick={()=>setShape(a)}>
                                  <div className={`d-flex`}>
                                      <div className="bgline">{a.lineSymbol}</div>
                                      <div className="textinfo" style={{textTransform: 'capitalize'}}>{a.text}</div>
                                  </div>
                              </div>
                              </>
                          )}
                    </div>
                    <div className="ms-Grid-col ms-lg2 text-center text-graphic">
                      Single-click to insert into selected cell
                    </div>
                    </div>
                </div>
            </Stack>
        </Stack>
      </PivotItem>
      <PivotItem headerText="Symbol Shapes">
        {/* <Label styles={labelStyles}></Label> */}
        <Stack horizontal className={`flex-container  p-1 mb-2`} style={{backgroundColor:"lightgray"}}>
            <Stack className={`w-100`}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg10 br-1" style={{backgroundColor:"white"}}>
                      {listOfShape.map(a=>
                              <>
                              <div className="ms-Grid-col ms-lg4 cursur-pointer" onClick={()=>setShape(a)}>
                                  <div className={`d-flex`}>
                                      <div className="bgline">{a.shapeSymbol}</div>
                                      <div className="textinfo">{a.text}</div>
                                  </div>
                              </div>
                              </>
                          )}
                    </div>
                    <div className="ms-Grid-col ms-lg2 text-center text-graphic">
                    Single-click to insert into selected cell
                    </div>
                    </div>
                </div>
            </Stack>
        </Stack>
      </PivotItem>
      <PivotItem headerText="Patterns">
      <Stack horizontal className={`flex-container p-1 mb-2`} style={{backgroundColor:"lightgray"}}>
            <Stack className={`w-100`}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg10 br-1" style={{backgroundColor:"white"}}>
                      {listOfPattern.map(a=>
                              <>
                              <div className="ms-Grid-col ms-lg4 cursur-pointer" onClick={()=>setShape(a)}>
                                  <div className={`d-flex`}>
                                      <div className="bgline">{a.patternSymbol}</div>
                                      <div className="textinfo">{a.text}</div>
                                  </div>
                              </div>
                              </>
                          )}
                    </div>
                    <div className="ms-Grid-col ms-lg2 text-center text-graphic">
                    Single-click to insert into selected cell
                    </div>
                    </div>
                </div>
            </Stack>
        </Stack>
      </PivotItem>
      <DefaultButton onClick={()=> props.actions.graphicCellAction.isOpenGraphicCell({ message: false })}>Close</DefaultButton>
    </Pivot>
  );
};


function mapStateToProps(state) {
  return {
    graphicCellState: state.graphicCellReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem))
,
    actions: {
      graphicCellAction: bindActionCreators(graphicCellAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphicCell);
