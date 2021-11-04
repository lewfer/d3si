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
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position
    let xScale = chart.xScaleBand(xCol) 
    let yScale = chart.yScaleLinear(yCol) 

    // Define the line
    let linepoints = chart.getLineGenerator(xCol, yCol, xScale, yScale)

    // Get an object representing all the lines in the chart
    let lineSelection = chart.bindDatum("path")

    // Draw the data points as a single line
    chart.line(lineSelection, linepoints, xScale)
        .style("stroke", colour)

    // Add axes
    chart.drawAxisXBottom(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol) 
}
