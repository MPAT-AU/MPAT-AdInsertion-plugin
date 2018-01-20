
// creates all necessary tables
// POST
export function createTables() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createTables'},
        type: 'post',
        success: function(data) {
            console.log("createTables()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("createTables()- Error happened: " + error);
            return {};
        }
    });
}

// 1.1
// returns JSON-array with all videos
// GET
export function getVideos() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getVideos'},
        type: 'get',
        success: function(data) {
            console.log("getVideos()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("getVideos()- Error happened: " + error);
            return {};
        }
    });
}

// 1.2
// returns JSON with video
// GET
export function getVideo(id) {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getVideo', id: id},
        type: 'get',
        success: function(data) {
            console.log("getVideo()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("getVideo()- Error happened: " + error);
            return {};
        }
    });
}

// 1.3
// returns true/false
// POST
export function createVideo(json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createVideo', json: json},
        type: 'post',
        success: function(data) {
            console.log("createVideo()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("createVideo()- Error happened: " + error);
            return false;
        }
    });
}

// 1.4
// returns true/false
// POST
export function updateVideo(id, json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'updateVideo',id: id, json: json},
        type: 'post',
        success: function(data) {
            console.log("updateVideo()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("updateVideo()- Error happened: " + error);
            return false;
        }
    });
}

// 1.5
// returns true/false
// POST
export function deleteVideo(id){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'deleteVideo', id: id},
        type: 'post',
        success: function(data) {
            console.log("deleteVideo()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("deleteVideo()- Error happened: " + error);
            return false;
        }
    });
}




// 2.1
// returns true/false
// POST
export function createVideoPart(json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createVideoPart', json: json},
        type: 'post',
        success: function(data) {
            console.log("createVideoPart()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("createVideoPart()- Error happened: " + error);
            return false;
        }
    });
}

// 2.2
// returns true/false
// POST
export function updateVideoPart(id,json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'updateVideoPart',id: id, json: json},
        type: 'post',
        success: function(data) {
            console.log("updateVideoPart()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("updateVideoPart()- Error happened: " + error);
            return false;
        }
    });
}

// 2.3
// returns true/false
// POST
export function deleteVIdeoPart(id){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'deleteVIdeoPart', id: id},
        type: 'post',
        success: function(data) {
            console.log("deleteVIdeoPart()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("deleteVIdeoPart()- Error happened: " + error);
            return false;
        }
    });
}



// 3.1
// returns true/false
// POST
export function createAdBlock(json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createAdBlock', json: json},
        type: 'post',
        success: function(data) {
            console.log("createAdBlock()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("createAdBlock()- Error happened: " + error);
            return false;
        }
    });
}

// 3.2
// returns true/false
// POST
export function updateAdBlock(id,json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'updateAdBlock',id: id, json: json},
        type: 'post',
        success: function(data) {
            console.log("updateAdBlock()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("updateAdBlock()- Error happened: " + error);
            return false;
        }
    });
}

// 3.3
// returns true/false
// POST
export function deleteAdBlock(id){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'deleteAdBlock', id: id},
        type: 'post',
        success: function(data) {
            console.log("deleteAdBlock()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("deleteAdBlock()- Error happened: " + error);
            return false;
        }
    });
}



// 4.1
// returns JSON-array with all ads
// GET
export function getAds() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getAds'},
        type: 'get',
        success: function(data) {
            console.log("getAds()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("getAds()- Error happened: " + error);
            return {};
        }
    });
}


// 4.1.2
// returns JSON-array with all ads
// GET
export function getAdsWithCount() {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getAdsWithCount'},
        type: 'get',
        success: function(data) {
            console.log("getAdsWithCount()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("getAdsWithCount()- Error happened: " + error);
            return {};
        }
    });
}

// 4.2
// returns JSON with ads
// GET
export function getAd(id) {
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'getAd', id: id},
        type: 'get',
        success: function(data) {
            console.log("getAd()- Data recieved: " + data);
            return data;
        },
        error: function (error) {
            console.log("getAd()- Error happened: " + error);
            return {};
        }
    });
}

// 4.3
// returns true/false
// POST
export function createAd(json){
    return new Promise((resolve, reject) =>
        $.ajax({
            url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
            data: {function: 'createAd', json: json},
            type: 'post',
            success: function(data) {
                console.log("createAd()- Data recieved: " + data);
                resolve(true);
            },
            error: function (error) {
                console.log("createAd()- Error happened: " + error);
                resolve(false);
            }
    }));
}

// 4.4
// returns true/false
// POST
export function updateAd(id,json){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'updateAd',id: id, json: json},
        type: 'post',
        success: function(data) {
            console.log("updateAd()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("updateAd()- Error happened: " + error);
            return false;
        }
    });
}

// 4.5
// returns true/false
// POST
export function deleteAd(id){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'deleteAd', id: id},
        type: 'post',
        success: function(data) {
            console.log("deleteAd()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("deleteAd()- Error happened: " + error);
            return false;
        }
    });
}


// just for testing
export function createData(){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createData'},
        type: 'post',
        success: function(data) {
            console.log("createData()- Data recieved: " + data);
            return true;
        },
        error: function (error) {
            console.log("createData()- Error happened: " + error);
            return false;
        }
    });
}