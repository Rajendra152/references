import * as types from './actionTypes'

export const setHelpWindowOpen = (RibbonMenu,selectedElement,selectedItem) => {
    return (dispatch) => {
        dispatch(openHelpMenu(RibbonMenu,selectedElement,selectedItem))
    }
}

const openHelpMenu = (RibbonMenu,selectedElement,selectedItem) => ({
    type: types.HELPWINDOWOPEN,
    RibbonMenu:RibbonMenu,
    selectedElement:selectedElement,
    selectedItem:selectedItem
})

export const setpageSetup = (message) => {
    return (dispatch) => {
        console.log("entered",message)
        dispatch(openpagesetup(message))
    }
}

const openpagesetup = (setpageSetup) => ({
    type: types.OPENPAGESETUP,
    setpageSetup:setpageSetup
})


export const setpageSize = (width,height) => {
    return (dispatch) => {
        console.log("entered",width,height)
        dispatch(openpagesize(width,height))
    }
}

const openpagesize = (width,height) => ({
    type: types.SETHEIGHTWIDTH,
    width:width,
    height:height
})