


function setListeners(){
$('#genres').on('change', function() {
                popularTracks(this.value);
                
                });
    
    //visualize overall tracks as a default

}


function overallTracks(){
    
    
}

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
       console.log(response);
       console.log("The ID is "+response.playlists.items[0].id);;
       getPlaylistTracks(response.playlists.items[0].id);
   },
   statusCode: {
    401: function() {
      alert( "You must be logged in to use this feature" );
    }
  }
});
    
    
    
}

function selectPlaylist(id){
getPlaylistTracks(id);
}


