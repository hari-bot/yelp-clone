import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    review: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { id } = useParams();

  const handleSubmit = async () => {
    try {
      console.log(formData);
      await axios.post(
        `http://localhost:3001/restaurant/${id}/reviews`,
        formData
      );
      setFormData({
        name: "",
        rating: "",
        review: "",
      });
      console.log("Form data sent successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-8">
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
          <div className="col-4">
            <label htmlFor="rating">Rating</label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="review">Review</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="review"
              value={formData.review}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
