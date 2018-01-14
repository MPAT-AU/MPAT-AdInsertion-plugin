<?php
// just for debugging
function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'DB Handler Log: " . $output . "' );</script>";
}

// includes the $wpdb class
define( 'SHORTINIT', true );
$path = $_SERVER['DOCUMENT_ROOT'];
include_once $path . '/wp/wp-load.php';

// handling requests
if(isset($_GET['function'])) {
    if($_GET['function'] == 'createTable') {
        createTable();
    } elseif($_GET['function'] == 'bla') {
        // do stuff
    }
}

function createTable(){
    global $wpdb;

    $table_name = $wpdb->prefix.'ad_inserted_videos';

    debug_to_console($table_name);

    if( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name) {
        // $sql = 'CREATE TABLE '.$table_name.' (
        //     id bigint(20) AUTO_INCREMENT NOT_NULL,
        //     hlsUrl VARCHAR(255) NOT NULL,
        //     dashUrl VARCHAR(255) NOT NULL,
        //     thumbnailLink VARBINARY(MAX) NOT NULL,
        //     PRIMARY KEY (id)
        //     )';

        $wpdb->query( 
            $wpdb->prepare( 
                'CREATE TABLE bla ( id bigint(%d) NOT NULL AUTO_INCREMENT, PRIMARY KEY (id) )', 20
                )
        );
        
        // $sql = 'CREATE TABLE '.$table_name.' (
        //     id bigint(20) NOT NULL AUTO_INCREMENT;
        // );';

        //require_once($_SERVER['DOCUMENT_ROOT'].'/wp/wp-admin/includes/upgrade.php');
        //dbdelta($sql);

    }
}
?>