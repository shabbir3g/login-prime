import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";

const Info = () => {
  const [notice, setNotice] = useState({ message: "", type: "" });
  // Form Pattern
  const [formPattern, setFormPattern] = useState("");

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
  return (
    <div className="settings-container">
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

      <div className="">
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
                    <span className="status-indicator status-active"></span>
                    User Registration
                    <span className="badge">Popular</span>
                  </h3>
                  <p>Allow new users to register accounts on your website</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <span className="status-indicator status-inactive"></span>
                    Dark Mode
                  </h3>
                  <p>Enable dark color scheme for all login interfaces</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input type="checkbox" />
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
                  <select>
                    <option selected>Administrator</option>
                    <option>Editor</option>
                    <option>Author</option>
                    <option>Contributor</option>
                    <option>Subscriber</option>
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Auto-Login</h3>
                  <p>Automatically authenticate users after registration</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Password Recovery</h3>
                  <p>Allow users to reset forgotten passwords</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
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
                  <h3>Post-Login Redirect</h3>
                  <p>Destination after successful authentication</p>
                </div>
                <div className="select-container">
                  <select>
                    <option selected>Dashboard</option>
                    <option>Homepage</option>
                    <option>Profile Page</option>
                    <option>Custom URL</option>
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Login Page Style</h3>
                  <p>Interface presentation for authentication</p>
                </div>
                <div className="select-container">
                  <select>
                    <option selected>Default Page</option>
                    <option>Custom Template</option>
                    <option>Modal Popup</option>
                    <option>Fullscreen Overlay</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary">
              <span>Save Changes</span>
            </button>
            <button className="btn btn-outline">
              <span>Restore Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
