import React, { useState, useEffect } from 'react';
import Helpnav from './helpNav';
import Helpdisplay from './helpDisplay';

import WizardTitleBar from '../../../RibbonMenu/TitleBarHelp';


const Mainhelp = (props) => {
    console.log("1help", props.match.params.helpId)
    const [selectedId, setSelectedId] = useState(props.match.params.helpId)
    // const [selectedparentId , setSelectedParentId] = useState(props.match.params.parentId)

    const SelectedNode = (id) => {
        console.log("iii", id)
        setSelectedId(id)
    }
    useEffect(() => {
        setSelectedId(props.match.params.helpId)
        // setSelectedParentId(props.match.params.parentId)
    }, [])
    return (
        <>
            <WizardTitleBar type="" title="" />

            <div className="ms-Grid help-main-menu" dir="ltr" style={{ height: "100%" }}>
                <div className="ms-Grid-row" style={{ height: "100%" }}>
                    {/* <div className="ms-Grid-col ms-sm3 zero-pad" style={{ height: '570px', overflowY: 'auto' }} >
                <Helpnav SelectedNode={SelectedNode}  selectedId={selectedId}/>
            </div>
            <div className="ms-Grid-col ms-sm9" > */}
                    <Helpdisplay selectedId={selectedId} />
                    {/* </div> */}
                </div>
            </div>
        </>)
}
export default Mainhelp