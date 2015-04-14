

var genreIDs={'Mood':'mood', 'Party':'party', 'Pop':'pop','Rock':'rock', 'Indie Alternative':'indie_alt', 'EDM Dance':'edm_dance',
                'Hip Hop':'hiphop', 'RnB':'rnb', 'Country':'country','Folk Americana':'folk_americana','Metal':'metal','Soul':'soul'};

function setListeners(){
$('#genres').on('change', function() {
                popularTracks(this.value);
                
                });
    
    //visualize overall tracks as a default

}


function overallTracks(){
    
    
}

function popularTracks(genre){
    
var requestUrl = 'https://api.spotify.com/v1/browse/categories/'+genre+'/playlists';

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

  $('#genres').on('change', function() {
                selectPlaylist(this.value);
                
                });
        //iterate through every playlist and create a list 
       console.log(response);
       console.log("The ID is "+response.playlists.items[0].id);;
       getPlaylistTracks(response.playlists.items[0].id);
   }
});
    
    
    
}

function selectPlaylist(id){

console.log("The playlist selected is "+id);
}

function appendPlaylists(name, id){




}

