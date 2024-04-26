import { Router } from "express";
import {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.js";

const router = Router();

//read
router.get("/", getRestaurants);

//update
router.post("/", addRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
