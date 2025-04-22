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

      <form onSubmit={onSubmit}>
        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Advanced Settings</h2>
          <hr />
          <table className="form-table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="enable_social_login">
                    Enable Social login
                  </label>
                </th>
                <td>
                  <FormToggle
                    id="enable_social_login"
                    name="enable_social_login"
                    checked={enableSocialLogin}
                    onChange={() => setEnableSocialLogin(!enableSocialLogin)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-submit">
          <table className="form-table">
            <tbody>
              <tr>
                <th></th>
                <td>
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

export default Advanced;
