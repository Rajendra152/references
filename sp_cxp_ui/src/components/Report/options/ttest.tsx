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
const helpIcon: IIconProps = { iconName: "Help" };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};
const tabKeys: string[] = ["CAssumeCheck", "CResultsTTest", "COtherTest"];
const setIdKey = "TTest";

const TTest: React.FunctionComponent = ({
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
    help("wbasics", "options_for_t_test__assumption_checking", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Assumption Checking") {
      help("wbasics", "options_for_t_test__assumption_checking", "");
    } else if (item.props.headerText == "Results") {
      help("wbasics", "options_for_t_test__results", "");
    } else if (item.props.headerText == "Post Hoc Tests") {
      help("wbasics", "options_for_t_test__post_hoc_tests", "");
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
                  help("wbasics", "options_for_t_test__assumption_checking", "")
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
                          { key: "0", text: "Shapiro-Wilk (sample size <= 5000)" },
                          { key: "1", text: "Kolmogorov-Smimov with Lilliefors correction" },
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
                            options.CAssumeCheck[1]
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Results'
                onClick={() =>
                  help("wbasics", "options_for_t_test__results", "")
                }>
                <br />
                <fieldset className={contentStyles.fieldSet}>
                  <legend>Report</legend>
                  <div className={contentStyles.columns}>
                    <div style={{ flex: "0 0 25%" }}>
                      <Checkbox
                        label='Summary Table'
                        checked={options.CResultsTTest[0].checked}
                        onChange={(e) => udpateOptions("CResultsTTest", e, 0)}
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <Checkbox
                        className={contentStyles.column}
                        label='Confidence Intervals'
                        checked={options.CResultsTTest[1].checked}
                        onChange={(e) => udpateOptions("CResultsTTest", e, 1)}
                      />
                      <TextField
                        disabled={!options.CResultsTTest[1].checked}
                        name='StrConfInterval'
                        value={options.CResultsTTest[1].inputData}
                        onChange={(e) =>
                          udpateOptions(
                            "CResultsTTest",
                            e,
                            1,
                            options.CResultsTTest[1]
                          )
                        }
                      />
                      <label style={{ margin: "5px 7px" }}>%</label>
                    </div>
                  </div>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
                    <fieldset className={contentStyles.fieldSet}>
                      <legend>Tests for Equal Means</legend>
                      <ChoiceGroup
                        defaultSelectedKey={options.CResultsTTest[2].radioData}
                        options={[
                          {
                            key: "0",
                            text: "Student's t-test (Equal variances assumed)",
                          },
                          {
                            key: "1",
                            text:
                              "Welch's t-test (Equal variances not assumed)",
                          },
                          { key: "2", text: "Both" },
                        ]}
                        onChange={(e, item) =>
                          udpateOptions(
                            "CResultsTTest",
                            item,
                            2,
                            options.CResultsTTest[2]
                          )
                        }
                      />
                    </fieldset>
                    <fieldset className={contentStyles.fieldSet}>
                      <legend>P-values</legend>
                      <ChoiceGroup
                        defaultSelectedKey={options.CResultsTTest[3].radioData}
                        options={[
                          { key: "0", text: "Two-tailed" },
                          { key: "1", text: "One-tailed" },
                          { key: "2", text: "Both" },
                        ]}
                        onChange={(e, item) =>
                          udpateOptions(
                            "CResultsTTest",
                            item,
                            3,
                            options.CResultsTTest[3]
                          )
                        }
                      />
                    </fieldset>
                  </div>
                </fieldset>
                <div className={contentStyles.columns}>
                  <label className={contentStyles.column}>
                    Residuals in Column
                  </label>
                  <Dropdown
                    selectedKey={options.CResultsTTest[4].selectedData}
                    styles={dropdownStyles}
                    options={sampleTestOptions.residualOptions}
                    onChange={(e, item) =>
                      udpateOptions(
                        "CResultsTTest",
                        item,
                        4,
                        options.CResultsTTest[4]
                      )
                    }
                  />
                </div>
              </PivotItem>
              <PivotItem
                headerText='Post Hoc Tests'
                onClick={() =>
                  help("wbasics", "options_for_t_test__post_hoc_tests", "")
                }
                className={contentStyles.pocSection}>
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
  pocSection: {
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

export default TTest;
