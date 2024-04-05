// pages/cart.js
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import ProductCartItem from "../../components/ProductCartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchGetWithToken, fetchPost } from "../api/api";
import { USER_DETAILS } from "../api/endpoints";
import { useTheme } from "../../context/ThemeContextProvider";
import { client } from "../../api/apolloClient";
import { FETCH_USER_ORDERS } from "../../api/queries";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const { isDarkTheme } = useTheme();
  const [totalsum, setTotalSum] = useState(0);
  // const [cartChange, setCartChange] = useState(false);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (!phoneNumber) {
      router.push("/");
    }
    setPhoneNumber(phoneNumber);
    const fetchProd = async () => {
      const { data, loading } = await client.query({
        query: FETCH_USER_ORDERS,
        variables: {
          phoneNumber,
        },
      });
      console.log(data, "this is data ");
      if (!loading && data) {
        setOrdersData(data.userOrders);
      }
    };

    fetchProd();
  }, [router, ordersData]);

  return (
    <div className={`${isDarkTheme ? styles.darkMode : styles.lightMode}`}>
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
              <p className="mb-0">
                You have ordered {ordersData.length} items{" "}
              </p>
            </div>
          </div>

          {ordersData.length > 0 ? (
            ordersData.map((item) => (
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
    </div>
  );
};

export default Orders;
