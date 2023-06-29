import React, { useState, useEffect } from "react";
import {
  Stack,
  IStackProps,
  IStackStyles,
} from "office-ui-fabric-react/lib/Stack";
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  ContextualMenu,
  IconButton,
  IIconProps,
  IStackTokens,
} from "office-ui-fabric-react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as sampleTestOptions from "./ReportOptionsData";
import OptionsFooter from "./OptionsFooter";
import Helpbutton from "../../../HelpButton";
const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 100 },
};
const stackStyles: IStackStyles = {
  root: {
    marginBottom: 10,
    marginTop: 10,
  },
};
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};
const cancelIcon: IIconProps = { iconName: "Cancel" };
const helpIcon: IIconProps = { iconName: "Help" };
const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};

const tabKeys: string[] = ["CZTest"];
const setIdKey = "oddsRatio";

const OddsRatio: React.FunctionComponent = ({ isOpen, close, OpenHelpWindow,
  helpMenu, modalData }) => {
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
    help("wbasics", "options_for_odds_ratio", "");
    getOptionsData();
  }, []);
  const titleId = useId("title");
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
              aria-label='Report Options Configuration'
              className='FormatContainer'>
              <PivotItem headerText='Options'>
                <div className='ms-Grid' dir='ltr'>
                  <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg8'>
                        <Checkbox
                          label='Power, Use Alpha Value'
                          checked={options.CZTest[0].checked}
                          onChange={(e) => udpateOptions("CZTest", e, 0)}
                        />
                      </div>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg4'>
                        <TextField
                          name='StrPowerAlpha'
                          value={options.CZTest[0].inputData}
                          onChange={(e) =>
                            udpateOptions("CZTest", e, 0, options.CZTest[0])
                          }
                        />
                      </div>
                    </div>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg8'>
                        <Checkbox
                          label='Yates Correction Factor'
                          checked={options.CZTest[1].checked}
                          onChange={(e) => udpateOptions("CZTest", e, 1)}
                        />
                      </div>
                      <div
                        className='ms-Grid-col ms-sm6 ms-md4 ms-lg4'
                        style={{ width: "32px" }}></div>
                    </div>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg8'>
                        <Checkbox
                          className={contentStyles.column}
                          label='Confidence Interval at'
                          checked={options.CZTest[2].checked}
                          onChange={(e) => udpateOptions("CZTest", e, 2)}
                        />
                      </div>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg4'>
                        <TextField
                          suffix='%'
                          name='StrConfidence'
                          value={options.CZTest[2].inputData}
                          onChange={(e) =>
                            udpateOptions("CZTest", e, 2, options.CZTest[2])
                          }
                        />
                      </div>
                    </div>
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg12'>
                        <Checkbox
                          className={contentStyles.column}
                          label='Use the first row of the selected data as the treatment group'
                          checked={options.CZTest[3].checked}
                          onChange={(e) => udpateOptions("CZTest", e, 3)}
                        />
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
        {/* <div className='msid ' dir='ltr'>
          <div className='ms-Grid-row'>
            <div className={contentStyles.header}>
              <div className='ms-Grid-col ms-sm9'>
                <span id={"title1"}>Options for Odds Ratio</span>
              </div>
              <div style={iconButtonStyles.root}>
                <div className='ms-Grid-col ms-sm3 '>
                  <Helpbutton nodeId={current} />
                </div>
                <IconButton
                  iconProps={cancelIcon}
                  ariaLabel='Close popup modal'
                  onClick={close}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={contentStyles.body}>
          {Object.keys(options).length && (
            <Pivot
              aria-label='Report Options Configuration'
              className='FormatContainer'>
              <PivotItem headerText='Options'>
                <br />
                <div className={contentStyles.columns}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Power, Use Alpha Value'
                    checked={options.CZTest[0].checked}
                    onChange={(e) => udpateOptions("CZTest", e, 0)}
                  />
                  <TextField
                    name='StrPowerAlpha'
                    value={options.CZTest[0].inputData}
                    onChange={(e) =>
                      udpateOptions("CZTest", e, 0, options.CZTest[0])
                    }
                  />
                </div>
                <div>
                  <Checkbox
                    label='Yates Correction Factor'
                    checked={options.CZTest[1].checked}
                    onChange={(e) => udpateOptions("CZTest", e, 1)}
                  />
                </div>
                <div className={contentStyles.columns}>
                  <Checkbox
                    className={contentStyles.column}
                    label='Confidence Interval at'
                    checked={options.CZTest[2].checked}
                    onChange={(e) => udpateOptions("CZTest", e, 2)}
                  />
                  <TextField
                    name='StrConfidence'
                    value={options.CZTest[2].inputData}
                    onChange={(e) =>
                      udpateOptions("CZTest", e, 2, options.CZTest[2])
                    }
                  />
                  %
                </div>
                <div>
                  <Checkbox
                    className={contentStyles.column}
                    label='Use first row of the selected data as the treatment group'
                    checked={options.CZTest[3].checked}
                    onChange={(e) => udpateOptions("CZTest", e, 3)}
                  />
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

export default OddsRatio;
