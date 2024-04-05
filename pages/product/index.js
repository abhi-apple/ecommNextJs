import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard.js";
import styles from "../../styles/Products.module.css";
import { FETCH_PRODUCTS } from "../../api/queries.js";
import { useTheme } from "../../context/ThemeContextProvider.js";
import { useQuery } from "@apollo/client";

const Products = () => {
  const router = useRouter();
  const {
    categoryContext,
    filterContext,
    avgratingContext,
    searchTextContext,
    isDarkTheme,
  } = useTheme();
  const [products, setProducts] = useState([]);
  const [multiSelect, setMultiSelect] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [enableMulti, setEnableMulti] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const { loading, error, data } = useQuery(FETCH_PRODUCTS, {
    variables: {
      category: categoryContext,
      rating: avgratingContext,
      filter: filterContext,
    },
  });

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (!phoneNumber) {
      router.push("/");
    }
    if (!loading && !error && data) {
      setProducts(data.fetchProducts);
      setallProducts(data.fetchProducts);
      console.log(data, "data is");
    }
  }, [loading, error, data]);

  useEffect(() => {
    const handleSearch = () => {
      console.log(allProducts, "all");
      const results = allProducts.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(searchTextContext?.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTextContext?.toLowerCase())
      );

      setProducts(results);
      console.log(results, "after search");
    };

    handleSearch();
  }, [searchTextContext]);

  const handleAddAllToCart = () => {
    console.log(multiSelect, "these are prod selected");
    setMultiSelect([]);
    setEnableMulti(false);

    const itemOccurrences = new Map();
    multiSelect.forEach((itemId) => {
      itemOccurrences.set(itemId, (itemOccurrences.get(itemId) || 0) + 1);
    });

    const oddOccurrences = multiSelect.filter(
      (itemId) => itemOccurrences.get(itemId) % 2 === 1
    );

    console.log(oddOccurrences, "odd repeating items");

    let successfulAdditions = 0;

    oddOccurrences.forEach((itemId) => {
      fetch("https://fine-red-angler-wrap.cyclic.app/api/users/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: itemId }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.ok) {
            successfulAdditions++;
            console.log("Item added to cart:", itemId);

            if (successfulAdditions === oddOccurrences.length) {
              alert("All items added to cart successfully");
            }
          } else {
            alert("Item already added to cart");
            console.error("Failed to add item to cart:", itemId);
          }
        })
        .catch((error) => {
          console.error("Error occurred while adding item to cart:", error);
        });
    });

    setProducts(products.map((product) => ({ ...product, isSelected: false })));
  };

  const handleMultiSelect = () => {
    setEnableMulti(!enableMulti);
  };

  return (
    <div className={`${isDarkTheme ? styles.darkMode : styles.lightMode}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="">
          <div className={styles.btnsMulti}>
            <button onClick={handleMultiSelect} className={styles.addToCart}>
              Add Multiple Items
            </button>
            <button onClick={handleAddAllToCart} className={styles.addToCart}>
              Add All To Cart
            </button>
          </div>
          <div className={styles.productCard}>
            {products.map((product) => (
              <ProductCard
                enableMulti={enableMulti}
                setMultiSelect={setMultiSelect}
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
