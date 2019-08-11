# stretchBarChart
Bar Chart Stretch project

## About
The goal of this project was to build an API , *drawBarChart()*, that could be used to quickly build a simple bar/stacked bar chart in a webpage. 

When building your webpage in order to use the API you would need to downlod the files **chartJs.js** and
**jQuery.js** from the Repo and link your *index.html* file to them.

(https://github.com/nikitasheremet/stretchBarChart/blob/master/link-example.png)

Two things are needed to run the API: 

An empty div element with a unique ID, and a Script section that calls the drawBarChart() function. 

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

- title : sets the title of the graph - default: "title"
- titleFont: sets font family for title - default "arial"
- titleColor: sets color of title - default "black"
- titleFontSize: sets font size for title - default "14px"
- xAxisTitle: sets title for x Axis - default "x-axis-title"
- yAxisTitle: sets title for y Axis - default "y-axis-title"
- valuePosition: sets position of values in bars - options "top", "bottom", "center" - default "center"
- barColor: sets colors for bars. If normal bar chart provide array of colors with **one** color for **each** data value. If stacked bar chart provide array of colors with **one** color for **each set** of numbers. eg: Bar Chart: data:'[2,3,4]': ["blue", "grey", "red]; Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': ["blue", "green"] - default randomized colors
- labelColor: sets the color for the values shown in the bars - default "black"
- barSpacing: sets the spacing between the bars - default "20px"
- xAxisLabel: sets lables for bars. Provided as text within an array - No Default
- legend: Only used if stacked Bar Chart. Provided as text within array. One value per set of numbers. eg: Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': ["toronto", "vancouver"] - default: creates legend numbering each stack in ascending order. eg: Stacked Bar Chart: data: '[[2,3,4],[4,5,6]]': data-1, data-2






