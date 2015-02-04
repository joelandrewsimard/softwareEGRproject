/**
 *Name: getInfo.js
 *Description: A script that contains functions that send requests to the spotify API
 *@Authors:
 *Paul Ryan Olivar
 *Joel Andrew Simard
 *Matthew Ong
 *@Since: 01/30/14
 *
 **/



//Global variables to hold tracks and artists
var tracks, artistArray;

//Create a map that holds artists and the popularities of their top songs.
var artistTracks={};

//Search for a given artist

/**
*executeSearch()
* Reads from HTML input field and searches for that given artist
*@param none
*@return none
*calls the outputSearchResults() function
*
**/
function executeSearch(){
    var searchTerm, url;
    
    searchTerm = document.getElementById("artistname").value;
    
    searchTerm.replace(" ","+");
    
    url ="https://api.spotify.com/v1/search?q="+searchTerm+"&type=artist";
    
    jQuery.getJSON(url, function(data){
               
                   
                   if(data.artists.items.length === 0){
                   
                   
                   document.getElementById("search_results").innerHTML = "";

                   document.getElementById("search_results").innerHTML = "<h3> Search results not found</h3>";
                   
                   }
                   else{
               
               console.log("Getting an artist");
               
               console.log("Getting search results");
               artistArray = data.artists.items;
               
               outputSearchResults(artistArray);
                   
                   
                   }
               });
}





/**
 *executeSearch()
 * Reads from HTML input field and searches for that given artist
 *@param array
 * Takes in an array of artist objects
 *@return none
 *Outputs linked results to index.html
 *
 **/
function outputSearchResults (array){

    //clear the inner HTML
    document.getElementById("search_results").innerHTML = "";
    
    for(i=0; i<array.length;i++){
        
        console.log(array[i]);
        var artistID = array[i].id;
        var href = "<a href='#' " +"onClick=artistStats('"+artistID+"'); return false;"+">"+array[i].name+"</a><br>";
        
        document.getElementById("search_results").innerHTML += href;
       
        console.log("\n");
        
    }
}





/**
 *artistStats(id)
 * Reads from HTML input field and searches for that given artist
 *@param id
 * An int that contains an artist's ID
 *@return none
 *Outputs the top tracks of the artist onto the webpage
 *
 **/
function artistStats(id){

    console.log("artistStats executed with ID "+id);
    
    var url = "https://api.spotify.com/v1/artists/"+id+"/top-tracks?country=us";

    //get the top tracks
    jQuery.getJSON("https://api.spotify.com/v1/artists/"+id+"/top-tracks?country=us", function(data, textstatus){
                   
                   
                   console.log("entered jquery");
                   
                                      console.log("Server request status: "+ textstatus);
                   
                                      console.log("Getting top tracks for artist");
                   
                                      console.log("Top " + data.tracks.length+ " tracks");
                   
                                      tracks = data.tracks;
                   
                                      printInfo(data.tracks);
                                      console.log("Success in getting top tracks!");
                                      
                   });
   
}



//Function to print the info of a given tracks array.
/**
 *printinfo(tracks)
 * Stores the most popular tracks and outputs them to index.html
 *@param tracks
 * An array of track objects
 *@return none
 *
 **/
function printInfo(tracks){
    
    if(tracks==null){
        
        console.log("tracks is null");
    }
    else{
        
        
        
        document.getElementById("search_results").innerHTML = "";
        console.log("Array not null");
        
        $("#search_results").append("<button id='visualize'>Visualize data</button>");
        $("#visualize").click(function(){
                              drawChart(artistTracks);
                              
                              });
        
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




