
/*
 *Scripts for user data
 */




/*
 *Get info for a given user
 */
var result;


function userSearch(){
    
    
    
    var name = document.getElementById("username").value;
    
    
    console.log("searching for user..");
    console.log("User id is "+ name);

    
    var url = "https://api.spotify.com/v1/users/"+name;
    
    jQuery.getJSON(url, function(data, status){
                   
                   result = data;
                   
                   if(status===404){
                   
                   console.log("Error 404.");
                   }
                   
                   else{
                   console.log(data);
                   
                   
                   
                   document.getElementById("user_results").innerHTML="<p> Display name:"+ data.display_name+"</p> \n ";
                   
                   
                   
        
                   
                    document.getElementById("user_results").innerHTML += "<a href="+"'"+data.external_urls.spotify+"'"+">Check out user's page </a>";
                   
                   }
                   
                   });
}
    
    
    

