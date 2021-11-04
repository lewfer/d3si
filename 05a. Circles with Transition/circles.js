/*
 * circles.js
 *
 * D3 one-axis bubble chart using the D3 Simple library
*/
function drawCircles(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || data.columns[0]
    const bubbleSizeCol1 = parameters['bubbleSizeCol1']
    const bubbleSizeCol2 = parameters['bubbleSizeCol2']

    // Create our D3 Simple object
    var chart = new D3SI(container, data, parameters)
    
    // Create our scales to map data to screen position and colours
    var xScale = chart.xScaleBand(xCol)                         // scale from indices to x screen position

    // Compute an offset so our data and xaxis align
    var xOffset = xScale.bandwidth()/2

    // Get an object representing all the circles in the chart
    var circles = chart.bind("circle", data)  

    // Add the circles to the chart    
    chart.append(circles, "circle")
        .attr("cx", function (d, i) {return xOffset+xScale(d[xCol])})
        .attr("cy", chart.height / 2)
        .attr("r", function (d) {return d[bubbleSizeCol1]})
        .style("fill", "#1f77b4")
        .style("opacity", 0.7)

    // Add axes
    chart.drawAxisXBottom(xScale, undefined, data.length)

    // On click, update with new data			
	d3.select("button")
        .on("click", function() {
            // Get an object representing all the circles in the chart
            var circles = chart.bind("circle", data)  
        
            // Change the radius according to the new value
            circles
                .transition()
                .duration(3000)
                //.delay(function(d,i){return(i*500)})
                //.ease(d3.easeBounce)
                .attr("r", valueMap(bubbleSizeCol2))
        })
}
