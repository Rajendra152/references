import React, { useState, useEffect } from "react";
import GraphWizardList from './GraphWizardList';
import GraphWizardNavigationControl from './GraphWizardNavigationControl';
import GraphWizardPreview from './GraphWizardPreview';
import GraphWizardTitle from './GraphWizardTitle';
// import * as ConstantImage from "../../Constant/ConstantImage";
import {
  DocumentCard
} from '@fluentui/react/lib/DocumentCard';
// import {
//   AnimationDetail,
//   AnimationDetailGrid
// } from '@fluentui/theme/lib/motion/AnimationStyles';

export default function GraphWizard(props) {
  // const graphTypes = [
  //   {
  //     id: 1,
  //     title: "Scatter Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols1",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 2,
  //     title: "Line Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols2",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 3,
  //     title: "Line and Scatter Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols3",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 4,
  //     title: "Vector Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols4",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 5,
  //     title: "Area Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols5",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 6,
  //     title: "Polar Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols6",
  //     previewImageTitle:"select the type of graph you want to create"
  //   }
  //   , {
  //     id: 7,
  //     title: "Radar Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols7",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 8,
  //     title: "Vertical Bar Chart",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols8",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 9,
  //     title: "Horizantal Bar Chart",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols9",
  //     previewImageTitle:"select the type of graph you want to create"
  //   },
  //   {
  //     id: 10,
  //     title: "Box Plot",
  //     previewImage: ConstantImage.CreateResultGraph,
  //     previewImageText: "plot data as XY points using symbols10",
  //     previewImageTitle:"select the type of graph you want to create"
  //   }
  // ];
  // const [selectedItem, setSelectedItem] = useState(graphTypes[0].title);
  // const [listItems, setListItems] = useState(graphTypes);
  const [selectedItem, setSelectedItem] = useState('');
  const [listItems, setListItems] = useState([]);

 const handleChange = (e) => {
  setSelectedItem(e.target.value);
 }


 useEffect(() => {
  setListItems(props.graphData);
  setSelectedItem(props.graphData[0].title);
 }, [props.graphData, props.graphData[0].title])

 const resultItem = listItems.find(item => item.title === selectedItem);

 console.log(listItems)
 console.log("Hello.........")
  console.log(resultItem)

  return (
    <div>
      <div className={''}>
      <GraphWizardTitle title="type" />
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm7 ms-md7 ms-lg7">
          <DocumentCard>
            <GraphWizardPreview  resultItem = {resultItem}/>
            </DocumentCard>
          </div>
          <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5">
          {/* <DocumentCard> */}
            <GraphWizardList value = {selectedItem} listItems = {listItems} onChange = {handleChange}/>
            {/* </DocumentCard> */}
          </div>
        </div>
      </div>
      </div>
      {/* <GraphWizardNavigationControl gotoNext={gotoNext} gotoBack={gotoBack}/> */}
    </div>
  );
}
