

function setListeners(){
$('#genres').on('change', function() {
                popularTracks(this.value);
                
                });
    
    //visualize overall tracks as a default

    overallTracks();
}


overallTracks(){
    
    alert("Not implemented yet");
    
    
    
}

function popularTracks(genre){
    
    var url;
    
    if (genre==="overall"){
        
        alert("The genre selected is "+ genre);

        
    }
    else{
        
        alert("The genre selected is "+ genre);

        
    }
    
    
}

