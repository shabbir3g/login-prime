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

  const [inputBorderType, setInputBorderType] = useState("none");
  const [inputBorderColor, setInputBorderColor] = useState("#6a5af9");

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
      input_height: "",
      input_width: "",
      input_padding: "",
      input_border_width: "",
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
    setInputBorderColor("");
    setBtnBorderType("");
    setInputBorderType("");
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
        input_height: "",
        input_width: "",
        input_padding: "",
        input_border_width: "",
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
        setInputBorderType(responseData?.data?.input_border_type || "");

        setBtnBorderColor(responseData?.data?.btn_border_color || "");
        setInputBorderColor(responseData?.data?.input_border_color || "");
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
                    <label htmlFor="form_pattern">Form Pattern</label>
                    <span className="badge">Popular</span>
                  </h3>
                  <p>Select how your form pattern will be styled</p>
                </div>
                <div className="select-container">
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
                      Form With Sidebar Template
                    </option>
                    <option
                      selected={formPattern === "template-2"}
                      value="template-2"
                    >
                      Form Without Tabs
                    </option>
                    <option
                      selected={formPattern === "template-3"}
                      value="template-3"
                    >
                      Form with Links
                    </option>
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_bg_color">Background Color</label>
                  </h3>
                  <p>Choose the background color for the button style.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={btnBgColor}
                    name="btn_bg_color"
                    id="btn_bg_color"
                    onChange={(e) => setBtnBgColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_text_color">Text Color</label>
                  </h3>
                  <p>Set the color of the button text.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={btnTextColor}
                    name="btn_text_color"
                    id="btn_text_color"
                    onChange={(e) => setBtnTextColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="hover_btn_bg">Hover Background</label>
                  </h3>
                  <p>
                    Choose a background color for the button when hovered over
                  </p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={hoverBtnBg}
                    name="hover_btn_bg"
                    id="hover_btn_bg"
                    onChange={(e) => setHoverBtnBg(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="hover_btn_text_color">
                      Hover Text Color
                    </label>
                  </h3>
                  <p>Select the text color when the button is hovered</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={hoverBtnTextColor}
                    name="hover_btn_text_color"
                    id="hover_btn_text_color"
                    onChange={(e) => setHoverBtnTextColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_border_width">Border Width (px)</label>
                  </h3>
                  <p>
                    Enter a numeric value for the border thickness in pixels
                    (e.g., 2).
                  </p>
                </div>
                <div className="number-container">
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
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_border_type">Border Style</label>
                  </h3>
                  <p>
                    Select a style for the button border (e.g., solid, dashed,
                    none).
                  </p>
                </div>
                <div className="select-container">
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
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_border_color">Border Color</label>
                  </h3>
                  <p>Choose a color for the button border.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={btnBorderColor}
                    name="btn_border_color"
                    id="btn_border_color"
                    onChange={(e) => setBtnBorderColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span class="dashicons dashicons-editor-kitchensink"></span>
              </div>
              <h2>Input Design Style</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_height">Input Height (px) </label>
                  </h3>
                  <p>
                    Enter the height of the input field in pixels (e.g., 80).
                  </p>
                </div>
                <div className="number-container">
                  <input
                    name="input_height"
                    type="number"
                    placeholder="Ex: 80"
                    id="input_height"
                    defaultValue={data?.data?.input_height || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          input_height: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_width">Input Width (In %)</label>
                  </h3>
                  <p>
                    Define the width of the input field as a percentage of its
                    container (e.g., 80).
                  </p>
                </div>
                <div className="number-container">
                  <input
                    name="input_width"
                    type="number"
                    // className="widefat"
                    id="input_width"
                    placeholder="Ex: 80"
                    defaultValue={data?.data?.input_width || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          input_width: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_padding">Input Padding</label>
                  </h3>
                  <p>
                    Use two values: the first for top-bottom and the second for
                    left-right padding (e.g., 10px 10px).
                  </p>
                </div>
                <div className="number-container">
                  <input
                    name="input_padding"
                    type="text"
                    className="widefat"
                    id="input_padding"
                    placeholder="Ex: 10px 10px"
                    defaultValue={data?.data?.input_padding || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          input_padding: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="btn_text_color">Text Color</label>
                  </h3>
                  <p>Choose the color for the text inside the input field.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={btnTextColor}
                    name="btn_text_color"
                    id="btn_text_color"
                    onChange={(e) => setBtnTextColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="hover_btn_bg">Hover Background</label>
                  </h3>
                  <p>
                    Select the background color that appears when the input is
                    hovered over.
                  </p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={hoverBtnBg}
                    name="hover_btn_bg"
                    id="hover_btn_bg"
                    onChange={(e) => setHoverBtnBg(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="hover_btn_text_color">
                      Hover Text Color
                    </label>
                  </h3>
                  <p>Set the text color when the input is hovered over.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={hoverBtnTextColor}
                    name="hover_btn_text_color"
                    id="hover_btn_text_color"
                    onChange={(e) => setHoverBtnTextColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_border_width">
                      Border Width (px)
                    </label>
                  </h3>
                  <p>
                    Enter a numeric value for the border thickness in pixels
                    (e.g., 2).
                  </p>
                </div>
                <div className="number-container">
                  <input
                    name="input_border_width"
                    type="number"
                    placeholder="Example: 2"
                    id="input_border_width"
                    defaultValue={data?.data?.input_border_width || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        data: {
                          ...data.data,
                          input_border_width: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_border_type">Border Style</label>
                  </h3>
                  <p>
                    Select a style for the button border (e.g., solid, dashed,
                    none).
                  </p>
                </div>
                <div className="select-container">
                  <select
                    name="input_border_type"
                    id="input_border_type"
                    className="widefat"
                    defaultValue={inputBorderType} // ✅ Set selected value
                    onChange={(e) => setInputBorderType(e.target.value)} // ✅ Update state on change
                  >
                    <option selected={inputBorderType === "none"} value="none">
                      None
                    </option>
                    <option
                      selected={inputBorderType === "solid"}
                      value="solid"
                    >
                      Solid
                    </option>
                    <option
                      selected={inputBorderType === "dotted"}
                      value="dotted"
                    >
                      Dotted
                    </option>
                    <option
                      selected={inputBorderType === "dashed"}
                      value="dashed"
                    >
                      Dashed
                    </option>
                    <option
                      selected={inputBorderType === "double"}
                      value="double"
                    >
                      Double
                    </option>
                    <option
                      selected={inputBorderType === "groove"}
                      value="groove"
                    >
                      Groove
                    </option>
                    <option
                      selected={inputBorderType === "ridge"}
                      value="ridge"
                    >
                      Ridge
                    </option>
                    <option
                      selected={inputBorderType === "inset"}
                      value="inset"
                    >
                      Inset
                    </option>
                    <option
                      selected={inputBorderType === "outset"}
                      value="outset"
                    >
                      Outset
                    </option>
                    <option
                      selected={inputBorderType === "hidden"}
                      value="hidden"
                    >
                      Hidden
                    </option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="input_border_color">Border Color</label>
                  </h3>
                  <p>Choose a color for the button border.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={inputBorderColor}
                    name="input_border_color"
                    id="input_border_color"
                    onChange={(e) => setInputBorderColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span
                  class="dashicons dashicons-schedule
"
                ></span>
              </div>
              <h2>Header Tab Setting</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_tab_bg">Tab background</label>
                  </h3>
                  <p>Choose the background color for tabs.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={headerTabBg}
                    name="header_tab_bg"
                    id="header_tab_bg"
                    onChange={(e) => setHeaderTabBg(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_tab_text">Tab Text</label>
                  </h3>
                  <p>Select the text color for tabs</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={headerTabText}
                    name="header_tab_text"
                    id="header_tab_text"
                    onChange={(e) => setHeaderTabText(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_active_tab_bg">
                      Active Tab Background
                    </label>
                  </h3>
                  <p>Choose the background color for the active tab.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={headerActiveTabBg}
                    name="header_active_tab_bg"
                    id="header_active_tab_bg"
                    onChange={(e) => setHeaderActiveTabBg(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_active_tab_text">
                      Active Tab Text
                    </label>
                  </h3>
                  <p>Set the text color for the active tab.</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={headerActiveTabText}
                    name="header_active_tab_text"
                    id="header_active_tab_text"
                    onChange={(e) => setHeaderActiveTabText(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_front_size">Font Size (px)</label>
                  </h3>
                  <p>Enter the font size for tab text in pixels (e.g., 20).</p>
                </div>
                <div className="number-container">
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
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="header_tab_padding">Padding </label>
                  </h3>
                  <p>
                    Define space inside the tab using top-bottom and left-right
                    values (e.g., 12px 13px).
                  </p>
                </div>
                <div className="number-container">
                  <input
                    name="header_tab_padding"
                    type="text"
                    className="widefat"
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
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon">
                <span class="dashicons dashicons-table-col-before"></span>
              </div>
              <h2>Sidebar Style Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="sidebar_bg_color">Background</label>
                  </h3>
                  <p>Select a background color for the sidebar</p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={sidebarBgColor}
                    name="sidebar_bg_color"
                    id="sidebar_bg_color"
                    onChange={(e) => setSidebarBgColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="form_patternasdfadsf">Image</label>
                  </h3>
                  <p>Optionally upload a background image for the sidebar.</p>
                </div>
                <div className="color-container">
                  <MediaUploader image={imageURL} setImage={setImageURL} />

                  <input
                    type="hidden"
                    name="sidebar_background"
                    value={imageURL}
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="sidebar_position">Position</label>
                  </h3>
                  <p>
                    Choose the position of the sidebar on the screen (e.g., left
                    or right).
                  </p>
                </div>
                <div className="select-container">
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
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="sidebar_width">Width (%)</label>
                  </h3>
                  <p>
                    Set the width of the sidebar as a percentage of the screen
                    (e.g., 50).
                  </p>
                </div>
                <div className="number-container">
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
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="sidebar_overlay_color">Overlay Color</label>
                  </h3>
                  <p>
                    Pick a color to overlay on the background image or color.
                  </p>
                </div>
                <div className="color-container">
                  <input
                    type="color"
                    value={sidebarOverlayColor}
                    name="sidebar_overlay_color"
                    id="sidebar_overlay_color"
                    onChange={(e) => setSidebarOverlayColor(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>
                    <label htmlFor="sidebar_overlay_opacity">
                      Overlay Opacity
                    </label>
                  </h3>
                  <p>
                    Set how transparent the overlay is (0 = fully transparent, 1
                    = fully opaque)
                  </p>
                </div>
                <div className="number-container">
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
      </form>
    </div>
  );
};

export default Style;
