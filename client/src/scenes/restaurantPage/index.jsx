import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState({ reviews: [] });
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
      <p className="text-center">average_rating: {restaurant.average_rating}</p>
      <div className="row">
        {restaurant.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default RestaurantPage;
