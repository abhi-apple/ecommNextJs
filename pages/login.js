import { useState } from "react";
import { useRouter } from "next/router";
import { LOGIN } from "./api/endpoints.js";
import { fetchPost } from "./api/api";
import styles from "../styles/Login.module.css";
import { useTheme } from "../context/ThemeContextProvider.js";

const Login = () => {
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState({
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
      const response = await fetchPost(LOGIN, formData);
      if (response.ok) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.userName);
        console.log("Login successful!");
        router.push("/product");
      } else {
        console.log(response.message);
        alert(response.message);
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  };

  return (
    <div
      className={`${styles.navbarnav} ${
        isDarkTheme ? styles.darkMode : styles.lightMode
      }`}
    >
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Welcome Back!</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.phoneNumber}>
            <label className={styles.label} htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              type="text"
              id="phoneNumber"
              className={styles.input}
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.password}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              name="password"
              className={styles.input}
              value={formData.password}
              type="password"
              id="password"
              required
              onChange={handleChange}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
