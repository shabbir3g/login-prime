<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';
$datastyle = get_option( 'login_prime_style_settings', []);
?>

<div class="login-prime-container">
  <section class="form-section">
    <div class="form-container form-width-container">
      <h1>
        <?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>
      </h1>
      <?php if (!$is_register): ?>
      <p class="login-sub-title">
      <?php echo isset($data['login_form_subheader_text']) && ($data['login_form_subheader_text'] !="") ? $data['login_form_subheader_text'] : 'Enter your Credentials to access your account'; ?>
      </p>
      <?php endif; ?>

        <?php if ($is_register): ?>
            <form  method="post" action="">
            <input type="hidden" name="lp_form_type" value="register" />
            <?php wp_nonce_field('lp_register_action', 'lp_register_nonce'); ?>
            <label for="first_name">Firstname</label>
            <input type="text" name="first_name" id="first_name"  placeholder="Your first name" required />
            <label for="last_name">Lastname</label>
            <input type="text" name="last_name" id="last_name" placeholder="Your last name" required />

            <label for="user_name">Username</label>
            <input type="text" name="user_name" id="user_name"  placeholder="@username" required  />

            <label for="user_email">Email</label>
            <input type="email" name="user_email" id="user_email"  placeholder="Example@email.com" required />
            <label for="user_password">Password</label>
            <input type="password" name="user_password"  
            id="user_password" placeholder="At least 8 characters"required />
            <label for="confirm_password">Confirm Password</label>
            <input type="password" name="confirm_password"
            id="confirm_password" placeholder="Confirm your password" required />
            <div class="checkbox-prime-container">
                <div class="checkbox-prime-wrapper">
                <input class="remember-me-checkbox" type="checkbox" />
                <span>I agree with the terms & condition</span>
              </div>
            </div>
            <button type="submit" class="submit-button">
              <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?>
            </button>
          </form>
          <div class="separator">Or</div>
          <div class="social-login">
            <div class="social-button">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/google.png" alt="Google Logo" />
              Google
            </div>
            <div class="social-button">
              <img
                src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/facebook.png"
                alt="Facebook Logo"
              />
              Facebook
            </div>
          </div>
          <p>
            Have an account?
            <a href="?register=false">Login</a>
          </p>

  <?php else: ?>

      <form method="post" action="">
      <?php wp_nonce_field('lp_login_action', 'lp_login_nonce'); ?>
      <input type="hidden" name="lp_form_type" value="login" />
        <label for="user_name">
          <?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?>
        </label>
        <input type="text" name="user_name"  id="user_name"  placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>" required />
        <label for="user_password">
          <?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?>
        </label>
        <input type="password" name="user_password" id="user_password"  placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'At least 8 characters'; ?>" required />
        <div class="checkbox-prime-container">
          <div class="checkbox-prime-wrapper">
            <input id="user_remember" name="user_remember" class="remember-me-checkbox" type="checkbox" />
            <label for="user_remember" >Remember me</label>
          </div>
          <div style="width: 100%">
            <a href="#" class="forgot-password"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
          </div>
        </div>
        <button type="submit" class="submit-button">
          <?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?>
        </button>
      </form>
      <div class="separator">Or</div>
      <div class="social-login">
        <div class="social-button">
          <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/google.png" alt="Google Logo" />
          Google
        </div>
        <div class="social-button">
          <img
            src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/facebook.png"
            alt="Facebook Logo"
          />
          Facebook
        </div>
      </div>
      <p>
        Don't have an account?
        <a href="?register=true">Sign up</a>
      </p>
    

  <?php endif; ?>

  </div>
  </section>


  <section class="image-section">


  <?php
  $sidebar_bg = isset($datastyle['sidebar_background']) ? esc_url($datastyle['sidebar_background']) : '';

  if (!empty($sidebar_bg)) : ?>
      <img src="<?php echo $sidebar_bg; ?>" alt="Sidebar Background" />
  <?php else : ?>
      <img src="<?php echo esc_url(LOGIN_PRIME_URL . 'includes/Frontend/templates/images/img.png'); ?>" alt="Decorative Flowers" />
     
  <?php endif; ?>
  <div class="overlay"></div> <!-- Overlay div here -->



    
  </section>




</div>