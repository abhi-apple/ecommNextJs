import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($phoneNumber: String!, $password: String!) {
    loginUser(phoneNumber: $phoneNumber, password: $password) {
      token
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $phoneNumber: String!) {
    AddToCart(productId: $productId, phoneNumber: $phoneNumber) {
      message
      ok
    }
  }
`;

export const DELETE_FROM_CART = gql`
  mutation DeleteFromCart($productId: ID!, $phoneNumber: String!) {
    deleteFromCart(productId: $productId, phoneNumber: $phoneNumber) {
      message
      ok
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($phoneNumber: String!) {
    placeOrder(phoneNumber: $phoneNumber) {
      ok
      message
    }
  }
`;
