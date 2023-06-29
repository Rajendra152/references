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
  createNewClient,
  getDataSetByKey,
  updatDatasetInRedis,
} from "../../../services/RedisServices";
import * as options from "./ReportOptionsData";
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
  dropdown: { width: 100 },
};

const client = createNewClient();
const os = require("os");

const DescriptiveStatistics: React.FunctionComponent = ({
  isOpen,
  close,
  helpMenu,
  OpenHelpWindow,

  modalData
}) => {
  const [descStatOptions, setDescStatOptions] = useState([]);
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
  const setDescriptiveOptions = (reportOptions: any) => {
    setDescStatOptions(reportOptions);
  };

  const udpateOptions = (event: any, index: number, option?: any) => {
    const reportOptions = JSON.parse(JSON.stringify(descStatOptions));
    if (option && option.input) {
      if (isNaN(event.target.value) == true) {
        alert("You must enter a numeric value.")
        reportOptions[index].inputData = reportOptions[index].inputData
      } else {
        reportOptions[index].inputData = event.target.value;
      }
    } else if (option && option.dropdown) {
      reportOptions[index].selectedData = event.key;
    } else {
      reportOptions[index].checked = event.currentTarget.checked;
    }
    setDescriptiveOptions(reportOptions);
  };

  const selectAll = () => {
    const reportOptions = JSON.parse(JSON.stringify(descStatOptions));
    reportOptions.map((option: any) => {
      option.checked = true;
      return option;
    });
    setDescriptiveOptions(reportOptions);
  };

  const uncheckAll = () => {
    const reportOptions = JSON.parse(JSON.stringify(descStatOptions));
    reportOptions.map((option: any) => {
      option.checked = false;
      return option;
    });
    setDescriptiveOptions(reportOptions);
  };

  const getOptionsData = async () => {
    let optionsData = await getDataSetByKey(os.userInfo().username, client);
    setOptionsData(optionsData);
    const descriptiveStatData =
      optionsData[options.statOptionIds.descriptivestatistics];
    const stats = descriptiveStatData["CDescriptive"];
    let descriptiveOptions: any = JSON.parse(
      JSON.stringify(options.descriptiveStatisticsOptions)
    );
    descriptiveOptions = (descriptiveOptions || []).map((option: any) => {
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
    setDescriptiveOptions(descriptiveOptions);
  };

  const updateDataInRedis = async () => {
    const descriptiveStatData =
      optionsData[options.statOptionIds.descriptivestatistics];
    const stats = descriptiveStatData["CDescriptive"];
    (descStatOptions || []).forEach((option: any) => {
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
    descriptiveStatData["CDescriptive"] = stats;
    await updatDatasetInRedis(client, optionsData, os.userInfo().username);
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
            <PivotItem headerText='Statistics'>
              <br />
              <div className={contentStyles.columns}>
                {(descStatOptions || []).map((option: any, index: number) => {
                  return (
                    <div key={option.label} className={contentStyles.column}>
                      <Checkbox
                        label={option.label}
                        checked={option.checked}
                        onChange={(e) => udpateOptions(e, index)}
                      />
                      {option.input && (
                        <TextField
                          key={option.label + "input"}
                          name={`ci_mean`}
                          value={option.inputData}
                          onChange={(e) => udpateOptions(e, index, option)}

                        />
                      )}
                      {option.dropdown && (
                        <Dropdown
                          selectedKey={option.selectedData}
                          key={option.label + "dropdown"}
                          styles={dropdownStyles}
                          options={options.percentileOptions}
                          onChange={(e, item) =>
                            udpateOptions(item, index, option)
                          }
                        />
                      )}
                    </div>
                  );
                })}
                <div className={contentStyles.columnBtn}>
                  <DefaultButton
                    style={{ marginRight: "20px" }}
                    text='Select All'
                    className={`text-block`}
                    onClick={() => selectAll()}
                    allowDisabledFocus
                  />
                  <DefaultButton
                    text='Clear'
                    className={`text-block`}
                    onClick={() => uncheckAll()}
                    allowDisabledFocus
                  />
                </div>
              </div>
            </PivotItem>
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
    width: '550px'
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
    display: "grid",
    gridTemplateColumns: "1fr 1fr 2fr",
  },
  column: {
    marginBottom: "20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
  },
  columnBtn: {
    gridColumnEnd: "4",
    marginBottom: "20px",
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
export default DescriptiveStatistics;
