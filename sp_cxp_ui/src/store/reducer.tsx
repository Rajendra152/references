import { combineReducers } from 'redux';

import notify from './Worksheet/notify';
import findReducer from './Worksheet/Find';
import replaceReducer from './Worksheet/Replace';
import gotoReducer from './Worksheet/Goto';
import sortReducer from './Worksheet/Sort';
import insertReducer from './Worksheet/Insert';
import deleteReducer from './Worksheet/Delete';
import formatCellReducer from './Worksheet/FormatCell';
import titlesReducer from './Worksheet/Titles';
import graphicCellReducer from './Worksheet/GraphicCell';
import importDBReducer from './Worksheet/ImportDB';
import notebookReducer from '../components/Redux/notebookReducerNew';
import worksheetOperationReducer from './Worksheet/WorksheetOperation';
import ImportfileReducer from './Worksheet/FileImport';
import mainWindowReducer from './MainWindow'
import graphPropertyReducer from './GraphProperty/GraphProperty';
import instanceReducer from './Worksheet/SpreadSheet'
import resultGraphReducer from './Analysis/reducer';
import reportOptionsReducer from './Worksheet/Report';
import sampleSizeReducer from './Analysis/SampleSize'
import powerReducer from './Analysis/Power'
import createDiagramPageReducer from './CreateGraph/CreateDiagramPage';
import transformReducer from './Analysis/Transform';
import auditingReducer from './MainWindow/Auditing';
import optionsReducer from './MainWindow/Options';
import helpMenuReducer from './Helpmenu';
import progressBarReducer from './Channel/Progress';
import advisorReducer from './Analysis/Advisor';
import summaryInfoReducer from './SummaryInfo';
import licenseInfoReducer from './LicenseInfo';
import recentSavedFileReducer from './RecentSavedFile';




export default combineReducers({
  createDiagramPageReducer,
  notify,
  findReducer,
  replaceReducer,
  gotoReducer,
  sortReducer,
  insertReducer,
  deleteReducer,
  formatCellReducer,
  titlesReducer,
  graphicCellReducer,
  importDBReducer,
  notebookReducer,
  worksheetOperationReducer,
  ImportfileReducer,
  mainWindowReducer,
  graphPropertyReducer,
  instanceReducer,
  resultGraphReducer,
  reportOptionsReducer,
  sampleSizeReducer,
  powerReducer,
  transformReducer,
  auditingReducer,
  optionsReducer,
  progressBarReducer,
  advisorReducer,
  helpMenuReducer,  
  summaryInfoReducer,
  licenseInfoReducer,
  recentSavedFileReducer
})
