import * as React from 'react';




const Helpdisplay = (props) => {
    return (<div style={{height:"100%"}}>
        <iframe src={`../assets/HelpContent/${props.selectedId}.html`} width="100%" style={{border:"none"}} height="100%" title="help"></iframe>
    </div>
    )
}
export default Helpdisplay