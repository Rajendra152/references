import * as ConstantImage from '../../components/Constant/ConstantImage';
export const getAllLineStyle = () => {
  return [
    { key: 'none', text: '(None)', disabled: false },
    { key: 'solid', text: 'Solid', disabled: false },
    // { key: 'longdash', text: 'Long Dash', disabled: true },
    // { key: 'medium_Dash', text: 'Medium Dash', disabled: true },
    // { key: 'short_Dash', text: 'Short Dash', disabled: true },
    // { key: 'dot', text: 'Dotted', disabled: true },
    // { key: 'dashdot', text: 'Dash-Dot', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Dash-Dot-Dot', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Medium-Medium', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Short-Short-Short', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Short-Short', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Short-Long', disabled: true },
    // { key: 'dash_Dot_Dot', text: 'Long-Short', disabled: true },
    // { key: 'dash', text: 'Long-Short-Short', disabled: true },
    // { key: "5px,10px,2px,2px", text: 'Short-Long-Short', disabled: true },
  ];
};

// ", "", "dash", "", "", or "longdashdot"

export const getAllLineDash = () => {
  return [
    { key: 'mono', text: 'Monochrome', disabled: false },
    { key: 'incr', text: 'Incrementing', disabled: false },
    { key: 'none', text: '(None)', disabled: false },
    { key: 'solid', text: 'Solid', disabled: false },
    { key: 'longdash', text: 'Long Dash', disabled: false },
    { key: '10px,10px,10px,10px', text: 'Medium Dash', disabled: false },
    { key: '5px 10px 5px 10px ', text: 'Short Dash', disabled: false },
    { key: 'dot', text: 'Dotted', disabled: false },
    { key: 'dashdot', text: 'Dash-Dot', disabled: false },
    { key: '6px,2px,2px,2px,2px', text: 'Dash-Dot-Dot', disabled: false },
    { key: '4px,2px,4px,2px', text: 'Medium-Medium', disabled: false },
    { key: '3px 3px 3px 3px', text: 'Short-Short-Short', disabled: false },
    { key: '5px 2px 5px 2px', text: 'Short-Short', disabled: false },
    { key: '5px 5px 10px 5px ', text: 'Short-Long', disabled: false },
    { key: '10px 5px 5px 5px', text: 'Long-Short', disabled: false },
    { key: '10px 2px 5px 2px', text: 'Long-Short-Short', disabled: false },
    { key: '5px,10px,2px,2px', text: 'Short-Long-Short', disabled: false },
  ];
};

export const getAllDropLineDash = () => {
  return [
    { key: 'none', text: '(None)', disabled: false },
    { key: 'solid', text: 'Solid', disabled: false },
    { key: 'longdash', text: 'Long Dash', disabled: false },
    { key: '10px,10px,10px,10px', text: 'Medium Dash', disabled: false },
    { key: '5px 10px 5px 10px ', text: 'Short Dash', disabled: false },
    { key: 'dot', text: 'Dotted', disabled: false },
    { key: 'dashdot', text: 'Dash-Dot', disabled: false },
    { key: '5px,1px,1px,1px 1px', text: 'Dash-Dot-Dot', disabled: false },
    { key: '4px,2px,4px,2px', text: 'Medium-Medium', disabled: false },
    { key: '3px 3px 3px 3px', text: 'Short-Short-Short', disabled: false },
    { key: '5px 2px 5px 2px', text: 'Short-Short', disabled: false },
    { key: '5px 5px 10px 5px ', text: 'Short-Long', disabled: false },
    { key: '10px 5px 5px 5px', text: 'Long-Short', disabled: false },
    { key: '10px 2px 5px 2px', text: 'Long-Short-Short', disabled: false },
    { key: '5px,10px,2px,2px', text: 'Short-Long-Short', disabled: false },
  ];
};

export const getAllBoxLineDash = () => {
  return [
    { key: 'none', text: '(None)', disabled: false },
    { key: '', text: 'Solid', disabled: false },
    { key: '10px,5px,5px,5px', text: 'Long Dash', disabled: false },
    { key: '10px,10px,10px,10px', text: 'Medium Dash', disabled: false },
    { key: '5px 10px 5px 10px ', text: 'Short Dash', disabled: false },
    { key: '1px 1px 1px 1px', text: 'Dotted', disabled: false },
    { key: '2px 1px 2px 1px', text: 'Dash-Dot', disabled: false },
    { key: '5px,1px,1px,1px 1px', text: 'Dash-Dot-Dot', disabled: false },
    { key: '4px,2px,4px,2px', text: 'Medium-Medium', disabled: false },
    { key: '3px 3px 3px 3px', text: 'Short-Short-Short', disabled: false },
    { key: '5px 2px 5px 2px', text: 'Short-Short', disabled: false },
    { key: '5px 5px 10px 5px ', text: 'Short-Long', disabled: false },
    { key: '10px 5px 5px 5px', text: 'Long-Short', disabled: false },
    { key: '10px 2px 5px 2px', text: 'Long-Short-Short', disabled: false },
    { key: '5px,10px,2px,2px', text: 'Short-Long-Short', disabled: false },
  ]
}

export const getAllLineShape = () => {
  return [
    { key: 'linear', text: 'Linear', disabled: false },
    { key: 'spline', text: 'Spline', disabled: false },
    { key: 'hv', text: 'Horizontal Vertical', disabled: false },
    { key: 'vh', text: 'Vertical Horizontal', disabled: false },
    { key: 'hvh', text: 'Hor Ver Hor', disabled: false },
    { key: 'vhv', text: 'Ver Hor Ver', disabled: false },
  ];
};

export const getAllColor = () => {
  return [
    { key: 'white ', text: '(None)', disabled: false },
    { key: 'black', text: 'Black', disabled: false },
    { key: 'white', text: 'White', disabled: false },
    { key: 'red', text: 'Red', disabled: false },
    { key: 'green', text: 'Green', disabled: false },
    { key: 'yellow', text: 'Yellow', disabled: false },
    { key: 'pink', text: 'Pink', disabled: false },
    { key: 'cyan', text: 'Cyan', disabled: false },
    { key: 'gray', text: 'Gray', disabled: false },
    { key: 'grey', text: 'Grey', disabled: false },
  ];
};
export const getAllRegion = () => {
  return [
    { key: 'world', text: 'World', disabled: false },
    { key: 'usa', text: 'USA', disabled: false },
    { key: 'north america', text: 'North America', disabled: false },
    { key: 'south america', text: 'South America', disabled: false },
    { key: 'asia', text: 'Asia', disabled: false },
    { key: 'europe', text: 'Europe', disabled: false },
    { key: 'africa', text: 'Africa', disabled: false },
  ];
};

export const getAllLocationMode = () => {
  return [
    { key: 'USA-states', text: 'USA States', disabled: false },
    { key: 'country names', text: 'Country Names', disabled: false },
  ];
};

export const getFrameLines = () => {
  return [
    { key: 'origin', text: 'Relative to graph origin', disabled: true },
    { key: 'viewer', text: 'Relative to viewer', disabled: true },
  ];
};
export const getAllScaleType = () => {
  return [
    { key: 'linear', text: 'Linear', disabled: false },
    { key: 'log', text: 'Log (Common)', disabled: false },
    // { key: 'log-n', text: 'Log (Natural)', disabled: true },
    // { key: 'probability', text: 'Probability', disabled: true },
    // { key: 'probit', text: 'Probit', disabled: true },
    // { key: 'logit', text: 'Logit', disabled: true },
    { key: 'category', text: 'Category', disabled: false },
    // { key: 'date/time', text: 'Date/Time', disabled: true },
    // { key: 'weibull', text: 'Weibull', disabled: true },
    // { key: 'reciprocal', text: 'Reciprocal', disabled: true },
  ];
};

export const getScaleRangeCalc = () => {
  return [
    { key: 'constant', text: 'Constant', disabled: false },
    { key: 'dataRange', text: 'Data Range', disabled: false },
  ];
};

export const getDefaultLegend = () => {
  return {
    showlegend: true,
    legend: {
      bgcolor: '#ffffffff',
      bordercolor: '#000000ff',
      borderwidth: 1,
      columns: 1,
      hidetoggle: false,
      isYOnly: false,
      font: {
        family: 'Times New Roman',
        size: 10,
        color: '#000000ff',
        underline: false,
      },
      orientation: 'v',
      traceorder: 'normal',
      // tracegroupgap:10,
      // itemsizing: 'constant',
      itemwidth: 30,
      // y:-0.3,
      x: 1.25,
      //xanchor:'left',
      //y:-2,
      //yanchor:'bottom',
      // valign:'bottom',
      bgopacity: 0.5,
      title: {
        text: '',
        font: {
          family: 'Times New Roman',
          size: 9,
          color: '#000000ff',
        },
      },
    },
  };
};

export const getSymbolTypes = () => {
  return [
    { key: 'double', text: 'Doubles', disabled: false },
    { key: 'mono', text: 'Monochrome', disabled: false },
    { key: 'dot-double', text: 'Dotted doubles', disabled: false },
    { key: 'none', text: '(None)', disabled: false },
    { key: 'circle', text: 'Circle', disabled: false },
    { key: 'circle-open', text: 'Circle Open', disabled: false },
    { key: 'circle-dot', text: 'Circle, Dotted', disabled: false },
    { key: 'circle-open-dot', text: 'Circle Open, Dotted', disabled: false },
    { key: 'circle-cross', text: 'Circle, Crossed', disabled: false },
    { key: 'circle-cross-open', text: 'Circle Open, Crossed', disabled: false },
    { key: 'circle-x', text: 'Circle X', disabled: false },
    { key: 'circle-x-open', text: 'Circle X Open', disabled: false },
    { key: 'square', text: 'Square', disabled: false },
    { key: 'square-open', text: 'Square Open', disabled: false },
    { key: 'square-dot', text: 'Square Dotted', disabled: false },
    { key: 'square-open-dot', text: 'Square Open Dot', disabled: false },
    { key: 'square-cross-open', text: 'Square Cross Open', disabled: false },
    { key: 'triangle-up', text: 'Triangle Up', disabled: false },
    { key: 'triangle-down', text: 'Triangle Down', disabled: false },
    { key: 'triangle-left', text: 'Triangle Left', disabled: false },
    { key: 'triangle-right', text: 'Triangle Right', disabled: false },
    { key: 'diamond', text: 'Diamond', disabled: false },
    { key: 'cross', text: 'Cross', disabled: false },
    { key: 'x', text: 'X', disabled: false },
    { key: 'star-diamond', text: 'Star Diamond', disabled: false },
    { key: 'pentagon', text: 'Pentagon', disabled: false },
    { key: 'octagon', text: 'Octagon', disabled: false },
    { key: 'hexagon', text: 'Hexagon', disabled: false },
    { key: 'hexagram', text: 'Hexagram', disabled: false },
    { key: 'arrow-bar-left', text: 'Arrow Left', disabled: false },
    { key: 'arrow-bar-right', text: 'Arrow Right', disabled: false },
  ];
};

export const getFillDirection = () => {
  return [
    { key: 'tozeroy', text: 'Down', disabled: false },
    // { key: 'tonextx', text: 'Up', disabled: false, },
    { key: 'tozerox', text: 'Left', disabled: false },
    // { key: 'tonexty', text: 'Right', disabled: false, },
  ];
};

export const getRefType = () => {
  return [
    { key: 'none', text: '(None)', disabled: false },
    { key: 'upperspec', text: 'Upper specification', disabled: false },
    { key: 'upperctrl', text: 'Upper control line', disabled: false },
    { key: 'mean', text: 'Mean', disabled: false },
    { key: 'lowerctrl', text: 'Lower control line', disabled: false },
    { key: 'lowerspec', text: 'Lower specification', disabled: false },
  ];
};

export const getRefCalculation = () => {
  return [
    { key: 'meanonly', text: 'Mean only', disabled: true },
    { key: 'stddev', text: 'Standard Deviation', disabled: true },
    { key: 'stderr', text: 'Std Error', disabled: true },
    { key: '95%conf', text: '95%Conf', disabled: true },
    { key: '99%conf', text: '99%Conf', disabled: true },
    { key: 'constant', text: 'Constant', disabled: true },
  ];
};

export const getRefDirection = () => {
  return [
    { key: 'x-hor', text: 'X-Horizontal', disabled: true },
    { key: 'y-ver', text: 'Y-Vertical', disabled: true },
  ];
};

export const getLayering = () => {
  return [
    { key: 'behind', text: 'Behind', disabled: true },
    { key: 'inFront', text: 'In Front', disabled: true },
  ];
};

export const getTickPosition = () => {
  return [
    { key: '', text: '(None)', disabled: false },
    { key: 'inside', text: 'Inside', disabled: false },
    { key: 'outside', text: 'OutSide', disabled: false },
    { key: 'both', text: 'Both', disabled: false },
  ];
};

export const getTickInterval = () => {
  return [
    { key: 'auto', text: 'Automatic', disabled: false },
    { key: 'linear', text: 'Manual', disabled: false },
  ];
};

export const getNotationTypes = () => {
  return [
    // { key: 'power ', text: 'Engineering notation', disabled: true, },
    {
      key: 'power',
      text: 'Engineering notation, for large numbers',
      disabled: false,
    },
    // { key: 'e ', text: 'Scientific notation', disabled: true, },
    {
      key: 'e',
      text: 'Scientific notation, for large numbers',
      disabled: false,
    },
    // { key: 'ex', text: 'Exponent only', disabled: true, },
    // { key: 'power', text: 'Base and Exponent', disabled: true, },
    // { key: 'power', text: 'Base and Exponent, for large numbers', disabled: true, },
  ];
};

export const getExplodeTypes = () => {
  return [
    { key: 'none', text: 'No exploded slices', disabled: false },
    {
      key: 'single',
      text: 'Single slice, (numbered counterclockwise)',
      disabled: false,
    },
  ];
};
export const getOutliersTypes = () => {
  return [
    { key: 'all', text: 'Show each outlier', disabled: false },
    { key: 'percentile', text: 'Show 5th/95th percentile', disabled: false },
  ];
};
export const getAxisShowAtTypes = () => {
  return [
    { key: 'apex', text: 'Apex', disabled: true },
    { key: 'axis', text: 'Along axis', disabled: true },
    { key: 'none', text: 'None', disabled: true },
  ];
};

export const getDirectionTypes = () => {
  return [
    { key: '', text: '(None)', disabled: false },
    { key: 'outside', text: '90° in', disabled: false },
    { key: 'inside', text: '90° out', disabled: false },
  ];
};

export const getFillColorScale = () => {
  return [
    {
      key: 'BlackWhite',
      text: 'BlackWhite',
      disabled: false,
      image: ConstantImage.ColorScheme0,
    },
    {
      key: 'GrayScale',
      text: 'GrayScale',
      disabled: false,
      image: ConstantImage.ColorScheme1,
    },
    {
      key: 'EarthTones',
      text: 'EarthTones',
      disabled: false,
      image: ConstantImage.ColorScheme2,
    },
    {
      key: 'Ocean',
      text: 'Ocean',
      disabled: false,
      image: ConstantImage.ColorScheme3,
    },
    {
      key: 'Forest',
      text: 'Forest',
      disabled: false,
      image: ConstantImage.ColorScheme4,
    },
    {
      key: 'MutedRainbow',
      text: 'MutedRainbow',
      disabled: false,
      image: ConstantImage.ColorScheme5,
    },
    {
      key: 'Incrementing',
      text: 'Incrementing',
      disabled: false,
      image: ConstantImage.ColorScheme6,
    },
    {
      key: 'Spectrum',
      text: 'Spectrum',
      disabled: false,
      image: ConstantImage.ColorScheme7,
    },
    {
      key: 'GrayIntensity',
      text: 'GrayIntensity',
      disabled: false,
      image: ConstantImage.ColorScheme8,
    },
    {
      key: 'Firehouse',
      text: 'Firehouse',
      disabled: false,
      image: ConstantImage.ColorScheme9,
    },
    {
      key: 'Prime',
      text: 'Prime',
      disabled: false,
      image: ConstantImage.ColorScheme10,
    },
    {
      key: 'Party',
      text: 'Party',
      disabled: false,
      image: ConstantImage.ColorScheme11,
    },
    {
      key: 'Heavenly',
      text: 'Heavenly',
      disabled: false,
      image: ConstantImage.ColorScheme12,
    },
    {
      key: 'Royalty',
      text: 'Royalty',
      disabled: false,
      image: ConstantImage.ColorScheme13,
    },
    {
      key: 'Celebration',
      text: 'Celebration',
      disabled: false,
      image: ConstantImage.ColorScheme14,
    },
    {
      key: 'Carnival',
      text: 'Carnival',
      disabled: false,
      image: ConstantImage.ColorScheme15,
    },
    {
      key: 'Sangria',
      text: 'Sangria',
      disabled: false,
      image: ConstantImage.ColorScheme16,
    },
    {
      key: 'Townscape',
      text: 'Townscape',
      disabled: false,
      image: ConstantImage.ColorScheme17,
    },
    {
      key: 'Fancy',
      text: 'Fancy',
      disabled: false,
      image: ConstantImage.ColorScheme18,
    },
    {
      key: 'Rainbow',
      text: 'Rainbow',
      disabled: false,
      image: ConstantImage.ColorScheme19,
    },
    { key: 'none', text: '(None)', disabled: false, image: null },
  ];
};

export const numericDisplayAs = () => {
  return [
    { key: 'E Notation When Needed', text: 'E Notation When Needed' },
    { key: 'E Notation Always', text: 'E Notation Always' },
    { key: 'Fixed Decimal', text: 'Fixed Decimal' },
    { key: 'General', text: 'General' },
  ];
};

export const columnWidthDropdown = () => {
  return [
    { key: '10', text: '10' },
    { key: '12', text: '12' },
    { key: '14', text: '14' },
    { key: '18', text: '18' },
    { key: '24', text: '24' },
    { key: '30', text: '30' },
    { key: '64', text: '64' },
  ];
};



export const decimalPlaces = () => {
  return [
    { key: '0', text: '0' },
    { key: '1', text: '1' },
    { key: '2', text: '2' },
    { key: '3', text: '3' },
    { key: '4', text: '4' },
    { key: '5', text: '5' },
    { key: '6', text: '6' },
  ];
};

export const rowHeightDropdown = () => {
  return [
    { key: '8', text: '8' },
    { key: '10', text: '10' },
    { key: '12', text: '12' },
    { key: '14', text: '14' },
    { key: '18', text: '18' },
    { key: '20', text: '20' },
    { key: '24', text: '24' },
    { key: '36', text: '36' },
    { key: '48', text: '48' },
  ];
};

export const regionalDropdown = [
    { key: 'af-ZA', text: 'Afrikaans(South Africa)' },
    { key: 'sq-AL', text: 'Albanian(Albania)' },
    { key: 'ar-DZ', text: 'Arabic(Algeria)' },
    { key: 'ar-BH', text: 'Arabic(Bahrain)' },
    { key: 'ar-EG', text: 'Arabic(Egypt)' },
    { key: 'ar-IQ', text: 'Arabic(Iraq)' },
    { key: 'ar-JO', text: 'Arabic(Jordan)' },
    { key: 'ar-KW', text: 'Arabic(Kuwait)' },
    { key: 'ar-LB', text: 'Arabic(Lebanon)' },
    { key: 'ar-LY', text: 'Arabic(Libya)' },
    { key: 'ar-MA', text: 'Arabic(Morocco)' },
    { key: 'ar-OM', text: 'Arabic(Oman)' },
    { key: 'ar-QA', text: 'Arabic(Qatar)' },
    { key: 'ar-SA', text: 'Arabic(Saudi Arabia)' },
    { key: 'ar-SY', text: 'Arabic(Syria)' },
    { key: 'ar-TN', text: 'Arabic(Tunisia)' },
    { key: 'ar-AE', text: 'Arabic(United Arab Emirates)' },
    { key: 'ar-YE', text: 'Arabic(Yemen)' },
    { key: 'hy-AM', text: 'Armenian(Armenia)' },
    { key: 'Cy-az-AZ', text: 'Azeri (Cyrillic)(Azerbaijan)' },
    { key: 'Lt-az-AZ', text: 'Azeri (Latin)(Azerbaijan)' },
    { key: 'eu-ES', text: 'Basque(Basque)' },
    { key: 'be-BY', text: 'Belarusian(Belarus)' },
    { key: 'bg-BG', text: 'Bulgarian(Bulgaria)' },
    { key: 'ca-ES', text: 'Catalan(Catalan)' },
    { key: 'zh-CN', text: 'Chinese(China)' },
    { key: 'zh-HK', text: 'Chinese(Hong Kong SAR)' },
    { key: 'zh-MO', text: 'Chinese(Macau SAR)' },
    { key: 'zh-SG', text: 'Chinese(Singapore)' },
    { key: 'zh-TW', text: 'Chinese(Taiwan)' },
    { key: 'zh-CHS', text: 'Chinese (Simplified))' },
    { key: 'zh-CHT', text: 'Chinese (Traditional))' },
    { key: 'hr-HR', text: 'Croatian(Croatia)' },
    { key: 'cs-CZ', text: 'Czech(Czech Republic)' },
    { key: 'da-DK', text: 'Danish(Denmark)' },
    { key: 'div-MV', text: 'Dhivehi(Maldives)' },
    { key: 'nl-BE', text: 'Dutch(Belgium)' },
    { key: 'nl-NL', text: 'Dutch(The Netherlands)' },
    { key: 'en-AU', text: 'English(Australia)' },
    { key: 'en-BZ', text: 'English(Belize)' },
    { key: 'en-CA', text: 'English(Canada)' },
    { key: 'en-CB', text: 'English(Caribbean)' },
    { key: 'en-IE', text: 'English(Ireland)' },
    { key: 'en-JM', text: 'English(Jamaica)' },
    { key: 'en-NZ', text: 'English(New Zealand)' },
    { key: 'en-PH', text: 'English(Philippines)' },
    { key: 'en-ZA', text: 'English(South Africa)' },
    { key: 'en-TT', text: 'English(Trinidad and Tobago)' },
    { key: 'en-GB', text: 'English(United Kingdom)' },
    { key: 'en-US', text: 'English(United States)' },
    { key: 'en-ZW', text: 'English(Zimbabwe)' },
    { key: 'et-EE', text: 'Estonian(Estonia)' },
    { key: 'fo-FO', text: 'Faroese(Faroe Islands)' },
    { key: 'fa-IR', text: 'Farsi(Iran)' },
    { key: 'fi-FI', text: 'Finnish(Finland)' },
    { key: 'fr-BE', text: 'French(Belgium)' },
    { key: 'fr-CA', text: 'French(Canada)' },
    { key: 'fr-FR', text: 'French(France)' },
    { key: 'fr-LU', text: 'French(Luxembourg)' },
    { key: 'fr-MC', text: 'French(Monaco)' },
    { key: 'fr-CH', text: 'French(Switzerland)' },
    { key: 'gl-ES', text: 'Galician(Galician)' },
    { key: 'ka-GE', text: 'Georgian(Georgia)' },
    { key: 'de-AT', text: 'German(Austria)' },
    { key: 'de-DE', text: 'German(Germany)' },
    { key: 'de-LI', text: 'German(Liechtenstein)' },
    { key: 'de-LU', text: 'German(Luxembourg)' },
    { key: 'de-CH', text: 'German(Switzerland)' },
    { key: 'el-GR', text: 'Greek(Greece)' },
    { key: 'he-IL', text: 'Hebrew(Israel)' },
    { key: 'hi-IN', text: 'Hindi(India)' },
    { key: 'hu-HU', text: 'Hungarian(Hungary)' },
    { key: 'is-IS', text: 'Icelandic(Iceland)' },
    { key: 'id-ID', text: 'Indonesian(Indonesia)' },
    { key: 'it-IT', text: 'Italian(Italy)' },
    { key: 'it-CH', text: 'Italian(Switzerland)' },
    { key: 'ja-JP', text: 'Japanese(Japan)' },
    { key: 'kk-KZ', text: 'Kazakh(Kazakhstan)' },
    { key: 'ko-KR', text: 'Korean(Korea)' },
    { key: 'ky-KZ', text: 'Kyrgyz(Kazakhstan)' },
    { key: 'lv-LV', text: 'Latvian(Latvia)' },
    { key: 'lt-LT', text: 'Lithuanian(Lithuania)' },
    { key: 'mk-MK', text: 'Macedonian (FYROM))' },
    { key: 'ms-BN', text: 'Malay(Brunei)' },
    { key: 'ms-MY', text: 'Malay(Malaysia)' },
    { key: 'mn-MN', text: 'Mongolian(Mongolia)' },
    { key: 'nb-NO', text: 'Norwegian (Bokmål)(Norway)' },
    { key: 'nn-NO', text: 'Norwegian (Nynorsk)(Norway)' },
    { key: 'pl-PL', text: 'Polish(Poland)' },
    { key: 'pt-BR', text: 'Portuguese(Brazil)' },
    { key: 'pt-PT', text: 'Portuguese(Portugal)' },
    { key: 'ro-RO', text: 'Romanian(Romania)' },
    { key: 'ru-RU', text: 'Russian(Russia)' },
    { key: 'Cy-sr-SP', text: 'Serbian (Cyrillic)(Serbia)' },
    { key: 'Lt-sr-SP', text: 'Serbian (Latin)(Serbia)' },
    { key: 'sk-SK', text: 'Slovak(Slovakia)' },
    { key: 'sl-SI', text: 'Slovenian(Slovenia)' },
    { key: 'es-AR', text: 'Spanish(Argentina)' },
    { key: 'es-BO', text: 'Spanish(Bolivia)' },
    { key: 'es-CL', text: 'Spanish(Chile)' },
    { key: 'es-CO', text: 'Spanish(Colombia)' },
    { key: 'es-CR', text: 'Spanish(Costa Rica)' },
    { key: 'es-DO', text: 'Spanish(Dominican Republic)' },
    { key: 'es-EC', text: 'Spanish(Ecuador)' },
    { key: 'es-SV', text: 'Spanish(El Salvador)' },
    { key: 'es-GT', text: 'Spanish(Guatemala)' },
    { key: 'es-HN', text: 'Spanish(Honduras)' },
    { key: 'es-MX', text: 'Spanish(Mexico)' },
    { key: 'es-NI', text: 'Spanish(Nicaragua)' },
    { key: 'es-PA', text: 'Spanish(Panama)' },
    { key: 'es-PY', text: 'Spanish(Paraguay)' },
    { key: 'es-PE', text: 'Spanish(Peru)' },
    { key: 'es-PR', text: 'Spanish(Puerto Rico)' },
    { key: 'es-ES', text: 'Spanish(Spain)' },
    { key: 'es-UY', text: 'Spanish(Uruguay)' },
    { key: 'es-VE', text: 'Spanish(Venezuela)' },
    { key: 'sw-KE', text: 'Swahili(Kenya)' },
    { key: 'sv-FI', text: 'Swedish(Finland)' },
    { key: 'sv-SE', text: 'Swedish(Sweden)' },
    { key: 'syr-SY', text: 'Syriac(Syria)' },
    { key: 'ta-IN', text: 'Tamil(India)' },
    { key: 'tt-RU', text: 'Tatar(Russia)' },
    { key: 'te-IN', text: 'Telugu(India)' },
    { key: 'th-TH', text: 'Thai(Thailand)' },
    { key: 'tr-TR', text: 'Turkish(Turkey)' },
    { key: 'uk-UA', text: 'Ukrainian(Ukraine)' },
    { key: 'ur-PK', text: 'Urdu(Pakistan)' },
    { key: 'Cy-uz-UZ', text: 'Uzbek (Cyrillic)(Uzbekistan)' },
    { key: 'Lt-uz-UZ', text: 'Uzbek (Latin)(Uzbekistan)' },
    { key: 'vi-VN', text: 'Vietnamese(Vietnam)' },
  ];


export const fontDropdown = () => {
  return [
    { key: 'Arial', text: 'Arial' },
    { key: 'Arial Black', text: 'Arial Black' },
    { key: 'Times New Roman', text: 'Times New Roman' },
    { key: 'Comic Sans MS', text: 'Comic Sans MS' },
    { key: 'Calibri', text: 'Calibri' },
    { key: 'Cambria', text: 'Cambria' },
    { key: 'Cambria Math', text: 'Cambria Math' },
    { key: 'Candara', text: 'Candara' },
    { key: 'Courier New', text: 'Courier New' },
    { key: 'Georgia', text: 'Georgia' },
  ];
};

export const fontSizeDropdown = () => {
  return [
    { key: '6', text: '6' },
    { key: '8', text: '8' },
    { key: '9', text: '9' },
    { key: '10', text: '10' },
    { key: '11', text: '11' },
    { key: '12', text: '12' },
    { key: '14', text: '14' },
    { key: '16', text: '16' },
    { key: '18', text: '18' },
    { key: '20', text: '20' },
  ];
};

export const barThicknessDropdown = () => {
  return [
    { key: '0.05', text: 'Needle' },
    { key: '0.1', text: '10.0%' },
    { key: '0.2', text: '20.0%' },
    { key: '0.3', text: '30.0%' },
    { key: '0.4', text: '40.0%' },
    { key: '0.5', text: '50.0%' },
    { key: '0.6', text: '60.0%' },
    { key: '0.7', text: '70.0%' },
    { key: '0.8', text: '80.0%' },
    { key: '0.9', text: '90.0%' },
    { key: '1', text: '100.0%' },
  ];
};

export const gridThicknessDropdown = () => {
  return [
    { key: 'thin', text: 'Thin' },
    { key: 'medium', text: 'Medium' },
    { key: 'Thick', text: 'Thick' },
  ];
};

export const logLevels = () => {
  return [
    { key: 'CRITICAL', text: 'CRITICAL' },
    { key: 'ERROR', text: 'ERROR' },
    { key: 'WARNING', text: 'WARNING' },
    { key: 'INFO', text: 'INFO' },
    { key: 'DEBUG', text: 'DEBUG' },
  ];
};

export const areafillOptions = () => {
  return [
    {
      key: 'none',
      text: 'None',
    },
    {
      key: '#small-circle-pattern',
      text: 'Small Circle Pattern',
    },
    {
      key: '#big-circle-pattern',
      text: 'Big Circle Pattern',
    },
    {
      key: '#hline-pattern',
      text: 'Horizontal Line Pattern',
    },
    {
      key: '#vline-pattern',
      text: 'Vertical Line Pattern',
    },
    {
      key: '#brick-patten',
      text: 'Bricks Pattern',
    },
  ];
};

export const bgGradientOptions = () => {
  return [
    {
      key: '#lin-grad1',
      text: ' Linear Gradient 1',
    },
    {
      key: '#lin-grad2',
      text: ' Linear Gradient 2',
    },
    {
      key: '#lin-grad3',
      text: ' Linear Gradient 3',
    },
    {
      key: '#lin-grad4',
      text: ' Linear Gradient 4',
    },
    {
      key: '#rad-grad1',
      text: ' Radial Gradient 1',
    },
  ];
};
