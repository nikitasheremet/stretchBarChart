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







