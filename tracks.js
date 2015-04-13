

var genreIDs={'Mood':'mood', 'Party':'party', 'Pop':'pop','Rock':'rock', 'Indie Alternative':'indie_alt', 'EDM Dance':'edm_dance',
                'Hip Hop':'hiphop', 'RnB':'rnb', 'Country':'country','Folk Americana':'folk_americana','Metal':'metal','Soul':'soul'};

function setListeners(){
$('#genres').on('change', function() {
                popularTracks(this.value);
                
                });
    
    //visualize overall tracks as a default

}


function overallTracks(){
    
    alert("Not implemented yet");
    
    
    
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
       console.log(response);
       console.log("The ID is "+response.playlists.items[0].id);;
       getPlaylistTracks(response.playlists.items[0].id);
   }
});
    
    
    
}

