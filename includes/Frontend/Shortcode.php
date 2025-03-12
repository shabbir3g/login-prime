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
        return 'Hello World From Login Prime';
    }
}