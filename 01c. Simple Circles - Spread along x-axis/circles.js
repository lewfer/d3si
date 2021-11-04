/*
 * circles.js
 * D3 code to draw a simple circles chart.
 * Adding circles spread along the x-axis
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
        .attr("cx", function (d) { return xScale(d["player"]) })    // place the circle on the x axis based on the player
        .attr("cy", chart.height / 2)
        .attr("r",  20)
}


        