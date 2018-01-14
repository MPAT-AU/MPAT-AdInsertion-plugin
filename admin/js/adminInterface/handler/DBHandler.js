
export function createTable(){
    $.ajax({
        url: window.location.origin + '/app/plugins/mpat-adinsertion-plugin/admin/php/DBHandler.php',
        data: {function: 'createTable'},
        type: 'get',
        success: function(data){
            //data returned from php
            console.log("success");
            console.log(data);
        },
        error: function (error) {
            console.log("Error happened: ");
            console.log(error);
        }
    });
}
