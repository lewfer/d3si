/*
 * circles.js
 * D3 code to draw a simple circles chart, 
 * with circles spread along the x-axis and y-axis
 * and varying in size
 * and labelled axes
 * generalised so parameters can be passed in.
 * Adding colour scales
 * Uses the glyph helper circlesxy, which can be found in d3si.js
 */

function drawCircles(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol']
    const bubbleSizeCol = parameters['bubbleSizeCol']
    const colours = parameters['colours'] || d3.schemeCategory10

    // Create our chart object
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data values to screen position 
    let xScale = chart.xScaleBand(xCol)
    let yScale = chart.yScaleLinear(yCol)
    let colourScale = chart.colourScaleOrdinal(xCol, colours) 

    // Get a selection object representing all the circles we want in the chart, one for each item in the data
    let selection = chart.bind("circles") 

    // Add the svg elements to the chart, one for each item in the selection
    chart.circlesxy(selection, xCol, yCol, bubbleSizeCol, xScale, yScale)
        .style("fill",    chart.colourMap(xCol,colourScale))
        .style("opacity", 0.7)          

    // Add axes
    chart.drawAxisXBottom(xScale)
    chart.drawAxisYLeft(yScale)         
}


        