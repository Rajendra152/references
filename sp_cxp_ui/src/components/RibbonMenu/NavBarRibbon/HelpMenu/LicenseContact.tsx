import React, { useEffect, useState } from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { setserialinfo, getserialinfo, getlogs } from "../../../App/Config";
import { post, get } from "../../../../services/DataService";

const LicenseContact = (props) => {
    const [disableusr, setdisableusr] = useState(true);
    const [displaybtn, setdisplaybtn] = useState('mod');
    const [userName, setuserName] = useState('');
    const [serialNo, setserialNo] = useState('');



    useEffect(() => {
        Username()
    }, [])
    const Username = async () => {
        let sendRes1 = await get(getserialinfo);
        setuserName(sendRes1.data.result.Uname)
        setserialNo(sendRes1.data.result.sSerNum)
        console.log("output rocks", sendRes1)
    }
    const Modify = () => {
        setdisplaybtn('sub')
        setdisableusr(false)
    }
    const Submit = async () => {
        // let sendRes1 = await get(getserialinfo);
        // if (sendRes1.data.result.Uname == userName && sendRes1.data.result.sSerNum == serialNo) {
        //     alert('Entered values are same with existing information')
        // }
        // else {
        let body = { name: userName, serial_number: serialNo }
        let sendRes = await post(setserialinfo, body)
        console.log("output rocks", sendRes)
        if (sendRes.data.status == "success") {
            console.log("output rocks2", sendRes)
            alert(sendRes.data.result.sStatusMsg)

        }
        setuserName(sendRes.data.result.Uname)
        setserialNo(sendRes.data.result.sSerNum)
        setdisableusr(true)
        setdisplaybtn('mod')
        console.log("here", sendRes)
        // }
    }
    const setserialNoS = (type, ev) => {
        console.log("changed value", type, ev.target.value)
        if (type == "user") {
            setuserName(ev.target.value)
        }
        else {
            setserialNo(ev.target.value)
        }
    }
    return (
        <div className="lic-contact">
            <fieldset>
                <legend>
                    <div style={{ fontSize: "14px" }}>This product is licensed to</div>
                </legend>
                <div style={{ fontSize: "13px" }} className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 ">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 ">
                                    <div style={{ fontSize: "13px", paddingTop: "6px" }} >User Name</div>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ">
                                    <TextField disabled={disableusr} value={userName} onChange={(ev) => setserialNoS("user", ev)} />
                                </div>
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 ">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 ">
                                    <div style={{ fontSize: "13px", paddingTop: "6px" }} >Serial Number</div>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ">
                                    <TextField disabled={disableusr} value={serialNo} onChange={(ev) => setserialNoS("serial", ev)} />
                                </div>
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ">
                            <div className="ms-Grid-row" style={{ float: 'right' }}>
                                {displaybtn == 'mod' && (
                                    <button onClick={Modify} style={{ marginTop: "9px", height: "22px" }}>Modify</button>
                                )}
                                {displaybtn == 'sub' && (
                                    <button onClick={Submit} style={{ marginTop: "9px", height: "22px" }}>Submit</button>
                                )}


                            </div>
                        </div>

                    </div>
                </div>

            </fieldset>
            <div>
                <fieldset>
                    <legend>
                        <div style={{ fontSize: "14px" }}>Contacts</div>
                    </legend>
                    <div className="ms-Grid lic-thanks" style={{ fontSize: "12px", color: 'black' }} dir="ltr">
                        <div style={{ textAlign: "center", marginBottom: "11px", display: 'flex', justifyContent: 'center' }} >Visit us on the web at:&nbsp; <div className="text-info-lic pointer" onClick={() => require('electron').shell.openExternal('https://systatsoftware.com/products/sigmaplot/')}>www.systatsoftware.com</div></div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ">
                                <div>AMERICAS </div>
                                <div style={{ marginTop: "5px" }}>Inpixon </div>
                                <div>Phone: 800-797-7401 or 408-876-4505 </div>
                                <div>Fax: 800-797-7406 or 408-452-9016 </div>
                                <div>Technical Support Phone:1-408-452-9010 </div>
                                <div style={{ display: 'flex' }} >Email:&nbsp; <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.sales@inpixon.com')}>saves.sales@inpixon.com</span></div>
                                <div style={{ display: 'flex' }} >Support:&nbsp;  <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.techsupport@inpixon.com')}>saves.techsupport@inpixon.com</span></div>
                                <div style={{ margin: "10px 0px" }} >Germany & Austria </div>
                                <div>Inpixon GmbH Office </div>
                                <div style={{ display: 'flex' }} >Email:&nbsp; <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saveskontakt@inpixon.com')} >saveskontakt@inpixon.com</span></div>
                                <div style={{ display: 'flex' }} >Support:&nbsp;  <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.eurotechsupport@inpixon.com')}>saves.eurotechsupport@inpixon.com</span></div>
                                <div style={{ display: 'flex' }} >Website:&nbsp; <span onClick={() => require('electron').shell.openExternal('http://www.systat.de/')} className="text-info-lic pointer">www.systat.de</span></div>

                            </div>
                            <div style={{ padding: '0px' }} className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ">
                                <div>United Kingdom & Ireland: </div>
                                <div style={{ marginTop: "5px" }}>Inpixon UK Office </div>
                                <div style={{}} >Email:&nbsp;  <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.sales@inpixon.com')}>saves.sales@inpixon.com</span></div>
                                <div style={{}} >Support:&nbsp; <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.techsupport@inpixon.com')}>saves.techsupport@inpixon.com</span></div>
                                <div style={{ marginTop: "57px", marginBottom: "10px" }} >Asia Pacific & India </div>
                                <div>Inpixon India Office</div>
                                <div style={{ display: 'inline' }} >Asia Pacific Sales:&nbsp; <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.apac.sales@inpixon.com')}>saves.apac.sales@inpixon.com</span></div>
                                <div className="tryFlex"  >APAC Support:&nbsp; <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.apac.support@inpixon.com')}>saves.apac.support@inpixon.com</span></div>
                                <div className="tryFlex"  >India Sales:&nbsp;  <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.indiasales@inpixon.com')}>saves.indiasales@inpixon.com</span></div>
                                <div className="tryFlex"  >India Support:&nbsp;   <span className="text-info-lic pointer" onClick={() => window.location.assign('mailto:saves.techsupport@inpixon.com')}>saves.techsupport@inpixon.com</span></div>


                            </div>
                        </div>
                    </div>

                </fieldset>
            </div>
        </div>
    )
}
export default LicenseContact