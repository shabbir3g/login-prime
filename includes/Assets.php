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


    public function lp_enqueue_assets(){

        $scripts = $this->get_scripts();

        foreach ($scripts as $handle => $script) {
            $deps = isset( $script['deps'] ) ? $script['deps']  : false;
            wp_register_script($handle , $script['src'], $deps , $script['version'], $script['position'] );
        }

       
    }

 }