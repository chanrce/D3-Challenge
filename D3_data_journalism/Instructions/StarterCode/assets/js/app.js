// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
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
        .domain(d3.extent(stateData, d => d.poverty))
        .range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.extent(stateData, d => d.healthcare)])
        .range([chartHeight, 0]);

    //Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

}).catch(function(error) {
  console.log(error);



})