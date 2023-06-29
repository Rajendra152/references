import React, { useState, useEffect } from "react";
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  ContextualMenu,
  IconButton,
  IIconProps,
} from "office-ui-fabric-react";
import { Dropdown, IDropdownStyles } from "@fluentui/react/lib/Dropdown";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import {
  getDataSetByKey,
  updatDatasetInRedis,
  createNewClient,
} from "../../../services/RedisServices";
import * as freqOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";

const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: "Cancel" };
const helpIcon: IIconProps = { iconName: "Help" };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100, paddingTop: "5px" },
};

const client = createNewClient();
const os = require("os");

const OneWayFrequencyTables: React.FunctionComponent = ({
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
  const setFrequencyOptions = (reportOptions: any) => {
    setOptions(reportOptions);
  };

  const udpateOptions = (
    key: string,
    event: any,
    index: number,
    option?: any
  ) => {
    const reportOptions = JSON.parse(JSON.stringify(options));
    const optionsData = reportOptions[key];
    if (option && option.input) {
      if (isNaN(event.target.value) == true) {
        alert("You must enter a numeric value.")
        optionsData[index].inputData = optionsData[index].inputData
      } else {
        optionsData[index].inputData = event.target.value;
      }
    } else if (option && option.dropdown) {
      optionsData[index].selectedData = event.key;
    } else {
      optionsData[index].checked = event.target.checked;
    }
    reportOptions[key] = optionsData;
    setFrequencyOptions(reportOptions);
  };

  const selectAll = (key: string) => {
    const reportOptions = JSON.parse(JSON.stringify(options));
    reportOptions[key].map((option: any) => {
      option.checked = true;
      return option;
    });
    setFrequencyOptions(reportOptions);
  };

  const uncheckAll = (key: string) => {
    const reportOptions = JSON.parse(JSON.stringify(options));
    reportOptions[key].map((option: any) => {
      option.checked = false;
      return option;
    });
    setFrequencyOptions(reportOptions);
  };

  const getOptionsData = async () => {
    let optionsData = await getDataSetByKey(os.userInfo().username, client);
    setOptionsData(optionsData);
    const data = optionsData[freqOptions.statOptionIds.onewayfrequencytables];
    const stats = data["CFreqTablesResults"];
    console.log(stats);
    let oneWayFreqOptions: any = JSON.parse(
      JSON.stringify(freqOptions.oneWayFrequencyTables)
    );
    Object.keys(oneWayFreqOptions).forEach((key: any) => {
      oneWayFreqOptions[key].map((option: any) => {
        if (option.property) {
          option.checked = stats[option.property];
        }
        if (option.input) {
          option.inputData = stats[option.inputProperty];
        }
        if (option.dropdown) {
          option.selectedData = stats[option.dropdownProperty];
        }
        return option;
      });
    });
    setFrequencyOptions(oneWayFreqOptions);
  };

  const updateDataInRedis = async () => {
    const oneWayFreqData =
      optionsData[freqOptions.statOptionIds.onewayfrequencytables];
    const stats = oneWayFreqData["CFreqTablesResults"];
    Object.keys(options).forEach((key: any) => {
      (options[key] || []).map((option: any) => {
        if (option.property) {
          stats[option.property] = option.checked;
        }
        if (option.input) {
          stats[option.inputProperty] = option.inputData;
        }
        if (option.dropdown) {
          stats[option.dropdownProperty] = option.selectedData;
        }
      });
    });
    oneWayFreqData["CFreqTablesResults"] = stats;
    await updatDatasetInRedis(client, optionsData, os.userInfo().username);
    close();
  };

  const help = (a: string, b: string, c: string) => {
    OpenHelpWindow(a, b, c);
  };
  useEffect(() => {
    help("wbasics", "", ""); getOptionsData();
  }, []);

  return (
    <div>
      <Modal
        titleAriaId={"title1"}
        isOpen={isOpen}
        onDismiss={close}
        isModeless={false}
        isBlocking={true}
        isDarkOverlay={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}>
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
          <Pivot
            aria-label='Report Options Configuration'
            className='FormatContainer'>
            {Object.keys(options).length && (
              <PivotItem headerText='Results' className={contentStyles.columns}>
                <br />
                <div className={contentStyles.column}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Tables</legend>
                    <div className={contentStyles.section}>
                      {(options.tables || []).map(
                        (option: any, index: number) => {
                          return (
                            <div
                              className={
                                index == 2
                                  ? contentStyles.tableLastRow
                                  : contentStyles.column
                              }
                              key={option.label}>
                              <Checkbox
                                label={option.label}
                                checked={option.checked}
                                onChange={(e) =>
                                  udpateOptions("tables", e, index)
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </fieldset>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Proportions</legend>
                    <div className={contentStyles.gridSection}>
                      <Checkbox
                        label='Confidence'
                        checked={options.proportions[0].checked}
                        onChange={(e) => udpateOptions("proportions", e, 0)}
                      />

                      <TextField
                        suffix='%'
                        disabled={!options.proportions[0].checked}
                        name='Confidenceinput'
                        value={options.proportions[0].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "proportions",
                            e,
                            0,
                            options.proportions[0]
                          )
                        }
                      />

                      <div>
                        <label>Method</label>
                      </div>
                      <div>
                        <Dropdown
                          selectedKey={options.proportions[1].selectedData}
                          disabled={!options.proportions[0].checked}
                          styles={dropdownStyles}
                          options={freqOptions.methodOptions}
                          onChange={(e, item) =>
                            udpateOptions(
                              "proportions",
                              item,
                              1,
                              options.proportions[1]
                            )
                          }
                        />
                      </div>
                      <div>
                        <Checkbox
                          label='Chi-square'
                          checked={options.proportions[2].checked}
                          onChange={(e) => udpateOptions("proportions", e, 2)}
                        />
                      </div>
                      <div className='tryFlex'>
                        <label>Sig. Level</label>
                        <TextField
                          disabled={!options.proportions[2].checked}
                          name='siglevel'
                          value={options.proportions[3].inputData}
                          onChange={(e) =>
                            udpateOptions(
                              "proportions",
                              e,
                              3,
                              options.proportions[3]
                            )
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className={contentStyles.column}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Summary Statistics</legend>
                    <div className={contentStyles.section}>
                      {(options.summaryStatistics || []).map(
                        (option: any, index: number) => {
                          return (
                            <div
                              key={option.label}
                              className={contentStyles.column}>
                              <Checkbox
                                label={option.label}
                                checked={option.checked}
                                onChange={(e) =>
                                  udpateOptions("summaryStatistics", e, index)
                                }
                              />
                              {option.input && (
                                <TextField
                                  key={option.label + "input"}
                                  name={`ci_mean`}
                                  value={option.inputData}
                                  onChange={(e) =>
                                    udpateOptions(
                                      "summaryStatistics",
                                      e,
                                      index,
                                      option
                                    )
                                  }
                                />
                              )}
                              {option.dropdown && (
                                <Dropdown
                                  selectedKey={option.selectedData}
                                  key={option.label + "dropdown"}
                                  styles={dropdownStyles}
                                  options={freqOptions.percentileOptions}
                                  onChange={(e, item) =>
                                    udpateOptions(
                                      "summaryStatistics",
                                      item,
                                      index,
                                      option
                                    )
                                  }
                                />
                              )}
                            </div>
                          );
                        }
                      )}
                      <div>
                        <DefaultButton
                          style={{ marginRight: "20px" }}
                          text='Select All'
                          className={`text-block`}
                          onClick={() => selectAll("summaryStatistics")}
                          allowDisabledFocus
                        />
                        <DefaultButton
                          text='Clear'
                          className={`text-block`}
                          onClick={() => uncheckAll("summaryStatistics")}
                          allowDisabledFocus
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </PivotItem>
            )}
          </Pivot>
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
    width: '600px'
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
    margin: "15px",
  },
  column: {
    flex: "0 0 50%",
    marginBottom: "15px",
  },
  fieldSet: {
    border: "1px solid rgb(211, 211, 218, 0.7)",
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
  },
  tableLastRow: {
    flex: "0 0 100%",
  },
  gridSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
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
export default OneWayFrequencyTables;
