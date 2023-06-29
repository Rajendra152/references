import React, { useEffect, useState } from "react";
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
  DropDownListComponent,
  ListBoxComponent
} from '@syncfusion/ej2-react-dropdowns';
import * as sortAction from '../../../store/Worksheet/Sort/actions';
import { setDialogInstance } from '../../../store/Worksheet/SpreadSheet/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dialog } from "electron";


const Sort = (props) => {
  let dialogInstance: DialogComponent

  let boldRight = { fontWeight: 'bold', textAlign: 'right' };
  let bold = { fontWeight: 'bold' };
  let ddData = [{ text: 'None', value: 'none' }];
  let RadioValue = 'Ascending';
  let sortDescriptors = [];
  let listboxobj = {}
  let ddLInstance
  let selectColumn = [];
  //     const handleClick = () => {
  //      dialogInstance.show();
  //     };

  const change = args => {
    let RadioValue = args.value;
    if (listboxobj.value.length) {
      var sortIndex = selectColumn.indexOf(listboxobj.value[0]);
      var columnName = selectColumn[sortIndex];
      listboxobj.removeItems([columnName]);
      listboxobj.addItems(
        { text: columnName, value: args.value },
        sortIndex
      );
      listboxobj.value = [columnName];
      sortDescriptors[sortIndex].order = args.value;
    }
  };
  const listboxChange = args => {
    var selectList = sortDescriptors[
      selectColumn.indexOf(args.value[0])
    ];
    document.querySelector(
      '#radiocomp input[value=' + selectList.order + ']'
    ).checked = true;
  };
  const dialogClose = () => {
    ddData = [{ text: 'None', value: 'none' }];
    selectColumn = [];
    listboxobj.refresh();
    ddLInstance.refresh();
    props.dialogInstance.hide();
    sortDescriptors = [];
    ddLInstance.value = null;
  };
  const dialogOpen = () => {

    var col_collection = props.referenceObjectState.element.querySelectorAll(
      '.e-header-row .e-highlight'
    );
    for (let i = 0; i < col_collection.length; i++) {
      ddData.push({
        text: 'Column ' + col_collection[i].innerText,
        value: col_collection[i].innerText
      });
    }


    // console.log("here",props.referenceObjectState.getActiveSheet())
    // console.log("here too",props.referenceObjectState.getSelectAllContent())

    // var col_collection = props.referenceObjectState.getActiveSheet().usedRange.colIndex;
    // var header_collection = props.referenceObjectState.element.getElementsByClassName(
    //   'e-header-cell'
    // );
    // console.log(header_collection, "col_collection")
    // for (let i = 0; i < col_collection + 1; i++) {
    //   if (header_collection[i].ariaColIndex == i + 1) {
    //     ddData.push({
    //       text: 'Column ' + header_collection[i].innerText,
    //       value: header_collection[i].innerText
    //     });
    //   }
    // }
    ddLInstance.dataSource = ddData;
  };
  const ddLChange = args => {
    if (args.value != null) {
      if (
        selectColumn.indexOf(args.value) == -1 &&
        args.value != 'None'
      ) {
        selectColumn.push(args.value);
        sortDescriptors.push({
          field: args.itemData.value,
          order: RadioValue
        });
        listboxobj.addItems({
          text: args.value,
          value: RadioValue
        });
        listboxobj.value = [args.value];
      } else {
        if (args.value == 'None' && listboxobj.value.length) {
          args.value = listboxobj.getDataList()[0].text;
        }
        if (listboxobj.value.length) {
          var selectList = sortDescriptors[
            selectColumn.indexOf(args.value)
          ];
          document.querySelector(
            '#radiocomp input[value=' + selectList.order + ']'
          ).checked = true;
          listboxobj.value = [args.value];
        }
      }
    }
  };

  const contentTemplate = () => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className="custom" id="selectcolumn" />
            </tr>
            <tr>
              <td>
                <label>Select Key Columns</label>
              </td>
            </tr>
            <tr>
              <td  style={{border:"1px solid lightgrey"}}
>
                <DropDownListComponent
                  id="ddlelement"
                  className="e-icon-anim"
                  dataSource={ddData}
                  style={{border:"none"}}
                  width="200"
                  change={(args) => ddLChange(args)}
                  ref={ddList => (ddLInstance = ddList)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ListBoxComponent
                  ref={scope => (listboxobj = scope)}
                  change={(args) => listboxChange(args)}
                  itemTemplate='<div class="list-wrapper"><span class="text">${text}</span><span class="description">${value}</span></div>'
                />
              </td>
              <td>
                <table id="radiocomp">
                  <tbody>
                    <tr>
                      <td>
                        <label> Sort Order </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RadioButtonComponent
                          name="sorting"
                          value="Ascending"
                          label="Ascending"
                          checked={true}
                          change={change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RadioButtonComponent
                          name="sorting"
                          value="Descending"
                          label="Descending"
                          change={change}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  const convertLetterToNumber = (str) => {
    str = str.toUpperCase();
    let out = 0,
      len = str.length;
    for (let pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  }
  const applySortFunction = () => {
    var max = 0,
      min = 10000000,
      end_col,
      start_col;
    for (let i = 0; i < sortDescriptors.length; i++) {
      var num = convertLetterToNumber(sortDescriptors[i].field);
      if (num > max) {
        max = num;
        end_col = sortDescriptors[i].field;
      }
      if (num < min) {
        min = num;
        start_col = sortDescriptors[i].field;
      }
    }
    let selectedRange = props.referenceObjectState.sheets[0].selectedRange;
    const myArray = selectedRange.split(":");
    let startCell = myArray[0];
    let endCell = myArray[1]
    let startCellnum = startCell.replace(/[0-9]/g, "");
    let endCellnum = endCell.replace(/[0-9]/g, "");
    var lastRow = props.referenceObjectState.getActiveSheet().usedRange.rowIndex+1;
      var range = startCellnum + '0:' + endCellnum + lastRow;
      console.log("rnage" , startCellnum,endCellnum,selectedRange)
    props.referenceObjectState.sort({
      sortDescriptors: sortDescriptors,
      containsHeader: false
    },
    range);
    // this.dialogInstance.hide();


    // for (let i = 0; i < selectColumn.length; i++) {
    //   var colum = selectColumn[i].split(' ')[1];
    //   var range = colum + '0:' + colum + lastRow;
    //   props.referenceObjectState.sort({
    //     sortDescriptors: sortDescriptors[i],
    //     containsHeader: false
    //   },
    //     range);
    // }
    sortDescriptors = []
    if(selectColumn.length == 0){
      alert("A key column has not been selected")
    }
    else{
      props.dialogInstance.hide()

    }
  };




  const cancelClick = () => {
    dialogClose();
    props.dialogInstance.hide()
  }
  const footerTemplate = () => {
    return (
      <div>
        <button
          id="okBtn"
          className="e-control e-small e-btn e-primary"
          data-ripple="true"
          onClick={applySortFunction}
        >
          Ok
        </button>
        <button
          id="cancelBtn"
          className="e-control e-small e-btn e-primary"
          data-ripple="true"
          onClick={cancelClick}
        >
          Cancel
        </button>
      </div>
    );
  }
  useEffect(() => {
    // setTimeout(() => {
    //   document.getElementById('okBtn').onclick = () => {
    //     props.referenceObjectState.sort({
    //       sortDescriptors: sortDescriptors,
    //       containsHeader: false
    //     });
    //     dialogInstance.hide();
    //   };
    //   document.getElementById('cancelBtn').onclick = () => {
    //     dialogClose();
    //     dialogInstance.hide();
    //   };
    // });
  }, [props])

  useEffect(() => {
    props.actions.setDialogInstance(dialogInstance)
  }, [])

  return (
    <div className="App" id="dialog-target">
      <DialogComponent allowDragging={true}
        ref={dialog => (dialogInstance = dialog)}
        width="500px"
        header="Sort Selection"

        content={contentTemplate}
        footerTemplate={footerTemplate}
        open={dialogOpen}
        visible={false}
        close={dialogClose}
        isModal={true}
      />
      {/* <DialogComponent
            ref={dialog => (dialogInstance = dialog)}
            width="500px"
            target="#sample"
            footerTemplate={footerTemplate}
            content={() => contentTemplate}
            header="Sort Selection"
            showCloseIcon={true}
            open={dialogOpen}
            visible={false}
            close={dialogClose}
          /> */}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isOpenFind: state.findReducer.isOpenFind,
    isOpenReplace: state.replaceReducer.isOpenReplace,
    isOpenGoto: state.gotoReducer.isOpenGoto,
    isOpenSort: state.sortReducer.isOpenSort,
    insertState: state.insertReducer,
    deleteState: state.deleteReducer,
    formatCellState: state.formatCellReducer,
    titlesState: state.titlesReducer,
    graphicCellState: state.graphicCellReducer,
    importDBState: state.importDBReducer,
    referenceObjectState: state.instanceReducer.instance,
    dialogInstance: state.instanceReducer.dialogInstance
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sortAction: bindActionCreators(sortAction, dispatch),
      setDialogInstance: bindActionCreators(setDialogInstance, dispatch)
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
