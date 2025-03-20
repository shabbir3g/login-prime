import React, { useEffect, useState } from "react";
import { FormToggle, Notice } from "@wordpress/components";
import { ToastContainer, toast } from "react-toastify";

const Style = () => {
  const [notice, setNotice] = useState({ message: "", type: "" });
  // Form Pattern
  const [formPattern, setFormPattern] = useState("template-1");
  const [btnBgColor, setBtnBgColor] = useState("#000000");
  const [btnTextColor, setBtnTextColor] = useState("#ffffff");
  const [hoverBtnBg, setHoverBtnBg] = useState("#5948d6");
  const [hoverBtnTextColor, setHoverBtnTextColor] = useState("#ffffff");
  const [btnBorderType, setBtnBorderType] = useState("none");
  const [btnBorderColor, setBtnBorderColor] = useState("#6a5af9");
  const [headerTabBg, setHeaderTabBg] = useState("#ffffff");
  const [headerTabText, setHeaderTabText] = useState("#000000");
  const [headerActiveTabBg, setHeaderActiveTabBg] = useState("#000000");
  const [headerActiveTabText, setHeaderActiveTabText] = useState("#ffffff");

  // Default color

  const [data, setData] = useState({
    data: {
      form_pattern: "",
      btn_border_width: "",
      header_front_size: "",
      header_tab_padding: "",
    },
  });

  const resetForm = () => {
    setFormPattern("template-1");
    setBtnBgColor("#000000");
    setBtnTextColor("#ffffff");
    setHoverBtnBg("#111111");
    setHoverBtnTextColor("#ffffff");
    setBtnBorderColor("#000000");
    setBtnBorderType("");
    setHeaderTabBg("#ffffff");
    setHeaderTabText("#000000");
    setHeaderActiveTabBg("#000000");
    setHeaderActiveTabText("#ffffff");

    setData({
      data: {
        form_pattern: "",
        btn_border_width: "",
        header_front_size: "16",
        header_tab_padding: "10px 0",
      },
    });
    setNotice({
      message:
        "All data has been reset. Please click the ‘Save’ button to preserve your changes.",
      type: "info",
    });
  };

  useEffect(() => {
    fetch(LoginPrime.ajaxurl + "?action=login_prime_get_style")
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);

        // Form Pattern
        setFormPattern(responseData?.data?.form_pattern || "");
        // Form Pattern
        setBtnBgColor(responseData?.data?.btn_bg_color || "");
        setBtnTextColor(responseData?.data?.btn_text_color || "");
        setHoverBtnBg(responseData?.data?.hover_btn_bg || "");
        setHoverBtnTextColor(responseData?.data?.hover_btn_text_color || "");
        // Button Border Type
        setBtnBorderType(responseData?.data?.btn_border_type || "");
        setBtnBorderColor(responseData?.data?.btn_border_color || "");
        setHeaderTabBg(responseData?.data?.header_tab_bg || "");
        setHeaderTabText(responseData?.data?.header_tab_text || "");
        setHeaderActiveTabBg(responseData?.data?.header_active_tab_bg || "");
        setHeaderActiveTabText(
          responseData?.data?.header_active_tab_text || ""
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const onStyleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("action", "login_prime_save_style");
    formData.append("_wpnonce", LoginPrime.nonce);
    // Form Pattern

    fetch(LoginPrime.ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json()) // Directly parse JSON if response is correct
      .then((data) => {
        if (data.success) {
          toast.success("Settings saved successfully!");
        } else {
          toast.error("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("AJAX Error:", error);
        toast.error("Something went wrong!");
      });
  };
  return (
    <div className="settings-container">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <form onSubmit={onStyleSubmit}>
        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Button Design Settings</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}

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
              <tr>
                <th>
                  <label htmlFor="btn_bg_color">Background Color</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={btnBgColor}
                    name="btn_bg_color"
                    id="btn_bg_color"
                    onChange={(e) => setBtnBgColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="btn_text_color">Text Color</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={btnTextColor}
                    name="btn_text_color"
                    id="btn_text_color"
                    onChange={(e) => setBtnTextColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="hover_btn_bg">Hover Background</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={hoverBtnBg}
                    name="hover_btn_bg"
                    id="hover_btn_bg"
                    onChange={(e) => setHoverBtnBg(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="hover_btn_text">Hover Text Color</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={hoverBtnTextColor}
                    name="hover_btn_text_color"
                    id="hover_btn_text_color"
                    onChange={(e) => setHoverBtnTextColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="btn_border_width">Border Width (px)</label>
                </th>
                <td>
                  <input
                    name="btn_border_width"
                    type="number"
                    id="btn_border_width"
                    defaultValue={data?.data?.btn_border_width || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          btn_border_width: e.target.value,
                        },
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="btn_border_type">Border Style</label>
                </th>
                <td>
                  <select
                    name="btn_border_type"
                    id="btn_border_type"
                    className="widefat"
                    defaultValue={btnBorderType} // ✅ Set selected value
                    onChange={(e) => setBtnBorderType(e.target.value)} // ✅ Update state on change
                  >
                    <option selected={btnBorderType === "none"} value="none">
                      None
                    </option>
                    <option selected={btnBorderType === "solid"} value="solid">
                      Solid
                    </option>
                    <option
                      selected={btnBorderType === "dotted"}
                      value="dotted"
                    >
                      Dotted
                    </option>
                    <option
                      selected={btnBorderType === "dashed"}
                      value="dashed"
                    >
                      Dashed
                    </option>
                    <option
                      selected={btnBorderType === "double"}
                      value="double"
                    >
                      Double
                    </option>
                    <option
                      selected={btnBorderType === "groove"}
                      value="groove"
                    >
                      Groove
                    </option>
                    <option selected={btnBorderType === "ridge"} value="ridge">
                      Ridge
                    </option>
                    <option selected={btnBorderType === "inset"} value="inset">
                      Inset
                    </option>
                    <option
                      selected={btnBorderType === "outset"}
                      value="outset"
                    >
                      Outset
                    </option>
                    <option
                      selected={btnBorderType === "hidden"}
                      value="hidden"
                    >
                      Hidden
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="btn_border_color">Border Color </label>
                </th>
                <td>
                  <input
                    type="color"
                    value={btnBorderColor}
                    name="btn_border_color"
                    id="btn_border_color"
                    onChange={(e) => setBtnBorderColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lp-settings-section lp-settings-setting-section">
          <h2>Header Tab Setting</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}

              <tr>
                <th>
                  <label htmlFor="header_tab_bg">Tab background</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={headerTabBg}
                    name="header_tab_bg"
                    id="header_tab_bg"
                    onChange={(e) => setHeaderTabBg(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="header_tab_text">Tab Text</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={headerTabText}
                    name="header_tab_text"
                    id="header_tab_text"
                    onChange={(e) => setHeaderTabText(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="header_active_tab_bg">
                    Active Tab Background
                  </label>
                </th>
                <td>
                  <input
                    type="color"
                    value={headerActiveTabBg}
                    name="header_active_tab_bg"
                    id="header_active_tab_bg"
                    onChange={(e) => setHeaderActiveTabBg(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="header_active_tab_text">
                    Active Tab Text
                  </label>
                </th>
                <td>
                  <input
                    type="color"
                    value={headerActiveTabText}
                    name="header_active_tab_text"
                    id="header_active_tab_text"
                    onChange={(e) => setHeaderActiveTabText(e.target.value)} // Update state on change
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="header_front_size">Font Size (px)</label>
                </th>
                <td>
                  <input
                    name="header_front_size"
                    type="number"
                    id="header_front_size"
                    defaultValue={data?.data?.header_front_size || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          header_front_size: e.target.value,
                        },
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="header_tab_padding">Padding </label>
                </th>
                <td>
                  <input
                    name="header_tab_padding"
                    type="text"
                    id="header_tab_padding"
                    placeholder="Ex: 10px 10px"
                    defaultValue={data?.data?.header_tab_padding || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          header_tab_padding: e.target.value,
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
          <h2>Sidebar Settings</h2>
          <hr />
          <table className="form-table">
            <tbody>
              {/* Enable Registration */}

              <tr>
                <th>
                  <label htmlFor="asdfadsfasd">Background</label>
                </th>
                <td>
                  <input type="color" value={"#000000"} name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="asdfasdfasdfasdf">Text</label>
                </th>
                <td>
                  <input type="color" value={"#000000"} name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_patternasdfadsf">Image</label>
                </th>
                <td>
                  <input type="file" name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_patternwerqwer">Position</label>
                </th>
                <td>
                  <select
                    name="form_patternwerqwer"
                    id="form_patternwerqwer"
                    className="widefat"
                  >
                    <option value="template-1">Left</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="form_patternsd">Width (%)</label>
                </th>
                <td>
                  <input
                    name="form_patternsd"
                    type="text"
                    id="form_patternsd"
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="form_patternOverlay">Overlay Color</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={"#000000"}
                    name="form_patternOverlay"
                    id=""
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="form_patternform_patternOverlay">
                    Overlay Opacity
                  </label>
                </th>
                <td>
                  <input
                    name="form_patternform_patternOverlay"
                    type="text"
                    id="form_patternform_patternOverlay"
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

export default Style;
