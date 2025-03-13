<?php 
/*
 * Plugin Name:       Login Prime
 * Plugin URI:        https://pixelsdigital.net/
 * Description:       Login Prime is a powerful and secure authentication plugin for WordPress, offering seamless login and user management with enhanced security features.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Mostafizur Rahman
 * Author URI:        https://pixelsdigital.net/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://pixelsdigital.net/
 * Text Domain:       login-prime
 * Domain Path:       /languages
 */



if( ! defined('ABSPATH') ){
	exit; // exit if access directly
}

require_once( ABSPATH.'wp-admin/includes/plugin.php');


/**
 * This main plugin class for Login Prime Plugin
 */

final class Login_Prime{

	private static $instance; 

    /**
     * Login Prime class constructor
     */

	private function __construct(){

        require_once __DIR__ . '/vendor/autoload.php';

		$this->define_constants();

        register_activation_hook(__FILE__, [ $this, 'activate_login_prime']);

        add_action('plugins_loaded', [$this, 'init_login_prime']);

		// $this->load_classess();
		// $this->Login_Prime_textdomain();

        // new Includes\Admin_menu("Admin menu");
        // new Includes\Front_menu("Front menu");

	
	}

    public function init_login_prime(){

        new LoginPrime\Includes\Assets();
        
        // plugin initialization code goes here
        if(is_admin()){
            new LoginPrime\Includes\Admin();
        }else{
            new LoginPrime\Includes\Frontend();
        }
       
    }

    /**
     * Initialize Login Prime Singleton instance
     */

    public static function get_instance(){
		if( ! self::$instance ){
			self::$instance = new self();
		}
		return self::$instance;
	}


	private function Login_Prime_textdomain()
    {
		add_action('init', [ $this, 'Login_Prime_load_textdomain']);
      
    }

	public function Login_Prime_load_textdomain(){
		load_plugin_textdomain('login-prime', false, LOGIN_PRIME_PATH . "/languages");
	}

	private function define_constants(){

		$plugin_data = get_plugin_data( __FILE__);

		$version = $plugin_data['Version'];

		define('LOGIN_PRIME_VERSION', $version );
        define('LOGIN_PRIME_PATH', plugin_dir_path(__FILE__));
        define('LOGIN_PRIME_URL', plugin_dir_url(__FILE__));
        define('LOGIN_PRIME_ASSETS', LOGIN_PRIME_URL. '/assets');

        // define('LOGIN_PRIME_INC_DIR', trailingslashit( LOGIN_PRIME_DIR_PATH. 'includes'));
        // define('LOGIN_PRIME_ASSETS_DIR_URL', LOGIN_PRIME_URL. 'assets');

	}


    /**
     * Do stuff login prime plugin activation
     */

    public function activate_login_prime(){

        $installed = get_option('login_prime_installed');

        if(!$installed){
            update_option( 'login_prime_installed', time() );
        }
        update_option( 'login_prime_version', LOGIN_PRIME_VERSION );
    }



}


// Initialize the main plugin

function Login_Prime(){
   return Login_Prime::get_instance();
}

//kick-off the plugin

Login_Prime();