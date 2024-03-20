// api.js
const BASE_URL = "https://fine-red-angler-wrap.cyclic.app/api/";

export const fetchPost = async (url, body, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchGetWithToken = async (url, token) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
