import React, { useEffect, useState } from "react";
import { FormFileUpload, Notice, SVG, Path } from "@wordpress/components";
import { ToastContainer, toast } from "react-toastify";
import MediaUploader from "./MediaUploader";

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
  // Sidebar Position
  const [sidebarPosition, setSidebarPosition] = useState("row");

  const [sidebarBgColor, setSidebarBgColor] = useState("#000000");

  const [sidebarOverlayColor, setSidebarOverlayColor] = useState("#000000");

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // Default color

  const [data, setData] = useState({
    data: {
      form_pattern: "",
      btn_border_width: "",
      header_front_size: "",
      header_tab_padding: "",
      sidebar_background: "",
      sidebar_width: "",
      sidebar_overlay_opacity: "",
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
    setSidebarPosition("row");
    setSidebarBgColor("#000000");
    setSidebarOverlayColor("#000000");

    setData({
      data: {
        form_pattern: "",
        btn_border_width: "",
        header_front_size: "16",
        header_tab_padding: "10px 0",
        sidebar_background: "",
        sidebar_width: "50",
        sidebar_overlay_opacity: "0",
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
        // Sidebar Position
        setSidebarPosition(responseData?.data?.sidebar_position || "");

        setSidebarBgColor(responseData?.data?.sidebar_bg_color || "");

        setSidebarOverlayColor(responseData?.data?.sidebar_overlay_color || "");

        // Sidebar Image
        setImageURL(responseData?.data?.sidebar_background || "");
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const onStyleSubmit = (event) => {
    event.preventDefault();

    // if (!image) {
    //   alert("Please select an image first.");
    //   return;
    // }

    let formData = new FormData(event.target);

    const submittedImageURL = formData.get("sidebar_background");

    formData.append("action", "login_prime_save_style");
    formData.append("_wpnonce", LoginPrime.nonce);
    formData.append("image", image); // ✅ append image file

    // Form Pattern

    fetch(LoginPrime.ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json()) // Directly parse JSON if response is correct
      .then((data) => {
        if (data.success) {
          toast.success("Settings saved successfully!");
          setImageURL(submittedImageURL); // ✅ use correct image URL
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
                    placeholder="Example: 2"
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
                    placeholder="Example: 20"
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
                  <label htmlFor="sidebar_bg_color">Background</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={sidebarBgColor}
                    name="sidebar_bg_color"
                    id="sidebar_bg_color"
                    onChange={(e) => setSidebarBgColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="form_patternasdfadsf">Image</label>
                </th>
                <td>
                  <MediaUploader image={imageURL} setImage={setImageURL} />

                  <input
                    type="hidden"
                    name="sidebar_background"
                    value={imageURL}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="sidebar_position">Position</label>
                </th>
                <td>
                  <select
                    name="sidebar_position"
                    id="sidebar_position"
                    className="widefat"
                    defaultValue={sidebarPosition} // ✅ Set selected value
                    onChange={(e) => setSidebarPosition(e.target.value)} // ✅ Update state on change
                  >
                    <option value="">Set Sidebar Position</option>
                    <option
                      selected={sidebarPosition === "row-reverse"}
                      value="row-reverse"
                    >
                      Left
                    </option>
                    <option selected={sidebarPosition === "row"} value="row">
                      Right
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="sidebar_width">Width (%)</label>
                </th>
                <td>
                  <input
                    name="sidebar_width"
                    type="number"
                    id="sidebar_width"
                    placeholder="Example: 50"
                    defaultValue={data?.data?.sidebar_width || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          sidebar_width: e.target.value,
                        },
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="sidebar_overlay_color">Overlay Color</label>
                </th>
                <td>
                  <input
                    type="color"
                    value={sidebarOverlayColor}
                    name="sidebar_overlay_color"
                    id="sidebar_overlay_color"
                    onChange={(e) => setSidebarOverlayColor(e.target.value)} // Update state on change
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="sidebar_overlay_opacity">
                    Overlay Opacity
                  </label>
                </th>
                <td>
                  <input
                    name="sidebar_overlay_opacity"
                    type="number"
                    id="sidebar_overlay_opacity"
                    placeholder="Example: 0.5"
                    step="any" // Allows decimal values
                    min="-1" // Minimum value allowed
                    max="1" // Optional: maximum value
                    defaultValue={data?.data?.sidebar_overlay_opacity || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          sidebar_overlay_opacity: e.target.value,
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

export default Style;
