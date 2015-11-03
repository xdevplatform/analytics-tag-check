// 
// Author : Gareth Jones gpj@twitter.com
//

var domain = function(url){
  return url.match(/:\/\/(www\.)?(.[^/:]+)/)[2]
}

var requestFilter = {urls: ["<all_urls>"]}

var handler = function(details)
  {
    if (details.url.match(/:\/\/(www\.)?(.[^/:]+)/)[2] == "analytics.twitter.com"){
      // url is from analytics.twitter.com
      if (details.url.split('?')[0] == 'https://analytics.twitter.com/i/adsct'){
        // set the icon
        chrome.pageAction.show(details.tabId);
        var referer_url, pixel_url;
        var h = details.requestHeaders;
        Object.keys(h).forEach(function(key) {
          if (h[key]['name'] == "Referer"){
            referer_url = h[key]['value'];
          }
        });
        chrome.tabs.getSelected(null,function(tabs) {
              json = {'domain': domain(tabs.url), 
                      'page' : tabs.url, 
                      'pixel_url': details.url,
                      'timestamp': details.timeStamp,
                      'referer_url': referer_url}
              storage(json);
              chrome.storage.local.set({'twttr_recent': json});
        });
      }
    }
  }


//
// store_request with details for debugging
// todo: 
//       string 'twttr_analytics is repeated as key'
var background_data;
var storage = function(json){
  // chrome get details
  chrome.storage.local.get('twttr_analytics', function(data){
    // check if chrome has existing data
    if (Object.keys(data).length === 0){
      // set data for dat_key
      //console.log('new');
      var list = []
      list.push(json);
      json = {'twttr_analytics' : list};
      chrome.storage.local.set(json);
      background_data = json;
    } else {
      if (data['twttr_analytics'].length >= 30){
        data['twttr_analytics'] = data['twttr_analytics'].slice(20);
      }
      data['twttr_analytics'].push(json);
      chrome.storage.local.set({'twttr_analytics': data['twttr_analytics']});
      background_data = json;
    }
  });
};

// main request is to figure out which request was served.
chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, ['requestHeaders'] );


