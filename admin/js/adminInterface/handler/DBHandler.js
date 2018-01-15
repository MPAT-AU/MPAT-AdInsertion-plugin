
// creates all necessary tables
export function createTables() {

    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createTables'},
        type: 'get',
        success: function(data){
            //data returned from php
            console.log(data);
        },
        error: function (error) {
            console.log("Error happened: ");
            console.log(error);
        }
    });
}
