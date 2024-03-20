import { useEffect, useState } from "react";

import Link from "next/link";
import { useTheme } from "../context/ThemeContextProvider.js";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const {
    setcategoryContext,
    setfilterContext,
    setsearchTextContext,
    setavgratingContext,
    userNameContext,
    isDarkTheme,
    toggleTheme,
  } = useTheme();

  const [category, setCategory] = useState(null);
  const [userName, setuserName] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchTextContext(searchQuery);
  };

  useEffect(() => {
    setuserName(localStorage.getItem("userName"));
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAverageRatingSelect = (selectedRating) => {
    setAverageRating(selectedRating);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleClearFilter = () => {
    setCategory(null);
    setAverageRating(null);
    setFilter(null);
    setcategoryContext(null);
    setavgratingContext(null);
    setfilterContext(null);
  };
  const handleCart = () => {
    router.push("/product/cart");
  };
  const handleOrder = () => {
    router.push("/product/orders");
  };
  const handleLogOut = () => {
    alert("Logged out");
    localStorage.clear();
    window.location.reload();
    // redirect("/");
    router.push("/");
  };
  const handleFilterButton = () => {
    setcategoryContext(category);
    setavgratingContext(averageRating);
    setfilterContext(filter);
  };

  return (
    <div
      className={`${styles.navbarnav} ${
        isDarkTheme ? styles.darkHeader : styles.lightHeader
      }`}
    >
      <div className={styles.navLogo}>
        <Link href="/" className={styles.navbarBrand}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/092/544/original/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg"
            alt="Knolskape"
            className={styles.imgComp}
          />
        </Link>
      </div>
      <div className={styles.navbardet} id="navbarSupportedContent">
        <ul className={`navbar-nav ${styles.optionsnav} `}>
          <li className={`nav-item dropdown ${styles.eachOp}`}>
            <button
              className={`nav-link dropdown-toggle ${styles.dropdownToggle}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {category === null
                ? "Category"
                : category === "smartphones"
                ? "Smartphones"
                : category === "laptops"
                ? "Laptops"
                : category === "fragrances"
                ? "Fragrances"
                : category === "skincare"
                ? "Skincare"
                : "Category"}
            </button>
            <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
              <li>
                <button
                  className={`dropdown-item ${styles.dropdownItem}`}
                  onClick={() => handleCategorySelect("smartphones")}
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("laptops")}
                  className={`dropdown-item ${styles.dropdownItem}`}
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("fragrances")}
                  className={`dropdown-item ${styles.dropdownItem}`}
                >
                  Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("skincare")}
                  className={`dropdown-item ${styles.dropdownItem}`}
                >
                  Skincare
                </button>
              </li>
            </ul>
          </li>
          <li className={`nav-item dropdown  ${styles.eachOp}`}>
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {averageRating === null
                ? "Average Rating"
                : averageRating === "Above 4.5 rating"
                ? "Above 4.5 rating"
                : averageRating === "Above 4 rating"
                ? "Above 4 rating"
                : averageRating === "Above 3.5 rating"
                ? "Above 3.5 rating"
                : averageRating === "Above 3 rating"
                ? "Above 3 rating"
                : "Average Rating"}
            </button>
            <ul className={"dropdown-menu"}>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 4.5 rating")}
                  className={"dropdown-item"}
                >
                  Above 4.5 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 4 rating")}
                  className={"dropdown-item"}
                >
                  Above 4 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 3.5 rating")}
                  className={"dropdown-item"}
                >
                  Above 3.5 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 3 rating")}
                  className={"dropdown-item"}
                >
                  Above 3 rating
                </button>
              </li>
            </ul>
          </li>
          <li className={`nav-item dropdown  ${styles.eachOp}`}>
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filter === null
                ? "Filter"
                : filter === "Price high to low"
                ? "Price H-L"
                : filter === "Price low to high"
                ? "Price L-H"
                : filter === "Average customer ratings"
                ? "Avg. rating"
                : "Filter"}
            </button>
            <ul className={"dropdown-menu"}>
              <li>
                <button
                  onClick={() => handleFilterSelect("Price high to low")}
                  className={"dropdown-item"}
                >
                  Price High to Low
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterSelect("Price low to high")}
                  className={"dropdown-item"}
                >
                  Price low to high
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterSelect("Average customer ratings")}
                  className={"dropdown-item"}
                >
                  Average customer ratings
                </button>
              </li>
            </ul>
          </li>
          <button onClick={handleFilterButton} className={styles.applyFilter}>
            Apply Filter
          </button>
          <button onClick={handleClearFilter} className={styles.applyFilter}>
            Clear Filter
          </button>
        </ul>

        <form
          className={styles.formSearch}
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className={`form-control ${styles.searchBar} ${
              isDarkTheme ? styles.darkMode : styles.lightMode
            }`}
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-outline-success apply-filter"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className={styles.buttons}>
          {userNameContext ? (
            <button className={`btn btn-warning ${styles.applyFilter}`}>
              Hello! {userNameContext}
            </button>
          ) : userName ? (
            <button className={`btn btn-warning ${styles.applyFilter}`}>
              Hello! {localStorage.getItem("userName")}
            </button>
          ) : (
            <Link className="navbar-brand" href="/login">
              <button className={`btn btn-warning ${styles.applyFilter}`}>
                Sign In
              </button>
            </Link>
          )}

          <button
            onClick={handleOrder}
            className={`btn btn-warning ${styles.applyFilter}`}
          >
            Orders
          </button>
          <button
            onClick={handleCart}
            className={`btn btn-warning ${styles.applyFilter}`}
          >
            Cart
          </button>
          <div className="toggle-theme">
            <button
              onClick={toggleTheme}
              className={`btn btn-warning ${styles.applyFilter}`}
            >
              {isDarkTheme ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <button
            onClick={handleLogOut}
            className={`btn btn-warning ${styles.applyFilter}`}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
