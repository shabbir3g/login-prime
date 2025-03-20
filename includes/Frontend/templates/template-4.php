<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';

?>

<div class="login-prime-container">
  <section class="form-section">
    <div class="form-container form-width-container">
      <h1>
        <?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Registration') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Login'); ?>
      </h1>
      <p class="login-sub-title">
        Enter your Credentials to access your account
      </p>

<?php if ($is_register): ?>
          <form>
            <label for="">Firstname</label>
            <input type="text" id="" placeholder="Your first name" required />
            <label for="">Lastname</label>
            <input type="text" id="" placeholder="Your last name" required />

            <label for="">Username</label>
            <input type="text" id="" placeholder="@username" required  />

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Example@email.com" required />
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="At least 8 characters"required />
            <label for="">Confirm Password</label>
            <input type="password" id="" placeholder="Confirm your password" required />
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

      <form>
        <label for="email">
          <?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?>
        </label>
        <input type="email" id="email" placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>" required />
        <label for="password">
          <?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?>
        </label>
        <input type="password" id="password" placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'At least 8 characters'; ?>" required />
        <div class="checkbox-prime-container">
          <div class="checkbox-prime-wrapper">
            <input class="remember-me-checkbox" type="checkbox" />
            <span>Remember me</span>
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
    <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/img.png" alt="Decorative Flowers" />
  </section>




</div>