/*
 * circles.js
 *
 * This is just like Enter and Exit example, but with a timer rather than a button click
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

    var xScale = undefined

    // Call the update the first time we draw the chart
    update()

    // Add axes
    chart.drawAxisXBottom()

    // Set a timer event to trigger every 2 seconds
    var timer = setInterval(animate, 2000) 
    
    // Function to update the display
    function update() {
        // Load and process the data
        chart.reloadData(currentData)
        
        // Create our scales to map data to screen position and colours
        xScale = chart.xScaleLinear(xCol)    

        // Get an object representing all the circles in the chart
        var circles = chart.bind("circle") 

        // Add the new circles to the chart
        chart.append(circles, "circle")
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

    // Define a function to respond to the timer event
    function animate() {
        // Add another value to the dataset
        dataCount++
        currentData = data.slice(0,dataCount)

        // Update the display
        update()

        // Update axis
        chart.updateXAxis()
    }    
}
