import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../scenes/homePage";
import RestaurantPage from "../scenes/restaurantPage";
import RestaurantUpdatePage from "../scenes/updateRestaurantPage";

const App = () => {
  return (
    <div className="app container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route
            path="/restaurant/:id/update"
            element={<RestaurantUpdatePage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
