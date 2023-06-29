import {
  getDefaultNotebookObject,
  getDefaultSectionObject,
  getDefaultWorksheet,
} from './GetDefaultObject';

export const createNewNotebook = (props: any) => {
  /* get notebooks array length to set id  */

  const nbkLen = props.notebooks.allNotebooks.allNotebooksId.length + 1;
  const notebookId = `Nbk${nbkLen}_${new Date().getTime()}`;
  console.log("Rey",props.licenseInfo.userName)
  const notebookObject = getDefaultNotebookObject(
    notebookId,
    `Notebook${nbkLen}`,
    props.licenseInfo.userName
  );

  const sectionObject = getDefaultSectionObject(
    `Sec1`,
    `Section 1`,
    notebookId,
    props.licenseInfo.userName
  );

  const worksheetObject = getDefaultWorksheet(
    `Data1`,
    `Data 1`,
    notebookId,
    sectionObject.id,
    props.licenseInfo.userName
  );

  worksheetObject.level = 1;
  worksheetObject.isSaved = undefined;
  worksheetObject.parentLoop = [notebookObject.id, sectionObject.id];

  sectionObject.worksheetId = worksheetObject.id;
  sectionObject.level = 1;
  sectionObject.isSaved = undefined;
  sectionObject.parentLoop = [notebookObject.id];
  sectionObject.activeChild = worksheetObject.id;
  sectionObject.allAssetsId.push(worksheetObject.id);

  notebookObject.sectionLength = 1;
  notebookObject.isSaved = undefined;
  notebookObject.worksheetLength = 1;
  notebookObject.graphPageLength = 0;
  notebookObject.reportLength = 0;
  notebookObject.children.push(sectionObject.id);
  notebookObject.allSectionsId.push(sectionObject.id);
  notebookObject.allWorksheetsId.push(worksheetObject.id);
  notebookObject.allAssetsId.push(worksheetObject.id);
  notebookObject.activeSection = sectionObject.id;
  notebookObject.activeChild = worksheetObject.id;

  // setting Active Item
  let allActiveItem = {
    notebook: notebookId,
    section: sectionObject.id,
    worksheet: worksheetObject.id,
    graphPage: {
      id: null,
      objectId: null,
    },
    report: null,
    selectedItemOnNotebook: worksheetObject.id,
  };

  /* adding notebook object to redux store */
  const newSummary = {
    id:worksheetObject.id,
    type:worksheetObject.type,
    createdDate: worksheetObject.createdDate,
    modifiedDate: worksheetObject.modifiedDate,
    author:worksheetObject.author,
    description:worksheetObject.description
  }
  props.summaryInfoAction(newSummary)

  props.addNotebook({
    notebook: notebookObject,
    section: sectionObject,
    worksheet: worksheetObject,
  });

  /* add worksheet to open worksheet items and active worksheet items */

  props.addOpenWorksheet(worksheetObject);
  props.setActiveItem(worksheetObject);
  props.setActiveWorksheet(worksheetObject.id);
  props.setAllActiveItem(allActiveItem);
  props.setSelectedPivotItem(worksheetObject.id);
  return notebookObject;
};
