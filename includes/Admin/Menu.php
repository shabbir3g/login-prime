<?php 

namespace LoginPrime\Includes\Admin;

/**
 * Login Menu handlers class
 */

class Menu{
    public function __construct(){
        add_action('admin_menu', [$this, 'add_admin_menu_item']);
       
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
        wp_enqueue_style('wp-components');
        
    }

    
}