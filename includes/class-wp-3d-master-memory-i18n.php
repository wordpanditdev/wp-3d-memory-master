<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://wordpandit.com
 * @since      1.0.0
 *
 * @package    Wp_3d_Master_Memory
 * @subpackage Wp_3d_Master_Memory/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Wp_3d_Master_Memory
 * @subpackage Wp_3d_Master_Memory/includes
 * @author     Ren <developer@wordpandit.com>
 */
class Wp_3d_Master_Memory_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'wp-3d-master-memory',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
