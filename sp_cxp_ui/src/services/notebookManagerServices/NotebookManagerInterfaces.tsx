export interface AuditProps {
  actionType: string;
  datetime: Date;
  userid: string;
  oldValue?: string;
  newValue?: string;
  description: string;
  auditlogId?: string;
}

export interface ProPassword {
  password: string;
  isPassword: boolean,
  isEnableView: boolean,
  auditPassword: string,
  isAuditPassword: boolean,
  isAuditEnableView: boolean,
}
export interface NotebookProps {
  id: string;
  name: string;
  type: string;
  children: string[];

  allAssetsId: string[];
  allSectionsId: string[];
  allWorksheetsId: string[];
  allReportsId: string[];
  allTransformsId: string[];
  allEquationsId: string[];
  allGraphPagesId: string[];

  sectionLength: number;
  worksheetLength: number;
  reportLength: number;
  transformLength: number;
  equationLength: number;
  graphPageLength: number;

  createdDate: Date;
  modifiedDate: Date;
  isSaved: boolean;
  savedId: string;
  savedPath?: string;

  activeSection?: string;
  activeChild?: string;

  auditLogs: AuditProps[];
  enableAudit: boolean;
  password: ProPassword;
  description: String;
  author:string;
}

export interface SectionProps {
  id: string;
  name: string;
  type: string;
  level: number;
  parentNotebookId: string;
  parentSectionId: string | null;
  parentLoop: string[];
  children: string[];
  totalChildLevel: number;
  worksheetId: string | undefined;
  graphPage: string[];
  report: string[];
  transform: string[];
  equation: string[];
  allAssetsId: string[];
  createdDate: Date;
  modifiedDate: Date;
  activeChild?: string;

  isSaved: boolean;
  description: String;
  author:string;
}

export interface WorksheetProp {
  id: string;
  name: string;
  type: string;
  level: number;
  parentNotebookId: string;
  parentSectionId: string;
  parentLoop: string[];
  worksheetId: string;

  data?: WorksheetDataProps[][];
  sheetDataHead?: [];
  createdDate: Date;
  modifiedDate: Date;

  isSaved: boolean;
  description: String;
  author:string;
}

export interface WorksheetDataProps {
  value?: string;
  readOnly?: boolean;
}

export interface GraphProps {
  worksheetId: string;
}

export interface GraphPageProps {
  id: string;
  name: string;
  type: string;
  level: number;
  parentNotebookId: string;
  parentSectionId: string | null;
  parentLoop: string[];
  worksheetId: string | undefined;
  graphLength: number;
  
  graph2DLength: number;
  graph3DLength: number;
  pieGraphLength: number;
  contourLength: number;

  graphList?: Object[];
  allGraphId: string[];
  rectangleList?: Object[];
  circleList?: Object[];
  lineList?: Object[];
  textList?: Object[];
  allNodesList:[];
  allConnectorsList:[];
  createdDate: Date;
  modifiedDate: Date;

  isSaved: boolean;
  isResultGraphPage : boolean;
  isHistogram : boolean,
  description: String;
  author:string;
}

export interface ReportProps {
  id: string;
  name: string;
  histogramId:string;
  pairedTestId:string;
  coxTestId:string;
  type: string;
  level: number;
  parentNotebookId: string;
  parentSectionId: string;
  parentLoop: string[];
  worksheetId?: string;
  reportData?:any;
  staticReportData?:any;
  testOptionName?:any;
  createdDate: Date;
  modifiedDate: Date;

  isSaved: boolean;
  description: String;
  author:string;
}

export interface TransformDataProps {
  equation: string;
  trigonometricUnit: string;
  transformId: string;
}

export interface TransformProps {
  id: string;
  name: string;
  type: string;
  level:number;
  parentNotebookId: string;
  parentSectionId: string;
  parentLoop:string[];
  worksheetId?: string;
  transformData?: TransformDataProps;
  createdDate: Date;
  modifiedDate: Date;

  isSaved: boolean;
  description: String;
  author:string;
}

export interface EquationDataProps {
  name: string;
  equation: string;
  variables: string;
  initialParams: string;
  constraints: string;
  trigonometricUnit: string;
  equationId?: string;
  iterations: string;
  stepSize: string;
  tolerance: string;
}

export interface EquationProps {
  id: string;
  name: string;
  type: string;
  level:number;
  parentNotebookId: string;
  parentSectionId: string;
  parentLoop:string[];
  worksheetId?: string;
  equationData?: EquationDataProps;
  createdDate: Date;
  modifiedDate: Date;

  isSaved: boolean;
  description: String;
  author:string;
}
