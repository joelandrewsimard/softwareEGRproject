/**
 *Name: tracks.js
 *Description: Contains functions for tracks.html
 *@Authors:
 *Paul Ryan Olivar
 *Joel Andrew Simard
 *Matthew Ong
 *@Since: 01/30/14
 *
 **/

/**
 *setListeners()
 * Sets listeners for values of the genre selector
 *@param none
 * 
 *@return none
 *
 *
 **/
function setListeners(){
$('#genres').on('change', function() {
                popularTracks(this.value);
                
                });
}


/**
 *popularTracks(genre)
 * Gets playlist tracks for the category
 *@param genre
 * A music genre
 *@return none
 *
 *
 **/
function popularTracks(genre){
    
var requestUrl = 'https://api.spotify.com/v1/browse/categories/'+genre+'/playlists?limit=50';

   var accessToken = localStorage.getItem("Access Token");

    $.ajax({
   url: requestUrl,
   headers: {
       'Authorization': 'Bearer ' + accessToken
   },
   success: function(response) {
    $("#playlistSelection").html("");
$("#playlistSelection").append("<select id ='playlists'>");

        playlistIds ={};

        for(i=0;i<response.playlists.items.length;i++){
        playlistIDs[response.playlists.items[i].name]=response.playlists.items[i].id;
        $("#playlistSelection #playlists").append("<option value='"+response.playlists.items[i].id+"'>"+response.playlists.items[i].name+"</option>");


                                                        }

$("#playlistSelection").append("</select>");

  $('#playlists').on('change', function() {
                
                selectPlaylist(this.value);
                
                });
        //iterate through every playlist and create a list 
      
       getPlaylistTracks(response.playlists.items[0].id);
   },
   statusCode: {
    401: function() {
      alert( "You must be logged in to use this feature" );
    }
  }
});
    
    
    
}
/**
 *selectPlaylist(id)
 * Draws a Bar chart from the given data
 *@param id
 * ID of the playlist to be extracted
 *@return none
 *Gets tracks for the playlist
 *
 **/
function selectPlaylist(id){
getPlaylistTracks(id);
}


