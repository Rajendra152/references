import React from 'react';


const SubListComponent = (props: any) => {

  const subList = Object.keys(props.subListObject)
  console.log(props.currSelItem)
  return (
    <>
      <ul>
        {subList.map((name, index) => {
          const activeClass = props.currSelItem === name ? { backgroundImage: "linear-gradient(#b4d5e4, #56a5d4)" } : {}
          const focusClass = props.currTrack.cname === name && props.currTrack.pname === props.parentName ? { backgroundImage: "linear-gradient(#b4d5e4, #56a5d4)" } : {}

          return (
            <>
              <li key={index}
                className={'type'}
                style={{ ...focusClass }}
                onClick={() => { props.onSetCurrListItem(name, props.parentName) }}>
                {name}
              </li>
            </>
          )
        })}
      </ul>
    </>
  );
};

export default SubListComponent;
