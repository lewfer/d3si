/*
 * circles.js
 * D3 code to draw a simple circles chart, 
 * with circles spread along the x-axis 
 * and varying in size
 * with a specific colour and opacity
 * Adding circles spread along the y-axis
 */

function drawCircles(container, data, parameters={}) {

    // Create our chart object
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data values to screen position 
    let xScale = chart.xScaleBand("player")
    let yScale = chart.yScaleLinear("age")

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    let circleSelection = chart.bind("circle") 

    // Add the circles svg elements to the chart, one for each item in the selection
    chart.append(circleSelection, "circle")
        .attr("cx",         function (d) { return xScale(d["player"]) })
        .attr("cy",         function (d) { return yScale(d["age"]) })       // place the circle on the y axis based on the age
        .attr("r",          function (d) { return d["score"] })
        .style("fill",      "#1f77b4")
        .style("opacity",   0.7)
}


        