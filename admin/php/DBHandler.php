<?php
// $mpat_table_prefix = 'mpat';

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
    switch($_GET['function']){
        case 'createTables':
            createVideoTable();
            createPartTable();
            createAdBlockTable();
            createAdTable();
            break;
    }
}

// database functions
function createVideoTable(){
    
    global $wpdb;

    // global $mpat_table_prefix;
    // $table_name = $wpdb->prefix.$mpat_table_prefix.'video';

    $table_name = 'video';
    if( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name) {

        // global $table_name;

        $wpdb->query( 
            'CREATE TABLE video (
                id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20),
                output_dash_url VARCHAR(1000),
                output_hls_url VARCHAR(1000)
            )'
        );
    }
}

function createPartTable(){
    
    global $wpdb;
    
    $table_name = 'part';
    if( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name) {

        $wpdb->query( 
            'CREATE TABLE part (
                id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                v_id BIGINT(20) NOT NULL,
                name VARCHAR(20),
                dash_url VARCHAR(1000),
                hls_url VARCHAR(1000),
                part_nr INT,
                CONSTRAINT `fk_part_video` FOREIGN KEY (v_id) REFERENCES video (id) ON DELETE CASCADE ON UPDATE RESTRICT
            )'
        );
    }
}

function createAdBlockTable(){
    
    global $wpdb;
    
    $table_name = 'ad_block';
    if( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name) {

        $wpdb->query( 
            'CREATE TABLE ad_block (
                id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                p_id BIGINT(20) NOT NULL,
                ad_id BIGINT(20) NOT NULL,
                sec_in_part INT(20),
                CONSTRAINT `fk_ad_block_part` FOREIGN KEY (p_id) REFERENCES part (id) ON DELETE CASCADE ON UPDATE RESTRICT
            )'
        );
    }
}

function createAdTable(){
    
    global $wpdb;
    
    $table_name = 'ad';
    if( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name) {

        $wpdb->query( 
            'CREATE TABLE ad (
                id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20),
                dash_url VARCHAR(1000),
                hls_url VARCHAR(1000)
            )'
        );
    }
}

?>