import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
  AuditProps,
  TransformProps,
  EquationProps
} from './NotebookManagerInterfaces';
import * as ITEM_TYPE from './ConstantsNotebookManager';
import AuditLog from '../AuditLogService';
const os = require('os');

export const getDefaultAuditLogObject = (
  actionType: string,
  id?: string,
  oldValue?: any,
  newValue?: any
) => {
  const auditProps: AuditProps = {
    actionType,
    datetime: new Date(),
    description: `${actionType}`,
    // userid: 'SYSTEM_USER_ID',
    userid: os.hostname(),
    oldValue,
    newValue,
    auditlogId: id,
  };

  return auditProps;
};

export const getDefaultNotebookObject = (id: string, name: string, authorName?:string) => {
  let notebookObject: NotebookProps = {
    id,
    name,
    type: ITEM_TYPE.NOTEBOOK,
    children: [],

    allAssetsId: [],
    allSectionsId: [],
    allWorksheetsId: [],
    allReportsId: [],
    allTransformsId: [],
    allEquationsId: [],
    allGraphPagesId: [],

    sectionLength: 0,
    worksheetLength: 0,
    reportLength: 0,
    transformLength: 0,
    equationLength: 0,
    graphPageLength: 0,

    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    savedId: id,
    savedPath: '',

    activeSection: '',
    activeChild: '',

    auditLogs: [],
    enableAudit: true,
    password: {
      password: '',
      isPassword: false,
      isEnableView: false,
      auditPassword: '',
      isAuditPassword: false,
      isAuditEnableView: false,
    },
    description: 'Notebook',
    author:authorName?authorName:'admin',
  };

  AuditLog.log(notebookObject, getDefaultAuditLogObject('ADD_NOTEBOOK'));

  notebookObject.id = notebookObject.id.replaceAll(' ', '');
  return notebookObject;
};

export const getDefaultSectionObject = (
  secId: string,
  name: string,
  notebookId: string,
  authorName: string
) => {
  const sectionObject: SectionProps = {
    id: notebookId + secId,
    name,
    type: ITEM_TYPE.SECTION,
    level: 1,
    parentNotebookId: notebookId,
    parentSectionId: null,
    parentLoop: [],
    children: [],
    totalChildLevel: 0,
    worksheetId: '',
    graphPage: [],
    report: [],
    transform: [],
    equation: [],
    allAssetsId: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
    activeChild: '',
    isSaved: false,
    description: 'Section',
    author:authorName?authorName:'admin',
  };
  sectionObject.id = sectionObject.id.replaceAll(' ', '');
  sectionObject.id = sectionObject.id.replaceAll('(', '');
  sectionObject.id = sectionObject.id.replaceAll(')', '');
  return sectionObject;
};

export const getDefaultWorksheet = (
  id: string,
  name: string,
  notebookId: string,
  sectionId: string,
  authorName: string,
  data: [],
  sheetDataHead: []
) => {
  const worksheetObject: WorksheetProp = {
    id: sectionId + id,
    name,
    type: ITEM_TYPE.WORKSHEET,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    parentLoop: [],
    data: data || [],
    sheetDataHead: sheetDataHead || [],
    level: 1,
    worksheetId: sectionId + name,
    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    description: 'Worksheet',
    author:authorName?authorName:'admin',
  };
  worksheetObject.id = worksheetObject.id.replaceAll(' ', '');
  worksheetObject.id = worksheetObject.id.replaceAll('(', '');
  worksheetObject.id = worksheetObject.id.replaceAll(')', '');
  return worksheetObject;
};

export const getDefaultReport = (
  repId: string,
  name: string,
  notebookId: string,
  sectionId: string,
  worksheetId?: string,
  authorName?: string,
) => {
  const reportObject: ReportProps = {
    id: sectionId + repId,
    histogramId:'',
    pairedTestId:'',
    coxTestId:"",
    name,
    type: ITEM_TYPE.REPORT,
    level: 1,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: worksheetId,
    parentLoop: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    description: 'Report',
    author:authorName?authorName:'admin',
  };
  reportObject.id = reportObject.id.replaceAll(' ', '');
  reportObject.id = reportObject.id.replaceAll('(', '');
  reportObject.id = reportObject.id.replaceAll(')', '');

  return reportObject;
};

export const getDefaultGraphPage = (
  grId: string,
  name: string,
  notebookId: string,
  sectionId: string,
  worksheetId?: string,
  authorName?: string
) => {
  const graphPageObject: GraphPageProps = {
    id: sectionId + grId,
    name,
    type: ITEM_TYPE.GRAPHPAGE,
    level: 1,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    parentLoop: [],
    worksheetId: worksheetId,
    graphLength :0,
    graph2DLength: 0,
    graph3DLength: 0,
    pieGraphLength: 0,
    contourLength: 0,

    graphList: [],
    textList: [],
    allNodesList:[],
    allConnectorsList:[],
    rectangleList: [],
    allGraphId: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    isResultGraphPage : false,
    isHistogram : false,
    description: 'Graph Page',
    author:authorName?authorName:'admin',
  };

  graphPageObject.id = graphPageObject.id.replaceAll(' ', '');
  graphPageObject.id = graphPageObject.id.replaceAll('(', '');
  graphPageObject.id = graphPageObject.id.replaceAll(')', '');
  return graphPageObject;
};

export const getDefaultTransform = (
  transformId: string,
  name: string,
  notebookId: string,
  sectionId: string,
  worksheetId?: string,
  authorName?: string,

) => {
  const transformObject:TransformProps = {
    id: sectionId + transformId,
    name,
    type: ITEM_TYPE.TRANSFORM,
    level: 1,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: worksheetId,
    parentLoop:[],
    transformData: {
      equation: '',
      trigonometricUnit: '',
      transformId: ''
    },
    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    description: 'Transform',
    author:authorName?authorName:'admin',
  };
  transformObject.id = transformObject.id.replaceAll(" ","");
  transformObject.id = transformObject.id.replaceAll("(","");
  transformObject.id = transformObject.id.replaceAll(")","");

  return transformObject;
};

export const getDefaultEquation = (
  equationId: string,
  name: string,
  notebookId: string,
  sectionId: string,
  worksheetId?: string,
  authorName?: string,
) => {
  const equationObject:EquationProps = {
    id: sectionId + equationId,
    name,
    type: ITEM_TYPE.EQUATION,
    level: 1,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: worksheetId,
    parentLoop:[],
    equationData: {
      name: '',
      equationId: '',
      equation: '',
      variables: '',
      initialParams: '',
      constraints: '',
      trigonometricUnit: '',
      iterations: '',
      stepSize: '',
      tolerance: ''
    },
    createdDate: new Date(),
    modifiedDate: new Date(),
    isSaved: false,
    description: 'Equation',
    author:authorName?authorName:'admin',
  };
  equationObject.id = equationObject.id.replaceAll(" ","");
  equationObject.id = equationObject.id.replaceAll("(","");
  equationObject.id = equationObject.id.replaceAll(")","");

  return equationObject;
};
