import { useRef } from "react";

const MediaUploader = ({ image, setImage }) => {
  const mediaFrameRef = useRef(null);

  const openMediaLibrary = () => {
    if (mediaFrameRef.current) {
      mediaFrameRef.current.open();
      return;
    }

    mediaFrameRef.current = window.wp.media({
      title: "Select Image",
      button: { text: "Use this image" },
      multiple: false,
    });

    mediaFrameRef.current.on("select", () => {
      const attachment = mediaFrameRef.current
        .state()
        .get("selection")
        .first()
        .toJSON();
      setImage(attachment.url); // Set image URL in parent component or state
    });

    mediaFrameRef.current.open();
  };

  // Handle close button click (clear image)
  const handleCloseImage = () => {
    setImage(null); // This will clear the image URL
  };

  return (
    <div className="components-form-file-upload">
      <button
        class="components-button is-next-40px-default-size has-text has-icon"
        type="button"
        onClick={openMediaLibrary}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18.5 15v3.5H13V6.7l4.5 4.1 1-1.1-6.2-5.8-5.8 5.8 1 1.1 4-4v11.7h-6V15H4v5h16v-5z"></path>
        </svg>
        Select Image
      </button>
      <div className="sidebar-image">
        <button onClick={handleCloseImage} className="closebtn">
          X
        </button>

        {image && <img src={image} alt="Selected" style={{ width: 100 }} />}
      </div>
    </div>
  );
};

export default MediaUploader;
