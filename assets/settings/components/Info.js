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

      <form onSubmit={onSubmit}>
        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Button Design Settings</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}

              <tr>
                <th>
                  <label htmlFor="form_pattern">Design</label>
                </th>
                <td>
                  <select
                    name="form_pattern"
                    id="form_pattern"
                    className="widefat"
                    defaultValue={formPattern} // ✅ Set selected value
                    onChange={(e) => setFormPattern(e.target.value)} // ✅ Update state on change
                  >
                    <option value="">Custom</option>
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
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_pattern">Background Color</label>
                </th>
                <td>
                  <input type="color" value={"#000000"} name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_pattern">Text Color</label>
                </th>
                <td>
                  <input type="color" value={"#000000"} name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_pattern">Border </label>
                </th>
                <td>
                  <input
                    name="login_tab_text"
                    type="text"
                    id="login_tab_text"
                    className="widefat"
                    placeholder="Ex. 2px solid #5c5c5c"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_pattern">Height (px) </label>
                </th>
                <td>
                  <input
                    name="login_tab_text"
                    type="text"
                    id="login_tab_text"
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

export default Info;
