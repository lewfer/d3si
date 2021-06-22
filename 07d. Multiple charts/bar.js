/*
 * bar.js
 * 
 * D3 code to draw a simple line chart
 * Same as basic bar chart, but with parameter of names passed in so we can keep colours consistent across all charts
 */
function drawBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol'] || data.columns[1]
    const colours = parameters['colours'] || d3.schemeCategory10

    const consistentNames = parameters['consistentNames']

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand(xCol) 
    var yScale = chart.yScaleLinear(yCol) 
    var colourScale = chart.consistentColourScale(consistentNames, colours) 

    // Get an object representing all the circles in the chart
    var bars = chart.bind('rect')

    // Add the bars to the chart
    chart.bars(bars, xCol, yCol)
        .style("fill", chart.colourMap(xCol))
        .style("opacity", 1)
        
    // Add axes
    chart.drawAxisXBottom()
    chart.drawAxisYLeft() 
}
