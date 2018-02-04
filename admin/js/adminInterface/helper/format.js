export function changeFormat(duration) {

    let h = Math.floor(duration/3600000);
    duration = duration - ( h * 3600000);
    let m = Math.floor(duration/60000);
    duration = duration - ( m * 60000);
    let s = Math.floor(duration/1000);
    duration = duration - ( s * 1000);
    let ms = duration;
    let output = ""

    if(ms == 0){
        output = (h + "h " + m + "min " + s + "s");
    }else{
        output = (h + "h " + m + "min " + s + "." + ms + "s");
    }
    return output;
}