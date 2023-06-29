import React, { Dispatch, useState } from 'react'
import { connect } from 'react-redux'
import { IState, INotebook, IAction, IActive, IActiveItems } from '../Redux/notebookReducer';
import { CREATE_NOTEBOOK } from '../Redux/actionConstants';
import { useEffect } from 'react';
import {
    Label, IconButton, Toggle
} from 'office-ui-fabric-react';
import NotebookComponent from './NotebookComponent';
import { checkNotNull } from '../Constant/ConstantFunction';


// const obj = {
//     id : Math.random(),
//     name : "Notebook"+ Math.random()
// }

// function NotebookManager(props){
//     function createNotebook(obj:INotebook){
//         props.createNotebook(obj)
//         return props.notebooks
//     }

//     const notebookitems = props.notebooks.length ? props.notebooks : createNotebook(obj);
//     const notebooks = notebookitems.map((item:INotebook) =>
//         <li>{item.name}</li>
//     )
//     return (
//         <ul>{notebooks}</ul>
//     )
// }

// function mapStateToProps(state:IState) {
//     return {
//         notebooks : state.notebooks
//     }
//   }

//   function mapDispatchToProps(dispatch: Dispatch<IAction>){
//     return {
//         createNotebook: (nobj:INotebook)=>{
//             dispatch({ type : 'CREATE_NOTEBOOK', payload : nobj})
//         }
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(NotebookManager)


// const notebookSample = {
//     "note_id": "id_for_notebook",
//     "name": "Notebook1",
//     "children":
//         [
//             {
//                 "id": "section_id1",
//                 "name": "section1",
//                 "parent": 0,
//                 "type": "section",
//                 "worksheet": {
//                     "id": "worksheet1",
//                     "name": "worksheet_data1",
//                     "parent": "section_id1",
//                     "type": "worksheet",
//                     "data": [[{}, {}]]
//                 }
//             },
//             {
//                 "id": "section_id2",
//                 "name": "section2",
//                 "parent": 0,
//                 "type": "section",
//                 "worksheet": {
//                     "id": "worksheet2",
//                     "name": "worksheet_data2",
//                     "parent": "section_id2",
//                     "type": "worksheet",
//                     "data": [[{}, {}]]
//                 },
//                 "children": [{
//                     "id": "section_id3",
//                     "name": "section3",
//                     "parent": "section_id2",
//                     "type": "report_section",
//                     "worksheet": {
//                         "id": "worksheet3",
//                         "name": "worksheet_data3",
//                         "parent": "section_id3",
//                         "type": "worksheet",
//                         "data": [[{}, {}]]
//                     }
//                 }
//                 ]

//             }
//         ]
// }

const notebookSample = {
    "note_id": "id_for_notebook",
    "name": "Notebook1",
    "children":
    [
        {
            "id": "section_id1",
            "name": "section1",
            "parent":0 ,
            "type": "section",
            "worksheet" :  {
                "id": "worksheet1",
                "name": "worksheet_data1",
                "parent": "section_id1",
                "type": "worksheet",
                "data": [[{},{}]]
            },
            "report" : {
                "id": "report_id",
                "type": "report",
                "name": "descriptive_statistics_report",
                "section": "section_id",
                "worksheet": "worksheet_id",
                "data": "html_string",
                "result_graph": [{
                  "bar_chart": {"x": [],"y": [],"error": []}
                },{}]
              }
        },
        {
            "id": "section_id2",
            "name": "section2",
            "parent":0 ,
            "type": "section",
            "worksheet" :  {
            "id": "worksheet2",
            "name": "worksheet_data2",
            "parent": "section_id2",
            "type": "worksheet",
            "data": [[{},{}]]
            },
            "children" : [{
                "id": "section_id3",
                "name": "section3",
                "parent":"section_id2" ,
                "type": "report_section",
                "worksheet" :  {
                    "id": "worksheet3",
                    "name": "worksheet_data3",
                    "parent": "section_id3",
                    "type": "worksheet",
                    "data": [[{},{}]]
                    }
                }
            ]
  
        }
    ]
  }


const NotebookManager = (props) => {
    console.log(props);
    const addNotebooks = (notebook: INotebook) => {
        props.addNotebooks(notebook)
    }

    const clearNotebooks = () => {
        props.clearNotebooks();
        // props.onClickCloseSideMenu();
    }

    const handleClick = (activeItem: IActiveItems) => {
        if (props.activeItems.indexOf(activeItem) == -1) {
            props.setActiveItem(activeItem)
        }

    }
    // const notebooks = checkNotNull(props.notebooks)? props.notebooks.length ?
    //                     props.notebooks.map((item:INotebook) =>
    //                         <NotebookComponent onNotebookClick={handleClick} notebook={item}/>
    //                     ) :
    //                     [] : []
    const pin = {iconName : "Pin"}
    const close = {iconName : "ChromeClose"}
    const add = { iconName: "Add" };
    const remove = { iconName: "Delete" }
    const [notetoggle, setnotetoggle] = useState(true);
    const [sumtoggle, setsumtoggle] = useState(true);
    const noteToggleclick = () =>{
        setnotetoggle (!notetoggle)
    }
    const sumToggleclick = () =>{
        setsumtoggle (!sumtoggle)
    }
    return (
        <div>
            
            <div className="sidemenu-notebook-continer">
                <div className="sidemenu-notebook-header">
                    <Label>Notebook Manager</Label>
                    <div className="icon-group">
                            <IconButton className="sidemenu-icon" iconProps={pin} onClick={() => props.addNotebooks(notebookSample)} />
                            <IconButton className="sidemenu-icon" iconProps={close} onClick={clearNotebooks} />
                        </div>
                </div>
                <div className="sidemenu-notebook-content">
                    <div className="sidemenu-notebook-list">
                        <Label>All Notebooks</Label>
                        <div className="icon-group">
                            <IconButton className="sidemenu-icon" iconProps={add} onClick={() => props.addNotebooks(notebookSample)} />
                            <IconButton className="sidemenu-icon" iconProps={remove} onClick={clearNotebooks} />
                        </div>
                        <Toggle defaultChecked onChange={noteToggleclick} />
                    </div>
                    {notetoggle ?  <div className="sidemenu-notebook-list-content notebook-list">
                        <>{checkNotNull(props.notebooks) ? props.notebooks.length ?
                            props.notebooks.map((item: INotebook) =>
                                <NotebookComponent onNotebookClick={handleClick} notebook={item} />
                            ) :
                            [] : []}</>
                    </div> : ""}
                   
                    <div className="sidemenu-notebook-list">
                        <Label>Summary Information</Label>
                        <Toggle defaultChecked onChange={sumToggleclick}  />
                    </div>
                    {sumtoggle?
                    <div className="sidemenu-notebook-list-content">
                        <div className="summary-row">
                        <div className="summary-dd-label"><label className="date">Created</label></div>
                        <div className="summary-dd-content"><span className="date-vlu">3/25/2021</span></div>
                        </div>
                        <div className="summary-row">
                        <div className="summary-dd-label"><label className="date">Created</label></div>
                        <div className="summary-dd-content"><span className="date-vlu">3/25/2021</span></div>
                        </div>
                        <div className="summary-row">
                            <div className="summary-dd-label"><label>Author</label></div>
                            <div className="summary-dd-content"><span>John doe</span></div>
                        </div>
                        <div className="summary-row">
                            <div className="summary-dd-label"><label>Description</label></div>
                            <div className="summary-dd-content"><span>Worksheet</span></div>
                        </div>
                        </div>
                        :""}
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}


function mapStateToProps(state: IState) {
    return {
        notebooks: state.notebookReducer.notebooks,
        activeItems: state.notebookReducer.activeItems
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
    return {
        addNotebooks: (nobj: INotebook) => {
            dispatch({ type: 'ADD_NOTEBOOK', payload: nobj })
        },
        getNotebooks: () => {
            dispatch({ type: 'GET_NOTEBOOK' })
        },
        clearNotebooks: () => {
            dispatch({ type: 'CLEAR_NOTEBOOK' })
        },
        createNotebook: (nobj: INotebook) => {
            dispatch({ type: 'CREATE_NOTEBOOK', payload: nobj })
        },
        setActiveItem: (activeItem: IActiveItems) => {
            dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem })
        }
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(NotebookManager)
