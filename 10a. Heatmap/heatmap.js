/*
 * Heatmap.js
 * D3 code to draw a heatmap
 */

function drawHeatmap(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    //const width = parameters['width'] || 600
    //const height = parameters['height'] || 400
    //const padding =  parameters['padding'] || 50
    const xCol = parameters['xCol'] || data.columns[0]
    const yCol = parameters['yCol']
    const valueCol = parameters['valueCol']
    const minColour = parameters['minColour'] || '#ffffff'
    const maxColour = parameters['maxColour'] || '#d95f0e'
    getTooltipData = parameters['getTooltipData']

    // Create our chart object
    var chart = new D3SI(container, data, parameters)

    // Load and process the data
    //chart.loadData(data)
    //chart.setIndex(xCol)

    // Create the SVG element in which we will draw the chart
    //var svg = chart.createSvg()

    chart.tooltipCreate()

    // Create our scales to map data values to screen position 
    var xScale = chart.xScaleBand(xCol)
    var yScale = chart.yScaleBand(yCol)
    var colourScale = chart.colourScaleLinear(valueCol, minColour, maxColour) 

    // Compute an offset so our data and xaxis align
    xOffset = xScale.bandwidth()/2

    // Get an object representing all the circles in the chart
    var rects = chart.bind("rect", data) 

    chart.fillxy(rects, xCol, yCol)
        .style("fill", chart.colourMap(valueCol))
        .style("opacity", 0.7)
        // Add the event handlers for the tooltip
        .on('mouseover',  function (d) { chart.tooltipShow(this, tooltipStyleShow) })
        .on('mousemove',  function (d) { chart.tooltipMove(this, getTooltipData(d)) })
        .on('mouseout',   function (d) { chart.tooltipHide(this, tooltipStyleHide) })  

    function tooltipStyleShow(el) {
        d3.select(el)
            .style("stroke", "black")
            .style("opacity", 1)
    }

    function tooltipStyleHide(el) {

        d3.select(el)
            .style("stroke", "none")
            .style("opacity", 0.7)
    }
    
    // Add axes
    chart.drawAxisXBottom()
    chart.drawAxisYLeft()         
}


        