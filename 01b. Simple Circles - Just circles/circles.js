/*
 * circles.js
 * D3 code to draw a simple circles chart.
 */

function drawCircles(container, data, parameters={}) {
    // Create our chart object
    var chart = new D3SI(container, data, parameters)

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    var circleSelection = chart.bind("circle")

    // Add the circles svg elements to the chart, one for each item in the selection
    chart.append(circleSelection, "circle")
        .attr("cx", chart.width / 2)        // place the circle horizontally centred
        .attr("cy", chart.height / 2)       // place the circle vertically centred
        .attr("r",  20);                    // fix the radius to 20 pixels
}


        