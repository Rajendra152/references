import React from 'react';
import { Label } from '@fluentui/react/lib/Label';

export interface TitleProps {
    title : string
}

export default function WizardTitle( titleProps : TitleProps) {
  const title = titleProps.title;
  return (
    <div className="graphWizard-titlebar ms-Grid">
      <Label className="graphWizard-titletext">{title}</Label>
    </div>
  );
}
