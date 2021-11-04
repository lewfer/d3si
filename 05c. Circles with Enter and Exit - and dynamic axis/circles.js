/*
 * circles.js
 *
 * D3 one-axis bubble chart using the D3 Simple library
*/
function drawCircles(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const xCol = parameters['xCol'] || "index"
    const valueCol = parameters['valueCol'] || "value"

    // Take just the first 5 data items
    var dataCount = 5
    var currentData = data.slice(0,dataCount)

    // Create our D3 Simple object
    var chart = new D3SI(container, currentData, parameters)

    // Leave our scale undefined until we reload the data
    var xScale = undefined

    // Call the update the first time we draw the chart
    update()

    // Add axes
    var xAxis = chart.drawAxisXBottom(xScale)

    function update() {
        // Load and process the data
        chart.reloadData(currentData)
        
        // Create our scales to map data to screen position and colours
        xScale = chart.xScaleLinear(xCol)    

        // Get an object representing all the circles in the chart
        var circles = chart.bind("circle") 

        // Add the circles to the chart
        chart.append(circles, "circle")
            //.merge(circles)
            .transition()
            .duration(500)
            .attr("cx", function (d, i) {return xScale(d[xCol])})
            .attr("cy", chart.height / 2)
            .attr("r", function (d) {return d[valueCol]})
            .style("fill", "#1f77b4")
            .style("opacity", 0.7)

        // Remove old circles from the chart
        chart.remove(circles)
    }



    //On click, update with new data			
	d3.select("#addButton")
        .on("click", function() {
            // Add another value to the dataset
            dataCount++
            currentData = data.slice(0,dataCount)

            // Update the display
            update()

            // Update axis
            chart.updateXAxis(xAxis, xScale)
        })

    //On click, update with removed data			
	d3.select("#removeButton")   
        .on("click", function() {
            // Remove the last value from the dataset
            dataCount--
            currentData = data.slice(0,dataCount)
        
            // Update the display
            update()

            // Update axis
            chart.updateXAxis(xAxis, xScale)
    })
}
