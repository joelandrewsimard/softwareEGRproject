/**
 *drawChart(arr)
 * Draws a Bar chart from the given data
 *@param arr
 * A map containing row and column values for the chart
 *@return none
 *Outputs the visualization of the top tracks onto the webpage
 *
 **/
function drawChart(arr,x,y,title, graphType, divID) {
    
    if (graphType==="albums"){

        console.log("graph type is albums");
    }
    else if(graphType==="tracks"){
        console.log("graph type is tracks");
        console.log(arr);
    }

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
        'width':800,
        'height':500};
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById(divID));
    chart.draw(data, options);
    
    if(graphType==="tracks"){
    google.visualization.events.addListener(chart, 'select', function(){
                                            
                                            var selected = chart.getSelection();
                                            
                                            console.log("The name of the selected is "+ data.getValue(selected[0].row, 0));
                                            
                                            
                                            //search for the track to find its uri
                                            
                                            for(i=0;i<tracks.length;i++){
                                            
                                            if(tracks[i].name === data.getValue(selected[0].row, 0)){
                                            console.log("The tracks was found with uri: "+ tracks[i].uri);
                                            var uri  = tracks[i].uri;
                                            
                                            $("#charts").append('<iframe src="'+"https://embed.spotify.com/?uri="+uri+'"width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
                                            console.log("Appended charts div");
                                            }
                                            
                                            }
                                            
                                            });
                            }

    else if(graphType==="albums"){

            google.visualization.events.addListener(chart, 'select', function(){
                                            var ID,IDarray;

                                            var selected = chart.getSelection();
                                            
                                            console.log("The name of the selected is "+ data.getValue(selected[0].row, 0));
                                            
                                            for(var name in albumIDS){

                                                if (name=== data.getValue(selected[0].row, 0)){
                                                    ID = albumIDS[name];
                                                    break;
                                                }
                                            }

                                            console.log("ID is "+ID);
                                            var url = "https://api.spotify.com/v1/albums/"+ID+"/tracks";

                                                $.getJSON(url, function(data){
                                                    console.log(data);
                                                    var trackArray = data.items;
                                                    tracks = trackArray;
                                                    IDarray = new Array(trackArray.length);
                                                    url="https://api.spotify.com/v1/tracks?ids=";
                                                    
                                                    for(i=0;i<trackArray.length;i++){

                                                        if(i===0){

                                                            url+=trackArray[i].id;

                                                        }
                                                        else{
                                                            url+=","+trackArray[i].id;
                                                        }

                                                    }

                                                    console.log(url);
                                                    $.getJSON(url,function(data){

                                                        //empty the artistTracks map
                                                        artistTracks={};


                                                        for(j=0;j<data.tracks.length;j++){

                                                            artistTracks[data.tracks[j].name] = data.tracks[j].popularity;
                                            
                                            drawChart(artistTracks,"Name","Popularity","Top tracks for selected album" ,"tracks","charts");
                                                        }

                                                    });
                                                    

                                                });
                                            
                                            
                                            });



    }
    
    function selectHandler(e) {
        alert('A table row was selected');
        
        console.log(e);
    }
    
}

google.load("visualization", "1", {packages:["corechart"]});