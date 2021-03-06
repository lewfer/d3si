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
    const dispatch = parameters['dispatch'] 

    const consistentNames = parameters['consistentNames']

    // Create our D3 Simple object
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    let xScale = chart.xScaleBand(xCol) 
    let yScale = chart.yScaleLinear(yCol) 
    let colourScale = chart.consistentColourScale(consistentNames, colours) 

    // Get an object representing all the circles in the chart
    let bars = chart.bind('rect')

    // Add the bars to the chart
    chart.bars(bars, xCol, yCol, xScale, yScale)
        .style("fill", chart.colourMap(xCol,colourScale))
        .style("opacity", 1)
        .on('mouseover',  expand)
        .on('mouseout',   collapse)  
    
    function expand(d) {
        if (dispatch !== undefined)
            //  Call the linked chart, passing in the xCol value
            dispatch.call("redraw", this, d[xCol])
    }

    function collapse(d) {
        if (dispatch !== undefined)
            // Clear the linked chart
            dispatch.call("redraw", this, undefined)
    }

    // Add axes
    chart.drawAxisXBottom(xScale)
    chart.drawAxisYLeft(yScale) 
}
