import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setStoreId(data.data.storeId);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setHasChanges(!!selectedImage);
  }, [selectedImage]);

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setSelectedImage(file);
    setSuccess(false);
  };

  const addImage = async () => {
    if (!storeId) {
      setError("Store ID is missing. Please try again.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("banner", selectedImage);
      formData.append("storeId", storeId);

      console.log("Form Data:", { banner: selectedImage, storeId });

      const response = await axios.post(
        "http://localhost:4000/upload-banners",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(response.data);
      setSuccess(true);

      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section>
      <label>
        <p className="font-bold">Upload & Update Your Store Banner Here!</p>{" "}
        <br />
        <input
          type="file"
          id="imageInput"
          name="image"
          onChange={onSelectFile}
          accept="image/png, image/jpeg, image/webp"
          single
        />
      </label>
      <br />

      {/* Display error message if there's an error */}
      {error && <div className="error">{error}</div>}

      {/* Display success message if upload is successful */}
      {success && (
        <div className="success-message">Image uploaded successfully!</div>
      )}

      {/* Display preview of selected image */}
      {previewImage && (
        <div className="preview-container">
          <div className="preview-item">
            <img src={previewImage} alt="Preview" className="original-image" />
          </div>
        </div>
      )}

      {/* Button to initiate upload */}
      {hasChanges && (
        <div className="preview-container">
          <button disabled={uploading} onClick={addImage}>
            {uploading ? "Uploading..." : "Update Image"}
          </button>
        </div>
      )}
    </section>
  );
};

export default UploadBanner;
