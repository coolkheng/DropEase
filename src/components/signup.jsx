import { Link, useNavigate } from "react-router-dom";
import styles from "../style/signup.module.css";
import React, { useState } from "react";

const Signup = () => {
  const navigate = useNavigate(); // Correctly place the useNavigate hook here

  const [formData, setFormData] = useState({
    password: "",
    email: "",
    role: ""
  });
  const [error, setError] = useState(""); // State to manage error messages

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  
  const signup = async () => {
    console.log("Sign Up function executed", formData);
  
    if (!validatePassword(formData.password)) {
      alert("Password must be at least 12 characters long and include uppercase, lowercase, numbers, and symbols.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        navigate("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again later.');
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
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
                value={formData.email}
                onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                className={styles.input_even}
                value={formData.password}
                onChange={changeHandler}
              />
              <select className={styles.input_select} name="role" value={formData.role} onChange={changeHandler}>
                <option value="">Select Role</option>
                <option value="retailer">Retailer</option>
                <option value="customer">Customer</option>
              </select>
              {error && <div className={styles.error_msg}>{error}</div>} {/* Display error message */}
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
