import { pool } from "../database/index.js";
import { uid } from "uid";

export const getRestaurants = async (req, res) => {
  try {
    const response = await pool.query(`
      SELECT r.*, ROUND(AVG(rv.rating), 1) AS average_rating
      FROM restaurants r
      LEFT JOIN reviews rv ON r.id = rv.restaurant_id
      GROUP BY r.id
    `);

    const restaurants = response.rows;
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT r.id AS restaurant_id,
           r.name AS restaurant_name,
           r.location AS restaurant_location,
           r.pricerange AS price_range,
           rv.id AS review_id,
           rv.name AS reviewer_name,
           rv.review,
           rv.rating,
           ROUND(AVG(rv.rating) OVER (PARTITION BY r.id),1) AS average_rating
    FROM restaurants r
    LEFT JOIN reviews rv ON r.id = rv.restaurant_id
    WHERE r.id = $1;
  `;

    // Fetch restaurant details and reviews
    const restaurantQuery = await pool.query(query, [id]);

    if (restaurantQuery.rowCount >= 1) {
      // Group reviews by restaurant details
      const restaurantDetails = {
        id: restaurantQuery.rows[0].restaurant_id,
        name: restaurantQuery.rows[0].restaurant_name,
        location: restaurantQuery.rows[0].restaurant_location,
        average_rating: restaurantQuery.rows[0].average_rating,
        pricerange: restaurantQuery.rows[0].price_range,
        reviews: [],
      };

      restaurantQuery.rows.forEach((row) => {
        if (row.review_id) {
          restaurantDetails.reviews.push({
            id: row.review_id,
            reviewer_name: row.reviewer_name,
            review: row.review,
            rating: row.rating,
          });
        }
      });
      res.status(200).json(restaurantDetails);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, location, priceRange } = req.body;
    const id = uid();
    const newRestaurant = await pool.query(
      "INSERT INTO restaurants (id, name, location, pricerange) VALUES ($1,$2,$3,$4) RETURNING id",
      [id, name, location, priceRange]
    );
    res.json({
      message: "Restaurant added successfully",
      restaurantId: newRestaurant.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await pool.query(
      "DELETE FROM restaurants WHERE id = $1",
      [id]
    );

    if (deletedRestaurant.rowCount === 1) {
      res.json({ message: "Restaurant deleted successfully" });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, priceRange } = req.body;
    const updatedRestaurant = await pool.query(
      "UPDATE restaurants SET name=$1, location=$2, pricerange=$3 WHERE id=$4 RETURNING *",
      [name, location, priceRange, id]
    );

    if (updatedRestaurant.rowCount === 1) {
      const updatedData = updatedRestaurant.rows[0];
      res
        .status(200)
        .json({ message: "Restaurant updated successfully", updatedData });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;

    const restaurantQuery = await pool.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [id]
    );
    if (restaurantQuery.rowCount !== 1) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await pool.query(
      "INSERT INTO reviews (id, name, restaurant_id, review, rating) VALUES ($1, $2, $3, $4, $5)",
      [uid(), name, id, review, rating]
    );

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
