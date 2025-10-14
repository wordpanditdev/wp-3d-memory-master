<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://wordpandit.com
 * @since             1.0.0
 * @package           Wp_3d_Master_Memory
 *
 * @wordpress-plugin
 * Plugin Name:       3-Day Master Memory
 * Plugin URI:        https://readlite.in
 * Description:       This is a description of the plugin.
 * Version:           1.0.0
 * Author:            Ren
 * Author URI:        https://wordpandit.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-3d-master-memory
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WP_3D_MASTER_MEMORY_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-3d-master-memory-activator.php
 */
function activate_wp_3d_master_memory() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-3d-master-memory-activator.php';
	Wp_3d_Master_Memory_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-3d-master-memory-deactivator.php
 */
function deactivate_wp_3d_master_memory() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-3d-master-memory-deactivator.php';
	Wp_3d_Master_Memory_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wp_3d_master_memory' );
register_deactivation_hook( __FILE__, 'deactivate_wp_3d_master_memory' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-3d-master-memory.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_3d_master_memory() {

	$plugin = new Wp_3d_Master_Memory();
	$plugin->run();

}
run_wp_3d_master_memory();
