<?php 

namespace LoginPrime\Includes\Ajax;

/**
 * Ajax Setting handlers class
 */

class Setting{
    public function __construct(){
        add_action('wp_ajax_login_prime_save_settings', [$this, 'login_prime_save_settings']);
        add_action('wp_ajax_login_prime_get_settings', [$this, 'login_prime_get_settings']);
        add_action('wp_ajax_get_all_user_roles', [$this, 'get_all_user_roles']);
        add_action('wp_ajax_get_all_pages', [$this, 'get_all_pages_callback']);

       
    }
  

    public function login_prime_save_settings(){
        
        ob_clean(); 
        header("Content-Type: application/json");
    
        check_ajax_referer('login-prime-nonce', '_wpnonce'); // ✅ Fix nonce name
    
        $data = [
            'enable_registration' => isset($_POST['enable_registration']) && $_POST['enable_registration'] === "1" ? "1" : "0",
            'enable_darkmode' => isset($_POST['enable_darkmode']) && $_POST['enable_darkmode'] === "1" ? "1" : "0",
            'user_role' => isset($_POST['user_role']) ? sanitize_text_field($_POST['user_role']) : "",
            'auto_login_user_on_signup' => isset($_POST['auto_login_user_on_signup']) && $_POST['auto_login_user_on_signup'] === "1" ? "1" : "0",'handle_reset_password' => isset($_POST['handle_reset_password']) && $_POST['handle_reset_password'] === "1" ? "1" : "0",
            'form_pattern' => isset($_POST['form_pattern']) ? sanitize_text_field($_POST['form_pattern']) : "",
            'login_redirect' => isset($_POST['login_redirect']) ? sanitize_text_field($_POST['login_redirect']) : "",
            'register_redirect' => isset($_POST['register_redirect']) ? sanitize_text_field($_POST['register_redirect']) : "",
            'logout_redirect' => isset($_POST['logout_redirect']) ? sanitize_text_field($_POST['logout_redirect']) : "",
            'login_form_header_text' => isset($_POST['login_form_header_text']) ? sanitize_text_field($_POST['login_form_header_text']) : "",
            'registration_form_header_text' => isset($_POST['registration_form_header_text']) ? sanitize_text_field($_POST['registration_form_header_text']) : "",
            'login_tab_text' => isset($_POST['login_tab_text']) ? sanitize_text_field($_POST['login_tab_text']) : "",
            'register_tab_text' => isset($_POST['register_tab_text']) ? sanitize_text_field($_POST['register_tab_text']) : "",'login_button_text' => isset($_POST['login_button_text']) ? sanitize_text_field($_POST['login_button_text']) : "",
            'register_button_text' => isset($_POST['register_button_text']) ? sanitize_text_field($_POST['register_button_text']) : "",
            'reset_password_button_text' => isset($_POST['reset_password_button_text']) ? sanitize_text_field($_POST['reset_password_button_text']) : "",
            'username_label_text' => isset($_POST['username_label_text']) ? sanitize_text_field($_POST['username_label_text']) : "",
            'username_placeholder_text' => isset($_POST['username_placeholder_text']) ? sanitize_text_field($_POST['username_placeholder_text']) : "",
            'password_label_text' => isset($_POST['password_label_text']) ? sanitize_text_field($_POST['password_label_text']) : "",
            'password_placeholder_text' => isset($_POST['password_placeholder_text']) ? sanitize_text_field($_POST['password_placeholder_text']) : "",

            
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

    public function get_all_user_roles() {
        // Check if the current user has permission to view roles
        if (current_user_can('manage_options')) {
            $roles = get_editable_roles(); // Get all roles
            wp_send_json_success($roles);
        } else {
            wp_send_json_error('Permission denied');
        }
    }

    function get_all_pages_callback() {
        $pages = get_pages(); // Fetch all pages
        $pages_array = [];
    
        foreach ($pages as $page) {
            $pages_array[] = [
                'ID' => $page->ID,
                'title' => $page->post_title
            ];
        }
    
        wp_send_json_success($pages_array);
    }


    
}