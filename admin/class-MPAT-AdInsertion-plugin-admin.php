<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    MPAT_AdInsertion_plugin
 * @subpackage MPAT_AdInsertion_plugin/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    MPAT_AdInsertion_plugin
 * @subpackage MPAT_AdInsertion_plugin/admin
 * @author     Your Name <email@example.com>
 */
class MPAT_AdInsertion_plugin_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $MPAT_AdInsertion_plugin    The ID of this plugin.
	 */
	private $MPAT_AdInsertion_plugin;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $MPAT_AdInsertion_plugin       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $MPAT_AdInsertion_plugin, $version ) {

		$this->MPAT_AdInsertion_plugin = $MPAT_AdInsertion_plugin;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in MPAT_AdInsertion_plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The MPAT_AdInsertion_plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

        $adminCss_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'css/admin_style.css' ));
        wp_enqueue_style( $this->MPAT_AdInsertion_plugin, plugin_dir_url( __FILE__ ) . 'css/admin_style.css', array(), $adminCss_ver, 'all' );
        wp_enqueue_style( $this->MPAT_AdInsertion_plugin, plugin_dir_url( __FILE__ ) . 'css/MPAT-AdInsertion-plugin.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->MPAT_AdInsertion_plugin, 'https://fonts.googleapis.com/icon?family=Material+Icons');

    }

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in MPAT_AdInsertion_plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The MPAT_AdInsertion_plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
        $adminInterface_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'js/build/adminInterface.bundle.js' ));
        wp_enqueue_script( 'adminInterface', plugin_dir_url( __FILE__ ) . 'js/build/adminInterface.bundle.js', array( ), $adminInterface_ver);
        wp_enqueue_script( $this->MPAT_AdInsertion_plugin, plugin_dir_url( __FILE__ ) . 'js/MPAT-AdInsertion-plugin.js', array( 'wp-api', 'adminInterface' ), $this->version, false );

    }

    public function addToAdminPage() {
        // page_title, menu_title, capability, menu_slug, function, icon_url, position
        add_menu_page(
            'MPAT Ad Insertion Plugin',
            'Video Ad Insertion',
            'edit_pages',
            'mpat-ad-insertion',
            array(&$this, 'display'),
			'dashicons-format-video'
        );
        add_submenu_page(
            'mpat-ad-insertion',
            'All Ad Inserted Videos',
            'All Ad Inserted Videos',
            'edit_pages',
            'mpat-ad-insertion-all-ad-inserted-videos',
            array(&$this, 'display')
        );
        add_submenu_page(
            'mpat-ad-insertion',
            'New Video',
            'New Video',
            'edit_pages',
            'mpat-ad-insertion-new-video',
            array(&$this, 'display')
        );
        add_submenu_page(
            'mpat-ad-insertion',
            'All Ads',
            'All Ads',
            'edit_pages',
            'mpat-ad-insertion-all-ads',
            array(&$this, 'display')
        );
        add_submenu_page(
            'mpat-ad-insertion',
            'New Ad',
            'New Ad',
            'edit_pages',
            'mpat-ad-insertion-new-ad',
            array(&$this, 'display')
        );
    }

    function display() {
	    ?>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" type="text/javascript"></script>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <div id="reactRoot" class="wrap ad-inserter"></div>
        <?php
    }

}
