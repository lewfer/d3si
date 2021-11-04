/*
 * circles.js
 * Code to explain D3 joins
 */

function drawCircles(container, data, parameters={}) {

    // Original data
    data = [{name:'a',value:250}, {name:'b',value:400}, {name:'c',value:150}, {name:'d',value:300}, {name:'e',value:350}, {name:'f',value:450}]

    /*
    // This is how to draw circles the non-D3 way
    parent = document.getElementById("chartsvg")
    function drawCircles(data) {
        for (i=0; i<data.length; i++) {
            let el = document.createElementNS('http://www.w3.org/2000/svg','circle');
            el.setAttribute("cx",data[i].value)
            el.setAttribute("cy",20 + 100*i)
            el.setAttribute("r",20)
            parent.appendChild(el);
        }
    }   
    drawCircles(data)
    */

    // Add the svg element, in which we will draw the chart
    let parent = container.append("svg")
        .attr('width', 800)
        .attr('height', 800)     

    // D3 update function
    function update(data) {
        // Join the data to the circles in the chart
        selection = parent                                     
            .selectAll('circle')                            // select all the existing chart items (if none exist it returns an empty selection)            
            .data(data);                                    // go through each data item, identifying each as update, enter or exit        
    
        console.log(selection)

        // Add or update circles
        selection
            .enter()                                        // get the enter selection
            .append('circle')                               // for each data item that has entered, add a circle
            .merge(selection)                               // merge the updates and enters into a single selection
            .attr("cx", function(d){return d.value})
            .attr("cy", function(d,i){return 20 + 100*i})
            .attr("r",20);

        // Remove circles
        selection
            .exit()                                         // get the exit selection
            .remove()                                       // for each data item that has been removed, remove a circle
    }
  
    // Initial update
    update(data);

    // Handle Add button
    d3.select("#add")
    .on("click", function() {       
        // Add one    
        data = [{name:'a',value:250}, {name:'b',value:400}, {name:'c',value:150}, {name:'d',value:300}, {name:'e',value:350}, {name:'f',value:450}, {name:'g',value:200}]
        update(data);
    })    

    // Handle Change button
    d3.select("#change")
    .on("click", function() {  
        // Change data     
        data = [{name:'a',value:100}, {name:'b',value:150}, {name:'c',value:200}, {name:'d',value:250}, {name:'e',value:300}, {name:'f',value:350}, {name:'g',value:400}]
        update(data);
    })

    // Handle Remove button
	d3.select("#remove")
    .on("click", function() {  
        // Remove last item 
        data = [{name:'a',value:100}, {name:'c',value:200}, {name:'d',value:250}, {name:'e',value:300}, {name:'f',value:350}, {name:'g',value:400}]
        update(data);
    })
}


        