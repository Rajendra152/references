import {
  ActionButton,
  Dropdown,
  IconButton,
  IContextualMenuProps,
  IIconProps,
  Image,
  IDropdownOption,
} from "office-ui-fabric-react";
import {
  Stack,
  IStackProps,
  IStackStyles,
} from "office-ui-fabric-react/lib/Stack";
import { useBoolean } from "@uifabric/react-hooks";
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from "@fluentui/react/lib/Tooltip";
import * as toolTipId from "./ToolTipIDs";
import React, { useState, useEffect } from "react";
import process from 'process';
import * as ConstantImage from "../../Constant/ConstantImage";
import * as ConstantFunc from "../../Constant/ConstantFunction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as findAction from "../../../store/Worksheet/Find/actions";
import * as replaceAction from "../../../store/Worksheet/Replace/actions";
import * as colorAction from "../../../store/Report/actions";
import { post } from "./../../../services/DataService";
import {
  getDataSetByKey,
  createNewClient,
} from "../../../services/RedisServices";

import * as gotoAction from "../../../store/Worksheet/Goto/actions";

//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';

import { reportImport } from "../../App/Config";
//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';

import { DefaultButton, IButtonProps } from "@fluentui/react/lib/Button";

import { useTranslation } from "react-i18next";

const styles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

const calloutProps = { gapSpace: 0 };
function Report(props: { smartToggle: boolean }) {
  const { t } = useTranslation();
  const [fontS, setFontSize] = useState(8);
  const [color, setColor] = useState("#ffff");
  const ReportInstance = props.exportInstance;
  console.log("Inside Report Menu", props);
  const Cut: IIconProps = ConstantFunc.imageProp(ConstantImage.Cut, "menuIcon");
  const Copy: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Copy,
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
  const Clear: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Clear,
    "menuIcon"
  );
  const PageBreak: IIconProps = ConstantFunc.imageProp(
    ConstantImage.PageBreak,
    "menuIcon"
  );
  const Link: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Link,
    "menuIcon"
  );
  const Web: IIconProps = ConstantFunc.imageProp(ConstantImage.Web, "menuIcon");
  const Bookmark: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Bookmark,
    "menuIcon"
  );
  const PageNumber: IIconProps = ConstantFunc.imageProp(
    ConstantImage.PageNumber,
    "menuIcon"
  );
  const Footnote: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Footnote,
    "menuIcon"
  );
  const Endnote: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Endnote,
    "menuIcon"
  );
  const Header: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Header,
    "menuIcon"
  );
  const Footer: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Footer,
    "menuIcon"
  );
  const Underline: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Underline,
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
  const AlignTextLeft: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextLeft,
    "menuIcon"
  );
  const AlignTextCenter: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextCenter,
    "menuIcon"
  );
  const AlignTextRight: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextRight,
    "menuIcon"
  );
  const AlignTextJustify: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextJustify,
    "menuIcon"
  );
  const StrikeThroughSingle: IIconProps = ConstantFunc.imageProp(
    ConstantImage.StrikeThroughSingle,
    "menuIcon"
  );
  const StrikeThroughDouble: IIconProps = ConstantFunc.imageProp(
    ConstantImage.StrikeThroughSingle,
    "menuIcon"
  );
  const FontColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontColor,
    "menuIcon"
  );
  const FontRotation: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontRotation,
    "menuIcon"
  );
  const TextProperties: IIconProps = ConstantFunc.imageProp(
    ConstantImage.TextProperties,
    "menuIcon"
  );
  const Rows: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Row,
    "menuIcon"
  );
  const Columns: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Column,
    "menuIcon"
  );
  const Cells: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Cells,
    "menuIcon"
  );
  const AlignTop: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTop,
    "menuIcon"
  );
  const AlignBottom: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignBottom,
    "menuIcon"
  );
  const AlignMiddle: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignMiddle,
    "menuIcon"
  );

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
    ["Georgia"]: "Georgia, Georgia_MSFontService, sans-serif",
  };
  const fonts = Object.keys(fontMapping);
  const fontNames = fonts.map((fontName: string) => ({
    key: fontName,
    text: fontName,
    styles: {
      optionText: {
        fontFamily: fontMapping[fontName],
      },
    },
  }));

  const size: IDropdownOption[] = [
    { key: "1", text: "8" },
    { key: "2", text: "10" },
    { key: "3", text: "12" },
    { key: "4", text: "14" },
    { key: "5", text: "16" },
    { key: "6", text: "18" },
    { key: "7", text: "20" },
  ];

  const fontSize: IDropdownOption[] = [];
  for (let i = 8; i < 74; i += 2) {
    fontSize.push({ key: i, text: String(i) });
  }

  const rowHeight = [];
  const columnWidth = [];

  for (let i = 300; i <= 1000; i += 50) {
    rowHeight.push({ key: i, text: i });
    if (i >= 600) {
      columnWidth.push({ key: i, text: i });
    }
  }

  //For setting font size of the text
  const _onChangeFontSize = (option: IDropdownOption, index?: number) => {
    //console.log('Option contains',option, index);
    ReportInstance.documentEditor.selection.characterFormat.fontSize =
      index.key;
    setFontSize(option.key);
  };

  //For setting font style of the text
  const _onChangeFont = (option: IDropdownOption, index?: number) => {
    //console.log('Option contains',option, index);
    console.log("Changing font name", option, index);
    ReportInstance.documentEditor.selection.characterFormat.fontFamily =
      index.key;
    // ReportInstance.documentEditor.selection.characterFormat.fontSize= index.key;
    // setFontSize(option.key);
  };

  const pasteDropDown: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "paste",
        text: "Paste",
        //iconProps: { iconName: 'PasteAsText' },
        iconProps: ConstantFunc.imageProp(ConstantImage.Paste, "menuIcon"),
        onClick: () => {
          //RTF/HTML comments from system clipboard
          //Convert the RTF/HTML to SFDT using SyncFusion's loadString API
          //Pass the output SFDT as parameter to paste() method

          ReportInstance.documentEditor.editor.paste();
        },
      },
      {
        key: "pasteSpecial",
        text: "Paste Special",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.PasteSpecial,
          "menuIcon"
        ),
      },
    ],
  };

  const insert: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "New Object",
        text: "New Object",
        iconProps: ConstantFunc.imageProp(
          ConstantImage.ObjectProperties,
          "menuIcon"
        ),
      },
      {
        key: "DateAndTIme",
        text: "Date & Time",
        iconProps: { iconName: "DateTime" },
      },
    ],
  };

  const graphPageRows: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "insertRowsAbove",
        text: "Insert rows above",
        iconProps: { iconName: "" },
      },
      {
        key: "insertRowsBelow",
        text: "Insert rows below",
        iconProps: { iconName: "" },
      },
      {
        key: "deleteRow",
        text: "Delete Row",
        iconProps: { iconName: "" },
      },
      {
        key: "rowColor",
        text: "Row Color...",
        iconProps: { iconName: "" },
      },
      {
        key: "rowBorderColor",
        text: "Row border color...",
        iconProps: { iconName: "" },
      },
    ],
  };

  const graphPageColumns: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "insertColumnToLeft",
        text: "Insert columns to the left",
        iconProps: { iconName: "" },
      },
      {
        key: "insertColumnToRight",
        text: "Insert columns to the Right",
        iconProps: { iconName: "" },
      },
      {
        key: "deleteColumn",
        text: "Delete Column",
        iconProps: { iconName: "" },
      },
      {
        key: "columnColor",
        text: "Column Color...",
        iconProps: { iconName: "" },
      },
      {
        key: "columnBorderColor",
        text: "Column border color...",
        iconProps: { iconName: "" },
      },
    ],
  };

  const graphPageCells: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "cellColor",
        text: "Cell Color...",
        iconProps: { iconName: "" },
      },
      {
        key: "cellBorderColor",
        text: "Cell border color...",
        iconProps: { iconName: "" },
      },
      {
        key: "splitCells",
        text: "Split Cells",
        iconProps: { iconName: "" },
      },
      {
        key: "mergeCells",
        text: "Merge Cells",
        iconProps: { iconName: "" },
      },
      {
        key: "deleteCell",
        text: "Delete cell",
        iconProps: { iconName: "" },
      },
    ],
  };

  const graphPageTable: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "insertTable",
        text: "Insert Table",
        iconProps: { iconName: "" },
        items: [
          {
            key: "defaultStyle",
            text: "Default Style...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableBorderColor",
            text: "Table border color",
            iconProps: { iconName: "" },
          },
          {
            key: "tableProfessional",
            text: "Table Professional...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableContemporary",
            text: "Table Contemporary...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableColumn1",
            text: "Table Column 1...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableColumn2",
            text: "Table Column 2...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableColumn3",
            text: "Table Column 3...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableGrid1",
            text: "Table Grid 1...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableGrid2",
            text: "Table Grid 2...",
            iconProps: { iconName: "" },
          },
          {
            key: "tableClassic1",
            text: "Table Classic 1...",
            iconProps: { iconName: "" },
          },
        ],
      },
      {
        key: "tableBorderColor",
        text: "Table border color",
        iconProps: { iconName: "" },
      },
    ],
  };
  const graphPageObject: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "graphicFile",
        text: "Graphic File",
        iconProps: { iconName: "Mail" },
      },
      {
        key: "newObject",
        text: "New Object",
        iconProps: { iconName: "Mail" },
      },
    ],
  };

  // const [bubbleObj, setBubbleObj] = useState({});
  // const [
  //   teachingBubbleVisible,
  //   { toggle: toggleTeachingBubbleVisible },
  // ] = useBoolean(false);

  // const [
  //   teachingTabBubbleVisible,
  //   { toggle: toggleTabBubbleVisible },
  // ] = useBoolean(false);

  // const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTeachingBubbleVisible,
  //   }),
  //   [toggleTeachingBubbleVisible]
  // );

  // const exampleSecondaryBtnProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTabBubbleVisible,
  //   }),
  //   [toggleTabBubbleVisible]
  // );

  // const openBubble = (param) => {
  //   toggleTeachingBubbleVisible();
  //   setBubbleObj(param);
  // };

  // const openTabBubble = (param) => {
  //   toggleTabBubbleVisible();
  //   setBubbleObj(param);
  // };
  const onFileChange = (args: any) => {
    //   alert('Inside onFileChange ReportMenu');
    if (args.target.files[0]) {
      let path = args.target.files[0];
      if (path.name.substr(path.name.lastIndexOf(".")) === ".sfdt") {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          let contents = e.target.result;
          ReportInstance.documentEditor.open(contents);
        };
        fileReader.readAsText(path);
        ReportInstance.documentEditor.documentName = path.name.substr(
          0,
          path.name.lastIndexOf(".")
        );
      } else {
        loadFile(path);
      }
    }
    event.preventDefault();
  };
  const loadFile = async function (path) {
    console.log("path for report contains", path);
    let nameSplit = path.name.split(".");
    let extension = nameSplit[nameSplit.length - 1];
    console.log("extension", extension);
    //var obj = this;
    // var baseUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/import';
    var baseUrl = reportImport;
    //'http://127.0.0.1:8000/files/report/import';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", baseUrl, true);
    // showSpinner(document.getElementById('documenteditor'));
    ReportInstance.documentEditor.isReadOnly = false;
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200 || httpRequest.status === 304) {
          // alert('200');
          ReportInstance.documentEditor.open(httpRequest.responseText);
          ReportInstance.documentEditor.isReadOnly = false;
          // hideSpinner(document.getElementById('documenteditor'));
        } else {
          // alert('400');
          // hideSpinner(document.getElementById('documenteditor'));
          ReportInstance.documentEditor.isReadOnly = false;
          console.error(httpRequest.response);
        }
      }
    };
    //  var formData = new FormData();
    //  formData.append('files', path);
    const filePath = String.raw`${path.path}`;
    let fileObject = {
      file: path.path,
      file_extension: extension,
    };
    ReportInstance.documentEditor.documentName = path.name.substr(
      0,
      path.name.lastIndexOf(".")
    );
    // httpRequest.send(fileObject);
    let sendRes = await post(baseUrl, fileObject);
    console.log("Response from backend bros", sendRes);
    if (sendRes.data.file) {
      alert("Please select Doc/Docx/RTF files only");
    } else {
      const client = createNewClient();
      console.log("Client contains", client);
      let optionsData = await getDataSetByKey(
        sendRes.data.result.redis_id,
        client
      );
      //  ReportInstance.documentEditor.open(optionsData);
      ReportInstance.documentEditor.open(optionsData.report);
      console.log("Response from backend bros", sendRes, optionsData);
      ReportInstance.contentChange();
    }
  };
  const loadToReport = () => {
    var fileUpload = document.getElementById("uploadfileButton");
    fileUpload.addEventListener("change", onFileChange);
    fileUpload.setAttribute("accept", ".doc,.docx,.rtf,.txt,.sfdt");
    console.log("fileUpload", fileUpload);
    fileUpload.value = "";
    fileUpload.click();
  };
  const trackChanges = () => {
    let revisions: RevisionCollection = this.container.documentEditor.revisions;
  };
  const isReportDisabled = props.allActiveItem.report ? "" : "disableListItem";
  return (
    <div className='ms-Grid' dir='ltr'>
      {/* {teachingBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )}

      {teachingTabBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryBtnProps}
          onDismiss={toggleTabBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )} */}
      <div className='ms-Grid-row'>
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container'>
          
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton"
              }>
              <div
                onClick={() => {
                  ReportInstance.documentEditor.editor.paste();
                }}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Paste clipboard content into report")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPasteReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Paste}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Paste")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Cut the selection and put it on clipboard")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdCutReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Cut}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.cut()
                      }>
                      {t("Cut")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Copy the selection and put it on clipboard")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdCopyReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Copy}
                      onClick={() =>
                        ReportInstance.documentEditor.selection.copy()
                      }>
                      {t("Copy")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Select All the contents of the report")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdSelectAll}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={SelectAll}
                      onClick={() => {
                        ReportInstance.documentEditor.selection.selectAll();
                      }}>
                      {t("Select\u00a0All")}
                    </ActionButton>
                  </TooltipHost>
                </div>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Delete the selected text")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdClearReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Clear}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.delete()
                      }>
                      {t("Clear...")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Find & Replace content in the report")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdFindReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Find}
                      onClick={() => {
                        console.log("Checking", props.actions.replaceAction);
                        props.actions.replaceAction.isOpenReportReplace({
                          message: true,
                        });

                      }}>
                      {t("Find...")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                {/* <ActionButton
                  iconProps={Replace}
                  onClick={() =>
                    props.actions.replaceAction.isOpenReportReplace({
                      message: true,
                    })
                  }
                >
                  Replace
                </ActionButton> */}
              </div>
              <div
                onClick={() => {
                  props.actions.replaceAction.isOpenReportReplace({
                    message: false,
                  });
                  ReportInstance.documentEditor.showDialog("PageSetup");
                }}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("View or modify page settings")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPageSetupReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.PageSetup}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Page Setup")}
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>{t("Edit")}</label>
          </div>
          {/* Insert Group */}
        
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${isReportDisabled}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${isReportDisabled}`
              }>
              {/* Testing Team Said */}
              {/* <div
                // onClick={() => {
                //  ReportInstance.documentEditor.showDialog('PageSetup')
                // }}
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton"
                    : "ribbon-gbutton sim-ribbon-gbutton"
                }>
                <Image
                  alt='ribbon-icon'
                  className='ribbon-icon-svg'
                  src={ConstantImage.GraphIcon}
                />
                <ActionButton className='box-btn' allowDisabledFocus>
                  {t("Graph")}
                </ActionButton>
              </div> */}
              <div
                onClick={() => {
                  props.actions.replaceAction.isOpenReportReplace({
                    message: false,
                  });
                  ReportInstance.documentEditor.showDialog("Table");
                }}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Insert table to Report")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdInsertTableReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Table}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Table")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                onClick={() => {
                  let pictureUpload = document.getElementById(
                    "insertImageButton"
                  );
                  pictureUpload.value = "";
                  pictureUpload.click();
                }}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Insert image to Report")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdInsertImageReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.InsertImage}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                  >
                    {t("Image")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add a page break to the current page")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertPageBreakReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      className='for-whiteSpace'
                      iconProps={PageBreak}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.insertPageBreak()
                      }>
                      {t("Page\u00a0Break")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add a Hyperlink to selected text")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertHyperlinksReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Link}
                      onClick={() => {
                        props.actions.replaceAction.isOpenReportReplace({
                          message: false,
                        });
                        ReportInstance.documentEditor.showDialog("Hyperlink")
                      }
                      }>
                      {t("Link")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add a Bookmark")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertBookmarksReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Bookmark}
                      onClick={() => {
                        props.actions.replaceAction.isOpenReportReplace({
                          message: false,
                        });
                        ReportInstance.documentEditor.showDialog("Bookmark")
                      }
                      }>
                      {t("Bookmark")}
                    </ActionButton>
                  </TooltipHost>
                </div>
              </div>
              <div className='hor-button hr-btn-smallIcons'>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add page number")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertPageNumberReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={PageNumber}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.insertPageNumber()
                      }>
                      {t("Page\u00a0Number")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add Footnote to the current page")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertFootnotesReport}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Footnote}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.insertFootnote()
                      }>
                      {t("Footnote")}
                    </ActionButton>
                  </TooltipHost>
                </div>
                <div className={`${isReportDisabled}`}>
                  <TooltipHost
                    content={t("Add Endnote to the current page")}
                    closeDelay={100}
                    id={toolTipId.tooltipIdInsertEndnotes}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={Endnote}
                      onClick={() =>
                        ReportInstance.documentEditor.editor.insertEndnote()
                      }>
                      {t("Endnote")}
                    </ActionButton>
                  </TooltipHost>
                </div>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>{t("Insert")}</label>
          </div>
        

          {/* <div className="ribbon-btn-box">
            
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
               <div
                onClick={() => {
                  ReportInstance.documentEditor.editor.insertComment("Test comment");
                }}
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Comments}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                 
                >
                Comments
                </ActionButton>
              </div>
              <div
                onClick={() => {
                  ReportInstance.documentEditor.enableTrackChanges = !ReportInstance.documentEditor.enableTrackChanges
                 // ReportInstance.documentEditor.selection.navigateNextRevision()
                }}
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Changes}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                 
                >
                Changes
                </ActionButton>
              </div>
              &nbsp;&nbsp;&nbsp;
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
          {/* </div>
            <label className="ribbon-boxbtn-lbl">Review</label>
          </div> */}

          {/* View Group */}
         
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton`
              }>
              <div
                onClick={() => {
                  console.log("Debugging", ReportInstance.documentEditor);
                  // ReportInstance.documentEditor.properties.enableOptionsPane = false;
                  ReportInstance.showPropertiesPane = !ReportInstance.showPropertiesPane;
                }}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Show or Hide the Property Panel")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdInsertPropertyReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    style={{ marginTop: "-2px" }}
                    src={ConstantImage.PropertyPane}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Property Panel")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                onClick={() =>
                  ReportInstance.documentEditor.selection.goToHeader()
                }
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Add a Header to the current page")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdInsertHeaderReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Header}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Header")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                onClick={() =>
                  ReportInstance.documentEditor.selection.goToFooter()
                }
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isReportDisabled}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isReportDisabled}`
                }>
                <TooltipHost
                  content={t("Add a Footer to the current page")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdFontColor}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Footer}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Footer")}
                  </ActionButton>
                </TooltipHost>
              </div>
          
            </div>
            <label className='ribbon-boxbtn-lbl'>{t("View")}</label>
          </div>
        

          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${isReportDisabled}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${isReportDisabled}`
              }>
              <div
                onClick={() => {
                  // ReportInstance.documentEditor.showDialog('PageSetup')
                  //document.getElementById("file_upload").click();
                  // var fileUpload = document.getElementById('uploadfileButton');
                  // fileUpload.value = '';
                  // fileUpload.click();
                  loadToReport();
                }}
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton"
                    : "ribbon-gbutton sim-ribbon-gbutton"
                }>
                <TooltipHost
                  content={t("Load Word Documents, RTF files to Report")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdOpenDocumentReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Word}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Word")}
                  </ActionButton>
                </TooltipHost>
              </div>
              
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
            </div>
            <label className='ribbon-boxbtn-lbl'>{t("Open")}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log("state contains report menu", state);
  return {
    isOpenReportFind: state.findReducer.isOpenReportFind,
    isOpenReportReplace: state.replaceReducer.isOpenReportReplace,
    isOpenGoto: state.gotoReducer.isOpenGoto,
    isColorAvailable: state.instanceReducer.isColorAvailable,
    exportInstance: state.instanceReducer.exportInstance,
    webLayout: state.replaceReducer.isWebLayout,
    allActiveItem: state.notebookReducer.allActiveItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      findAction: bindActionCreators(findAction, dispatch),
      replaceAction: bindActionCreators(replaceAction, dispatch),
      colorAction: bindActionCreators(colorAction, dispatch),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Report);
