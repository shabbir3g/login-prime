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
             --btn-bg-color: " . (isset($dynamic_css['btn_bg_color']) ? $dynamic_css['btn_bg_color'] : '#000000') . ";
             --btn-text-color: " . (isset($dynamic_css['btn_text_color']) ? $dynamic_css['btn_text_color'] : '#ffffff') . ";

             --btn-hover-bg: " . (isset($dynamic_css['hover_btn_bg']) ? $dynamic_css['hover_btn_bg'] : '#111111') . ";
            --btn-hover-text: " . (isset($dynamic_css['hover_btn_text_color']) ? $dynamic_css['hover_btn_text_color'] : '#ffffff') . ";
             --btn-border-width: " . (isset($dynamic_css['btn_border_width']) ? $dynamic_css['btn_border_width'].'px' : '') . ";
            --btn-border-type: " . (isset($dynamic_css['btn_border_type']) ? $dynamic_css['btn_border_type'] : 'none') . ";
            --btn-border-color: " . (isset($dynamic_css['btn_border_color']) ? $dynamic_css['btn_border_color'] : '#000000') . ";
            --header-tab-bg: " . (isset($dynamic_css['header_tab_bg']) ? $dynamic_css['header_tab_bg'] : '#ffffff') . ";
            --header-tab-text: " . (isset($dynamic_css['header_tab_text']) ? $dynamic_css['header_tab_text'] : '#000000') . ";
            --header-active-tab-bg: " . (isset($dynamic_css['header_active_tab_bg']) ? $dynamic_css['header_active_tab_bg'] : '#000000') . ";
            --header-active-tab-text: " . (isset($dynamic_css['header_active_tab_text']) ? $dynamic_css['header_active_tab_text'] : '#ffffff') . ";

            --header-front-size: " . (isset($dynamic_css['header_front_size']) ? $dynamic_css['header_front_size'].'px' : '') . ";

            --header-tab-padding: " . (isset($dynamic_css['header_tab_padding']) ? $dynamic_css['header_tab_padding'] : '10px 0px') . ";

            

             


            }
        </style>";
    }

    /**
     * Shortcode handler function
     */    

    public function render_shortcode($atts, $content=''){

        wp_enqueue_style('login-prime-template_style');
        wp_enqueue_script('login-prime-darkmode');
        wp_enqueue_style('login-prime-darkmode');
        
        $data = get_option( 'login_prime_style_settings', []);

        // print_r($data);

        
        // $atts = shortcode_atts([
        //     'form_pattern' => '' // Default value
        // ], $atts);

        // echo $data['form_pattern'];
        // echo $atts['form_pattern'];
        // print_r($atts);

        ?>
        <header class="header">
                <label class="switch">
                    <input type="checkbox" id="darkModeToggle">
                    <span class="slider round"></span>
                </label>
            </header>
        <?php 

        $template = '';

        // Condition to choose the template file
        if ($data['form_pattern'] == 'template-1') {
            $template = 'template-1.php';
        } elseif ($data['form_pattern'] == 'template-2') {
            $template = 'template-2.php';
        } elseif ($data['form_pattern'] == 'template-3') {
            $template = 'template-3.php';
        } elseif ($data['form_pattern'] == 'template-4') {
            $template = 'template-4.php';
        } elseif ($data['form_pattern'] == 'template-5') {
            $template = 'template-5.php';
        }else {
            $template = 'template-1.php'; // Default template if nothing matches
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