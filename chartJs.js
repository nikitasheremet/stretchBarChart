
 function drawBarChart(data, options, elem) {
  //defines default options
  let dOpt = {
    title: "title",
    titleFont: "arial",
    titleColor: "black",
    titleFontSize: "14px",
    xAxisTitle: "x-axis-title",
    yAxisTitle: "y-axis-title",
    valuePosition: "center",
    barColor: [],
    labelColor: "black",
    barSpacing: "20px",
    xAxisLabel: []
  };
  // updates default options with options provided by user
  for (let property in options) {
      dOpt[property] = options[property];
  }
  let arrayLen = data.length;
  let lenData;
  let dataMax;
  //alert(data);
  let dataConv = new Array (data);

  if (arrayLen === dataConv.length) {
    arrayLen = dataConv.length;
    lenData = data.length;
    dataMax = Math.max(...data);
    data = dataConv;
    dOpt.barColor = new Array(dOpt.barColor);
  } else {
 /////////////////////////////////////////////////////////
    arrayLen = data.length;
    lenData = data[0].length;
    dataConv = data;

    let maxArray = [];
    
    for (i = 0; i < lenData; i++) {
      let number = 0;
      for (a = 0; a < arrayLen; a++) {
        number = number + data[a][i];
      }
      maxArray.push(number);
    }
    //alert("maxArray is: " + maxArray);
    dataMax = Math.max(...maxArray);
  }

  //alert("lenData is:" + lenData);
  //alert("arrayLen is: " + arrayLen);
  //alert("max is: " + dataMax);
  
  let openDiv = "<div class = ";
  let closeDiv = "</div>";

  //calculates  top limit of chart
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
  
  function createVisual() { /////////////// Creates visuals in graph area //////////////
      
    $(".graph-area").append(function () { //creates bars and axis lines
      let output = "";
      for (i = 0; i < arrayLen; i++) {
        for (a = 0; a < lenData; a++) {
          output += openDiv + "bar-" + i + a + ">" + "<p class = label>" + data[i][a] + "</p>" + closeDiv;
        }
      }
     // alert(output);
      for (i = 1; i <= 5; i++) {
        output += openDiv + "axis-line-" + i + ">" + closeDiv;
      }
     // alert(output);
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
  $(elem).css({
    "width": "80%",
    "height": "600px",
    "margin": "auto",
    "display":"grid",
    "grid-template-columns": "50px 50px auto 50px",
    "grid-template-rows": "50px auto 50px 50px"
  });
  $(".title, .x-axis-title, .y-axis-title, .x-axis, .y-axis").css({
    "background-color": "white",
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
    alert(elemXAxis);
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
  })
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
 
  
  createVisual();

  

  
}
 
  














/* options:


*/