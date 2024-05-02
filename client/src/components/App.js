import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../scenes/homePage";
import RestaurantPage from "../scenes/restaurantPage";

const App = () => {
  return (
    <div className="app container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
