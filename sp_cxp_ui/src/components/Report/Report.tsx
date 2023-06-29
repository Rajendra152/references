import React, { useEffect } from 'react'
import { getData } from './ReportData'

const Report = () => {
    let tej: any;
    useEffect(() => {
        function Hypertext(obj: any, HText: string, HCode: string) {
            var url = HCode;  // strip any surrounding quotes
            var len = url.length;
            if (len > 2 && url.charAt(0) == '"' && url.charAt(len - 1) == '"') url = url.substr(1, len - 2);

            if (url.indexOf("http://") == 0) window.open(url);
            else if (url.indexOf("www.") == 0) window.open("http://" + url);
            else alert("Hypertext: " + HText + "\nCode/url: " + HCode);
        }


        function ControlCreated(te: any) {
            tej = te;  // save in a global varible for easy access
            tej.TerCommand(tc.ID_SHOW_PAGE_LAYOUT);
            // an example of catching the preprocess event
            tej.TerSetEvent("Hypertext", Hypertext);

        }

        var te1 = window.TerInit('ter1');    // Create the editor session
        ControlCreated(te1);
    })

    const isModified = (event: any) => {
        event.preventDefault()
        const reportData = getData()
        let a = tej.SetTerBuffer(reportData, 'title')
        console.log(a)
    }

    return (
        <div>
            <button onClick={isModified}>save</button>
            <canvas
                id="ter1"
                width="600"
                height="400"
                style={{ 'position': 'relative', 'left': '50px', 'top': '75px', 'border': '1px solid' }}
                data-word-wrap="true"
                data-fitted-view="false"
                data-show-menu="true"
                data-show-tool-bar="true"
                data-border-margin="true"
                data-rtf-output="true"
                data-read-only-mode="false"
                data-vert-scroll-bar="true"
                data-horz-scroll-bar="true"

            >
                Sorry, this browser does not support HTML 5.
        </canvas>

        </div>
    )

}

export default Report
