<?php
namespace LoginPrime\Includes;

if (!defined('ABSPATH')) {
    exit;
}

require_once( ABSPATH.'wp-admin/includes/plugin.php');

class Plugin {
    private static $instance;

    private function __construct() {
        $this->define_constants();
        add_action('plugins_loaded', [$this, 'init_login_prime']);
    }

    public static function get_instance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }



    private function define_constants() {
       
        $plugin_data = get_plugin_data( __FILE__ );
        $plugin_version = $plugin_data['Version'];
        define('LOGIN_PRIME_VERSION', $plugin_version);
        define('LOGIN_PRIME_PATH', plugin_dir_path(__DIR__));
        define('LOGIN_PRIME_URL', plugin_dir_url(__DIR__));
        define('LOGIN_PRIME_ASSETS', LOGIN_PRIME_URL . 'assets');
    }

    public function init_login_prime() {
        new Assets();
        AuthHandler::init();
        if (is_admin()) {
            new Admin();
            new Ajax();
        } else {
            new Frontend();
        }
    }

    public static function activate() {
        Activator::activate();
    }

    public static function deactivate() {
        Deactivator::deactivate();
    }
}