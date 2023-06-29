
import React, { useState } from "react";
// import "./styles.css";

export default function GraphWizardList(props) {
  const listItems = props.listItems;
  const value = props.value;

  const style = {
    display:"block",
    width:"150px",
    height: "170px"
  }

  return (
    <div className="App">
      <label for="item">Graph types</label>
      <select id ="item" size={6} style={style}
        value={value}
        onChange={props.onChange}
      >
        {listItems.map((list) => (
          <option key={list.id} value={list.title}>
            {list.title}
          </option>
        ))}
      </select>
    </div>
  );
}
