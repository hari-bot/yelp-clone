import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";
import Rating from "@mui/material/Rating";

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState({
    reviews: [],
    average_rating: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/restaurant/${id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.log(error.messaage);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Heading>{restaurant.name}</Heading>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Rating
          name="read-only"
          value={parseFloat(restaurant.average_rating)}
          precision={0.5}
          readOnly
        />
        <div className="font-weight-bold text-warning">
          ({parseFloat(restaurant.average_rating)})
        </div>
      </div>

      <div className="row mt-5">
        {restaurant.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default RestaurantPage;
