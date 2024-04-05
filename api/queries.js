import { gql } from "@apollo/client";

export const FETCH_CART_ITEMS = gql`
  query FetchCartItems {
    fetchCartItems {
      id
      name
      price
      description
      image
      avgRating
      category
    }
  }
`;

export const FETCH_PRODUCTS = gql`
  query FetchProducts($category: String, $rating: String, $filter: String) {
    fetchProducts(category: $category, rating: $rating, filter: $filter) {
      id
      title
      description
      price
      category
      images
      rating
    }
  }
`;

export const FETCH_PRODUCT_IDS = gql`
  query ProductIds {
    productIds
  }
`;

export const FETCH_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      category
      images
      rating
    }
  }
`;

export const FETCH_USER_CART = gql`
  query FetchUserCart($phoneNumber: String!) {
    userCartItems(phoneNumber: $phoneNumber)
  }
`;

export const FETCH_USER_ORDERS = gql`
  query FetchUserOrder($phoneNumber: String!) {
    userOrders(phoneNumber: $phoneNumber)
  }
`;
