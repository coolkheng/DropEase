import { Link, useNavigate } from "react-router-dom";
import styles from "../style/signup.module.css";
import React, { useState } from "react";
import axios from "axios";

const validatePassword = (password) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSymbols
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  const { email, password, role } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols."
      );
      setInputValue({
        email: "",
        password: "",
        role: "",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        console.log(message); // Log success message
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert(message); // Log error message
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Display server error message
      } else {
        alert("An unexpected error occurred."); // Handle other types of errors
      }
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      role: "",
    });
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
            <form className={styles.form_container} onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className={styles.input_even}
                onChange={handleChange}
                value={password}
                required
              />
              <select
                className={styles.input_select}
                name="role"
                value={role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="retailer">Retailer</option>
                <option value="customer">Customer</option>
              </select>
              <button type="submit" className={styles.orange_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
