import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import styles from "../style/Profile.module.css";
import React, { useState } from "react";

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        address: 'Penang, Malaysia.',
        phoneno: '012-3456789',
    });

    // State variable for edit mode
    const [isEditing, setIsEditing] = useState(false);

    // State variable to keep track of the field being edited
    const [editingField, setEditingField] = useState(null);

    // Functions to handle editing
    const handleFieldChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    // Function to toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Function to save edited information
    const handleSave = () => {
        setIsEditing(false);
        // Here you can perform actions to save the edited information, e.g., make an API request
        console.log("Saving edited information:", userData);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // If not editing, toggle edit mode
        if (!isEditing) {
            toggleEditMode();
        } else {
            // Perform any necessary validation
            // Here you can add validation if needed
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
                                    value={userData.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
                                <input
                                    type="text"
                                    value={userData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
                                <input
                                    type="text"
                                    value={userData.address}
                                    onChange={(e) => handleFieldChange('address', e.target.value)}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
                                <input
                                    type="text"
                                    value={userData.phoneno}
                                    onChange={(e) => handleFieldChange('phoneno', e.target.value)}
                                    readOnly={!isEditing} // readOnly when not editing
                                    required
                                    className={`${styles.input_odd} ${isEditing ? '' : styles.nonEditable}`}
                                />
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
