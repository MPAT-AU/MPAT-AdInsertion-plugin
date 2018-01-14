
// creates all necessary tables
export function createTables() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createTables'},
        type: 'post',
        success: function(data){
            console.log("success");
            console.log(data);
        },
        error: function (error) {
            console.log("Error happened: ");
            console.log(error);
        }
    });
}

// returns JSON-array with all videos
export function getVideos() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getVideos'},
        type: 'get',
        success: function(data) {
            console.log(data);
        },
        error: function (error) {
            console.log("Error happened: ");
            console.log(error);
        }
    });
}