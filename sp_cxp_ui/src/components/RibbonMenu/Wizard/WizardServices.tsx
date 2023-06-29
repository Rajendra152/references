import { StringifyOptions } from 'querystring';
import { GRAPHTYPE, GRAPHSTYLE , DATAFORMAT, CALCULATIONS, DATASELECTION} from './GraphFlowTypes'
import { WizardContentProps } from './GraphWizard';
import { graphTypes, graphStyle, dataFormatList } from './GraphList/GraphTypes';

export const graphList = graphTypes;

export const graphStyleList = graphStyle;

export const dataFormats = dataFormatList;

export const getGraphList = (graphTypeForAddPlot='')=>{
  switch(graphTypeForAddPlot){
    case 'line':
    case 'scatter':
    case 'lineScatter':
    case 'area':
    case 'vertical_bar_plot':
    case 'horizontal_bar_plot':
      return graphList.filter((graph)=>
          graph.name === 'line'||
            graph.name ==='scatter'||
            graph.name ==='lineScatter'||
            graph.name ==='area'||
            graph.name ==='vertical_bar_plot'||
            graph.name ==='horizontal_bar_plot'
      )
    case 'scatter3D':
    case 'line3D':
      return graphList.filter((graph)=>
        graph.name === 'scatter3D'|| graph.name ==='line3D'
      )  
    case 'polar':
      return graphList.filter((graph)=>
        graph.name === 'polar'
      ) 
    case 'radar':
      return graphList.filter((graph)=>
        graph.name === 'radar'
      );
    case 'box':
      return graphList.filter((graph)=>
        graph.name === 'box'
      );
    case 'contour':
      return graphList.filter((graph)=>
        graph.name === 'contour'
      );
    case 'mesh3D':
      return graphList.filter((graph)=>
        graph.name === 'mesh3D'
      );
    case 'ternary':
      return graphList.filter((graph)=>
        graph.name === 'ternary'
      );
    case 'bubble':
      return graphList.filter((graph)=>
        graph.name === 'bubble'
      );
    default:
      return graphList
  }
}

export const getGraphStyleList = ( graphStyle : string ) =>{
    return graphStyleList[graphStyle]
}

export const getDataFormats = (id: string) =>{
    return dataFormats[id]
}


const errorCalculation = [
  'SP5','SP6','SP7','SP8','SP9','SP10','LSP5','LSP6','LSP7','LSP8',
  'VBCP3', 'VBCP4', 'HBCP3', 'HBCP4'
];

const angleCalculation = [
  'PP1','PP2','PP3'
];

const directDataFormat = ['4','11','13','15','16', '18','19', '20'];

const directDataSelect = ['19'];


const checkGPStyle = ['GP1', 'GP2', 'GP3', 'GP4', 'GP5','PC1'];

// Graph Style Ids
const vectorDirectFormat = ['44'];

export const isCalculation = (param: String)=>{
  console.log(param, 'Check param')
  if(errorCalculation.includes(param)){
    return true;
  }
return false
}

export const isAngleCalculation = (param: String)=>{
  if(angleCalculation.includes(param)){
    return true;
  }
return false
}

export const isDirectDataformat = (param: String)=>{
  if(directDataFormat.includes(param)){
    return true;
  }
return false
}

export const isDirectDataSelect = (param: String)=>{ 
  if(directDataSelect.includes(param)){
    return true;
  }
return false
}

export const isGPStyle = (param: String)=>{
  if(checkGPStyle.includes(param)){
    return true;
  }
return false
}

export const isVectorDirectFormat = (param: String)=>{
  if(vectorDirectFormat.includes(param)){
    return true;
  }
return false
}

export const getStep = (step: string, value: StringifyOptions, content)=>{
    console.log('-------------')
    console.log(value)
    console.log(step)
    switch(step){
        case GRAPHTYPE:
          if(isDirectDataformat(value)){
            return { 'next-step': DATAFORMAT, 'prev-step': GRAPHTYPE}
          }else{
            return { 'next-step': GRAPHSTYLE}
          }

        case GRAPHSTYLE:
            // if( value == 'error' || value == 'polar' ){
            if(isCalculation(value) || isAngleCalculation(value)){
                return {
                    'next-step': CALCULATIONS,
                    'prev-step': GRAPHTYPE
                }
            }else if(isDirectDataSelect(content['GRAPHTYPE'])){
              return { 'next-step': DATASELECTION, 'prev-step': GRAPHTYPE}
            }
            else{
                return {
                    'next-step': DATAFORMAT,
                    'prev-step': GRAPHTYPE
                }
            }
        case CALCULATIONS:
          // if(content['DATAFORMAT']=='44'){
          //   return {
          //     'next-step': DATASELECTION,
          //     'prev-step': DATAFORMAT
          //   }
          // }else{

          // }
          return {
            'next-step': DATAFORMAT,
            'prev-step': GRAPHSTYLE
          }

        case DATAFORMAT:
            // if( value == 'error' || value == 'polar' ){
            // if(content['DATAFORMAT']=='44'){
            //     return {
            //         'next-step': CALCULATIONS,
            //         'prev-step': GRAPHTYPE
            //     }
            // }else
            if(isCalculation(content['GRAPHSTYLE']) || isAngleCalculation(content['GRAPHSTYLE'])){
                return {
                    'next-step': DATASELECTION,
                    'prev-step': CALCULATIONS
                }
            }
            else if(isDirectDataformat(content['GRAPHTYPE'])){
              return { 'next-step': DATASELECTION, 'prev-step': GRAPHTYPE}
            }
            else{
                return {
                    'next-step': DATASELECTION,
                    'prev-step': GRAPHSTYLE
                }
            }
        case DATASELECTION:
          if(isDirectDataSelect(content['GRAPHTYPE'])){
            return {  'prev-step': GRAPHSTYLE}
          }else{
            return {
              'prev-step': DATAFORMAT
            }
          }


    }
}

export const oneMaxValue = ['SingleX', 'SingleY', 'SingleColumn', 'ManyX', 'ManyY', 'ManyZ', 'ManySeries', 'ManyR', 'ManyTheta', 'ManyLabel']
export const twoMaxValue = ['BarErrorSingleY', 'XYpair', 'YXpair', 'XManyY', 'YManyX', 'XCategory', 'YCategory', 'XYpairs', 'YXpairs', 'XYReplicate', 'YReplicate',
  'CategoryY', 'ManyYReplicate', 'ManyXReplicate', 'LabelManySeries', 'XError1', 'CategoryX', 'ThetaR', 'XYXY', 'DifferencesData', 'XBarpair', 'RatiosData',
  'YError1', 'BarErrorSingleY', 'YErrorScatter', 'ManySeriesError', 'TernaryXYPairs', 'TernaryYZPairs', 'TernaryXZPairs', 'SingleXBubble', 'SingleYBubble']
export const threeMaxValue = ['XYCategory', 'ThetaManyR', 'RManyTheta', 'YXReplicate', 'CategoryManyY', 'CategoryManyX',
  'XManyYReplicate', 'YManyXReplicate', 'TernaryTriplets', 'XManyYReplicate', 'XYZMany', 'XSetError', 'ManyXYError',
  'XYPairsError1', 'XManyYError1', 'YManyXError1', 'ManyYError1', 'ManyXError1', 'YXPairError1', 'YXPairsError1', 'XError2', 'YError2',
  'LabelManySeriesError', 'XYZTriplet', 'XYManyZ', 'XYpairBubble', 'XYError1']
export const fourMaxValue = ['XYError2', 'XYPairsError2', 'XManyYError2', 'YManyXError2', 'ManyYError2', 'ManyXError2', 'YXPairsError2']

export const statsByOne = ['randomNumbersuniform', 'randomNumbersnormal']
export const statsByInput = ['stack', 'indexoneway', 'indextwoway']
export const statsByTwo = ['simpletransformssquare', 'simpletransformsabsolute', 'simpletransformsln', 'simpletransformslog10', 'simpletransformsreciprocal', 'simpletransformsexponential', 'simpletransformssquareroot', 'simpletransformsarcsinsquareroot', 'center', 'standardize', 'rank', 'dummyvariablereferenceCoding', 'dummyvariableeffectsCoding', 'laggedvariables', 'filter', 'missingValues']
export const statsByThree = ['unindexoneway', 'simpletransformsadd', 'simpletransformssubtract', 'simpletransformsdivide', 'interactions']
export const statsByFour = ['unindextwoway']