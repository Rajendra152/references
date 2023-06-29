import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class Report extends React.Component {
  constructor(props: Object) {
    super(props);
  };
  // handleEditorChange = (content, editor) => {
  //   console.log('Content was updated:', content);
  // }
  render() {
    return (
      <Editor
         initialValue={this.props.htmlString}
         apiKey="wr96owyaaidpmpk76t3ywxghq4cq8zeogyyqmwdla4loe46c"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
         }}
         onEditorChange={this.props.handleEditorChange}
       />
    )
  }
}
