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

        // // Handle image upload
        // if (!empty($_FILES['image']) && $_FILES['image']['error'] === 0) {
        //     $image_id = $this->upload_image($_FILES['image']);
        //     if ($image_id) {
        //         $data['image_url'] = wp_get_attachment_url($image_id);
        //     }
        // }

        $image_url = '';

        if (isset($_FILES['image']) && !empty($_FILES['image']['name'])) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/image.php');

            $uploaded = media_handle_upload('image', 0);

            if (!is_wp_error($uploaded)) {
                $image_url = wp_get_attachment_url($uploaded); // ✅ real image URL
            }
        }
    
        $data = [
           
            'form_pattern' => isset($_POST['form_pattern']) ? sanitize_text_field($_POST['form_pattern']) : "template-1",
            'btn_bg_color' => isset($_POST['btn_bg_color']) ? sanitize_text_field($_POST['btn_bg_color']) : "#000000",
            'btn_text_color' => isset($_POST['btn_text_color']) ? sanitize_text_field($_POST['btn_text_color']) : "#ffffff",
            'hover_btn_bg' => isset($_POST['hover_btn_bg']) ? sanitize_text_field($_POST['hover_btn_bg']) : "#111111",
            'hover_btn_text_color' => isset($_POST['hover_btn_text_color']) ? sanitize_text_field($_POST['hover_btn_text_color']) : "#ffffff",
            'btn_border_width' => isset($_POST['btn_border_width']) ? sanitize_text_field($_POST['btn_border_width']) : "",

            'btn_border_type' => isset($_POST['btn_border_type']) ? sanitize_text_field($_POST['btn_border_type']) : "",
            'btn_border_color' => isset($_POST['btn_border_color']) ? sanitize_text_field($_POST['btn_border_color']) : "#000000",

            
            'input_height' => isset($_POST['input_height']) ? sanitize_text_field($_POST['input_height']) : "",
            'input_width' => isset($_POST['input_width']) ? sanitize_text_field($_POST['input_width']) : "",
            'input_padding' => isset($_POST['input_padding']) ? sanitize_text_field($_POST['input_padding']) : "",
            'input_border_width' => isset($_POST['input_border_width']) ? sanitize_text_field($_POST['input_border_width']) : "",
            'input_border_type' => isset($_POST['input_border_type']) ? sanitize_text_field($_POST['input_border_type']) : "",
            'input_border_color' => isset($_POST['input_border_color']) ? sanitize_text_field($_POST['input_border_color']) : "#000000",
            'header_tab_bg' => isset($_POST['header_tab_bg']) ? sanitize_text_field($_POST['header_tab_bg']) : "#ffffff",
            'header_tab_text' => isset($_POST['header_tab_text']) ? sanitize_text_field($_POST['header_tab_text']) : "#000000",
            'header_active_tab_bg' => isset($_POST['header_active_tab_bg']) ? sanitize_text_field($_POST['header_active_tab_bg']) : "#000000",
            'header_active_tab_text' => isset($_POST['header_active_tab_text']) ? sanitize_text_field($_POST['header_active_tab_text']) : "#ffffff",

            'header_front_size' => isset($_POST['header_front_size']) ? sanitize_text_field($_POST['header_front_size']) : "16",
            'header_tab_padding' => isset($_POST['header_tab_padding']) ? sanitize_text_field($_POST['header_tab_padding']) : "10px 0px",
            'sidebar_position' => isset($_POST['sidebar_position']) ? sanitize_text_field($_POST['sidebar_position']) : "right",
            'sidebar_background' => isset($_POST['sidebar_background']) ? sanitize_text_field($_POST['sidebar_background']) : "",

            'sidebar_bg_color' => isset($_POST['sidebar_bg_color']) ? sanitize_text_field($_POST['sidebar_bg_color']) : "#000000",

            'sidebar_overlay_color' => isset($_POST['sidebar_overlay_color']) ? sanitize_text_field($_POST['sidebar_overlay_color']) : "#000000",

            'sidebar_width' => isset($_POST['sidebar_width']) ? sanitize_text_field($_POST['sidebar_width']) : "50%",

            'sidebar_overlay_opacity' => isset($_POST['sidebar_overlay_opacity']) ? sanitize_text_field($_POST['sidebar_overlay_opacity']) : "0",

            

            
            
            
        ];

    
        update_option('login_prime_style_settings', $data, false);

        wp_send_json_success([
          "message" => "Settings saved successfully",
          "image_url" => $image_url
        ]);
        
        wp_die();
    }


    private function upload_image($file) {
        if (!function_exists('wp_handle_upload')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        $upload_overrides = ['test_form' => false];
        $movefile = wp_handle_upload($file, $upload_overrides);

        if ($movefile && !isset($movefile['error'])) {
            $attachment = [
                'guid'           => $movefile['url'],
                'post_mime_type' => $movefile['type'],
                'post_title'     => sanitize_file_name($file['name']),
                'post_content'   => '',
                'post_status'    => 'inherit'
            ];

            $attach_id = wp_insert_attachment($attachment, $movefile['file']);
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $attach_data = wp_generate_attachment_metadata($attach_id, $movefile['file']);
            wp_update_attachment_metadata($attach_id, $attach_data);

            return $attach_id;
        }

        return false;
    }

    public function login_prime_get_style(){
        $data = get_option( 'login_prime_style_settings', []);

        wp_send_json_success($data);
    }

    
}