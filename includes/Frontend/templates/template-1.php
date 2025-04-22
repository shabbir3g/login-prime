<?php 
$data = get_option( 'login_prime_save_settings', []);
$datastyle = get_option( 'login_prime_style_settings', []);

$registration_enabled = isset($data['enable_registration']) && $data['enable_registration'];

$is_register = isset($_GET['register']) && $_GET['register'] === 'true'  && $registration_enabled;

$is_reset = isset($_GET['reset_password']) && $_GET['reset_password'] === 'true';


?>

<div class="lp-demo-6-container">





  <div class="form-section">

  <?php if (isset($_GET['status']) && $_GET['status'] === 'sent'): ?>
    <div class="success-message">Password reset email sent. Check your inbox.</div>
<?php elseif (isset($_GET['error']) && $_GET['error'] === 'user_not_found'): ?>
    <div class="error-message">Email not found. Please try again.</div>
<?php endif; ?>
        <h1>
        <?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>  
        <span><?php echo isset($data['login_form_subheader_text']) && ($data['login_form_subheader_text'] !="") ? $data['login_form_subheader_text'] : 'Welcome to Login Prime'; ?></span>
     </h1>
        <div class="social-login">
          <button>
            <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/google.png" alt="Google" />
            Login with Google
          </button>
          <button>
            <img
              src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/facebook.png"
              alt="Facebook"
            />
            Login with Facebook
          </button>
        </div>
        <div class="divider">OR</div>

<?php if ($is_register && $registration_enabled): ?>
   <!-- Form Section -->
        <!--! form -->
        <form method="post" action="">
        <input type="hidden" name="lp_form_type" value="register" />
        <?php wp_nonce_field('lp_register_action', 'lp_register_nonce'); ?>
          <!-- firstname -->
          <div>
            <label for="first_name">Firstname</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" id="first_name" name="first_name" placeholder="Firstname" required />
              </div>
          </div>
          <!-- lasttname -->
          <div>
            <label for="last_name">Lastname</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" name="last_name" id="last_name" placeholder="Lastname" required />
              </div>
          </div>
          <!-- Username -->
          <div>
            <label for="user_name">Username</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" name="user_name" id="user_name" placeholder="Username" required />
              </div>
          </div>

          <div>
            <label for="user_email">Email</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="email" name="user_email"  id="user_email" placeholder="example@gmail.com" required />
            </div>
          </div>
          <div>
            <label for="user_password">Password</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
              <input type="password" name="user_password" id="user_password" placeholder="Password" required />
              </div>
          </div>
          <div>
            <label for="confirm_password">Confirm Password</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
              <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required />            </div>
          </div>
          <div class="form-options">
            <label> <input type="checkbox" /> I agree with the terms and conditions</label>
            <a href="?reset_password=true">Forgot Password?</a>
          </div>
          <button type="submit" class="submit-button">
          <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?>
          </button>
        </form>
        <div class="register-link">
          Have an account? <a href="?register=false">login</a>
        </div>

        <?php elseif ($is_reset): ?>
          <!-- Show reset form here -->

          <form method="post" action="">
            <?php wp_nonce_field('lp_reset_password_action', 'lp_reset_password_nonce'); ?>
            <input type="hidden" name="lp_form_type" value="reset_password" />

            <div>
                <label for="reset_user_email">Email Address</label>
                <div class="form-group">
                    <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
                    <input type="email" name="reset_user_email" id="reset_user_email" placeholder="Enter your email" required />
                </div>
            </div>

            <button type="submit" class="submit-button">Reset Password</button>
        </form>
        <div class="register-link">
            <a href="?register=false">Back to Login</a>
        </div>

      <?php else: ?>
  <!-- Form Section -->
  
    <form method="post" action="">
    <?php wp_nonce_field('lp_login_action', 'lp_login_nonce'); ?>
    <input type="hidden" name="lp_form_type" value="login" />
      <div>
        <label for="user_name"><?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?></label>
        <div class="form-group">
          <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
          <input name="user_name" id="user_name"  type="text" placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>" required />
        </div>
      </div>
      <div>
        <label for="user_password"><?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?></label>
        <div class="form-group">
          <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
          <input name="user_password" id="user_password"  type="password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'Password'; ?>" required />
        </div>
      </div>
      <div class="form-options">
        <label for="user_remember"> <input name="user_remember" id="user_remember"  type="checkbox" /> Remember me </label>
        <a href="?reset_password=true"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
      </div>
      <button type="submit" class="submit-button"><?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?></button>
    </form>
    <?php if ($registration_enabled): ?>
    <div class="register-link">
      Don't have an account? <a href="?register=true">Register</a>
    </div>
    <?php endif; ?>
 

  <?php endif; ?>

  </div>

   <!-- Image Section -->
   <div class="image-section">

   <?php
  $sidebar_bg = isset($datastyle['sidebar_background']) ? esc_url($datastyle['sidebar_background']) : '';

  if (!empty($sidebar_bg)) : ?>
      <img src="<?php echo $sidebar_bg; ?>" alt="Sidebar Background" />
  <?php else : ?>
      <img src="<?php echo esc_url(LOGIN_PRIME_URL . 'includes/Frontend/templates/images/Illustration.png'); ?>" alt="Illustration" />
  <?php endif; ?>
  <div class="overlay"></div> <!-- Overlay div here -->



  </div>

</div>
