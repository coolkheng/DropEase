import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadBanner = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // Define hasChanges state variable

  useEffect(() => {
    setHasChanges(selectedImages.length > 0);
  }, [selectedImages]);

  const onSelectFile = (event) => {
    const files = event.target.files;
    if (files.length + selectedImages.length <= 5) {
      const imageFiles = Array.from(files);
      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...imageUrls]);
      setSelectedImages([...selectedImages, ...imageFiles]);
    } else {
      alert("You can upload a maximum of 5 images.");
    }
  };

  const addImages = async () => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append("banners", image);
      });

      const response = await axios.post("http://localhost:4000/upload-banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSuccess(true);

      // Clear selected images and reset component state
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("An error occurred while uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const deleteHandler = (index) => {
    URL.revokeObjectURL(previewImages[index]);
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
  };

  return (
    <section>
      <label>
        <p className="font-bold">Upload & Update Your Store Banner Here!</p>
        <p className="hint">(You can upload a maximum of 5 images)</p>
        <br />
        <input
          type="file"
          id="imageInput"
          name="image"
          onChange={onSelectFile}
          accept="image/png, image/jpeg, image/webp"
          multiple
        />
      </label>
      <br />

      {/* Display error message if there's an error */}
      {error && <div className="error">{error}</div>}

      {/* Display success message if upload is successful */}
      {success && <div className="success">Images uploaded successfully!</div>}

      {/* Display preview of selected images */}
      {previewImages.map((previewImage, index) => (
        <div className="preview-container" key={index}>
          <div className="preview-item">
            <img src={previewImage} alt="Preview" className="original-image" />
            <button onClick={() => deleteHandler(index)}>Delete Image</button>
          </div>
        </div>
      ))}

      {/* Button to initiate upload */}
      {hasChanges && (
        <div className="preview-container">
          <button disabled={uploading} onClick={addImages}>
            {uploading ? "Uploading..." : "Update Images"}
          </button>
        </div>
      )}
    </section>
  );
};

export default UploadBanner;