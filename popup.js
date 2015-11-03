// popup.js
// handles a click on the twitter logo and displays the latest debug information 
//

// qs 
// takes in a url and pushes data back returning an object
var qs = function(url){
	var url_data = {};
	var params = url.split('?')[1];
	var pairs = params.split('&');
	for(var i = 0; i < pairs.length; i++) {
		p = pairs[i].split('=')
		if (p.length == 2) {
			url_data[p[0]] = p[1];
		}
	}
	return url_data;
}

// go 
// main function puts data into .info, takes data from the background.js. 
var go = function(){
	var info_div = document.getElementsByClassName('info')[0];
	var bg = chrome.extension.getBackgroundPage();
	var d = bg.background_data;
	a = qs(d.pixel_url);
	html = "";
	Object.keys(a).forEach(function(key) {
		var val = a[key];
		html += "<p>"
		html += "<strong>" + key + " </strong> = ";
		html += val
		html += "</p>";
	});
	if (d.referer_url != undefined){
		html += "<p>"
		html += "<strong>referer </strong> = ";
		html += "<span class='ref'>" + d.referer_url + "</span>";
		html += "</p>";
	}
	info_div.innerHTML = html;
}

// on click .history to history page
document.getElementsByClassName('history')[0].onclick = function(){
	window.open('history.html', '_blank');
}
// onclick .logo of bird to dev.twitter.com
document.getElementsByClassName('logo')[0].onclick = function(){
	window.open('https://dev.twitter.com', '_blank');
}

// let's get going
go();