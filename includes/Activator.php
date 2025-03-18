<?php 

namespace LoginPrime\Includes;

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

class Activator {
    public static function activate() {
        error_log('Activator::activate() triggered'); // Debugging
        self::activate_login_prime();
    }

    private static function activate_login_prime() {

        $installed = get_option('login_prime_installed');

        if(!$installed){
            update_option( 'login_prime_installed', time() );
        }
        update_option( 'login_prime_version', LOGIN_PRIME_VERSION );
        error_log('Checking if Login page exists...'); // Debugging


        $existing_page = get_page_by_title('Login');

        if (!$existing_page) {
            error_log('Creating Login page...'); // Debugging
            $page_id = wp_insert_post([
                'post_title'    => 'Login',
                'post_content'  => '[login-prime]', // Shortcode inside page
                'post_status'   => 'publish',
                'post_type'     => 'page',
                'post_author'   => get_current_user_id(),
            ]);

            if ($page_id) {
                update_option('login_prime_created_page_id', $page_id);
            }
        }
    }
}