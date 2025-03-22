<?php 

namespace LoginPrime\Includes;

/**
 * Assets Class
 */

 class Assets{

    public function __construct(){

        add_action('admin_enqueue_scripts', [$this, 'lp_enqueue_assets']);

        add_action('wp_enqueue_scripts', [$this, 'frontend_enqueue_assets']);

    }

    public function get_scripts(){

        $main_asset = require LOGIN_PRIME_PATH . '/assets/js/settings/index.asset.php';


        return[
            'login-prime-settings' => [
                'src'           => LOGIN_PRIME_URL ."/assets/js/settings/index.js", 
                'deps'          => $main_asset['dependencies'],
                'version'       => $main_asset['version'],
                'position'  => [
                    'in_footer' => false
                ]
            ]
        ];
    }

    public function get_style(){
        return[
            'login-prime-style-settings' => [
                'src'           => LOGIN_PRIME_URL ."/assets/js/settings/index.css", 
                'version'       => filemtime(LOGIN_PRIME_PATH ."/assets/js/settings/index.css")

            ]
        ];
    }

    public function lp_enqueue_assets(){

        $scripts = $this->get_scripts();

        foreach ($scripts as $handle => $script) {
            $deps = isset( $script['deps'] ) ? $script['deps']  : false;
            wp_register_script($handle , $script['src'], $deps , $script['version'], $script['position'] );
        }

        $styles = $this->get_style();
        foreach ($styles as $handle => $style) {
            wp_register_style($handle , $style['src'], $style['version'] );
        }

       
    }

    public function wp_get_style(){
        return[
            'login-prime-template_style' => [
                'src'           => LOGIN_PRIME_URL ."/includes/Frontend/templates/assets/css/style.css", 
                'version'       => filemtime(LOGIN_PRIME_PATH ."/includes/Frontend/templates/assets/css/style.css")

            ],
            'login-prime-darkmode' => [
                'src'           => LOGIN_PRIME_URL ."/includes/Frontend/templates/assets/dark-mode/css/darkmode.css", 
                'version'       => filemtime(LOGIN_PRIME_PATH ."/includes/Frontend/templates/assets/dark-mode/css/darkmode.css")

            ]
        ];
    }

    public function wp_get_scripts(){
        return[
            'login-prime-darkmode' => [
                'src'           => LOGIN_PRIME_URL ."/includes/Frontend/templates/assets/dark-mode/js/darkmode-js.min.js", 
                'deps'          => ['jquery'],
                'version'       => filemtime(LOGIN_PRIME_PATH ."/includes/Frontend/templates/assets/dark-mode/js/darkmode-js.min.js"),
                'position'  => [
                    'in_footer' => true
                ]
            ], 
            'login-prime-darkmode-script' => [
                'src'           => LOGIN_PRIME_URL ."/includes/Frontend/templates/assets/dark-mode/js/darkmode-custom.js", 
                'deps'          => ['jquery'],
                'version'       => filemtime(LOGIN_PRIME_PATH ."/includes/Frontend/templates/assets/dark-mode/js/darkmode-custom.js"),
                'position'  => [
                    'in_footer' => true
                ]
            ], 

                
        ];
    }

    public function frontend_enqueue_assets(){

        $scripts = $this->wp_get_scripts();

        foreach ($scripts as $handle => $script) {
            $deps = isset( $script['deps'] ) ? $script['deps']  : false;
            wp_register_script($handle , $script['src'], $deps , $script['version'], $script['position'] );
        }

        $styles = $this->wp_get_style();
        foreach ($styles as $handle => $style) {
            wp_register_style($handle , $style['src'], $style['version'] );
        }
        
    }

 }