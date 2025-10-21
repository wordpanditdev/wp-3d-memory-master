<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://wordpandit.com
 * @since      1.0.0
 *
 * @package    Wp_3d_Master_Memory
 * @subpackage Wp_3d_Master_Memory/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Wp_3d_Master_Memory
 * @subpackage Wp_3d_Master_Memory/public
 * @author     Ren <developer@wordpandit.com>
 */
class Wp_3d_Master_Memory_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_3d_Master_Memory_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_3d_Master_Memory_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/wp-3d-master-memory-public.css', array(), $this->version, 'all' );

		wp_enqueue_style(
		    'tailwind-cdn',
		    'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.14/dist/tailwind.min.css',
		    [],
		    '3.4.14'
		);

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_3d_Master_Memory_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_3d_Master_Memory_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$manifest_path = plugin_dir_path(__DIR__) . 'public/js/manifest.json';

        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            $entry = $manifest['src/main.js'];

            wp_enqueue_script(
                'wp-3d-memory-master-vue',
                plugin_dir_url(__FILE__) . 'js/' . $entry['file'],
                array(),
                null,
                true
            );

            if (!empty($entry['css'])) {
                foreach ($entry['css'] as $css_file) {
                    wp_enqueue_style(
                        'wp-3d-memory-master-vue',
                        plugin_dir_url(__FILE__) . 'js/' . $css_file,
                        array(),
                        null
                    );
                }
            }
        }

	    // Mark script as type="module"
		add_filter('script_loader_tag', function($tag, $handle, $src) {
		    if ('wp-3d-memory-master-vue' === $handle) {
		        return '<script type="module" src="' . esc_url($src) . '"></script>';
		    }
		    return $tag;
		}, 10, 3);

		wp_enqueue_script(
            'wp-tailwind',
            'https://cdn.tailwindcss.com',
            array(),
            null,
            true
        );

	}

	/**
	 * Register shortode.
	 *
	 * @since    1.0.0
	 */
	public function register_shortcode() {
		add_shortcode( 'wp-3d-memory-master', [ $this, 'render_shortcode' ] );
	}

	public function render_shortcode( $atts ) {
		$atts = shortcode_atts(['file' => null], $atts);
	    $id = 'quiz-' . uniqid();

	    ob_start(); 
	    if($atts['file']) :?>
	    <div class="wp-3d-memory-master-wrapper" >
			<div id = "wp-3d-memory-master-vue" data-file="<?php echo esc_url( $atts['file'] ); ?>">
			</div>
		</div>
	    <?php
		else :
		?>
		<div>
			<p>Please add file url for 3D Memory Master. Upload json file in the WP Media then copy and paste the URL inside the shortcode. <br><br>Sample shortcode: <br><strong>[wp-3d-memory-master file="http://sampleurl.com/wp-content/uploads/2025/10/test.json"]</strong></p>
		</div>
		<?php	
		endif;
	    return ob_get_clean();
	}

}
