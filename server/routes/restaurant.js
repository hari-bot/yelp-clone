import { Router } from "express";
import {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.js";

const router = Router();

//read
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);

//update
router.post("/", addRestaurant);
router.delete("/:id", deleteRestaurant);
router.patch("/:id", updateRestaurant);

export default router;
