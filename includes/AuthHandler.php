<?php

namespace LoginPrime\Includes;

class AuthHandler
{
    public static function init()
    {
        add_action('init', [self::class, 'handleForm']);

        echo "Hello Login Prime";
        // die();
    
    }

 
    public static function handleForm()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') return;

        if (isset($_POST['lp_form_type']) && $_POST['lp_form_type'] === 'login') {
            if (!isset($_POST['lp_login_nonce']) || !wp_verify_nonce($_POST['lp_login_nonce'], 'lp_login_action')) {
                return;
            }

            $user_name = sanitize_user($_POST['user_name']);
            $user_password = $_POST['user_password'];
            $remember = isset($_POST['user_remember']);

            $creds = [
                'user_login' => $user_name,
                'user_password' => $user_password,
                'user_remember' => $remember,
            ];

            $user = wp_signon($creds, false);

            if (is_wp_error($user)) {
                wp_redirect(home_url('/login/?register=false&error=login_failed'));
                exit;
            }

            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID);
            wp_redirect(home_url('/dashboard/')); // Or any target page
            exit;
        }

        if (isset($_POST['lp_form_type']) && $_POST['lp_form_type'] === 'register') {
            if (!isset($_POST['lp_register_nonce']) || !wp_verify_nonce($_POST['lp_register_nonce'], 'lp_register_action')) {
                return;
            }
            $first_name = sanitize_text_field($_POST['first_name']);
            $last_name = sanitize_text_field($_POST['last_name']);
            $user_name = sanitize_user($_POST['user_name']);
            $user_email = sanitize_email($_POST['user_email']);
            $user_password = $_POST['user_password'];
            $confirm = $_POST['confirm_password'];
            

            if ($user_password !== $confirm) {
                wp_redirect(home_url('/login/?register=true&error=password_mismatch'));
                exit;
            }

            if (username_exists($user_name) || email_exists($user_email)) {
                wp_redirect(home_url('/login/?register=true&error=user_exists'));
                exit;
            }

            $user_id = wp_create_user($user_name, $user_password, $user_email);

            if (!is_wp_error($user_id)) {
                wp_update_user([
                    'ID' => $user_id,
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                ]);

                wp_set_current_user($user_id);
                wp_set_auth_cookie($user_id);
                wp_redirect(home_url('/dashboard/'));
                exit;
            } else {
                wp_redirect(home_url('/login/?register=true&error=registration_failed'));
                exit;
            }
        }
    }
}