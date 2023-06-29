import { Label } from 'office-ui-fabric-react';
import * as React from 'react';

const List = [
    'Vertical Bar',
    'Vertical Needle',
    'Vertical Step',
    'Horizontal Bar',
    'Horizontal Needle',
    'Horizontal Step',
    'None'
]


export default function SelectGraphStyle() {
    let listItem = List.map(item => <li>{item}</li>)

    return (
        <>
        <Label>Graph styles</Label>
    <div className="graphWizardLeftCard">
        {listItem}
    </div>
    </>
    )
}