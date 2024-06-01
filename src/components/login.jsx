import { Link, useNavigate } from "react-router-dom";
import styles from "../style/login.module.css";
import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState(""); // State to manage selected user type

  const [formData, setFormData] = useState({
    password: "",
    email: "",
    role: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Log in function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      console.log("Login Successful:", responseData);
      localStorage.setItem('auth-token', responseData.token);
      const linkDestination = responseData.role === "customer" ? "/customerhome" : "/home";
      navigate(linkDestination);
    } else {
      alert(responseData.errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
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
                value={formData.email}
                onChange={changeHandler}
              />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                className={styles.input_even}
                value={formData.password}
                onChange={changeHandler}
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
