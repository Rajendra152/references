import * as React from 'react';
import '/src/app.global.scss';
// import { post,get } from './../../services/DataService';
import {
  DocumentEditorContainerComponent,
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog,
  Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
DocumentEditorContainerComponent.Inject(
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog,
  Toolbar
);
import '/src/app.global.scss';
import {createSpinner,showSpinner,hideSpinner} from '@syncfusion/ej2-popups';
import * as componentInstance from '../../store/Worksheet/SpreadSheet/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { ipcRenderer } = require('electron');
import FindReport from '../Worksheet/Operation/FindReport';
import ReplaceReport from '../Worksheet/Operation/ReplaceReport';
import {SmoothData} from '../RibbonMenu/Wizard/TestOptions/SmoothData';
import { createNewClient } from '../../services/RedisServices';
import * as findAction from '../../store/Worksheet/Find/actions';
import {renameItem} from '../../services/NotebookManagerServicesNew';

import { convertMetadata } from '../../components/Worksheet/Metadata';
import { post,get } from '../../services/DataService';
import axios from 'axios';
import * as actionCreators from '../../store/Helpmenu/actions';

var redis = require("redis");
const subscriber = createNewClient();
const publisher = createNewClient();


class Report extends React.Component {
  height: number;
  documenteditor: any;
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      view: 'Continuous',
      clientKey: '',
    };
    this.height =
    window.innerHeight -
    document.getElementsByClassName('ribbon-tab')[0].clientHeight -
    document.getElementsByClassName('footer-bar')[0].clientHeight -
    document.getElementById('title-bar').clientHeight - 40;
    this.documenteditorSfdt = '';
    this.container2Sfdt = '';
    // this.onFileChange = (args) => {
    //   if (args.target.files[0]) {
    //     let path = args.target.files[0];
    //     if (path.name.substr(path.name.lastIndexOf('.')) === '.sfdt') {
    //       let fileReader = new FileReader();
    //       fileReader.onload = (e) => {
    //         let contents = e.target.result;
    //         this.documenteditor.documentEditor.open(contents);
    //       };
    //       fileReader.readAsText(path);
    //       this.documenteditor.documentEditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
    //     }
    //     else {
    //       this.loadFile(path);
    //     }
    //   }
    //   event.preventDefault();
    // };
    // this.loadFile = async function (path) {
    //   console.log('path for report contains', path)
      
    //   var obj = this;
    //  // var baseUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/import';
    //   var baseUrl = 'http://127.0.0.1:8000/files/report/import';
    //   var httpRequest = new XMLHttpRequest();
    //   httpRequest.open('POST', baseUrl, true);
    //   showSpinner(document.getElementById('documenteditor'));
    //   obj.documenteditor.documentEditor.isReadOnly = false;
   
    //   httpRequest.onreadystatechange = function () {
    //     if (httpRequest.readyState === 4) {
    //       if (httpRequest.status === 200 || httpRequest.status === 304) {
    //         obj.documenteditor.documentEditor.open(httpRequest.responseText);
    //         obj.documenteditor.documentEditor.isReadOnly = false;
    //         hideSpinner(document.getElementById('documenteditor'));
    //       }
    //       else {
    //        hideSpinner(document.getElementById('documenteditor'));
    //         obj.documenteditor.documentEditor.isReadOnly = false;
    //         console.error(httpRequest.response);
    //       }
    //     }
    //   };
    // //  var formData = new FormData();
    // //  formData.append('files', path);
    // const filePath = String.raw`${path.path}`;
    //   let fileObject = {
    //     'file': path.path
    //   }
    //   obj.documenteditor.documentEditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
    //  // httpRequest.send(fileObject);

    //   let sendRes = await post(baseUrl, fileObject);
    //   const client = createNewClient();
    //   console.log('Client contains', client)
    //   let optionsData = await getDataSetByKey(
    //   sendRes.data.result.redis_id,
    //   client
    //   );
    //   this.documenteditor.documentEditor.open(optionsData);
    //   console.log('Response from backend bros',optionsData);
    // }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);
    this.props.OpenHelpWindow("wbasics", "report", "")
    document.getElementById('uploadfileButton').addEventListener('change', this.onFileChange);
    document.getElementById('uploadfileButton').setAttribute('accept', '.doc,.docx,.rtf,.txt,.sfdt');
    this.documenteditor.documentEditor.enableEditorHistory = true;
       this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
      message: "disableUndo",
    });
    this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
      message: "disableRedo",
    });
  
  

    console.log("report props",this.props.reportobj); //report object


// help menu update
        let helpEvent = this.props;
        let current = ''
        
        window.addEventListener('keydown', function (event) {
            console.log("key pressed f1")
            if (event.code == 'F1' || event.key == 'F1') {
                console.log("entered f1",document)
            }})

if (this.props.reportobj.name == 'Descriptive Statistics Report') {
  this.props.OpenHelpWindow("wbasics", "descriptive_statistics_results", "")

}
else if (this.props.reportobj.name == 'One Way ANCOVA Report') {
  this.props.OpenHelpWindow("wbasics", "arranging_one_way_analysis_of_covariance_data", "")
}
else if (this.props.reportobj.name == "ANOVA On Ranks Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_anova_on_ranks_results", "")
}
else if (this.props.reportobj.name == "Chi-square Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_results_of_a_chi_squared_analysis_of_contingency_tables", "")
}
else if (this.props.reportobj.name == "Chi-square... Report") {
  this.props.OpenHelpWindow("wbasics", "determining_the_minimum_sample_size_for_a_chi_square_test", "")
}

else if (this.props.reportobj.name == "Principal Components Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_principal_components_analysis_results", "")
}
else if (this.props.reportobj.name == "Gehan-Breslow Report") {
  this.props.OpenHelpWindow("wbasics", "arranging_gehan_breslow_survival_analysis_data", "")
}
else if (this.props.reportobj.name == "McNemar's Test Report") {
  this.props.OpenHelpWindow("wbasics", "arranging_mcnemar_test_data", "")
}

else if (this.props.reportobj.name == "One Way Repeated Measures ANOVA Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_one_way_repeated_measures_anova_results", "")
}

else if (this.props.reportobj.name == "Signed Rank Test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_signed_rank_test_results", "")
}
else if (this.props.reportobj.name == "Paired T-test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_paired_t_test_results", "")
}
else if (this.props.reportobj.name == "Rank Sum Test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_rank_sum_test_results", "")
}
else if (this.props.reportobj.name == "Relative Risk Report") {
  this.props.OpenHelpWindow("wbasics", "arranging_relative_risk_test_data", "")
}
else if (this.props.reportobj.name == "One-Sample Signed Rank Test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_one_sample_signed_rank_test_results", "")
}
else if (this.props.reportobj.name == "LogRank Report") {
  this.props.OpenHelpWindow("wbasics", "arranging_logrank_survival_analysis_data", "")
}
else if (this.props.reportobj.name == "t test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_t_test_results", "")
}
else if (this.props.reportobj.name == "Two Way Repeated Measures ANOVA Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_two_way_repeated_measures_anova_results", "")
}

else if (this.props.reportobj.name == "Proportional Hazards Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_cox_regression_results", "")
}
else if (this.props.reportobj.name == "Stratified Model Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_cox_regression_results", "")
}
else if (this.props.reportobj.name == "Gehan-Breslow Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_gehan_breslow_survival_results", "")
}
else if (this.props.reportobj.name == "Fisher Exact Test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_results_of_a_fisher_exact_test", "")
}
else if (this.props.reportobj.name == "Multiple Linear Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_multiple_linear_regression_results", "")
}
else if (this.props.reportobj.name == "Multiple Logistic Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_multiple_logistic_regression_results", "")
}
else if (this.props.reportobj.name == "One Way ANOVA Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_one_way_anova_results", "")
}
else if (this.props.reportobj.name == "Polynomial Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_incremental_polynomial_regression_results", "")
}
else if (this.props.reportobj.name == "Repeated Measures ANOVA On Ranks Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_repeated_measures_anova_on_ranks_results", "")
}
  else if (this.props.reportobj.name == "Signed Rank Test Report") {
  this.props.OpenHelpWindow("wbasics", "performing_a_signed_rank_test", "")
}
else if (this.props.reportobj.name == "Linear Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_simple_linear_regression_results", "")
}
else if (this.props.reportobj.name == "Single Group Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_single_group_survival_results", "")
}
else if (this.props.reportobj.name == "Forward Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_stepwise_regression_results", "")
}
else if (this.props.reportobj.name == "Backward Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_stepwise_regression_results", "")
}
else if (this.props.reportobj.name == "LogRank Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_survival_logrank_results", "")
}
else if (this.props.reportobj.name == "Three Way ANOVA Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_three_way_anova_results", "")
}
else if (this.props.reportobj.name == "Two Way ANOVA Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_two_way_anova_results", "")
}
else if (this.props.reportobj.name == "z-test Report") {
  this.props.OpenHelpWindow("wbasics", "performing_a_z_test", "")
}
else if (this.props.reportobj.name == "McNemar's Test Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_results_of_mcnemar_s_test", "")
}
else if (this.props.reportobj.name == "Odds Ratio Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_results_of_the_odds_ratio_test", "")
}
else if (this.props.reportobj.name == "Relative Risk Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_results_of_the_relative_risk_test", "")
}
else if (this.props.reportobj.name == "Best Subset Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_best_subset_regression_results", "")
}
else if (this.props.reportobj.name == "Regression Wizard Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_deming_regression_results", "")
}
else if (this.props.reportobj.name == "Normality Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_normality_test_results", "")
}
else if (this.props.reportobj.name == "Pearson Product Moment Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_pearson_product_moment_correlation_results", "")
}
else if (this.props.reportobj.name == "Spearman Rank Order Report") {
  this.props.OpenHelpWindow("wbasics", "interpreting_spearman_rank_correlation_results", "")
}

// help menu update

      //to generate client key
      if(this.props.reportobj?.reportData?.report !== undefined){
        this.documenteditor.documentEditor.open(this.props.reportobj.reportData.report);
      }else if(this.props.reportobj.staticReportData !== ""){
        this.documenteditor.documentEditor.open(this.props.reportobj.staticReportData);
      }else{

      }
    if (this.props.webLayout === true) {
      this.setState({ view: 'Continuous' });
    } else {
      this.setState({ view: 'Pages' });
    }


    //To open Smooth Data wizard
    console.log('props contains', this.props);
    //let saveReportInstance = this.documenteditor.documentEditor;
    let saveReportInstance = this.documenteditor;
    
    this.documenteditor.documentEditor.enableLocalPaste = true;
    this.props.actions.isExportInstanceAvailable.isExportInstanceAvailable({
      message: saveReportInstance,
    });

    //To open Smooth Data wizard
    // ipcRenderer.once('openSmoothWizards', (event, arg) => {
    //   console.log('Data received from ipcRenderer', arg);
    //   let Data = {
    //     path: 'smoothData',
    //     testOptions: 'Smoothers2D',
    //     //spreadSheetReference:props.referenceObjectState
    //   };

    //   //ipcRenderer.send('request-mainprocess-action', Data);
    //   this.setState({ isOpen: true });
    //   ipcRenderer.removeAllListeners('openSmoothWizards');
    // });
  }

  insertPicture() {
    let pictureUpload = document.getElementById('insertImageButton');
    pictureUpload.value = '';
    pictureUpload.click();
  }
  onInsertImage(args) {
    let proxy = this;
    if (
      navigator.userAgent.match('Chrome') ||
      navigator.userAgent.match('Firefox') ||
      navigator.userAgent.match('Edge') ||
      navigator.userAgent.match('MSIE') ||
      navigator.userAgent.match('.NET')
    ) {
      if (args.target.files[0]) {
        let path = args.target.files[0];
        let reader = new FileReader();
        reader.onload = function (frEvent) {
          let base64String = frEvent.target.result;
          let image = document.createElement('img');
          image.addEventListener('load', function () {
            proxy.documenteditor.documentEditor.editor.insertImage(
              base64String,
              this.width,
              this.height
            );
          });
          image.src = base64String;
        };
        reader.readAsDataURL(path);
      }
      //Safari does not Support FileReader Class
    } else {
      let image = document.createElement('img');
      image.addEventListener('load', function () {
        proxy.documenteditor.editor.insertImage(args.target.value);
      });
      image.src = args.target.value;
    }
  }
  save() {
    let proxy = this;
    //proxy.documenteditor.documentEditor.save('sample', 'Docx');
    console.log('Triggering save', this.documenteditor.documentEditor.editor);
    // this.documenteditor.documentEditor.editor.paste();
    console.log(newDataReport);
    // let result = this.documenteditor.documentEditor.search.find(
    //   'Replaced',
    //   'None'
    // );
    // console.log(result);
  }
  replaceAll() {
    let textToFind = 'Searched';
    let textToReplace = 'Replaced';
    if (textToFind !== '') {
      // Find all the occurences of given text
      this.documenteditor.documentEditor.searchModule.findAll(textToFind);
      if (
        this.documenteditor.documentEditor.searchModule.searchResults.length > 0
      ) {
        // Replace all the occurences of given text
        this.documenteditor.documentEditor.searchModule.searchResults.replaceAll(
          textToReplace
        );
      }
    }
  }
  //   showPageSetupDialog() {
  //     let proxy = this;
  //     proxy.documenteditor.documentEditor.showDialog('PageSetup');
  // }
  
  style = {
    position: 'fixed',
    left: '-110em',
  };

  onFileClick = () => {
    
  }

  // rendereComplete() {
  //   alert('Inside rendereComplete')
  //   document.getElementById('uploadfileButton').addEventListener('change', this.onFileChange);
  //   document.getElementById('uploadfileButton').setAttribute('accept', '.doc,.docx,.rtf,.txt,.sfdt');
  
  //   document.getElementById('open').addEventListener('click', function (e) {
  
  //     var fileUpload = document.getElementById('uploadfileButton');
  //     fileUpload.value = '';
  //     fileUpload.click();
      
  //   });
  // }

  onImportClick() {
    document.getElementById('file_upload').click();
  }
  // onFileChange(e) {
  //   debugger;
  //   if (e.target.files[0]) {
  //     let file = e.target.files[0];
  //     if (file.name.substr(file.name.lastIndexOf('.')) === '.sfdt') {
  //       let fileReader = new FileReader();
  //       fileReader.onload = (e) => {
  //         let contents = e.target.result;
  //         let proxy = this;
  //         proxy.documenteditor.open(contents);
  //       };
  //       fileReader.readAsText(file);
  //       this.documenteditor.documentName = file.name.substr(
  //         0,
  //         file.name.lastIndexOf('.')
  //       );
  //     }
  //   }
  // }
  // loadFile(file) {
  //   let ajax = new XMLHttpRequest();
  //   ajax.open(
  //     'POST',
  //     'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/import',
  //     true
  //   );
  //   ajax.onreadystatechange = () => {
  //     if (ajax.readyState === 4) {
  //       if (ajax.status === 200 || ajax.status === 304) {
  //         // open SFDT text in document editor
  //         documenteditor.open(ajax.responseText);
  //       }
  //     }
  //   };
  //   let formData = new FormData();
  //   formData.append('files', file);
  //   ajax.send(formData);
  // }
  updateSize = () => {
    if (this.documenteditor){
      let docEditorHeight =
        window.innerHeight -
        document.getElementsByClassName('ribbon-tab')[0].clientHeight -
        document.getElementsByClassName('footer-bar')[0].clientHeight -
        document.getElementById('title-bar').clientHeight -
        40;
        // this.documenteditor.height = deht;
      this.documenteditor.resize(this.documenteditor.element.parentElement.offsetWidth,docEditorHeight);
    }
    else {
      console.log("No document editor");
    }
  }

  componentDidUpdate(prevProps) {
    window.addEventListener("resize", this.updateSize);
    if (
      prevProps.isNotebookManagerDisplay !==
        this.props.isNotebookManagerDisplay ||
      prevProps.isStatusbarDisplay !== this.props.isStatusbarDisplay
    ) {
      this.updateSize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
     ipcRenderer.removeAllListeners('sendtoMainWindowReports');
  }

  contentChange(event){      
    console.log('Content Changed');
    var newDataReport = this.documenteditor.documentEditor.serialize();
    this.props.reportobj.isSaved=false
    if(this.props.reportobj.reportData.report !== undefined){
      this.props.reportobj.reportData.report=newDataReport;
      renameItem(this.props.reportobj,this.props)
      }else if(this.props.reportobj.staticReportData == "" || this.props.reportobj.staticReportData){
      this.props.reportobj.staticReportData=newDataReport;
      renameItem(this.props.reportobj,this.props)
      }else{
     console.log("inside else")
     }
    console.log(this.documenteditor.documentEditor.editorHistory)
    console.log(this.documenteditor.documentEditor.editorHistory?.undoStackIn?.length)
    try {
      if(this.documenteditor.documentEditor.editorHistory.undoStackIn.length == 0){
        console.log("no more undos")
        this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
          message: "disableUndo",
        });
      }else{
        console.log("more undos")
        this.props.actions.hideUndoRedoButtons.isUndoDataAvailable({
          message: "enableUndo",
        });
      }
      console.log(this.documenteditor.documentEditor.editorHistory.redoStackIn);
      if(this.documenteditor.documentEditor.editorHistory.redoStackIn !== undefined  ){
        if(this.documenteditor.documentEditor.editorHistory.redoStackIn.length !== 0){
          console.log("more redos")
           this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
          message: "enableRedo",
        });
        }else{
          this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
            message: "disableRedo",
          });
        }
       
        
      }else{
        console.log("no redos")
        this.props.actions.hideUndoRedoButtons.isRedoDataAvailable({
          message: "disableRedo",
        });
      }
    }
    catch (error) {
      console.log(error)
    }
    
    // var newDataReport = this.documenteditor.documentEditor.serialize();
    // this.props.reportobj.isSaved=false
    // if(this.props.reportobj.reportData.report !== undefined){
    //   this.props.reportobj.reportData.report=newDataReport;
    //   renameItem(this.props.reportobj,this.props)
    //   }else if(this.props.reportobj.staticReportData == "" || this.props.reportobj.staticReportData){
    //   this.props.reportobj.staticReportData=newDataReport;
    //   renameItem(this.props.reportobj,this.props)
    //   }else{
    //  console.log("inside else")
    //  }
  
  }

  render() {
    // console.log("Rendered")
    return (
      <div style={{ height: "100%", width: "100%", overflow: 'scroll' }}>
        <input
          type="file"
          id="insertImageButton"
          style={this.style}
          accept=".jpg,.jpeg,.png,.bmp"
          onChange={this.onInsertImage.bind(this)}
        />
        {/* <input
          type="file"
          id="file_upload"
          accept=".dotx,.docx,.docm,.dot,.doc,.rtf,.txt,.xml,.sfdt"
          onChange={this.onFileChange.bind(this)}
        /> */}
        <input type="file" id="uploadfileButton" style={{ position: 'fixed', left: '-100em' }}/>

        <DocumentEditorContainerComponent
          enablePrint={true} 
          contentChange={this.contentChange.bind(this)} 
          id="container"
          ref={(scope) => {
            this.documenteditor = scope;
          }}
          style={{ display: 'block'}}
          height={`${this.height}px`}
         
          //height={'calc(66vh)'}
          // serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
          enableToolbar={this.props.optionsState.showToolbar} //this.props.optionsState.showToolbar
          enableEditor={true}
          enableSfdtExport={true}
          enableWordExport={true}
          enablePageSetupDialog={true}
          enableTrackChanges={false}
          enableBookmarkDialog={true}
          showPropertiesPane={this.props.optionsState.showReportProperties}
          layoutType={this.props.webLayout}
        />

        <FindReport isOpen={this.props.isOpenReportFind} />

        <ReplaceReport isOpen={this.props.isOpenReportReplace} />
        {/* <SmoothData isOpen={this.state.isOpen}   OpenHelpWindow = {this.props.OpenHelpWindow} />  */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reportState: state.instanceReducer,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    meanValue: state.instanceReducer.mean,
    isOpenReportFind: state.findReducer.isOpenReportFind,
    webLayout: state.replaceReducer.isWebLayout,
    isOpenReportReplace: state.replaceReducer.isOpenReportReplace,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    allActiveItem: state.notebookReducer.allActiveItem,
    optionsState: state.optionsReducer,
    isNotebookManagerDisplay: state.mainWindowReducer.isNotebookManagerDisplay,
    isStatusbarDisplay: state.mainWindowReducer.isStatusbarDisplay,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
    actions: {
      hideUndoRedoButtons: bindActionCreators(componentInstance, dispatch),
      findReference: bindActionCreators(componentInstance, dispatch),
      findAction: bindActionCreators(findAction, dispatch),
      isExportInstanceAvailable: bindActionCreators(
        componentInstance,
        dispatch
      ),
    },
    renameItem: (item) => {
      dispatch({ type: 'RENAME_ITEM', payload: item });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Report);

//export default Report;


