import axios from "axios";
import React, { useState } from "react";

const AddRestaurantForm = () => {
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

  const handleSubmit = async () => {
    try {
      console.log(formData);
      await axios.post("http://localhost:3001/restaurant", formData);
      setFormData({
        name: "",
        location: "",
        priceRange: "",
      });
      console.log("Form data sent successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
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
          <div className="col">
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
          <div className="col">
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              required
            >
              <option>Price Range</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
              <option value="$$$$$">$$$$$</option>
            </select>
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
