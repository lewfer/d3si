/*
 * line.js
 *  
 * D3 code to draw a simple line chart
 */

function drawLine(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol'] 
    const colour = parameters['colour'] || "#f02035"

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position
    var xScale = chart.xScaleBand(xCol) 
    var yScale = chart.yScaleLinear(yCol) 

    // Define the line
    var linepoints = chart.getLineGenerator(xCol, yCol)

    // Get an object representing all the lines in the chart
    lineSelection = chart.bindDatum("path")

    // Draw the data points as a single line
    chart.line(lineSelection, linepoints)
        .style("stroke", colour)

    // Add axes
    chart.drawAxisXBottom(xCol)
    chart.drawAxisYLeft(yCol) 
}
