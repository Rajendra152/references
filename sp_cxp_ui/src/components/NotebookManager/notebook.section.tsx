import React, { useEffect, useRef, useState } from 'react';
import { Worksheet } from './notebook.worksheet';
import { GraphPage } from './notebook.graphPage';
import { Report } from './notebook.report';
import { IconButton } from 'office-ui-fabric-react';
import * as ITEM_TYPE from "../../services/notebookManagerServices/ConstantsNotebookManager";
import Transform from './notebook.transform';
import Equation from './notebook.equation';
import { connect } from 'react-redux';

const Section = (props: any) => {
  let section = props.section;

  const [name, setName] = useState(section.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(()=>{
    setName(props.section.name);
  },[props.renameId])

  const itemRenamingOnBlur = () => {
    props.onItemRenaming(section, name);
    if (name == '') {
      setName(section.name);
    }
  };

  const selectcircle = { iconName: 'CheckMark' };
  const opennavmenu = { iconName: 'ChevronRight' };
  const closenavmenu = { iconName: 'ChevronDown' };
  const [subnavcol, setsubnavcol] = useState(true);

  const subNavclick = (event) => {
    if (event.shiftKey){
      for (let i=0; i<allAssetItem.length; i++){
        props.addSelectedItem(allAssetItem[i].id);
      }    
    } else {
      setsubnavcol(!subnavcol);
      const newSummary = {
        id:section.id,
        type:section.type,
        createdDate: section.createdDate,
        modifiedDate: section.modifiedDate,
        author:section.author,
        description:section.description
      }
      props.summaryInfoAction(newSummary)
    }
  };

  const selectedPivotId = props.allActiveItem.selectedItemOnNotebook;

  let allAssetItem = section.worksheetId
    ? [props.allWorksheets.byId[section.worksheetId]]
    : [];

  let allReport = section.report.map(
    (repId: string) => props.allReports.byId[repId]
  );

  let allTransform = section.transform.map(
    (repId: string) => props.allTransforms.byId[repId]
  );

  let allEquation = section.equation.map(
    (repId: string) => props.allEquations.byId[repId]
  );

  let allGraphPages = section.graphPage.map(
    (grpId: string) => props.allGraphPages.byId[grpId]
  );

  let allChildSection = section.children.map(
    (secId: string) => props.allSections.byId[secId]
  );

  allAssetItem = [
    ...allAssetItem,
    ...allGraphPages,
    ...allReport,
    ...allChildSection,
    ...allTransform,
    ...allEquation
  ];

  allAssetItem.sort((a, b) => a.createdDate - b.createdDate);

  const allAssetComponent = allAssetItem.map((asset) => {
    let shiftClass = props.selectedItems && props.selectedItems.has(asset.id) ? 'item-highlight': '';
    if (asset.type === ITEM_TYPE.WORKSHEET) {
      return (
        <div
          className={
            asset.id == selectedPivotId && props.section.id
              ? `subsheet-li subsheet-bg ${shiftClass}`
              : `subsheet-li ${shiftClass}`
          }
          id={asset.id}
          onContextMenu={(ev) => props.onShowContextualMenu(ev, asset)}
        >
          <IconButton
            className={
              asset.id == selectedPivotId && props.section.id
                ? 'select-icon checked'
                : 'select-icon'
            }
            iconProps={asset.id == selectedPivotId ? selectcircle : undefined}
          />
          <Worksheet
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            worksheet={asset}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
          ></Worksheet>
        </div>
      );
    }
    else if (asset.type === ITEM_TYPE.GRAPHPAGE) {
      return (
        <div
          className={
            asset.id == selectedPivotId
              ? `subsheet-li subsheet-bg ${shiftClass}`
              : `subsheet-li ${shiftClass}`
          }
          id={asset.id}
          onContextMenu={(ev) => props.onShowContextualMenu(ev, asset)}
        >
          <IconButton
            className={
              asset.id == selectedPivotId
                ? 'select-icon checked'
                : 'select-icon'
            }
            iconProps={
              asset.id == selectedPivotId && asset.id ? selectcircle : undefined
            }
          />
          <GraphPage
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            graphPage={asset}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
          ></GraphPage>
        </div>
      );
    }
    else if (asset.type === ITEM_TYPE.REPORT) {
      return (
        <div
          className={
            asset.id == selectedPivotId
              ? `subsheet-li subsheet-bg ${shiftClass}`
              : `subsheet-li ${shiftClass}`
          }
          id={asset.id}
          onContextMenu={(ev) => props.onShowContextualMenu(ev, asset)}
        >
          <IconButton
            className={
              asset.id == selectedPivotId
                ? 'select-icon checked'
                : 'select-icon'
            }
            iconProps={asset.id == selectedPivotId ? selectcircle : undefined}
          />
          <Report
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            report={asset}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
          />
        </div>
      );
    }
    else if (asset.type === ITEM_TYPE.TRANSFORM) {
      return (
        <div
          className={
            asset.id == selectedPivotId
              ? `subsheet-li subsheet-bg ${shiftClass}`
              : `subsheet-li ${shiftClass}`
          }
          id={asset.id}
          onContextMenu={(ev) => props.onShowContextualMenu(ev, asset)}
        >
          <IconButton
            className={
              asset.id == selectedPivotId
                ? 'select-icon checked'
                : 'select-icon'
            }
            iconProps={asset.id == selectedPivotId ? selectcircle : ''}
          />
          <Transform
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            transform={asset}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
          />
        </div>
      );
    }
    else if (asset.type === ITEM_TYPE.EQUATION) {
      return (
        <div
          className={
            asset.id == selectedPivotId
              ? `subsheet-li subsheet-bg ${shiftClass}`
              : `subsheet-li ${shiftClass}`
          }
          id={asset.id}
          onContextMenu={(ev) => props.onShowContextualMenu(ev, asset)}
        >
          <IconButton
            className={
              asset.id == selectedPivotId
                ? 'select-icon checked'
                : 'select-icon'
            }
            iconProps={asset.id == selectedPivotId ? selectcircle : ''}
          />
          <Equation
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            equation={asset}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
          />
        </div>
      );
    }
    else {
      return (
        <div className="subsection">
          <SectionWrapper
            key={asset.id}
            section={asset}
            selectedPivotItem={props.selectedPivotItem}
            onShowContextualMenu={props.onShowContextualMenu}
            allActiveItem={props.allActiveItem}
            openItemInCanvas={props.openItemInCanvas}
            setItemSelectedOnClick={props.setItemSelectedOnClick}
            renameId={props.renameId}
            onItemRenaming={props.onItemRenaming}
            allSections={props.allSections}
            allReports={props.allReports}
            allWorksheets={props.allWorksheets}
            allGraphPages={props.allGraphPages}
            summaryInfoAction={props.summaryInfoAction}
          />
        </div>
      );
    }
  });

  return (
    <div className="sub-nav-li">
      <div
        className="sub-nav-li-header"
        id={section.id}
        onClick={(event) => subNavclick(event)}
        onContextMenu={(ev) =>
          props.onShowContextualMenu(ev, section, subnavcol, subNavclick)
        }
      >
        <IconButton
          className="toogle-icon"
          iconProps={!subnavcol ? opennavmenu : closenavmenu}
        />
        {props.renameId !== section.id ? (
          section.name
        ) : (
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            style={{ width: name.length + 'ch' }}
            onBlur={itemRenamingOnBlur}
            ref={inputRef}
          />
        )}
      </div>

      {subnavcol ? <>{allAssetComponent}</> : ''}
    </div>
  );
};

function mapStateToProps(state){
  return{
    selectedItems: state.notebookReducer.selectedItems
  }
}

function mapDispatchToProps(dispatch){
  return{
    addSelectedItem: (id: string) => {
      dispatch({type: 'ADD_SELECTED_ITEM', payload: id})
    },
  }
}

const SectionWrapper = connect(mapStateToProps, mapDispatchToProps)(Section);
export default SectionWrapper;
