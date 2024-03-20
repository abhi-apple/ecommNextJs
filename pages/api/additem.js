// pages/api/additem.js

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://fine-red-angler-wrap.cyclic.app/api/users/additem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
