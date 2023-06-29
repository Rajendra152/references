import * as TYPES from "./allGraphType/GraphTypeConstants";
import { getDataFromGrid, getgraphicCellFromGrid } from './GraphServices'
import { colorScheme, } from '../../utils/SchemeConstant'

export const getModifiedPlotProperties = (
    plotData: Object,
    gridData: [[]],
    plotProperties: Object,
    graphType: string,
    realProperties?:any
) => {
    switch (graphType) {
        case TYPES.BUBBLE_PLOT:
            if (plotData.bubblesize) {
                let size = getDataFromGrid(gridData[plotData.bubblesize[0]])
                plotProperties.marker = {
                    ...plotProperties.marker,
                    size: size,
                }
            }
            return plotProperties;

        case TYPES.PIE_PLOT:
            if (plotData.values) {
                plotProperties.pull = [...plotData.values].fill(0)         
                if (plotProperties.sliceIndex >= plotProperties.pull.length) {
                    plotProperties.sliceIndex = 0
                }
                if (plotProperties.explode === 'single') {
                    plotProperties.pull[plotProperties.sliceIndex] = 0.3
                }
                else if (plotProperties.explode !== 'none') {
                    plotProperties.pull = getDataFromGrid(gridData[+plotProperties.explode].slice(1))
                }
                realProperties.pull=[...plotData.values].fill(0)
                if (typeof plotProperties.marker.color === 'number') {
                    let isentirerange = Object.values(plotProperties.data)[0].isentirerange
                    let schemeArray = getgraphicCellFromGrid(gridData[plotProperties.marker.color], 'color', isentirerange)
                    let pieClrIndex = 0;
                    plotProperties.marker.colors = plotProperties.pull.map((value, index) => {
                        if (pieClrIndex === schemeArray.length) {
                            pieClrIndex = 0
                        }
                        pieClrIndex++
                        return schemeArray[pieClrIndex]
                    })
                }
                else if (plotProperties.marker.color.startsWith('#') || plotProperties.marker.color === 'none') {
                    plotProperties.marker.colors = plotProperties.marker.colors.fill(plotProperties.marker.color)

                }
                else {
                    let schemeArray = colorScheme[plotProperties.marker.color]
                    let pieClrIndex = 0;
                    plotProperties.marker.colors = plotProperties.pull.map((value, index) => {
                        if (pieClrIndex === schemeArray.length) {
                            pieClrIndex = 0
                        }
                        pieClrIndex++
                        return schemeArray[pieClrIndex]
                    })
                }
                if (typeof plotProperties.marker.line.colorscale === 'number') {
                    let isentirerange = Object.values(plotProperties.data)[0].isentirerange
                    let schemeArray = getgraphicCellFromGrid(gridData[plotProperties.marker.line.colorscale], 'color', isentirerange)
                    let pieClrIndex = 0;
                    plotProperties.marker.line.color = plotProperties.pull.map((value, index) => {
                        if (pieClrIndex === schemeArray.length) {
                            pieClrIndex = 0
                        }
                        pieClrIndex++
                        return schemeArray[pieClrIndex]
                    })
                }
                else if(plotProperties.marker.line.colorscale!=='none') {
                    let schemeArray = colorScheme[plotProperties.marker.line.colorscale]
                    let pieClrIndex = 0;
                    plotProperties.marker.line.color = plotProperties.pull.map((value, index) => {
                        if (pieClrIndex === schemeArray.length) {
                            pieClrIndex = 0
                        }
                        pieClrIndex++
                        return schemeArray[pieClrIndex]
                    })
                }


            }
            return plotProperties;

        default:
            return plotProperties
    }
}

export const getModifiedData = (
    plotData: Object,
    plotProperties: Object,
) => {
    let data = plotProperties.data;
    Object.keys(data).forEach(key => {
        let dataAxis = data[key]
        if (!dataAxis.isentirerange && plotData[key]) {
            plotData[key] = plotData[key].filter((item, index) => {
                return index + 1 >= dataAxis.start && index + 1 <= dataAxis.end && ((index + 1 - dataAxis.start) % dataAxis.gap == 0)
            })
        }
    });

    

    return plotData;
}

export const getRadarErrorTrace = (
    r: [],
    error: [],
    errorType: number,
) => {
    return r.map((item, index) => {
        return errorType ? item - error[index] : item + error[index];
    })
}

export const setLegendNameforXY = (layout: any, properties: any, x: any, y: any) => {
    if (layout.legend.isYOnly == false) {
        if (x !== null && y !== null) {
            properties.name = `Col ${x + 1} vs Col ${y + 1}`
        }
        else if (y !== null) {
            properties.name = `Col ${y + 1}`
        }
        else if (x !== null) {
            properties.name = `Col ${x + 1}`
        }
    }
    else {
        if (x !== null && y !== null) {
            properties.name = ` Col ${y + 1}`
        }
        else if (y !== null) {
            properties.name = `Col ${y + 1}`
        }
        else if (x !== null) {
            properties.name = `Col -1`
        }
    }

    return properties
}

export const setLegendNameforPolar = (layout: any, properties: any, r: any, theta: any) => {
    if (layout.legend.isYOnly == false) {
        if (r !== null && theta !== null) {
            properties.name = `Col ${r + 1} vs Col ${theta + 1}`
        }
        else if (theta !== null) {
            properties.name = `Col ${theta + 1}`
        }
        else if (r !== null) {
            properties.name = `Col ${r + 1}`
        }
    }
    else {
        if (r !== null && theta !== null) {
            properties.name = ` Col ${theta + 1}`
        }
        else if (theta !== null) {
            properties.name = `Col ${theta + 1}`
        }
        else if (r !== null) {
            properties.name = `Col -1`
        }
    }

    return properties
}

export const setLegendNamefor3D = (properties: any, x: any, y: any, z: any) => {
    if (x !== null && y !== null && z !== null) {
        properties.name = `Col ${x + 1} vs Col ${y + 1} vs Col ${z + 1}`
    }
    else if (x !== null && y !== null) {
        properties.name = `Col ${x + 1} vs Col ${y + 1}`
    }
    else if (y !== null && z !== null) {
        properties.name = `Col ${y + 1} vs Col ${z + 1}`
    }
    else if (x !== null && z !== null) {
        properties.name = `Col ${x + 1} vs Col ${z + 1}`
    }
    else if (z !== null) {
        properties.name = `Col ${z + 1}`
    }
    return properties
}

export const setLegendNameforTernary = (properties: any, x: any, y: any, z: any) => {

    if (x !== null && y !== null && z !== null) {
        properties.name = `Col ${x + 1} vs Col ${y + 1} vs Col ${z + 1}`
    }
    else if (x !== null && y !== null) {
        properties.name = `Col ${x + 1} vs Col ${y + 1}`
    }
    else if (y !== null && z !== null) {
        properties.name = `Col ${y + 1} vs Col ${z + 1}`
    }
    else if (x !== null && z !== null) {
        properties.name = `Col ${x + 1} vs Col ${z + 1}`
    }
    return properties
}