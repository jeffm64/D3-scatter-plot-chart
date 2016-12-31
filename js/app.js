$(document).ready(function() {

  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"; 
  
  var margin = {top: 80, right: 100, bottom: 80, left: 80};
  
  var canvas = document.getElementById('chart').getBoundingClientRect();
  
   //width and height of the chart
  var w = canvas.width - margin.left - margin.right;
  var h = canvas.height - margin.top - margin.bottom;
  
  //creates the svg chart
  var svg = d3.select(".chart")
              .append("svg")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.top + margin.bottom)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  //gets the json data needed for the chart
  d3.json(url, function(data) {
    
    //hide x-axis on smaller screens
      if ($(window).width() < 600) {
         $(".x-axis text").hide();
      }
      else {
         $(".x-axis text").show();
      };
    
    //updates chart upon resize
    d3.select(window)
    .on("resize", function() {
      
      //hide x-axis on smaller screens
      if ($(window).width() < 600) {
         $(".x-axis text").hide();
      }
      else {
         $(".x-axis text").show();
      };
      
      canvas = document.getElementById('chart').getBoundingClientRect();
      w = canvas.width - margin.left - margin.right;
      h = canvas.height - margin.top - margin.bottom;
      
      //edits the chart svg
      d3.select("svg")
         .attr("width", w + margin.left + margin.right)
         .attr("height", h + margin.top + margin.bottom)
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      //sets scales for x and y
    xScale = d3.scaleLinear()
                    .domain([maxTime + 1, minTime])
                    .range([0, w]);
    
    xScale2 = d3.scaleLinear()
                    .domain([maxTime + 1, minTime])
                    .range([0, w]);
    
    yScale = d3.scaleLinear()
                    .domain([1, maxRank + 1])
                    .range([0, h]);
    
    //sets up the x and y axis
    xAxis = d3.axisBottom(xScale)
                  .ticks(10);
    
    yAxis = d3.axisLeft(yScale);
      
    //creates X axis and label
    svg.select(".x-axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);
    
     svg.select(".x-axis-label")
        .attr("transform", "translate(" + (w / 2) + " ," + (h * 1.1) + ")");
    
    //creates Y axis and label
    svg.select("y-axis")
        .call(yAxis);
    
      svg.select("y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", (0 - margin.left + 15))
        .attr("x", 0 - (h / 2))
        .style("text-anchor", "middle");
      
      svg.selectAll("circle")
       .data(data)
       .attr("cx", function(d, i) {
          return xScale(data[i].Seconds);
       })
       .attr("cy", function(d, i) {
          return yScale(data[i].Place);
       })
       .attr("r", 5)
       .attr("fill", function(d, i) {
          if(data[i].Doping === "") {
            return "#505050";
          } 
          else {
            return "#FF7260";
          }
       });
      
      svg.selectAll(".name-title")
       .data(data)
       .text(function(d, i) {
          return data[i].Name;
       })
       .attr("class", "name-title")
       .attr("x", function(d, i) {
            return xScale(data[i].Seconds) + 20;
        })
        .attr("y", function(d, i) {
            return yScale(data[i].Place + 0.3);
        });
      
    });
    
    //finds the max/min lap seconds and rank
    var maxTime = d3.max(data, function(d, i) {
      return data[i].Seconds;
    });
    
    var minTime = d3.min(data, function(d, i) {
      return data[i].Seconds;
    });
    
    var maxRank = d3.max(data, function(d, i) {
      return data[i].Place;
    });
    
    
    
    //sets scales for x and y
    var xScale = d3.scaleLinear()
                    .domain([maxTime + 1, minTime])
                    .range([0, w]);
    
    var xScale2 = d3.scaleLinear()
                    .domain([maxTime + 1, minTime])
                    .range([0, w]);
    
    var yScale = d3.scaleLinear()
                    .domain([1, maxRank + 1])
                    .range([0, h]);
    
    //sets up the x and y axis
    var xAxis = d3.axisBottom(xScale)
                  .ticks(10);
    
    var yAxis = d3.axisLeft(yScale);
    
    //creates labels
    svg.selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .text(function(d, i) {
          return data[i].Name;
       })
       .attr("class", "name-title")
       .attr("x", function(d, i) {
            return xScale(data[i].Seconds) + 20;
        })
        .attr("y", function(d, i) {
            return yScale(data[i].Place + 0.3);
        });
    
    //creates X axis and label
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis)
    
     svg.append("text")
        .attr("transform", "translate(" + (w / 2) + " ," + (h * 1.1) + ")")
        .attr("class", "x-axis-label")
        .style("text-anchor", "middle")
        .text("Time in seconds");
    
    //creates Y axis and label
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(0, 0)")
        .call(yAxis)
    
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "y-axis-label")
        .attr("y", (0 - margin.left + 15))
        .attr("x", 0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Ranking");
    
    //creates the dots
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", function(d, i) {
          return xScale(data[i].Seconds);
       })
       .attr("cy", function(d, i) {
          return yScale(data[i].Place);
       })
       .attr("r", 5)
       .attr("fill", function(d, i) {
          if(data[i].Doping === "") {
            return "#505050";
          } 
          else {
            return "#FF7260";
          }
       })
       .on("mouseover", function(d, i) {
        //Get hovered bar's x/y values, then work it for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale / 6;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
    
        //changes tooltip position and name
        d3.select("#tooltip")
          .style("left", "250px")
          .style("top", "200px")
          .select(".name")
          .text(data[i].Name);
    
        //changes nation of tooltip
        d3.select("#tooltip")
          .select(".nation")
          .text(data[i].Nationality);
      
        //changes year of tooltip
        d3.select("#tooltip")
          .select(".year")
          .text(data[i].Year);
      
        //changes time of tooltip
        d3.select("#tooltip")
          .select(".time")
          .text(data[i].Time);
    
        //show tooltip
        d3.select("#tooltip").classed("hidden", false);
    
     })
     .on("mouseout", function() {
      //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);

     });
    
    
    
    
    
    
  });
  
  
  
 

			

  

            









  

  
});