// import { app, BrowserWindow, ipcRenderer, shell } from 'electron';
// import path from 'path';

// const ffi = require('ffi-napi');
// const ref = require("ref-napi");

// console.log("here __dirname", __dirname)
// //  const RESOURCES_PATH = app.isPackaged
// //  ? path.join(process.resourcesPath, 'assets')
// //  : path.join(__dirname, '../assets');
// const splib = ffi.Library('LicEngine.dll', {
//   'StartLicenseEngine': ['int', []],
//   'StopLicenseEngine': ['int', []],
//   'InitLicenseManager': ['int', ['int']],
//   'CheckLicense': ['int', ['pointer', 'pointer', 'pointer', 'pointer']],
//   'GetLicenseDetails': ['int', ['pointer', 'pointer']],
//   'ActivateLicense': ['int', ['int', 'pointer', 'pointer']],
//   'GetLicenseManagerType': ['int', ['pointer', 'pointer']],
//   'GetC2VDetails': ['int', ['pointer', 'pointer']],
//   'GetLogInfo': ['int', ['pointer', 'pointer']],
//   'CloseLicenseManager': ['int', []]
// });
// const charbufsize = 512;
// // var nApplyLicType = 0;
// var sLicSrcBuf = Buffer.alloc(charbufsize);
// sLicSrcBuf.type = ref.types.char;
// var sLicStatusInfoBuf = Buffer.alloc(charbufsize);
// sLicStatusInfoBuf.type = ref.types.char;
// // var nApplyLicType = 1;  //  0 - For V2C; 1 - For Product Key
// // char * sLicSrc = (char*)malloc(512 * sizeof(char));
// // char * sLicStatusInfo = (char*)malloc(512 * sizeof(char));
// //sLicSrc = "D:\\LicenseEngine\\LicFile\\TestSignma.v2c";  // Physical V2C file path location on running machine
// var sLicSrc = "9e06f0e3-5d4a-4dcb-88c2-7f9c522fb12f";      // sample product key
// export const ApplyLicense = (nApplyLicType: any, sLicSrcBuf: any) => {
//   console.log("<<<<<<<<<<<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
//   var buffsrc = Buffer.alloc(charbufsize);
//   buffsrc.type = ref.types.char;
//   buffsrc.write(sLicSrcBuf)
//   // var buffsrc = Buffer.from(sLicSrcBuf, "utf-8");
//   console.log(nApplyLicType)
//   console.log(sLicSrcBuf)
//   console.log("<<<<<<<<<<<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<< before", sLicStatusInfoBuf)

//   var nApplyLicType = nApplyLicType
//   sLicSrcBuf = sLicSrcBuf
//   var Result = splib.ActivateLicense(nApplyLicType, buffsrc, sLicStatusInfoBuf);
//   var AllResult = [{ result: '', sLicStatusInfoBuf: '', logInfo: '' }]
//   AllResult[0].result = Result
//   AllResult[0].sLicStatusInfoBuf = sLicStatusInfoBuf.toString()
//   console.log("Result", Result)
//   console.log("nApplyLicType", nApplyLicType)
//   console.log("sLicSrcBuf", sLicSrcBuf.toString())
//   console.log("<<<<<<<<<<<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<< after", sLicStatusInfoBuf.toString())
//   var sLogBuf = Buffer.alloc(charbufsize * 8);
//   sLogBuf.type = ref.types.char;
//   var nLogLenBuf = Buffer.alloc(ref.sizeof.int);
//   nLogLenBuf.type = ref.types.int;
//   var retVal = splib.GetLogInfo(sLogBuf, nLogLenBuf);
//   console.log("Result from GetLogInfo is :", retVal);
//   if (retVal == 1) {
//     console.log("GetLogInfo : \n");
//     console.log(sLogBuf.toString());
//     AllResult[0].logInfo = sLogBuf.toString()
//     console.log("\n");
//   }
//   return AllResult

// }