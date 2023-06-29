import zIndex from "@material-ui/core/styles/zIndex";
import { errorMonitor } from "stream";
import * as TYPES from "./allGraphType/GraphTypeConstants";
import * as ERRORTYPES from './../../components/Constant/ErrorCalculationTypes'
import { getDataFromGrid } from './GraphServices'
import { getErrorCals } from "./ErrorCalculation";

const errorObject = {
    type:'data',
    array : [],
    visible: true,
    thickness: 1,
    width:2,
    symmetric:true,
}

const ERRORORIENTATION = {
    x : 'x',
    y : 'y',
}

export const getErrorCalculations = (
        plotObj: Object,
        plotData: Object,
        subGraphType: string,
        gridData: [[]],
        index: number,
        isBar?: boolean
    )=>{
    let newPlotObj;
    console.log(subGraphType, "subGraph")
    if(
        subGraphType == TYPES.SIMPLE_ERROR_BARS ||
        subGraphType == TYPES.MULTIPLE_ERROR_BARS ||
        subGraphType == TYPES.SIMPLE_LINE_SCATTER_ERROR_BAR ||
        subGraphType == TYPES.MULTIPLE_LINE_SCATTER_ERROR_BAR ||
        subGraphType == TYPES.SIMPLE_ERROR_REGRESSION ||
        subGraphType == TYPES.MULTIPLE_ERROR_REGRESSION
    ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.y,isBar)

    }
    else if(
        subGraphType == TYPES.VERTICAL_BAR_ERROR_BAR ||
        subGraphType == TYPES.GROUPED_VERTICAL_ERROR_BAR
    ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.y,isBar)
        // newPlotObj.error_y = {
        //     ...plotObj?.error_y,
        //     symmetric:false,
        // }

    }
    else if(
        subGraphType == TYPES.HORIZONTAL_ERROR ||
        subGraphType == TYPES.HORIZONTAL_LINE_SCATTER_ERROR_BAR
    ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.x,isBar)

    }
    else if(
        subGraphType == TYPES.HORIZONTAL_BAR_ERROR_BAR ||
        subGraphType == TYPES.GROUPED_HORIZONTAL_ERROR_BAR
    ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.x,isBar)
       

    }
    else if(
        subGraphType == TYPES.BI_DIRECTIONAL_ERROR  ||
        subGraphType == TYPES.BIDIRECTIONAL_LINE_SCATTER_ERROR_BAR
    ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.x)
        newPlotObj = getErrorDataBySymbolValues(newPlotObj,plotData,gridData,index,ERRORORIENTATION.y)

    }
    else if( subGraphType == TYPES.BI_DIREC_ASYM_ERROR ){

        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.x)
        newPlotObj = getErrorDataBySymbolValues(newPlotObj,plotData,gridData,index,ERRORORIENTATION.y)
    }
    else if( subGraphType == TYPES.HORIZONTAL_ASYM_ERROR ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.x)
        newPlotObj.error_x = {
            ...plotObj?.error_x,
            array:getDataFromGrid(gridData[plotData?.error1[index]]),
            arrayminus:getDataFromGrid(gridData[plotData?.error2[index]]),
            symmetric:false,
        }


    }
    else if( subGraphType == TYPES.VERTICAL_ASYM_ERROR ){
        newPlotObj = getErrorDataBySymbolValues(plotObj,plotData,gridData,index,ERRORORIENTATION.y)

    }
    
    return newPlotObj;
}

const getErrorDataBySymbolValues = (plotObj: Object ,plotData: Object,gridData : [[]],index: number, format: string, isErrorBar)=>{
    let errorData = {
        data : [],
        xdata : [],
        ydata : [],
    }

    let newObj= {};
console.log(format,plotData,isErrorBar, "format")
    switch (plotData.symbol_values) {
        case ERRORTYPES.WORKSHEET_COLUMNS:
            let gridValue = isErrorBar ? plotData.error[index] : plotData.error1[index]
            // console.log('gridValue',gridValue,getDataFromGrid(1))
            newObj = {
                ...plotObj,
                [`error_${format}`]:{
                    ...errorObject,
                    array:getDataFromGrid(gridData[gridValue]),
                },
            }
            console.log(newObj, "newObj")
            return newObj;

        case ERRORTYPES.ASYMMETRIC_ERROR_BAR_COLUMNS:
            newObj = {
                ...plotObj,
                [`error_${format}`]:{
                    ...errorObject,
                    array:getDataFromGrid(gridData[plotData.error1[index]]),
                    arrayminus:getDataFromGrid(gridData[plotData.error2[index]]),
                    symmetric:false,
                },
            }
            return newObj;

        case ERRORTYPES.COLUMN_MEANS:
            newObj = getStatErrorColCalObj(plotData ,gridData, format ,newObj,index)
            return newObj;  
        
        case ERRORTYPES.COLUMN_MEDIAN:
            newObj = getStatErrorColCalObj(plotData ,gridData, format ,newObj,index)
            return newObj;

        case ERRORTYPES.ROW_MEANS:
            newObj = getStatErrorRowCalObj(plotData ,gridData, format ,newObj,index, false)
            return newObj;  
        
        case ERRORTYPES.ROW_MEDIAN:
            newObj = getStatErrorRowCalObj(plotData ,gridData, format ,newObj,index, false)
            return newObj;
        
        case ERRORTYPES.FIRST_COLUMN_ENTRY:
            newObj = getStatErrorColCalObj(plotData ,gridData, format ,newObj,index)
            return newObj;

        case ERRORTYPES.LAST_COLUMN_ENTRY:
            newObj = getStatErrorColCalObj(plotData ,gridData, format ,newObj,index)
            return newObj;

        case ERRORTYPES.BY_CATERGORY_MEAN:
            newObj = getStatErrorCategoryCalObj(plotData ,gridData, format ,newObj,index)
            return newObj;

        case ERRORTYPES.FIRST_ROW_ENTRY:
            newObj = getStatErrorRowCalObj(plotData ,gridData, format ,newObj,index, false)
            return newObj;
 
        default:
            return newObj;
    }
}


const getStatErrorColCalObj  = (plotData:Object ,gridData:Object, format:string ,newObj:Object,index:number)=>{
    let axis2 = format == 'x' ? 'y': 'x';
    let plotaxis1 = plotData[format]
    let plotaxis2
    let data
    if(plotData[axis2] != undefined){
        plotaxis2 = plotData[axis2]
        data = getDataFromGrid(gridData[plotaxis2[0]])
    } else{
        data = Array.from({length: plotData[format].length}, (v, i) => i+1);
    }
    // let data = getDataFromGrid(gridData[plotaxis2[0]])
    let traceData = getDataFromGrid(gridData[plotaxis1[index]])
    newObj = {
        [axis2]: [data[index]],
        [format]: [getErrorCals(traceData,plotData.symbol_values)],
    }
    newObj= {
        ...newObj,
        [`error_${format}`]:{
            ...errorObject,
            symmetric: false,
            array: [getErrorCals(traceData,plotData.upper)],
            arrayminus: [getErrorCals(traceData,plotData.lower)]
        }
    }
    return newObj

}


const getStatErrorCategoryCalObj  = (plotData:Object ,gridData:Object, format:string ,newObj:Object,index:number)=>{
    let axis2 = format == 'x' ? 'y': 'x';
    let plotaxis1 = plotData[format]
    let plotaxis2 = plotData['category']

    let x = getDataFromGrid(gridData[plotaxis2[0]])
    let y = getDataFromGrid(gridData[plotaxis1[index]])
    newObj = {}

    x.forEach((item,index)=>{
        if(newObj[item] == undefined){
            newObj[item] = []
            newObj[item].push(y[index]?y[index]:0)
        }
        else{
            newObj[item].push(y[index]?y[index]:0)
        }
    })

    let data = Object.keys(newObj)
    let tracedataInt = Object.values(newObj)
    
    let traceData = tracedataInt.reduce((acc,cur)=>{
        acc.push(getErrorCals(cur,plotData.symbol_values))
        return acc;
    },[])

    let obj = {}

    obj = {
        [axis2]: data,
        [format]: traceData,
    }

    obj= {
        ...obj,
        [`error_${format}`]:{
            ...errorObject,
            symmetric: false,
            array: getErrorForCategory(tracedataInt,plotData,'upper'),
            arrayminus: getErrorForCategory(tracedataInt,plotData,'lower'),
        }
    }
    return obj
}

const getErrorForCategory = (data:[],plotData:Object,type:string)=>{
    let error = []
    data.forEach(item=>{
        if(item.length > 1){
            error.push(getErrorCals(item,plotData[type]))
        }
        else   
            error.push(0)
    })
    return error;
}

export const getStatErrorRowCalObj  = (plotData:Object ,gridData:Object, format:string ,newObj:Object,index:number, rmError: Boolean)=>{
    console.log('In Error!!!', plotData, format)
    let axis2 = format == 'x' ? 'y': 'x';
    let plotaxis1 = plotData[format];
    let startSet = plotData['startset']
    let endSet =  plotData['endset']
    let plotaxis2
    let data = [];
    let traceData = []
    let upperError = []
    let lowerError = []

    let startSetData = getDataFromGrid(gridData[startSet[index]])
    let endSetData = getDataFromGrid(gridData[endSet[index]])
    console.log(startSetData,endSetData, "startSetData")

    if(plotData[axis2] != undefined){
        console.log('Axis!!!!')
        plotaxis2 = plotData[axis2]
        data = getDataFromGrid(gridData[plotaxis2[0]])
    } else{
        const valuesLength = startSetData.length > endSetData.length ? startSetData.length : endSetData.length
        data = Array.from({length: valuesLength }, (v, i) => i+1);
        // data = Array.from({length: plotData[format].length}, (v, i) => i+1);
    }
    
    for(let i=0; i<startSetData.length-1;i++){
        traceData.push(getErrorCals([startSetData[i],endSetData[i]],plotData.symbol_values))
        upperError.push(getErrorCals([startSetData[i],endSetData[i]],plotData.upper))
        lowerError.push(getErrorCals([startSetData[i],endSetData[i]],plotData.lower))
    }
    newObj = {
        [axis2]: data,
        [format]: traceData,
    }
    newObj= {
        ...newObj,
        [`error_${format}`]:{
            ...errorObject,
            symmetric: false,
            array: !rmError? upperError: [],
            arrayminus: !rmError? lowerError: [],
        }
    }
    
    console.log(newObj, 'Error Obj')
    return newObj

}