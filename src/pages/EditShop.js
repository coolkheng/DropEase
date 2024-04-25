import React, { useState, useRef } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/EditShop.css";
import "../style/Order.css";

function DragDropImageUploader() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function uploadImages() {
    console.log("Images: ", images);
    // Add upload logic here
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideNav />
        </div>
        <div style={{ flex: 5 }}>
          <div className="card">
            <div className="top">
              <p>Update Your Store Banners Here</p>
              <div
                className="drag-area"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                {isDragging ? (
                  <span className="select">Drop images here</span>
                ) : (
                  <>
                    Drag & Drop image here or{" "}
                    <span
                      className="select"
                      role="button"
                      onClick={selectFiles}
                    >
                      Browse
                    </span>
                  </>
                )}

                <input
                  name="file"
                  type="file"
                  className="file"
                  multiple
                  ref={fileInputRef}
                  onChange={onFileSelect}
                />
              </div>
              <div className="container">
                {images.map((image, index) => (
                  <div className="image" key={index}>
                    <span className="delete" onClick={() => deleteImage(index)}>
                      &times;
                    </span>
                    <img src={image.url} alt={image.name} />
                  </div>
                ))}
              </div>
              <button type="button" onClick={uploadImages}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DragDropImageUploader;