import React from 'react';


export default function BottomSection({
  type,
  component
}) {
  return (
      <div className="ms-Grid w-100" dir="ltr">
        <div className="ms-Grid-row">
          {(type==3)?
            <div className="ms-Grid-col d-flex ms-lg6 ms-lgOffset6">
              {component}
            </div>
          :
          (type=='all')?
            <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
              {component}
            </div>
          :
          <div className="ms-Grid-col d-flex ms-lg4 ms-lgOffset8">
            {component}
          </div>
          }

        </div>
      </div>
  )
}
