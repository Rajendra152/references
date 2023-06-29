import React, { useState, useEffect } from 'react';
// import "../../../../License/main";
// import {retVal} from '../../../../License/main';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
const { ipcRenderer } = require('electron');


const { remote } = require('electron');
const fs = require('fs');

const optionsave = {
    title: "Save As",
    buttonLabel: "Save",
    defaultPath: '~/SPW15_775400014.c2v',
    filters: [
        { name: 'C2V File(*.c2v)', extensions: ['C2V'] }
        //   { name: 'All Files', extensions: ['*'] }
    ]
};
const options: IChoiceGroupOption[] = [
    { key: 'loc', text: 'Local' },
    { key: 'net', text: 'Network' },
    { key: 'auto', text: 'Auto' },
];
const LicenseInformation = (props) => {
    const [filepath, setFilePath] = useState('')
    const [local, setLocal] = useState(false)
    const [network, setNetwork] = useState(false)
    const [auto, setAuto] = useState(true)
    const [selectedkey, setKey] = useState('loc')


    useEffect(() => {
        ipcRenderer.on("text", function (event, arg) {
            console.log("arg", arg)
        })
        if (selectedkey == "loc") {
            setNetwork(false)
            setLocal(true)
            setAuto(false)
        }
        else if (selectedkey == "net") {
            setLocal(false)
            setNetwork(true)
            setAuto(false)
        }
        else if (selectedkey == "auto") {
            setNetwork(false)
            setLocal(false)
            setAuto(true)
        }
    }, [])
    const _onChange = (ev, item) => {
        if (item.key == "loc") {
            setNetwork(false)
            setLocal(true)
            setAuto(false)
        }
        else if (item.key == "net") {
            setLocal(false)
            setNetwork(true)
            setAuto(false)
        }
        else if (item.key == "auto") {
            setNetwork(false)
            setLocal(false)
            setAuto(true)
        }
        console.log("key", item.key)
    }

    const SaveasC2V = async () => {
        console.log("remote", remote)
        // window.showSaveFilePicker()

        let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), optionsave);
        await saveDialog.then(async function (saveTo) {
            console.log("entered c2v")

            console.log("File written successfully\n");
            if (saveTo.filePath) {
                let data = props.footprint.replace(/[^\x20-\x7E]/g, '')
                fs.writeFileSync(saveTo.filePath, data);
                alert("C2V file has been saved successfully.")
            }
        })
    }

    return (
        <div className="lic-contact">
            <fieldset>
                <legend>
                    <div style={{ fontSize: "14px"}}>Machine Fingerprint</div>
                </legend>
                <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row" style={{ border: "1px solid lightgrey", padding: '5px', overflowX: "scroll", width: "580px" ,height:"105px",overflowY:"scroll" }}>
                    <pre>{props.footprint}</pre>
                        {/* <pre >{props.footprint.replace(/[^\x20-\x7E]/g, '')} </pre> */}
                    </div>
                    <div className="ms-Grid-row" style={{ float: 'right' }}>
                        <button onClick={SaveasC2V} style={{ marginTop: "9px", height: "22px" }}>Save As C2V File</button>
                    </div>
                </div>
                <div className="ms-Grid lic-thanks" style={{ fontSize: "13px", color: 'black' }} dir="ltr">
                    <span>Note: The Registration ID is a finger print for the Computer running the application. It is genearted using the hard disk serial number, the ethernet address, the host name and the IP address. It does not contain any personally identifiable information about the user.</span>
                </div>
            </fieldset>
            <div style={{ marginTop: "17px" }}>
                <fieldset>
                    <legend>
                        <div style={{ fontSize: "14px" }}>License Search Mode</div>
                    </legend>
                    <div>
                        <ChoiceGroup defaultSelectedKey="loc" className="inlineflex" options={options} onChange={_onChange} required={true} />
                    </div>
                    <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                        {local == true && (
                            <div className="ms-Grid lic-thanks" style={{ fontSize: "13px", color: 'black' }} dir="ltr">
                                <span>Search for valid license(Stanalone/Network) only from local machine.</span>
                            </div>
                        )}
                        {network == true && (
                            <div className="ms-Grid lic-thanks" style={{ fontSize: "13px", color: 'black' }} dir="ltr">
                                <span>Search for valid Network license from other server machine(s).</span>
                            </div>
                        )}
                        {auto == true && (
                            <div className="ms-Grid lic-thanks" style={{ fontSize: "13px", color: 'black' }} dir="ltr">
                                <span>Search for valid license everywhere(Stanalone/Network) from local machine and network license from other server machine(s).</span>
                            </div>
                        )}
                    </div>
                    <div className="ms-Grid-row" style={{ float: 'right' }}>
                        <button  style={{ marginTop: "9px", height: "22px" }} disabled={true}>Save Settings</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}
export default LicenseInformation;