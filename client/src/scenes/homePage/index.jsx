import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../../components/Heading";
import RestaurantsTable from "../../components/RestaurantsTable";
import AddRestaurantForm from "../../components/AddRestaurantForm";

export const HomePage = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/restaurant");
        setRestaurantsData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Heading>Restaurant Finder</Heading>
      <AddRestaurantForm />
      <RestaurantsTable
        restaurantsData={restaurantsData}
        setRestaurantsData={setRestaurantsData}
      />
    </>
  );
};
