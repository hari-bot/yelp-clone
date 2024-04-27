import { pool } from "../database/index.js";
import { uid } from "uid";

export const getRestaurants = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM restaurants");
    const restaurants = response.rows;
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM restaurants WHERE id=$1", [
      id,
    ]);
    if (response.rowCount === 1) {
      const restaurants = response.rows[0];
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, location, pricerange } = req.body;
    const id = uid();
    const newRestaurant = await pool.query(
      "INSERT INTO restaurants (id, name, location, pricerange) VALUES ($1,$2,$3,$4) RETURNING id",
      [id, name, location, pricerange]
    );
    console.log(newRestaurant.rows[0]);
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
    const { name, location, pricerange } = req.body;
    const updatedRestaurant = await pool.query(
      "UPDATE restaurants SET name=$1, location=$2, pricerange=$3 WHERE id=$4 RETURNING *",
      [name, location, pricerange, id]
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
