import React, { useState, useEffect } from "react";

const UploadCollectionImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(!!selectedImage);
  }, [selectedImage]);

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedImage(file);
    }
  };

  const addImage = () => {
    setUploaded(true);
    setHasChanges(false);
    document.getElementById("imageInput").value = "";
  };

  const deleteImage = () => {
    URL.revokeObjectURL(previewImage);
    setSelectedImage(null);
    setPreviewImage(null);
    setUploaded(false);
  };

  return (
    <section>
      <label>
        <p className="font-bold">Upload & Update Your Store Banner Here!</p>
        <p className="hint">(You can only upload one image)</p>
        <br />
        <input
          type="file"
          id="imageInput"
          name="image"
          onChange={onSelectFile}
          accept="image/png, image/jpeg, image/webp"
        />
      </label>
      <br />

      {previewImage && (
        <div className="preview-container">
          <div className="preview-item">
            <img src={previewImage} alt="Preview" className="original-image" />
            <button onClick={deleteImage}>Delete Image</button>
          </div>
        </div>
      )}

      {hasChanges && (
        <div className="preview-container">
          <button onClick={addImage}>Upload Image</button>
        </div>
      )}
    </section>
  );
};

export default UploadCollectionImage;
