import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";
import { ToastContainer, toast } from "react-toastify";

const Setting = () => {
  // Enable Registration
  const [enableRegistration, setEnableRegistration] = useState(false);

  // Enable Darkmode
  const [enableDarkmode, setEnableDarkmode] = useState(false);

  // Load all User Role
  const [userRoles, setUserRoles] = useState([]);
  // User Role
  const [userRole, setUserRole] = useState("subscriber");
  // Auto Login User on Sign Up
  const [autoLoginUserSignUp, setAutoLoginUserSignUp] = useState(false);
  // Handle Reset Password
  const [handleResetPassword, setHandleResetPassword] = useState(false);
  // Form Pattern
  // const [formPattern, setFormPattern] = useState("");
  // All pages load
  const [pages, setPages] = useState([]);
  //Login Redirect
  const [loginRedirect, setLoginRedirect] = useState("");
  //Register Redirect
  const [registerRedirect, setRegisterRedirect] = useState("");
  //Logout Redirect
  const [logoutRedirect, setLogoutRedirect] = useState("");

  const [data, setData] = useState({
    data: { plugin_name: "", user_role: "", register_tab_text: "Register" },
  });
  const [notice, setNotice] = useState({ message: "", type: "" });

  // const notify = () => toast("Wow so easy!");

  const resetForm = () => {
    setEnableRegistration(false);
    setUserRole("subscriber");
    setAutoLoginUserSignUp(false);
    setHandleResetPassword(false);
    // setFormPattern("");
    setLoginRedirect("");
    setRegisterRedirect("");
    setLogoutRedirect("");

    setData({
      data: {
        login_form_header_text: "Login",
        login_form_subheader_text: "Welcome to the Login Prime",
        registration_form_header_text: "Registration",
        login_tab_text: "Login",
        register_tab_text: "Register",
        login_button_text: "Login",
        register_button_text: "Register",
        reset_password_button_text: "Forget password",
        username_label_text: "Username/Email",
        username_placeholder_text: "Email Or Username",
        password_label_text: "Password",
        password_placeholder_text: "Password",
      },
    });
    setNotice({
      message:
        "All data has been reset. Please click the ‘Save’ button to preserve your changes.",
      type: "info",
    });
  };

  useEffect(() => {
    // Fetch pages from WordPress
    fetch(`${LoginPrime.ajaxurl}?action=get_all_pages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPages(data?.data); // Set pages in state
        } else {
          console.error("Error fetching pages:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));

    // Fetch WordPress user roles via AJAX
    fetch(`${LoginPrime.ajaxurl}?action=get_all_user_roles`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserRoles(data.data); // Set the user roles
        } else {
          console.error("Error fetching roles:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));

    fetch(LoginPrime.ajaxurl + "?action=login_prime_get_settings")
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);

        // Enable Registration
        setEnableRegistration(responseData?.data?.enable_registration === "1");

        // Enable eDarkmode
        setEnableDarkmode(responseData?.data?.enable_darkmode === "1");
        // User Role
        setUserRole(responseData?.data?.user_role || "");

        // Auto Login User on Sign Up
        setAutoLoginUserSignUp(
          responseData?.data?.auto_login_user_on_signup === "1"
        );

        // Handle Reset Password
        setHandleResetPassword(
          responseData?.data?.handle_reset_password === "1"
        );

        // Form Pattern
        // setFormPattern(responseData?.data?.form_pattern || "");

        // Login Redirect
        setLoginRedirect(responseData?.data?.login_redirect || "");

        // Register Redirect
        setRegisterRedirect(responseData?.data?.register_redirect || "");

        // Logout Redirect
        setLogoutRedirect(responseData?.data?.logout_redirect || "");
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    formData.append("action", "login_prime_save_settings");
    formData.append("_wpnonce", LoginPrime.nonce);

    // Enable Registration
    formData.append("enable_registration", enableRegistration ? "1" : "0");

    // Enable Registration
    formData.append("enable_darkmode", enableDarkmode ? "1" : "0");

    // User Role
    formData.append("user_role", userRole);
    formData.append(
      "auto_login_user_on_signup",
      autoLoginUserSignUp ? "1" : "0"
    );

    // Handle Reset Password
    formData.append("handle_reset_password", handleResetPassword ? "1" : "0");

    // Form Pattern
    // formData.append("form_pattern", formPattern);

    // Login Redirect
    formData.append("login_redirect", loginRedirect);

    // Register Redirect
    formData.append("register_redirect", registerRedirect);

    // Logout Redirect
    formData.append("logout_redirect", logoutRedirect);

    fetch(LoginPrime.ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json()) // Directly parse JSON if response is correct
      .then((data) => {
        if (data.success) {
          toast.success("Settings saved successfully!");
        } else {
          setNotice({ message: "Error: " + data.message, type: "error" });
        }
      })
      .catch((error) => {
        console.error("AJAX Error:", error);
        setNotice({ message: "Something went wrong!", type: "error" });
      });
  };

  return (
    <div className="settings-container">
      <ToastContainer position="bottom-right" autoClose={3000} />
      {/* {notice.message && (
        <div className="lp-settings-notification">
          <Notice
            status={notice.type} // "success" or "error"
            onRemove={() => setNotice({ message: "", type: "" })} // Dismiss notice
          >
            {notice.message}
          </Notice>
        </div>
      )} */}

      <form onSubmit={onSubmit}>
        <div className="settings-container">
          <div className="settings-card">
            <div className="card-header">
              <div className="icon">🔧</div>
              <h2>Core Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="enable_registration">
                      <span
                        className={`status-indicator status-${
                          enableRegistration ? "active" : "inactive"
                        }`}
                      ></span>
                      Enable Registration
                    </label>
                    <span className="badge">Popular</span>
                  </h3>
                  <p>Allow new users to register accounts on your website</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="enable_registration"
                      name="enable_registration"
                      checked={enableRegistration}
                      onChange={() =>
                        setEnableRegistration(!enableRegistration)
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <span
                      className={`status-indicator status-${
                        enableDarkmode ? "active" : "inactive"
                      }`}
                    ></span>
                    <label htmlFor="enable_darkmode">Enable Darkmode</label>
                  </h3>
                  <p>Enable dark color scheme for all login interfaces</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="enable_darkmode"
                      name="enable_darkmode"
                      checked={enableDarkmode}
                      onChange={() => setEnableDarkmode(!enableDarkmode)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Default User Role</h3>
                  <p>Initial permissions assigned to newly registered users</p>
                </div>
                <div className="select-container">
                  <select
                    name="user_role"
                    id="user_role"
                    className="widefat"
                    // defaultValue={data?.data?.user_role || ""}
                    defaultValue={userRole} // ✅ Set selected value
                    onChange={(e) => setUserRole(e.target.value)} // ✅ Update state on change
                  >
                    <option value="">Select User Role</option>
                    {userRoles &&
                      Object.keys(userRoles).map((roleKey) => {
                        const role = userRoles[roleKey];
                        return (
                          <option
                            selected={userRole === roleKey}
                            key={roleKey}
                            value={roleKey}
                          >
                            {role.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="auto_login_user_on_signup">
                      <span
                        className={`status-indicator status-${
                          autoLoginUserSignUp ? "active" : "inactive"
                        }`}
                      ></span>
                      Auto-Login
                    </label>
                  </h3>
                  <p>Automatically authenticate users after registration</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="auto_login_user_on_signup"
                      name="auto_login_user_on_signup"
                      checked={autoLoginUserSignUp}
                      onChange={() =>
                        setAutoLoginUserSignUp(!autoLoginUserSignUp)
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="handle_reset_password">
                      <span
                        className={`status-indicator status-${
                          handleResetPassword ? "active" : "inactive"
                        }`}
                      ></span>
                      Password Recovery
                    </label>
                  </h3>
                  <p>Allow users to reset forgotten passwords</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="handle_reset_password"
                      name="handle_reset_password"
                      checked={handleResetPassword}
                      onChange={() =>
                        setHandleResetPassword(!handleResetPassword)
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-card">
            <div className="card-header">
              <div className="icon">↗️</div>
              <h2>Navigation Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="login_redirect">Login Redirect</label>
                  </h3>
                  <p>Destination after successful authentication</p>
                </div>
                <div className="select-container">
                  <select
                    name="login_redirect"
                    id="login_redirect"
                    value={loginRedirect}
                    onChange={(e) => setLoginRedirect(e.target.value)}
                  >
                    <option value="">Select a Page</option>
                    {console.log(pages)}
                    {pages.map((page) => (
                      <option key={page.ID} value={page.ID}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Register Redirect</h3>
                  <p>Destination after successful Registration</p>
                </div>
                <div className="select-container">
                  <select
                    name="register_redirect"
                    id="register_redirect"
                    className="widefat"
                    value={registerRedirect}
                    onChange={(e) => setRegisterRedirect(e.target.value)}
                  >
                    <option value="">Select a Page</option>
                    {pages.map((page) => (
                      <option key={page.ID} value={page.ID}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Logout Redirect</h3>
                  <p>Destination after successful Logout</p>
                </div>
                <div className="select-container">
                  <select
                    name="logout_redirect"
                    id="logout_redirect"
                    className="widefat"
                    value={logoutRedirect}
                    onChange={(e) => setLogoutRedirect(e.target.value)}
                  >
                    <option value="">Select a Page</option>
                    {pages.map((page) => (
                      <option key={page.ID} value={page.ID}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span class="dashicons dashicons-media-text"></span>
              </div>
              <h2>Texts Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="login_form_header_text">
                      Login Form Header Text
                    </label>
                  </h3>
                  <p>Enter header login form text.</p>
                </div>
                <div className="text-container">
                  <input
                    name="login_form_header_text"
                    type="text"
                    id="login_form_header_text"
                    className="widefat"
                    placeholder="Example: Login"
                    defaultValue={data?.data?.login_form_header_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          login_form_header_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="login_form_subheader_text">
                      Login Form Sub Header Text
                    </label>
                  </h3>
                  <p>Enter sub header login form text</p>
                </div>
                <div className="text-container">
                  <input
                    name="login_form_subheader_text"
                    type="text"
                    id="login_form_subheader_text"
                    className="widefat"
                    placeholder="Example: Welcome to the Login Prime"
                    defaultValue={data?.data?.login_form_subheader_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          login_form_subheader_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="registration_form_header_text">
                      Registration Form Header Text
                    </label>
                  </h3>
                  <p>Enter registration form header text</p>
                </div>
                <div className="text-container">
                  <input
                    name="registration_form_header_text"
                    type="text"
                    id="registration_form_header_text"
                    className="widefat"
                    placeholder="Example: Sign up"
                    defaultValue={
                      data?.data?.registration_form_header_text || ""
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          registration_form_header_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="login_tab_text">Login Tab Text</label>
                  </h3>
                  <p>Enter text for login tab. </p>
                </div>
                <div className="text-container">
                  <input
                    name="login_tab_text"
                    type="text"
                    id="login_tab_text"
                    className="widefat"
                    placeholder="Example: Login"
                    defaultValue={data?.data?.login_tab_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: { ...data.data, login_tab_text: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="register_tab_text">Register Tab Text</label>
                  </h3>
                  <p>Enter text for register tab</p>
                </div>
                <div className="text-container">
                  <input
                    name="register_tab_text"
                    type="text"
                    id="register_tab_text"
                    className="widefat"
                    placeholder="Example: Register"
                    defaultValue={data?.data?.register_tab_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          register_tab_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="login_button_text">Login Button Text</label>
                  </h3>
                  <p>Enter login button text</p>
                </div>
                <div className="text-container">
                  <input
                    name="login_button_text"
                    type="text"
                    id="login_button_text"
                    className="widefat"
                    placeholder="Example: Sign In"
                    defaultValue={data?.data?.login_button_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          login_button_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="register_button_text">
                      Register Button Text
                    </label>
                  </h3>
                  <p>Enter register button text</p>
                </div>
                <div className="text-container">
                  <input
                    name="register_button_text"
                    type="text"
                    id="register_button_text"
                    className="widefat"
                    placeholder="Example: Sign Up"
                    defaultValue={data?.data?.register_button_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          register_button_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="reset_password_button_text">
                      Reset Password Link Text
                    </label>
                  </h3>
                  <p>Enter reset password Link text</p>
                </div>
                <div className="text-container">
                  <input
                    name="reset_password_button_text"
                    type="text"
                    id="reset_password_button_text"
                    className="widefat"
                    placeholder="Example: Forgot Password?"
                    defaultValue={data?.data?.reset_password_button_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          reset_password_button_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span class="dashicons dashicons-image-rotate-right"></span>
              </div>
              <h2>Login Tab Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="username_label_text">
                      Username/Email - Label Text
                    </label>
                  </h3>
                  <p>Enter Username/Email field</p>
                </div>
                <div className="text-container">
                  <input
                    name="username_label_text"
                    type="text"
                    id="username_label_text"
                    className="widefat"
                    placeholder="Example: Email or Username"
                    defaultValue={data?.data?.username_label_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          username_label_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="username_placeholder_text">
                      Username/Email - Placeholder Text
                    </label>
                  </h3>
                  <p>Enter placeholder Text For Username/Email input. </p>
                </div>
                <div className="text-container">
                  <input
                    name="username_placeholder_text"
                    type="text"
                    id="username_placeholder_text"
                    className="widefat"
                    placeholder="Example: example@mail.com"
                    defaultValue={data?.data?.username_placeholder_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          username_placeholder_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="password_label_text">
                      Password - Label Text
                    </label>
                  </h3>
                  <p>Enter password field label. </p>
                </div>
                <div className="text-container">
                  <input
                    name="password_label_text"
                    type="text"
                    id="password_label_text"
                    className="widefat"
                    placeholder="Example: Password"
                    defaultValue={data?.data?.password_label_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          password_label_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="password_placeholder_text">
                      Password - Placeholder Text
                    </label>
                  </h3>
                  <p>Enter placeholder for password input</p>
                </div>
                <div className="text-container">
                  <input
                    name="password_placeholder_text"
                    type="text"
                    id="password_placeholder_text"
                    className="widefat"
                    placeholder="Example: At least 8 characters"
                    defaultValue={data?.data?.password_placeholder_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          password_placeholder_text: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {notice.message && (
            <div className="lp-settings-notification">
              <Notice
                status={notice.type} // "success" or "error"
                onRemove={() => setNotice({ message: "", type: "" })} // Dismiss notice
              >
                {notice.message}
              </Notice>
            </div>
          )}

          <div className="action-buttons">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={resetForm}
            >
              Restore Defaults
            </button>
          </div>
        </div>

        {/* <div className="lp-settings-submit">
          <table className="form-table">
            <tbody>
              <tr>
                <th></th>
                <td>
                  <button
                    type="button"
                    className="components-button button-secondary"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    className="components-button is-primary"
                    type="submit"
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </form>
    </div>
  );
};

export default Setting;
