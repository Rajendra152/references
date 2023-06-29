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

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};
const tabKeys: string[] = [
  "CCriterionPolyReg",
  "CAssumeCheck",
  "CResiduals",
  "COtherResults",
  "COtherTest",
];
const setIdKey = "polynomialRegression";

const PolynomialRegression: React.FunctionComponent = ({
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
    help("wbasics", "options_for_polynomial_regression__criterion", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Assumption Checking") {
      help(
        "wbasics",
        "options_for_polynomial_regression__assumption_checking",
        ""
      );
    } else if (item.props.headerText == "Results") {
      help("wbasics", "options_for_principal_components_analysis__results", "");
    } else if (item.props.headerText == "Criterion") {
      help("wbasics", "options_for_polynomial_regression__criterion", "");
    } else if (item.props.headerText == "Residuals") {
      help("wbasics", "options_for_polynomial_regression__residuals", "");
    } else if (item.props.headerText == "More Statistics") {
      help("wbasics", "options_for_polynomial_regression__more_statistics", "");
    } else if (item.props.headerText == "Post Hoc Tests") {
      help("wbasics", "options_for_polynomial_regression__post_hoc_tests", "");
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
                    "options_for_polynomial_regression__criterion",
                    ""
                  )
                }
                style={{ width: "60%" }}>
                <br />
                <div className={contentStyles.columns}>
                  <label style={{ flex: "0 0 40%" }}>Polynomial Order</label>
                  <Dropdown
                    selectedKey={options.CCriterionPolyReg[0].selectedData}
                    styles={dropdownStyles}
                    options={[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                    ].map((num: string, index: number) => {
                      return { key: index, text: num };
                    })}
                    onChange={(e, item) =>
                      udpateOptions(
                        "CCriterionPolyReg",
                        item,
                        0,
                        options.CCriterionPolyReg[0]
                      )
                    }
                  />
                </div>
                <div className={contentStyles.columns}>
                  <label style={{ flex: "0 0 40%" }}>Regression Type</label>
                  <Dropdown
                    selectedKey={options.CCriterionPolyReg[1].selectedData}
                    styles={dropdownStyles}
                    options={sampleTestOptions.regressionTypes}
                    onChange={(e, item) =>
                      udpateOptions(
                        "CCriterionPolyReg",
                        item,
                        1,
                        options.CCriterionPolyReg[1]
                      )
                    }
                  />
                </div>
                <fieldset className={contentStyles.fieldSet}>
                  <legend>Model Selection Criteria</legend>
                  <div className={contentStyles.columns}>
                    <div style={{ flex: "0 0 50%" }}>
                      <Checkbox
                        disabled={
                          options.CCriterionPolyReg[1].selectedData === 1
                        }
                        label='R-Square'
                        checked={options.CCriterionPolyReg[2].checked}
                        onChange={(e) =>
                          udpateOptions("CCriterionPolyReg", e, 2)
                        }
                      />
                    </div>
                    <Checkbox
                      disabled={options.CCriterionPolyReg[1].selectedData === 1}
                      label='Predicted R-Square'
                      checked={options.CCriterionPolyReg[3].checked}
                      onChange={(e) => udpateOptions("CCriterionPolyReg", e, 3)}
                    />
                  </div>
                  <div className={contentStyles.columns}>
                    <div style={{ flex: "0 0 50%" }}>
                      <Checkbox
                        disabled={
                          options.CCriterionPolyReg[1].selectedData === 1
                        }
                        style={{ flex: "0 0 50%" }}
                        label='Adjusted R-Square'
                        checked={options.CCriterionPolyReg[4].checked}
                        onChange={(e) =>
                          udpateOptions("CCriterionPolyReg", e, 4)
                        }
                      />
                    </div>
                    <Checkbox
                      disabled={options.CCriterionPolyReg[1].selectedData === 1}
                      label='AICc - Akaike Information Criterion'
                      checked={options.CCriterionPolyReg[5].checked}
                      onChange={(e) => udpateOptions("CCriterionPolyReg", e, 5)}
                    />
                  </div>
                </fieldset>
              </PivotItem>
              {options.CCriterionPolyReg[1].selectedData === 1 && (
                <PivotItem
                  headerText='Assumption Checking'
                  onClick={() =>
                    help(
                      "wbasics",
                      "options_for_polynomial_regression__assumption_checking",
                      ""
                    )
                  }
                  className={contentStyles.columns}>
                  <br />
                  <div className={contentStyles.assumptionSection}>
                    <div>
                      <Checkbox
                        label='Normality'
                        checked={options.CAssumeCheck[0].checked == ""?true:options.CAssumeCheck[0].checked}
                        onChange={(e) => udpateOptions("CAssumeCheck", e, 0)}
                      />
                    </div>
                    <div style={{ margin: "7px 0 0 28px" }}>
                      <div className={contentStyles.columns}>
                        <label className={contentStyles.column}>
                          P Value to Reject
                        </label>
                        <TextField
                          disabled={!(options.CAssumeCheck[0].checked == ""?true:options.CAssumeCheck[0].checked)}
                          name='StrsNormalityReject'
                          value={options.CAssumeCheck[1].inputData==""?0.050:options.CAssumeCheck[1].inputData}
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
                        label='Constant Variance'
                        checked={options.CAssumeCheck[3].checked==""?true:options.CAssumeCheck[3].checked}
                        onChange={(e) => udpateOptions("CAssumeCheck", e, 3)}
                      />
                    </div>
                    <div style={{ margin: "7px 0 0 28px" }}>
                      <div className={contentStyles.columns}>
                        <label className={contentStyles.column}>
                          P Value to Reject
                        </label>
                        <TextField
                          disabled={!(options.CAssumeCheck[3].checked==""?true:options.CAssumeCheck[3].checked)}
                          name='StrEqualVarianceReject'
                          value={options.CAssumeCheck[4].inputData==""?0.050:options.CAssumeCheck[4].inputData}
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
                        label='Durbin-Watson'
                        checked={options.CAssumeCheck[5].checked==""?false:options.CAssumeCheck[5].checked}
                        onChange={(e) => udpateOptions("CAssumeCheck", e, 5)}
                      />
                    </div>
                    <div style={{ margin: "7px 0 0 28px" }}>
                      <div className={contentStyles.columns}>
                        <label className={contentStyles.column}>
                          Difference from 2.0
                        </label>
                        <TextField
                          name='StrDurbinWatson'
                          value={options.CAssumeCheck[6].inputData==""?0.500:options.CAssumeCheck[6].inputData}
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
              )}
              {options.CCriterionPolyReg[1].selectedData === 1 && (
                <PivotItem
                  headerText='Residuals'
                  onClick={() =>
                    help(
                      "wbasics",
                      "options_for_polynomial_regression__residuals",
                      ""
                    )
                  }>
                  <br />
                  <div className={contentStyles.residualSection}>
                    <div>
                      <div>
                        <Checkbox
                          label='Predicted Values'
                          checked={options.CResiduals[0].checked}
                          onChange={(e) => udpateOptions("CResiduals", e, 0)}
                        />
                        <div className={contentStyles.columns}>
                          <label className={contentStyles.residualCol}>
                            in Column
                          </label>
                          <Dropdown
                            disabled={!options.CResiduals[0].checked}
                            selectedKey={options.CResiduals[0].selectedData}
                            styles={dropdownStyles}
                            options={sampleTestOptions.residualOptions}
                            onChange={(e, item) =>
                              udpateOptions(
                                "CResiduals",
                                item,
                                0,
                                options.CResiduals[0]
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Checkbox
                          label='Raw'
                          checked={options.CResiduals[1].checked}
                          onChange={(e) => udpateOptions("CResiduals", e, 1)}
                        />
                        <div className={contentStyles.columns}>
                          <label className={contentStyles.residualCol}>
                            in Column
                          </label>
                          <Dropdown
                            disabled={!options.CResiduals[1].checked}
                            selectedKey={options.CResiduals[1].selectedData}
                            styles={dropdownStyles}
                            options={sampleTestOptions.residualOptions}
                            onChange={(e, item) =>
                              udpateOptions(
                                "CResiduals",
                                item,
                                1,
                                options.CResiduals[1]
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Checkbox
                          label='Standardized'
                          checked={options.CResiduals[2].checked==""?false:options.CResiduals[2].checked}
                          onChange={(e) => udpateOptions("CResiduals", e, 2)}
                        />
                        <div className={contentStyles.columns}>
                          <label className={contentStyles.residualCol}>
                            Flag Values &gt;
                          </label>
                          <div style={{ width: "100px" }}>
                            <TextField
                              name='StrStandardized'
                              value={options.CResiduals[2].inputData==""?2.500:options.CResiduals[2].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CResiduals",
                                  e,
                                  2,
                                  options.CResiduals[2]
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Checkbox
                          label='Report Flagged Values Only'
                          checked={options.CResiduals[3].checked}
                          onChange={(e) => udpateOptions("CResiduals", e, 3)}
                        />
                      </div>
                    </div>
                  </div>
                </PivotItem>
              )}
              {options.CCriterionPolyReg[1].selectedData === 1 && (
                <PivotItem
                  headerText='More Statistics'
                  onClick={() =>
                    help(
                      "wbasics",
                      "options_for_polynomial_regression__more_statistics",
                      ""
                    )
                  }>
                  <br />
                  <div className={contentStyles.residualSection}>
                    <div>
                      <fieldset
                        className={contentStyles.fieldSet}
                        style={{ marginBottom: "10px" }}>
                        <legend>Confidence Intervals</legend>
                        <Checkbox
                          label='Prediction'
                          checked={options.COtherResults[0].checked}
                          onChange={(e) => udpateOptions("COtherResults", e, 0)}
                        />
                        <div className={contentStyles.columns}>
                          <Checkbox
                            className={contentStyles.column}
                            label='Confidence'
                            checked={options.COtherResults[1].checked}
                            onChange={(e) =>
                              udpateOptions("COtherResults", e, 1)
                            }
                          />
                          <TextField
                            name='StrConfInterval'
                            value={options.COtherResults[1].inputData==""?95:options.COtherResults[1].inputData}
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
                        <div style={{ marginLeft: "28px" }}>
                          <label>Starting in Column</label>
                          <Dropdown
                            // disabled={
                            //   (
                            //     options.COtherResults[1].checked==""?false:options.COtherResults[1].checked ||
                            //     options.COtherResults[0].checked==""?false:options.COtherResults[0].checked
                            //   )
                            // }
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
                        label='PRESS Prediction Error'
                        checked={options.COtherResults[3].checked}
                        onChange={(e) => udpateOptions("COtherResults", e, 3)}
                      />
                      <Checkbox
                        className={contentStyles.column}
                        label='Standardized Coeffiecients'
                        checked={options.COtherResults[4].checked}
                        onChange={(e) => udpateOptions("COtherResults", e, 4)}
                      />
                    </div>
                  </div>
                </PivotItem>
              )}
              {options.CCriterionPolyReg[1].selectedData === 1 && (
                <PivotItem
                  headerText='Post Hoc Tests'
                  onClick={() =>
                    help(
                      "wbasics",
                      "options_for_polynomial_regression__post_hoc_tests",
                      ""
                    )
                  }
                  style={{ width: "60%" }}>
                  <br />
                  <div className={contentStyles.columns}>
                    <Checkbox
                      className={contentStyles.column}
                      label='Power'
                      checked={options.COtherTest[0].checked==""?true:options.COtherTest[0].checked}
                      onChange={(e) => udpateOptions("COtherTest", e, 0)}
                    />
                    <label style={{ flex: "0 0 30%" }}>Use Alpha Value</label>
                    <TextField
                      disabled={!(options.COtherTest[0].checked==""?true:options.COtherTest[0].checked)}
                      name='StrPowerAlpha'
                      value={options.COtherTest[1].inputData==""?0.050:options.COtherTest[1].inputData}
                      onChange={(e) =>
                        udpateOptions("COtherTest", e, 1, options.COtherTest[1])
                      }
                    />
                  </div>
                </PivotItem>
              )}
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
export default PolynomialRegression;
