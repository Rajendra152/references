import {
  ActionButton,
  IContextualMenuProps,
  IIconProps,
  Dropdown,
  IconButton,
  Image,
  Label,
  IDropdownStyles,
  ComboBox,
  IComboBoxStyles,
  IComboBoxOption,
  IDropdownOption,
  IComboBoxProps,
} from "office-ui-fabric-react";
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from "@fluentui/react/lib/Tooltip";
import * as toolTipId from "./ToolTipIDs";
import { addClass } from "@syncfusion/ej2-base";
import React, { useState, useEffect, useRef } from "react";
import * as ConstantImage from "../../Constant/ConstantImage";
import * as ConstantFunc from "../../Constant/ConstantFunction";
import Bubble from "../../../utils/Bubble";
import { TeachingBubble } from "@fluentui/react/lib/TeachingBubble";
import { useBoolean } from "@uifabric/react-hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as notifyAction from "../../../store/Worksheet/notify/actions";
import * as findAction from "../../../store/Worksheet/Find/actions";
import * as replaceAction from "../../../store/Worksheet/Replace/actions";
import * as gotoAction from "../../../store/Worksheet/Goto/actions";
import * as sortAction from "../../../store/Worksheet/Sort/actions";
import * as insertAction from "../../../store/Worksheet/Insert/actions";
import * as deleteAction from "../../../store/Worksheet/Delete/actions";
import * as formatCellAction from "../../../store/Worksheet/FormatCell/actions";
import * as titlesAction from "../../../store/Worksheet/Titles/actions";
import * as graphicCellAction from "../../../store/Worksheet/GraphicCell/actions";
import * as importDBAction from "../../../store/Worksheet/ImportDB/actions";
import { DefaultButton, IButtonProps } from "@fluentui/react/lib/Button";
import {
  getRangeAddress,
  getRangeIndexes,
} from "@syncfusion/ej2-react-spreadsheet";
import * as importfileAction from "../../../store/Worksheet/FileImport/actions";
import { refreshWorksheetWithQuickTransforms } from "../../../utils/spreadsheet/spreadsheetUtility";
import { setOptions } from "./Options/OptionsService";
import * as optionsAction from "../../../store/MainWindow/Options/actions";
import { useTranslation } from "react-i18next";

//import { AlignTextLeft } from '../../Constant/ConstantImage';
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

import {
  getIndexesFromAddress,
  getCell,
} from "@syncfusion/ej2-react-spreadsheet";
//import { AlignTextLeft } from '../../Constant/ConstantImage';

const styles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};
const comboBoxStyles: Partial<IComboBoxStyles> = {
  root: {
    // width:'100px',
    height: '28px',
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },
  container: {
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },

  optionsContainerWrapper: {
    maxHeight: '300px',
    width: '126px'

  },
};
const comboBoxStylesFontSize: Partial<IComboBoxStyles> = {
  root: {
    //s  width:'100px',
    height: '28px',
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },
  // container:{
  //   border:'1px solid white',
  //   borderWidth:'none',
  //   borderStyle:'none'
  // },

  optionsContainerWrapper: {
    maxHeight: '300px',
    width: '103px'

  },
};

// const dropdownStyle: Partial<IDropdownStyles> = {
//   dropdown: {},
//   callout: { maxHeight: 250, overflowY: "auto" },

// };

const calloutProps = { gapSpace: 0 };

function WorkSheetHeader(props: { smartToggle: boolean }) {
  const { t } = useTranslation();
  const [bubbleObj, setBubbleObj] = useState({});
  const [freezePanes, setFreezePanes] = useState(false);
  const [autoComplete, allowFreeform] = useBoolean(true)
  const [
    teachingBubbleVisible,
    { toggle: toggleTeachingBubbleVisible },
  ] = useBoolean(false);
  const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
    () => ({
      children: "OK",
      onClick: toggleTeachingBubbleVisible,
    }),
    [toggleTeachingBubbleVisible]
  );
  const Cut: IIconProps = ConstantFunc.imageProp(ConstantImage.Cut, "menuIcon");
  const Copy: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Copy,
    "menuIcon"
  );
  const Clear: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Clear,
    "menuIcon"
  );
  const SelectAll: IIconProps = ConstantFunc.imageProp(
    ConstantImage.SelectAll,
    "menuIcon"
  );
  const Find: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Find,
    "menuIcon"
  );
  const Replace: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Replace,
    "menuIcon"
  );
  const GoTo: IIconProps = ConstantFunc.imageProp(
    ConstantImage.GoTo,
    "menuIcon"
  );

  const FontName: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontName,
    "menuIcon"
  );
  const FontSize: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontSize,
    "menuIcon"
  );
  const Bold: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Bold,
    "menuIcon"
  );
  const Italic: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Italic,
    "menuIcon"
  );
  const UnderLine: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Underline,
    "menuIcon"
  );
  const AlignTextLeft: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextLeft,
    "menuIcon"
  );
  const AlignTextCenter: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextCenter,
    "menuIcon"
  );
  const ALignTextRight: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextRight,
    "menuIcon"
  );
  const FontColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontColor,
    "menuIcon"
  );
  const FillColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FillColor,
    "menuIcon"
  );
  const TextWrap: IIconProps = ConstantFunc.imageProp(
    ConstantImage.TextWrap,
    "menuIcon"
  );

  const AlignVertical: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignBottomCell,
    "menuIcon"
  );

  const Border: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Border,
    "menuIcon"
  );

  const StrikeThrough: IIconProps = ConstantFunc.imageProp(
    ConstantImage.StrikeThrough,
    "menuIcon"
  );

  const Formulas: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Formulas,
    "menuIcon"
  );

  const ValidateData: IIconProps = ConstantFunc.imageProp(
    ConstantImage.ValidateData,
    "menuIcon"
  );

  const Refresh: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Refresh,
    "menuIcon"
  );

  const FormulaBar: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FormulaBar,
    "menuIcon"
  );

  const [fontWeight, setFontWeight] = useState("");
  const [fontStyle, setFontStyle] = useState("");
  const [textDecoration, setTextDecoration] = useState("");
  const [strikeThrough, setStrikeThrough] = useState("");
  const [fontS, setFontSize] = useState(8);
  const [fontColor, setFontColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);
  // let [previewIcon, setPreviewIcon] = useState('');
  // let [fontIcon, setFontIcon] = useState('');
  let showBackgroundColor = null;
  let showFontColor = null;

  const fontMapping: { [fontName: string]: string } = {
    ["Arial"]: '"Arial", "Arial_MSFontService", sans-serif',
    ["Arial Black"]: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ["Times New Roman"]:
      '"Times New Roman", "Times New Roman_MSFontService", serif',
    ["Comic Sans MS"]:
      '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ["Calibri"]: "Calibri, Calibri_MSFontService, sans-serif",
    ["Cambria"]: "Cambria, Cambria_MSFontService, sans-serif",
    ["Cambria Math"]: "Cambria Math, Cambria Math_MSFontService, sans-serif",
    ["Candara"]: "Candara, Candara_MSFontService, sans-serif",
    ["Courier New"]: "Courier New, Courier New_MSFontService, sans-serif",
    ["Axettac Demo"]: "Axettac Demo, Axettac Demo_MSFontService, sans-serif",
    ["Georgia"]: "Georgia, Georgia_MSFontService, sans-serif",
    ["Batang"]: "Batang, Batang_MSFontService, sans-serif",
    ["Roboto"]: "Roboto, Roboto_MSFontService, sans-serif",
    ["Tahoma"]: "Tahoma, Tahoma_MSFontService, sans-serif",
    ["Verdana"]: "Verdana, Verdana_MSFontService, sans-serif",
    ["Helvetica"]: "Helvetica, Helvetica_MSFontService, sans-serif",
    ["Book Antiqua"]: "Book Antiqua, Book Antiqua_MSFontService, sans-serif",
    ["Candara New"]: "Candara New, Candara New_MSFontService, sans-serif",
    ["Din Condensed"]: "Din Condensed, Din Condensed_MSFontService, sans-serif",
    ["Helvetica New"]: "Helvetica New, Helvetica New_MSFontService, sans-serif",
  };
  const fontSizeMapping: { [fontName: string]: string } = {
    ["8pt"]: '"8pt"',
    ["10pt"]: '"10pt"',
    ["12pt"]: '"12"',
    ["14pt"]: '"14pt"',
    ["16pt"]: '"16pt"',
    ["18pt"]: '"18pt"',
    ["20pt"]: '"20pt"',
    ["22pt"]: '"22pt"',
    ["24pt"]: '"24pt"',
    ["26pt"]: '"26pt"',
    ["28pt"]: '"28pt"',
    ["30pt"]: '"30pt"',
    ["32pt"]: '"32pt"',
    ["34pt"]: '"34pt"',
    ["36pt"]: '"36pt"',
    ["38pt"]: '"38pt"',
    ["40pt"]: '"40pt"',
    ["42pt"]: '"42pt"',
    ["44pt"]: '"44pt"',
    ["46pt"]: '"46pt"',
    ["48pt"]: '"48pt"',
    ["50pt"]: '"50pt"',
    ["52pt"]: '"52pt"',
    ["54pt"]: '"54pt"',
    ["56pt"]: '"56pt"',
    ["58pt"]: '"58pt"',
    ["60pt"]: '"60pt"',
    ["62pt"]: '"62pt"',
    ["64pt"]: '"64pt"',
    ["66pt"]: '"66pt"',
    ["68pt"]: '"68pt"',
    ["70pt"]: '"70pt"',
    ["72pt"]: '"72pt"',
    ["74pt"]: '"74pt"',
    ["76px"]: '"76px"',
  };
  const fonts = Object.keys(fontMapping);
  const fontSize = Object.keys(fontSizeMapping);
  const optionsWithFont: IComboBoxOption[] = fonts.map((fontName: string) => ({
    key: fontName,
    text: fontName,
    styles: {
      optionText: {
        fontFamily: fontMapping[fontName],
        overflow: 'visible',
        whiteSpace: 'normal',
      },
    },
  }));
  const optionsWithFontSize: IComboBoxOption[] = fontSize.map((fontName: string) => ({
    key: fontName,
    text: fontName,
    styles: {
      optionText: {
        fontFamily: fontMapping[fontName],
        overflow: 'visible',
        whiteSpace: 'normal',
      },
    },
  }));

  const [selectedFontKey, setSelectedFontKey] = React.useState<string | undefined>('');
  const [selectedFontSizeKey, setSelectedFontSizeKey] = React.useState<string | undefined>('');
  const _onChangeFont: IComboBoxProps['onChange'] = (event, option) => {
    console.log(event, option)
    setSelectedFontKey(option!.key as string);
    props.referenceObjectState.cellFormat({
      fontFamily: option!.key as string,
    });
    props.referenceObjectState.actionComplete();

  }
  const _onChangeFontSize: IComboBoxProps['onChange'] = (event, option) => {
    console.log(event, option)
    setSelectedFontSizeKey(option!.key as string);

    props.referenceObjectState.cellFormat({
      fontSize: option!.key as string,
    });
    props.referenceObjectState.actionComplete();

  }

  // const fontdd = fonts.map((fontName: string) => ({
  //   key: fontName,
  //   text: fontName,
  //   styles: {
  //     optionText: {
  //       fontFamily: fontMapping[fontName],
  //     },
  //   },
  // }));
  // console.log(fontdd)

  // const fontSize = [];
  // for (let i = 8; i < 74; i += 2) {
  //   fontSize.push({ key: String(`${i}pt`), text: String(i) });
  // }
  //console.log(fontSize)
  //For setting font size of the text
  // const _onChangeFontSize = (option: IDropdownOption, index?: number) => {
  //   console.log("Option contains now",index);
  //   // ReportInstance.documentEditor.selection.characterFormat.fontSize = index.key;
  //   props.referenceObjectState.cellFormat({
  //     fontSize: index.key,
  //   });
  //   setFontSize(option.key);

  //   setOptions("Worksheet.appearance.font.size", index.key, props);
  //   props.referenceObjectState.actionComplete();
  // };

  //For setting font style of the text
  // const _onChangeFont = (option: IDropdownOption, index?: number) => {
  //   //console.log('Option contains',option, index);
  //   console.log("Changing font name", option, index);
  //   //  ReportInstance.documentEditor.selection.characterFormat.fontFamily = index.key;
  //   // ReportInstance.documentEditor.selection.characterFormat.fontSize= index.key;
  //   props.referenceObjectState.cellFormat({
  //     fontFamily: index.key,
  //   });
  //   setFontSize(option.key);
  //  // setOptions("Worksheet.appearance.font.style", index.key, props);
  //   props.referenceObjectState.actionComplete();
  // };
  let colorRef;
  let colorRef1;
  let previewIcon;
  let fontIcon;
  const onCreated = () => {
    const elem = colorRef.element.nextElementSibling;
    console.log("previewIcon contains", elem);
    previewIcon = elem.querySelector(".e-selected-color");
    // setPreviewIcon(elem.querySelector('.e-selected-color'))
    addClass([previewIcon], "e-icons");
  };

const freezPane = (ev)=>{
  ev.preventDefault()
  setTimeout(()=>{
    if (!freezePanes) {
      var actCellIdx = getRangeIndexes(props.range.range);
      props.referenceObjectState.freezePanes(
        actCellIdx[0],
        actCellIdx[1]
      );
      setFreezePanes(true);
    } else {
      props.referenceObjectState.freezePanes(0, 0);
      setFreezePanes(false);
    }
  }, 300);

}
  
  const changeCellColor = (args) => {
    console.log("previewIcon contains", previewIcon);
    // previewIcon.style.borderBottomColor = args.currentValue.rgba;
    // fontIcon.style.borderBottomColor = args.currentValue.rgba;
    props.referenceObjectState.cellFormat(
      {
        backgroundColor: args.currentValue.hex,
      },
      range.range
    );
    props.referenceObjectState.actionComplete();
  };

  const created = () => {
    const elem = colorRef1.element.nextElementSibling;
    fontIcon = elem.querySelector(".e-selected-color");
    // setFontIcon(elem.querySelector('.e-selected-color'))
    console.log("fontIcon contains", fontIcon);
    addClass([fontIcon], "e-icons");
  };

  const changeCellColor1 = (args) => {
    fontIcon.style.borderBottomColor = args.currentValue.rgba;
  };

  // const displayBackgroundColor = () => {
  //   if (backgroundColor) {
  //     alert('Inside IF')
  //     showBackgroundColor = <ColorPickerComponent id='colorpicker' value='#ba68c8' change={(args) => changeCellColor(args)} cssClass="e-hide-value" showButtons={true}></ColorPickerComponent>
  //   }
  //   else {
  //     showBackgroundColor = null;
  //   }
  //  return (
  //     <ColorPickerComponent id='colorpicker' value='#ba68c8' change={(args) => changeCellColor(args)} cssClass="e-hide-value" showButtons={true}>

  //     </ColorPickerComponent>
  //   )
  // }

  // useEffect(() => {
  //   if (backgroundColor) {
  //         alert('Inside IF')
  //         showBackgroundColor = <ColorPickerComponent id='colorpicker' value='#ba68c8' change={(args) => changeCellColor(args)} cssClass="e-hide-value" showButtons={true}></ColorPickerComponent>
  //       }
  //       else {
  //         showBackgroundColor = null;
  //       }
  // },[])

  let range = props.range;

  const pasteDropDown: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "paste",
        text: "Paste",
        iconProps: ConstantFunc.imageProp(ConstantImage.Paste, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.paste();
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "transposePaste",
        text: "Transpose Paste",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.TransposePaste,
          "menuIcon"
        ),
      },
    ],
  };

  const colorPickerDropDown: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "fontColor",
        text: "Font Color",
        iconProps: ConstantFunc.imageProp(ConstantImage.FontColor, "menuIcon"),
        onClick: () => {
          <ColorPickerComponent
            id='colorpicker'
            value='#ba68c8'
            change={(args) => changeFontColor(args)}
            cssClass='e-hide-value'
            showButtons={true}></ColorPickerComponent>;
        },
      },
      {
        key: "fillColor",
        text: "Fill Color",
        iconProps: ConstantFunc.imageProp(ConstantImage.FillColor, "menuIcon"),
      },
    ],
  };

  const AlignHorizontalDropdown: IContextualMenuProps = {
    className: "dropDownList",
    items: [
      {
        key: "left",
        text: "Left",
        iconProps: ConstantFunc.imageProp(ConstantImage.AlignLeft, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { textAlign: "left" },
            range.range
          );
        },
      },
      {
        key: "center",
        text: "Center",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignMiddle,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { textAlign: "center" },
            range.range
          );
        },
      },
      {
        key: "right",
        text: "Right",
        iconProps: ConstantFunc.imageProp(ConstantImage.AlignRight, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { textAlign: "right" },
            range.range
          );
        },
      },
    ],
  };

  const AlignVerticalDropdown: IContextualMenuProps = {
    className: "dropDownList",
    items: [
      {
        key: "top",
        text: "Top",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignTopCell,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { verticalAlign: "top" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "center",
        text: "Center",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignMiddle,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { verticalAlign: "middle" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "bottom",
        text: "Bottom",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignBottomCell,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.cellFormat(
            { verticalAlign: "bottom" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
    ],
  };

  const BorderDropdown: IContextualMenuProps = {
    className: "dropDownList",
    items: [
      {
        key: "top",
        text: "Top",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignTopCell,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.setBorder(
            { borderTop: "3px solid #000000" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "left",
        text: "Left",
        iconProps: ConstantFunc.imageProp(ConstantImage.AlignLeft, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.setBorder(
            { borderLeft: "3px solid #000000" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "right",
        text: "Right",
        iconProps: ConstantFunc.imageProp(ConstantImage.AlignRight, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.setBorder(
            { borderRight: "3px solid #000000" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "bottom",
        text: "Bottom",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.AlignBottomCell,
          "menuIcon"
        ),
        onClick: () => {
          props.referenceObjectState.setBorder(
            { borderBottom: "3px solid #000000" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "none",
        text: "None",
        iconProps: ConstantFunc.imageProp(ConstantImage.Clear, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.cellFormat({ border: "" }, range.range);
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "all",
        text: "All",
        iconProps: ConstantFunc.imageProp(ConstantImage.Border, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.setBorder(
            { border: "3px solid #000000" },
            range.range
          );
          props.referenceObjectState.actionComplete();
        },
      },
    ],
  };

  // const onCreated = () => {
  //   const elem = colorRef.current.element.nextElementSibling;
  //   let previewIcon = elem.querySelector('.e-selected-color');
  //   addClass([previewIcon], 'e-icons');
  // };

  // const changeCellColor = (args) => {
  // if (props.pageInstance.selectedItems.nodes.length) {
  //   props.pageInstance.selectedItems.nodes[0].style.color = args.currentValue.hex
  // }
  //My own fill color function
  // const changeCellColor = (args) => {
  //   console.log('Color Picker contains', args);
  //   props.referenceObjectState.cellFormat(
  //     {
  //       backgroundColor: args.currentValue.hex,
  //     },
  //     range.range
  //   );
  //   props.referenceObjectState.actionComplete();
  // };

  //My own font color function
  const changeFontColor = (args) => {
    console.log("Color Picker contains", args);
    //previewIcon.style.borderBottomColor = args.currentValue.rgba;
    props.referenceObjectState.cellFormat(
      {
        color: args.currentValue.hex,
      },
      range.range
    );
    props.referenceObjectState.actionComplete();
  };
  function SelectAllCells() {
    var usedRowIdx = props.referenceObjectState.getActiveSheet().repo.rowIndex;
    var usedColIdx = props.referenceObjectState.getActiveSheet().usedRange
      .colIndex;
    props.referenceObjectState.selectRange(
      getRangeAddress([0, 0, usedRowIdx, usedColIdx])
    );
  }
  const showDlg = () => {
    props.actions.importDBAction.isOpenJDBCConn({ message: false });
    props.actions.importDBAction.isOpenImportDB({ message: false });
    props.actions.replaceAction.isOpenReplace({
      message: false,
    });
    props.actions.graphicCellAction.isOpenGraphicCell({
      message: false,
    });

    if (
      document.getElementsByClassName("e-control e-btn e-lib e-flat").length > 1
    ) {
      document
        .getElementsByClassName("e-control e-btn e-lib e-flat")[3]
        .click();
    }
    props.actions.formatCellAction.isOpenFormatCell({
      message: false,
    });

    if (props.referenceObjectState) {
      let param = props.referenceObjectState.sheets[0].activeCell;
      let selectedRange = props.referenceObjectState.sheets[0].selectedRange;
      const myArray = selectedRange.split(":");
      let startCell = myArray[0];
      let endCell = myArray[1]
      let rowIndex = props.referenceObjectState.getActiveSheet().usedRange.rowIndex
      console.log("param", selectedRange)
      if (param) {
        let startCellnum = startCell.replace(/[A-Za-z]/g, "");
        let endCellnum = endCell.replace(/[A-Za-z]/g, "");

        // if (param == "1" || param == 1) {
        //   // props.dialogInstance.show();
        // }

        if (startCell == endCell) {
          ConstantFunc.showMessageBox({
            message: "You must select the desired cells(consisting of at least two rows) before sorting",
            type: 'info',
            title: "Sort Selection",
          });
        }
        else if (startCellnum == endCellnum) {
          ConstantFunc.showMessageBox({
            message: "You must select the desired cells(consisting of at least two rows) before sorting",
            type: 'info',
            title: "Sort Selection",
          });
        }
        else {
          props.dialogInstance.show();
        }
      }
    } else {
      props.dialogInstance.show();
    }

    // props.dialogInstance.show()
  };

  const CutDropDown: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "cut",
        text: "Cut",
        iconProps: ConstantFunc.imageProp(ConstantImage.Cut, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.cut();
          props.referenceObjectState.actionComplete();
        },
      },
      {
        key: "clear",
        text: "Clear",
        iconProps: ConstantFunc.imageProp(ConstantImage.Clear, "menuIcon"),
        onClick: () => {
          props.referenceObjectState.clear({
            type: "Clear Contents",
            range: props.referenceObjectState.RangeAddress,
          });
          props.referenceObjectState.actionComplete();
        },
      },
    ]
  };

  const graphiccellDropdown: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "blue",
        text: "Blue",
        iconProps: ConstantFunc.imageProp(ConstantImage.ShiftRight, "menuIcon"),
        onClick: () => {
          props.actions.graphicCellAction.isOpenGraphicCell({
            message: "Blue",
          });
        },
      },
      {
        key: "red",
        text: "Red",
        iconProps: ConstantFunc.imageProp(ConstantImage.ShiftRight, "menuIcon"),
        onClick: () => {
          props.actions.graphicCellAction.isOpenGraphicCell({ message: "Red" });
        },
      },
      {
        key: "orange",
        text: "Orange",
        iconProps: ConstantFunc.imageProp(ConstantImage.ShiftRight, "menuIcon"),
        onClick: () => {
          props.actions.graphicCellAction.isOpenGraphicCell({
            message: "Orange",
          });
        },
      },
    ],
  };

  // const showDlg=() =>{
  //   let btn = document.getElementById(props.referenceObjectState.element.id + '_sorting');
  //   btn.click();
  //   btn.ej2_instances[0].dropDown.element
  //     .getElementsByClassName('e-sort-custom')[0]
  //     .parentElement.click();
  // }

  // const openBubble = (param) => {
  //   toggleTeachingBubbleVisible();
  //   setBubbleObj({
  //     id: param.id,
  //     title: param.title,
  //     message: param.message,
  //   });
  // };

  const openFileImport = () => {
    if (props.importfileState.isOpenImportfile) {
      props.actions.importfileAction.isOpenImportfile({ message: false });
    }
    props.actions.importfileAction.isOpenImportfile({ message: true });
  };

  const graphDropdownProps: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "JDBC",
        text: "Import Using JDBC",
        onClick: () => {
          props.actions.replaceAction.isOpenReplace({
            message: false,
          });
          props.actions.graphicCellAction.isOpenGraphicCell({
            message: false,
          });
          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
          props.dialogInstance.hide();
          if (
            document.getElementsByClassName("e-control e-btn e-lib e-flat")
              .length > 1
          ) {
            document
              .getElementsByClassName("e-control e-btn e-lib e-flat")[3]
              .click();
          }
          props.actions.importDBAction.isOpenImportDB({ message: false });
          if (props.importDBState.isOpenJDBCConn) {
            props.actions.importDBAction.isOpenJDBCConn({ message: false });
          }
          props.actions.importDBAction.isOpenJDBCConn({ message: true });
        },
      },
      {
        key: "ODBC",
        text: "Import Using ODBC",
        onClick: () => {
          props.actions.replaceAction.isOpenReplace({
            message: false,
          });
          props.actions.graphicCellAction.isOpenGraphicCell({
            message: false,
          });
          props.actions.formatCellAction.isOpenFormatCell({
            message: false,
          });
          props.dialogInstance.hide();
          if (
            document.getElementsByClassName("e-control e-btn e-lib e-flat")
              .length > 1
          ) {
            document
              .getElementsByClassName("e-control e-btn e-lib e-flat")[3]
              .click();
          }
          props.actions.importDBAction.isOpenJDBCConn({ message: false });
          if (props.importDBState.isOpenImportDB) {
            props.actions.importDBAction.isOpenImportDB({ message: false });
          }
          props.actions.importDBAction.isOpenImportDB({ message: true });
        },
      },
    ],
  };

  const freezePanel = () => {
    let data = getIndexesFromAddress(
      props.referenceObjectState.sheets[0].activeCell
    );
    if (Array.isArray(data) && freezeStatus == true) {
      setFreezeStatus(false);
      props.referenceObjectState.freezePanes(data[0], data[1], 0);
    } else {
      props.referenceObjectState.Unfreeze(
        props.referenceObjectState.sheets[0].name
      );
      setFreezeStatus(true);
    }
    // Unfreeze
  };

  const getCurrentValue = () => {
    let returnStr = "";
    returnStr =
      returnStr + !props.smartToggle
        ? "ribbon-gbutton"
        : "ribbon-gbutton sim-ribbon-gbutton";
    //  I need sometime Narayanan
    // let data = getIndexesFromAddress(props.referenceObjectState.sheets[0].selectedRange);
    // if(Array.isArray(data)){
    //   let value = getCell(data[0], data[1], props.referenceObjectState.getActiveSheet())
    //   console.log(value);
    //   if(!value){
    //     returnStr += ' disableListItem';
    //   }
    // }
    return returnStr;
  };
  console.log(props.notebookState);

  const isItemDisable = props.notebookState.allActiveItem.worksheet
    ? ""
    : "disableItem";

  const updateCollection = (type: string) => {
    let cell = props.referenceObjectState.getActiveSheet().activeCell;
    let cellIdx = getRangeIndexes(cell);
    if (type == 'fontWeight') {
      props.referenceObjectState.updateUndoRedoCollection({
        eventArgs: {
          style: { fontWeight: 'bold' },
          rowIdx: cellIdx[0],
          colIdx: cellIdx[1],
          action: 'format',
        },
      }); // To update the undo redo collection
    } else if (type == 'removeFontWeight') {
      props.referenceObjectState.updateUndoRedoCollection({
        eventArgs: {
          style: { fontWeight: 'normal' },
          rowIdx: cellIdx[0],
          colIdx: cellIdx[1],
          action: 'format',
        },
      });
    }
    else if (type == 'fontStyle') {
      props.referenceObjectState.updateUndoRedoCollection({
        eventArgs: {
          style: { fontStyle: 'italic' },
          rowIdx: cellIdx[0],
          colIdx: cellIdx[1],
          action: 'format',
        },
      }); // To update the undo redo collection
    }
    else if (type == 'removeFontStyle') {
      props.referenceObjectState.updateUndoRedoCollection({
        eventArgs: {
          style: { fontStyle: 'normal' },
          rowIdx: cellIdx[0],
          colIdx: cellIdx[1],
          action: 'format',
        },
      });
    }
    else if (type === 'underline') {
      props.referenceObjectState.updateUndoRedoCollection({
        eventArgs: {
          style: { textDecoration: 'underline' },
          rowIdx: cellIdx[0],
          colIdx: cellIdx[1],
          action: 'format',
        },
      });
    }
  }

  return (
    <div className='ms-Grid' dir='ltr'>
      {teachingBubbleVisible && (
        <TeachingBubble
          target={"#" + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline={bubbleObj.title}>
          {bubbleObj.message}
        </TeachingBubble>
      )}
      <div className='ms-Grid-row'>
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container'>
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-button"
              }>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }
                onClick={() => openFileImport()}>
                <TooltipHost
                  content={t(
                    "Import data into current worksheet or text into current report. The import starts at the current cursor position."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdData}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.FileImport}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    File
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                id='importDBID'
                // onClick={() =>
                //   openBubble({
                //     id: 'importDBID',
                //     title: 'Showcase Larger Data Sets',
                //     message:
                //       'Quickly create and deploy larger data sets using a multi-threaded application with enhanced 64-bit memory support.',
                //   })
                // }
                // onClick={() =>
                //   props.actions.importDBAction.isOpenImportDB({ message: true })
                // }
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton lastBox-btn ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }>
                <TooltipHost
                  content={t(
                    "Import database into the current worksheet. The import starts at the current cursor position."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdDataBase}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.FileImportDB}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    menuProps={graphDropdownProps}>
                    Database
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>Import</label>
          </div>


          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${isItemDisable}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${isItemDisable}`
              }>
              <div
                className={getCurrentValue()}
                onClick={() => {
                  props.referenceObjectState.paste();
                }}>
                <TooltipHost
                  content={t("Paste clipboard content into worksheet.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPaste}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <div>
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.Paste}
                    />
                    <ActionButton className='box-btn' allowDisabledFocus>
                      Paste
                    </ActionButton>
                  </div>
                </TooltipHost>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                <TooltipHost
                  content={t("Cut the selection and put it on clipboard.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdCut}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <div >
                    <ActionButton
                      iconProps={Cut}
                      onClick={() => props.referenceObjectState.cut()}>
                      Cut
                    </ActionButton>
                  </div>
                </TooltipHost>
                <TooltipHost
                  content={t("Copy the selection and put it on clipboard.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdCopy}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <div>
                    <ActionButton
                      iconProps={Copy}
                      onClick={() => props.referenceObjectState.copy()}>
                      Copy
                    </ActionButton>
                  </div>
                </TooltipHost>
                <TooltipHost
                  content={t("Remove the content of cells from worksheet.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdClear}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <div>
                    <ActionButton
                      iconProps={Clear}
                      onClick={() => {
                        props.referenceObjectState.clear({
                          type: "Clear Contents",
                          range: props.referenceObjectState.RangeAddress,
                        })
                        props.referenceObjectState.actionComplete();
                      }

                      }>
                      Clear
                    </ActionButton>
                  </div>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }
                onClick={
                  () => {
                    props.actions.formatCellAction.isOpenFormatCell({
                      message: false,
                    });
                    props.actions.graphicCellAction.isOpenGraphicCell({
                      message: false,
                    });

                    if (
                      document.getElementsByClassName(
                        "e-control e-btn e-lib e-flat"
                      ).length > 1
                    ) {
                      document
                        .getElementsByClassName(
                          "e-control e-btn e-lib e-flat"
                        )[3]
                        .click();
                    }

                    // document
                    //   .getElementsByClassName("e-control e-btn e-lib e-flat")
                    //   .click();
                    props.actions.replaceAction.isOpenReplace({
                      message: true,
                    });
                  }

                  // if (
                  //   props.actions.replaceAction.isOpenReplace({ message: true })
                  // ) {
                  //   props.actions.replaceAction.isOpenReplace({
                  //     message: false,
                  //   });
                  // } else {
                  //   props.actions.replaceAction.isOpenReplace({
                  //     message: true,
                  //   });
                  // }
                }>
                <TooltipHost
                  content={t("Find & Replace content in the worksheet.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdFind}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Find}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    Find
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton disableItem"
                    : "ribbon-gbutton sim-ribbon-gbutton disableItem"
                }
                onClick={() => showDlg()}>
                <TooltipHost
                  content={t(
                    "Arrange selected data in ascending or descending order using one or more key columns."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdSort}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <div>
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.Sort}
                    />
                    <ActionButton className='box-btn'>
                      Sort
                    </ActionButton>
                  </div>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }
                onClick={() => {
                  props.referenceObjectState.paste();
                }}>
                <TooltipHost
                  content={t("Enter column and row titles.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdColumnTitle}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.ColumnTitles}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    Column Titles
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>Edit</label>
          </div>
          <div className='ribbon-btn-box mrspace'>
            <div className='text-pannel'>
              <div>
                <div className='font-container' style={{ width: 'min-content' }}>
                  <div
                    className={
                      !props.smartToggle
                        ? `ribbon-grid-button graphTextDropDown ${isItemDisable}`
                        : `ribbon-grid-button sim-ribbon-grid-submenubutton ${isItemDisable}`
                    }
                  >
                    &nbsp;
                    <div
                      className='ribbon-dropdown graphpageOptionDropDown'
                      style={{ width: "55%" }}>
                      <div className='ribbon-dfield'>
                        <ComboBox
                          placeholder='Font'
                          // defaultSelectedKey='Arial'
                          selectedKey={selectedFontKey}
                          options={optionsWithFont}
                          allowFreeform
                          autoComplete='on'
                          //  key={'' + autoComplete + allowFreeform}
                          styles={comboBoxStyles}
                          onChange={_onChangeFont}
                        />
                      </div>
                    </div>
                    <div
                      className='ribbon-dropdown graphpageOptionDropDown'
                      style={{ width: "45%" }}>
                      <div className='ribbon-dfield'>
                        <ComboBox
                          placeholder='Font Size'
                          //defaultSelectedKey='8pt'
                          selectedKey={selectedFontSizeKey}
                          options={optionsWithFontSize}
                          allowFreeform
                          autoComplete='on'
                          //  key={'' + autoComplete + allowFreeform}
                          styles={comboBoxStylesFontSize}
                          onChange={_onChangeFontSize}
                        />


                      </div>
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "4px" }}
                    className={
                      !props.smartToggle
                        ? `ribbon-grid-button graphTextDropDown ${isItemDisable}`
                        : `ribbon-grid-button sim-ribbon-grid-submenubutton ${isItemDisable}`
                    }
                  >
                    <TooltipHost
                      content={t("Bold")}
                      closeDelay={100}
                      id={toolTipId.tooltipIdBold}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <IconButton
                        className='graphPage-icons'
                        iconProps={Bold}
                        onClick={() => {
                          let cell = props.referenceObjectState.getActiveSheet().activeCell;
                          let cellIdx = getRangeIndexes(cell);
                          let element = props.referenceObjectState.getCell(cellIdx[0], cellIdx[1]);
                          if (element.style.fontWeight === "bold") {
                            props.referenceObjectState.cellFormat(
                              { fontWeight: "" },
                              range.range
                            );
                            updateCollection('removeFontWeight');
                          }
                          else {
                            props.referenceObjectState.cellFormat(
                              { fontWeight: "Bold" },
                              range.range
                            );
                            updateCollection('fontWeight');
                          }

                          props.referenceObjectState.actionComplete();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Italic")}
                      closeDelay={100}
                      id={toolTipId.tooltipIdItalic}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <IconButton
                        className='graphPage-icons'
                        iconProps={Italic}
                        onClick={() => {
                          let cell = props.referenceObjectState.getActiveSheet().activeCell;
                          let cellIdx = getRangeIndexes(cell);
                          let element = props.referenceObjectState.getCell(cellIdx[0], cellIdx[1]);
                          if (element.style.fontStyle === "italic") {
                            props.referenceObjectState.cellFormat(
                              { fontStyle: "" },
                              range.range
                            );
                            updateCollection('removeFontStyle');
                          }
                          else {
                            props.referenceObjectState.cellFormat(
                              { fontStyle: "Italic" },
                              range.range
                            );
                            updateCollection('fontStyle');
                          }
                          props.referenceObjectState.actionComplete();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Underline")}
                      closeDelay={100}
                      id={toolTipId.tooltipIdUnderline}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <IconButton
                        className='graphPage-icons'
                        iconProps={UnderLine}
                        onClick={() => {
                          let cell = props.referenceObjectState.getActiveSheet().activeCell;
                          let cellIdx = getRangeIndexes(cell);
                          let element = props.referenceObjectState.getCell(cellIdx[0], cellIdx[1]);
                          if (element.style.textDecoration === "line-through") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "underline line-through" },
                              range.range
                            );
                            // updateCollection('underline')
                          } else if (element.style.textDecoration === "") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "underline" },
                              range.range
                            );
                          } else if (element.style.textDecoration === "underline line-through") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "line-through" },
                              range.range
                            );
                          } else if (element.style.textDecoration === "underline") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "" },
                              range.range
                            );
                          }
                          props.referenceObjectState.actionComplete();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Strike-through")}
                      closeDelay={100}
                      id={toolTipId.tooltipIdStrikeThrough}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <IconButton
                        className='graphPage-icons'
                        iconProps={StrikeThrough}
                        onClick={() => {
                          let cell = props.referenceObjectState.getActiveSheet().activeCell;
                          let cellIdx = getRangeIndexes(cell);
                          let element = props.referenceObjectState.getCell(cellIdx[0], cellIdx[1]);
                          if (element.style.textDecoration === "underline") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "underline line-through" },
                              range.range
                            );
                            updateCollection("line through")
                          } else if (element.style.textDecoration === "") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "line-through" },
                              range.range
                            );
                          } else if (element.style.textDecoration === "underline line-through") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "underline" },
                              range.range
                            );
                          } else if (element.style.textDecoration === "line-through") {
                            props.referenceObjectState.cellFormat(
                              { textDecoration: "" },
                              range.range
                            );
                          }
                          props.referenceObjectState.actionComplete();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t(
                        "Wrap extra long text into multiple lines so you can see it."
                      )}
                      closeDelay={100}
                      id={toolTipId.tooltipIdTextWrap}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <IconButton
                        className='graphPage-icons'
                        iconProps={TextWrap}
                        onClick={() => {
                          props.referenceObjectState.wrap(range.range, true);
                          props.referenceObjectState.actionComplete();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Font Color-Change the color of your text")}
                      closeDelay={100}
                      id={toolTipId.tooltipIdFontColor}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <ColorPickerComponent
                        id='color-picker1'
                        created={onCreated}
                        ref={(scope) => (colorRef = scope)}
                        change={(args) => changeFontColor(args)}
                        cssClass='e-hide-value'
                        showButtons={true}></ColorPickerComponent>
                    </TooltipHost>
                    <TooltipHost
                      content={t(
                        "Fill Color-Color the background of cells to make them stand out"
                      )}
                      closeDelay={100}
                      id={toolTipId.tooltipIdCellcolor}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}>
                      <ColorPickerComponent
                        id='color-picker2'
                        value='#ba68c8'
                        created={created}
                        ref={(scope) => (colorRef1 = scope)}
                        change={(args) => changeCellColor(args)}
                        cssClass='e-hide-value'
                        showButtons={true}
                      />
                    </TooltipHost>
                  </div>
                </div>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? "ribbon-grid-button graphTextProperties"
                    : "ribbon-grid-button sim-ribbon-grid-submenubutton "
                }
                style={{ marginLeft: "0px" }}>
                <div
                  className={`hor-button hr-btn-smallIcons ${isItemDisable}`}>
                  <TooltipHost
                    content={t("Align the cell content left, center or right.")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdAlignHorizontal}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      className='align-caret for-whiteSpace'
                      iconProps={AlignTextLeft}
                      menuProps={AlignHorizontalDropdown}>
                      Align&nbsp;Horizontal
                    </ActionButton>
                  </TooltipHost>
                  <TooltipHost
                    content={t("Align the cell content top, center or bottom.")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdAlignVertical}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      className='align-caret'
                      menuProps={AlignVerticalDropdown}
                      iconProps={AlignVertical}>
                      Align&nbsp;Vertical
                    </ActionButton>
                  </TooltipHost>
                  <TooltipHost
                    content={t("Add Borders to cells.")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdBorder}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      className='align-caret'
                      menuProps={BorderDropdown}
                      iconProps={Border}>
                      Borders
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div
                  onClick={() => {
                    props.actions.replaceAction.isOpenReplace({
                      message: false,
                    });
                    props.actions.graphicCellAction.isOpenGraphicCell({
                      message: false,
                    });
                    props.actions.formatCellAction.isOpenFormatCell({
                      message: true,
                    });
                    if (
                      document.getElementsByClassName(
                        "e-control e-btn e-lib e-flat"
                      ).length > 1
                    ) {
                      document
                        .getElementsByClassName(
                          "e-control e-btn e-lib e-flat"
                        )[3]
                        .click();
                    }
                  }}
                  className={
                    !props.smartToggle
                      ? `ribbon-gbutton ${isItemDisable}`
                      : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                  }>
                  <TooltipHost
                    content={t(
                      "Format worksheet cells, rows or columns for numeric, text, accounting or percentage values."
                    )}
                    closeDelay={100}
                    id={toolTipId.tooltipIdFormatCells}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.Cells}
                    />
                    <ActionButton className='box-btn' allowDisabledFocus>
                      Format
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div
                  className={
                    !props.smartToggle
                      ? `ribbon-gbutton ${isItemDisable}`
                      : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                  }
                  onClick={() => {
                    props.actions.replaceAction.isOpenReplace({
                      message: false,
                    });
                    props.actions.formatCellAction.isOpenFormatCell({
                      message: false,
                    });
                    console.log(
                      document.getElementsByClassName(
                        "e-control e-btn e-lib e-flat"
                      )
                    );
                    if (
                      document.getElementsByClassName(
                        "e-control e-btn e-lib e-flat"
                      ).length > 1
                    ) {
                      document
                        .getElementsByClassName(
                          "e-control e-btn e-lib e-flat"
                        )[3]
                        .click();
                    }
                    props.actions.graphicCellAction.isOpenGraphicCell({
                      message: true,
                    });
                  }}>
                  <TooltipHost
                    content={t(
                      "Insert a graph object property into worksheet."
                    )}
                    closeDelay={100}
                    id={toolTipId.tooltipIdGraphicCells}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.GraphicCells}
                    />
                    <ActionButton
                      className='box-btn'
                      allowDisabledFocus
                    // menuProps={graphiccellDropdown}
                    >
                      Graphic Cells
                    </ActionButton>
                  </TooltipHost>
                </div>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>Cells </label>
          </div>
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button refresh-div"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton refresh-div"
              }>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton lastBox-btn ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }
                onClick={() => {
                  props.actions.importDBAction.isOpenJDBCConn({ message: false });
                  props.actions.importDBAction.isOpenImportDB({ message: false });
                  props.actions.replaceAction.isOpenReplace({
                    message: false,
                  });
                  props.actions.graphicCellAction.isOpenGraphicCell({
                    message: false,
                  });
                  props.actions.formatCellAction.isOpenFormatCell({
                    message: false,
                  });
                  props.actions.importDBAction.isOpenJDBCConn({
                    message: false,
                  });
                  props.dialogInstance.hide();
                  document
                    .getElementsByClassName("e-insert-function")[0]
                    .click();
                }}>
                <TooltipHost
                  content={t("Work with the formula in current cell.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdFormula}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Formulas}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    Formulas
                  </ActionButton>
                </TooltipHost>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                {/* <ActionButton
                  iconProps={ValidateData}
                  onClick={() => {
                    let btn = document.getElementsByClassName(
                      'e-datavalidation-ddb'
                    )[0];
                    console.log('btn contains',btn);
                    btn.click();
                    let datavalidation =
                      btn.ej2_instances[0].dropDown.element.getElementsByClassName(
                        'e-item'
                      )[0];

                    datavalidation.click();
                  }}
                >
                  Data&nbsp;Validation
                </ActionButton> */}
                <div className={`${isItemDisable}`}>
                  <TooltipHost
                    content={t("Recalculate Quick Transforms.")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdRefresh}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Refresh}
                      onClick={() =>
                        refreshWorksheetWithQuickTransforms(props)
                      }>
                      Refresh
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isItemDisable}`}>
                  <TooltipHost
                    content={t("Show/Hide the formula bar.")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdFormulaBar}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <div className={`${isItemDisable}`}>
                      <ActionButton
                        iconProps={FormulaBar}
                        onClick={() =>
                        (props.referenceObjectState.showFormulaBar = !props
                          .referenceObjectState.showFormulaBar)
                        }>
                        Formula&nbsp;Bar
                      </ActionButton>
                    </div>
                  </TooltipHost>
                </div>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>Calculation</label>
          </div>

          <div className='ribbon-btn-box'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton"
              }>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isItemDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isItemDisable}`
                }>
                <TooltipHost
                  content={t(
                    "Keep a portion of the worksheet visible while the remaining position scrolls."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.FreezePanes}
                  />
                  <ActionButton
                  id="freezepanes"
                    onClick={(ev) => {
                      freezPane(ev)
                      //props.referenceObjectState.freezePanes(3, 4, 0);
                      // var col_collection = props.referenceObjectState.getActiveSheet().usedRange.colIndex;
                      // var header_collection = props.referenceObjectState.element.getElementsByClassName('e-header-cell');
                      // for (let i = 0; i < col_collection + 1; i++) {
                      //   header_collection[i].innerText = 'Col ' + header_collection[i].innerText;
                      // }
                   
                    }}
                    onDoubleClick={(ev) => ev.preventDefault()}

                    className='box-btn'
                    allowDisabledFocus>
                    Freeze Panes
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>View</label>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  // console.log('So range in worksheet is', state.instanceReducer.range);
  return {
    optionsState: state.optionsReducer,
    isOpenFind: state.findReducer.isOpenFind,
    isOpenReplace: state.replaceReducer.isOpenReplssace,
    isOpenGoto: state.gotoReducer.isOpenGoto,
    isOpenSort: state.sortReducer.isOpenSort,
    insertState: state.insertReducer,
    deleteState: state.deleteReducer,
    formatCellState: state.formatCellReducer,
    titlesState: state.titlesReducer,
    graphicCellState: state.graphicCellReducer,
    importDBState: state.importDBReducer,
    referenceObjectState: state.instanceReducer.instance,
    dialogInstance: state.instanceReducer.dialogInstance,
    importfileState: state.ImportfileReducer,
    range: state.instanceReducer.range,
    notebookState: state.notebookReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      findAction: bindActionCreators(findAction, dispatch),
      replaceAction: bindActionCreators(replaceAction, dispatch),
      gotoAction: bindActionCreators(gotoAction, dispatch),
      sortAction: bindActionCreators(sortAction, dispatch),
      insertAction: bindActionCreators(insertAction, dispatch),
      deleteAction: bindActionCreators(deleteAction, dispatch),
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
      titlesAction: bindActionCreators(titlesAction, dispatch),
      graphicCellAction: bindActionCreators(graphicCellAction, dispatch),
      importDBAction: bindActionCreators(importDBAction, dispatch),
      importfileAction: bindActionCreators(importfileAction, dispatch),
    },
    optionsAction: bindActionCreators(optionsAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkSheetHeader);
