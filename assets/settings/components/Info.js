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

      <div className="lp-settings-section lp-settings-setting-section">
        <h2>Info Settings</h2>
        <hr />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          amet labore dignissimos alias quos vel enim repudiandae, minus atque
          dicta explicabo blanditiis quisquam. Aliquam, aut. Delectus vel odit
          deserunt mollitia. Voluptatum earum ipsa rem quos soluta commodi neque
          aliquam id necessitatibus, molestias quam tempora doloremque adipisci
          inventore a. Earum et voluptatum magnam eveniet voluptas nemo odio
          inventore natus enim aperiam! Suscipit odit pariatur fugiat possimus
          voluptatibus dolorum nesciunt, tempora repellendus, minus laboriosam
          similique incidunt quaerat aliquid modi est ea nostrum vitae quae
          natus perferendis omnis dicta debitis placeat. Eum, tempora.
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          amet labore dignissimos alias quos vel enim repudiandae, minus atque
          dicta explicabo blanditiis quisquam. Aliquam, aut. Delectus vel odit
          deserunt mollitia. Voluptatum earum ipsa rem quos soluta commodi neque
          aliquam id necessitatibus, molestias quam tempora doloremque adipisci
          inventore a. Earum et voluptatum magnam eveniet voluptas nemo odio
          inventore natus enim aperiam! Suscipit odit pariatur fugiat possimus
          voluptatibus dolorum nesciunt, tempora repellendus, minus laboriosam
          similique incidunt quaerat aliquid modi est ea nostrum vitae quae
          natus perferendis omnis dicta debitis placeat. Eum, tempora.
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          amet labore dignissimos alias quos vel enim repudiandae, minus atque
          dicta explicabo blanditiis quisquam. Aliquam, aut. Delectus vel odit
          deserunt mollitia. Voluptatum earum ipsa rem quos soluta commodi neque
          aliquam id necessitatibus, molestias quam tempora doloremque adipisci
          inventore a. Earum et voluptatum magnam eveniet voluptas nemo odio
          inventore natus enim aperiam! Suscipit odit pariatur fugiat possimus
          voluptatibus dolorum nesciunt, tempora repellendus, minus laboriosam
          similique incidunt quaerat aliquid modi est ea nostrum vitae quae
          natus perferendis omnis dicta debitis placeat. Eum, tempora.
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          amet labore dignissimos alias quos vel enim repudiandae, minus atque
          dicta explicabo blanditiis quisquam. Aliquam, aut. Delectus vel odit
          deserunt mollitia. Voluptatum earum ipsa rem quos soluta commodi neque
          aliquam id necessitatibus, molestias quam tempora doloremque adipisci
          inventore a. Earum et voluptatum magnam eveniet voluptas nemo odio
          inventore natus enim aperiam! Suscipit odit pariatur fugiat possimus
          voluptatibus dolorum nesciunt, tempora repellendus, minus laboriosam
          similique incidunt quaerat aliquid modi est ea nostrum vitae quae
          natus perferendis omnis dicta debitis placeat. Eum, tempora.
        </p>
      </div>
    </div>
  );
};

export default Info;
