<?php 
global $post;
$slug = $post->post_name;

$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';


?>

<?php if ($is_register): ?>
  <div class="lp-main-container">
    <h2 class="lp-title">Registration</h2>
    <div class="lp-tabs">
      <a class="lp-tab lp-login-tab" href="/<?php echo $slug; ?>">Login </a>
      <button class="lp-tab active">Register</button>
      
    </div>
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
    <p class="lp-register-text">Already have an account? <a href="/<?php echo $slug; ?>">Login Now</a></p>
</div>
  <?php else: ?>
  <div class="lp-main-container">
  <h2 class="lp-title">Login Form</h2>
  <div class="lp-tabs">
    <button class="lp-tab active"><?php echo isset($data['login_tab_text']) && ($data['login_tab_text'] !="")  ? $data['login_tab_text'] : 'Login'; ?></button>
    <a class="lp-tab lp-register-tab" href="/<?php echo $slug; ?>/?register=true"><?php echo isset($data['register_tab_text']) && ($data['register_tab_text'] !="") ? $data['register_tab_text'] : 'Register'; ?>  </a>
    
  </div>
  <form class="lp-form">
    <input
      type="text"
      placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>"
      class="lp-input-field"
    />
    <input type="password" placeholder="Password" class="lp-input-field" />
    <a href="#" class="lp-forgot-password"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
    <button type="submit" class="lp-btn"><?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?></button>
  </form>
  <p class="lp-register-text">Not a member? <a href="/<?php echo $slug; ?>/?register=true">Register now</a></p>
  </div>
<?php endif; ?>

