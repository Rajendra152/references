import React, { useState,useEffect } from 'react'
import { getData } from './ReportData'
import { Editor } from '@tinymce/tinymce-react'

//  let unrtf = window.require('unrtf');
import rtf2html from 'unrtf'
// const unrtf  = window.require('unrtf')


const Report = ()=>{

    const handleEditorChange = (content:any,editor:any)=>{
      setData(content)
    }

    const [data,setData] = useState('')

    // fetch('./cba/index.htm')
    // .then(response => response.text())
    // .then(text => setData(text))

    // tinymce.init({
    //   selector: "#textarea"
    // })

    useEffect(()=>{
    //   async function getReportData(key:string) {
    //     const rtfData = await getData(key);
    //     const jsonData = JSON.parse(rtfData);
    //     rtf2html(jsonData["report"],{'engine':'unrtf'},(err,res)=>{
    //       console.log(res.html)
    //       setData(res.html);
    //     })
    //   }

    // getReportData('ttest_response_1615545312')

      fetch(__dirname + '/../assets/report.html')
      .then(response => response.text())
     .then(text => setData(text))

    },[])


      return (
        <>
        <Editor
         initialValue={data}
         value={data}
         init={{
           height: 450,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste imagetools wordcount'
           ],
           toolbar:
            'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
         }}
          onEditorChange={handleEditorChange}
       />

      {/* <div id="#textarea">
         {data}
      </div> */}
      </>
   );
}


  export default Report;

