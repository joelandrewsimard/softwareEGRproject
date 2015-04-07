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
//Holds login access token
var accessToken;

//Create a map that holds artists and the popularities of their top songs.
var artistTracks={};
//Create a map that holds artist albums and their popularities
var artistAlbums={};

//Create a map that holds album names and their IDs
var albumIDS = {};

userInfo = {};


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
    
    //clear any widgets
    $("#charts").empty();
    
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
                   
                                      printInfo(id, data.tracks);
                                      console.log("Success in getting top tracks!");
                                      
                   });
   
}



//Function to print the info of a given tracks/albums/artists array.
/**
 *printinfo(tracks)
 * Stores the most popular tracks/albums and outputs them to index.html
 *@param tracks
 * An array of track/album objects
 *@return none
 *
 **/
function printInfo(id, tracks){
    
    if(tracks==null){
        
        console.log("tracks is null");
    }
    else{
        
        
        
        document.getElementById("search_results").innerHTML = "";
        console.log("Array not null");
        
        
        //add buttons
        $("#search_results").append("<button id='tracks'>Visualize most popular tracks</button>");
        
        $("#search_results").append("<button id='albums'>Visualize most popular albums</button>");
        
        
        
        //add an event listener to visualize artist albums
        $("#albums").click(function(){
                           getAlbums(id);
                           
                           });
        
        //add an event listener to visualize artist tracks
        $("#tracks").click(function(){
                           
                           var x = "Name";
                           var y = "Popularity";
                              drawChart(artistTracks,x,y,"Top tracks","tracks","search_results");
                              
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

//Function to get the albums of a given artist.
/**
 *getAlbums(artistID)
 * Stores the artist's albums
 *@param artistID
 * A string that holds an artist id number
 *@return none
 *
 **/


function getAlbums(artistID){
    
    //array that holds the IDs of top 20 albums
    var albumIDs = [];
    
    var simpleurl = 'https://api.spotify.com/v1/artists/'+artistID+'/albums';
    var fullurl="https://api.spotify.com/v1/albums?ids=";
    var holder;
    
    $.getJSON(simpleurl, function(data){
              //iterate through every simple album and add it to the "several albums" API endpoint
              for(i=0; i<data.items.length; i++){
              holder=data.items[i].id;
              var name = data.items[i].name
              albumIDS[name] = data.items[i].id;
              if (i===0){
              
              fullurl+=holder;
              
              }
              else{
              fullurl+=","+holder;
              
              }
              
              }
              
              console.log("The full URL is "+fullurl);
              
              
              $.getJSON(fullurl, function(data){
                        
                        artistAlbums={};
                        
                        for(i=0; i<data.albums.length;i++){
                      
                        artistAlbums[data.albums[i].name]=data.albums[i].popularity;
                        
                        }
                        
                        
                        console.log(artistAlbums);
                        
                        console.log("DRAWING THE CHART");
                        drawChart(artistAlbums,"Name","Popularity","Top Albums","albums","search_results");
                        
                        });

              
              });

    
}



      
        function extractRequest() {
            var path = window.location.href;
            var goldenTicket = window.location.href.substring(53,window.location.href.length - 52); 
            
            alert(goldenTicket);  
            //accessToken = window.location.href.substring(53,window.location.href.length - 52);
            var temp = goldenTicket;
            accessToken = temp;

            setAccessToken(accessToken);
           
                }





function showFeatures(){

console.log("Access code is "+ accessToken);


}


function setAccessToken(token){
console.log("Setting access token to " + token);
accessToken = token;

}

function playlistButtons(){

var button = ["Playlists", "Featured playlists", "User playlists","Playlists by category"];

$(".container .row #buttonRow .col-md-3").each(function(){

$(this).html(button.pop());

});

}


