
import {
    setWorksheetData,
} from './../../services/WorksheetServicesNew';

import * as TYPES from './../../services/notebookManagerServices/ConstantsNotebookManager';


export const openNotebookFromFile = async  (openNbk: any, props: any) => {
    try {
        const currNbkId = openNbk.allNotebooks.allNotebooksId[0];
        const currNbk = openNbk.allNotebooks.byId[currNbkId]
        console.log("openNbk",openNbk)
        const allOldNbk = Object.values(props.notebooks.allNotebooks.byId);
        let isNbkExist = false;
        for (const nb of allOldNbk) {
            if (nb.name === currNbk.name) {
                isNbkExist = true;
                break;
            }
        }

        if (!isNbkExist) {
            const newId = 'Nbks_' + new Date().getTime()
            const newNbkOpen = JSON.parse(JSON.stringify(openNbk).replaceAll(currNbkId, newId));
            const newNbkId = newNbkOpen.allNotebooks.allNotebooksId[0];
            const newNbk = newNbkOpen.allNotebooks.byId[newNbkId]
            const newNbkState = {
                allNotebooks: {
                    byId: {
                        ...newNbkOpen.allNotebooks.byId
                    },
                },
                allSections: {
                    byId: {
                        ...newNbkOpen.allSections.byId
                    },
                    allSectionsId: {
                        ...newNbkOpen.allSections.allSectionsId
                    }
                },
                allWorksheets: {
                    byId: {
                        ...newNbkOpen.allWorksheets.byId
                    },
                    allWorksheetsId: [...newNbkOpen.allWorksheets.allWorksheetsId]
                },
                allGraphPages: {
                    byId: {
                        ...newNbkOpen.allGraphPages.byId
                    },
                    allGraphPagesId: [...newNbkOpen.allGraphPages.allGraphPagesId],
                },
                allReports: {
                    byId: {
                        ...newNbkOpen.allReports.byId
                    },
                    allReportsId: [...newNbkOpen.allReports.allReportsId]
                },
                allTransforms: {
                    byId: {
                        ...newNbkOpen.allTransforms.byId
                    },
                    allTransformsId: [...newNbkOpen.allTransforms.allTransformsId]
                },
                allEquations: {
                    byId: {
                        ...newNbkOpen.allEquations.byId
                    },
                    allEquationsId: [...newNbkOpen.allEquations.allEquationsId]
                },
                allCopiedId: {
                }
            }

            console.log("newNbkState",newNbkState)
            
            const newProps = {
                ...props,
                notebooks:newNbkOpen
            }
            console.log("Hiii")
            const allOpenWrk = await storeWorksheetFromFile(newNbkOpen.allWorksheetDetails, props)
            console.log(props)
            props.pasteItem(newNbkState)
            console.log("Hyie")
            console.log(allOpenWrk)
            storeGraphFromFile(newNbkOpen.allGraphPages,props,allOpenWrk)
            let latestItem = newNbk.allAssetsId[newNbk.allAssetsId.length-1]
            for(const latestItem of newNbk.allAssetsId){
                let currItem = '';
                if(newNbkState.allWorksheets.byId[latestItem]){
                    currItem=newNbkState.allWorksheets.byId[latestItem]
                }
                else if(newNbkState.allGraphPages.byId[latestItem]){
                    currItem = newNbkState.allGraphPages.byId[latestItem]
                }
                else if(newNbkState.allReports.byId[latestItem]){
                    currItem = newNbkState.allReports.byId[latestItem]
                }
                if(currItem){
                    props.setActiveItem(currItem)
                }
            }
            setTimeout(() => {
                let currItem = '';
                if(newNbkState.allWorksheets.byId[latestItem]){
                    currItem=newNbkState.allWorksheets.byId[latestItem]
                }
                else if(newNbkState.allGraphPages.byId[latestItem]){
                    currItem = newNbkState.allGraphPages.byId[latestItem]
                }
                else if(newNbkState.allReports.byId[latestItem]){
                    currItem = newNbkState.allReports.byId[latestItem]
                }
                if(currItem){       
                    let allActiveItem = {
                        notebook: currItem.parentNotebookId,
                        section: currItem.parentSectionId,
                        worksheet: null,
                        graphPage: {
                          id: null,
                          objectId: null,
                        },
                        report: null,
                        selectedItemOnNotebook: currItem.id,
                        cursor: currItem.id,
                      };
              
                      if(currItem.type === TYPES.WORKSHEET){
                        allActiveItem.worksheet = currItem.id
                      }
                      else if(currItem.type === TYPES.GRAPHPAGE){
                        allActiveItem.graphPage.id = currItem.id
                      }
                      else if(currItem.type === TYPES.REPORT){
                        allActiveItem.report = currItem.id
                      }
                      const newSummary = {
                        id:currItem.id,
                        type:currItem.type,
                        createdDate: currItem.createdDate,
                        modifiedDate: currItem.modifiedDate,
                        author:currItem.author,
                        description:currItem.description
                      }
                      props.summaryInfoAction(newSummary)
                    props.setAllActiveItem(allActiveItem)           
                    props.setSelectedPivotItem(latestItem)
                }
            },1000)
           
        }
    }
    catch (e) {
        alert('File Not supported')
        return { code: 500, message: 'File Not supported' }
    }


}

export const storeWorksheetFromFile = async (allWrksheet: any, props: any,) => {
    let allOpenWrk=[]
    for (const wrk of allWrksheet) {
        const clientData = await setWorksheetData(
            wrk.data,
            wrk.wid
        );
        allOpenWrk.push(clientData)
        props.actions.storeWorksheet(clientData);
    }

    return allOpenWrk
}

export const storeGraphFromFile = async (allGraphPage: any, props: any, allOpenWrk:any) => {
    
    const allGrPg = Object.values(allGraphPage.byId)
    console.log("--------------> ",allGrPg)
    for (const grPg of allGrPg) {
        const openedWorksheet = allOpenWrk.filter((data) => grPg.worksheetId === data.key);
        console.log(openedWorksheet, allOpenWrk, '------>')
        for(const gr of grPg.graphList){
            const openGraph = {
                id: gr.id,
                worksheetId: grPg.worksheetId,
                wrkClient: openedWorksheet? openedWorksheet[0].client : ''
        
            }
            props.actions.storeGraph(openGraph)
        }
    }

}
