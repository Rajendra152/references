
import React, { useEffect, useState, } from "react";

export const List = (props) => {
  const listItems = props.list;
   const handleClick = (item) => {
    console.log('item contains',item)
    props.content.activeId = item.id;
    console.log('item contains', item)
    props.onHandleClick(item);

    props.content.graphStyle = item.title;
    // setcurrentItem(item);
    // sendtoMainWindow(item);
  }

  useEffect(() => {
    // console.log("I am AT USEEFFECT-------------")
    // console.clear();
    console.log(props.isNextClicked);
    if (props.isNextClicked.current) {
      props.onInitialSelect(listItems[0]);
      props.content.activeId = listItems[0].id;
      handleClick(listItems[0]);
      props.isNextClicked.current = false;
    }
    props.isNextClicked.current = false;
  }, [])

  const style = {
    display: "block",
    width: "100px",
    height: "170px"
  }

  // console.log("I am LIST ITEM---------")
  // console.log(listItems)
  const items = listItems && listItems.map(item => {
    return <li onClick={() => handleClick(item)} className={item.id == props.content.activeId ? 'bg-type': 'coltype'} style={{ padding: '2px 0px' }}>
      { item.title.includes("Raw") ? "Raw":
       item.title.includes("TabulatedData")?"Tabulated Data":
        item.title.includes("Indexed")?"Indexed":item.title
      }
      </li>
  })

  return (
    <div className="graphWizardLeftCard">
      <ul>
        {items}
      </ul>
    </div>
  );
}
