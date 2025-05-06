import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";

const Advanced = () => {
  const [notice, setNotice] = useState({ message: "", type: "" });
  // Form Pattern
  const [enableSocialLogin, setEnableSocialLogin] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    // Form Pattern
    formData.append("form_pattern", formPattern);

    fetch(LoginPrime.ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json()) // Directly parse JSON if response is correct
      .then((data) => {
        if (data.success) {
          setNotice({
            message: "Settings saved successfully!",
            type: "success",
          });
        } else {
          setNotice({ message: "Error: " + data.message, type: "error" });
        }
      })
      .catch((error) => {
        console.error("AJAX Error:", error);
        setNotice({ message: "Something went wrong!", type: "error" });
      });
  };

  const resetForm = () => {
    setEnableSocialLogin(false);

    setNotice({
      message:
        "All data has been reset. Please click the ‘Save’ button to preserve your changes.",
      type: "info",
    });
  };
  return (
    <div className="settings-container">
      <form onSubmit={onSubmit}>
        <div className="settings-container">
          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span class="dashicons dashicons-editor-unlink"></span>
              </div>
              <h2>Button Design Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="enable_social_login">
                      <span
                        className={`status-indicator status-${
                          enableSocialLogin ? "active" : "inactive"
                        }`}
                      ></span>
                      Enable Social login
                    </label>
                    <span className="badge">Popular</span>
                  </h3>
                  <p>Allow new users to register accounts on your website</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="enable_social_login"
                      name="enable_social_login"
                      checked={setEnableSocialLogin}
                      onChange={() => setEnableSocialLogin(!enableSocialLogin)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
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
      </form>
    </div>
  );
};

export default Advanced;
