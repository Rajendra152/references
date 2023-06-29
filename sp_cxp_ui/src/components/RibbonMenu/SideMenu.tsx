import React, { Component } from 'react';
import {
    Label, CommandBar, Nav , IconButton
} from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import styles from './Home.css';
class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideMenuOpen: true,
            sidemenuTogOpen: true,
            siemenuCmdItems: [
                {
                    key: 'Open',
                    text: 'Open',
                    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
                    iconProps: { iconName: 'FabricFolder' }
                },
                {
                    key: 'close',
                    text: 'Close',
                    iconProps: { iconName: 'Cancel' }
                },
                {
                    key: 'remane',
                    text: 'Rename',
                    iconProps: { iconName: 'Rename' },
                    onClick: () => console.log('Share'),
                },
                {
                    key: 'print',
                    text: 'Print',
                    iconProps: { iconName: 'Print' },
                    onClick: () => console.log('Share'),
                },
                {
                    key: 'export',
                    text: 'Export',
                    iconProps: { iconName: 'Export' },
                    onClick: () => console.log('Share'),
                    subMenuProps: {
                        items: [
                            {
                                key: 'emailMessage',
                                text: 'Notebook',
                                iconProps: { iconName: 'DietPlanNotebook' },
                                ['data-automation-id']: 'newEmailButton', // optional
                            },
                            { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
                            {
                                key: 'graph',
                                text: 'Graph',
                                iconProps: { iconName: 'TextDocument' },
                            },
                            {
                                key: 'workbook',
                                text: 'Workbook',
                                iconProps: { iconName: 'GridViewSmall' },
                            },
                            {
                                key: 'report',
                                text: 'Report',
                                iconProps: { iconName: 'PageList' },
                            },
                            {
                                key: 'pdf',
                                text: 'Pdf',
                                iconProps: { iconName: 'Pdf' },
                            }
                        ],
                    },
                }
            ],
            // navLinkGroups: [
            //     {
            //         links: [
            //             {
            //                 name: 'NoteBook',
            //                 expandAriaLabel: 'Expand Home section',
            //                 collapseAriaLabel: 'Collapse Home section',
            //                 links: [
            //                     {
            //                         name: 'Section',
            //                         expandAriaLabel: 'Expand Home section',
            //                         collapseAriaLabel: 'Collapse Home section',
            //                         links: [
            //                             {
            //                                 name: 'Data1',
            //                                 url: '',
            //                             },
            //                             {
            //                                 name: 'Graph Page',
            //                                 url: ''
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //         ],
            //     },
            // ]
        }
    }
    toggleNotebook = () => {
        this.setState({
            sidemenuTogOpen: !this.state.sidemenuTogOpen
        })
    }

    componentDidUpdate = () => {
        let side_menu = document.getElementsByClassName("sidemenu-content");
        let ribbon_pivot = document.getElementsByClassName("custom-pivot");
        side_menu[0].style.height = (window.innerHeight - ribbon_pivot[0].offsetHeight) + "px";
    }
    componentDidMount = () => {
        let side_menu = document.getElementsByClassName("sidemenu-content");
        let ribbon_pivot = document.getElementsByClassName("custom-pivot");
        side_menu[0].style.height = (window.innerHeight - ribbon_pivot[0].offsetHeight) + "px";
    }
    render() {
        const { sidemenuTogOpen, sideMenuOpen, siemenuCmdItems, navLinkGroups  } = this.state;
        const {toggSidemenuprop,ToggleSidemenuClick , CloseSidemenuClick} = this.props;
        const close = { iconName: "Clear" };
        const closehide = { iconName: "Clear" };
        const pined = {iconName: "Pinned"};
        const pin = {iconName: "Pin"}
        return (
            <>
                {!sideMenuOpen ? "" :
                    <div className="sidemenu-notebook-continer">
                        <div className="sidemenu-notebook-header">
                            <Label>Notebook Manager</Label>
                            <div className="icon-group">
                            <IconButton  className="sidemenu-icon" iconProps={toggSidemenuprop ? pin : pined} onClick={ToggleSidemenuClick}/>
                            <IconButton  className="sidemenu-icon" iconProps={toggSidemenuprop ? close : closehide} onClick={CloseSidemenuClick} />
                            </div>
                            </div>
                            <div className="sidemenu-notebook-content">
                        <div className="sidemenu-notebook-list">
                            <Label>Notebooks</Label>
                            <Toggle defaultChecked onChange={this.toggleNotebook} />
                        </div>
                        {sidemenuTogOpen ?
                            <div className="sidemenu-notebook-list-content">
                                <CommandBar
                                    className="sidemenu-notebook-commandbar"
                                    items={siemenuCmdItems}
                                    ariaLabel="Use left and right arrow keys to navigate between commands"
                                />
                                {/* <Nav
                                    className="notebook-nav"
                                    onLinkClick=""
                                    selectedKey="key3"
                                    ariaLabel="Nav basic example"
                                    groups={navLinkGroups}
                                /> */}
                            </div> : ""}
                        {/* <div className="sidemenu-notebook-list">
                            <Label>Summary Information</Label>
                            <Toggle onChange={this.toggleNotebook} />
                        </div> */}
                    </div>
                    </div>
                }
            </>
        )
    }

}

export default SideMenu;
