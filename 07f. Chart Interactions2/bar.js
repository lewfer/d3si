/*
 * bar.js
 * 
 * D3 code to draw a bar chart which can receive redraw requests from other charts
 */
function drawBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol'] || data.columns[1]
    const filterCol = parameters['filterCol'] 
    const colours = parameters['colours'] || d3.schemeCategory10
    const dispatch = parameters['dispatch'] 
    const titleTop = parameters['titleTop']

    var filteredData = rollup(data, xCol, yCol)

    // Create our D3 Simple object
    var chart = new D3SI(container, filteredData, parameters)

    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand("key") 
    var yScale = chart.yScaleLinear("value") 
    var colourScale = chart.colourScaleOrdinal('key', colours) 

    update()

    // Add axes
    chart.drawAxisXBottom(xScale)
    chart.drawAxisYLeft(yScale) 
    chart.drawTitleTop(titleTop + "all")

    function update() {
        chart.reloadData(filteredData)

        // Get an object representing all the circles in the chart
        var bars = chart.bind('rect')

        // Add the bars to the chart
        chart.bars(bars, "key", "value", xScale, yScale)
        .style("fill", chart.colourMap('key',colourScale))
        .style("opacity", 1)

        // Remove old bars from the chart
        chart.remove(bars)
    }

    // Create an event listener, waiting to be notified that the linked chart has been requested 
    dispatch.on('redraw.bar', function(filterValue) {
        filteredData = filterByValue(data, filterCol, filterValue) 
        filteredData = rollup(filteredData, xCol, yCol)
        chart.drawTitleTop(titleTop + filterValue)
        update()
    })         
}
