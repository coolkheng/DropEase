import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";
import React, { useState } from 'react';

const Pw = () => {
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const [submitTextVisible, setSubmitTextVisible] = useState(false); // State to manage visibility of text after submit button is pressed

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        // Prevent default form submission behavior
        event.preventDefault();
        // Set the visibility of submit text to true
        setSubmitTextVisible(true);
        // Here you can perform other submission related tasks
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <img src={require('../asset/dropease.png')} alt="Logo" className={styles.logo} />
                    <div className={styles.left_box}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Change Password</h1>
                            <input
                                type={passwordVisible ? "text" : "password"} // Conditional rendering based on passwordVisible state
                                placeholder="Password"
                                name="password"
                                required
                                className={styles.input_odd}
                            />
                            <input
                                type={passwordVisible ? "text" : "password"} // Conditional rendering based on passwordVisible state
                                placeholder="Retype Password"
                                name="password"
                                required
                                className={styles.input_odd}
                            />
                            <button type="submit" className={styles.orange_btn}>
                                Submit
                            </button>
							{submitTextVisible && <p className={styles.submitpw}>Password submitted! Verification sent to email</p>}
                            <Link to="/login" className={styles.back_button}></Link>
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>Sign up now</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Pw;
