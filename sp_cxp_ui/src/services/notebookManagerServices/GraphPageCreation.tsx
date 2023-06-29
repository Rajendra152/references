import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
} from './NotebookManagerInterfaces';

import {
  getDefaultSectionObject,
  getDefaultGraphPage,
} from './GetDefaultObject';

import * as ITEM_TYPE from './ConstantsNotebookManager';
import { createGraph } from '../graphPageServices/GraphServices';
import { checkIsNameUnique } from '../NotebookManagerServicesNew';
import { setGraphReload } from '../UndoRedoServices';

export const createNewGraphPage = async (
  props: any,
  graphObject?: Object | undefined | null,
  clickedItem?:
    | NotebookProps
    | SectionProps
    | WorksheetProp
    | GraphPageProps
    | ReportProps
    | undefined
    | null,
  resultGraphWorksheetID?: string,
  keyName?: string
) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;
  if (resultGraphWorksheetID) {
    resultGraphWorksheetID = 'meta' + resultGraphWorksheetID;
  }

  console.log(
    'logss',
    props,
    graphObject,
    clickedItem,
    resultGraphWorksheetID,
    keyName
  );
  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      if (sectionId.includes(clickedItem.id)) {
        const currSection = props.notebooks.allSections.byId[sectionId];
        if (!currSection.worksheetId) {
          return createSectionWithGraphPage(props, null, clickedItem);
        }
      } else {
        return createSectionWithGraphPage(props, null, clickedItem);
      }
    } else if (clickedItem.type === ITEM_TYPE.SECTION) {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.id;
    } else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  } else if (!sectionId) {
    return createSectionWithGraphPage(props);
  }
  console.log(
    props,
    'props====>',
    props.allActiveItem.notebook,
    notebookId,
    props.notebooks.allNotebooks.byId[notebookId]
  );
  const activeNotebook = JSON.parse(
    JSON.stringify(props.notebooks.allNotebooks.byId[notebookId])
  );
  // const activeSection = props.notebooks.allSections.byId[sectionId];
  const activeSection = JSON.parse(
    JSON.stringify(props.notebooks.allSections.byId[sectionId])
  );
  let grPgName = `Graph Page ${activeNotebook.graphPageLength + 1}`;
  let grPgLen = activeNotebook.graphPageLength + 1;

  while (!checkIsNameUnique(grPgName, activeNotebook.id, props)) {
    grPgLen = grPgLen + 1;
    grPgName = `Graph Page ${grPgLen}`;
  }
  let ACtivewrksheetId =
    keyName === 'Histogram' || keyName === 'Normal Probability Plot'
      ? resultGraphWorksheetID
      : activeSection.worksheetId
      ? activeSection.worksheetId
      : props.worksheetID;
  // if(keyName === 'Histogram' ||  keyName === 'Normal Probability Plot'){
  //   ACtivewrksheetId = resultGraphWorksheetID
  // } else if (activeSection.worksheetId) {
  //   ACtivewrksheetId =  activeSection.worksheetId
  // } else {
  //   ACtivewrksheetId = props.worksheetID
  // }
  let newGraphPage = getDefaultGraphPage(
    `GrPg${grPgLen}`,
    `Graph Page ${grPgLen}`,
    notebookId,
    sectionId,
    ACtivewrksheetId,
    props.licenseInfo?.userName
  );
  console.log(newGraphPage, '--->');
  if (resultGraphWorksheetID) {
    console.log(resultGraphWorksheetID, 'resultGraphWorksheet', keyName);
    newGraphPage.worksheetId = resultGraphWorksheetID;
    newGraphPage.isResultGraphPage = true;
    newGraphPage.name = keyName ? `${keyName} ${grPgLen}` : newGraphPage.name;
    newGraphPage.isHistogram = keyName === 'Histogram' ? true : false;
  }
  if (graphObject) {
    console.log('hererachu');
    const newGraphObject = createGraph(
      newGraphPage.worksheetId,
      newGraphPage,
      graphObject,
      props.defaultOption,
      resultGraphWorksheetID,
      keyName,
      props.selectedColumn
    );
    console.log(newGraphObject, 'newGraphObjectnewGraphObject');
    if (resultGraphWorksheetID) {
      (newGraphObject.isResultGraphPage = true),
        (newGraphObject.isHistogram = keyName === 'Histogram' ? true : false);
    }
    newGraphPage.graphList?.push(newGraphObject);
    newGraphPage.allGraphId.push(newGraphObject.id);
    newGraphPage.graphLength += 1;
    console.log(props.openWorksheets);
    const checkOPenWksht = props.openWorksheets;
    console.log('checkOPenWksht', checkOPenWksht);
    if (
      keyName === 'Histogram' ||
      keyName === 'Normal Probability Plot' ||
      keyName === 'Adjusted Survival Curves' ||
      keyName === 'Cumulative Hazard Curves' ||
      keyName === 'Log-Log Survival Curves'
    ) {
      console.log('rachu', props.openWorksheets);
      let openedWorksheet;
      setTimeout(() => {
        openedWorksheet = props.openWorksheets.filter(
          (data) => newGraphPage.worksheetId === data.key
        );
        const openGraph = {
          id: newGraphObject.id,
          worksheetId: newGraphPage.worksheetId,
          wrkClient: openedWorksheet[0].client,
        };
        props.storeGraph(openGraph);

        newGraphPage.level = activeSection.level;
        newGraphPage.parentLoop = [
          ...activeSection.parentLoop,
          activeSection.id,
        ];

        activeSection.graphPage = [...activeSection.graphPage, newGraphPage.id];
        activeSection.activeChild = newGraphPage.id;
        activeSection.allAssetsId.push(newGraphPage.id);

        activeNotebook.graphPageLength = grPgLen;
        activeNotebook.allGraphPagesId.push(newGraphPage.id);
        activeNotebook.allAssetsId.push(newGraphPage.id);
        activeNotebook.activeSection = activeSection.id;
        activeNotebook.activeChild = newGraphPage.id;
        activeNotebook.isSaved = false;

        const newAllNotebooks = {
          newNbk: { ...activeNotebook },
          newSec: { ...activeSection },
          newGrPg: newGraphPage,
        };

        const newActiveItem = {
          ...props.allActiveItem,
          notebook: notebookId,
          section: sectionId,
          worksheet: null,
          report: null,
          graphPage: {
            id: newGraphPage.id,
            objectId: null,
          },
          selectedItemOnNotebook: newGraphPage.id,
          cursor: newGraphPage.id,
        };
        const newSummary = {
          id: newGraphPage.id,
          type: newGraphPage.type,
          createdDate: newGraphPage.createdDate,
          modifiedDate: newGraphPage.modifiedDate,
          author: newGraphPage.author,
          description: newGraphPage.description,
        };
        props.summaryInfoAction(newSummary);

        props.setActiveItem(newGraphPage);
        props.addGraphPage(newAllNotebooks);
        props.setAllActiveItem(newActiveItem);
        props.setSelectedPivotItem(newGraphPage.id);

        return newGraphPage;
      }, 1000);
    } else {
      const openedWorksheet = props.openWorksheets.filter(
        (data) => newGraphPage.worksheetId === data.key
      );
      const openGraph = {
        id: newGraphObject.id,
        worksheetId: newGraphPage.worksheetId,
        wrkClient: openedWorksheet[0].client,
      };
      props.storeGraph(openGraph);

      newGraphPage.level = activeSection.level;
      newGraphPage.parentLoop = [...activeSection.parentLoop, activeSection.id];

      activeSection.graphPage = [...activeSection.graphPage, newGraphPage.id];
      activeSection.activeChild = newGraphPage.id;
      activeSection.allAssetsId.push(newGraphPage.id);

      activeNotebook.graphPageLength = grPgLen;
      activeNotebook.allGraphPagesId.push(newGraphPage.id);
      activeNotebook.allAssetsId.push(newGraphPage.id);
      activeNotebook.activeSection = activeSection.id;
      activeNotebook.activeChild = newGraphPage.id;
      activeNotebook.isSaved = false;

      const newAllNotebooks = {
        newNbk: { ...activeNotebook },
        newSec: { ...activeSection },
        newGrPg: newGraphPage,
      };

      const newActiveItem = {
        ...props.allActiveItem,
        notebook: notebookId,
        section: sectionId,
        worksheet: null,
        report: null,
        graphPage: {
          id: newGraphPage.id,
          objectId: null,
        },
        selectedItemOnNotebook: newGraphPage.id,
        cursor: newGraphPage.id,
      };
      const newSummary = {
        id: newGraphPage.id,
        type: newGraphPage.type,
        createdDate: newGraphPage.createdDate,
        modifiedDate: newGraphPage.modifiedDate,
        author: newGraphPage.author,
        description: newGraphPage.description,
      };
      props.summaryInfoAction(newSummary);

      props.setActiveItem(newGraphPage);
      props.addGraphPage(newAllNotebooks);
      props.setAllActiveItem(newActiveItem);
      props.setSelectedPivotItem(newGraphPage.id);

      return newGraphPage;
    }
  } else {
    console.log("coming here")
    newGraphPage.level = activeSection.level;
    newGraphPage.parentLoop = [...activeSection.parentLoop, activeSection.id];

    activeSection.graphPage = [...activeSection.graphPage, newGraphPage.id];
    activeSection.activeChild = newGraphPage.id;
    activeSection.allAssetsId.push(newGraphPage.id);

    activeNotebook.graphPageLength = grPgLen;
    activeNotebook.allGraphPagesId.push(newGraphPage.id);
    activeNotebook.allAssetsId.push(newGraphPage.id);
    activeNotebook.activeSection = activeSection.id;
    activeNotebook.activeChild = newGraphPage.id;
    activeNotebook.isSaved = false;

    const newAllNotebooks = {
      newNbk: { ...activeNotebook },
      newSec: { ...activeSection },
      newGrPg: newGraphPage,
    };

    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionId,
      worksheet: null,
      report: null,
      graphPage: {
        id: newGraphPage.id,
        objectId: null,
      },
      selectedItemOnNotebook: newGraphPage.id,
      cursor: newGraphPage.id,
    };
    const newSummary = {
      id: newGraphPage.id,
      type: newGraphPage.type,
      createdDate: newGraphPage.createdDate,
      modifiedDate: newGraphPage.modifiedDate,
      author: newGraphPage.author,
      description: newGraphPage.description,
    };
    props.summaryInfoAction(newSummary);

    props.setActiveItem(newGraphPage);
    props.addGraphPage(newAllNotebooks);
    props.setAllActiveItem(newActiveItem);
    props.setSelectedPivotItem(newGraphPage.id);

    return newGraphPage;
  }
};

export const createSectionWithGraphPage = (
  props: any,
  graphObject?: Object | undefined | null,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp
) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;

  // if from context menu editing NotebookID
  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      notebookId = clickedItem.id;
    } else {
      notebookId = clickedItem?.parentNotebookId;
    }
  }

  const activeNotebook = JSON.parse(
    JSON.stringify(props.notebooks.allNotebooks.byId[notebookId])
  );
  let secName = `Section ${activeNotebook.sectionLength + 1}`;
  let secLen = activeNotebook.sectionLength + 1;

  while (!checkIsNameUnique(secName, activeNotebook.id, props)) {
    secLen = secLen + 1;
    secName = `Section ${secLen}`;
  }

  const sectionObject = getDefaultSectionObject(
    `Sec${secLen}`,
    `Section ${secLen}`,
    notebookId,
    props.licenseInfo?.userName
  );

  // clickedItem comming from context Menu only

  if (clickedItem) {
    if (clickedItem.type == ITEM_TYPE.NOTEBOOK) {
      sectionObject.parentLoop = [notebookId];
    } else if (clickedItem.type == ITEM_TYPE.SECTION) {
      //[n1,s1,s2,s3,s4,s5]
      if (clickedItem.parentLoop.length > 1) {
        sectionObject.parentSectionId = clickedItem.parentLoop[1];
        sectionObject.parentLoop = clickedItem.parentLoop.slice(0, 1 + 1);
        sectionObject.level = sectionObject.parentLoop.length;
      } else {
        sectionObject.parentSectionId = clickedItem.id;
        sectionObject.parentLoop = [...clickedItem.parentLoop, clickedItem.id];
        sectionObject.level = clickedItem.level + 1;
      }
    } else {
      //[n1,s1,d,s2,s3,s4,s5]
      if (clickedItem.parentLoop.length > 2) {
        sectionObject.parentSectionId = clickedItem.parentLoop[2 - 1];
        sectionObject.parentLoop = clickedItem.parentLoop.slice(0, 2);
        sectionObject.level = sectionObject.parentLoop.length;
      } else {
        sectionObject.parentSectionId = clickedItem.parentSectionId;
        sectionObject.parentLoop = [...clickedItem.parentLoop];
        sectionObject.level = clickedItem.level + 1;
      }
    }
  } else {
    //sectionObject.parentSection = sectionId;
    if (sectionId) {
      sectionObject.parentSectionId = sectionId;
    } else {
      sectionObject.parentLoop = [activeNotebook.id];
    }
  }

  let parentSec = null;
  if (sectionObject.parentSectionId) {
    parentSec = {
      ...props.notebooks.allSections.byId[sectionObject.parentSectionId],
    };
    parentSec.children.push(sectionObject.id);
  } else {
    activeNotebook.children.push(sectionObject.id);
  }

  let grPgName = `Graph Page ${activeNotebook.graphPageLength + 1}`;
  let grPgLen = activeNotebook.graphPageLength + 1;

  while (!checkIsNameUnique(grPgName, activeNotebook.id, props)) {
    grPgLen = grPgLen + 1;
    grPgName = `Graph Page ${grPgLen}`;
  }

  let newGraphPage = getDefaultGraphPage(
    `GrPg${grPgLen}`,
    `Graph Page ${grPgLen}`,
    notebookId,
    sectionObject.id,
    sectionObject.worksheetId,
    props.licenseInfo?.userName
  );

  if (graphObject) {
    newGraphPage.graphs?.push(graphObject);
  }

  newGraphPage.level = sectionObject.level;
  newGraphPage.parentLoop = [...sectionObject.parentLoop, sectionObject.id];

  sectionObject.allAssetsId.push(newGraphPage.id);
  sectionObject.activeChild = newGraphPage.id;
  sectionObject.graphPage = [...sectionObject.report, newGraphPage.id];

  activeNotebook.sectionLength = secLen;
  activeNotebook.graphPageLength = grPgLen;
  activeNotebook.allSectionsId.push(sectionObject.id);
  activeNotebook.allAssetsId.push(newGraphPage.id);
  activeNotebook.allGraphPagesId.push(newGraphPage.id);
  activeNotebook.activeChild = newGraphPage.id;
  activeNotebook.activeSection = sectionObject.id;
  activeNotebook.isSaved = false;

  const newAllNotebooks = {
    newNbk: { ...activeNotebook },
    newSec: sectionObject,
    newParSec: parentSec,
    newGrPg: newGraphPage,
  };

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionObject.id,
    worksheet: null,
    report: null,
    graphPage: {
      id: newGraphPage.id,
      object: null,
    },
    selectedItemOnNotebook: newGraphPage.id,
    cursor: newGraphPage.id,
  };
  const newSummary = {
    id: newGraphPage.id,
    type: newGraphPage.type,
    createdDate: newGraphPage.createdDate,
    modifiedDate: newGraphPage.modifiedDate,
    author: newGraphPage.author,
    description: newGraphPage.description,
  };
  props.summaryInfoAction(newSummary);
  props.addSection(newAllNotebooks);
  props.setActiveItem(newGraphPage);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(newGraphPage.id);
  return sectionObject;
};
