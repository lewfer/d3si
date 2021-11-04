/*
 * hbar.js
 * 
 * D3 code to draw a simple horizontal bar chart
 */

function drawHBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const yCol = parameters['yCol'] || data.columns[0]
    const xCol = parameters['xCol'] || data.columns[1]
    const colours = parameters['colours'] || d3.schemeCategory10

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleLinear(xCol) 
    var yScale = chart.yScaleBand(yCol) 
    var colourScale = chart.colourScaleOrdinal(yCol, colours) 

    // Get a selection object representing all the bars we want in the chart
    var barSelection = chart.bind('rect')

    // Add the bars to the chart
    chart.hbars(barSelection, xCol, yCol, xScale, yScale)
        .style("fill",    chart.colourMap(yCol,colourScale) )
        .style("opacity", 1)
        
    // Add axes
    chart.drawAxisXTop(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol) 
}
