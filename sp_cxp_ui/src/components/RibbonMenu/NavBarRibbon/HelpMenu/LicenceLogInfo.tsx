import React, { useState,useEffect } from 'react';
const { remote } = require('electron');
const fs = require('fs');

const optionsave = {
    title: "Save As",
    buttonLabel: "Save",
    filters: [
        { name: 'Text File(*.txt)', extensions: ['txt'] }
        //   { name: 'All Files', extensions: ['*'] }
    ]
};



const LicenseInfo = (props) => {
    const [logInfos, setLogInfo] = useState(props.logInfo)
    const [disClear, setdisClear] = useState(false)
    const [disSave, setdisSave] = useState(false)


    console.log("here 2", logInfos)
  const  setLogInfoClaear = () =>{
    setLogInfo("")
    setdisClear(true)
    setdisSave(true)

    }
    useEffect(()=>{
        setLogInfo(props.logInfo)
    },[props.logInfo])
    const SaveasTEXT = async () => {
        console.log("remote", remote)
        // window.showSaveFilePicker()

        let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), optionsave);
        await saveDialog.then(async function (saveTo) {
            console.log("entered c2v")

            console.log("File written successfully\n");
            if (saveTo.filePath) {
                fs.writeFileSync(saveTo.filePath, logInfos);
                alert("Log file saved successfully.");

            }
        })
    }

    return (
        <div className="lic-contact">
            <fieldset style={{height:"400px",overflowY:"scroll"}}>
                <legend>
                    <div style={{ fontSize: "14px" }}>Log Events</div>
                </legend>
                <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row" style={{ padding: '5px', width: "436px" }}>
                        <pre>{logInfos}</pre>
                    </div>
                </div>

            </fieldset>
            <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4 ">
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ">
                        <button style={{ marginTop: "9px", height: "22px" }} disabled={disClear} onClick={() => setLogInfoClaear()}>Clear Log</button>
                    </div>
                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ">
                        <button style={{ marginTop: "9px", height: "22px" }}   disabled={disSave} onClick={() => SaveasTEXT()} >Save Log</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LicenseInfo