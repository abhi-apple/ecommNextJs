import { useState } from "react";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css"; // Importing CSS module for styling

const ProductCard = ({ product, setmultiSelect, enableMulti }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: product._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      console.log(data);
      if (data.ok) {
        alert("Item added to cart");
      } else {
        alert("Item already in cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const handleCheckboxChange = () => {
    if (setmultiSelect) {
      setmultiSelect((prevArray) => [...prevArray, product._id]);
    }
  };

  return (
    <div className={styles.productCard}>
      {enableMulti && (
        <div className="">
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
      <div className={styles.productWhole}>
        <div className={styles.productDetails}>
          <Link href={`/product/${product._id}`} passHref>
            <img
              src={product.images[0]}
              alt={product.title}
              className={styles.productImage}
            />
          </Link>
          <div className={styles.namePrice}>
            <h2 className={styles.productName}>{product.title}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productRating}>Rating : {product.rating}</p>
          </div>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
      <button onClick={handleClick} className={styles.addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
