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

		wp_enqueue_style( $this->MPAT_AdInsertion_plugin, plugin_dir_url( __FILE__ ) . 'css/MPAT-AdInsertion-plugin-admin.css', array(), $this->version, 'all' );

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

		wp_enqueue_script( $this->MPAT_AdInsertion_plugin, plugin_dir_url( __FILE__ ) . 'js/MPAT-AdInsertion-plugin-admin.js', array( 'jquery' ), $this->version, false );

	}

}
