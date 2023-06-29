import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";
import { IAction } from "../Redux/notebookReducer";
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
} from "office-ui-fabric-react/lib/Pivot";
import { Icon } from "@fluentui/react";
import Worksheet from "../Worksheet/Worksheet";
// import Report from '../Report/Report-tinymce';
import Report from "../Worksheet/Report";
import GraphPageCanvas from "./GraphPageCanvas";
import Spreadsheet from "../Worksheet/Spreadsheet";

export interface IWorksheet {
  id: number;
  data: string[][];
}

export interface IGraph {}

export interface IReport {}

export interface INotebookItem {
  notebookItem: IWorksheet | IGraph | IReport;
}

export interface ICanvasState {
  activeItems: INotebookItem[];
}

import { GraphPageProps } from "../../services/notebookManagerServices/NotebookManagerInterfaces";
import { removeGraphState } from "../../services/UndoRedoServices";
import { bindActionCreators } from "redux";
import {
  isRedoDataAvailable,
  isUndoDataAvailable,
} from "../../store/Worksheet/SpreadSheet/actions";
import { summaryInfoAction } from "../../store/SummaryInfo/actions";

const CanvasManager = (props: any) => {
  const renderGraphPage = (graphPageData: GraphPageProps) => {
    return <GraphPageCanvas graphPageData={graphPageData} />;
  };

  const onChangePivotItem = (pvtItem, value) => {
    const currentItem = props.activeItems.filter((item) => {
      return item.id == pvtItem.props.itemKey;
    });
    console.log(currentItem, "CurrenTItem");
    let allActiveItem = {
      notebook: currentItem[0].parentNotebookId,
      section: currentItem[0].parentSectionId,
      worksheet: null,
      graphPage: {
        id: null,
        objectId: null,
      },
      report: null,
      selectedItemOnNotebook: currentItem[0].id,
      cursor: currentItem[0].id,
    };
    if (currentItem[0].type == "worksheet") {
      allActiveItem = {
        ...allActiveItem,
        worksheet: currentItem[0].id,
        graphPage: {
          id: null,
          objectId: null,
        },
        report: null,
      };
    } else if (currentItem[0].type == "graphPage") {
      allActiveItem = {
        ...allActiveItem,
        worksheet: null,
        graphPage: {
          id: currentItem[0].id,
          objectId: null,
        },
        report: null,
      };
    } else if (currentItem[0].type == "report") {
      allActiveItem = {
        ...allActiveItem,
        worksheet: null,
        graphPage: {
          id: null,
          objectId: null,
        },
        report: currentItem[0].id,
      };
    }
    console.log(pvtItem, value);
    const newSummary = {
      id: currentItem[0].id,
      type: currentItem[0].type,
      createdDate: currentItem[0].createdDate,
      modifiedDate: currentItem[0].modifiedDate,
      author: currentItem[0].author,
      description: currentItem[0].description,
    };
    props.summaryInfoAction(newSummary);
    props.setAllActiveItem(allActiveItem);
    props.setSelectedPivotItem(pvtItem.props.itemKey);
    props.resetSelectedItems();
  };

  const createActiveItem = (item) => {
    console.log(item, "itemmmm");
    switch (item.type) {
      case "worksheet":
        //return <Worksheet worksheetKey = {item.id} className="worksheet-area" />;
        return <Spreadsheet worksheetKey={item.id} />;
      case "report":
        return <Report reportobj={item} />;
      case "graphPage":
        return renderGraphPage(item);
      default:
        console.log("I AM DEFAULT---------");
        console.log(item);
    }
  };

  const removeActiveItem = (id) => {
    props.removeActiveItem(id);
    if (
      (props.activeItems || []).some((item: any) => {
        if (item.id === id && item.type === "graphPage") {
          return true;
        }
        return false;
      })
    ) {
      removeGraphState(id, props);
    }
    props.resetSelectedItems();
  };

  function _customRenderer(link, defaultRenderer) {
    if (!link || !defaultRenderer) {
      return null;
    }

    return (
      <span style={{ flex: "0 1 100%" }}>
        {defaultRenderer({ ...link, itemIcon: undefined })}
        {/* <Icon iconName={link.itemIcon} style={{ color: 'red', paddingLeft: '10px' }} /> */}
        <Icon
          iconName='Cancel'
          style={{ color: "#4a4a4a", paddingLeft: "10px" }}
          onClickCapture={() => removeActiveItem(link.itemKey)}></Icon>
      </span>
    );
  }

  const activeItems = props.activeItems
    ? props.activeItems.map((item) => {
        return (
          <PivotItem
            itemKey={item.id}
            key={item.id}
            headerText={!item.isSaved && item.isSaved!== undefined ? item.name +'*' : item.name}
            itemIcon="Add"
            onRenderItemLink={_customRenderer}
          >
            {createActiveItem(item)}
          </PivotItem>
        );
      })
    : [];

  return (
    <div>
      {activeItems.length ? (
        <div>
          <Pivot
            className='content-div-pivot'
            aria-label='Large Link Size Pivot Example'
            linkSize={PivotLinkSize.normal}
            onLinkClick={onChangePivotItem}
            selectedKey={props.selectedPivotItem}>
            {activeItems}
          </Pivot>
          {/* <button onClick={()=>createGraph('scatter')}>Scatter</button>
            <button onClick={()=>createGraph('line')}>Line</button>
            <button onClick={()=>createGraph('lineScatter')}>Line Scatter</button>
            <button onClick={()=>createGraph('lineSpline')}>Line Spline</button>
            <button onClick={()=>createGraph('horizontalDotPlot')}>Dot Plot</button> */}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (canvasState) => {
  return {
    activeItems: canvasState.notebookReducer.activeItems,
    selectedPivotItem: canvasState.notebookReducer.selectedPivotItem,
    activeWorksheet: canvasState.worksheetOperationReducer.activeWorksheet,
    openWorksheets: canvasState.worksheetOperationReducer.openWorksheets,
    openGraphs: canvasState.worksheetOperationReducer.openGraphs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    getActiveList: () => {
      dispatch({ type: "GET_ACTIVE_WINDOW_LIST" });
    },
    setActiveItem: (graphData) => {
      dispatch({ type: "SET_ACTIVE_ITEM", payload: graphData });
    },
    removeActiveItem: (item) => {
      dispatch({ type: "REMOVE_ACTIVE_ITEM", payload: item });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: "SET_SELECTED_PIVOT_ITEM", payload: pvtItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: "SET_ALL_ACTIVE_ITEM", payload: allactiveItem });
    },
    resetSelectedItems: () => {
      dispatch({type: 'RESET_SELECTED_ITEMS'})
    },
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasManager);
