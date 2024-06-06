import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import styles from "../style/Profile.module.css";
import defaultImage from "../asset/user icon.png";

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
  

    //   const getUser = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
    //         setUserData(response.data.user)
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }
    // const checkAuthentication = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
    //     if (response.data.googleId !== "") {
    //       // User logged in using Google OAuth, call getUser()
    //       getUser();
    //     } else {
    //       // User logged in using another method, call fetchUserData()
    //       fetchUserData();
    //     }
    //   } catch (error) {
    //     setErrorMessage("Failed to fetch user data");
    //   }
    // };

  //  fetchUserData();
  //}, []);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://localhost:4000/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image uploaded:', response.data.imageUrl);
      setImageUrl(response.data.imageUrl); // Update the imageUrl state
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image.');
    }
  };


  const handleFieldChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const imageUrl = await uploadImage(); // Wait for image upload to complete
      if (localStorage.getItem('auth-token')) {
        const response = await fetch('http://localhost:4000/updateprofile', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
          body: JSON.stringify({ ...userData, imageUrl }) // Include imageUrl in the request body
        });
        const data = await response.json();
        console.log(data);

        // Reload the page after successful update
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
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
      <div className={styles.profileHeader}>
        <img
          src={userData.imageUrl ? userData.imageUrl : defaultImage}
          alt="Uploaded"
          className={styles.profileImage}
        />
      </div>
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
                  className={`${styles.input_odd} ${isEditing ? '' : styles.hidden}`}
                />

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
                  disabled
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