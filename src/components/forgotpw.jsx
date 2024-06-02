import { Link, useNavigate } from "react-router-dom";
import styles from "../style/login.module.css";
import React, { useState } from "react";

const Pw = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const forgotpw = async () => {
    console.log(formData);
    await fetch('http://localhost:4000/forgot-password', {
      method: 'POST',
      crossDomain: true,
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      alert(data.status);
      if (data.status === "Email sent successfully") {
        navigate("/login");
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotpw();
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
              <h1>Retype Email</h1>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={setFormData.email}
                onChange={changeHandler}
                required
                className={styles.input_odd}
              />
              <button type="submit" className={styles.orange_btn}>
                Submit
              </button>
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
