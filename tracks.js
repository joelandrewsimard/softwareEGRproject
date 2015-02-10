

function setListeners(){
$('#genres').on('change', function() {
                alert(this.value); // or $(this).val()
                
                });

}

function popularTracks(genre){
    
    var url;
    
    if (genre==="overall"){
        
        console.log("overall");
        
    }
    else{
        
        
        
    }
    
    alert("The genre selected is "+ $("#genres").val);

}

