<?php 
$data = get_option( 'login_prime_save_settings', []);
$datastyle = get_option( 'login_prime_style_settings', []);


$is_register = isset($_GET['register']) && $_GET['register'] === 'true';


?>

<div class="lp-demo-6-container">



  <div class="form-section">
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

<?php if ($is_register): ?>
   <!-- Form Section -->
        <!--! form -->
        <form method="post" action="">
        <input type="hidden" name="lp_form_type" value="register" />
        <?php wp_nonce_field('lp_register_action', 'lp_register_nonce'); ?>
          <!-- firstname -->
          <div>
            <label for="">Firstname</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" name="first_name" placeholder="Firstname" required />
              </div>
          </div>
          <!-- lasttname -->
          <div>
            <label for="">Lastname</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" name="last_name" placeholder="Lastname" required />
              </div>
          </div>
          <!-- Username -->
          <div>
            <label for="">Username</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="text" name="user_name" placeholder="Username" required />
              </div>
          </div>

          <div>
            <label for="">Email</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
              <input type="email" name="user_email" placeholder="example@gmail.com" required />

            </div>
          </div>
          <div>
            <label for="">Password</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
              <input type="password" name="user_password" placeholder="Password" required />
              </div>
          </div>
          <div>
            <label for="">Confirm Password</label>
            <div class="form-group">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
              <input type="password" name="confirm_password" placeholder="Confirm Password" required />            </div>
          </div>
          <div class="form-options">
            <label> <input type="checkbox" /> I agree with the terms and conditions</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" class="submit-button">
          <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?>
          </button>
        </form>
        <div class="register-link">
          Have an account? <a href="?register=false">login</a>
        </div>
      <?php else: ?>
  <!-- Form Section -->
  
    <form method="post" action="">
    <?php wp_nonce_field('lp_login_action', 'lp_login_nonce'); ?>
    <input type="hidden" name="lp_form_type" value="login" />
      <div>
        <label for=""><?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?></label>
        <div class="form-group">
          <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Vector.png" alt="Email Icon" />
          <input name="user_name"  type="text" placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>" required />
        </div>
      </div>
      <div>
        <label for=""><?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?></label>
        <div class="form-group">
          <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/password-img.png" alt="Password Icon" />
          <input name="user_password" type="password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'Password'; ?>" required />
        </div>
      </div>
      <div class="form-options">
        <label> <input name="user_remember" type="checkbox" /> Remember me </label>
        <a href="#"><?php echo isset($data['reset_password_button_text']) && ($data['reset_password_button_text'] !="") ? $data['reset_password_button_text'] : 'Forget password'; ?></a>
      </div>
      <button type="submit" class="submit-button"><?php echo isset($data['login_button_text']) && ($data['login_button_text'] !="")  ? $data['login_button_text'] : 'Login'; ?></button>
    </form>
    <div class="register-link">
      Don't have an account? <a href="?register=true">Register</a>
    </div>
 

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
