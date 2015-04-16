
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
var artistArray;
var tracks = [];

//Holds login access token
var accessToken;

//Create a map that holds artists and the popularities of their top songs.
var artistTracks={};

//Create a map that holds artist albums and their popularities
var artistAlbums={};

//Create a map that holds album names and their IDs
var albumIDS = {};

//Create a map that holds playlists and their ids
var playlistIDs={};


//Create a map that is used after making a request to get a playlist's songs. It stores the song's artists and their popularities
var playlistMap = {};


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

**
*extractRequest()
* Gets the access token after the user logs in
*@param none
*@return none
*calls the outputSearchResults() function
*
**/
function extractRequest() {
            var path = window.location.href;
            var goldenTicket = window.location.href.substring(53,window.location.href.length - 52); 
            var temp = goldenTicket;
            accessToken = temp;
            localStorage.setItem("Access Token",accessToken);
            setAccessToken(accessToken);
           
                }


**
*setAccessToken()
* Setter method to set the global access token
*@param token
* The access token of the user
*@return none
*
**/
function setAccessToken(token){
accessToken = token;
}

**
*featuredPlaylists()
* Requests the most current featured playlists from the Spotify API
*@param none
*@return none
*
**/
function featuredPlaylists(){
$("#search_results").empty();
$("#charts").empty();

$.ajax({
   url: 'https://api.spotify.com/v1/browse/featured-playlists',
   headers: {
       'Authorization': 'Bearer ' + accessToken
   },
   success: function(response) {
       console.log(response);
 $("#search_results").append("<div class='row'>"+
    "<div class='col-md-12'>"+
      "<h1>"+ response.message+"</h1>"+
    "</div>"+
  "</div>");

$("#search_results").append("<div class='row'>");
//assign values to playlistIDs
 for(i=0;i<response.playlists.items.length;i++){


$("#search_results").append("<a onClick='" + 'getPlaylistTracks("'+response.playlists.items[i].id+'")'+"'>"+"<img src='"+response.playlists.items[i].images[0].url+"'>"+"</img>"+"</a>" );

 }

$("#search_results").append("</div>");


   }
});


}

**
*getPlaylistTracks()
* Get the tracks for a given playlist
*@param id
* A playlist id
*@return none
*
**/
function getPlaylistTracks(id){
console.log("The playlist id is"+ id);

var requestURL = "https://api.spotify.com/v1/users/spotify/playlists/"+id+"/tracks";
var token  = localStorage["Access Token"];
$.ajax({
   url: requestURL,
   headers: {
       'Authorization': 'Bearer ' + token
            },
   success: function(response) {
       console.log(response);
       //make sure playlistMap is empty
    playlistMap={};
       for(i=0;i<response.items.length;i++){
        playlistMap[response.items[i].track.name+" by "+ response.items[i].track.artists[0].name] = response.items[i].track.popularity;
        
        tracks[i] = {};
        tracks[i].name = response.items[i].track.name+" by "+ response.items[i].track.artists[0].name;
        tracks[i].uri = response.items[i].track.uri;

                                           }


console.log("Playlistmap is currently! ");
console.log(playlistMap);
drawChart(playlistMap,"Title","Popularity","Playlist song popularity", "tracks", "search_results");


                              }
 

   }
);


}

function userData(){

$.ajax({
   url: 'https://api.spotify.com/v1/me',
   headers: {
       'Authorization': 'Bearer ' + accessToken
   },
   success: function(response) {
    $("#search_results").append("<h3>Barfing user info</h3><br>");
    $("#search_results").append('<iframe src="//giphy.com/embed/moZM0cd3y7x2U" width="200" height="200" frameBorder="0" style="max-width: 100%" class="giphy-embed" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe><br>');
        


       if(response.display_name != null){
        $("#search_results").append("<h5>Display name:"+ response.display_name+"</h5><br>");
       }
       if((response.id != null) && (response.id != undefined)){
        $("#search_results").append("<h5>ID:"+ response.ID+"</h5><br>");
       }
       if(response.country != null){
        $("#search_results").append("<h5>Country:"+ response.country+"</h5><br>");
       }
       if(response.email != null){
        $("#search_results").append("<h5>Email:"+ response.email+"</h5><br>");
       }
   }
});



$.ajax({
   url: "https://api.spotify.com/v1/me/tracks?limit=50",
   headers: {
       'Authorization': 'Bearer ' + accessToken
   },
   success: function(response) {
//ensure that artist tracks is empty before putting data in it.
artistTracks={};

console.log("drawing graphs");
for(i=0;i<response.items.length;i++){
        artistTracks[response.items[i].track.name+" by "+ response.items[i].track.artists[0].name] = response.items[i].track.popularity;
        
        tracks[i] = {};
        tracks[i].name = response.items[i].track.name+" by "+ response.items[i].track.artists[0].name;
        tracks[i].uri = response.items[i].track.uri;

        drawChart(artistTracks,"Name","Popularity","Popularity of user saved tracks", "tracks", "charts"); 


                                           }

       
   }
});


}


