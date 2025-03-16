import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";
import { ToastContainer, toast } from "react-toastify";

const Setting = () => {
  // Enable Registration
  const [enableRegistration, setEnableRegistration] = useState(false);

  // Load all User Role
  const [userRoles, setUserRoles] = useState([]);
  // User Role
  const [userRole, setUserRole] = useState("subscriber");
  // Auto Login User on Sign Up
  const [autoLoginUserSignUp, setAutoLoginUserSignUp] = useState(false);
  // Handle Reset Password
  const [handleResetPassword, setHandleResetPassword] = useState(false);
  // Form Pattern
  const [formPattern, setFormPattern] = useState("");
  // All pages load
  const [pages, setPages] = useState([]);
  //Login Redirect
  const [loginRedirect, setLoginRedirect] = useState("");
  //Register Redirect
  const [registerRedirect, setRegisterRedirect] = useState("");
  //Logout Redirect
  const [logoutRedirect, setLogoutRedirect] = useState("");

  const [data, setData] = useState({
    data: { plugin_name: "", user_role: "" },
  });
  const [notice, setNotice] = useState({ message: "", type: "" });

  // const notify = () => toast("Wow so easy!");

  const resetForm = () => {
    setEnableRegistration(false);
    setUserRole("subscriber");
    setAutoLoginUserSignUp(false);
    setHandleResetPassword(false);
    setFormPattern("");
    setLoginRedirect("");
    setRegisterRedirect("");
    setLogoutRedirect("");

    // setData({ data: { plugin_name: "", user_role: "" } });
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
          setPages(data.data); // Set pages in state
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
        setFormPattern(responseData?.data?.form_pattern || "");

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

    // User Role
    formData.append("user_role", userRole);
    formData.append(
      "auto_login_user_on_signup",
      autoLoginUserSignUp ? "1" : "0"
    );

    // Handle Reset Password
    formData.append("handle_reset_password", handleResetPassword ? "1" : "0");

    // Form Pattern
    formData.append("form_pattern", formPattern);

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
      <ToastContainer position="top-right" autoClose={3000} />
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
        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Settings</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}
              <tr>
                <th>
                  <label htmlFor="enable_registration">
                    Enable Registration
                  </label>
                </th>
                <td>
                  <FormToggle
                    id="enable_registration"
                    name="enable_registration"
                    checked={enableRegistration}
                    onChange={() => setEnableRegistration(!enableRegistration)}
                  />
                </td>
              </tr>

              {/* User Role */}
              <tr>
                <th>
                  <label htmlFor="user_role">User Role</label>
                </th>
                <td>
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
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="auto_login_user_on_signup">
                    Auto Login User on Sign Up
                  </label>
                </th>
                <td>
                  <FormToggle
                    id="auto_login_user_on_signup"
                    name="auto_login_user_on_signup"
                    checked={autoLoginUserSignUp}
                    onChange={() =>
                      setAutoLoginUserSignUp(!autoLoginUserSignUp)
                    }
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="handle_reset_password">
                    Handle Reset Password
                  </label>
                </th>
                <td>
                  <FormToggle
                    id="handle_reset_password"
                    name="handle_reset_password"
                    checked={handleResetPassword}
                    onChange={() =>
                      setHandleResetPassword(!handleResetPassword)
                    }
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="form_pattern">Form Pattern</label>
                </th>
                <td>
                  <select
                    name="form_pattern"
                    id="form_pattern"
                    className="widefat"
                    defaultValue={formPattern} // ✅ Set selected value
                    onChange={(e) => setFormPattern(e.target.value)} // ✅ Update state on change
                  >
                    <option value="">
                      Separate Login and Registration Forms
                    </option>
                    <option
                      selected={formPattern === "template-1"}
                      value="template-1"
                    >
                      Login and Registration Template 01
                    </option>
                    <option
                      selected={formPattern === "template-2"}
                      value="template-2"
                    >
                      Login and Registration Template 02
                    </option>
                    <option
                      selected={formPattern === "template-3"}
                      value="template-3"
                    >
                      Login and Registration Template 03
                    </option>
                    <option
                      selected={formPattern === "template-4"}
                      value="template-4"
                    >
                      Login and Registration Template 04
                    </option>
                    <option
                      selected={formPattern === "template-5"}
                      value="template-5"
                    >
                      Login and Registration Template 05
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Redirects</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}
              <tr>
                <th>
                  <label htmlFor="login_redirect">Login Redirect</label>
                </th>
                <td>
                  <select
                    name="login_redirect"
                    id="login_redirect"
                    className="widefat"
                    value={loginRedirect}
                    onChange={(e) => setLoginRedirect(e.target.value)}
                  >
                    <option value="">Select a Page</option>
                    {pages.map((page) => (
                      <option key={page.ID} value={page.ID}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="register_redirect">Register Redirect</label>
                </th>
                <td>
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="logout_redirect">Logout Redirect</label>
                </th>
                <td>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Texts</h2>
          <p>Leave text empty to remove element</p>
          <hr />
          <table className="form-table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="login_tab_text">Login Tab Text</label>
                </th>
                <td>
                  <input
                    name="login_tab_text"
                    type="text"
                    id="login_tab_text"
                    className="widefat"
                    defaultValue={data?.data?.login_tab_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: { ...data.data, login_tab_text: e.target.value },
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="register_tab_text">Register Tab Text</label>
                </th>
                <td>
                  <input
                    name="register_tab_text"
                    type="text"
                    id="register_tab_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="login_button_text">Login Button Text</label>
                </th>
                <td>
                  <input
                    name="login_button_text"
                    type="text"
                    id="login_button_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="register_button_text">
                    Register Button Text
                  </label>
                </th>
                <td>
                  <input
                    name="register_button_text"
                    type="text"
                    id="register_button_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="reset_password_button_text">
                    Reset Password Button Text
                  </label>
                </th>
                <td>
                  <input
                    name="reset_password_button_text"
                    type="text"
                    id="reset_password_button_text"
                    className="widefat"
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Login Tab</h2>
          <hr />
          <table className="form-table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="username_label_text">
                    Username/Email - Label Text
                  </label>
                </th>
                <td>
                  <input
                    name="username_label_text"
                    type="text"
                    id="username_label_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="username_placeholder_text">
                    Username/Email - Placeholder Text
                  </label>
                </th>
                <td>
                  <input
                    name="username_placeholder_text"
                    type="text"
                    id="username_placeholder_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password_label_text">
                    Password - Label Text
                  </label>
                </th>
                <td>
                  <input
                    name="password_label_text"
                    type="text"
                    id="password_label_text"
                    className="widefat"
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
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password_placeholder_text">
                    Password - Placeholder Text
                  </label>
                </th>
                <td>
                  <input
                    name="password_placeholder_text"
                    type="text"
                    id="password_placeholder_text"
                    className="widefat"
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
                </td>
              </tr>
            </tbody>
          </table>
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
        <div className="lp-settings-submit">
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
        </div>
      </form>
    </div>
  );
};

export default Setting;
