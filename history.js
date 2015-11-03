// history.js
// takes the chrome.storage iterates through the history of requests and displays them to .data 
//
chrome.storage.local.get('twttr_analytics', function(data){
	var d = data['twttr_analytics'].reverse();
	html = "<table class='table'>";
	html += "<thead>";
	html += "<tr>";
	html += "<td> Domain </td>";
	html += "<td class='date'> Date Time</td>";
	html += "<td> Pixel Values</td>";
	html += "<td> Page</td>";
	html += "<td> Referer</td>";
	html += "</tr>";
	html += "</thead>";
	for (var i=0;i<d.length;i++){
		var ts = new Date(d[i].timestamp);
		html += "<tr>"
		 + "<td>" + d[i].domain + "</td>"
		 + "<td class='date'>" + ts.getDate() + "-" + (ts.getMonth() + 1) + "-" + ts.getFullYear() + " " + ts.getHours() + ":" + ts.getMinutes() + "</td>"
		 + "<td>" + d[i].pixel_url.replace('https://analytics.twitter.com/i/adsct?', '') + "</td>"
		 + "<td>" + d[i].page + "</td>"
		 + "<td>" + d[i].referer_url + "</td>"
		 + "</tr>";
	}
	html += "</table>"
	//console.log(html);
	var i = document.getElementsByClassName('data')[0];
	i.innerHTML = html;
});