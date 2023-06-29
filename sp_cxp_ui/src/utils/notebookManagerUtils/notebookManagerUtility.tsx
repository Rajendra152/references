export const getUpdatedNewProps = (newProps:any, updateState:any) => {
  const latestProps = {
    ...newProps,
    notebooks:{
      ...newProps.notebooks,
      ...(updateState.allNbk) && {allNotebooks:updateState.allNbk},
      ...(updateState.allSec) && {allSections:updateState.allSec},
      ...(updateState.allWrk) && {allWorksheets:updateState.allWrk},
      ...(updateState.allGrPg) && {allGraphPages:updateState.allGrPg},
      ...(updateState.allRep) && {allReports:updateState.allRep},
    },
    ...(updateState.actvItm) && {activeItems:updateState.actvItm},
    ...(updateState.allActvItm) && {allActiveItem:updateState.allActvItm},
  }

  return latestProps
}
