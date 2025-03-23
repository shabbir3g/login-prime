<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';
$datastyle = get_option( 'login_prime_style_settings', []);

?>
    
    <div class="back-login-container">


      <section class="form-section">
        <div class="form-container">
          <h1> <?php echo $is_register ? (isset($data['registration_form_header_text']) && ($data['registration_form_header_text'] !="")  ? $data['registration_form_header_text'] : 'Welcome Back  👋') : (isset($data['login_form_header_text']) && ($data['login_form_header_text'] !="")  ? $data['login_form_header_text'] : 'Welcome Back  👋'); ?></h1>
          
          <?php if (!$is_register): ?>
          <p class="login-sub-title">
          <?php echo isset($data['login_form_subheader_text']) && ($data['login_form_subheader_text'] !="") ? $data['login_form_subheader_text'] : 'Enter your Credentials to access your account'; ?>
          </p>
          <?php endif; ?>
          <!-- social login -->
          <div class="social-login social-login-direction">
            <div class="social-button">
              <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/google.png" alt="Google Logo" />
              Sign in with Google
            </div>
            <div class="social-button">
              <img
                src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/facebook.png"
                alt="Facebook Logo"
              />
              Sign in with Facebook
            </div>
          </div>

          <?php if ($is_register): ?>
            <form>
              <label for="">Firstname</label>
              <input
                type="text"
                id=""
                placeholder="Your first name"
                required
              />
              <label for="">Lastname</label>
              <input
                type="text"
                id=""
                placeholder="Your last name"
                required
              />

              <label for="">Username</label>
              <input
                type="text"
                id=""
                placeholder="@username"
                required
              />

              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Example@email.com"
                required
              />
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="At least 8 characters"
                required
              />
              <label for="password">Confirm Password</label>
              <input
                type="password"
                id=""
                placeholder="Confirm Password"
                required
              />
              <div class="checkbox-prime-container">
                  <div class="checkbox-prime-wrapper">
                  <input class="remember-me-checkbox" type="checkbox" />
                  <span>Remember me</span>
                </div>
                <div style="width: 100%">
                  <a href="#" class="forgot-password">Forgot Password?</a>
                </div>
              </div>
              <button type="submit" class="submit-button">
                <?php echo isset($data['register_button_text']) && ($data['register_button_text'] !="") ? $data['register_button_text'] : 'Register'; ?>
              </button>
              </form>
              <p>
              Don't have an account?
              <a href="?register=false">Login</a>
              </p>

          <?php else: ?>

          <form class="lp-demo-5-from">
            <label for="email">
              <?php echo isset($data['username_label_text']) && $data['username_label_text'] != "" ? $data['username_label_text'] : 'Email'; ?>
            </label>
            <input
              type="email"
              id="email"
              placeholder="<?php echo isset($data['username_placeholder_text']) && $data['username_placeholder_text'] != "" ? $data['username_placeholder_text'] : 'Email Or Username'; ?>"
              required
            />
            <label for="password">
              <?php echo isset($data['password_label_text']) && $data['password_label_text'] != "" ? $data['password_label_text'] : 'Password'; ?>
            </label>
            <input
              type="password"
              id="password"
              placeholder="<?php echo isset($data['password_placeholder_text']) && $data['password_placeholder_text'] != "" ? $data['password_placeholder_text'] : 'At least 8 characters'; ?>"
              required
            />
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
            <img src="<?php echo esc_url(LOGIN_PRIME_URL . 'includes/Frontend/templates/images/login-art.png'); ?>" alt="Decorative Flowers" />
          
        <?php endif; ?>
        <div class="overlay"></div> <!-- Overlay div here -->


      </section>

    </div>
