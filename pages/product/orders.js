// pages/cart.js
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import ProductCartItem from "../../components/ProductCartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchGetWithToken, fetchPost } from "../api/api";
import { USER_DETAILS } from "../api/endpoints";

const Orders = () => {
  const [data, setData] = useState([]);
  const [totalsum, setTotalSum] = useState(0);
  const [cartChange, setCartChange] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        } else {
          const response = await fetchGetWithToken(USER_DETAILS, token);
          setData(response.user.orders);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartChange, router]);

  return (
    <div className={`cartMain ${styles.cartMain}`}>
      <div className={styles.cartdetails}>
        <div className={styles.topbtns}>
          <Link className={`backbtn ${styles.backbtn}`} href="/product">
            <button className="btn btn-primary shadow-0">Back</button>
          </Link>
          <h5 className="mb-3 mt-3">
            <i className="fas fa-long-arrow-alt-left me-2" />
            Your Order Items
          </h5>
        </div>

        <hr />
        <div className=" mb-4">
          <div>
            <p className="mb-1">Shopping orders</p>
            <p className="mb-0">You have ordered {data.length} items </p>
          </div>
        </div>

        {data.length > 0 ? (
          data.map((item) => (
            <ProductCartItem
              setTotalSum={setTotalSum}
              key={item.id}
              item={item}
              page={null}
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
      {/* {data.length > 0 && (
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
      )} */}
    </div>
  );
};

export default Orders;
