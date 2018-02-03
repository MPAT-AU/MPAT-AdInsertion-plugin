
export function sendAndHandleRequest(jsonBody,name,thumbnail){

  var dashUrl = ""
  var hlsUrl  = ""

  httpGetAsync("http://daiservices.fokus.fraunhofer.de:3001/json/fame/vod", jsonBody, response => {
      console.log(response);

      dashUrl = response['dashUrl'];
      hlsUrl = response['hlsUrl'];

      saveInDatabase(dashUrl, hlsUrl, name , thumbnail);

  });

}


function httpGetAsync(theUrl, JSONBODY , callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); 
  xmlHttp.send(JSONBODY);
}
 

function saveInDatabase(dashUrl, hlsUrl, name , thumbnail){
  
}

export function getDuration(url){
    return new Promise((resolve, reject) => 
        httpGetAsync(url, '', response => {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(response,"text/xml");

            let mpd = xmlDoc.getElementsByTagName("MPD")[0];
            let rawTime = mpd.getAttribute('mediaPresentationDuration');

            if(rawTime.length == 0){
                reject(0);
            }else{
                //remove PT
                rawTime = rawTime.substr(1);
                rawTime = rawTime.substr(1);
                
                //H
                var h = 0;
                var hPosi = rawTime.search("H");
                if(hPosi != -1){
                    h = rawTime.substring(0, hPosi);
                    rawTime = rawTime.slice(hPosi + 1);
                    h = parseInt(h);
                }
                //console.log("H: " + h);  
                
                //M
                var m = 0;
                var mPosi = rawTime.search("M");
                if(mPosi != -1){
                    m = rawTime.substring(0, mPosi);
                    rawTime = rawTime.slice(mPosi + 1);
                    m = parseInt(m);
                }
                //console.log("M: " + m);  
                
                //S
                var s = 0;
                var sPosi = rawTime.search("S");
                if(sPosi != -1){
                    s = rawTime.substring(0, sPosi);
                    s = s.replace('.','');
                    if(s.length != 5){
                        switch(s.length) {
                            case 4:
                                s = (s + "0");
                                break;
                            case 3:
                                s = (s + "00");
                                break;
                            case 2:
                                s = (s + "000");
                                break;
                            case 1:
                                s = (s + "000");
                                break;    
                            default:
                                s = 0;
                        }
                    }
                    s = parseInt(s);
                }
                //console.log("S: " + s);  
            
                var duration = 0;
                
                if (isInt(h) && isInt(m) && isInt(s)) {
                    duration = (h * 3600000) + (m * 60000) + (s);
                }
                console.log("Final Duration: " + duration);
                resolve(duration);
            } 
        })
    );
}


function isInt(n){
    return Number(n) === n && n % 1 === 0;
}