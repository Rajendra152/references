import React from 'react'
import GraphWizard from './GraphWizard'


export const wizard = (wizardType: string)=>{

    if(wizardType === 'graph'){
        return <GraphWizard/>
    }

    return <div>False</div>
}
