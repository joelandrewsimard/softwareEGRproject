/**
 *drawChart(arr)
 * Draws a Bar chart from the given data
 *@param arr
 * A map containing row and column values for the chart
 *@return none
 *Outputs the visualization of the top tracks onto the webpage
 *
 **/
function drawChart(arr) {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Song');
    data.addColumn('number', 'Popularity');
    
    
    for(var key in arr){
        data.addRow([key,arr[key]]);
        
    }
    
    // Set chart options
    var options = {'title':'Top tracks',
        'width':600,
        'height':300};
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('search_results'));
    chart.draw(data, options);
}

google.load("visualization", "1", {packages:["corechart"]});