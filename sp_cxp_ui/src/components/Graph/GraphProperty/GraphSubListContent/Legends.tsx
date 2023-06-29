import React, { useState, useEffect } from 'react';
import { Checkbox, Stack, IStackTokens } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { TextField } from '@fluentui/react/lib/TextField';
import { Text } from '@fluentui/react/lib/Text';
import { getLegendsModifiedJSON } from '../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON';
import { getDefaultLegend } from '../../../../utils/graphDailogProperty/differentPropertyList';

import { useBoolean } from '@uifabric/react-hooks';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { Label } from '@fluentui/react/lib/Label';
import LegendFont, { FontAttr } from './LegendFont';
import LegendBox, { BoxProperties } from './LegendBox';

const stackTokenscheckbox = { childrenGap: 1 };
const stackTokensbutton: IStackTokens = { childrenGap: 10 };
const styles: Partial<ISpinButtonStyles> = {
  spinButtonWrapper: { width: 75, height: 24 },
};

import { version } from '../../../Constant/ConstInfo';
import { Height } from '@material-ui/icons';
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Legends',
  subText:
    'This will reset all legend settings to the default state. Continue ?',
  key: 'RESET_LEGENDS',
};

//const dialogStyles = { main: { maxWidth: "100px" } };
const dialogStyles = { main: { maxWidth: '200px' } };

const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};

const Legend = (props: any) => {
  console.log(props);
  const [showLegend, setshowLegend] = useState(props.legendProp.showlegend);
  const [lockLegend, setlockLegend] = useState(true);
  const [frameInBox, setframeInBox] = useState(
    props.legendProp.legend.borderwidth ? true : false
  );
  const [directLabeling, setDirectLabeling] = useState(true);
  const [allowresizing, setAllowResizing] = useState(true);
  const [useYOnly, setuseYOnly] = useState(props.legendProp.isYOnly);
  const [column, setColumn] = useState(1);
  const [boxSpacing, setBoxSpacing] = useState(1);
  const [title, setTitle] = useState(props.legendProp.legend.title.text);
  const [hideWarningDialog, { toggle: toggleHideWarningDialog }] =
    useBoolean(true);
  const [
    isShowFontDialog,
    { setTrue: showFontDialog, setFalse: hideFontDialog },
  ] = useBoolean(false);
  const [isShowBoxDialog, { setTrue: showBoxDialog, setFalse: hideBoxDialog }] =
    useBoolean(false);

  const [
    isShowTitleFontDialog,
    { setTrue: showTitleFontDialog, setFalse: hideTitleFontDialog },
  ] = useBoolean(false);

  useEffect(() => {
    setshowLegend(props.legendProp.showlegend);
    setframeInBox(props.legendProp.legend.borderwidth ? true : false);
    setTitle(props.legendProp.legend.title.text);
    setuseYOnly(props.legendProp.isYOnly);
    setDirectLabeling(props.legendProp.legend.hidetoggle);
  }, [props]);

  const propertyOnChange = (newProps: any) => {
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const showLegendChange = (ev, value) => {
    const newProps = {
      showlegend: value,
      legend: { ...props.legendProp.legend },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const framingOnChange = (ev, value) => {
    const newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        borderwidth: value ? 1 : 0,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const resetOnClick = () => {
    const newProps = {
      ...getDefaultLegend(),
    };
    toggleHideWarningDialog();
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: dialogStyles,
      dragOptions: dragOptions,
      className: 'warningDialog',
    }),
    []
  );

  const titleOnChange = (ev, value) => {
    const newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        title: {
          ...props.legendProp.legend.title,
          text: value,
        },
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const anymethod = () => {};

  const isYOnlyChanged = (value: any) => {
    const newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        isYOnly: value,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const directLabelOnChnage = (value: any) => {
    const newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        hidetoggle: value,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };
  const fontBoxOnClick = (fontAttr: FontAttr) => {
    let newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        font: fontAttr,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
    hideFontDialog();
  };

  const legendTitleFontOnClick = (fontAttr: FontAttr) => {
    let newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        title: {
          ...props.legendProp.legend.title,
          font: fontAttr,
        },
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
    hideTitleFontDialog();
  };

  const legendBoxOnClick = (boxProperties: BoxProperties) => {
    let newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        ...boxProperties,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
    hideBoxDialog();
  };
  const columnOnIncrease = () => {
    const columns = (props.legendProp.legend.columns || 1) + 1;
    const newProps = {
      ...props.legendProp,
      legend: {
        ...props.legendProp.legend,
        columns,
        orientation: columns === 1 ? 'v' : 'h',
        traceorder: columns === 1 ? 'normal' : 'grouped',
        x: columns === 1 ? 1.25 : 0,
        y: columns === 1 ? 1 : -0.35,
      },
    };
    const [newLayout, newProperties] = getLegendsModifiedJSON(
      newProps,
      props.properties,
      props.layout
    );
    props.graphPropertyOnChange(newLayout, newProperties);
  };

  const columnOnDecrease = () => {
    const columns = (props.legendProp.legend.columns || 1) - 1;
    if (columns !== 0) {
      const newProps = {
        ...props.legendProp,
        legend: {
          ...props.legendProp.legend,
          columns,
          orientation: columns === 1 ? 'v' : 'h',
          traceorder: columns === 1 ? 'normal' : 'grouped',
          x: columns === 1 ? 1.25 : 0,
          y: columns === 1 ? 1 : -0.35,
        },
      };
      const [newLayout, newProperties] = getLegendsModifiedJSON(
        newProps,
        props.properties,
        props.layout
      );
      props.graphPropertyOnChange(newLayout, newProperties);
    }
  };


  return (
    <div className="insets-container">
      {/* Show Axis Lines */}
      <div className="insets-header">
        <Checkbox label="" checked={showLegend} onChange={showLegendChange} />
        <Label style={{ paddingLeft: '0px' }}>Show Legend</Label>
      </div>
      {/* <div
        className={'d-flex align-items-center justify-content-spaceBet'}
        style={{ marginBottom: '2px', marginLeft: '5px' }}
      >
        <Checkbox
          label="Lock legend"
          checked={lockLegend}
          disabled={true}
          onChange={() => anymethod()}
        />
      </div> */}
      <div
        className={'d-flex align-items-center justify-content-spaceBet'}
        style={{ marginBottom: '2px', marginLeft: '5px' }}
      >
        <Checkbox
          label="Framed in box"
          checked={frameInBox}
          onChange={framingOnChange}
        />
        <DefaultButton
          text="Reset"
          onClick={toggleHideWarningDialog}
          style={{ height: 22, width: 80 }}
        />
      </div>
      <div
        className={'d-flex align-items-center justify-content-spaceBet'}
        style={{ marginBottom: '5px', marginLeft: '5px' }}
      >
        <Checkbox
          label="Direct labeling"
          checked={directLabeling}
          onChange={(_, value) => directLabelOnChnage(value)}
        />
        <DefaultButton
          text="Box"
          onClick={showBoxDialog}
          style={{ height: 22, width: 80 }}
        />
      </div>
      {/* <div
        className={'d-flex align-items-center justify-content-spaceBet'}
        style={{ marginBottom: '8px', marginLeft: '5px' }}
      >
        <Checkbox
          label="Allow drag resizing"
          checked={allowresizing}
          disabled={true}
          onChange={() => anymethod()}
        />
      </div> */}
      <div
        className={'d-flex align-items-center justify-content-spaceBet'}
        style={{ marginBottom: '15px', marginLeft: '5px' }}
      >
        <Checkbox
          label="Use Y only for legend"
          checked={useYOnly}
          onChange={(ev, value) => isYOnlyChanged(value)}
        />
        <DefaultButton
          text="Font"
          onClick={showFontDialog}
          style={{ height: 22, width: 80 }}
        />
      </div>
      <div
        className={'d-flex align-items-center'}
        style={{ marginBottom: '5px', marginLeft: '5px' }}
      >
        <Label style={{ paddingLeft: '0px' }} className={'ms-lg2'}>
          Columns
        </Label>
        <SpinButton
          // label="Columns     "
          defaultValue="1"
          min={1}
          max={100}
          step={1}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
          styles={styles}
          disabled={false}
          className={'ms-lg2'}
          value={(props.legendProp.legend.columns ?? 1).toString()}
          onIncrement={columnOnIncrease}
          onDecrement={columnOnDecrease}
        />
      </div>
      {/* <div
        className={'d-flex align-items-center'}
        style={{ marginBottom: '2px', marginLeft: '5px' }}
      >
        <Label style={{ paddingLeft: '0px' }} className={'ms-lg2'}>
          Box spacing
        </Label>
        <SpinButton
          defaultValue="1.000 in"
          min={1.0}
          max={10}
          step={0.1}
          incrementButtonAriaLabel="Increase value by 0.1"
          decrementButtonAriaLabel="Decrease value by 0.1"
          disabled
          styles={styles}
          className={'ms-lg2'}
        />
      </div> */}
      <div
        className={'d-flex align-items-center'}
        style={{ marginBottom: '5px', marginLeft: '5px' }}
      >
        <Label style={{ paddingLeft: '0px' }} className={'ms-lg2'}>
          Legend title
        </Label>
        <TextField
          value={title}
          onChange={titleOnChange}
          className={'ms-lg2'}
          styles={styles}
        />
      </div>
      <div
        className={'d-flex align-items-center justify-content-end'}
        style={{ marginBottom: '2px', marginLeft: '5px' }}
      >
        <DefaultButton
          text="Font"
          allowDisabledFocus
          onClick={showTitleFontDialog}
        />
        {/* <DefaultButton
          text="Box"
          allowDisabledFocus
          disabled
          style={{ marginLeft: '5px' }}
        /> */}
      </div>
      <Dialog
        hidden={hideWarningDialog}
        onDismiss={toggleHideWarningDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <DefaultButton onClick={resetOnClick} text="YES" />
          <DefaultButton onClick={toggleHideWarningDialog} text="No" />
        </DialogFooter>
      </Dialog>
      {isShowFontDialog && (
        <LegendFont
          hideFontDialog={hideFontDialog}
          legendFont={props.legendProp.legend.font}
          handleSubmit={fontBoxOnClick}
        />
      )}
      {isShowBoxDialog && (
        <LegendBox
          hideBoxDialog={hideBoxDialog}
          legendBox={props.legendProp.legend}
          handleSubmit={legendBoxOnClick}
        />
      )}
      {isShowTitleFontDialog && (
        <LegendFont
          hideFontDialog={hideTitleFontDialog}
          legendFont={props.legendProp.legend.title.font}
          handleSubmit={legendTitleFontOnClick}
        />
      )}
    </div>
  );
};

export default Legend;
