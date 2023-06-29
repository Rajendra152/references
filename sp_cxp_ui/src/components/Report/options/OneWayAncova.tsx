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

const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: "Cancel" };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 },
};
const tabKeys: string[] = [
  "CAssumeCheck",
  "CResiduals",
  "CAncovaResults",
  "COtherTest",
];
const setIdKey = "oneWayAncova";
const helpIcon: IIconProps = { iconName: "Help" };
const OneWayAncova: React.FunctionComponent = ({
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
    help("wbasics", "options_for_one_way_ancova__assumption_checking", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Assumption Checking") {
      help("wbasics", "options_for_one_way_ancova__assumption_checking", "");
    } else if (item.props.headerText == "Residuals") {
      help("wbasics", "options_for_one_way_ancova__residuals", "");
    } else if (item.props.headerText == "More Results") {
      help("wbasics", "options_for_one_way_ancova__more_results", "");
    } else if (item.props.headerText == "Post Hoc Tests") {
      help("wbasics", "options_for_one_way_ancova__post_hoc_tests", "");
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
                headerText='Assumption Checking'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_one_way_ancova__assumption_checking",
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
                              "Kolmogorov-Smimov with Lilliefors correction",
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
                      label='Equal Variance'
                      onClick={() =>
                        help(
                          "wbasics",
                          "options_for_anova_on_ranks__assumption",
                          ""
                        )
                      }
                      checked={options.CAssumeCheck[3].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 3)}
                    />
                  </div>
                  <div style={{ margin: "7px 0 0 28px" }}>
                    <div className={contentStyles.columns}>
                      <label className={contentStyles.column}>
                        P Value to Reject
                      </label>
                      <TextField
                        disabled={!options.CAssumeCheck[3].checked}
                        name='StrsNormalityReject'
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
                      label='Equality of Slopes'
                      checked={options.CAssumeCheck[5].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 5)}
                    />
                  </div>
                  <div style={{ margin: "7px 0 0 28px" }}>
                    <Checkbox
                      label='Report Parameter Statistics'
                      disabled={!options.CAssumeCheck[5].checked}
                      checked={options.CAssumeCheck[6].checked}
                      onChange={(e) => udpateOptions("CAssumeCheck", e, 6)}
                    />
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Residuals'
                onClick={() =>
                  help("wbasics", "options_for_one_way_ancova__residuals", "")
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
                        checked={options.CResiduals[2].checked}
                        onChange={(e) => udpateOptions("CResiduals", e, 2)}
                      />
                      <div className={contentStyles.columns}>
                        <label className={contentStyles.residualCol}>
                          Flag Values &gt;{" "}
                        </label>
                        <div style={{ width: "100px" }}>
                          <TextField
                            name='StrStandardized'
                            value={options.CResiduals[2].inputData}
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
                    <div className={contentStyles.column}>
                      <Checkbox
                        label='Studentized'
                        checked={options.CResiduals[3].checked}
                        onChange={(e) => udpateOptions("CResiduals", e, 3)}
                      />
                    </div>
                    <div>
                      <Checkbox
                        label='Studentized Deleted'
                        checked={options.CResiduals[4].checked}
                        onChange={(e) => udpateOptions("CResiduals", e, 4)}
                      />
                      <div className={contentStyles.columns}>
                        <label className={contentStyles.residualCol}>
                          Flag Values &gt;{" "}
                        </label>
                        <div style={{ width: "100px" }}>
                          <TextField
                            name='StrStudentizedDeleted'
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
                    </div>
                    <div>
                      <Checkbox
                        label='Report Flagged Values Only'
                        checked={options.CResiduals[5].checked}
                        onChange={(e) => udpateOptions("CResiduals", e, 5)}
                      />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='More Results'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_one_way_ancova__more_results",
                    ""
                  )
                }>
                <br />
                <div className={contentStyles.residualSection}>
                  <div>
                    <fieldset className={contentStyles.fieldSet}>
                      <legend>Confidence Intervals for Model</legend>
                      <div className={contentStyles.columns}>
                        <Checkbox
                          className={contentStyles.column}
                          label='Confidence'
                          checked={options.CAncovaResults[0].checked}
                          onChange={(e) =>
                            udpateOptions("CAncovaResults", e, 0)
                          }
                        />
                        <Checkbox
                          label='Prediction'
                          checked={options.CAncovaResults[1].checked}
                          onChange={(e) =>
                            udpateOptions("CAncovaResults", e, 1)
                          }
                        />
                      </div>
                      <div style={{ marginLeft: "28px" }}>
                        <label>Starting in</label>
                        <Dropdown
                          disabled={
                            !(
                              options.CAncovaResults[1].checked ||
                              options.CAncovaResults[0].checked
                            )
                          }
                          selectedKey={options.CAncovaResults[2].selectedData}
                          styles={dropdownStyles}
                          options={sampleTestOptions.residualOptions}
                          onChange={(e, item) =>
                            udpateOptions(
                              "CAncovaResults",
                              item,
                              2,
                              options.CAncovaResults[2]
                            )
                          }
                        />
                      </div>
                    </fieldset>
                    <div className={contentStyles.columns}>
                      <label style={{ marginRight: "10px" }}>
                        Confidence Level:{" "}
                      </label>
                      <div style={{ width: "100px" }}>
                        <TextField
                          name='StrConfLevel'
                          value={options.CAncovaResults[3].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "CAncovaResults",
                              e,
                              3,
                              options.CAncovaResults[3]
                            )
                          }
                        />
                      </div>
                      <label>%</label>
                    </div>
                    <Checkbox
                      className={contentStyles.column}
                      label='Summary of Covariates'
                      checked={options.CAncovaResults[4].checked}
                      onChange={(e) => udpateOptions("CAncovaResults", e, 4)}
                    />
                    <Checkbox
                      className={contentStyles.column}
                      label='Covariance Matrix'
                      checked={options.CAncovaResults[5].checked}
                      onChange={(e) => udpateOptions("CAncovaResults", e, 5)}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <div>
                      <Checkbox
                        label='Parameter Statistics'
                        checked={options.CAncovaResults[6].checked}
                        onChange={(e) => udpateOptions("CAncovaResults", e, 6)}
                      />
                      <div style={{ marginLeft: "25px" }}>
                        <Checkbox
                          disabled={!options.CAncovaResults[6].checked}
                          label='Variance Inflation Factor'
                          checked={options.CAncovaResults[7].checked}
                          onChange={(e) =>
                            udpateOptions("CAncovaResults", e, 7)
                          }
                        />
                        <div style={{ display: "flex" }}>
                          <label className={contentStyles.residualCol}>
                            Flag Values &gt;{" "}
                          </label>
                          <div style={{ width: "100px" }}>
                            <TextField
                              disabled={!options.CAncovaResults[6].checked}
                              name='StrVIFThreshold'
                              value={options.CAncovaResults[7].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CAncovaResults",
                                  e,
                                  7,
                                  options.CAncovaResults[7]
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        label='Leverage'
                        checked={options.CAncovaResults[8].checked}
                        onChange={(e) => udpateOptions("CAncovaResults", e, 8)}
                      />
                      <div style={{ marginLeft: "25px" }}>
                        <div style={{ display: "flex" }}>
                          <label className={contentStyles.residualCol}>
                            Flag Values &gt;{" "}
                          </label>
                          <div style={{ width: "100px" }}>
                            <TextField
                              disabled={!options.CAncovaResults[9].checked}
                              name='StrLeverageThreshold'
                              defaultValue="2.000"
                              value={options.CAncovaResults[9].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CAncovaResults",
                                  e,
                                  9,
                                  options.CAncovaResults[9]
                                )
                              }
                            />
                          </div>
                        </div>
                        <label style={{ marginLeft: "28px" }}>
                          times the expected value
                        </label>
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        label='Cooks Distance'
                        checked={options.CAncovaResults[10].checked}
                        onChange={(e) => udpateOptions("CAncovaResults", e, 10)}
                      />
                      <div style={{ marginLeft: "25px" }}>
                        <div style={{ display: "flex" }}>
                          <label className={contentStyles.residualCol}>
                            Flag Values &gt;{" "}
                          </label>
                          <div style={{ width: "100px" }}>
                            <TextField
                              disabled={!options.CAncovaResults[10].checked}
                              name='StrLeverageThreshold'
                              value={options.CAncovaResults[10].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CAncovaResults",
                                  e,
                                  10,
                                  options.CAncovaResults[10]
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        label='Report Flagged Values Only'
                        checked={options.CAncovaResults[11].checked}
                        onChange={(e) => udpateOptions("CAncovaResults", e, 11)}
                      />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Post Hoc Tests'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_one_way_ancova__post_hoc_tests",
                    ""
                  )
                }
                className={contentStyles.resultSection}>
                <br />
                <div className={contentStyles.columns}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Power'
                    checked={options.COtherTest[0].checked}
                    onChange={(e) => udpateOptions("COtherTest", e, 0)}
                  />
                  <label style={{ flex: "0 0 30%" }}>Use Alpha Value</label>
                  <TextField
                    disabled={!options.COtherTest[0].checked}
                    name='StrPowerAlpha'
                    value={options.COtherTest[1].inputData}
                    onChange={(e) =>
                      udpateOptions("COtherTest", e, 1, options.COtherTest[1])
                    }
                  />
                </div>
                <fieldset className={contentStyles.fieldSet}>
                  <legend>Multiple Comparisons</legend>
                  <ChoiceGroup
                    defaultSelectedKey={options.COtherTest[2].radioData}
                    options={[
                      { key: "0", text: "Always Perform" },
                      {
                        key: "1",
                        text:
                          "Only When the P Value for an ANCOVA Effect is Significant",
                      },
                    ]}
                    onChange={(e, item) =>
                      udpateOptions(
                        "COtherTest",
                        item,
                        2,
                        options.COtherTest[2]
                      )
                    }
                  />
                  <label style={{ marginTop: "10px", display: "inline-block" }}>
                    The significance level P Values is found on the Report Tab
                    of the Options dialog that is accessed from the Main Button
                  </label>
                </fieldset>
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
  resultSection: {
    width: "60%",
    margin: "5px 10px 20px 10px",
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
export default OneWayAncova;
