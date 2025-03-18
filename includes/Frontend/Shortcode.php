<?php 

namespace LoginPrime\Includes\Frontend;

/**
 * Login Menu handlers class
 */

 class Shortcode{

    /**
     * Initialize the class
     */    

    public function __construct(){
        add_shortcode('login-prime', [$this, 'render_shortcode']);
        add_action('wp_head', [$this, 'login_prime_custom_dynamic_css']);
    }

    public function login_prime_custom_dynamic_css(){
        $dynamic_css = get_option('login_prime_style_settings', ['red']);
    
        echo "<style>
            :root {
             --btn-bg-color: " . (isset($dynamic_css['btn_bg_color']) ? $dynamic_css['btn_bg_color'] : '#5948d6') . ";
             --btn-text-color: " . (isset($dynamic_css['btn_text_color']) ? $dynamic_css['btn_text_color'] : '#ffffff') . ";

             --btn-hover-bg: " . (isset($dynamic_css['hover_btn_bg']) ? $dynamic_css['hover_btn_bg'] : '#5948d6') . ";
            --btn-hover-text: " . (isset($dynamic_css['hover_btn_text_color']) ? $dynamic_css['hover_btn_text_color'] : '#5948d6') . ";
             --btn-border-width: " . (isset($dynamic_css['btn_border_width']) ? $dynamic_css['btn_border_width'].'px' : '') . ";
            --btn-border-type: " . (isset($dynamic_css['btn_border_type']) ? $dynamic_css['btn_border_type'] : 'none') . ";
            --btn-border-color: " . (isset($dynamic_css['btn_border_color']) ? $dynamic_css['btn_border_color'] : 'none') . ";

            

             


            }
        </style>";
    }

    /**
     * Shortcode handler function
     */    

    public function render_shortcode($atts, $content=''){

        wp_enqueue_style('login-prime-template_style');
        $data = get_option( 'login_prime_style_settings', []);

        // print_r($data);

        
        // $atts = shortcode_atts([
        //     'form_pattern' => '' // Default value
        // ], $atts);

        // echo $data['form_pattern'];
        // echo $atts['form_pattern'];
        // print_r($atts);

        $template = '';

        // Condition to choose the template file
        if ($data['form_pattern'] == 'template-1') {
            $template = 'login-demo-6.php';
        } elseif ($data['form_pattern'] == 'template-2') {
            $template = 'login-demo-1.php';
        } elseif ($data['form_pattern'] == 'template-3') {
            $template = 'login-demo-light-3.php';
        } elseif ($data['form_pattern'] == 'template-4') {
            $template = 'login-demo-4.php';
        } elseif ($data['form_pattern'] == 'template-5') {
            $template = 'login-demo-5.php';
        }else {
            $template = 'login-demo-6.php'; // Default template if nothing matches
        }
        // Get template path
        $template_path = plugin_dir_path(__FILE__) . 'templates/' . $template;

        // echo $template_path;

        // Check if the template file exists
        if (file_exists($template_path)) {
            ob_start();
            include $template_path;
            return ob_get_clean();
        } else {
            return 'Template not found!';
        }
        

        return 'Hello World From Login Prime'.$data['form_pattern'];
    }
}