function foo() {
	var path = window.location.pathname;
	//start at =
	//end at &	

	var size = path.length;
	alert(path.substring(6,size));
}


