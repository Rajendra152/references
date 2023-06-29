import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataSetByKey } from "../../../../services/RedisServices";
import { ipcRenderer } from "electron";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { screens } from "./ConstantScreens";
import { options } from "./ConstantOptions";
import * as ConstantImage from "../../../Constant/ConstantImage";
import * as ITEM_TYPE from "../../../../services/notebookManagerServices/ConstantsNotebookManager";
import * as advisorAction from "../../../../store/Analysis/Advisor/actions";
import * as powerAction from "../../../../store/Analysis/Power";
import * as sampleSizeAction from "../../../../store/Analysis/SampleSize";

const AdvisorBody: React.FunctionComponent = (props) => {
  const [optionHistory, setOptionHistory] = useState(new Array());
  const [currHistoryIdx, setCurrHistoryIdx] = useState(0);

  const question = screens[props.screenState].title;
  const prevScreen = screens[props.screenState].back;

  const switchToWorksheet = () => {
    let actvItem = props.activeItems;
    for (let i = actvItem.length - 1; i >= 0; i--) {
      if (actvItem[i].type === ITEM_TYPE.WORKSHEET) {
        let allActiveItem = {
          notebook: actvItem[i].parentNotebookId,
          section: actvItem[i].parentSectionId,
          worksheet: actvItem[i].id,
          graphPage: {
            id: "",
            object: null,
          },
          report: null,
          selectedItemOnNotebook: actvItem[i].id,
          cursor: actvItem[i].id,
        };
        props.setAllActiveItem(allActiveItem);
        props.setSelectedPivotItem(actvItem[i].id);
        break;
      }
    }
  };

  const transposeRowsToColumns = (grid) => {
    const transposedData = grid[0].map((_, colIndex) =>
      grid.map((row) => row[colIndex])
    );
    return transposedData;
  };

  const runMethod = async (testsValue: string) => {
    switchToWorksheet();
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let getWorksheetData = [...props.openWorksheets];
    let activeWorksheet = getWorksheetData[0].key;
    let activeClient = getWorksheetData[0].client;
    let gridData = await getDataSetByKey(activeWorksheet, activeClient);
    gridData = transposeRowsToColumns(gridData);
    let Data = {
      message: "Hi",
      someData: "Let's go",
      path: "analysisTestWizard",
      sheetData: sheetData,
      testOptions: testsValue,
      width: 496,
      height: 480,
      openWorksheet: gridData,
    };
    ipcRenderer.send("request-mainprocess-action", Data);
  };

  const runPower = (testName: string) => {
    switchToWorksheet();
    switch (testName) {
      case "t-test":
        props.powerAction.isOpenPwTtest({ message: true });
        break;
      case "Paired t-test":
        props.powerAction.isOpenPwPairedTtest({ message: true });
        break;
      case "Proportions":
        props.powerAction.isOpenPwProportions({ message: true });
        break;
      case "Anova":
        props.powerAction.isOpenPwAnova({ message: true });
        break;
      case "Chi-square":
        let Data = {
          message: "Hi",
          someData: "power",
          path: "analysisTestWizard",
          sheetData: [...props.stateSpreadSheet.spreadSheetColumnData],
          testOptions: "Chi-sqaure",
          width: 496,
          height: 400,
        };
        ipcRenderer.send("request-mainprocess-action", Data);
        // props.powerAction.isOpenPwChisquare({ message: true });
        break;
      case "Correlation":
        props.powerAction.isOpenPwCorrelation({ message: true });
        break;
      default:
        console.log("Error in Power code");
        break;
    }
  };

  const runSampleSize = (testName: string) => {
    switchToWorksheet();
    switch (testName) {
      case "t-test":
        props.sampleSizeAction.isOpenSaTtest({ message: true });
        break;
      case "Paired t-test":
        props.sampleSizeAction.isOpenSaPairedTtest({ message: true });
        break;
      case "Proportions":
        props.sampleSizeAction.isOpenSaProportions({ message: true });
        break;
      case "Anova":
        props.sampleSizeAction.isOpenSaAnova({ message: true });
        break;
      case "Chi-square":
        let Data = {
          message: "Hi",
          someData: "sampleSize",
          path: "analysisTestWizard",
          testOptions: "Chi-square",
          sheetData: [...props.stateSpreadSheet.spreadSheetColumnData],
          width: 496,
          height: 400,
        };
        ipcRenderer.send("request-mainprocess-action", Data);
        break;
      case "Correlation":
        props.sampleSizeAction.isOpenSaCorrelation({ message: true });
        break;
      default:
        console.log("Error in Sample Size code");
        break;
    }
  };

  function handleRun(test: { type: string; name: string }) {
    props.advisorAction.isOpenAdvisor({
      message: false,
    });
    props.advisorAction.setScreenState("s_0");

    if (test.type === "test") {
      runMethod(test.name);
    } else if (test.type === "power") {
      runPower(test.name);
    } else if (test.type === "sample size") {
      runSampleSize(test.name);
    } else {
      console.log("Problem with the handler code");
    }
  }

  return (
    <div className="advisor-main">
      <h4>{question}</h4>
      <div className="advisor-body">
        <div className="advisor-options">
          {screens[props.screenState].children.map((option, index) => {
            return screens[props.screenState].title === "Suggested Test" ? (
              <p className="advisor-option-no-hover" key={index}>
                {options[option].text}
              </p>
            ) : (
              <p
                className={`advisor-option ${optionHistory[currHistoryIdx]===index ?'advisor-option-highlight':''}`}  
                onClick={() => {
                  props.advisorAction.setScreenState(options[option].nextScreen);
                  if (currHistoryIdx === optionHistory.length) {
                    setOptionHistory(prevHistory => [...prevHistory, index]) 
                    setCurrHistoryIdx(prevIdx => prevIdx+1);
                  }
                  else if (index !== optionHistory[currHistoryIdx]) {
                    setOptionHistory(prevHistory => {
                      let history = [...prevHistory];
                      let firstPart = history.slice(0,currHistoryIdx)
                      return [...firstPart, index]
                    })
                    setCurrHistoryIdx(prevIdx => prevIdx+1);
                  }
                  else {
                    setCurrHistoryIdx(prevIdx => prevIdx+1);
                  }
                }}
                key={index}
              >
                {options[option].text}
              </p>
            );
          })}
        </div>
        <div className="advisor-image">
          <img src={ConstantImage.AdvisorBig} alt="Advisor logo" />
        </div>
      </div>
      <div className="advisor-footer">
        {screens[props.screenState].title === "Suggested Test" ? (
          <PrimaryButton
            text="Run"
            onClick={() => handleRun(screens[props.screenState].test)}
          />
        ) : (
          <DefaultButton
            text="Back"
            onClick={() => {
              props.advisorAction.setScreenState(prevScreen)
              setCurrHistoryIdx(prevIdx => prevIdx - 1)
            }}
            disabled={prevScreen === null}
          />
        )}

        <DefaultButton
          text="Cancel"
          onClick={() => {
            props.advisorAction.isOpenAdvisor({
              message: false,
            });
            props.advisorAction.setScreenState("s_0");
          }}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isOpenAdvisor: state.advisorReducer.isOpenAdvisor,
    screenState: state.advisorReducer.screenState,
    activeItems: state.notebookReducer.activeItems,
    stateSpreadSheet: state.instanceReducer,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    advisorAction: bindActionCreators(advisorAction, dispatch),
    powerAction: bindActionCreators(powerAction, dispatch),
    sampleSizeAction: bindActionCreators(sampleSizeAction, dispatch),

    setAllActiveItem: (allactiveItem) => {
      dispatch({ type: "SET_ALL_ACTIVE_ITEM", payload: allactiveItem });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: "SET_SELECTED_PIVOT_ITEM", payload: pvtItem });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorBody);
