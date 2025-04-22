// import React, { useEffect, useState } from "react";
// import { FormToggle, Notice } from "@wordpress/components";

const AddOns = () => {
  // const [notice, setNotice] = useState({ message: "", type: "" });
  // // Form Pattern
  // const [formPattern, setFormPattern] = useState("");

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   let formData = new FormData(event.target);

  //   // Form Pattern
  //   formData.append("form_pattern", formPattern);

  //   fetch(LoginPrime.ajaxurl, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json()) // Directly parse JSON if response is correct
  //     .then((data) => {
  //       if (data.success) {
  //         setNotice({
  //           message: "Settings saved successfully!",
  //           type: "success",
  //         });
  //       } else {
  //         setNotice({ message: "Error: " + data.message, type: "error" });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("AJAX Error:", error);
  //       setNotice({ message: "Something went wrong!", type: "error" });
  //     });
  // };
  return (
    <div className="settings-container lp-settings-section lp-settings-setting-section">
      <h1 style={{ textAlign: "center", fontSize: "80px" }}>Coming soon</h1>
    </div>
    // <div className="settings-container">
    //   {notice.message && (
    //     <div className="lp-settings-notification">
    //       <Notice
    //         status={notice.type} // "success" or "error"
    //         onRemove={() => setNotice({ message: "", type: "" })} // Dismiss notice
    //       >
    //         {notice.message}
    //       </Notice>
    //     </div>
    //   )}

    //   <form onSubmit={onSubmit}>
    //     <div className="lp-settings-section lp-settings-setting-section">
    //       <h2>Membership</h2>
    //       <hr />
    //       <table className="form-table">
    //         <tbody>
    //           {/* Enable Registration */}

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Design</label>
    //             </th>
    //             <td>
    //               <select
    //                 name="form_pattern"
    //                 id="form_pattern"
    //                 className="widefat"
    //                 defaultValue={formPattern} // ✅ Set selected value
    //                 onChange={(e) => setFormPattern(e.target.value)} // ✅ Update state on change
    //               >
    //                 <option value="">Custom</option>
    //                 <option
    //                   selected={formPattern === "template-1"}
    //                   value="template-1"
    //                 >
    //                   Login and Registration Template 01
    //                 </option>
    //                 <option
    //                   selected={formPattern === "template-2"}
    //                   value="template-2"
    //                 >
    //                   Login and Registration Template 02
    //                 </option>
    //               </select>
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Background Color</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Text Color</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Border </label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //                 className="widefat"
    //                 placeholder="Ex. 2px solid #5c5c5c"
    //               />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Height (px) </label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //               />
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="lp-settings-section lp-settings-setting-section">
    //       <h2>Verification</h2>
    //       <hr />
    //       <table className="form-table">
    //         <tbody>
    //           {/* Enable Registration */}

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Tab background</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Tab Text</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Active Tab Background</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Active Tab Text</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Font Size (px)</label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //               />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Padding </label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //                 className="widefat"
    //                 placeholder="Ex. 10px 10px"
    //               />
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="lp-settings-section lp-settings-setting-section">
    //       <h2>Default Login Page</h2>
    //       <hr />
    //       <table className="form-table">
    //         <tbody>
    //           {/* Enable Registration */}

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Background</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Text</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Image</label>
    //             </th>
    //             <td>
    //               <input type="file" name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Position</label>
    //             </th>
    //             <td>
    //               <select
    //                 name="form_pattern"
    //                 id="form_pattern"
    //                 className="widefat"
    //                 defaultValue={formPattern} // ✅ Set selected value
    //                 onChange={(e) => setFormPattern(e.target.value)} // ✅ Update state on change
    //               >
    //                 <option
    //                   selected={formPattern === "template-1"}
    //                   value="template-1"
    //                 >
    //                   Left
    //                 </option>
    //                 <option
    //                   selected={formPattern === "template-2"}
    //                   value="template-2"
    //                 >
    //                   Right
    //                 </option>
    //               </select>
    //             </td>
    //           </tr>

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Width (%)</label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //               />
    //             </td>
    //           </tr>

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Overlay Color</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Overlay Opacity</label>
    //             </th>
    //             <td>
    //               <input
    //                 name="login_tab_text"
    //                 type="text"
    //                 id="login_tab_text"
    //               />
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="lp-settings-section lp-settings-setting-section">
    //       <h2>Custom User Role</h2>
    //       <hr />
    //       <table className="form-table">
    //         <tbody>
    //           {/* Enable Registration */}

    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Background</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Text</label>
    //             </th>
    //             <td>
    //               <input type="color" value={"#000000"} name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Image</label>
    //             </th>
    //             <td>
    //               <input type="file" name="" id="" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <th>
    //               <label htmlFor="form_pattern">Position</label>
    //             </th>
    //             <td>
    //               <select
    //                 name="form_pattern"
    //                 id="form_pattern"
    //                 className="widefat"
    //                 defaultValue={formPattern} // ✅ Set selected value
    //                 onChange={(e) => setFormPattern(e.target.value)} // ✅ Update state on change
    //               >
    //                 <option
    //                   selected={formPattern === "template-1"}
    //                   value="template-1"
    //                 >
    //                   Left
    //                 </option>
    //                 <option
    //                   selected={formPattern === "template-2"}
    //                   value="template-2"
    //                 >
    //                   Right
    //                 </option>
    //               </select>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="lp-settings-submit">
    //       <table className="form-table">
    //         <tbody>
    //           <tr>
    //             <th></th>
    //             <td>
    //               <button
    //                 className="components-button is-primary"
    //                 type="submit"
    //               >
    //                 Save
    //               </button>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddOns;
