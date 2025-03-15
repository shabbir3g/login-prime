import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";

const Setting = () => {
  const [enableRegistration, setEnableRegistration] = useState(false);
  const [userRole, setUserRole] = useState(""); // ✅ Store selected role
  const [data, setData] = useState({
    data: { plugin_name: "", user_role: "" },
  });
  const [notice, setNotice] = useState({ message: "", type: "" });

  useEffect(() => {
    fetch(LoginPrime.ajaxurl + "?action=login_prime_get_settings")
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);
        setEnableRegistration(responseData?.data?.enable_registration === "1"); // ✅ Convert string "1" to true, otherwise false
        setUserRole(responseData?.data?.user_role || ""); // ✅ Set default selected value
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    formData.append("action", "login_prime_save_settings");
    formData.append("_wpnonce", LoginPrime.nonce);
    formData.append("enable_registration", enableRegistration ? "1" : "0");
    formData.append("user_role", userRole); // ✅ Submitting selected role

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
          <h2>Settings</h2>
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
                    <option defaultValue="">Select User Role</option>

                    <option
                      selected={userRole === "contributor"}
                      defaultValue="contributor"
                    >
                      Contributor
                    </option>
                    <option
                      selected={userRole === "author"}
                      defaultValue="author"
                    >
                      Author
                    </option>
                    <option
                      selected={userRole === "editor"}
                      defaultValue="editor"
                    >
                      Editor
                    </option>
                    <option
                      selected={userRole === "administrator"}
                      defaultValue="administrator"
                    >
                      Administrator
                    </option>
                  </select>
                </td>
              </tr>

              {/* Plugin Name */}
              <tr>
                <th>
                  <label htmlFor="plugin_name">Plugin Name</label>
                </th>
                <td>
                  <input
                    name="plugin_name"
                    type="text"
                    id="plugin_name"
                    className="widefat"
                    defaultValue={data?.data?.plugin_name || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: { ...data.data, plugin_name: e.target.value },
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-section lp-settings-redirects-section">
          <h2>Redirects</h2>
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
                    <option defaultValue="">Select User Role</option>
                    <option
                      selected={userRole === "css_js_designer"}
                      defaultValue="css_js_designer"
                    >
                      Web Designer
                    </option>
                    <option
                      selected={userRole === "shop_manager"}
                      defaultValue="shop_manager"
                    >
                      Shop Manager
                    </option>
                    <option
                      selected={userRole === "customer"}
                      defaultValue="customer"
                    >
                      Customer
                    </option>
                    <option
                      selected={userRole === "subscriber"}
                      defaultValue="subscriber"
                    >
                      Subscriber
                    </option>
                    <option
                      selected={userRole === "contributor"}
                      defaultValue="contributor"
                    >
                      Contributor
                    </option>
                    <option
                      selected={userRole === "author"}
                      defaultValue="author"
                    >
                      Author
                    </option>
                    <option
                      selected={userRole === "editor"}
                      defaultValue="editor"
                    >
                      Editor
                    </option>
                    <option
                      selected={userRole === "administrator"}
                      defaultValue="administrator"
                    >
                      Administrator
                    </option>
                  </select>
                </td>
              </tr>

              {/* Plugin Name */}
              <tr>
                <th>
                  <label htmlFor="plugin_name">Plugin Name</label>
                </th>
                <td>
                  <input
                    name="plugin_name"
                    type="text"
                    id="plugin_name"
                    className="widefat"
                    defaultValue={data?.data?.plugin_name || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: { ...data.data, plugin_name: e.target.value },
                      })
                    }
                  />
                </td>
              </tr>

              {/* Submit Button */}
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

export default Setting;
