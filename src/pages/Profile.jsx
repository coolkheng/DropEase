import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import styles from "../style/Profile.module.css";

const Profile = () => {
    const [userData, setUserData] = useState({
        email: "",
        imageUrl: "",
        store: "",
        phoneno: "",
        category: ""
      });
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // Send the token in the headers
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleFieldChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/updateprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEditing) {
      toggleEditMode();
    } else {
      handleSave();
      setIsEditing(false);
    }
  };

  return (
    <div>
      <Header />
      <SideNav />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <h1 className={`${isEditing ? styles.editable : ''} ${styles.profileText}`}>
              {isEditing ? "Edit Profile" : "Profile"}
            </h1>
            <div className={styles.left_box}>
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  readOnly={!isEditing}
                  accept="image/*"
                  className={styles.input_odd}
                />
                {imageUrl && (
                  <img src={imageUrl} alt="Uploaded" className={styles.uploadedImage} />
                )}
                <input
                  type="text"
                  name="store"
                  placeholder="Store Name"
                  value={userData.store}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  required
                  className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  required
                  className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                />
                <input
                  type="text"
                  name="phoneno"
                  placeholder="Phone No"
                  value={userData.phoneno}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  required
                  className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                />
                <select
                  name="category"
                  className={styles.input_odd}
                  value={userData.category}
                  disabled={!isEditing}
                  onChange={handleFieldChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Apparel">Apparel & Accessories</option>
                  <option value="Sports">Sports & Entertainment</option>
                  <option value="Electronic">Electronics</option>
                </select>
                <button type="submit" className={styles.orange_btn}>
                  {isEditing ? "Save" : "Edit"}
                </button>
              </form>
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
