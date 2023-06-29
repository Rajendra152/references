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
const tabKeys: string[] = [
  "CPCACriterion",
  "CAssumeCheck",
  "CResiduals",
  "CPCAResults",
];
const setIdKey = "principalComponents";

const PrincipalComponents: React.FunctionComponent = ({
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

  const componentMethodOptions: IChoiceGroupOption[] = [
    { key: "0", text: "Average eigenvalue" },
    {
      key: "1",
      text: "Minimum eigenvalue",
      onRenderField: (props, render) => {
        return (
          <div className={contentStyles.columns}>
            {render!(props)}
            <div style={{ marginLeft: "10px", width: "100px" }}>
              <TextField
                disabled={options.CPCACriterion[3].radioData !== "1"}
                name='MinEigenValue'
                value={options.CPCACriterion[4].inputData}
                onChange={(e) =>
                  udpateOptions("CPCACriterion", e, 4, options.CPCACriterion[4])
                }
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "2",
      text: "Minimum percent of total variance",
      onRenderField: (props, render) => {
        return (
          <div className={contentStyles.columns}>
            {render!(props)}
            <div style={{ marginLeft: "10px", width: "100px" }}>
              <TextField
                disabled={options.CPCACriterion[3].radioData !== "2"}
                name='MinTotalVariance'
                value={options.CPCACriterion[5].inputData}
                onChange={(e) =>
                  udpateOptions("CPCACriterion", e, 5, options.CPCACriterion[5])
                }
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "3",
      text: "Number of components",
      onRenderField: (props, render) => {
        return (
          <div className={contentStyles.columns}>
            {render!(props)}
            <div style={{ marginLeft: "10px", width: "100px" }}>
              <TextField
                disabled={options.CPCACriterion[3].radioData !== "3"}
                name='NumOfComponents'
                value={options.CPCACriterion[6].inputData}
                onChange={(e) =>
                  udpateOptions("CPCACriterion", e, 6, options.CPCACriterion[6])
                }
              />
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
    help("wbasics", "options_for_principal_components_analysis__criterion", "");
    getOptionsData();
  }, []);
  const getSelectedItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item.props.headerText == "Assumption Checking") {
      help(
        "wbasics",
        "options_for_principal_components_analysis__assumption_checking",
        ""
      );
    } else if (item.props.headerText == "Results") {
      help("wbasics", "options_for_principal_components_analysis__results", "");
    } else if (item.props.headerText == "Criterion") {
      help(
        "wbasics",
        "options_for_principal_components_analysis__criterion",
        ""
      );
    } else if (item.props.headerText == "Residuals") {
      help(
        "wbasics",
        "options_for_principal_components_analysis__residuals",
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
                    "options_for_principal_components_analysis__criterion",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div style={{ flex: "0 0 40%" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Matrix for Analysis</legend>
                    <ChoiceGroup
                      defaultSelectedKey={options.CPCACriterion[0].radioData}
                      options={[
                        { key: "0", text: "Correlation" },
                        { key: "1", text: "Covariance" },
                      ]}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CPCACriterion",
                          item,
                          0,
                          options.CPCACriterion[0]
                        )
                      }
                    />
                  </fieldset>
                  <div className={contentStyles.columns}>
                    <label style={{ flex: "0 0 50%" }}>
                      Significance level for hypothesis testing
                    </label>
                    <TextField
                      name='HypothesisLevel'
                      value={options.CPCACriterion[1].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CPCACriterion",
                          e,
                          1,
                          options.CPCACriterion[1]
                        )
                      }
                    />
                  </div>
                  <div className={contentStyles.columns}>
                    <label style={{ flex: "0 0 50%" }}>Confidence Level</label>
                    <TextField
                      name='ConfLevel'
                      value={options.CPCACriterion[2].inputData}
                      onChange={(e) =>
                        udpateOptions(
                          "CPCACriterion",
                          e,
                          2,
                          options.CPCACriterion[2]
                        )
                      }
                    />
                  </div>
                </div>
                <div style={{ flex: "0 0 60%", marginLeft: "10px" }}>
                  <fieldset className={contentStyles.fieldSet}>
                    <legend>Selection Method for Components</legend>
                    <ChoiceGroup
                      defaultSelectedKey={options.CPCACriterion[3].radioData}
                      options={componentMethodOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CPCACriterion",
                          item,
                          3,
                          options.CPCACriterion[3]
                        )
                      }
                    />
                  </fieldset>
                </div>
              </PivotItem>
              <PivotItem
                headerText='Assumption Checking'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_principal_components_analysis__assumption_checking",
                    ""
                  )
                }
                className={contentStyles.assumptionSection}>
                <br />
                <Checkbox
                  label='Normality'
                  checked={options.CAssumeCheck[0].checked}
                  onChange={(e) => udpateOptions("CAssumeCheck", e, 0)}
                />
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
                        { key: "0", text: "Henze-Zirkler" },
                        {
                          key: "1",
                          text: "Mardia's test for skewness and kurtosis",
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
              </PivotItem>
              <PivotItem
                headerText='Residuals'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_principal_components_analysis__residuals",
                    ""
                  )
                }>
                <br />
                <Checkbox
                  label='Component Scores'
                  checked={options.CResiduals[0].checked}
                  onChange={(e) => udpateOptions("CResiduals", e, 0)}
                />
                <div
                  className={contentStyles.columns}
                  style={{ marginLeft: "28px" }}>
                  <label style={{ flex: "0 0 15%" }}>in Column</label>
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
                <Checkbox
                  label='Residuals'
                  checked={options.CResiduals[1].checked}
                  onChange={(e) => udpateOptions("CResiduals", e, 1)}
                />
                <div
                  className={contentStyles.columns}
                  style={{ marginLeft: "28px" }}>
                  <label style={{ flex: "0 0 15%" }}>in Column</label>
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
              </PivotItem>
              <PivotItem
                headerText='Results'
                onClick={() =>
                  help(
                    "wbasics",
                    "options_for_principal_components_analysis__results",
                    ""
                  )
                }
                className={contentStyles.columns}>
                <br />
                <div>
                  <Checkbox
                    label='Correlation matrix'
                    checked={options.CPCAResults[0].checked}
                    onChange={(e) => udpateOptions("CPCAResults", e, 0)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 25%" }}>in Column</label>
                    <Dropdown
                      disabled={!options.CPCAResults[0].checked}
                      selectedKey={options.CPCAResults[0].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.residualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CPCAResults",
                          item,
                          0,
                          options.CPCAResults[0]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Component loadings'
                    checked={options.CPCAResults[1].checked}
                    onChange={(e) => udpateOptions("CPCAResults", e, 1)}
                  />
                  <Checkbox
                    label='Proportion of variance explained by in-model components'
                    checked={options.CPCAResults[2].checked}
                    onChange={(e) => udpateOptions("CPCAResults", e, 2)}
                  />
                </div>
                <div>
                  <Checkbox
                    label='Fitted correlation matrix'
                    checked={options.CPCAResults[3].checked}
                    onChange={(e) => udpateOptions("CPCAResults", e, 3)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 25%" }}>in Column</label>
                    <Dropdown
                      disabled={!options.CPCAResults[3].checked}
                      selectedKey={options.CPCAResults[3].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.residualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CPCAResults",
                          item,
                          3,
                          options.CPCAResults[3]
                        )
                      }
                    />
                  </div>
                  <Checkbox
                    label='Difference between origin and fitted correlation matrix'
                    checked={options.CPCAResults[4].checked}
                    onChange={(e) => udpateOptions("CPCAResults", e, 4)}
                  />
                  <div
                    className={contentStyles.columns}
                    style={{ marginLeft: "28px" }}>
                    <label style={{ flex: "0 0 25%" }}>in Column</label>
                    <Dropdown
                      disabled={!options.CPCAResults[4].checked}
                      selectedKey={options.CPCAResults[4].selectedData}
                      styles={dropdownStyles}
                      options={sampleTestOptions.residualOptions}
                      onChange={(e, item) =>
                        udpateOptions(
                          "CPCAResults",
                          item,
                          4,
                          options.CPCAResults[4]
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
export default PrincipalComponents;
