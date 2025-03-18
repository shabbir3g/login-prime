<?php 

namespace LoginPrime\Includes\Ajax;

/**
 * Ajax Style handlers class
 */

class Style{
    public function __construct(){
        add_action('wp_ajax_login_prime_save_style', [$this, 'login_prime_save_style']);
        add_action('wp_ajax_login_prime_get_style', [$this, 'login_prime_get_style']);
       
    }
  

    public function login_prime_save_style(){
        ob_clean(); 
        header("Content-Type: application/json");
    
        check_ajax_referer('login-prime-nonce', '_wpnonce'); // ✅ Fix nonce name
    
        $data = [
           
            'form_pattern' => isset($_POST['form_pattern']) ? sanitize_text_field($_POST['form_pattern']) : "",
            'btn_bg_color' => isset($_POST['btn_bg_color']) ? sanitize_text_field($_POST['btn_bg_color']) : "",
            'btn_text_color' => isset($_POST['btn_text_color']) ? sanitize_text_field($_POST['btn_text_color']) : "",
            'hover_btn_bg' => isset($_POST['hover_btn_bg']) ? sanitize_text_field($_POST['hover_btn_bg']) : "",
            'hover_btn_text_color' => isset($_POST['hover_btn_text_color']) ? sanitize_text_field($_POST['hover_btn_text_color']) : "",
            'btn_border_width' => isset($_POST['btn_border_width']) ? sanitize_text_field($_POST['btn_border_width']) : "",
            'btn_border_type' => isset($_POST['btn_border_type']) ? sanitize_text_field($_POST['btn_border_type']) : "",
            'btn_border_color' => isset($_POST['btn_border_color']) ? sanitize_text_field($_POST['btn_border_color']) : "",

            
            
            
        ];
    
        update_option('login_prime_style_settings', $data, false);
    
        wp_send_json_success(["message" => "Settings saved successfully"]);

         // Always exit after sending JSON
        wp_die();
    }

    public function login_prime_get_style(){
        $data = get_option( 'login_prime_style_settings', []);

        wp_send_json_success($data);
    }

    
}