import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../scenes/homePage";

const App = () => {
  return (
    <div className="app container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
