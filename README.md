# stretchBarChart
Bar Chart Stretch project

## About
The goal of this project was to build an API , *drawBarChart()*, that could be used to quickly build a simple bar/stacked bar chart in a webpage. 

When building your webpage in order to use the API you would need to downlod the files **chartJs.js** and
**jQuery.js** from the Repo and link your *index.html* file to them.

![Image of .js linking](https://github.com/nikitasheremet/stretchBarChart/blob/master/link-example.png)

Two things are needed to run the API: 

An empty div element with a unique ID, and a Script section that calls the drawBarChart() function. 

![Image showing nasic layout](https://github.com/nikitasheremet/stretchBarChart/blob/master/layout-example.png)

drawBarChart recieves 3 parameters :
- Data
- Graph Options
- Element Name

**Data**: 
  Must be provided as an array, or as a nested array if creating a stacked bar chart.
  Values are seperated by commas. 

**Graph Options**: 
  Must be provided as an object.
  
**Element Name**:
  Must be provided as a text value with a '#' before the name; eg. "#firstChart'

List of options:

- **title** : sets the title of the graph - default: "title"
- **titleFont**: sets font family for title - default "arial"
- **titleColor**: sets color of title - default "black"
- **titleFontSize**: sets font size for title - default "14px"
- **xAxisTitle**: sets title for x Axis - default "x-axis-title"
- **yAxisTitle**: sets title for y Axis - default "y-axis-title"
- **valuePosition**: sets position of values in bars - options "top", "bottom", "center" - default "center"
- **barColor**: sets colors for bars. If normal bar chart provide array of colors with **one** color for **each** data value. If stacked bar chart provide array of colors with **one** color for **each set** of numbers. eg: Bar Chart: data:'[2,3,4]': ["blue", "grey", "red]; Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': ["blue", "green"] - default randomized colors
- **labelColor**: sets the color for the values shown in the bars - default "black"
- **barSpacing**: sets the spacing between the bars - default "20px"
- **xAxisLabel**: sets lables for bars. Provided as text within an array - No Default
- **legend**: Only used if stacked Bar Chart. Provided as text within array. One value per set of numbers. eg: Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': ["toronto", "vancouver"] - default: creates legend numbering each stack in ascending order. eg: Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': data-1, data-2

See full example on [github pages](https://nikitasheremet.github.io/stretchBarChart/)

Screenshot for html code for above webpage:

![screenshot for sample html](https://github.com/nikitasheremet/stretchBarChart/blob/master/example-html.png)

## Issues/Bugs

If an incorrect number of colors is provided under **barColor**, function will not run
If an incorrect number of text values is provided under **legend**, function will not run
If an incorrect number of text values is provided under **xAxisLabel**, function will not run

## Road Map

Update code to fix issues mentioned under **Issues/Bugs**
Add defualt values for xAxisLabels
Add option to make a stacked bar chart out of 100%

## External Resources

[CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

[CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)


