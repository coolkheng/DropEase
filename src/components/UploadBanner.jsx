import React, { useState, useEffect } from "react";

const UploadBanner = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
      alert("You can upload maximum of 5 images.");
    }
  };

  const addImages = () => {
    setUploaded(true);
    setHasChanges(false);

    // Reset the input field to allow selecting the same file again
    document.getElementById("imageInput").value = "";
  };

  const deleteHandler = (index) => {
    URL.revokeObjectURL(previewImages[index]);
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
    setUploaded(false);
    setHasChanges(updatedSelectedImages.length > 0);
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

      {previewImages.map((previewImage, index) => (
        <div className="preview-container" key={index}>
          <div className="preview-item">
            <img src={previewImage} alt="Preview" className="original-image" />
            <button onClick={() => deleteHandler(index)}>Delete Image</button>
          </div>
        </div>
      ))}

      {hasChanges && (
        <div className="preview-container">
          <button onClick={addImages}>Update Images</button>
        </div>
      )}
    </section>
  );
};

export default UploadBanner;
