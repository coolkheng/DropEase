// EditShop.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/SideNav";
import TopBar from "../components/TopBar";
import UploadBanner from "../components/UploadBanner.jsx";
import Modal from "../components/Modal.jsx";
import Button from '@mui/material/Button';

const EditShop = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCreateCollectionModal = () => {
    setShowCreateCollectionModal(!showCreateCollectionModal);
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
      {!isSmallScreen && (
        <aside className="w-full md:w-[20%] customShadow">
          <Navbar />
        </aside>
      )}

      <main className={`w-full ${isSmallScreen ? "" : "md:w-[95%]"} mr-10 mt-10`}>
        {isSmallScreen && (
          <div className="fixed-top-bar">
            <TopBar />
          </div>
        )}

        <div className="flex justify-between items-center mt-5">
          <Header />
        </div>
        <div style={{ width: "100%", marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>Store Banner</p>
          </div>
          <hr
            style={{
              border: "1px solid #000",
              width: "100%",
              marginTop: "10px",
              marginRight: "5px",
            }}
          />
        </div>
        <div style={{ marginTop: "30px", marginBottom: "20px" }}>
          <UploadBanner images={images} setImages={setImages} />
        </div>
      </main>
    </div>
  );
};

export default EditShop;
