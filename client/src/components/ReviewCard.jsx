import React from "react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <div className="col-4">
      <div
        class="card text-white bg-primary mb-3"
        style={{ maxWidth: "22rem" }}
      >
        <div class="card-header d-flex justify-content-between">
          <div>{review.reviewer_name}</div>
          <Rating
            name="read-only"
            value={review.rating}
            precision={0.5}
            readOnly
          />
        </div>
        <div class="card-body">
          <p class="card-text">{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
