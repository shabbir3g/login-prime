<?php

namespace LoginPrime\Includes;



class AuthHandler
{

    // ✅ Declare the static property first
    //protected static $settings = [];

    protected static $loginSlug = ''; // Store slug here
    protected static $registerSlug = ''; // Store slug here
    protected static $defaultUserRole = 'subscriber';
    protected static $autoLogin = false;

    public static function init()
    {
        add_action('init', [self::class, 'handleForm']);

        $settings = get_option('login_prime_save_settings', []);

        if (!empty($settings['login_redirect'])) {
            $page = get_post($settings['login_redirect']);

            if ($page && !is_wp_error($page)) {
                self::$loginSlug = $page->post_name; // Save slug to class property
            }
        }

        if (!empty($settings['register_redirect'])) {
            $page = get_post($settings['register_redirect']);

            if ($page && !is_wp_error($page)) {
                self::$registerSlug = $page->post_name; // Save slug to class property
            }
        }

        if (!empty($settings['user_role'])) {
            self::$defaultUserRole = sanitize_key($settings['user_role']);
        }
        
        self::$autoLogin = !empty($settings['auto_login_user_on_signup']);


       
     
        
    
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

            $page = get_post($page_id);

            if (is_wp_error($user)) {
                wp_redirect(home_url('/login/?register=false&error=login_failed'));
                exit;
            }

            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID);
            wp_redirect(home_url(self::$loginSlug)); // Or any target page
            exit;
        }

        if (isset($_POST['lp_form_type']) && $_POST['lp_form_type'] === 'register') {


            $settings = get_option('login_prime_save_settings', []);
            if (empty($settings['enable_registration'])) {
                wp_redirect(home_url('/login/?register=false&error=registration_disabled'));
                exit;
            }


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

                  // 👇 Assign role
                $user = new \WP_User($user_id);
                $user->set_role(self::$defaultUserRole);

                  // 👇 Conditionally auto login
                if (self::$autoLogin) {
                    wp_set_current_user($user_id);
                    wp_set_auth_cookie($user_id);
                }

                // wp_set_current_user($user_id);
                // wp_set_auth_cookie($user_id);


                wp_redirect(home_url(self::$registerSlug));
                exit;
            } else {
                wp_redirect(home_url('/login/?register=true&error=registration_failed'));
                exit;
            }
        }


        if (isset($_POST['lp_form_type']) && $_POST['lp_form_type'] === 'reset_password') {
            if (!isset($_POST['lp_reset_password_nonce']) || !wp_verify_nonce($_POST['lp_reset_password_nonce'], 'lp_reset_password_action')) {
                return;
            }
        
            $user_email = sanitize_email($_POST['reset_user_email']);
            $user = get_user_by('email', $user_email);
        
            if ($user) {
                // Send reset link
                $reset_key = get_password_reset_key($user);
                $reset_url = network_site_url("wp-login.php?action=rp&key=$reset_key&login=" . rawurlencode($user->user_login), 'login');
        
                wp_mail(
                    $user_email,
                    'Password Reset Request',
                    "Hi " . $user->display_name . ",\n\nClick the following link to reset your password:\n\n" . $reset_url
                );
        
                wp_redirect(home_url('/login/?reset_password=true&status=sent'));
                exit;
            } else {
                wp_redirect(home_url('/login/?reset_password=true&error=user_not_found'));
                exit;
            }
        }
    }
}