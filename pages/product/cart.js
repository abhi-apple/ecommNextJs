// pages/cart.js
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import ProductCartItem from "../../components/ProductCartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchGetWithToken, fetchPost } from "../api/api";
import { USER_DETAILS } from "../api/endpoints";
import { useTheme } from "../../context/ThemeContextProvider";

const Cart = () => {
  const [data, setData] = useState([]);
  const { isDarkTheme } = useTheme();
  const [totalsum, setTotalSum] = useState(0);
  const [allPrice, setallPrice] = useState([]);
  const [cartChange, setcartChange] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        } else {
          const response = await fetchGetWithToken(USER_DETAILS, token);
          setData(response.user.cart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartChange]);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token,
      };
      const response = await fetchPost("/users/placeorder", {}, headers);
      setData(response?.user?.cart);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div
      className={`${styles.pageFull} ${
        isDarkTheme ? styles.darkMode : styles.lightMode
      }`}
    >
      <div className={`cartMain ${styles.cartMain}`}>
        <div className={styles.cartdetails}>
          <div className={styles.topbtns}>
            <Link className={`backbtn ${styles.backbtn}`} href="/product">
              <button className="btn btn-primary shadow-0">Back</button>
            </Link>
            <h5 className="mb-3 mt-3">
              <i className="fas fa-long-arrow-alt-left me-2" />
              Your Cart Items
            </h5>
          </div>

          <hr />
          <div className=" mb-4">
            <div>
              <p className="mb-1">Shopping cart</p>
              <p className="mb-0">You have {data.length} items in your cart</p>
            </div>
          </div>

          {data.length > 0 ? (
            data.map((item) => (
              <ProductCartItem
                setTotalSum={setTotalSum}
                key={item.id}
                setallPrice={setallPrice}
                setcartChange={setcartChange}
                item={item}
                page="cart"
              />
            ))
          ) : (
            <div>
              <p>Your cart is empty</p>
              <Link className="btn btn-primary shadow-0" href="/product">
                Back to Products
              </Link>
            </div>
          )}

          <hr />
        </div>

        <div className={styles.carttotal}>
          <h5 className="mb-3">
            <a href="#!" className="text-body">
              Total
            </a>
          </h5>
          <p>${totalsum / 2}</p>
        </div>
        {data.length > 0 && (
          <div>
            <Link href="/product/orders">
              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary shadow-0"
              >
                Place Order
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
