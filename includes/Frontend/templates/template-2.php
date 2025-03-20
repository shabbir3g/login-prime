<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';

?>
<div class="lp-main-container">

<h2 class="lp-title">
<?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>
</h2>

<div class="lp-tabs">
    <a class="lp-tab <?php echo !$is_register ? 'active' : ''; ?>" href="?register=false">
      <?php echo isset($data['login_tab_text']) && ($data['login_tab_text'] !="") ? $data['login_tab_text'] : 'Login'; ?>
    </a>
    <a class="lp-tab lp-register-tab <?php echo $is_register ? 'active' : ''; ?>" href="?register=true">
      <?php echo isset($data['register_tab_text']) && ($data['register_tab_text'] !="") ? $data['register_tab_text'] : 'Register'; ?>  
    </a>
</div>

<?php if ($is_register): ?>
 
    <form class="lp-form">
      <input type="text" placeholder="First Name" class="lp-input-field">
      <input type="text" placeholder="Last Name" class="lp-input-field">
      <input type="text" placeholder="@username" class="lp-input-field">
      <input type="email" placeholder="Email" class="lp-input-field">
      <input type="password" placeholder="Password" class="lp-input-field">
      <input type="password" placeholder="Confirm Password" class="lp-input-field">
      <div class="lp-terms">
        <input type="checkbox" id="terms">
        <label for="terms">I agree to the <a href="#">terms & policy</a></label>
      </div>
      <button type="submit" class="lp-btn"> <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?></button>
    </form>
    <p class="lp-register-text">Already have an account? <a href="?register=false">Login Now</a></p>

  <?php else: ?>


  <form class="lp-form">
    <input
      type="text"
      placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>"
      class="lp-input-field"
    />
    <input type="password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'Password'; ?>" class="lp-input-field" />
    <a href="#" class="lp-forgot-password"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
    <button type="submit" class="lp-btn"><?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?></button>
  </form>
  <p class="lp-register-text">Not a member? <a href="?register=true">Register now</a></p>

<?php endif; ?>
</div>
