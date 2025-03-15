<?php 

namespace LoginPrime\Includes\Admin;

/**
 * Login Menu handlers class
 */

class Menu{
    public function __construct(){
        add_action('admin_menu', [$this, 'add_admin_menu_item']);
        add_action('wp_ajax_login_prime_save_settings', [$this, 'login_prime_save_settings']);
        add_action('wp_ajax_login_prime_get_settings', [$this, 'login_prime_get_settings']);
       
    }
    public function add_admin_menu_item(){
       $hook =  add_menu_page(
            __('Login Prime','login-prime'), 
            __('Login Prime','login-prime'), 
            'manage_options', 
            'login-prime', 
            [$this, 'login_prime_settings'], 
            // 'dashicons-shield-alt', 
            'dashicons-lock',
            99);

            add_action('admin_head-'.$hook, [$this, 'login_prime_enqueue_assets']);
    }

    public function login_prime_settings(){
        echo '<div id="login-prime-settings"></div>';
    }

    public function login_prime_enqueue_assets(){
        wp_enqueue_script('login-prime-settings');
        wp_localize_script( "login-prime-settings", "LoginPrime", [
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'login-prime-nonce' ),
           
        ]);
        wp_enqueue_style('wp-components');
        wp_enqueue_style('login-prime-style-settings');

        
       
        
    }

    public function login_prime_save_settings(){
        
        ob_clean(); 
        header("Content-Type: application/json");
    
        check_ajax_referer('login-prime-nonce', '_wpnonce'); // ✅ Fix nonce name
    
        $data = [
            'enable_registration' => isset($_POST['enable_registration']) && $_POST['enable_registration'] === "1" ? "1" : "0",
            'user_role' => isset($_POST['user_role']) ? sanitize_text_field($_POST['user_role']) : "",
            'plugin_name' => isset($_POST['plugin_name']) ? sanitize_text_field($_POST['plugin_name']) : "",
        ];
    
        update_option('login_prime_save_settings', $data, false);
    
        wp_send_json_success(["message" => "Settings saved successfully"]);

         // Always exit after sending JSON
        wp_die();
    }

    public function login_prime_get_settings(){
        $data = get_option( 'login_prime_save_settings', []);

        wp_send_json_success($data);
    }

    
}