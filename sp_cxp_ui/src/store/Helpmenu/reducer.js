import * as types from './actionTypes'

const initialState = {
    HelpValue: [{
        RibbonMenu: "introduction",
        selectedElement: "",
        selectedItem: "",
        pageSetup: false
    }],
    pageSetup: false,
    width:"",
    height:""

}

const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HELPWINDOWOPEN:
            state.HelpValue[0].RibbonMenu = action.RibbonMenu,
                state.HelpValue[0].selectedElement = action.selectedElement,
                state.HelpValue[0].selectedItem = action.selectedItem
            return { ...state }
        case types.OPENPAGESETUP:
            console.log("entered here also",)
            state.pageSetup = action.setpageSetup
            return { ...state }
        case types.SETHEIGHTWIDTH:
            console.log("entered here also",)
            state.width = action.width,
            state.height = action.height

            return { ...state }
        default:
            return state
    }
}

export default instanceReducer