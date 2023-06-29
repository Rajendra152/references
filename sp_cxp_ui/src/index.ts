const electron = require('electron')
// Importing BrowserWindow from Main
const BrowserWindow = electron.remote.BrowserWindow;

var current = document.getElementsByClassName('spreadsheetComponent')[0];
var options = {
	silent: false,
	printBackground: true,
	color: false,
	margin: {
		marginType: 'printableArea'
	},
	landscape: false,
	pagesPerSheet: 1,
	collate: false,
	copies: 1,
	header: 'Header of the Page',
	footer: 'Footer of the Page'
}
console.log("dsf")
electron.on('print-to-pdf', (event, arg )=> {
    // const pdfPath = path.join(os.tmpdir(), "some-ducking-pdf.pdf");
    // const win = BrowserWindow.fromWebContents(event.sender);
    const printWindow = electron.remote.BrowserWindow;
    let win = printWindow.getFocusedWindow();
    console.log(arg, "arg")
    var options = {
      silent: false,
      printBackground: true,
      color: false,
      margin: {
          marginType: 'printableArea'
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page'
  }
  win.webContents.print(options, (success, failureReason) => {
    if (!success) console.log(failureReason);

    console.log('Print Initiated');
});  
});
// current.addEventListener('click', (event) => {
//     let win = BrowserWindow.getFocusedWindow();
//     // let win = BrowserWindow.getAllWindows()[0];
  
//     win.webContents.print(options, (success, failureReason) => {
//         if (!success) console.log(failureReason);
  
//         console.log('Print Initiated');
//     });
// });
