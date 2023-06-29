

export const getNotebookBlankStructure = () =>{
  return {
    allNotebooks:{
      byId:{},
      allNotebooksId:[]
    },
    allSections:{
      byId:{},
      allSectionsId:{}
    },
    allWorksheets:{
      byId:{},
      allWorksheetsId:[]
    },
    allGraphPages:{
      byId:{},
      allGraphPagesId:[],
    },
    allReports:{
      byId:{},
      allReportsId:[]
    },
    allTransforms:{
      byId:{},
      allTransformsId:[]
    },
    allEquations:{
      byId:{},
      allEquationsId:[]
    },
    allCopiedId:{}
  }

}


export const getAllNotebookSaveStructure = () =>{
  return {
    allNotebooks:{
      byId:{},
      allNotebooksId:[]
    },
    allSections:{
      byId:{},
      allSectionsId:{}
    },
    allWorksheets:{
      byId:{},
      allWorksheetsId:[]
    },
    allGraphPages:{
      byId:{},
      allGraphPagesId:[],
    },
    allReports:{
      byId:{},
      allReportsId:[]
    },
    allTransforms:{
      byId:{},
      allTransformsId:[]
    },
    allEquations:{
      byId:{},
      allEquationsId:[]
    },
    allWorksheetDetails:[],
    allGraphPageDetails:[],
  }
}


export const getNotebooksWithNewInstance = (allNotebooks) =>{
  let allNbk = {
    ...allNotebooks,
    byId: {
      ...allNotebooks.byId,
    },
    allNotebooksId: [...allNotebooks.allNotebooksId]
  };

  return {...allNbk}
}


export const getSectionsWithNewInstance = (allSections) =>{
  let allSec = {
    ...allSections,
    byId: {
      ...allSections.byId,
    },
    allSectionsId: {...allSections.allSectionsId}
  };

  return allSec
}


export const getWorksheetsWithNewInstance = (allWorksheets) =>{
  let allWrk = {
    ...allWorksheets,
    byId: {
      ...allWorksheets.byId,
    },
    allWorksheetsId: [...allWorksheets.allWorksheetsId],
  };

  return allWrk
}


export const getGraphPagesWithNewInstance = (allGraphPages) =>{
  let allGrPg = {
    ...allGraphPages,
    byId: {
      ...allGraphPages.byId,
    },
    allGraphPagesId: [...allGraphPages.allGraphPagesId],
  };

  return allGrPg
}


export const getReportsWithNewInstance = (allReports) =>{
  let allRep = {
    ...allReports,
    byId: {
      ...allReports.byId,
    },
    allReportsId: [...allReports.allReportsId],
  };

  return allRep
}

export const getTransformsWithNewInstance = (allTransforms) =>{
  let allTransform = {
    ...allTransforms,
    byId: {
      ...allTransforms.byId,
    },
    allTransformsId: [...allTransforms.allTransformsId],
  };

  return allTransform;
}

export const getEquationsWithNewInstance = (allEquations) =>{
  let allEquation = {
    ...allEquations,
    byId: {
      ...allEquations.byId,
    },
    allEquationsId: [...allEquations.allEquationsId],
  };

  return allEquation;
}


