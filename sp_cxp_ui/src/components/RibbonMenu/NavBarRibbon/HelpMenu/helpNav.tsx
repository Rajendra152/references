import * as React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeValue from './helpNavTree.json'
import { useEffect, useState } from 'react';
import DescriptionIcon from '@material-ui/icons/Description';

export default function FileSystemNavigator(props: any) {
    // const [expandchild,setExpandchild] = useState('')

    const TreeValues = TreeValue.HelpNav;

    useEffect(() => {
        for (let i = 0; i < TreeValues.length; i++) {
            if (TreeValues[i].nodeId == props.selectedId) {
                var elmnt = document.getElementById(TreeValues[i].nodeId);
                elmnt.scrollIntoView();
            }
            else {
                for (let j = 0; j < TreeValues[i].subText.length; j++) {
                    if (TreeValues[i].subText[j].nodeId == props.selectedId) {
                        var elmnt = document.getElementById(TreeValues[i].subText[j].nodeId);
                        elmnt.scrollIntoView();
                    }
                    else {
                        for (let k = 0; k < TreeValues[i].subText[j].childText.length; k++) {
                            if (TreeValues[i].subText[j].childText[k].nodeId == props.selectedId) {
                                var elmnt = document.getElementById(TreeValues[i].subText[j].childText[k].nodeId);
                                elmnt.scrollIntoView();
                            }
                            else {
                                for (let l = 0; l < TreeValues[i].subText[j].childText[k].superChild.length; l++) {
                                    if (TreeValues[i].subText[j].childText[k].superChild[l].nodeId == props.selectedId) {
                                        var elmnt = document.getElementById(TreeValues[i].subText[j].childText[k].superChild[l].nodeId);
                                        elmnt.scrollIntoView();
                                    }
                                    else {
                                        for (let m = 0; m < TreeValues[i].subText[j].childText[k].superChild[l].fifthChild.length; m++) {

                                            if (TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].nodeId == props.selectedId) {
                                                var elmnt = document.getElementById(props.selectedId);

                                                elmnt.scrollIntoView();
                                            }
                                            else {
                                                for (let n = 0; n < TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].sixthChild.length; n++) {
                                                    if (TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].sixthChild[n].nodeId == props.selectedId) {
                                                        var elmnt = document.getElementById(props.selectedId);

                                                        elmnt.scrollIntoView();
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [])

    const validateNode = () => {
        console.log("check", props.selectedId)
        for (let i = 0; i < TreeValues.length; i++) {
            if (TreeValues[i].nodeId == props.selectedId) {
                return [TreeValues[i].nodeId, ""]
            }
            else {
                for (let j = 0; j < TreeValues[i].subText.length; j++) {
                    if (TreeValues[i].subText[j].nodeId == props.selectedId) {
                        return [TreeValues[i].nodeId, ""]
                    }
                    else {
                        for (let k = 0; k < TreeValues[i].subText[j].childText.length; k++) {
                            if (TreeValues[i].subText[j].childText[k].nodeId == props.selectedId) {
                                return [TreeValues[i].nodeId, TreeValues[i].subText[j].nodeId]
                            }
                            else {
                                for (let l = 0; l < TreeValues[i].subText[j].childText[k].superChild.length; l++) {
                                    if (TreeValues[i].subText[j].childText[k].superChild[l].nodeId == props.selectedId) {
                                        return [TreeValues[i].nodeId, TreeValues[i].subText[j].nodeId, TreeValues[i].subText[j].childText[k].nodeId]
                                    }
                                    else {
                                        for (let m = 0; m < TreeValues[i].subText[j].childText[k].superChild[l].fifthChild.length; m++) {
                                            if (TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].nodeId == props.selectedId) {
                                                return [TreeValues[i].nodeId, TreeValues[i].subText[j].nodeId, TreeValues[i].subText[j].childText[k].nodeId, TreeValues[i].subText[j].childText[k].superChild[l].nodeId]
                                            }
                                            else {
                                                for (let n = 0; n < TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].sixthChild.length; n++) {
                                                    if (TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].sixthChild[n].nodeId == props.selectedId) {
                                                        return [TreeValues[i].nodeId, TreeValues[i].subText[j].nodeId, TreeValues[i].subText[j].childText[k].nodeId, TreeValues[i].subText[j].childText[k].superChild[l].nodeId, TreeValues[i].subText[j].childText[k].superChild[l].fifthChild[m].nodeId]
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
        const [expand, setExpand] = useState(validateNode())

        return (
            <div style={{ width:'170px'}}>
                <TreeView
                    aria-label="file system navigator"
                    selected={props.selectedId}
                    defaultExpandIcon={<AddCircleIcon />}
                    defaultCollapseIcon={<RemoveCircleIcon />}
                    defaultEndIcon={<DescriptionIcon />}
                    defaultExpanded={expand}

                // defaultExpanded={expand}
                // expanded={expand}
                // expanded={["sigmaplot_sigmastat_graph_styles","create_mod_graph"]}
                // defaultSelected={}
                >
                    {TreeValues.map((parent) => {
                        return <div > <TreeItem id={parent.nodeId} nodeId={parent.nodeId} onClick={() => props.SelectedNode(parent.nodeId)}
                            label={parent.text}>
                            {parent.subText.length == 0 ? "" :
                                parent.subText.map((child) => {
                                    return <TreeItem id={child.nodeId} nodeId={child.nodeId} label={child.text} onClick={() => props.SelectedNode(child.nodeId)} >
                                        {child.childText.length == 0 ? "" :
                                            child.childText.map((sub) => {
                                                return <TreeItem id={sub.nodeId} nodeId={sub.nodeId} label={sub.text} onClick={() => props.SelectedNode(sub.nodeId)} >
                                                    {sub.superChild.length == 0 ? "" :
                                                        sub.superChild.map((superSub) => {
                                                            return <TreeItem id={superSub.nodeId} nodeId={superSub.nodeId} label={superSub.text} onClick={() => props.SelectedNode(superSub.nodeId)} >
                                                                {superSub.fifthChild.length == 0 ? "" :
                                                                    superSub.fifthChild.map((fifthsub) => {
                                                                        return <TreeItem id={fifthsub.nodeId} nodeId={fifthsub.nodeId} label={fifthsub.text} onClick={() => props.SelectedNode(fifthsub.nodeId)} >
                                                                            {fifthsub.sixthChild.length == 0 ? "" :
                                                                                fifthsub.sixthChild.map((sixthsub) => {
                                                                                    
                                                                                    return <TreeItem id={sixthsub.nodeId} nodeId={sixthsub.nodeId} label={sixthsub.text} onClick={() => props.SelectedNode(sixthsub.nodeId)} >

                                                                                    </TreeItem>
                                                                                })}
                                                                        </TreeItem>
                                                                    })}
                                                            </TreeItem>
                                                        })}
                                                </TreeItem>
                                            })}
                                    </TreeItem>
                                })}
                        </TreeItem>
                        </div>
                    })}
                </TreeView>

            </div>
        );
    }
