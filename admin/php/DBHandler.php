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
if ( isset( $_POST['function'] ) ) {
    switch ( $_POST['function'] ) {
        case 'createTables':
            createVideoTable();
            createPartTable();
            createAdBlockTable();
            createAdTable();
            break;
        case 'createAd':
            createAd($_POST['json']);
            break;
        case 'updateAd':
            updateAd($_POST['id'],$_POST['json']);
            break; 
        case 'deleteAd':
            deleteAd($_POST['id']);
            break;      
    }
}

if ( isset( $_GET['function'] ) ) {
    switch ( $_GET['function'] ) {
        case 'getVideos':
            getVideos();
            break;
        case 'getVideo':
            getVideo($_GET['id']);
            break;
        case 'getAds':
            getAds();
            break;
        case 'getAd':
            getAd($_GET['id']);
            break;
    }
}

// database functions
function createVideoTable() {
    global $wpdb;

    // global $mpat_table_prefix;
    // $table_name = $wpdb->prefix.$mpat_table_prefix.'video';

    $table_name = 'video';
    if ( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name ) {

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

function createPartTable() {
    global $wpdb;
    
    $table_name = 'part';
    if ( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name ) {

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

function createAdBlockTable() {
    global $wpdb;
    
    $table_name = 'ad_block';
    if ( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name ) {

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

function createAdTable() {
    global $wpdb;
    
    $table_name = 'ad';
    if ( $wpdb->get_var('SHOW TABLES LIKE \''.$table_name.'\';') != $table_name ) {

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

function getVideos() {
    global $wpdb;


    $results = $wpdb->get_results( 
        'SELECT *
        FROM video'
    );
 
    $json = json_encode( $results );
    echo $json;
}

function getVideo($id) {
    global $wpdb;

    $results = $wpdb->get_results( $wpdb->prepare(  
        'SELECT *
        FROM video
        WHERE id = %d',
        $id
    ));
 
    $json = json_encode($results[0]);
    echo $json;
    // foreach ( $results as $result ) {
    //     $myjson = json_encode($result);
    //     echo $myjson;
    // }

}



// 4.1
function getAds() {
    global $wpdb;


    $results = $wpdb->get_results( 
        'SELECT *
        FROM ad'
    );
 
    $json = json_encode( $results );
    echo $json;
}

// 4.2
function getAd($id) {
    global $wpdb;

    $results = $wpdb->get_results( $wpdb->prepare(  
        'SELECT *
        FROM ad
        WHERE id = %d',
        $id
    ));
 
    $json = json_encode($results[0]);
    echo $json;
}

// 4.3
function createAd($json){
    global $wpdb;

    $result = $wpdb->insert( 
        'ad', 
        array( 
            'name' => $json['name'], 
            'dash_url' => $json['dash_url'],
            'hls_url' => $json['hls_url']
        ), 
        array( 
            '%s', 
            '%s',
            '%s' 
        ) 
    );

    if (false === $result){
        echo false;
    } else {
        echo true;
    } 
}

// 4.4
function updateAd($id,$json){
    global $wpdb;

    $result = $wpdb->update( 
        'ad', 
        array( 
            'name' => $json['name'], 
            'dash_url' => $json['dash_url'],
            'hls_url' => $json['hls_url']
        ),
        array(
            'id' => $id
        ), 
        array( 
            '%s', 
            '%s',
            '%s' 
        ),
        array(
            '%d'
        )
    );

    if (false === $result){
        echo false;
    } else {
        echo true;
    } 
}

// 4.5
function deleteAd($id){
    global $wpdb;

    $result = $wpdb->delete( 
        'ad', 
        array(
             'id' => $id 
        ),
        array( 
            '%d' 
        )
    );

    if (false === $result){
        echo false;
    } else {
        echo true;
    } 
}

?>