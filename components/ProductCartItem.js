import { useEffect, useState } from "react";
import styles from "../styles/ProductCartItem.module.css";
import { useTheme } from "../context/ThemeContextProvider";
import { FETCH_PRODUCT } from "../api/queries";
import { client } from "../api/apolloClient";
import { useMutation } from "@apollo/client";
import { DELETE_FROM_CART } from "../api/mutations";

const ProductCartItem = ({
  item,
  setTotalSum,
  page,
  setallPrice,
  setcartChange,
  setcartData,
  cartData,
}) => {
  const [product, setproduct] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const { isDarkTheme } = useTheme();

  const [deleteCart] = useMutation(DELETE_FROM_CART);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const phoneNumber = localStorage.getItem("phoneNumber");
        setphoneNumber(phoneNumber);
        // const token = localStorage.getItem("token");
        // if (token) {
        //   const response = await fetch(
        //     `https://fine-red-angler-wrap.cyclic.app/api/products/${item}`,
        //     {
        //       headers: {
        //         Authorization: token,
        //       },
        //     }
        //   );
        //   if (response.ok) {
        //     const one = await response.json();
        //     setproduct(one.product);
        //     setTotalSum((prev) => prev + one.product.price);
        //   } else {
        //     throw new Error("Failed to fetch products");
        //   }
        // }

        const { data } = await client.query({
          query: FETCH_PRODUCT,
          variables: {
            id: item,
          },
        });
        setproduct(data.product);
        console.log(data, "single prod");
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // const removeItemFromCart = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://fine-red-angler-wrap.cyclic.app/api/users/removeitem",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //         body: JSON.stringify({
  //           productId: item,
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       const removedProduct = await response.json();
  //       if (removedProduct && removedProduct.product) {
  //         setTotalSum((prev) => prev - removedProduct.product.price);
  //         setcartChange((prevCartChange) => !prevCartChange);
  //       }
  //     } else {
  //       console.error("Error removing item from cart");
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };
  const removeItemFromCart = async () => {
    // fetch("https://fine-red-angler-wrap.cyclic.app/api/users/removeitem", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     productId: item,
    //   }),
    // })
    // .then((response) => {

    // if (response.ok) {
    //   setTotalSum((prev) => prev - product.price * 2);
    //   setcartChange((prevCartChange) => !prevCartChange);
    // } else {
    //   console.error("Error removing item from cart");
    // }
    // })
    // .catch((error) => {
    //   console.error("Fetch error:", error);
    // });

    try {
      const id = item;
      console.log(id);
      console.log(phoneNumber);
      const { data } = await deleteCart({
        variables: {
          productId: id,
          phoneNumber: phoneNumber,
        },
      });
      if (window.confirm("Product deleted successfully")) {
        window.location.reload();
      }
      console.log("Product removed from cart:", data);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    product && (
      <div>
        <div className={`card ${styles.card}`}>
          <div
            className={`${
              isDarkTheme ? styles.darkMode : styles.lightMode
            } card-body`}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div>
                  <img
                    src={product?.images[0]}
                    className="img-fluid rounded-3"
                    alt="Shopping item"
                    style={{ width: 65 }}
                  />
                </div>
                <div className={` ms-3 ${styles.carttext}`}>
                  <h5>{product.title}</h5>
                  <p className="small mb-0">{product.description}</p>
                </div>
              </div>
              <div className={` ${styles.btnPrice}`}>
                <div className="d-flex flex-row align-items-center">
                  <div style={{ width: 80 }}>
                    <h5 className="mb-0">${product.price}</h5>
                  </div>
                  <a href="#!" style={{ color: "#cecece" }}>
                    <i className="fas fa-trash-alt" />
                  </a>
                </div>
                {page && (
                  <div>
                    <button
                      onClick={removeItemFromCart}
                      className="btn btn-danger shadow-0"
                    >
                      Remove from Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCartItem;
