import React from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

export default function Loader(props) {
  const masterDiv = {
    height: '100vh',
    width: '100%',
    position: 'absolute',
    zIndex: 10000,
  }
  const childDiv = {
    margin: '0 auto',
    display: 'table',
    height: '100vh',
    marginTop: '26%',
  }
  const load= {
    background: '#eaeaea',
    boxShadow: '-2px 2px 4px 2px #e6e6e6',
    padding: '7px 10px'
  }
  return (
    <div style={masterDiv}>
        <div style={childDiv}>
            <div style={load} className="d-flex"><Spinner size={SpinnerSize.medium} /> <span className={'ml-1 mr-1'}>loading... </span></div>
        </div>
    </div>
  )
}
