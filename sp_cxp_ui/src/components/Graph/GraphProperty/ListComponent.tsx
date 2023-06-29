import React from 'react';

import SubListComponent from "./SubListComponent";

const ListComponent = (props: any) => {

  console
  const parentList = Object.keys(props.dialogList)
  console.log(props.currTrack)

  return (
    <>
      <ul className={'p-0 mainGraph'}  >
        {parentList.map((name, index) => {
          const activeClass = props.currSelItem === name ? { backgroundImage: "linear-gradient(#b4d5e4, #56a5d4)" } : {}
          const focusClass = props.currTrack.pname === name &&  props.currTrack.cname === name ? { backgroundImage: "linear-gradient(#b4d5e4, #56a5d4)" }  : {}

          return (
            <>
              <li key={index}
                className={'type'}
                style={{ ...focusClass }}

                onClick={() => { props.onSetCurrListItem(name, name) }}>
                {name}
              </li>

              <SubListComponent
                subListObject={props.dialogList[name]}
                parentName={name}
                currParItem={props.currParItem}
                currSelItem={props.currSelItem}
                onSetCurrListItem={props.onSetCurrListItem}
                currTrack={props.currTrack}
              />
            </>
          )
        }
        )}
      </ul>
    </>
  );
};

export default ListComponent;
