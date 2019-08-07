
 function drawBarChart(data, options, elem) {
  //defines default options
  let dOpt = {
    title: "title",
    titleFont: "arial",
    titleColor: "black",
    xAxisTitle: "x-axis-title",
    yAxisTitle: "y-axis-title",
    valuePosition: "middle",
    barColor: ["grey","lightgreen","lightblue", "purple"],
    lableColor: "black",
    barSpacing: "20px",
    xAxisLable: ["toronto", "ottawa", "montreal", "kingston", "vancouver", "new york"],
    type: "stacked"
  };
  // updates default options with options provided by user
  for (let property in options) {
      dOpt[property] = options[property];
  }
  //alert(data);
  let arrayLen = data.length;
  let lenData = data[0].length;
  alert("lenData is:" + lenData);
  alert("arrayLen is: " + arrayLen);
  let dataMax;
  
  if (dOpt.type === "stacked") {
    let maxArray = [];
    for (i = 0; i < lenData; i++) {
      let number = 0;
      for (a = 0; a < arrayLen; a++) {
        number = number + data[a][i];
      }
      maxArray.push(number);
    }
    //alert(maxArray);
    dataMax = Math.max(...maxArray);
  } else {
  dataMax = Math.max(...data[0]);
  }
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
          output += openDiv + "bar-" + i + a + ">" + data[i][a] + closeDiv;
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
    for (i = 0; i < lenData; i++) {
      //alert("i is:" + i);
      let paddingNum = 0;
      for (a = 0; a < arrayLen; a++) { ///////////////////// draws bars inside chart area
        //alert("a is: " + a)
        elemBar = ".bar-"+ a + i;
        //alert(elemBar);
        $(elemBar).css({
          "grid-area" : function () {
            let output =   "1/" + (i+1) + "/7/" + (i+2);
            //alert(output);
            return output;
          },
          "background-color" : function () {
            return dOpt.barColor[a];
          },
          "padding-bottom" : function () {
            return paddingNum + "px";
          },
          "height": function () {
            let fillPer;
            let pxFill;
            fillPer = data[a][i]/(roundTop + ((roundTop/5)));
            //alert("fill per is: " +fillPer)
            pxFill = fillPer * 450; //////need to not hard code!!!!!!!!!!!!!!!
            //alert(paddingNum);
            paddingNum = pxFill + paddingNum;

            //alert("pxfill is:" + pxFill);
            return pxFill + "px";
          },
          "place-self" : "end stretch",
          "z-index" : function () {
              return 100-a;
          }
        });
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
    "background-color": "lightgrey",
  });
  $(".title").css({
    "grid-area" : "1/3/2/4"
  });
  $(".x-axis-title").css({
    "grid-area" : "4/3/5/4"
  });
  $(".y-axis-title").css({
    "grid-area" : "2/1/3/2",
    "writing-mode": "vertical-lr",
    "transform" : "rotate(180deg)",
    "text-align" : "center"
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
    "padding-right" : "10px",
    "text-align" : "center"
  });
  $(".x-axis").append(function() {//add values to x axis
    let output = "";
    for (i = 0; i < lenData; i++) {
      output += openDiv + "x-axis-lable-" + i + ">" + dOpt.xAxisLable[i] + closeDiv;
    }
    return output;
  });
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
      "text-align" : "center",
      "padding" : "50% 0"
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
    "grid-column-gap": "20px",
    "padding-left":"10px",
    "padding-right": "10px",
    "position":"relative"
  });

  createVisual();
  

  
}
 
  














/* options:


*/