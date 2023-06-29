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
  IChoiceGroupOption,
} from "office-ui-fabric-react";
import { Dropdown, IDropdownStyles } from "@fluentui/react/lib/Dropdown";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as sampleTestOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";
import {
  Stack,
  IStackProps,
  IStackStyles,
} from "office-ui-fabric-react/lib/Stack";
import { useTranslation } from "react-i18next";
import { useId, useBoolean } from "@uifabric/react-hooks";
const cancelIcon: IIconProps = { iconName: "Cancel" };
const helpIcon: IIconProps = { iconName: "Help" };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 100 },
};
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const stackStyles: IStackStyles = {
  root: {
    marginBottom: 10,
    marginTop: 10,
  },
};

// Token initialization
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};
const verticalInnerGapStackTokens: IStackTokens = {
  childrenGap: 20,
};

const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};

const tabKeys: string[] = [
  "CCoxCriterion",
  "CCoxResults",
  "CSurvivalGraphOptsPage",
];
const setIdKey = "coxStratifiedModel";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 110 },
};

const CoxStratifiedModel: React.FunctionComponent = ({
  isOpen,
  close,
  OpenHelpWindow,
  helpMenu,
  modalData
}) => {
  const { t } = useTranslation();
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

  const selectionMethodOptions: IChoiceGroupOption[] = [
    {
      key: "0",
      text: "Complete",
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div style={{ margin: "10px 28px" }}>
              <Checkbox
                disabled={options.CCoxCriterion[0].radioData !== "0"}
                className={contentStyles.column}
                label={t(
                  "Report\u00a0likelihood\u00a0values\u00a0of\u00a0each\u00a0iteration"
                )}
                checked={options.CCoxCriterion[1].checked}
                onChange={(e) => udpateOptions("CCoxCriterion", e, 1)}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "1",
      text: "Stepwise",
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className='ms-Grid' dir='ltr'>
              <Stack tokens={verticalGapStackTokens}>
                <div className='ms-Grid-row'>
                  <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                    <div style={{ display: "flex" }}>
                      <label style={{ width: "140px" }}>
                        {t("P-to-Enter")}
                      </label>
                      <TextField
                        disabled={options.CCoxCriterion[0].radioData !== "1"}
                        name='StrPtoEnter'
                        value={options.CCoxCriterion[2].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            2,
                            options.CCoxCriterion[2]
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                    <div style={{ display: "flex" }}>
                      <label style={{ width: "140px" }}>
                        {t("P-to-Remove")}
                      </label>
                      <TextField
                        disabled={options.CCoxCriterion[0].radioData !== "1"}
                        name='StrPtoRemove'
                        value={options.CCoxCriterion[3].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            3,
                            options.CCoxCriterion[3]
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className='ms-Grid-row'>
                  <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg12'>
                    <div style={{ display: "flex" }}>
                      <label style={{ width: "120px" }}>
                        {t("Maximum Steps")}
                      </label>
                      <TextField
                        disabled={options.CCoxCriterion[0].radioData !== "1"}
                        name='StrMaxSteps'
                        value={options.CCoxCriterion[4].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            4,
                            options.CCoxCriterion[4]
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </Stack>
            </div>
          </div>
        );
      },
    },
  ];
  const help = (a: string, b: string, c: string) => {
    OpenHelpWindow(a, b, c);
  };
  useEffect(() => {
    help(
      "wbasics",
      "options_for_cox_regression_stratified_model__criterion",
      ""
    );
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Criterion") {
      help(
        "wbasics",
        "options_for_cox_regression_stratified_model__criterion",
        ""
      );
    } else if (item.props.headerText == "Results") {
      help(
        "wbasics",
        "options_for_cox_regression_stratified_model__results",
        ""
      );
    } else if (item.props.headerText == "Graph Options") {
      help(
        "wbasics",
        "options_for_cox_regression_stratified_model__graph_options",
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
                    "options_for_cox_regression_proportional_hazard__criterion",
                    ""
                  )
                }>
                <div className='ms-Grid' dir='ltr'>
                  <Stack tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg8'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <fieldset className={contentStyles.fieldSet}>
                            <legend>Variable Selection Method</legend>
                            <ChoiceGroup
                              defaultSelectedKey={
                                options.CCoxCriterion[0].radioData
                              }
                              options={selectionMethodOptions}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CCoxCriterion",
                                  item,
                                  0,
                                  options.CCoxCriterion[0]
                                )
                              }
                            />
                          </fieldset>
                        </Stack>
                      </div>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg4'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <fieldset className={contentStyles.fieldSet}>
                            <legend>Convergence</legend>
                            <label>Tolerance</label>
                            <TextField
                              name='StrTolerance'
                              value={options.CCoxCriterion[5].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CCoxCriterion",
                                  e,
                                  5,
                                  options.CCoxCriterion[5]
                                )
                              }
                              styles={narrowTextFieldStyles}
                            />
                            <label>Step Length</label>
                            <TextField
                              name='StrStepLength'
                              value={options.CCoxCriterion[6].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CCoxCriterion",
                                  e,
                                  6,
                                  options.CCoxCriterion[6]
                                )
                              }
                              styles={narrowTextFieldStyles}
                            />
                            <label>Maximum Iteration</label>
                            <TextField
                              name='StrsMaxIterations'
                              value={options.CCoxCriterion[7].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CCoxCriterion",
                                  e,
                                  7,
                                  options.CCoxCriterion[7]
                                )
                              }
                              styles={narrowTextFieldStyles}
                            />
                          </fieldset>
                        </Stack>
                      </div>
                    </div>
                  </Stack>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Results'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_cox_regression_proportional_hazard__results",
                    ""
                  )
                }>
                <div className='ms-Grid' dir='ltr'>
                  <Stack tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <Checkbox
                            className={contentStyles.column}
                            label={t(
                              "Descriptive\u00a0Statistics\u00a0for\u00a0Covariates"
                            )}
                            checked={options.CCoxResults[0].checked}
                            onChange={(e) => udpateOptions("CCoxResults", e, 0)}
                          />
                          <Checkbox
                            className={contentStyles.column}
                            label='Covariance Matrix'
                            checked={options.CCoxResults[1].checked}
                            onChange={(e) => udpateOptions("CCoxResults", e, 1)}
                          />
                          <Checkbox
                            label={t("Survival\u00a0Table")}
                            checked={options.CCoxResults[2].checked}
                            onChange={(e) => udpateOptions("CCoxResults", e, 2)}
                          />
                          <div className='tryFlex'>
                            <label style={{ marginRight: "10px" }}>
                              {t("Covariate\u00a0values")}
                            </label>
                            <Dropdown
                              disabled={!options.CCoxResults[2].checked}
                              selectedKey={options.CCoxResults[2].selectedData}
                              styles={dropdownStyles}
                              options={sampleTestOptions.covariateValues}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CCoxResults",
                                  item,
                                  2,
                                  options.CCoxResults[2]
                                )
                              }
                            />
                          </div>
                          <div className='tryFlex'>
                            <label style={{ marginRight: "10px" }}>
                              {t("Confidence\u00a0Level")}:
                            </label>
                            <TextField
                              suffix='%'
                              name='StrConfLevel'
                              value={options.CCoxResults[3].inputData}
                              onChange={(e) =>
                                udpateOptions(
                                  "CCoxResults",
                                  e,
                                  3,
                                  options.CCoxResults[3]
                                )
                              }
                            />
                          </div>
                        </Stack>
                      </div>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <div className='tryFlex'>
                            <label style={{ marginRight: "10px" }}>
                              Time Units
                            </label>
                            <Dropdown
                              selectedKey={options.CCoxResults[4].selectedData}
                              styles={dropdownStyles}
                              options={sampleTestOptions.timeUnits}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CCoxResults",
                                  item,
                                  4,
                                  options.CCoxResults[4]
                                )
                              }
                            />
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </Stack>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Graph Options'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_cox_regression_proportional_hazard__graph_options",
                    ""
                  )
                }>
                <div className='ms-Grid' dir='ltr'>
                  <Stack tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <fieldset className={contentStyles.fieldSet}>
                            <legend>Status Symbols</legend>
                            <div style={{ display: "flex" }}>
                              <Stack
                                horizontal
                                tokens={horizontalGapStackTokens}>
                                <Checkbox
                                  label='Censored'
                                  checked={
                                    options.CSurvivalGraphOptsPage[0].checked
                                  }
                                  onChange={(e) =>
                                    udpateOptions(
                                      "CSurvivalGraphOptsPage",
                                      e,
                                      0
                                    )
                                  }
                                />
                                <Checkbox
                                  label='Failures'
                                  checked={
                                    options.CSurvivalGraphOptsPage[1].checked
                                  }
                                  onChange={(e) =>
                                    udpateOptions(
                                      "CSurvivalGraphOptsPage",
                                      e,
                                      1
                                    )
                                  }
                                />
                              </Stack>
                            </div>
                          </fieldset>
                        </Stack>
                      </div>

                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack tokens={verticalInnerGapStackTokens}>
                          <div className='tryFlex'>
                            <label style={{ marginRight: "10px" }}>
                              {t("Group\u00a0Color")}
                            </label>
                            <Dropdown
                              selectedKey={
                                options.CSurvivalGraphOptsPage[2].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.groupColors}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CSurvivalGraphOptsPage",
                                  item,
                                  2,
                                  options.CSurvivalGraphOptsPage[2]
                                )
                              }
                            />
                          </div>
                          <div className='tryFlex'>
                            <label style={{ marginRight: "10px" }}>
                              {t("Survical\u00a0Scale")}
                            </label>
                            <Dropdown
                              selectedKey={
                                options.CSurvivalGraphOptsPage[3].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.survivalScale}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CSurvivalGraphOptsPage",
                                  item,
                                  3,
                                  options.CSurvivalGraphOptsPage[3]
                                )
                              }
                            />
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </Stack>
                </div>
              </PivotItem>
            </Pivot>
          )}
        </div>
        <div className={contentStyles.footer}>
          <div className='ms-Grid' dir='ltr'>
            <div className='ms-Grid-row'>
              <OptionsFooter
                close={close}
                updateRedis={updateDataInRedis}></OptionsFooter>
            </div>
          </div>
        </div>

        {/* <div className={contentStyles.body}>
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
                    "options_for_cox_regression_stratified_model__criterion",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0  70%" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Variable Selection Method</legend>
                    <ChoiceGroup
                      defaultSelectedKey={options.CCoxCriterion[0].radioData}
                      options={selectionMethodOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CCoxCriterion",
                          item,
                          0,
                          options.CCoxCriterion[0]
                        )
                      }
                    />
                  </fieldset>
                </div>
                <div style={{ flex: "0 0  30%" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Convergence</legend>
                    <label>Tolerance</label>
                    <div style={{ width: "100px", margin: "5px 10px" }}>
                      <TextField
                        name='StrTolerance'
                        value={options.CCoxCriterion[5].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            5,
                            options.CCoxCriterion[5]
                          )
                        }
                      />
                    </div>
                    <label>Step Length</label>
                    <div style={{ width: "100px", margin: "5px 10px" }}>
                      <TextField
                        name='StrStepLength'
                        value={options.CCoxCriterion[6].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            6,
                            options.CCoxCriterion[6]
                          )
                        }
                      />
                    </div>
                    <label>Maximum Iteration</label>
                    <div style={{ width: "100px", margin: "5px 10px" }}>
                      <TextField
                        name='StrsMaxIterations'
                        value={options.CCoxCriterion[7].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxCriterion",
                            e,
                            7,
                            options.CCoxCriterion[7]
                          )
                        }
                      />
                    </div>
                  </fieldset>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Results'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_cox_regression_stratified_model__results",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0 60%" }}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Descriptive Statistics for Covariates'
                    checked={options.CCoxResults[0].checked}
                    onChange={(e) => udpateOptions("CCoxResults", e, 0)}
                  />
                  <Checkbox
                    className={contentStyles.column}
                    label='Covariance Matrix'
                    checked={options.CCoxResults[1].checked}
                    onChange={(e) => udpateOptions("CCoxResults", e, 1)}
                  />
                  <Checkbox
                    label='Survival Table'
                    checked={options.CCoxResults[2].checked}
                    onChange={(e) => udpateOptions("CCoxResults", e, 2)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 30%" }}>Covariate values</label>
                    <Dropdown
                      disabled={!options.CCoxResults[2].checked}
                      selectedKey={options.CCoxResults[2].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.covariateValues}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CCoxResults",
                          item,
                          2,
                          options.CCoxResults[2]
                        )
                      }
                    />
                  </div>
                  <div className={contentStyles.columns}>
                    <label style={{ flex: "0 0 30%" }}>Confidence Level:</label>
                    <div style={{ width: "100px" }}>
                      <TextField
                        name='StrConfLevel'
                        value={options.CCoxResults[3].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CCoxResults",
                            e,
                            3,
                            options.CCoxResults[3]
                          )
                        }
                      />
                    </div>
                    %
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div className={contentStyles.columns}>
                    <label className={contentStyles.column}>Time Units</label>
                    <Dropdown
                      selectedKey={options.CCoxResults[4].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.timeUnits}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CCoxResults",
                          item,
                          4,
                          options.CCoxResults[4]
                        )
                      }
                    />
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Graph Options'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_cox_regression_stratified_model__graph_options",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div className={contentStyles.column}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Status Symbols</legend>
                    <div className={contentStyles.columns}>
                      <div style={{ flex: "0 0 50%" }}>
                        <Checkbox
                          label='Censored'
                          checked={options.CSurvivalGraphOptsPage[0].checked}
                          onChange={(e) =>
                            udpateOptions("CSurvivalGraphOptsPage", e, 0)
                          }
                        />
                      </div>
                      <Checkbox
                        label='Failures'
                        checked={options.CSurvivalGraphOptsPage[1].checked}
                        onChange={(e) =>
                          udpateOptions("CSurvivalGraphOptsPage", e, 1)
                        }
                      />
                    </div>
                  </fieldset>
                </div>
                <div>
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 40%" }}>Group Color</label>
                    <Dropdown
                      selectedKey={
                        options.CSurvivalGraphOptsPage[2].selectedData
                      }
                      styles={dropdownStyles}
                      options={sampleTestOptions.groupColors}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CSurvivalGraphOptsPage",
                          item,
                          2,
                          options.CSurvivalGraphOptsPage[2]
                        )
                      }
                    />
                  </div>
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 40%" }}>Survical Scale</label>
                    <Dropdown
                      selectedKey={
                        options.CSurvivalGraphOptsPage[3].selectedData
                      }
                      styles={dropdownStyles}
                      options={sampleTestOptions.survivalScale}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CSurvivalGraphOptsPage",
                          item,
                          3,
                          options.CSurvivalGraphOptsPage[3]
                        )
                      }
                    />
                  </div>
                </div>
              </PivotItem>
            </Pivot>
          )}
          <OptionsFooter
            close={close}
            updateRedis={updateDataInRedis}></OptionsFooter>
        </div> */}
      </Modal>
    </div>
  );
};
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column",
    // alignItems: 'stretch',
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
  fieldSet: {
    border: "1px solid rgb(211, 211, 218, 0.7)",
    marginBottom: "10px",
    marginTop: "10px",
  },
  body: {
    flex: "1 1 auto",
    padding: "0 24px 0",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
  footer: {
    padding: "0 24px 20px",
    marginBottom: 10,
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "0px",
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

export default CoxStratifiedModel;
