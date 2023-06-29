import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Text } from '@fluentui/react/lib/Text';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IDetailsListItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListItem[];
  selectionDetails: string;
}

export class DetailsListComp extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    // Populate with items for demos.
    this._allItems = props.items;
    this._columns = [
      { key: 'column1', name: 'All Sheets', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      // { key: 'column2', name: ' ', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    // for (let i = 0; i < this._allItems.length; i++) {
    //   this._columns.push({
    //      key: this._allItems[i].idx,
    //      name: this._allItems[i].name,
    //      fieldName: this._allItems[i].name,
    //      minWidth: 100,
    //      maxWidth: 200,
    //      isResizable: true });
    // }
    console.log(this._columns);


    this.state = {
      items: props.items,
      selectionDetails: this._getSelectionDetails(),
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <>
        {/* <div className={exampleChildClass}>{selectionDetails}</div> */}
        {/* <Announced message={selectionDetails} /> */}
        {/* <TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        /> */}
        {/* <Announced message={`Number of items after filter applied: ${items.length}.`} /> */}
        {/* <MarqueeSelection selection={this._selection}> */}
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            onItemInvoked={this._onItemInvoked}
          />
        {/* </MarqueeSelection> */}
      </>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked = (item: IDetailsListItem): void => {
    alert(`Item invoked: ${item.name}`);
  };
}
