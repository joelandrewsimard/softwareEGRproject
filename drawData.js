/**
 *drawChart(arr)
 * Draws a Bar chart from the given data
 *@param arr
 * A map containing row and column values for the chart
 *@return none
 *Outputs the visualization of the top tracks onto the webpage
 *
 **/
function drawChart(arr,x,y,title) {
    // Create the data table.
    var data = new google.visualization.DataTable();
   
    data.addColumn('string', x);
    data.addColumn('number', y);
    
    
    for(var key in arr){
        data.addRow([key,arr[key]]);
        
    }
    
    //sort data according to popularity
     data.sort({column: 1, desc: true});
    // Set chart options
    var options = {'title':title,
        'width':600,
        'height':300};
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('search_results'));
    chart.draw(data, options);
    
    console.log(data.getValue(4,0));
    
    console.log(arr);
    
    google.visualization.events.addListener(chart, 'select', function(){
                                            
                                            var selected = chart.getSelection();
                                            
                                            console.log("The name of the selected is "+ data.getValue(selected[0].row, 0));
                                            
                                            
                                            //search for the track to find its uri
                                            
                                            for(i=0;i<tracks.length;i++){
                                            
                                            if(tracks[i].name === data.getValue(selected[0].row, 0)){
                                            console.log("The tracks was found with uri: "+ tracks[i].uri);
                                            var uri  = tracks[i].uri;
                                            
                                            $("#charts").append('<iframe src="'+"https://embed.spotify.com/?uri="+uri+'"width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
                                            
                                            }
                                            
                                            }
                                            
                                            });
    
    function selectHandler(e) {
        alert('A table row was selected');
        
        console.log(e);
    }
    
}

google.load("visualization", "1", {packages:["corechart"]});