<?php 

namespace LoginPrime\Includes;

/**
 * Assets Class
 */

 class Assets{

    public function __construct(){

        add_action('admin_enqueue_scripts', [$this, 'lp_enqueue_assets']);

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

 }