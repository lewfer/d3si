/*
 * circles.js
 * D3 code to draw a simple circles chart, with circles spread along the x-axis and varying in size
 * Adding a specific colour and opacity
 */

function drawCircles(container, data, parameters={}) {
    // Create our chart object
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data values to screen position 
    let xScale = chart.xScaleBand("player")

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    let circleSelection = chart.bind("circle") 

    // Add the circles svg elements to the chart, one for each item in the selection
    chart.append(circleSelection, "circle")
        .attr("cx",         function (d) { return xScale(d["player"]) })
        .attr("cy",         chart.height / 2) 
        .attr("r",          function (d) { return d["score"] }) 
        .style("fill",      "#1f77b4")                                      // set a light blue colour
        .style("opacity",   0.7)                                            // set opacity to 0.7
}


        