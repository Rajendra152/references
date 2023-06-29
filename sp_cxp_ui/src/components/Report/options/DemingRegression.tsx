import React, { useState, useEffect } from "react";
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  ContextualMenu,
  IconButton,
  IIconProps,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as sampleTestOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";

const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};

const helpIcon: IIconProps = { iconName: "Help" };
const cancelIcon: IIconProps = { iconName: "Cancel" };
const tabKeys: string[] = ["CDemingOptions"];
const setIdKey = "demingRegression";

const DemingRegression: React.FunctionComponent = ({
  isOpen,
  close,
  helpMenu,
  OpenHelpWindow,

  modalData
}) => {
  const [options, setOptions] = useState({});
  const [optionsData, setOptionsData] = useState({});
  var current;
  console.log("helpMenu", helpMenu);
  if (helpMenu.HelpValue[0].selectedItem !== "") {
    current = helpMenu.HelpValue[0].selectedItem;
    console.log("x", current);
  } else if (helpMenu.HelpValue[0].selectedElement !== "") {
    current = helpMenu.HelpValue[0].selectedElement;
    console.log("3", current);
  } else {
    current = helpMenu.HelpValue[0].RibbonMenu;
    console.log("4", current);
  }
  const setStateOptions = (reportOptions: any) => {
    setOptions(reportOptions);
  };

  const udpateOptions = (
    key: string,
    event: any,
    index: number,
    option?: any
  ) => {
    const reportOptions = sampleTestOptions.udpateOptions(
      options,
      key,
      event,
      index,
      option
    );
    setStateOptions(reportOptions);
  };

  const getOptionsData = async () => {
    const { optionsData, statOptions } = await sampleTestOptions.getOptionsData(
      setIdKey,
      tabKeys
    );
    setOptionsData(optionsData);
    setStateOptions(statOptions);
  };

  const updateDataInRedis = async () => {
    await sampleTestOptions.updateDataInRedis(
      optionsData,
      options,
      setIdKey,
      tabKeys
    );
    close();
  };
  const help = (a: string, b: string, c: string) => {
    OpenHelpWindow(a, b, c);
  };
  useEffect(() => {
    help("wbasics", "", "");

    getOptionsData();
  }, []);

  return (
    <div>
      <Modal
        titleAriaId={"title1"}
        isOpen={isOpen}
        onDismiss={close}
        isModeless={false}
        isBlocking={true}
        containerClassName={contentStyles.container}
        // dragOptions={dragOptions}
        >
   <div className="msid " dir="ltr">
          <div className='ms-Grid-row' >
            <div className={contentStyles.header}>
            <div className="ms-Grid-col ms-sm10">
                <span id={"title1"}>Options for {modalData.testsValue}</span>
              </div>
              <div style={iconButtonStyles.root}>
                <div className="ms-Grid-col ms-sm2 ">
                  <Helpbutton nodeId={current} />
                </div>
                <IconButton
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={close}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={contentStyles.body}>
          {Object.keys(options).length && (
            <div className={contentStyles.columns}>
              <div style={{ flex: "0 0 60%" }}>
                <fieldset className={contentStyles.fieldSet}>
                  <legend>Report</legend>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Standard errors of parameters</legend>
                    <Checkbox
                      className={contentStyles.column}
                      label='Apply correction factor estimated by the reduced chi-square'
                      checked={options.CDemingOptions[0].checked}
                      onChange={(e) => udpateOptions("CDemingOptions", e, 0)}
                    />
                  </fieldset>
                  <div style={{ marginLeft: "13px" }}>
                    <Checkbox
                      className={contentStyles.column}
                      label='Add table of the predicted means'
                      checked={options.CDemingOptions[1].checked}
                      onChange={(e) => udpateOptions("CDemingOptions", e, 1)}
                    />
                    <Checkbox
                      className={contentStyles.column}
                      label='Add parameter covariance matrix'
                      checked={options.CDemingOptions[2].checked}
                      onChange={(e) => udpateOptions("CDemingOptions", e, 2)}
                    />
                  </div>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Confidence Intervals</legend>
                    <div className={contentStyles.columns}>
                      <label style={{ flex: "0 0 50%" }}>
                        Confidence Level
                      </label>
                      <TextField
                        suffix='%'
                        disabled={!options.CDemingOptions[3].checked}
                        name='StrConfInterval'
                        value={options.CDemingOptions[3].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CDemingOptions",
                            e,
                            3,
                            options.CDemingOptions[3]
                          )
                        }
                      />
                    </div>
                  </fieldset>
                </fieldset>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <fieldset className={contentStyles.fieldSet}>
                  <legend>Graph</legend>
                  <Checkbox
                    className={contentStyles.column}
                    label='Create new graph'
                    checked={options.CDemingOptions[4].checked}
                    onChange={(e) => udpateOptions("CDemingOptions", e, 4)}
                  />
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Graph features</legend>
                    <Checkbox
                      className={contentStyles.column}
                      label='Add scatter plot of predicted means'
                      checked={options.CDemingOptions[5].checked}
                      onChange={(e) => udpateOptions("CDemingOptions", e, 5)}
                    />
                    <Checkbox
                      className={contentStyles.column}
                      label='Add confidence bands'
                      checked={options.CDemingOptions[6].checked}
                      onChange={(e) => udpateOptions("CDemingOptions", e, 6)}
                    />
                  </fieldset>
                </fieldset>
              </div>
            </div>
          )}
          <OptionsFooter
            close={close}
            updateRedis={updateDataInRedis}></OptionsFooter>
        </div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "1 1 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
  columns: {
    display: "flex",
    marginTop: "10px",
    marginBottom: "10px",
  },
  column: {
    flex: "0 0 50%",
    marginBottom: "15px",
  },
  fieldSet: {
    border: "1px solid rgb(211, 211, 218, 0.7)",
    marginBottom: "10px",
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const iconHelpButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    position: "relative",
    top: "2px",
    left: "6px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
export default DemingRegression;
