import React, { useState } from "react";
import { useRouter } from "next/router";
import { REGISTER } from "./api/endpoints.js";
import { fetchPost } from "./api/api.js";
import styles from "../styles/Register.module.css";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchPost(REGISTER, formData);
      if (response.ok) {
        console.log("Registration successful!");
        router.push("/product");
      } else {
        console.log(response.message);
        alert(response.message);
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.inputField}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            id="phoneNumber"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            className={styles.input}
            required
            name="password"
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
