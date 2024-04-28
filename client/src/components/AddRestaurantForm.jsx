import React from "react";

const AddRestaurantForm = () => {
  return (
    <div className="mb-4">
      <form>
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Price Range</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
              <option value="$$$$$">$$$$$</option>
            </select>
          </div>
          <div className="col">
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
