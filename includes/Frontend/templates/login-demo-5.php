
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

          <form class="lp-demo-5-from">
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
            <div class="checkbox-prime-container">
                <div class="checkbox-prime-wrapper">
                <input class="remember-me-checkbox" type="checkbox" />
                <span>Remember me</span>
              </div>
              <div style="width: 100%">
                <a href="#" class="forgot-password">Forgot Password?</a>
              </div>
            </div>
            <button type="submit" class="submit-button">Login</button>
          </form>
          <div class="separator">Or</div>

          <p>
            Don't have an account?
            <a href="registration-demo-5.html">Sign up</a>
          </p>
        </div>
      </section>
      <section class="image-section">
        <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/login-art.png" alt="Decorative Flowers" />
      </section>
    </div>
