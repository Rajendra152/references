const { remote } = require('electron');
import { getOS } from '../utils/globalUtility'
const options = {
  title: "Save file",
  buttonLabel: "Save",
  filters: [
    { name: 'MS Excel ( *.xls) ', extensions: ['xls'] },
    { name: 'Comma Delimited ( *.csv) ', extensions: ['csv'] },
    { name: 'Tab Delimited ( *.tab) ', extensions: ['tab'] },
    { name: 'Plain Text ( *.txt ) ', extensions: ['txt'] },
    { name: 'SYSTAT ( *.syd ) ', extensions: ['syd'] },
    { name: 'Stata ( *.dta ) ', extensions: ['dta'] },
    { name: 'SASData Set(V6) ( *.sd2 ) ', extensions: ['sd2'] },
    { name: 'Minitab ( *.mtw ) ', extensions: ['mtw'] },
    { name: 'Minitab ( *.mpj ) ', extensions: ['mpj'] },
    { name: 'R workspace ( *.rdata ) ', extensions: ['rdata'] },
    { name: 'JMP File ( *.jmp ) ', extensions: ['jmp'] },
    { name: 'Matlab Version 5 ( *.mat5 ) ', extensions: ['mat'] },
    { name: 'Matlab Version 7 ( *.mat7 ) ', extensions: ['mat7'] },
    { name: 'Matlab Version 2016 ( *.mat2016 ) ', extensions: ['mat2016'] },
    { name: 'All Files', extensions: ['*'] }
  ]
};

let data = {
  file_path: '',
  file_name: '',
  extension: ''
}


export const openSaveAsNotebook = async () => {
  let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
  let updatedNbk;
  let newAllNbkState;;
  await saveDialog.then(async function (saveTo,) {
    
    if (saveTo.filePath) {

      let completeFilePath = saveTo.filePath;
      console.log(completeFilePath)
      let filePath = saveTo.filePath.split('\\');
      if(getOS() == 'Mac OS'){
        filePath  = saveTo.filePath.split('/');
      }
      console.log(filePath);
      let Name = filePath[filePath.length - 1];
      filePath = completeFilePath.split(Name)
      filePath = filePath[filePath.length - 2];
      console.log('Name contains', Name)
      console.log('file Path after splitting', filePath, Name)
      let fileName = Name.split('.')
      console.log(fileName)
      let extension = fileName[fileName.length - 1]
      fileName = fileName[fileName.length - 2]
      console.log('extension and fileName and filePath', extension, fileName,"ghkjhjkghj" ,filePath);

      data.file_path = filePath;
      data.file_name = fileName;
      data.extension = extension;
    
    
    }

    else {
      //isSuccess = false;
    }
  })
    .catch((err) => {
      console.log(err)
    });

  return data;
};