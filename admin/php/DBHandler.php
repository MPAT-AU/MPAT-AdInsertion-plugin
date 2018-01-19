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

// handling POST requests
if ( isset( $_POST['function'] ) ) {
    switch ( $_POST['function'] ) {
        case 'createTables':
            createVideoTable();
            createAdTable();
            createPartTable();
            createAdBlockTable();
            break;
        case 'createData': 
            createData();
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

// handling GET requests
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
                id BIGINT(20) NOT NULL,
                p_id BIGINT(20) NOT NULL,
                ad_id BIGINT(20) NOT NULL,
                sec_in_part INT(20),
                order_nr INT(20) NOT NULL,
                PRIMARY KEY(id, order_nr),
                CONSTRAINT `fk_ad_block_part` FOREIGN KEY (p_id) REFERENCES part (id) ON DELETE CASCADE ON UPDATE RESTRICT,
                CONSTRAINT `fk_ad_block_ad` FOREIGN KEY (ad_id) REFERENCES ad (id) ON DELETE CASCADE ON UPDATE RESTRICT
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
        'SELECT id, name, output_dash_url, output_hls_url, number_of_video_parts 
        FROM video v, 
            (SELECT v_id, COUNT(*) as number_of_video_parts 
            FROM part 
            GROUP BY v_id) np 
        WHERE v.id = np.v_id'
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

    $result = $wpdb->get_results( $wpdb->prepare(  
        'SELECT *
        FROM ad
        WHERE id = %d',
        $id
    ));
     
    //debug_to_console($result)

    if (is_null($result)){
        echo false;
    } else {
        $json = json_encode($result[0]);
        echo $json;
    }
    
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

function createData() {
    global $wpdb;
    // creating videos
    $wpdb->insert( 
        'video', 
        array( 
            'name' => 'video 1', 
            'output_dash_url' => 'video dash url 1',
            'output_hls_url' => 'video hls url 1'

        )
    );

    $wpdb->insert( 
        'video', 
        array( 
            'name' => 'video 2', 
            'output_dash_url' => 'video dash url 2',
            'output_hls_url' => 'video hls url 2'

        )
    );

    $wpdb->insert( 
        'video', 
        array( 
            'name' => 'video 3', 
            'output_dash_url' => 'video dash url 3',
            'output_hls_url' => 'video hls url 3'

        )
    );

    $wpdb->insert( 
        'video', 
        array( 
            'name' => 'video 4', 
            'output_dash_url' => 'video dash url 4',
            'output_hls_url' => 'video hls url 4'

        )
    );

    // create ads
    $wpdb->insert( 
        'ad', 
        array( 
            'name' => 'ad 1',
            'dash_url' => 'ad dash url 1',
            'hls_url' => 'ad hls url 1'
        )
    );

    $wpdb->insert( 
        'ad', 
        array( 
            'name' => 'ad 2',
            'dash_url' => 'ad dash url 2',
            'hls_url' => 'ad hls url 2'
        )
    );
    
    $wpdb->insert( 
        'ad', 
        array( 
            'name' => 'ad 3',
            'dash_url' => 'ad dash url 3',
            'hls_url' => 'ad hls url 3'
        )
    );

    // create parts
    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 1,
            'name' => 'part 1',
            'dash_url' => 'part dash url 1',
            'hls_url' => 'part hls url 1',
            'part_nr' => 1
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 1,
            'name' => 'part 2',
            'dash_url' => 'part dash url 2',
            'hls_url' => 'part hls url 2',
            'part_nr' => 2
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 1,
            'name' => 'part 3',
            'dash_url' => 'part dash url 3',
            'hls_url' => 'part hls url 3',
            'part_nr' => 3
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 2,
            'name' => 'part 4',
            'dash_url' => 'part dash url 4',
            'hls_url' => 'part hls url 4',
            'part_nr' => 1
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 3,
            'name' => 'part 5',
            'dash_url' => 'part dash url 5',
            'hls_url' => 'part hls url 5',
            'part_nr' => 1
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 3,
            'name' => 'part 6',
            'dash_url' => 'part dash url 6',
            'hls_url' => 'part hls url 6',
            'part_nr' => 2
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 3,
            'name' => 'part 7',
            'dash_url' => 'part dash url 7',
            'hls_url' => 'part hls url 7',
            'part_nr' => 3
        )
    );

    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 3,
            'name' => 'part 8',
            'dash_url' => 'part dash url 8',
            'hls_url' => 'part hls url 8',
            'part_nr' => 4
        )
    );
       
    $wpdb->insert( 
        'part', 
        array( 
            'v_id' => 4,
            'name' => 'part 9',
            'dash_url' => 'part dash url 9',
            'hls_url' => 'part hls url 9',
            'part_nr' => 1
        )
    );
    
    // create ad blocks
    $wpdb->insert( 
        'ad_block', 
        array(
            'id' => 1,
            'p_id' => 1,
            'ad_id' => 1,
            'sec_in_part' => 10,
            'order_nr' => 1
        )
    );

    $wpdb->insert( 
        'ad_block', 
        array(
            'id' => 1,
            'p_id' => 1,
            'ad_id' => 2,
            'sec_in_part' => 10,
            'order_nr' => 2
        )
    );

    $wpdb->insert( 
        'ad_block', 
        array(
            'id' => 2,
            'p_id' => 4,
            'ad_id' => 1,
            'sec_in_part' => 15,
            'order_nr' => 1
        )
    );

    $wpdb->insert( 
        'ad_block', 
        array(
            'id' => 3,
            'p_id' => 9,
            'ad_id' => 2,
            'sec_in_part' => 5,
            'order_nr' => 1
        )
    );;

    $wpdb->insert( 
        'ad_block', 
        array(
            'id' => 3,
            'p_id' => 9,
            'ad_id' => 3,
            'sec_in_part' => 10,
            'order_nr' => 2
        )
    );

}

?>