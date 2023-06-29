const { ipcRenderer } = require('electron');

export const sendtoMainWindow = (param) => {
  ipcRenderer.send('wizToMainWindow', param);
}

export const sendToMainGraphWindow = (param) =>{
  ipcRenderer.send('wizToMainGraphWindow', param);
}

export const sendtoMainWindowSpreadSheet = (param) => {
  ipcRenderer.send('wizToMainWindowSpreadsheet', param);
}
export const sendLictoMainWindow = (param) => {
  ipcRenderer.send('licToMainWindow', param);
}

export const closeWindow = () => {
  ipcRenderer.send('quitWizard');
}

export const openSmoothWizard = (param) => {
  ipcRenderer.send('openSmoothWizard',param);
}

export const sendtoMainWindowReport = (param) => {
  ipcRenderer.send('wizToMainWindowReport', param);
}
export const sendtoAnalysisMenu = (param) => {
  ipcRenderer.send('wizToAnalysisMenu', param);
}


export const mainwindowReportwinOpen = (param) => {
  ipcRenderer.send('mainwindowReportwinOpen', param);
}
export const openSampleSize = (param) => {
  ipcRenderer.send('openSampleSizeWizard',param);
}

export const openPower = (param) => {
  ipcRenderer.send('openPowerWizard',param);
}
