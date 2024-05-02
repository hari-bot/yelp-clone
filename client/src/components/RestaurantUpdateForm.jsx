import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantUpdateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    priceRange: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`http://localhost:3001/restaurant/${id}`, formData);
      setFormData({
        name: "",
        location: "",
        priceRange: "",
      });
      navigate("/");
      console.log("Form data sent successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/restaurant/${id}`
      );
      const { name, location, price_range } = response.data;
      setFormData({
        name: name,
        location: location,
        priceRange: price_range,
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mt-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="Location">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="priceRange">Price Range</label>

            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              required
            >
              <option value="">Price Range</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
              <option value="$$$$$">$$$$$</option>
            </select>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RestaurantUpdateForm;
