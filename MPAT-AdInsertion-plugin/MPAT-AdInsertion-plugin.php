<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           MPAT_AdInsertion_plugin
 *
 * @wordpress-plugin
 * Plugin Name:       WordPress Plugin Boilerplate
 * Plugin URI:        http://example.com/MPAT-AdInsertion-plugin-uri/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Your Name or Your Company
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       MPAT-AdInsertion-plugin
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently pligin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'MPAT_ADINSERTION_PLUGINVERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-MPAT-AdInsertion-plugin-activator.php
 */
function activate_MPAT_AdInsertion_plugin() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-MPAT-AdInsertion-plugin-activator.php';
	MPAT_AdInsertion_plugin_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-MPAT-AdInsertion-plugin-deactivator.php
 */
function deactivate_MPAT_AdInsertion_plugin() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-MPAT-AdInsertion-plugin-deactivator.php';
	MPAT_AdInsertion_plugin_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_MPAT_AdInsertion_plugin' );
register_deactivation_hook( __FILE__, 'deactivate_MPAT_AdInsertion_plugin' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-MPAT-AdInsertion-plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_MPAT_AdInsertion_plugin() {

	$plugin = new MPAT_AdInsertion_plugin();
	$plugin->run();

}
run_MPAT_AdInsertion_plugin();
