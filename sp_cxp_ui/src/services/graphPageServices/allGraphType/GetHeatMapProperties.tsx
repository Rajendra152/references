// A heatmap trace is an object with the key "type" equal to "heatmap" (i.e. {"type": "heatmap"}) and any of the keys listed below.

// The data that describes the heatmap value-to-color mapping is set in `z`. Data in `z` can either be a 2D array of values (ragged or not) or a 1D array of values. In the case where `z` is a 2D array, say that `z` has N rows and M columns. Then, by default, the resulting heatmap will have N partitions along the y axis and M partitions along the x axis. In other words, the i-th row/ j-th column cell in `z` is mapped to the i-th partition of the y axis (starting from the bottom of the plot) and the j-th partition of the x-axis (starting from the left of the plot). This behavior can be flipped by using `transpose`. Moreover, `x` (`y`) can be provided with M or M+1 (N or N+1) elements. If M (N), then the coordinates correspond to the center of the heatmap cells and the cells have equal width. If M+1 (N+1), then the coordinates correspond to the edges of the heatmap cells. In the case where `z` is a 1D array, the x and y coordinates must be provided in `x` and `y` respectively to form data triplets.

// type
// Parent: data[type=heatmap]
// Type: "heatmap"
// name
// Parent: data[type=heatmap]
// Type: string
// Sets the trace name. The trace name appear as the legend item and on hover.

// visible
// Parent: data[type=heatmap]
// Type: enumerated , one of ( true | false | "legendonly" )
// Default: true
// Determines whether or not this trace is visible. If "legendonly", the trace is not drawn, but can appear as a legend item (provided that the legend itself is visible).

// showlegend
// Parent: data[type=heatmap]
// Type: boolean
// Determines whether or not an item corresponding to this trace is shown in the legend.

// legendrank
// Parent: data[type=heatmap]
// Type: number
// Default: 1000
// Sets the legend rank for this trace. Items and groups with smaller ranks are presented on top/left side while with `"reversed" `legend.traceorder` they are on bottom/right side. The default legendrank is 1000, so that you can use ranks less than 1000 to place certain items before all unranked items, and ranks greater than 1000 to go after all unranked items.

// legendgroup
// Parent: data[type=heatmap]
// Type: string
// Default: ""
// Sets the legend group for this trace. Traces part of the same legend group hide/show at the same time when toggling legend items.

// legendgrouptitle
// Parent: data[type=heatmap]
// Type: object containing one or more of the keys listed below.
// font
// Parent: data[type=heatmap].legendgrouptitle
// Type: object containing one or more of the keys listed below.
// Sets this legend group's title font.

// color
// Parent: data[type=heatmap].legendgrouptitle.font
// Type: color
// family
// Parent: data[type=heatmap].legendgrouptitle.font
// Type: string
// HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. Provide multiple font families, separated by commas, to indicate the preference in which to apply fonts if they aren't available on the system. The Chart Studio Cloud (at https://chart-studio.plotly.com or on-premise) generates images on a server, where only a select number of fonts are installed and supported. These include "Arial", "Balto", "Courier New", "Droid Sans",, "Droid Serif", "Droid Sans Mono", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman".

// size
// Parent: data[type=heatmap].legendgrouptitle.font
// Type: number greater than or equal to 1
// text
// Parent: data[type=heatmap].legendgrouptitle
// Type: string
// Default: ""
// Sets the title of the legend group.

// opacity
// Parent: data[type=heatmap]
// Type: number between or equal to 0 and 1
// Default: 1
// Sets the opacity of the trace.

// ids
// Parent: data[type=heatmap]
// Type: data array
// Assigns id labels to each datum. These ids for object constancy of data points during animation. Should be an array of strings, not numbers or any other type.

// x
// Parent: data[type=heatmap]
// Type: data array
// Sets the x coordinates.

// x0
// Parent: data[type=heatmap]
// Type: number or categorical coordinate string
// Default: 0
// Alternate to `x`. Builds a linear space of x coordinates. Use with `dx` where `x0` is the starting coordinate and `dx` the step.

// dx
// Parent: data[type=heatmap]
// Type: number
// Default: 1
// Sets the x coordinate step. See `x0` for more info.

// xtype
// Parent: data[type=heatmap]
// Type: enumerated , one of ( "array" | "scaled" )
// If "array", the heatmap's x coordinates are given by "x" (the default behavior when `x` is provided). If "scaled", the heatmap's x coordinates are given by "x0" and "dx" (the default behavior when `x` is not provided).

// xgap
// Parent: data[type=heatmap]
// Type: number greater than or equal to 0
// Default: 0
// Sets the horizontal gap (in pixels) between bricks.

// y
// Parent: data[type=heatmap]
// Type: data array
// Sets the y coordinates.

// y0
// Parent: data[type=heatmap]
// Type: number or categorical coordinate string
// Default: 0
// Alternate to `y`. Builds a linear space of y coordinates. Use with `dy` where `y0` is the starting coordinate and `dy` the step.

// dy
// Parent: data[type=heatmap]
// Type: number
// Default: 1
// Sets the y coordinate step. See `y0` for more info.

// ytype
// Parent: data[type=heatmap]
// Type: enumerated , one of ( "array" | "scaled" )
// If "array", the heatmap's y coordinates are given by "y" (the default behavior when `y` is provided) If "scaled", the heatmap's y coordinates are given by "y0" and "dy" (the default behavior when `y` is not provided)

// ygap
// Parent: data[type=heatmap]
// Type: number greater than or equal to 0
// Default: 0
// Sets the vertical gap (in pixels) between bricks.

// z
// Parent: data[type=heatmap]
// Type: data array
// Sets the z data.

// text
// Parent: data[type=heatmap]
// Type: data array
// Sets the text elements associated with each z value.

// hovertext
// Parent: data[type=heatmap]
// Type: data array
// Same as `text`.

// hoverinfo
// Parent: data[type=heatmap]
// Type: flaglist string. Any combination of "x", "y", "z", "text", "name" joined with a "+" OR "all" or "none" or "skip".
// Examples: "x", "y", "x+y", "x+y+z", "all"
// Default: "all"
// Determines which trace information appear on hover. If `none` or `skip` are set, no information is displayed upon hovering. But, if `none` is set, click and hover events are still fired.

// hovertemplate
// Parent: data[type=heatmap]
// Type: string or array of strings
// Default: ""
// Template string used for rendering the information that appear on hover box. Note that this will override `hoverinfo`. Variables are inserted using %{variable}, for example "y: %{y}" as well as %{xother}, {%_xother}, {%_xother_}, {%xother_}. When showing info for several points, "xother" will be added to those with different x positions from the first point. An underscore before or after "(x|y)other" will add a space on that side, only when this field is shown. Numbers are formatted using d3-format's syntax %{variable:d3-format}, for example "Price: %{y:$.2f}". https://github.com/d3/d3-format/tree/v1.4.5#d3-format for details on the formatting syntax. Dates are formatted using d3-time-format's syntax %{variable|d3-time-format}, for example "Day: %{2019-01-01|%A}". https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format for details on the date formatting syntax. The variables available in `hovertemplate` are the ones emitted as event data described at this link https://plotly.com/javascript/plotlyjs-events/#event-data. Additionally, every attributes that can be specified per-point (the ones that are `arrayOk: true`) are available. Anything contained in tag `<extra>` is displayed in the secondary box, for example "<extra>{fullData.name}</extra>". To hide the secondary box completely, use an empty tag `<extra></extra>`.

// xhoverformat
// Parent: data[type=heatmap]
// Type: string
// Default: ""
// Sets the hover text formatting rulefor `x` using d3 formatting mini-languages which are very similar to those in Python. For numbers, see: https://github.com/d3/d3-format/tree/v1.4.5#d3-format. And for dates see: https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format. We add two items to d3's date formatter: "%h" for half of the year as a decimal number as well as "%{n}f" for fractional seconds with n digits. For example, "2016-10-13 09:15:23.456" with tickformat "%H~%M~%S.%2f" would display "09~15~23.46"By default the values are formatted using `xaxis.hoverformat`.

// yhoverformat
// Parent: data[type=heatmap]
// Type: string
// Default: ""
// Sets the hover text formatting rulefor `y` using d3 formatting mini-languages which are very similar to those in Python. For numbers, see: https://github.com/d3/d3-format/tree/v1.4.5#d3-format. And for dates see: https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format. We add two items to d3's date formatter: "%h" for half of the year as a decimal number as well as "%{n}f" for fractional seconds with n digits. For example, "2016-10-13 09:15:23.456" with tickformat "%H~%M~%S.%2f" would display "09~15~23.46"By default the values are formatted using `yaxis.hoverformat`.

// meta
// Parent: data[type=heatmap]
// Type: number or categorical coordinate string
// Assigns extra meta information associated with this trace that can be used in various text attributes. Attributes such as trace `name`, graph, axis and colorbar `title.text`, annotation `text` `rangeselector`, `updatemenues` and `sliders` `label` text all support `meta`. To access the trace `meta` values in an attribute in the same trace, simply use `%{meta[i]}` where `i` is the index or key of the `meta` item in question. To access trace `meta` in layout attributes, use `%{data[n[.meta[i]}` where `i` is the index or key of the `meta` and `n` is the trace index.

// customdata
// Parent: data[type=heatmap]
// Type: data array
// Assigns extra data each datum. This may be useful when listening to hover, click and selection events. Note that, "scatter" traces also appends customdata items in the markers DOM elements

// xaxis
// Parent: data[type=heatmap]
// Type: subplotid
// Default: x
// Sets a reference between this trace's x coordinates and a 2D cartesian x axis. If "x" (the default value), the x coordinates refer to `layout.xaxis`. If "x2", the x coordinates refer to `layout.xaxis2`, and so on.

// yaxis
// Parent: data[type=heatmap]
// Type: subplotid
// Default: y
// Sets a reference between this trace's y coordinates and a 2D cartesian y axis. If "y" (the default value), the y coordinates refer to `layout.yaxis`. If "y2", the y coordinates refer to `layout.yaxis2`, and so on.

coloraxis