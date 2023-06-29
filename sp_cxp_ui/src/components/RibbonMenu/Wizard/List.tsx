
import React, { useEffect, useState } from "react";
import { Label } from '@fluentui/react/lib/Label';
import { sendtoMainWindow } from './DataTransfer/DataTransfer'
export const List = (props) => {


  const listItems = props.list;
  const handleClick = (item) => {
    item.activeId = item.id;
    props.onHandleClick(item);
  }


  useEffect(() => {
    // console.log("I am AT USEEFFECT-------------")
    console.log(props.isNextClicked)
    if (props.isNextClicked.current) {
      props.onInitialSelect(listItems[0]);
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
  const items = listItems && listItems.map(item => {
    return <li onClick={() => handleClick(item)} className={item.id == props.content.activeId ? 'bg-type  ' : 'coltype'} style={{ padding: '2px 0px' }}>{props.content.stepType == "DATAFORMAT" ? item.name : item.title}</li>
    // return <li onClick={() => { handleClick(item) }} className={(item.id == props.content.GRAPHTYPE) ||(item.title == props.content.GRAPHSTYLE) ||(item.title == props.content.DATAFORMAT) || (item.title ==props.content.CALCULATIONS)  || (item.title ==props.content.DATASELECTION ) ? 'bg-type' : ''} style={{ padding: '2px 0px' }}>{item.name}</li>
  })

  return (
    <ul>
      {items}
    </ul>

  );
}
