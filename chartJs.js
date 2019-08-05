
 function drawBarChart(data, options, elem) {
  //defines default options
  let dOpt = {
    title: "title",
    xAxisTitle: "x-axis-title",
    yAxisTitle: "y-axis-title"
  };
  // updates default options with options provided by user
  for (let property in options) {
      dOpt[property] = options[property];
  }
  let lenData = data.length;
  let dataMax = Math.max(...data);
  
  let openDiv = "<div class = ";
  let closeDiv = "</div>";
  
  //functiion creates 6 divs within parent div matching 'elem' in order to organize titles and graphing area
  $(elem).append(function defineGraphArea(){
    let titleHtml = openDiv + "title>" + dOpt.title + closeDiv;
    let xTitleHtml = openDiv + "x-axis-title>" + dOpt.xAxisTitle + closeDiv;
    let yTitleHtml = openDiv + "y-axis-title>" + dOpt.yAxisTitle + closeDiv;
    let graphHtml = openDiv + "graph-area>" + closeDiv;
    let xAxisHtml = openDiv + "x-axis>" + closeDiv;
    let yAxisHtml = openDiv + "y-axis>" + closeDiv;
    
    return titleHtml + graphHtml + yAxisHtml + xAxisHtml + xTitleHtml + yTitleHtml;
  });
  
  function createVisual () { ///////////////Creates visuals in graph area
      
    $(".graph-area").append(function defineBars() { //creates bars in graph area
      let output = "";
      for (i = 0; i < lenData; i++) {
        output += openDiv + "bar-" + i + ">" + data[i] + closeDiv;
      }
      return output;
    });

    //calculates limit of chart
    let roundTop;
    switch (true) {
      case dataMax > 50:
        roundTop = 100 * Math.ceil(dataMax/100);
        break;
      case dataMax > 10:
        roundTop = 10 * Math.ceil(dataMax/10);
        break;
      case dataMax > 0:
        roundTop = Math.ceil(dataMax);
    }
    // draws bars inside chart area
    for (i = 0; i < lenData; i++) {
      elem = ".bar-"+i;
      $(elem).css({
        "grid-area" : function setGrid() {
          let output =   "1/" + (i+1) + "/7/" + (i+2);
          return output;
        },
        "background-color" : "lightblue",
        "position" : "absolute",
        "height": function setHeight() {
          let fillPer;
          let pxFill;
          fillPer = data[i]/(roundTop + ((roundTop/5)/2));
          pxFill = fillPer * 450;
          return pxFill + "px";
        },
        "bottom" : "0px",
        "right" : "0px",
        "left" : "0px"
      });
    }
  }
  $(elem).css({
    "width": "80%",
    "height": "600px",
    "margin": "auto",
    "display":"grid",
    "grid-template-columns": "50px 50px auto 50px",
    "grid-template-rows": "50px auto 50px 50px"
  });
  $(".title, .x-axis-title, .y-axis-title, .x-axis, .y-axis").css({
    "background-color": "lightgrey",
  });
  $(".title").css({
    "grid-column-start": "3",
    "grid-column-end": "4",
    "grid-row-start": "1",
    "grid-row-end": "2"
  });
  $(".x-axis-title").css({
    "grid-column-start": "3",
    "grid-column-end": "4",
    "grid-row-start": "4",
    "grid-row-end": "5"
    
  });
  $(".y-axis-title").css({
    "grid-column-start": "1",
    "grid-column-end": "2",
    "grid-row-start": "2",
    "grid-row-end": "3"
    
  });
  $(".x-axis").css({
    "grid-column-start": "3",
    "grid-column-end": "4",
    "grid-row-start": "3",
    "grid-row-end": "4"
    
  });
  $(".y-axis").css({
    "grid-column-start": "2",
    "grid-column-end": "3",
    "grid-row-start": "2",
    "grid-row-end": "3"
    
  });
  $(".graph-area").css({
    "grid-area" : "2/3/3/4",
    "background-color": "pink",
    "display": "grid",
    "grid-template-columns": function makeCol() {
      let output = "";
      for (i = 0; i < lenData; i++) {
        output += "1fr ";
      }
      return output;
    },
    "grid-template-rows": "1fr 1fr 1fr 1fr 1fr 1fr",
    "grid-column-gap": "50px",
    "padding-left":"10px",
    "padding-right": "10px",
    "position":"relative"
  });

    createVisual();
  

  
}
 
  














/* options:


*/