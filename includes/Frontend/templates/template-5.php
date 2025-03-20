<?php 
$data = get_option( 'login_prime_save_settings', []);

$is_register = isset($_GET['register']) && $_GET['register'] === 'true';

?>
    
    <div class="back-login-container">


      <section class="form-section">
        <div class="form-container">
          <h1>Welcome Back 👋</h1>
          <p class="login-sub-title">
            Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
          </p>
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
        <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/login-art.png" alt="Decorative Flowers" />
      </section>
    </div>
