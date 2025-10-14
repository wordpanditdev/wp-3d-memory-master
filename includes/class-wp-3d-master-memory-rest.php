<?php
/**
 * Handle custom REST API routes for the plugin
 */
class Wp_3d_Master_Memory_REST {

    /**
     * Register custom REST route
     */
    public function register_routes() {
        register_rest_route( 'quiz/v1', '/data', [
            'methods'             => 'GET',
            'callback'            => [ $this, 'get_quiz_data' ],
            'permission_callback' => '__return_true',
            'args'                => [
                'file' => [
                    'required' => true,
                    'sanitize_callback' => 'esc_url_raw',
                ],
            ],
        ] );
    }

    /**
     * Fetch quiz JSON from plugin folder
     */
    public function get_quiz_data( WP_REST_Request $request ) {
        $file_url = $request->get_param( 'file' );

		if ( empty( $file_url ) ) {
			return new WP_Error( 'missing_file', 'Missing file parameter', [ 'status' => 400 ] );
		}

		$upload_dir = wp_get_upload_dir();
		$base_url   = trailingslashit( $upload_dir['baseurl'] );
		$base_dir   = trailingslashit( $upload_dir['basedir'] );

		// 🧩 Only allow URLs inside uploads
		if ( strpos( $file_url, $base_url ) !== 0 ) {
			return new WP_Error( 'invalid_url', 'File must be inside uploads directory', [ 'status' => 403 ] );
		}

		// Convert URL → path
		$relative_path = substr( $file_url, strlen( $base_url ) );
		$file_path     = $base_dir . $relative_path;

		if ( ! file_exists( $file_path ) ) {
			return new WP_Error( 'not_found', 'File not found in uploads', [ 'status' => 404 ] );
		}

		$json = file_get_contents( $file_path );
		$data = json_decode( $json, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error( 'json_error', 'Invalid JSON format', [ 'status' => 500 ] );
		}

		return rest_ensure_response( $data );
    }
}
