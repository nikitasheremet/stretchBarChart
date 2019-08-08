
 function drawBarChart(data, options, elem) {
  ///// Defines default options /////
  let dOpt = {
    title: "title",
    titleFont: "arial",
    titleColor: "black",
    titleFontSize: "14px",
    xAxisTitle: "x-axis-title",
    yAxisTitle: "y-axis-title",
    valuePosition: "center",    // Positions numerical values in barchart
    barColor: [],
    labelColor: "black",        // Sets color of numerical values
    barSpacing: "20px",
    xAxisLabel: []              // Sets text of lable on x-axis
  };

  // Updates Default Options (dOpt) with "options" provided by user //

  for (let property in options) {
      dOpt[property] = options[property];
  }

  let lenData;  // sets global
  let dataMax;  // sets global
  let arrayLen; // sets global 
  let openDiv = "<div class = "; //global var for ease of creating html code with jQuery
  let closeDiv = "</div>";       //^     

  /* Checks to see if data provided is nested --- if condition is false then not nested ---
  (if nested then it must be a stacked bar chart). For calc of bar heights 2 lengths 
  are needed: len of array, and len of data within nested arrays. If not nested the length 
  of array is hard coded to 1. If array is nested length of numerical values 
  (translates to # of bars) is taken from the first group of values as all others will 
  be the same length */

  if (data[0].length) {
    arrayLen = data.length; 
    lenData = data[0].length;
    
    /* Loops through nested values and adds the first value of each array,
    then all second values and so on. Builds an array from these new numbers
    and finds the max number. This number will be used to calculate the 
    y index ticks, and the height of the bars */

    let maxArray = []; // Defines a new array that will be used to find max number

    for (i = 0; i < lenData; i++) {
      let newNum = 0;
      for (a = 0; a < arrayLen; a++) {
        newNum += data[a][i];
      }
      maxArray.push(newNum);
    }

    dataMax = Math.max(...maxArray); // Calculated "Max Number"
    
  } else {
    arrayLen = 1;
    lenData = data.length;
    dataMax = Math.max(...data); //Calculated "Max Number"
  }

  ///// Calculates  top limit of chart - used for Y-Axis ticks and bar height calc //////
  let roundTop;
  switch (true) {
    case dataMax > 80:
      roundTop = 100 * Math.ceil(dataMax/100);
      break;
    case dataMax > 10:
      roundTop = 10 * Math.ceil(dataMax/10);
      break;
    case dataMax > 0:
      roundTop = Math.ceil(dataMax);
  }

  //alert("round top: " + roundTop);
  //alert("maxArray is: " + maxArray);
  //alert("lenData is:" + lenData);
  //alert("arrayLen is: " + arrayLen);
  //alert("max is: " + dataMax);
  
  /* Append creates Divs with the following classes: title, x-axis-title, x-axis,
  y-axis-title, y-axis, and graph-area. These Divs are appended to Div with ID 
  matching provided parameter "elem" */

  $(elem).append(function defineGraphArea(){
    let titleHtml = openDiv + "title>" + dOpt.title + closeDiv;
    let xTitleHtml = openDiv + "x-axis-title>" + dOpt.xAxisTitle + closeDiv;
    let yTitleHtml = openDiv + "y-axis-title>" + dOpt.yAxisTitle + closeDiv;
    let graphHtml = openDiv + "graph-area>" + closeDiv;
    let xAxisHtml = openDiv + "x-axis>" + closeDiv;
    let yAxisHtml = openDiv + "y-axis>" + closeDiv;
    
    return titleHtml + graphHtml + yAxisHtml + xAxisHtml + xTitleHtml + yTitleHtml;
  });

  $(elem).css({
    "width": "80%",
    "height": "600px",
    "margin": "auto",
    "display":"grid",
    "grid-template-columns": "50px 50px auto 50px",
    "grid-template-rows": "50px auto 50px 50px"
  });

  $(".title").css({
    "grid-area" : "1/3/2/4",
    "font-family" : function () {
      return dOpt.titleFont;
    },
    "color" : function () {
      return dOpt.titleColor;
    },
    "font-siize" : function () {
      return dOpt.titleFontSize;
    },
    "text-align" : "center",
    "padding-top" : "25px",
    "font-weight" : "bold"
  });

  $(".x-axis-title").css({
    "grid-area" : "4/3/5/4",
    "text-align" : "center",
    "font-weight" : "bold"
  });

  $(".y-axis-title").css({
    "grid-area" : "2/1/3/2",
    "writing-mode": "vertical-lr",
    "transform" : "rotate(180deg)",
    "text-align" : "center",
    "font-weight" : "bold"
  });

  $(".x-axis").css({
    "grid-area" : "3/3/4/4",
    "display" : "grid",
    "grid-template-columns" : function() {// seperate the x-axis into segments in accordance with bar charts
      let output = "repeat(" + lenData + ",1fr)";
      return output;
    },
    "grid-template-rows" : "1fr",
    "grid-column-gap" : "20px",
    "padding-left" : "10px",
    "padding-right" : "10px"
  });

  $(".x-axis").append(function() {//add values to x axis
    let output = "";
    for (i = 0; i < lenData; i++) {
      output += openDiv + "x-axis-label-" + i + ">" + dOpt.xAxisLabel[i] + closeDiv;
    }
    return output;
  });
  for (i = 0; i < lenData; i++) {
    elemXAxis = ".x-axis-label-" + i;
    //alert(elemXAxis);
    $(elemXAxis).css({
      "display" : "flex",
      "align-items" : "center",
      "justify-content" : "center"
    })
  }

  $(".y-axis").css({
    "grid-area" : "2/2/3/3",
    "display" : "grid",
    "grid-template-columns" : "1fr",
    "grid-template-rows" : "1fr 2fr 2fr 2fr 2fr 2fr 1fr"
  });

  $(".y-axis").append(function () {///// creates divs for y axis values
    output = "";
    for (i = 1; i <= 5; i++) {
      output += openDiv + "y-axis-" + i + ">" + ((roundTop/5)*i).toFixed(1) + closeDiv;
      //alert("y axis output: " + output);
    }
    return output;
  });

  for (i = 1; i <= 5; i++) { //// positions y axis values along axis
    elemYAxis = ".y-axis-" + i;
    $(elemYAxis).css({
      "grid-area" : function () {
        let output = (-i-1) + "/1/" + (-i-2) + "/2";
        return output;
      },
      "display" : "flex",
      "align-items" : "center",
      "justify-content" : "center"
    })
  }

  $(".graph-area").css({
    "grid-area" : "2/3/3/4",
    "background-color": "pink",
    "display": "grid",
    "grid-template-columns": function () { ///// divides graph area into columns
      let output = "repeat(" + lenData + ",1fr)";
      return output;
    },
    "grid-template-rows": "repeat(6,1fr)",
    "grid-column-gap": function () {
      return dOpt.barSpacing;
    },
    "padding-left":"10px",
    "padding-right": "10px",
    "position":"relative"
  });
  
  /////////////// Creates visuals in graph area //////////////
  function createVisual() { 
    
    // Creates bars and axis lines
    $(".graph-area").append(function () {
      let output = "";
      for (i = 0; i < arrayLen; i++) {
        for (a = 0; a < lenData; a++) {
          output += openDiv + "bar-" + i + a + ">" + "<p class = label>" + data[i][a] + "</p>" + closeDiv;
        }
      }
      for (i = 1; i <= 5; i++) {
        output += openDiv + "axis-line-" + i + ">" + closeDiv;
      }
      return output;
    });
    
    for (i = 1; i <=5; i++) { ///////////////////////draws axis lines
      elemAxisLine = ".axis-line-" + i;
      $(elemAxisLine).css({
        "grid-area" : function () {
          let output = i + "/1/" + (i+1) + "/" + (lenData+1);
          return output;
        },
        "border-bottom" : "dashed"
      })
    }
    for (i = 0; i < lenData; i++) {///controls which column
      //alert("i is:" + i);
      let paddingNum = 0;
      for (a = 0; a < arrayLen; a++) { //controls which layer
        //alert("a is: " + a)
        let fillPer;
        let pxFill;

        fillPer = data[a][i]/(roundTop + ((roundTop/5)));
        //alert("fill per is: " +fillPer)
        pxFill = fillPer * 450; //////need to not hard code!!!!!!!!!!!!!!!
        //alert(paddingNum);
        
        //alert("pxfill is:" + pxFill);
        elemBar = ".bar-"+ a + i;
        //alert(elemBar);
        $(elemBar).css({
          "grid-area" : function () {
            let output =   "1/" + (i+1) + "/7/" + (i+2);
            //alert(output);
            return output;
          },
          "background-color" : function () {
            
            return dOpt.barColor[a][i];
          },
          "padding-bottom" : function () {
            return paddingNum + "px";
          },
          "height": function () {
            return pxFill + "px";
          },
          "place-self" : "end stretch",
          "z-index" : function () {
              return 100-a;
          },
          "display" : "flex",
          "align-items" : function () {
            let output = "";
            switch (dOpt.valuePosition) {
              case "center":
                output = "center";
                break;
              case "top":
                output = "flex-start";
                break;
              case "bottom":
                output = "flex-end";
            }
            return output;
          },
          "justify-content" : "center"
        });
        elemBar += " .label";
        //alert("elemBar is: " + elemBar);
        $(elemBar).css({
          "visibility" : function () {
            //alert("pxfill is: " + pxFill);
            if (pxFill < 14) {
              return "hidden";
            }
          },
          "margin-top" : "unset",
          "margin-bottom" : "unset"
        })
        paddingNum = pxFill + paddingNum;
      }
      padding = "0px"
    }
  } ///////////////////////////////////////////////////////////
  createVisual();


  

  
}
 
  














/* options:


*/