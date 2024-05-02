import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RestaurantsTable = ({ restaurantsData, setRestaurantsData }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/restaurant/${id}`);
      setRestaurantsData((prevData) =>
        prevData.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <table className="table table-dark">
      <thead className="bg-primary">
        <tr>
          <th scope="col">Restaurant</th>
          <th scope="col">Location</th>
          <th scope="col">PriceRange</th>
          <th scope="col">Ratings</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {restaurantsData.map((restaurant) => (
          <tr key={restaurant.id}>
            <th
              scope="row"
              onClick={() => {
                navigate(`/restaurant/${restaurant.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              {restaurant.name}
            </th>
            <td>{restaurant.location}</td>
            <td>{restaurant.pricerange}</td>
            <td>{restaurant.average_rating}</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(restaurant.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RestaurantsTable;
