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
            [$this, 'admin_menu_callback'], 
            // 'dashicons-shield-alt', 
            'dashicons-lock',
            99);
    }
}