import React from "react";
import { FormToggle } from "@wordpress/components";

const Setting = () => {
  const onSubmit = (event) => {
    event.preventDefault();

    // console.log(event);
    let formData = new FormData(event.target);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={onSubmit}>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="blogname">Enable Registration</label>
              </th>
              <td>
                <FormToggle
                  name="enable-registration"
                  checked
                  onChange={() => {}}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="blogname">User Role</label>
              </th>
              <td>
                <select
                  className="regular-text"
                  name="default_role"
                  id="default_role"
                >
                  <option value="">User Role</option>
                  <option defaultValue="selected" value="css_js_designer">
                    Web Designer
                  </option>
                  <option value="shop_manager">Shop manager</option>
                  <option value="customer">Customer</option>
                  <option value="subscriber">Subscriber</option>
                  <option value="contributor">Contributor</option>
                  <option value="author">Author</option>
                  <option value="editor">Editor</option>
                  <option value="administrator">Administrator</option>
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="blogdescription">Plugin Name</label>
              </th>
              <td>
                <input
                  name="plugin_name"
                  type="text"
                  id="plugin_name"
                  className="regular-text"
                />
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
                <button className="components-button is-primary" type="submit">
                  Save
                </button>
                {/* <Button variant="secondary" type="submit">
                  Reset
                </Button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Setting;
