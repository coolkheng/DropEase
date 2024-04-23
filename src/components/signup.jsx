import { Link } from "react-router-dom";
import styles from "../style/signup.module.css";
import React, { useState } from "react";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <img
            src={require("../asset/dropease.png")}
            alt="Logo"
            className={styles.logo}
          />
          <div className={styles.right_box}>
            <form className={styles.form_container}>
              <h1>Create Account</h1>
              <div className={styles.buttonlogo}>
                <button
                  type="button"
                  className={`${styles.white_btn_three} ${styles.continue_with_google}`}
                ></button>
                <button
                  type="button"
                  className={`${styles.white_btn_three} ${styles.continue_with_facebook}`}
                ></button>
                <button
                  type="button"
                  className={`${styles.white_btn_three} ${styles.continue_with_apple}`}
                ></button>
              </div>
              <div className={styles.or_text}>
                -------------------------------------- OR
                ---------------------------------------
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className={styles.input_odd}
              />
              <input
                type={passwordVisible ? "text" : "password"} // Conditional rendering based on passwordVisible state
                placeholder="Password"
                name="password"
                required
                className={styles.input_even}
              />
              <select className={styles.input_select} name="role">
                <option value="">Select Role</option>
                <option value="retailer">Retailer</option>
                <option value="customer">Customer</option>
              </select>

              {/* <div className={styles.error_msg}></div> */}
              <Link to="/login">
                <button type="submit" className={styles.orange_btn}>
                  Sign Up
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
