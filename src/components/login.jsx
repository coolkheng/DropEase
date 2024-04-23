import { Link } from "react-router-dom";
import styles from "../style/login.module.css";
import React, { useState } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  // Function to toggle password visibility
  // const togglePasswordVisibility = () => {
  //     setPasswordVisible(!passwordVisible);
  // };

  // Function to handle password input change
  const handlePasswordChange = () => {
    // Clear the error message when password is changed
    setErrorMessage("");
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
  };

  // Function to close the error message
  const handleCloseError = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <img
            src={require("../asset/dropease.png")}
            alt="Logo"
            className={styles.logo}
          />
          <div className={styles.left_box}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                className={styles.input_odd}
              />
              <input
                type={passwordVisible ? "text" : "password"} // Conditional rendering based on passwordVisible state
                placeholder="Password"
                name="password"
                required
                className={styles.input_even}
                onChange={handlePasswordChange} // Call handlePasswordChange when password is changed
              />
              {errorMessage && (
                <div className={styles.error_container}>
                  <p className={styles.error_msg}>{errorMessage}</p>
                  <button
                    className={styles.close_button}
                    onClick={handleCloseError}
                  >
                    <img
                      src={require("../asset/close-icon.png")}
                      alt="Close"
                      className={styles.close_icon}
                    />
                  </button>
                </div>
              )}{" "}
              {/* Render error message if exists */}
              <div className={styles.remember_me}>
                <input type="checkbox" id="remember_me" name="remember_me" />
                <label htmlFor="remember_me">Remember me</label>
                <Link to="/forgotpw" className={styles.forgot_password}>
                  Forgot Password?
                </Link>
              </div>
              {/* Dropdown button for Retailer or Customer selection */}
              <select
                className={styles.dropdown}
                id="user_type"
                name="user_type"
              >
                <option value="">Select User</option>
                <option value="retailer">Retailer</option>
                <option value="customer">Customer</option>
              </select>
              <button type="submit" className={styles.orange_btn}>
                Sign In
              </button>
            </form>
            <div className={styles.or_text}>
              -------------------------------------- OR
              ---------------------------------------
            </div>
            <button
              type="button"
              className={`${styles.white_btn_three} ${styles.continue_with_google}`}
            >
              Continue with Google
            </button>

            <button
              type="button"
              className={`${styles.white_btn_three} ${styles.continue_with_facebook}`}
            >
              Continue with Facebook
            </button>

            <button
              type="button"
              className={`${styles.white_btn_three} ${styles.continue_with_apple}`}
            >
              Continue with Apple
            </button>
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

export default Login;
