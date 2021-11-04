/*
 * bar.js
 * 
 * D3 code to draw a simple bar chart with a tooltip
 */

function drawBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const colours = parameters['colours'] || d3.schemeCategory10
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol'] || data.columns[1]
    //getTooltipData = parameters['getTooltipData']

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand(xCol) 
    var yScale = chart.yScaleLinear(yCol) 
    var colourScale = chart.colourScaleOrdinal(xCol, colours) 

    // Get an object representing all the circles in the chart
    var barSelection = chart.bind('rect')

    // Add the bars to the chart
    barSelection = chart.bars(barSelection, xCol, yCol, xScale, yScale)
        .style("fill",    function(d) { return colourScale(d[xCol]) })
        .style("opacity", 1)

    // Add the tooltip handlers
    barSelection = chart.addStandardTooltip(barSelection, getTooltipData)   
              
    // Add axes
    chart.drawAxisXBottom(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol) 
}



  
