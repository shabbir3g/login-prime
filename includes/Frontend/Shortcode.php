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
    }

    /**
     * Shortcode handler function
     */    

    public function render_shortcode($atts, $content=''){

        wp_enqueue_style('login-prime-template_style');
        $data = get_option( 'login_prime_save_settings', []);

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
            $template = 'login-demo-1.php';
        } elseif ($data['form_pattern'] == 'template-2') {
            $template = 'login-demo-2.php';
        } elseif ($data['form_pattern'] == 'template-3') {
            $template = 'login-demo-dark-3.php';
        } elseif ($data['form_pattern'] == 'template-4') {
            $template = 'login-demo-light-3.php';
        } elseif ($data['form_pattern'] == 'template-5') {
            $template = 'login-demo-4.php';
        }else {
            $template = 'login-demo-1.php'; // Default template if nothing matches
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