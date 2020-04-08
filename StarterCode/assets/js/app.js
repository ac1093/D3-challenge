var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(censusdata, error) {
    if (error){
        throw error;
    }

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    censusdata.forEach(function(alessio) {
      alessio.healthcare = +alessio.healthcare;
      alessio.smokes = +alessio.smokes;
    });
    console.log(censusdata)
    console.log("HERE")

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusdata, d => d.healthcare)-1, d3.max(censusdata, d => d.healthcare)])
      .range([0, width]);
      console.log("HERE")

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(censusdata, d => d.smokes)-1.5, d3.max(censusdata, d => d.smokes)])
      .range([height, 0])
      console.log("HERE")
      // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circles = chartGroup.selectAll("circle")
    .data(censusdata)
    .enter();
    
    circles
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "red")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.healthcare}<br> Smokes: ${d.smokes}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    circles.append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.healthcare)-9)
    .attr("y", d => yLinearScale(d.smokes)+7)
    .attr("class", "circletext");
    circles.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circles.on("click", function(banana) {
      toolTip.show(banana, this);
      circles.call(toolTip);
    })
    
      // onmouseout event
      .on("mouseout", function(orange, index) {
        toolTip.hide(orange);
      });
    

    //Step 9: Create event listeners to display and hide the tooltip
    // ==============================
    
      // onmouseout event
      

    //Create axes labels

  })
  // .catch(function(error) {
  //   console.log(error);
  // })
  ;
