<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';

?>
<div class="lp-3rd-form-container">
    <h2>
        <?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>
    </h2>
    <div class="social-login">
        <div class="social-button">
            <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/google.png" alt="Google Logo">
            Google
        </div>
        <div class="social-button">
            <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/facebook.png" alt="Facebook Logo">
            Facebook
        </div>
    </div>
    <div class="divider">Or</div>

    <?php if ($is_register): ?>

      <form  method="post" action="">
      <input type="hidden" name="lp_form_type" value="register" />
      <?php wp_nonce_field('lp_register_action', 'lp_register_nonce'); ?>
        <div class="form-group">
          <label for="first_name">Firstname</label>
          <input type="text" name="first_name" id="first_name" placeholder="Your firstname" required />
        </div>
        <div class="form-group">
          <label for="last_name">Lastname</label>
          <input type="text" name="last_name" id="last_name" placeholder="Your lastname" required />
        </div>
        <div class="form-group">
          <label for="user_name">Username</label>
          <input type="text" name="user_name" id="user_name" placeholder="@username" required />
        </div>
        <div class="form-group">
          <label for="user_email">Email</label>
          <input type="email" name="user_email" id="user_email" placeholder="youremail@gmail.com" required />
        </div>
        <div class="form-group password-toggle">
          <label for="user_password">Password</label>
          <input
            type="password"
            name="user_password"  
            id="user_password"
            placeholder="Enter your password" required
          />
        </div>
        <div class="form-group password-toggle">
          <label for="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Enter your password" required
          />
        </div>
        <div class="terms">
          <label class="checkbox-container">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <span class="terms">I agree to the &nbsp; <a href="#"> terms & policy</a></span>
          </label>
        </div>
        <button type="submit" class="button">
            <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Create account'; ?>
        </button>
        <!-- <div class="google-button">
          <img src="images/Google - Original.png" alt="Google Logo" />
          Continue with Google
        </div>
        <div class="google-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Google Logo" />
          Continue with Facebook
        </div> -->
      </form>
      <div class="login">Already have an account? <a href="?register=false">Log In</a></div>

    <?php else: ?>


    <form method="post" action="" >
    <?php wp_nonce_field('lp_login_action', 'lp_login_nonce'); ?>
    <input type="hidden" name="lp_form_type" value="login" />
        <div class="form-group">
            <label for="user_name">
                <?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?>
            </label>
            <input  type="text"  name="user_name"  id="user_name" placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>">
        </div>
        <div class="form-group">
            <label for="user_password">
                <?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?>
            </label>
            <input type="password" name="user_password" id="user_password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'Password'; ?>">
        </div>
        <div class="form-actions">
            <a href="#">
                <?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?>
            </a>
        </div>
        <button type="submit" class="button">
            <?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?>
        </button>
    </form>
    <div class="signup">
        Don’t Have An Account? <a href="?register=true">Sign Up</a>
    </div>

    <?php endif; ?>

</div>






