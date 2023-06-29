import React, { useState, useEffect } from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { ipcRenderer } from 'electron';
import { applylicense } from "../../../App/Config";
import { post, get } from "../../../../services/DataService";
import { checkLicense, fingerprint } from "../../../App/Config";
import { connect } from "react-redux";
import * as actionCreators from '../../../../store/Worksheet/Sort'; 

const { remote } = require('electron');
const options: IChoiceGroupOption[] = [
    { key: 'prod', text: 'Product Key' },
    { key: 'v2c', text: 'V2C File' },
    { key: 'h2h', text: 'H2H File' },
];
const LicenseActivation = (props) => {
    const [filepath, setFilePath] = useState('')
    const [disablefile, setDisableFile] = useState(false)
    const [disableproductkey, setDisableProductKey] = useState(false)
    const [disableapplylicense, setDisableApplyLicense] = useState(true)
    const [selectedkey, setKey] = useState(props.selectedKey == ''?'prod':props.selectedKey)
    const [productkey, setProductKey] = useState('')


    useEffect(() => {
        if (selectedkey == "prod") {
            setDisableFile(true)
            setDisableProductKey(false)
            if (productkey == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }
        }
        else if (selectedkey == "h2h") {
            setDisableProductKey(true)
            setDisableFile(false)
            if (filepath == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }
        }
        else if (selectedkey == "v2c") {
            setDisableProductKey(true)
            setDisableFile(false)
            if (filepath == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }
        }
    }, [])
    const _onChange = (ev, item) => {
        props.selectOPtion(item.key)
        if (item.key == "prod") {
            setKey(item.key)
            setDisableFile(true)
            setDisableProductKey(false)
            setFilePath('')
            if (productkey == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }

        }
        else if (item.key == "h2h") {
            setKey(item.key)
            setDisableProductKey(true)
            setDisableFile(false)
            if (filepath == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }

        }
        else if (item.key == "v2c") {
            setKey(item.key)
            setDisableProductKey(true)
            setDisableFile(false)
            if (filepath == "") {
                setDisableApplyLicense(true)
            }
            else {
                setDisableApplyLicense(false)
            }

        }
        console.log("key", item.key)
    }
    const ProductKey = (value: string) => {
        console.log("ProductKey", value)
        setProductKey(value)
        if (value !== "") {
            setDisableApplyLicense(false)
        }
        else if (value == "") {
            setDisableApplyLicense(true)

        }

    }
    const FilePath = (event) => {
        let saveDialog = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), {
            filters: [
                { name: 'V2C', extensions: ['v2c'] }]
        });
        let value
        if (saveDialog !== undefined) {
            value = saveDialog.toString();
        }
        console.log("here file path<>>>>", saveDialog)
        setFilePath(value)
        if (value !== "") {
            console.log("entered", value);
            setDisableApplyLicense(false)
        }
        else {
            setDisableApplyLicense(true)
        }
        console.log("filepath", value);
    }
    const ApplyLicenses = async () => {
        console.log("LicenseResult", selectedkey)
        if (selectedkey == "v2c") {
            let body = { apply_mode: 0, file_path: filepath, lic_key: "" }
            let sendRes = await post(applylicense, body);
            console.log("here value from main", sendRes)
            alert(sendRes.data.result.license_status_message)
            if (sendRes.data.result.license_apply_status == true) {     
                setTimeout( ()=>{   
                    ipcRenderer.send('window_restart');
               }, 5000);
            }
            else{
                props.setSelectedKey('Log')

            }

            props.setlogInfo(sendRes.data.result.log_info)
            props.ApiCall()
        }
        else if (selectedkey == "prod") {

            let body = { apply_mode: 1, file_path: "", lic_key: productkey }
            let sendRes = await post(applylicense, body);
            console.log("here value from main", sendRes)
            alert(sendRes.data.result.license_status_message)
            if (sendRes.data.result.license_apply_status == true) {     
                setTimeout( ()=>{   
                    ipcRenderer.send('window_restart');
               }, 5000);
            }
            else{
              props.setSelectedKey('Log')
            }
            props.setlogInfo(sendRes.data.result.log_info)
            let sendRes1 = await get(checkLicense);
            console.log("here get", sendRes1)
            props.ApiCall()
        }

    }
    return (
        <div className="lic-contact">
            <fieldset>
                <legend>
                    <div style={{ fontSize: "14px" }}>Active License</div>
                </legend>
                <div style={{ fontSize: "12px", border: "1px solid grey", padding: "10px", width: "578px", overflowX: "scroll" }} className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg2 " style={{ width: "100px" }}>
                            <div style={{ borderRight: "1px solid lightgrey", padding: "7px 0px" }}>Product Name</div>
                            <div dangerouslySetInnerHTML={{ __html: props.productInfo[0].prodName }}></div>
                        </div>
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 " style={{ width: "100px" }}>
                            <div style={{ borderRight: "1px solid lightgrey", padding: "7px 0px" }}>Version</div>
                            <div dangerouslySetInnerHTML={{ __html: props.productInfo[0].version }}></div>
                        </div>
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 " style={{ width: "100px" }}>
                            <div style={{ borderRight: "1px solid lightgrey", padding: "7px 0px" }}>License Type</div>
                            <div dangerouslySetInnerHTML={{ __html: props.productInfo[0].licType }}></div>
                        </div>
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg3 " style={{ width: "130px" }}>
                            <div style={{ borderRight: "1px solid lightgrey", padding: "7px 0px" }}>Expired in Days</div>
                            <div dangerouslySetInnerHTML={{ __html: props.productInfo[0].expire }}></div>
                        </div>
                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 " style={{ width: "130px" }}>
                            <div style={{ padding: "7px 0px" }}>License Manager</div>
                            <div dangerouslySetInnerHTML={{ __html: props.productInfo[0].licManager }}></div>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: "13px" }} className="ms-Grid lic-thanks" dir="ltr">
                    {props.textfordisplay == "invalidLic" && (
                        <span style={{ color: "red" }}>Active License not found, Please apply a new license</span>
                    )}
                    {props.textfordisplay == "validLic" && (
                        <span>Thank you for purchasing SigmaPlot.If you have any questions please contact one of the sales offices listed in the contacts tab.</span>
                    )}
                    {props.textfordisplay == "trialLic" && (
                        <span>Thank you for evaluating SigmaPlot.You can upgrade this to a full version at anytime bt contacting one of the sales offices listed in the information tab. If you already have a new license, pick the new license file or License Key and click the 'Apply License' button below to install it.</span>
                    )}
                </div>
            </fieldset>
            <div style={{ marginTop: "17px" }}>
                <fieldset>
                    <legend>
                        <div style={{ fontSize: "14px" }}>New License</div>
                    </legend>
                    <div>
                        <ChoiceGroup defaultSelectedKey={selectedkey} selectedKey={selectedkey} className="inlineflex" options={options} onChange={_onChange} required={true} />
                    </div>
                    <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ">
                                <div style={{ fontSize: "13px", paddingTop: "6px" }} >Product Key</div>
                            </div>
                            <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 ">
                                <TextField disabled={disableproductkey} onChange={(ev) => ProductKey(ev.target.value)} />
                            </div>
                        </div>
                        <div className="ms-Grid-row" style={{ paddingTop: "5px" }}>
                            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ">
                                <div style={{ fontSize: "13px", paddingTop: "6px" }} >License File Path</div>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ">
                                <TextField disabled={disablefile} readOnly value={filepath} />
                            </div>
                            <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ">
                                {/* <div style={{ position: "relative" }}> */}
                                {/* <div style={{ position: "absolute" }}> */}
                                <button disabled={disablefile} onClick={FilePath} className='pointer' style={{ marginTop: "9px", height: "22px" }}>Browse</button>
                                {/* </div> */}
                                {/* <input disabled={disablefile}  onChange={FilePath} style={{ zIndex: 2, opacity: 0 }} accept=".v2c" name="photo" id="upload-photo" /> */}
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ">
                            </div>
                            <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 pointer">
                                <button disabled={disableapplylicense}  className='pointer' onClick={ApplyLicenses} style={{ marginTop: "9px", height: "22px" }}>Apply License</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
return{
    selectedKey: state.sortReducer.selectedop,
}
}
const mapDispatchToProps = (dispatch) =>{
return{
    selectOPtion: (
        selectedkey:string
      ) =>
        dispatch(actionCreators.selectOPtion(selectedkey)),}
}
export default connect(mapStateToProps,mapDispatchToProps)(LicenseActivation);