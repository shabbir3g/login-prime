<?php 
/*
 * Plugin Name:       Login Prime
 * Plugin URI:        https://pixelsdigital.net/
 * Description:       Login Prime is a powerful and secure authentication plugin for WordPress.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Mostafizur Rahman
 * Author URI:        https://pixelsdigital.net/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       login-prime
 * Domain Path:       /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

// Load Autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Initialize the plugin
use LoginPrime\Includes\Plugin;

// Register Activation and Deactivation Hooks
register_activation_hook(__FILE__, ['LoginPrime\Includes\Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['LoginPrime\Includes\Plugin', 'deactivate']);

// Start the plugin
Plugin::get_instance();