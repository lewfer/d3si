/*
 * multiline.js
 * 
 * D3 code to draw a simple multiple line chart
 */

function drawLine(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const colours    = parameters['colours']    || d3.schemeCategory10
    const xCol       = parameters['xCol']       || data.columns[0]
    const seriesCols = parameters['seriesCols'] || data.columns.slice(1)
    const valueName  = parameters['valueName']

    // Create our D3 Simple object 
    var chart = new D3SI(container, data, parameters)

    // Process the data into series groupings
    var seriesData = chart.groupDataBySeries(xCol)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand(xCol) 
    var yScale = chart.yScaleLinearMinMax(chart.minSeriesValue, chart.maxSeriesValue) 
    var colourScale = chart.colourScaleOrdinal(seriesCols, colours)   // scale to colour each series
    
    // Get an object representing all the lines in the chart
    lines = chart.bind(".series", seriesData)

    // Generator for the svg points for the line
    var linepoints = chart.getLineGenerator("index", "value")

    // Add the lines to the chart, one line for each series
    chart.seriesLines(lines, linepoints)
        .style("stroke", chart.colourMap("series")) //function(d) { return colourScale(d.series) })

    // Add axes
    chart.drawAxisXBottom(xCol)
    chart.drawAxisYLeft(valueName)    
}
