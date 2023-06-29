import React from 'react'
import { ErrorCalculations } from './ErrorCalculations'
import { AngleCalculations } from './AngleCalculations'
import { isCalculation, isAngleCalculation } from "./WizardServices";

export interface CalculationProps{
    type : string,
    content: Object
}

const Content = (calculationProps: CalculationProps) =>{
  console.log(calculationProps)
    if (calculationProps.type) {
      if(isCalculation(calculationProps.type)){
        return <ErrorCalculations graphType={calculationProps.type} calculationInfo={calculationProps.calculationInfo} calculationClick={calculationProps.calculationClick}/>
      }
      if(isAngleCalculation(calculationProps.type) || calculationProps.content['DATAFORMAT']=='44'){
        return <AngleCalculations calculationInfo={calculationProps.calculationInfo} calculationClick={calculationProps.calculationClick}/>
      }
    }else{
      return  <div>Calculations</div>;
    }

}


export const Calculations = ( calculationProps : CalculationProps)=>{

    return (
           <Content content={calculationProps.content} type={calculationProps.type} calculationInfo={calculationProps.calculationInfo} calculationClick={calculationProps.onHandleClick}/>
    )
}
