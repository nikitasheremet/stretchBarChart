
function drawBarChart(data, options, elem) {
  ///// Defines default options /////
  let dOpt = {
    title: "title",
    titleFont: "arial",
    titleColor: "black",
    titleFontSize: "14px",
    xAxisTitle: "x-axis-title",
    yAxisTitle: "y-axis-title",
    // Positions numerical values in barchart
    valuePosition: "center",
    barColor: [],
    // Sets color of numerical values
    labelColor: "black",
    barSpacing: "20px",
    // Sets text of lable on x-axis
    xAxisLabel: [],
    // Legend labels
    legend: []
  };

  let colors = ["lightsteelblue", "navajowhite", "rosybrown", "lightcyan", "cornflowerblue", "lightslategrey", "peru", "antiquewhite", "skyblue", "olive", "lightblue", "lime", "fuchsia", "cyan", "palegreen", "mediumspringgreen", "yellow", "gold", "lightyellow", "indianred", "burlywood", "sandybrown", "coral", "lightsalmon", "orange", "lightpink", "violet", "plum", "thistle", "bisque", "peachpuff", "lavender", "mistyrose"];

  // Updates Default Options (dOpt) with "options" provided by user //

  for (let property in options) {
    dOpt[property] = options[property];
  }

  // Sets global variables
  let lenData;
  let dataMax;
  let arrayLen;
  let roundTop;
  let legend = false;
  let openDiv = "<div class = ";
  let closeDiv = "</div>";


  function checkStacked() {

    /* Checks to see if data provided is nested --- if condition is false then not nested ---
    (if nested then it must be a stacked bar chart). For calc of bar heights 2 lengths
    are needed: len of array, and len of data within nested arrays. If not nested the length
    of array is hard coded to 1. If array is nested length of numerical values
    (translates to # of bars) is taken from the first group of values as all others will
    be the same length */

    if (data[0].length) {
      arrayLen = data.length;
      lenData = data[0].length;
      legend = true;

      // Assigns default legend titles ///
      if (dOpt.legend.length === 0) {
        for (let i = 0; i < arrayLen; i++) {
          dOpt.legend[i] = "data-" + (i + 1);
        }
      }

      /* Assigns random color to each layer of stacked bar chart if barColor not provided,
      if barColor is provided then converts the data to a nested array to allow the for
      loop below to properly duplicate values*/

      if (dOpt.barColor.length === 0) {
        for (let i = 0; i < arrayLen; i++) {
          dOpt.barColor.push(new Array(colors[Math.floor(Math.random() * (colors.length - 1))]));
        }
      } else {
        for (let i = 0; i < dOpt.barColor.length; i++) {
          dOpt.barColor[i] = new Array(dOpt.barColor[i]);
        }
      }

      /* Duplicates the color provided to match the number of values in array to allow formula
      to read through dOpt.barColor correctly */

      for (let i = 0; i < arrayLen; i++) {

        for (let a = 1; a < lenData; a++) {
          dOpt.barColor[i][a] = dOpt.barColor[i][0];
        }

      }

      /* Loops through nested values and adds the first value of each array,
      then all second values and so on. Builds an array from these new numbers
      and finds the max number. This number will be used to calculate the
      y index ticks, and the height of the bars */

      // Defines arbitrary new array that will be used to find max number
      let maxArray = [];

      for (let i = 0; i < lenData; i++) {
        let newNum = 0;
        for (let a = 0; a < arrayLen; a++) {
          newNum += data[a][i];
        }
        maxArray.push(newNum);
      }
      // Calculated "Max Number"
      dataMax = Math.max(...maxArray);

    } else {
      arrayLen = 1;
      lenData = data.length;
      //Calculated "Max Number"
      dataMax = Math.max(...data);
      // Makes data array nested
      data = new Array(data);
      // Assigns random color from array "colors" ////
      if (dOpt.barColor.length === 0) {
        for (let i = 0; i < lenData; i++) {
          dOpt.barColor[i] = colors[Math.floor(Math.random() * (colors.length - 1))];
        }
      }
      // Makes the barColor property a nested array
      dOpt.barColor = new Array(dOpt.barColor);
    }
  }

  function calcTop() {
    ///// Calculates  top limit of chart - used for Y-Axis ticks and bar height calc //////

    switch (true) {
    case dataMax > 80:
      roundTop = 100 * Math.ceil(dataMax / 100);
      break;
    case dataMax > 10:
      roundTop = 10 * Math.ceil(dataMax / 10);
      break;
    case dataMax > 0:
      roundTop = Math.ceil(dataMax);
    }
  }

  /* Function defines CSS and creates DIVs to plan out graph area: title, x-axis,
  y-axis, legend (if applicable) and graph area */

  function defineGraphAreas() {

    /* Append creates Divs with the following classes: title, x-axis-title, x-axis,
    y-axis-title, y-axis, graph-area and legend. These Divs are appended to Div with ID
    matching provided parameter "elem" */

    $(elem).append(function defineGraphArea(){
      let titleHtml = openDiv + "title>" + dOpt.title + closeDiv;
      let xTitleHtml = openDiv + "x-axis-title>" + dOpt.xAxisTitle + closeDiv;
      let yTitleHtml = openDiv + "y-axis-title>" + dOpt.yAxisTitle + closeDiv;
      let graphHtml = openDiv + "graph-area>" + closeDiv;
      let xAxisHtml = openDiv + "x-axis>" + closeDiv;
      let yAxisHtml = openDiv + "y-axis>" + closeDiv;
      let legendHtml = openDiv + "legend>" + closeDiv;

      return titleHtml + graphHtml + yAxisHtml + xAxisHtml + xTitleHtml + yTitleHtml + legendHtml;
    });

    /*Creates CSS for Div with ID mathing "elem". Divides the Bar Chart area into a
    CSS Grid. Sets heigth of entire Div and Width/Margin */

    $(elem).css({
      "width": "50%",
      "height": "600px",
      "margin": "auto",
      "display": "grid",
      "grid-template-columns": "50px 50px auto 100px",
      "grid-template-rows": "50px auto 50px 50px"
    });

    /* Creates CSS for title. Defines grid area for Div title. Takes font family,
    color, and font-size from options. Centers title */

    $(elem + " .title").css({
      "grid-area": "1/3/2/4",
      "font-family": function () {
        return dOpt.titleFont;
      },
      "color": function () {
        return dOpt.titleColor;
      },
      "font-size": function () {
        return dOpt.titleFontSize;
      },
      "font-weight": "bold",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center"
    });

    function makeLegend() {

      /* If stacked bar chart Legend is created. */

      if (legend) {
        $(elem + " .legend").css({
          "grid-area": "2/4/3/5",
          "display": "flex",
          "flex-direction": "column",
          "flex-wrap": "wrap",
          "align-items": "center",
          "justify-content": "center"
        });

        $(elem + " .legend").append(function () {
          let legendTitle = "<p><strong>Legend</strong></p>";
          let output = "";
          for (let i = 0; i < arrayLen; i++) {
            output += "<p><span class = legend-" + i + "></span>" + dOpt.legend[i] + "</p>";
          }
          return legendTitle + output;
        });

        $(elem + " .legend-0").css({
          "vertical-align": "middle"
        });
        for (let i = 0; i < arrayLen; i++) {
          let elemSpan = elem + " .legend-" + i;
          $(elemSpan).css({
            "float": "left",
            "height": "10px",
            "width": "10px",
            "background-color": function () {
              return dOpt.barColor[i][0];
            },
            "margin-right": "5px",
            "position": "relative",
            "bottom": "-2px"
          });
        }
      }
    }

    // Defines CSS for x-axis-title ////

    $(elem + " .x-axis-title").css({
      "grid-area": "4/3/5/4",
      "text-align": "center",
      "font-weight": "bold"
    });

    // Defines CSS for y-axis-title ///

    $(elem + " .y-axis-title").css({
      "grid-area": "2/1/3/2",
      "writing-mode": "vertical-lr",
      "transform": "rotate(180deg)",
      "text-align": "center",
      "font-weight": "bold"
    });

    function makeXAxis() {

      /* Seperates x-axis into grid. Creates DIVs where the x-labels will go.
      Defines CSS for each DIV */

      $(elem + " .x-axis").css({
        "grid-area": "3/3/4/4",
        "display": "grid",
        // # of columns matches # of bars
        "grid-template-columns": function() {
          let output = "repeat(" + lenData + ",1fr)";
          return output;
        },
        "grid-template-rows": "1fr",
        // Matches the spacing between bars
        "grid-column-gap": function () {
          return dOpt.barSpacing;
        },
        "padding-left": "10px",
        "padding-right": "10px"
      });

      // Creates DIVs with x-axis labels as values
      $(elem +" .x-axis").append(function() {
        let output = "";
        for (let i = 0; i < lenData; i++) {
          output += openDiv + "x-axis-label-" + i + ">" + dOpt.xAxisLabel[i] + closeDiv;
        }
        return output;
      });

      // Defines CSS for DIVs
      for (let i = 0; i < lenData; i++) {
        let elemXAxis = elem + " .x-axis-label-" + i;
        //alert(elemXAxis);
        $(elemXAxis).css({
          "display": "flex",
          "align-items": "center",
          "justify-content": "center"
        });
      }
    }

    function makeYAxis() {

      /* Defines CSS for y-axis, creates grid. Creates DIVs to show y-axis values. Y-axis
      values are calculated and values are inserted into DIVs. Defines CSS for each DIV */

      $(elem + " .y-axis").css({
        "grid-area": "2/2/3/3",
        "display": "grid",
        "grid-template-columns": "1fr",
        "grid-template-rows": "1fr 2fr 2fr 2fr 2fr 2fr 1fr"
      });

      // Creates DIVs along y-axis. Values are computed by dividing "roundTop" by 5
      $(elem + " .y-axis").append(function () {
        let output = "";
        for (let i = 1; i <= 5; i++) {
          output += openDiv + "y-axis-" + i + ">" + ((roundTop / 5) * i).toFixed(1) + closeDiv;
        }
        return output;
      });

      // Define CSS for DIVs
      for (let i = 1; i <= 5; i++) {
        let elemYAxis = elem + " .y-axis-" + i;
        $(elemYAxis).css({
          "grid-area": function () {
            let output = (-i - 1) + "/1/" + (-i - 2) + "/2";
            return output;
          },
          "display": "flex",
          "align-items": "center",
          "justify-content": "center"
        });
      }
    }

    /* Defines CSS for graph area. Creates another grid inside which will house the
    bars and y-axis lines. Inside of this grid is where function create visual
    will populate */

    $(elem + " .graph-area").css({
      "grid-area": "2/3/3/4",
      "background-color": "#e1e1e1",
      "display": "grid",
      ///// Divides graph area into columns
      "grid-template-columns": function () {
        let output = "repeat(" + lenData + ",1fr)";
        return output;
      },
      "grid-template-rows": "repeat(6,1fr)",
      "grid-column-gap": function () {
        return dOpt.barSpacing;
      },
      "padding-left": "10px",
      "padding-right": "10px",
      "position": "relative"
    });

    makeXAxis();
    makeYAxis();
    makeLegend();

  }

  /////////////// Creates visuals in graph-area //////////////

  function createVisual() {

    /* Creates DIVs which will contain bars and y-axis lines. Does this using a for
    loop to loop through data array and create a bar for each data point. Creates
    5 DIVs for the axis lines as the number of axis lines is fixed*/

    $(elem + " .graph-area").append(function () {

      let output = "";

      /// Creates bars here ///
      for (let i = 0; i < arrayLen; i++) {
        for (let a = 0; a < lenData; a++) {
          output += openDiv + "bar-" + i + a + ">" + "<p class = label>" + data[i][a] + "</p>" + closeDiv;
        }
      }
      /// Creates axis line here ///
      for (let i = 1; i <= 5; i++) {
        output += openDiv + "axis-line-" + i + ">" + closeDiv;
      }
      return output;
    });

    /// Defines CSS for axis lines. Defininig frid areas and border style/weight
    for (let i = 1; i <= 5; i++) {
      let elemAxisLine = elem + " .axis-line-" + i;
      $(elemAxisLine).css({
        "grid-area": function () {
          let output = i + "/1/" + (i + 1) + "/" + (lenData + 1);
          return output;
        },
        "border-bottom": "dotted",
        "border-width": "0.5px"
      });
    }

    /* Defines CSS for bars setting the height, color, label position, label color,
    and stacking position. Height of bar is calculated by dividing data by the "roundTop"
    number + 1/5 of "roundTop". This provides a % which is then multiplied by total
    height of graph-area.  */

    /// Cycles through columns
    for (let i = 0; i < lenData; i++) {

      /// Used to set padding on stacked bars
      let paddingNum = 0;

      /// Cycles through layers
      for (let a = 0; a < arrayLen; a++) {

        let fillPer;
        let pxFill;

        fillPer = data[a][i] / (roundTop + ((roundTop / 5)));
        //////need to not hard code!!!!!!!!!!!!!!!
        pxFill = fillPer * 450;

        let elemBar = elem + " .bar-" + a + i;

        $(elemBar).css({
          "grid-area": function () {

            let output =   "1/" + (i + 1) + "/7/" + (i + 2);
            return output;
          },
          "background-color": function () {

            return dOpt.barColor[a][i];
          },
          /// Ensures that with multiple layers height of bar is precise
          "padding-bottom": function () {

            return paddingNum + "px";
          },
          "height": function () {

            return pxFill + "px";
          },
          "place-self": "end stretch",
          /// Ensure that with multiple layers each bar can be seen
          "z-index": function () {

            return 100 - a;
          },
          "display": "flex",
          "align-items": function () {

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
          "justify-content": "center"
        });

        /* Hides numerical values if bar is drawn to small as the value will stick out
        incorectly */

        elemBar += " .label";
        $(elemBar).css({
          "visibility": function () {

            if (pxFill < 14) {
              return "hidden";
            }
          },
          "margin-top": "unset",
          "margin-bottom": "unset",
          "font-weight": "bold",
          /// Sets color of values in bars
          "color": function () {

            return dOpt.labelColor;
          }
        });
        /// Adds the previous height onto padding so next bar is diplayed correctly
        paddingNum = pxFill + paddingNum;

      /// End of loop cycling through layers
      }
    /// End of loop cycling through columns
    }
  /// End of function createVisual
  }

  checkStacked();
  calcTop();
  defineGraphAreas();
  createVisual();


  /*
  alert("round top: " + roundTop);
  alert("maxArray is: " + maxArray);
  alert("lenData is:" + lenData);
  alert("arrayLen is: " + arrayLen);
  alert("max is: " + dataMax);
  */

}
