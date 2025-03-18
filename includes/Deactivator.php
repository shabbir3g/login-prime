<?php

namespace LoginPrime\Includes;

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

class Deactivator {
    public static function deactivate() {
        self::delete_login_page();
    }

    private static function delete_login_page() {
        $page_id = get_option('login_prime_created_page_id');

        if ($page_id) {
            wp_delete_post($page_id, true);
            delete_option('login_prime_created_page_id');
        }
    }
}