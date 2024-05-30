import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import styles from "../style/Profile.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState({
        userId: "",
        store: "",
        email: "",
        phoneno: "",
        category: "",
    });

    // State variable for edit mode
    const [isEditing, setIsEditing] = useState(false);

    const { store, phoneno, category } = userData;
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    };

    // // Function to fetch user profile data
    // useEffect(() => {
    //     const fetchProfileData = async () => {
    //         try {
    //             const response = await axios.get('/currentuser');
    //             const { user } = response.data;
    //             setUserData(user);
    //             console.log('Fetched user data:', user); // Print fetched data in console
    //         } catch (error) {
    //             console.error('Error fetching user profile:', error);
    //             setErrorMessage('Error fetching user profile');
    //         }
    //     };
    //     fetchProfileData();
    // }, []);
    

    // Function to toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Function to save edited information
    const handleSave = async () => {
        try {
            const response = await axios.put('/updateprofile', {
                store,
                phoneno,
                category
            }, { withCredentials: true });
            setUserData(response.data.user);
            setIsEditing(false);
            console.log("Profile updated:", response.data.user);
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrorMessage('Error updating profile');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // If not editing, toggle edit mode
        if (!isEditing) {
            toggleEditMode();
        } else {
            // Save the information
            handleSave();
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
                                    type="text"
                                    placeholder="Store Name"
                                    value={userData.store}
                                    onChange={handleChange}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={userData.email}
                                    readOnly={true} // Always readOnly to prevent editing
                                    required
                                    className={`${styles.input_odd} ${styles.nonEditable}`}
                                />
                                <input
                                    type="text"
                                    placeholder="Phone No"
                                    value={userData.address}
                                    onChange={handleChange}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
                                <select
                                    className={styles.input_odd}
                                    value={userData.category}
                                    onChange={handleChange}
                                    disabled={!isEditing}  // readOnly when not editing
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
