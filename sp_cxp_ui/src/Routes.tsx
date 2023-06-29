import MainWindow from './components/MainWindow/MainWindow';
import { Test } from './components/MainWindow/Test';
//import GraphMainWizard from './components/RibbonMenu/GraphWizard/GraphMainWizard';
import GraphWizard from './components/RibbonMenu/Wizard/GraphWizard';
import StatisticalTransformation from './components/Analysis/StatisticalTransformation/StatisticalTranformation';
import  TestOptionsWizard  from './components/RibbonMenu/Wizard/TestOptions/TestOptionsWizard';
import {SmoothData} from './components/RibbonMenu/Wizard/TestOptions/SmoothData';
import HelpMenu from './components/RibbonMenu/NavBarRibbon/HelpMenu/mainHelp';
import LicenseMain from './components/RibbonMenu/NavBarRibbon/HelpMenu/LicenseMain';

const routes = [
  {path: "/", exact: true, name: "Home", compontent: MainWindow},
  {path: "/home", exact: true, name: "Home", compontent: MainWindow},
  {path: "/test", exact: true, name: "Test", compontent: Test},
  {path: "/graphWizard", exact: true, name: "GraphWizard", compontent: GraphWizard},
  { path: "/statisticalTranformation/:type", exact: true, name: "StatisticalTranformation", compontent: StatisticalTransformation },
  { path: "/analysisTestWizard", exact: true, name: "TestOptionsWizard", compontent: TestOptionsWizard },
  { path: "/smoothData", exact: true, name: "SmoothData", compontent: SmoothData },
  { path: "/helpMenu/:helpId", exact: true, name: "HelpMenu", compontent: HelpMenu },
  { path: "/license", exact: true, name: "LicenseMain", compontent: LicenseMain }


]

export default routes;


