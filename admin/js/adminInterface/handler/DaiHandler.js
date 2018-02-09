
export function sendAndHandleRequest(json){
    return new Promise((resolve, reject) => {
        let url = "http://daiservices.fokus.fraunhofer.de:3001/json/fame/vod"

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
              if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                  resolve(JSON.parse(xmlHttp.responseText));
              }else{
                  reject();
              }
        }
        xmlHttp.open("GET", url, true); 
        xmlHttp.send(body);
    }) 
}


function saveInDatabase(dashUrl, hlsUrl, name , thumbnail){
  
}

export function getDuration(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function () {
            if (this.status === 200 ) {
                const response = xhr.response
                if (response === "") {
                    resolve(0)
                } else {

                    let xmlDoc = $.parseXML(response)

                    let mpd = xmlDoc.getElementsByTagName("MPD")[0]
                    let rawTime = mpd.getAttribute('mediaPresentationDuration')

                    if (rawTime.length === 0) {
                        reject(0)
                    } else {
                        //remove PT
                        rawTime = rawTime.substr(1)
                        rawTime = rawTime.substr(1)


                        //H
                        let h = 0
                        let hPosi = rawTime.search("H")
                        if (hPosi !== -1) {
                            h = rawTime.substring(0, hPosi)
                            rawTime = rawTime.slice(hPosi + 1)
                            h = parseInt(h)
                        }

                        //M
                        let m = 0
                        let mPosi = rawTime.search("M")
                        if (mPosi !== -1) {
                            m = rawTime.substring(0, mPosi)
                            rawTime = rawTime.slice(mPosi + 1)
                            m = parseInt(m)
                        }

                        //S
                        let s = 0
                        let sPosi = rawTime.search("S")
                        if (sPosi !== -1) {
                            s = rawTime.substring(0, sPosi)
                            s = s.replace('.', '')
                            if (s.length !== 5) {
                                switch (s.length) {
                                    case 4:
                                        s = (s + "0")
                                        break
                                    case 3:
                                        s = (s + "00")
                                        break
                                    case 2:
                                        s = (s + "000")
                                        break
                                    case 1:
                                        s = (s + "000")
                                        break
                                    default:
                                        s = 0
                                }
                            }
                            s = parseInt(s)
                        }

                        let duration = 0

                        if (isInt(h) && isInt(m) && isInt(s)) {
                            duration = (h * 3600000) + (m * 60000) + (s)
                        }
                        console.log("Final Duration: " + duration)
                        resolve(duration)
                    }
                }
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send()
    })
}


function isInt(n){
    return Number(n) === n && n % 1 === 0
}