import React from "react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <div className="col-4">
      <div
        className="card text-white bg-primary mb-3"
        style={{ maxWidth: "22rem" }}
      >
        <div className="card-header d-flex justify-content-between">
          <div>{review.reviewer_name}</div>
          <Rating
            name="read-only"
            value={parseFloat(review.rating)}
            precision={0.5}
            readOnly
          />
        </div>
        <div className="card-body">
          <p className="card-text">{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
