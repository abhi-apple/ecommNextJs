import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/ProductDetails.module.css";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContextProvider";
import { FETCH_PRODUCT } from "../../api/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TO_CART } from "../../api/mutations";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isDarkTheme } = useTheme();
  const [product, setProduct] = useState(null);
  const [addToCart] = useMutation(ADD_TO_CART);
  // const [loading, setLoading] = useState(true);

  const { data, loading } = useQuery(FETCH_PRODUCT, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setProduct(data.product);
    }
  }, [data, loading]);

  const handleClick = async (e) => {
    e.preventDefault();

    const phoneNumber = localStorage.getItem("phoneNumber");
    try {
      const { data } = await addToCart({
        variables: {
          productId: product.id,
          phoneNumber,
        },
      });
      console.log("Product added to cart:", data);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${styles.pageFull} ${
        isDarkTheme ? styles.darkMode : styles.lightMode
      }`}
    >
      <section className="py-2">
        <div className="container">
          <Link href="/product" className={styles.backbtn}>
            <button className="btn btn-primary shadow-0">Back</button>
          </Link>
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={`${product?.images[0]}`}
                  />
                </a>
              </div>
              <div className="d-flex justify-content-center mb-3">
                {product?.images.map((url, index) => (
                  <a
                    key={index}
                    data-fslightbox="mygalley"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    data-type="image"
                    href={url}
                  >
                    <img
                      width={60}
                      height={60}
                      className="rounded-2"
                      src={url}
                      alt={`Image ${index + 1}`}
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main className={`col-lg-6 ${styles.wholeDet}`}>
              <div className="ps-lg-3 details">
                <h4 className="title text-dark">{product?.title}</h4>
                <div className="mb-3">
                  <span className="h5">${product?.price}</span>
                </div>
                <div className=" mb-1 me-2">
                  <span className={` ${styles.ratingcss} ms-1`}>
                    {product?.rating} ★ Rating
                  </span>
                </div>
                <p>{product?.description}</p>
                <hr />
              </div>
              <div className={styles.buttons}>
                <button
                  onClick={handleClick}
                  className="btn btn-primary shadow-0"
                >
                  <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
