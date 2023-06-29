import React, {useState, useEffect} from 'react'
import * as SampleData from "./SampleData";
import GraphWizardNavigationControl from './GraphWizardNavigationControl';
import GraphWizard from './GraphWizard'
export default function GraphMainWizard(props) {

  const [currentInfo, setCurrentInfo] = useState(SampleData.graphTypes);

  const gotoNext = () =>{
    // currentInfo = [...SampleData.graphTypes];
    const data = [...SampleData.sample];
    setCurrentInfo(data);
    // let nextData = SampleData.graphTypes
  }
  const gotoBack = () =>{
    const data = [...SampleData.graphTypes];
    console.log(data);
    setCurrentInfo(data);
  }

  // useEffect(() => {
  //   const data: Object[] = SampleData.sample;
  //   setCurrentInfo(data);
  //  }, [currentInfo])
  // gotoNext();


  return (
    <div>
      {(currentInfo.length > 0)?<GraphWizard graphData={currentInfo} />: null}

      <GraphWizardNavigationControl gotoNext={gotoNext} gotoBack={gotoBack}/>
    </div>
  )
}
