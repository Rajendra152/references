import React from 'react';
import styles from './Home.css';
//import PivotLargeExample from './common/PivotComp';
import Header from './Header';
//import TreeViewPanel from './common/TreeviewPanel';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();


export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      {/* <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 padding-0">
            <div className="div-header">
              <span> Sigma plot</span>
            </div>
          </div>
        </div>
      </div> */}
      <Header></Header>
      <div className={styles.bodyContainer}>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            {/* <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3">
              <div className="LayoutPage-demoBlock">
                <div className={styles.treeviewpanel}>
                  <TreeViewPanel></TreeViewPanel>
                </div>
              </div>
            </div> */}
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <div className="LayoutPage-demoBlock">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div>Redis Data Sets</div>
    </div>
  );
}
