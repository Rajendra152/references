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
  ChoiceGroup,
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
const tabKeys: string[] = [
  "CAssumeCheck",
  "CResiduals",
  "COtherResults",
  "COtherTestsInfluence",
];
const setIdKey = "nonlinearRegression";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const NonLinearRegression: React.FunctionComponent = ({
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
    help(
      "wbasics",
      "report_options_for_nonlinear_regression___assumption_checking",
      ""
    );
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Assumption Checking") {
      help(
        "wbasics",
        "report_options_for_nonlinear_regression___assumption_checking",
        ""
      );
    } else if (item.props.headerText == "Residuals") {
      help(
        "wbasics",
        "report_options_for_nonlinear_regression___residuals",
        ""
      );
    } else if (item.props.headerText == "More Statistics") {
      help(
        "wbasics",
        "report_options_for_nonlinear_regression___more_statistics",
        ""
      );
    } else if (item.props.headerText == "Other Diagnostics") {
      help(
        "wbasics",
        "report_options_for_nonlinear_regression___other_diagnostics",
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
            <Pivot
              onLinkClick={getSelectedItem}
              aria-label='Report Options Configuration'
              className='FormatContainer'>
              <PivotItem
                headerText='Assumption Checking'
                onClick={() =>
                  help(
                    "wbasics",
                    "report_options_for_nonlinear_regression___assumption_checking",
                    ""
                  )
                }
                style={{ display: "flex" }}>
                <br />
                <div className={contentStyles.assumptionSection}>
                  <div>
                    <Checkbox
                      label='Normality'
                      checked={options.CAssumeCheck[0].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 0)}
                    />
                  </div>
                  <div style={{ margin: "7px 0 0 28px" }}>
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.column}>
                        P Value to Reject
                      </label>
                      <TextField
                        disabled={!options.CAssumeCheck[0].checked}
                        name='StrsNormalityReject'
                        value={options.CAssumeCheck[1].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CAssumeCheck",
                            e,
                            1,
                            options.CAssumeCheck[1]
                          )
                        }
                      />
                    </div>
                    <fieldset className={contentStyles.fieldSet}>
                      <legend>Normality Statistic</legend>
                      <ChoiceGroup
                        disabled={!options.CAssumeCheck[0].checked}
                        defaultSelectedKey={options.CAssumeCheck[2].radioData}
                        options={[
                          {
                            key: "0",
                            text: "Shapiro-Wilk (sample size <= 5000)",
                          },
                          {
                            key: "1",
                            text:
                              "Kolmogorov-Smimov (with Lilliefors correction)",
                          },
                        ]}
                        onChange={(e, item) =>
                          udpateOptions(
                            "CAssumeCheck",
                            item,
                            2,
                            options.CAssumeCheck[2]
                          )
                        }
                      />
                    </fieldset>
                  </div>
                </div>
                <div className={contentStyles.assumptionSection}>
                  <div>
                    <Checkbox
                      label='Durbin-Watson'
                      checked={options.CAssumeCheck[3].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 3)}
                    />
                  </div>
                  <div style={{ margin: "7px 0 0 28px" }}>
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.column}>
                        Difference from 2.0
                      </label>
                      <TextField
                        disabled={!options.CAssumeCheck[3].checked}
                        name='StrDurbinWatson'
                        value={options.CAssumeCheck[4].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CAssumeCheck",
                            e,
                            4,
                            options.CAssumeCheck[4]
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Checkbox
                      label='Equal Variance'
                      checked={options.CAssumeCheck[5].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 5)}
                    />
                  </div>
                  <div style={{ margin: "7px 0 0 28px" }}>
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.column}>
                        P Value to Reject
                      </label>
                      <TextField
                        disabled={!options.CAssumeCheck[5].checked}
                        name='StrEqualVarianceReject'
                        value={options.CAssumeCheck[6].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CAssumeCheck",
                            e,
                            6,
                            options.CAssumeCheck[6]
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Residuals'
                onClick={() =>
                  help(
                    "wbasics",
                    "report_options_for_nonlinear_regression___residuals",
                    ""
                  )
                }>
                <br />
                <div className={contentStyles.residualSection}>
                  <div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Studentized'
                      checked={options.CResiduals[0].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 0)}
                    />
                    <Checkbox
                      className={contentStyles.column}
                      label='Studentized Deleted'
                      checked={options.CResiduals[1].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 1)}
                    />
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.residualCol}>
                        Flag Values &gt;
                      </label>
                      <div style={{ width: "100px" }}>
                        <TextField
                          disabled={!options.CResiduals[1].checked}
                          name='StrStudentizedDeleted'
                          value={options.CResiduals[1].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "CResiduals",
                              e,
                              1,
                              options.CResiduals[1]
                            )
                          }
                        />
                      </div>
                    </div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Raw'
                      checked={options.CResiduals[2].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 2)}
                    />
                    <Checkbox
                      className={contentStyles.column}
                      label='Predicted Values'
                      checked={options.CResiduals[3].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 3)}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label='Standardized'
                      checked={options.CResiduals[4].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 4)}
                    />
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.residualCol}>
                        Flag Values &gt;
                      </label>
                      <div style={{ width: "100px" }}>
                        <TextField
                          disabled={!options.CResiduals[4].checked}
                          name='StrStandardized'
                          value={options.CResiduals[4].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "CResiduals",
                              e,
                              4,
                              options.CResiduals[4]
                            )
                          }
                        />
                      </div>
                    </div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Report Flagged Values Only'
                      checked={options.CResiduals[5].checked}
                      onChange={(e) => udpateOptions("CResiduals", e, 5)}
                    />
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='More Statistics'
                onClick={() =>
                  help(
                    "wbasics",
                    "report_options_for_nonlinear_regression___more_statistics",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0 60%" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <div className={contentStyles.columns}>
                      <div style={{ flex: "0 0 50%" }}>
                        <Checkbox
                          className={contentStyles.column}
                          label='Prediction'
                          checked={options.COtherResults[0].checked}
                          onChange={(e) => udpateOptions("COtherResults", e, 0)}
                        />
                      </div>
                      <Checkbox
                        className={contentStyles.column}
                        label='Confidence'
                        checked={options.COtherResults[1].checked}
                        onChange={(e) => udpateOptions("COtherResults", e, 1)}
                      />
                    </div>
                    <div className={contentStyles.columns}>
                      <label style={{ flex: "0 0 50%" }}>
                        Confidence Level:{" "}
                      </label>
                      <TextField
                        disabled={
                          !(
                            options.COtherResults[0].checked ||
                            options.COtherResults[1].checked
                          )
                        }
                        name='StrConfInterval'
                        value={options.COtherResults[1].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "COtherResults",
                            e,
                            1,
                            options.COtherResults[1]
                          )
                        }
                      />
                      %
                    </div>
                    <div className={contentStyles.columns}>
                      <label style={{ flex: "0 0 50%" }}>
                        Starting in Column
                      </label>
                      <Dropdown
                        disabled={
                          !(
                            options.COtherResults[0].checked ||
                            options.COtherResults[1].checked
                          )
                        }
                        selectedKey={options.COtherResults[2].selectedData}
                        styles={dropdownStyles}
                        options={sampleTestOptions.residualOptions}
                        onChange={(e, item) =>
                          udpateOptions(
                            "COtherResults",
                            item,
                            2,
                            options.COtherResults[2]
                          )
                        }
                      />
                    </div>
                  </fieldset>
                  <Checkbox
                    className={contentStyles.column}
                    label='Confidence Intervals for Parameters'
                    checked={options.COtherResults[3].checked}
                    onChange={(e) => udpateOptions("COtherResults", e, 3)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 50%" }}>
                      Confidence Level:{" "}
                    </label>
                    <TextField
                      disabled={!options.COtherResults[3].checked}
                      name='StrConfInterval'
                      value={options.COtherResults[3].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "COtherResults",
                          e,
                          3,
                          options.COtherResults[3]
                        )
                      }
                    />
                    %
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Covariance Matrix'
                    checked={options.COtherResults[4].checked}
                    onChange={(e) => udpateOptions("COtherResults", e, 4)}
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='PRESS Prediction Error'
                    checked={options.COtherResults[5].checked}
                    onChange={(e) => udpateOptions("COtherResults", e, 5)}
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='AICc - Alkaike Information Criterion'
                    checked={options.COtherResults[6].checked}
                    onChange={(e) => udpateOptions("COtherResults", e, 6)}
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='F-tests for simple model comparisons'
                    checked={options.COtherResults[7].checked}
                    onChange={(e) => udpateOptions("COtherResults", e, 7)}
                  />
                </div>
              </PivotItem>
              <PivotItem
                headerText='Other Diagnostics'
                onClick={() =>
                  help(
                    "wbasics",
                    "report_options_for_nonlinear_regression___other_diagnostics",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0 55%" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Influence</legend>
                    <Checkbox
                      className={contentStyles.column}
                      label='DFFITs'
                      checked={options.COtherTestsInfluence[0].checked}
                      onChange={(e) =>
                        udpateOptions("COtherTestsInfluence", e, 0)
                      }
                    />
                    <div style={{ marginLeft: "28px" }}>
                      <div className={contentStyles.columns}>
                        <label style={{ flex: "0 0 40%" }}>
                          Flag values with &gt;
                        </label>
                        <TextField
                          name='StrsDFFIT'
                          value={options.COtherTestsInfluence[0].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "COtherTestsInfluence",
                              e,
                              0,
                              options.COtherTestsInfluence[0]
                            )
                          }
                        />
                      </div>
                      standard errors changed
                    </div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Leverage'
                      checked={options.COtherTestsInfluence[1].checked}
                      onChange={(e) =>
                        udpateOptions("COtherTestsInfluence", e, 1)
                      }
                    />
                    <div style={{ marginLeft: "28px" }}>
                      <div className={contentStyles.columns}>
                        <label style={{ flex: "0 0 40%" }}>
                          Flag values with &gt;
                        </label>
                        <TextField
                          name='StrLeverage'
                          value={options.COtherTestsInfluence[1].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "COtherTestsInfluence",
                              e,
                              1,
                              options.COtherTestsInfluence[1]
                            )
                          }
                        />
                      </div>
                      times the expected value
                    </div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Cooks Distance'
                      checked={options.COtherTestsInfluence[2].checked}
                      onChange={(e) =>
                        udpateOptions("COtherTestsInfluence", e, 2)
                      }
                    />
                    <div
                      className={contentStyles.columns}
                      style={{ marginLeft: "28px" }}>
                      <label style={{ flex: "0 0 30%" }}>
                        Flag values &gt;
                      </label>
                      <TextField
                        name='StrCooksDist'
                        value={options.COtherTestsInfluence[2].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "COtherTestsInfluence",
                            e,
                            2,
                            options.COtherTestsInfluence[2]
                          )
                        }
                      />
                    </div>
                  </fieldset>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Variance Inflation Factor'
                    checked={options.COtherTestsInfluence[3].checked}
                    onChange={(e) =>
                      udpateOptions("COtherTestsInfluence", e, 3)
                    }
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 50%" }}>Flag Values &gt;</label>
                    <TextField
                      disabled={!options.COtherTestsInfluence[3].checked}
                      name='StrVarianceInflation'
                      value={options.COtherTestsInfluence[3].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "COtherTestsInfluence",
                          e,
                          3,
                          options.COtherTestsInfluence[3]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Power'
                    checked={options.COtherTestsInfluence[4].checked}
                    onChange={(e) =>
                      udpateOptions("COtherTestsInfluence", e, 4)
                    }
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 50%" }}>Use Alpha Value</label>
                    <TextField
                      disabled={!options.COtherTestsInfluence[4].checked}
                      name='StrPowerAlpha'
                      value={options.COtherTestsInfluence[4].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "COtherTestsInfluence",
                          e,
                          4,
                          options.COtherTestsInfluence[4]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Report flagged values only'
                    checked={options.COtherTestsInfluence[5].checked}
                    onChange={(e) =>
                      udpateOptions("COtherTestsInfluence", e, 5)
                    }
                  />
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
    marginBottom: "10px",
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
export default NonLinearRegression;
