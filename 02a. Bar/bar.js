/*
 * bar.js
 * 
 * D3 bar chart using the D3SI library
 */

function drawBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol'] || data.columns[1]
    const colours = parameters['colours'] || d3.schemeCategory10

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand(xCol) 
    var yScale = chart.yScaleLinear(yCol) 
    var colourScale = chart.colourScaleOrdinal(xCol, colours) 

    // Get a selection object representing all the bars we want in the chart
    var barSelection = chart.bind('rect')

    // Add the bars to the chart
    chart.bars(barSelection, xCol, yCol, xScale, yScale)
        .style("fill", chart.colourMap(xCol,colourScale))
        .style("opacity", 1)
        
    // Add axes
    chart.drawAxisXBottom(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol) 
}
