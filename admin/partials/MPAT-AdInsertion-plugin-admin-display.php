<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    MPAT_AdInsertion_plugin
 * @subpackage MPAT_AdInsertion_plugin/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<!DOCTYPE html>
<html>
<head>
    <script>



        function test(){

            let json = "";//JSON.parse("test.json");
            httpGetAsync("https://jsonplaceholder.typicode.com/posts/1", json, response => {
                console.log(response);
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
    
    </script>
</head>
<body>
    <button onclick="test()">Click me</button
</body>
</html>