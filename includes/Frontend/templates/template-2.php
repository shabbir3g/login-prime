<?php 
$data = get_option( 'login_prime_save_settings', []);

$registration_enabled = isset($data['enable_registration']) && $data['enable_registration'];

$is_register = isset($_GET['register']) && $_GET['register'] === 'true'  && $registration_enabled;

?>
<div class="lp-main-container">

<h2 class="lp-title">
<?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>
</h2>
<?php if ($registration_enabled): ?>
<div class="lp-tabs">
    <a class="lp-tab <?php echo !$is_register ? 'active' : ''; ?>" href="?register=false">
      <?php echo isset($data['login_tab_text']) && ($data['login_tab_text'] !="") ? $data['login_tab_text'] : 'Login'; ?>
    </a>
    <a class="lp-tab lp-register-tab <?php echo $is_register ? 'active' : ''; ?>" href="?register=true">
      <?php echo isset($data['register_tab_text']) && ($data['register_tab_text'] !="") ? $data['register_tab_text'] : 'Register'; ?>  
    </a>
</div>
<?php endif; ?>

<?php if ($is_register && $registration_enabled): ?>
 
    <form class="lp-form" method="post" action="">
      <input type="hidden" name="lp_form_type" value="register" />
      <?php wp_nonce_field('lp_register_action', 'lp_register_nonce'); ?>

      <input type="text" name="first_name" placeholder="First Name" class="lp-input-field" required>
      <input type="text" name="last_name"  placeholder="Last Name" class="lp-input-field" required>
      <input type="text" name="user_name" placeholder="@username" class="lp-input-field" required>
      <input type="email"  name="user_email"  placeholder="Email" class="lp-input-field" required>
      <input type="password" name="user_password"  placeholder="Password" class="lp-input-field" required>
      <input type="password" name="confirm_password"  placeholder="Confirm Password" class="lp-input-field" required>
      <div class="lp-terms">
        <input type="checkbox" id="terms">
        <label for="terms">I agree to the <a href="#">terms & policy</a></label>
      </div>
      <button type="submit" class="lp-btn"> <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?></button>
    </form>
    <p class="lp-register-text">Already have an account? <a href="?register=false">Login Now</a></p>

  <?php else: ?>


  <form method="post" action="" class="lp-form">
  <?php wp_nonce_field('lp_login_action', 'lp_login_nonce'); ?>
  <input type="hidden" name="lp_form_type" value="login" />
    <input
      type="text"
      name="user_name" 
      placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>"
      class="lp-input-field"
      required
    />
    <input type="password" name="user_password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'Password'; ?>" class="lp-input-field" required />
    <a href="#" class="lp-forgot-password"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
    <button type="submit" name="user_remember"  class="lp-btn"><?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?></button>
  </form>
  <?php if ($registration_enabled): ?>
  <p class="lp-register-text">Not a member? <a href="?register=true">Register now</a></p>
  <?php endif; ?>

  
<?php endif; ?>
</div>
