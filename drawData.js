/**
 *Name: drawData.js
 *Description: Contains functions that draw the visualizations
 *@Authors:
 *Paul Ryan Olivar
 *Joel Andrew Simard
 *Matthew Ong
 *@Since: 01/30/14
 *
 **/



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

        
    }
    else if(graphType==="tracks"){
       
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
        'height':500,
         backgroundColor: 'black',
          colors: ['green'],
          hAxis: {
    textStyle:{color: 'white'}
                },
        vAxis: { textStyle: {color: 'white'},
                  viewWindow: {max:100, 
                            min:0} },
        legend: {textStyle: {color:'white'}},
        titleTextStyle: {color: 'white'}

     };
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById(divID));
    chart.draw(data, options);
    
    if(graphType==="tracks"){
    google.visualization.events.addListener(chart, 'select', function(){
                                            
                                            var selected = chart.getSelection();
                                            
                                            //search for the track to find its uri
                                            
                                            for(i=0;i<tracks.length;i++){
                                            
                                            if(tracks[i].name === data.getValue(selected[0].row, 0)){
                            
                                            var uri  = tracks[i].uri;
                                            
                                            $("#charts").append('<iframe src="'+"https://embed.spotify.com/?uri="+uri+'"width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
                                           
                                            }
                                            
                                            }
                                            
                                            });
                            }

    else if(graphType==="albums"){

            google.visualization.events.addListener(chart, 'select', function(){
                                            var ID,IDarray;

                                            var selected = chart.getSelection();
                                            
                                            
                                            
                                            for(var name in albumIDS){

                                                if (name=== data.getValue(selected[0].row, 0)){
                                                    ID = albumIDS[name];
                                                    break;
                                                }
                                            }

                                            
                                            var url = "https://api.spotify.com/v1/albums/"+ID+"/tracks";

                                                $.getJSON(url, function(data){
                                                   
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
    
    
    
}

google.load("visualization", "1", {packages:["corechart"]});