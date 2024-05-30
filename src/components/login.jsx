import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../style/login.module.css";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, role } = data;
      if (success) {
        // Determine the link destination based on the selected user type
        const linkDestination = role === "customer" ? "/customerhome" : "/home";
        // Navigate to the appropriate link
        navigate(linkDestination);
        console.log(message);
      } else {
        console.log(message); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred."); 
      }
    }
    setInputValue({
      email: "",
      password: "",
    });
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
                onChange={handleChange}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                className={styles.input_even}
                onChange={handleChange}
                value={password}
              />
              <div className={styles.remember_me}>
                <input type="checkbox" id="remember_me" name="remember_me" />
                <label htmlFor="remember_me">Remember me</label>
                <Link to="/forgotpw" className={styles.forgot_password}>
                  Forgot Password?
                </Link>
              </div>
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
