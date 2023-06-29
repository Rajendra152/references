

export const initialNotebookState = {
  notebooks: {
    allNotebooks:{
      byId:{
      },
      allNotebooksId: [],
    },
    allSections: {
      byId:{
      },
      allSectionsId: {
      }
    },
    allWorksheets: {
      byId: {
      },
      allWorksheetsId: []
    },
    allGraphPages: {
      byId: {
      },
      allGraphPagesId: [],
    },
    allReports: {
      byId:{
      },
      allReportsId: []
    },
    allTransforms: {
      byId:{
      },
      allTransformsId: []
    },
    allEquations: {
      byId:{
      },
      allEquationsId: []
    },
    allCopiedId:{

    },
  },
  activeItems: [],
  selectedItems: new Set(),
  openWorksheets: [],
  activeWorksheet: 'string',
  selectedPivotItem: '',
  allActiveItem: {
    notebook: '',
    section: '',
    worksheet: '',
    graphPage: {
      id: '',
      object: '',
    },
    report: '',
    transform: '',
    equation: '',
    selectedItemOnNotebook: '',
    cursor: '',
  },
  summaryInfo:{
    type:'',
    createdDate: '',
    modifiedDate: '',
    author:'',
    description:''
    
  }
};
