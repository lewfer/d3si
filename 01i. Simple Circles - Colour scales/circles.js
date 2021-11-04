/*
 * circles.js
 * D3 code to draw a simple circles chart, 
 * with circles spread along the x-axis and y-axis
 * and varying in size
 * and labelled axes
 * generalised so parameters can be passed in.
 * Adding colour scales
 */

function drawCircles(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0] 
    const yCol = parameters['yCol'] || data.columns[1]  
    const bubbleSizeCol = parameters['bubbleSizeCol'] || data.columns[2] 
    const colours = parameters['colours'] || d3.schemeCategory10            // get the colour scheme, defaulting to schemeCategory10 if the parameter is not passed in

    // Create our chart object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data values to screen position 
    var xScale = chart.xScaleBand(xCol)
    var yScale = chart.yScaleLinear(yCol)
    var colourScale = chart.colourScaleOrdinal(xCol, colours)               // create a colour scale that maps values from the xCol to colours

    // Compute an offset so our data and xaxis align
    xOffset = xScale.bandwidth()/2

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    var circleSelection = chart.bind("circle") 

    // Add the circles svg elements to the chart, one for each item in the selection
    chart.append(circleSelection, "circle")
        .attr("cx",         function (d) { return xScale(d[xCol]) + xOffset })
        .attr("cy",         function (d) { return yScale(d[yCol]) })
        .attr("r",          function (d) { return d[bubbleSizeCol] })
        .style("fill",      function (d) { return colourScale(d[xCol]) })    // apply the colour scale to fill the circle
        .style("opacity",   0.7)

    // Add axes
    chart.drawAxisXBottom(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol)         
}


        