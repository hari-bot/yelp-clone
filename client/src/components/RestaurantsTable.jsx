import React from "react";

const RestaurantsTable = ({ restaurantsData }) => {
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
            <th scope="row">{restaurant.name}</th>
            <td>{restaurant.location}</td>
            <td>{restaurant.pricerange}</td>
            <td>{restaurant.average_rating}</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RestaurantsTable;
