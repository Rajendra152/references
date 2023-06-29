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
import * as sampleTestOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";
import { useTranslation } from "react-i18next";

import {
  Stack,
  IStackProps,
  IStackStyles,
} from "office-ui-fabric-react/lib/Stack";
import { useId, useBoolean } from "@uifabric/react-hooks";
const cancelIcon: IIconProps = { iconName: "Cancel" };
const helpIcon: IIconProps = { iconName: "Help" };
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

const tabKeys: string[] = ["CSurvivalGraphOptsPage", "CSurvivalResultsPage"];
const setIdKey = "survivalSingleGroup";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const SurvivalSingleGroup: React.FunctionComponent = ({
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
    help("wbasics", "options_for_survival_single_group__graph_options", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Graph Options") {
      help("wbasics", "options_for_survival_single_group__graph_options", "");
    } else if (item.props.headerText == "Results") {
      help("wbasics", "options_for_single_group_survival__results", "");
    }
  };
  const titleId = useId("title");
  const { t } = useTranslation();

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
                headerText='Graph Options'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_survival_single_group__graph_options",
                    ""
                  )
                }>
                <div className='ms-Grid' dir='ltr'>
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack
                          styles={stackStyles}
                          tokens={verticalInnerGapStackTokens}>
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
                          <Checkbox
                            label={t("Additional\u00a0Plot\u00a0Statistics")}
                            checked={options.CSurvivalGraphOptsPage[2].checked}
                            onChange={(e) =>
                              udpateOptions("CSurvivalGraphOptsPage", e, 2)
                            }
                          />
                          <div style={{ display: "flex" }}>
                            <label style={{ flex: "0 0 25%" }}>Type</label>
                            <Dropdown
                              disabled={
                                !options.CSurvivalGraphOptsPage[2].checked
                              }
                              selectedKey={
                                options.CSurvivalGraphOptsPage[3].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.plotStatTypes}
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
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack
                          styles={stackStyles}
                          tokens={verticalInnerGapStackTokens}>
                          <div style={{ display: "flex" }}>
                            <label style={{ flex: "0 0 40%" }}>
                              Group Color
                            </label>
                            <Dropdown
                              selectedKey={
                                options.CSurvivalGraphOptsPage[4].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.groupColors}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CSurvivalGraphOptsPage",
                                  item,
                                  4,
                                  options.CSurvivalGraphOptsPage[4]
                                )
                              }
                            />
                          </div>
                          <div style={{ display: "flex" }}>
                            <label style={{ flex: "0 0 40%" }}>
                              Survival Scale
                            </label>
                            <Dropdown
                              selectedKey={
                                options.CSurvivalGraphOptsPage[5].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.survivalScale}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CSurvivalGraphOptsPage",
                                  item,
                                  5,
                                  options.CSurvivalGraphOptsPage[5]
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
                headerText='Results'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_single_group_survival__results",
                    ""
                  )
                }>
                <div className='ms-Grid' dir='ltr'>
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack
                          styles={stackStyles}
                          tokens={verticalInnerGapStackTokens}>
                          <fieldset className={contentStyles.fieldSet}>
                            <legend>Report</legend>
                            <Stack tokens={verticalInnerGapStackTokens}>
                              <Checkbox
                                label={t(
                                  "Cumulative\u00a0Probability\u00a0Table"
                                )}
                                checked={
                                  options.CSurvivalResultsPage[0].checked
                                }
                                onChange={(e) =>
                                  udpateOptions("CSurvivalResultsPage", e, 0)
                                }
                              />
                              <Checkbox
                                disabled={true}
                                label={t(
                                  "P\u00a0values\u00a0for\u00a0multiple\u00a0comparisons"
                                )}
                                checked={
                                  options.CSurvivalResultsPage[1].checked
                                }
                                onChange={(e) =>
                                  udpateOptions("CSurvivalResultsPage", e, 1)
                                }
                              />
                            </Stack>
                          </fieldset>
                          <fieldset className={contentStyles.fieldSet}>
                            <legend>Worksheet</legend>
                            <Stack tokens={verticalInnerGapStackTokens}>
                              <Checkbox
                                label='95% Confidence Intervals'
                                checked={
                                  options.CSurvivalResultsPage[2].checked
                                }
                                onChange={(e) =>
                                  udpateOptions("CSurvivalResultsPage", e, 2)
                                }
                              />
                            </Stack>
                          </fieldset>
                        </Stack>
                      </div>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg6'>
                        <Stack tokens={verticalGapStackTokens}>
                          <div style={{ display: "flex" }}>
                            <label style={{ marginRight: "10px" }}>
                              Time Units:
                            </label>
                            <Dropdown
                              selectedKey={
                                options.CSurvivalResultsPage[3].selectedData
                              }
                              styles={dropdownStyles}
                              options={sampleTestOptions.timeUnits}
                              onChange={(e, item) =>
                                udpateOptions(
                                  "CSurvivalResultsPage",
                                  item,
                                  3,
                                  options.CSurvivalResultsPage[3]
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
export default SurvivalSingleGroup;
