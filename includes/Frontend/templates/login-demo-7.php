<div class="lp-demo-6-container">
  <!-- Image Section -->
  <div class="image-section">
    <img src="<?php echo LOGIN_PRIME_URL  ?>includes/Frontend/templates/images/Illustration.png" alt="Illustration" />
  </div>

  <!-- Form Section -->
  <div class="form-section">
    <h1>Get Started <span>Login Prime</span></h1>
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
    <!--! form -->
    <form class="without-icons">
      <div>
        <label for="">Email</label>
        <div class="form-group">
          <input type="email" placeholder="example@gmail.com" required />
        </div>
      </div>
      <div>
        <label for="">Password</label>
        <div class="form-group">
          <input type="password" placeholder="Password" required />
        </div>
      </div>
      <div class="form-options">
        <label> <input type="checkbox" /> Remember me </label>
        <a href="#">Forgot Password?</a>
      </div>
      <button type="submit" class="submit-button">Login</button>
    </form>
    <div class="register-link">
      Don't have an account? <a href="registration-demo-7.html">Register</a>
    </div>
  </div>
</div>
