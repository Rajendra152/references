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
import { Dropdown, IDropdownStyles } from "@fluentui/react/lib/Dropdown";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as sampleTestOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";
const helpIcon: IIconProps = { iconName: "Help" };
const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: "Cancel" };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};
const tabKeys: string[] = [
  "CFitLogistic",
  "CLogisticRegressionOptions",
  "CResidualsLogistic",
];
const setIdKey = "multipleLogistics";

const MultipleLogistic: React.FunctionComponent = ({
  isOpen,
  close,
  OpenHelpWindow,
  helpMenu,
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
    help("wbasics", "options_for_multiple_logistic_regression__criterion", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Criterion") {
      help(
        "wbasics",
        "options_for_multiple_logistic_regression__criterion",
        ""
      );
    } else if (item.props.headerText == "More Statistics") {
      help(
        "wbasics",
        "options_for_multiple_logistic_regression__statistics",
        ""
      );
    } else if (item.props.headerText == "Residuals") {
      help(
        "wbasics",
        "options_for_multiple_logistic_regression__residuals",
        ""
      );
    }
  };
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
        <div className={contentStyles.header} style={{ display: "flex", justifyContent: 'space-between' }}>
          <span id={"title1"}>Options for {modalData.testsValue}</span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Helpbutton nodeId={current} />
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={close}
            />
          </div>
        </div>


        <div className={contentStyles.body}>
          {Object.keys(options).length && (
            <Pivot
              onLinkClick={getSelectedItem}
              aria-label='Report Options Configuration'
              className='FormatContainer'>
              <PivotItem
                headerText='Criterion'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_multiple_logistic_regression__criterion",
                    ""
                  )
                }>
                <br />
                <Checkbox
                  className={contentStyles.column}
                  label='Hosmer-Lemeshow Test Statistic'
                  checked={options.CFitLogistic[0].checked}
                  onChange={(e) => udpateOptions("CFitLogistic", e, 0)}
                />
                <div
                  className={contentStyles.columns}
                  style={{ marginLeft: "28px" }}>
                  <label style={{ flex: "0 0 50%" }}>
                    Threshold probability for goodness of fit
                  </label>
                  <TextField
                    name='StrHosmerPVal'
                    value={options.CFitLogistic[0].inputData}
                    onChange={(e) =>
                      udpateOptions(
                        "CFitLogistic",
                        e,
                        0,
                        options.CFitLogistic[0]
                      )
                    }
                  />
                </div>
                <Checkbox
                  className={contentStyles.column}
                  label='Pearson Chi square Test Statistic'
                  checked={options.CFitLogistic[1].checked}
                  onChange={(e) => udpateOptions("CFitLogistic", e, 1)}
                />
                <Checkbox
                  className={contentStyles.column}
                  label='Likelihood Ratio Test Statistic'
                  checked={options.CFitLogistic[2].checked}
                  onChange={(e) => udpateOptions("CFitLogistic", e, 2)}
                />
                <Checkbox
                  className={contentStyles.column}
                  label='Classification Table'
                  checked={options.CFitLogistic[3].checked}
                  onChange={(e) => udpateOptions("CFitLogistic", e, 3)}
                />
                <div
                  className={contentStyles.columns}
                  style={{ marginLeft: "28px" }}>
                  <label style={{ flex: "0 0 50%" }}>
                    Threshold probability for positive classification
                  </label>
                  <TextField
                    name='StrThresholdProbability'
                    value={options.CFitLogistic[3].inputData}
                    onChange={(e) =>
                      udpateOptions(
                        "CFitLogistic",
                        e,
                        3,
                        options.CFitLogistic[3]
                      )
                    }
                  />
                </div>
                <Checkbox
                  className={contentStyles.column}
                  label='Number of Independent Variable Combinations'
                  checked={options.CFitLogistic[4].checked}
                  onChange={(e) => udpateOptions("CFitLogistic", e, 4)}
                />
                <div
                  className={contentStyles.columns}
                  style={{ marginLeft: "28px" }}>
                  <label style={{ flex: "0 0 22%" }}>
                    Warn if number is &lt;
                  </label>
                  <div style={{ flex: "0 0 20%" }}>
                    <TextField
                      name='StrTimesNum'
                      value={options.CFitLogistic[4].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CFitLogistic",
                          e,
                          4,
                          options.CFitLogistic[4]
                        )
                      }
                    />
                  </div>
                  <label style={{ marginLeft: "10px" }}>
                    times number of variables
                  </label>
                </div>
              </PivotItem>
              <PivotItem
                headerText='More Statistics'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_multiple_logistic_regression__statistics",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Standard Error  Coeffiecients'
                    checked={options.CLogisticRegressionOptions[0].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 0)
                    }
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='Wald Statistic'
                    checked={options.CLogisticRegressionOptions[1].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 1)
                    }
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label=' Coeffiecients P Values'
                    checked={options.CLogisticRegressionOptions[2].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 2)
                    }
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='Odd Ratio'
                    checked={options.CLogisticRegressionOptions[3].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 3)
                    }
                  />
                  <div className={contentStyles.columns}>
                    <Checkbox
                      className={contentStyles.column}
                      label='Odd Confidence Interval'
                      checked={options.CLogisticRegressionOptions[4].checked}
                      onChange={(e) =>
                        udpateOptions("CLogisticRegressionOptions", e, 4)
                      }
                    />
                    <TextField
                      name='StrOddsConfidence'
                      value={options.CLogisticRegressionOptions[4].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CLogisticRegressionOptions",
                          e,
                          4,
                          options.CLogisticRegressionOptions[4]
                        )
                      }
                    />
                    %
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Predicted Values'
                    checked={options.CLogisticRegressionOptions[5].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 5)
                    }
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label>in column</label>
                    <Dropdown
                      disabled={!options.CLogisticRegressionOptions[5].checked}
                      selectedKey={
                        options.CLogisticRegressionOptions[5].selectedData
                      }
                      styles={dropdownStyles}
                      options={sampleTestOptions.residualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CLogisticRegressionOptions",
                          item,
                          5,
                          options.CLogisticRegressionOptions[5]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Variance Inflation Factor'
                    checked={options.CLogisticRegressionOptions[6].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 6)
                    }
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label>Flag values &gt;</label>
                    <TextField
                      name='StrVIF'
                      value={options.CLogisticRegressionOptions[6].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CLogisticRegressionOptions",
                          e,
                          6,
                          options.CLogisticRegressionOptions[6]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Report Flagged Values only'
                    checked={options.CLogisticRegressionOptions[7].checked}
                    onChange={(e) =>
                      udpateOptions("CLogisticRegressionOptions", e, 7)
                    }
                  />
                </div>
              </PivotItem>
              <PivotItem
                headerText='Residuals'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_multiple_logistic_regression__residuals",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0 50%" }}>
                  <div className={contentStyles.columns}>
                    <label style={{ flex: "0 0 30%" }}>Residual Type:</label>
                    <Dropdown
                      selectedKey={options.CResidualsLogistic[0].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.logisticResidualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CResidualsLogistic",
                          item,
                          0,
                          options.CResidualsLogistic[0]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    disabled={options.CResidualsLogistic[0].selectedData == 0}
                    className={contentStyles.column}
                    label='Raw'
                    checked={options.CResidualsLogistic[1].checked}
                    onChange={(e) => udpateOptions("CResidualsLogistic", e, 1)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "5px", marginTop: "15px" }}>
                    <label style={{ flex: "0 0 30%" }}>in Column</label>
                    <Dropdown
                      disabled={
                        !options.CResidualsLogistic[1].checked ||
                        options.CResidualsLogistic[0].selectedData == 0
                      }
                      selectedKey={options.CResidualsLogistic[1].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.residualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CResidualsLogistic",
                          item,
                          1,
                          options.CResidualsLogistic[1]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    disabled={options.CResidualsLogistic[0].selectedData == 0}
                    className={contentStyles.column}
                    label='Studentized'
                    checked={options.CResidualsLogistic[2].checked}
                    onChange={(e) => udpateOptions("CResidualsLogistic", e, 2)}
                  />
                  <Checkbox
                    disabled={options.CResidualsLogistic[0].selectedData == 0}
                    className={contentStyles.column}
                    label='Studentized Deleted'
                    checked={options.CResidualsLogistic[3].checked}
                    onChange={(e) => udpateOptions("CResidualsLogistic", e, 3)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 30%" }}>Flag Values &gt;</label>
                    <TextField
                      disabled={options.CResidualsLogistic[0].selectedData == 0}
                      name='StrVStrStudentizedDeletedIF'
                      value={options.CResidualsLogistic[3].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CResidualsLogistic",
                          e,
                          3,
                          options.CResidualsLogistic[3]
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <fieldset
                    className={contentStyles.fieldSet}
                    style={{ marginBottom: "10px" }}>
                    <div style={{ marginTop: "10px" }}>
                      <Checkbox
                        disabled={options.CResidualsLogistic[0].selectedData == 0}
                        className={contentStyles.column}
                        label='Leverage'
                        checked={options.CResidualsLogistic[4].checked}
                        onChange={(e) =>
                          udpateOptions("CResidualsLogistic", e, 4)
                        }
                      />
                    </div>
                    <div style={{ marginLeft: "28px" }}>
                      <div className={contentStyles.columns}>
                        <label style={{ flex: "0 0 50%" }}>
                          Flag values with &gt;
                        </label>
                        <TextField
                          disabled={
                            options.CResidualsLogistic[0].selectedData == 0
                          }
                          name='StrLeverage'
                          value={options.CResidualsLogistic[4].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "CResidualsLogistic",
                              e,
                              4,
                              options.CResidualsLogistic[4]
                            )
                          }
                        />
                      </div>
                      <label>times the expected value</label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Checkbox
                        disabled={options.CResidualsLogistic[0].selectedData == 0}
                        className={contentStyles.column}
                        label='Cooks Distance'
                        checked={options.CResidualsLogistic[5].checked}
                        onChange={(e) =>
                          udpateOptions("CResidualsLogistic", e, 5)
                        }
                      />
                    </div>
                    <div
                      className={contentStyles.columns}
                      style={{ marginLeft: "28px" }}>
                      <label style={{ flex: "0 0 50%" }}>
                        Flag values &gt;
                      </label>
                      <TextField
                        disabled={
                          options.CResidualsLogistic[0].selectedData == 0
                        }
                        name='StrCooksDistance'
                        value={options.CResidualsLogistic[5].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CResidualsLogistic",
                            e,
                            5,
                            options.CResidualsLogistic[5]
                          )
                        }
                      />
                    </div>
                  </fieldset>
                  <div style={{ marginTop: "25px", marginLeft: "10px" }}>
                    <Checkbox
                      disabled={options.CResidualsLogistic[0].selectedData == 0}
                      label='Report Flagged Values only'
                      checked={options.CResidualsLogistic[6].checked}
                      onChange={(e) => udpateOptions("CResidualsLogistic", e, 6)}
                    />
                  </div>
                </div>
              </PivotItem>
            </Pivot>
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
  columnBtn: {
    gridColumnEnd: "4",
    marginBottom: "20px",
  },
  fieldSet: {
    border: "1px solid rgb(211, 211, 218, 0.7)",
  },
  assumptionSection: {
    width: "50%",
    margin: "5px 10px 20px 10px",
  },
  residualSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  residualCol: {
    flex: "0 0 30%",
    margin: "0 28px",
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
export default MultipleLogistic;
