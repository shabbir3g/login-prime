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
        add_menu_page(
            __('Login Prime','login-prime'), 
            __('Login Prime','login-prime'), 
            'manage_options', 
            'login-prime', 
            [$this, 'login_prime_settings'], 
            // 'dashicons-shield-alt', 
            'dashicons-lock',
            99);
    }

    public function login_prime_settings(){
        echo '<div id="login-prime-settings"></div>';
    }

    
}