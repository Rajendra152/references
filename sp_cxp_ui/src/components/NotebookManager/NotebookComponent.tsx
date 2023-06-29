import React, { useState } from 'react';
import { NotebookProps } from '../../services/notebookManagerServices/NotebookManagerInterfaces';
import SectionWrapper from './notebook.section';
import { IconButton } from 'office-ui-fabric-react';
import { connect } from 'react-redux';

const NotebookComponent = (props: any) => {
  const [mainnavcol, setmainnavcol] = useState(true);
  let notebook: NotebookProps = props.notebook;

  const allSection = notebook.children.map((secId) => {
    return props.allSections.byId[secId];
  });

  const children = allSection.map((item) => {
    return (
      <SectionWrapper
        openItemInCanvas={props.openItemInCanvas}
        setItemSelectedOnClick={props.setItemSelectedOnClick}
        section={item}
        allActiveItem={props.allActiveItem}
        onHideContextualMenu={props.onHideContextualMenu}
        onShowContextualMenu={props.onShowContextualMenu}
        renameId={props.renameId}
        onItemRenaming={props.onItemRenaming}
        allSections={props.allSections}
        allReports={props.allReports}
        allWorksheets={props.allWorksheets}
        allGraphPages={props.allGraphPages}
        allTransforms={props.allTransforms}
        allEquations={props.allEquations}
        summaryInfoAction={props.summaryInfoAction}
      ></SectionWrapper>
    );
  });

  const opennavmenu = { iconName: 'ChevronRight' };
  const closenavmenu = { iconName: 'ChevronDown' };

  const mainNavclick = (event) => {
    if(event.shiftKey){
      notebook.allAssetsId.forEach((asset)=>{
        props.addSelectedItem(asset)
      })
    } else {
      setmainnavcol(!mainnavcol);
      const newSummary = {
        id:notebook.id,
        type:notebook.type,
        createdDate: notebook.createdDate,
        modifiedDate: notebook.modifiedDate,
        author:notebook.author,
        description:notebook.description
      }
      props.summaryInfoAction(newSummary)
    }
  };
  return (
    <>
      <div
        className="main-nav"
        id={notebook.id}
        onClick={(event)=>mainNavclick(event)}
        onContextMenu={(ev) =>
          props.onShowContextualMenu(ev, notebook, mainnavcol, mainNavclick)
        }
        // onAuxClick={props.onHideContextualMenu}
      >
        <IconButton
          className="toogle-icon"
          iconProps={!mainnavcol ? opennavmenu : closenavmenu}
        />
        {notebook.name} {!notebook.isSaved && notebook.isSaved!== undefined && '*'}
      </div>
      {mainnavcol ? <div className="sub-nav-ul"> {children}</div> : ''}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    addSelectedItem: (id: string) => {
      dispatch({type: 'ADD_SELECTED_ITEM', payload: id})
    },
  }
}

export default connect(null,mapDispatchToProps)(NotebookComponent);
