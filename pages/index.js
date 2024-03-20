import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useTheme } from "../context/ThemeContextProvider";

const Home = () => {
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/product");
    }
  }, []);

  return (
    <div
      className={`${styles.navbarnav} ${
        isDarkTheme ? styles.darkMode : styles.lightMode
      } ${styles.fullPage}`}
    >
      <div className={styles.btns}>
        <Link className={styles.loginBtn} href="/login">
          Login
        </Link>

        <a
          href="https://fine-red-angler-wrap.cyclic.app/login"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.registerBtn}
        >
          New
        </a>

        <Link className={styles.registerBtn} href="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
