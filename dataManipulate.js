//Create a map that holds artists and the popularities of their top songs.
var artistTracks={};


//Function to print the info of a given tracks array.
function printInfo(tracks){

if(tracks==null){
    
    console.log("tracks is null");
}
else{

    
    
    document.getElementById("search_results").innerHTML = "";
    console.log("Array not null");
    
   // $("#search_results").append("<button id='visualize'>Visualize data</button>");
    //$("#visualize").click(function(){
      //                    drawChart(artistTracks);
                          
        //                  });
    
    //reset the artistTracks object before putting anything in it
    artistTracks={};
    
    for(i = 0; i<tracks.length;i++){
        
        
        artistTracks[tracks[i].name] = tracks[i].popularity;
        
        console.log(tracks[i].name);
        
        $("#search_results").append("<h4>"+tracks[i].name+"</h4>");
        $("#search_results").append("<h5>ID:"+tracks[i].id+"</h5>");
        $("#search_results").append("<h5> Popularity: "+ tracks[i].popularity+"</h5>");
        $("#search_results").append("<h5><a href='"+tracks[i].preview_url+"'>Preview track</a></h5>");
        $("#search_results").append("<br>");
        
        console.log("\n");
        
    }

}
}



