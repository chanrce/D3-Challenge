// Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
    top: 45,
    right: 40,
    bottom: 90,
    left: 100
  };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//Labels for axes
var xAxisLabel = "Poverty";
var yAxisLabel = "Healthcare";

//Read csv
d3.csv("assets/data/data.csv").then(function(stateData){

    console.log(stateData);
    
    //Variables needed: abbr, healthcare, poverty

    //Abbreviation
    // log a list of names
    var abbr = stateData.map(abbrdata => abbrdata.abbr);
    console.log("Abbreviations", abbr);

    // Cast each healthcare and poverty value in stateData as a number using the unary + operator
    stateData.forEach(function(data) {
        //Healthcare
        data.healthcare = +data.healthcare;
        console.log("Healthcare", data.healthcare);
        //Poverty
        data.poverty = +data.poverty;
        console.log("Poverty", data.poverty)
    });

    //Create Scales
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, d => d.poverty)+2])
        .range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear()
        .domain([3, d3.max(stateData, d => d.healthcare)+2])
        .range([chartHeight, 0]);

    //Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append the axes to the chartGroup

    //Add bottomAxis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    //Append circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d =>  xLinearScale(d.poverty))
        .attr("cy", d =>  yLinearScale(d.healthcare))
        .attr("r", "13")
        .attr("fill", "#555FD6")

    //Append abbreviations to each circle
    chartGroup.selectAll("null")
        .data(stateData)
        .enter()
        .append("text")
        .text(function(d){
            return d.abbr;
        })
        .attr("x", d =>  xLinearScale(d.poverty))
        .attr("y", d =>  yLinearScale(d.healthcare))
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", "white")


    //Labeling the axes

    //Y axis

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Healthcare");

    //X axis

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 5 + chartMargin.top})`)
        .attr("class", "axisText")
        .text("Poverty");


}).catch(function(error) {
  console.log(error);

})