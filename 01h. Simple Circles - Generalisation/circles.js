/*
 * circles.js
 * D3 code to draw a simple circles chart, 
 * with circles spread along the x-axis and y-axis
 * and varying in size
 * with a specific colour and opacity
 * and labelled axes
 * Generalised so parameters can be passed in 
 */

function drawCircles(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]                      // get the column containing the x data, defaulting to the first column if the parameter is not passed in
    const yCol = parameters['yCol'] || data.columns[1]                      // get the column containing the y data, defaulting to the second column if the parameter is not passed in
    const bubbleSizeCol = parameters['bubbleSizeCol'] || data.columns[2]    // get the column containing the bubble size, defaulting to the third column if the parameter is not passed in

    // Create our chart object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data values to screen position 
    var xScale = chart.xScaleBand(xCol)                                     // use the parameter to defined the scale
    var yScale = chart.yScaleLinear(yCol)                                   // use the parameter to defined the scale

    // Compute an offset so our data and xaxis align
    xOffset = xScale.bandwidth()/2

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    var circleSelection = chart.bind("circle") 

    // Add the circles svg elements to the chart, one for each item in the selection
    chart.append(circleSelection, "circle")
        .attr("cx",         function (d) { return xScale(d[xCol]) + xOffset })  // use the parameter to select the data to pass to xScale
        .attr("cy",         function (d) { return yScale(d[yCol]) })            // use the parameter to select the data to pass to yScale
        .attr("r",          function (d) { return d[bubbleSizeCol] })           // use the parameter to select the data to set the bubble size
        .style("fill",      "#1f77b4")
        .style("opacity",   0.7)

    // Add axes
    chart.drawAxisXBottom(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol)         
}


        