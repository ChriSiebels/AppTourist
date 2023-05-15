import { useState, useEffect } from "react";
import axios from "axios";
import addTour from "./../components/Add.Tour";
import tourService from "../services/tours.services";
import AddTour from "./../components/Add.Tour";
import ToursCard from "./../components/ToursCard";

const API_URL = "http://localhost:5005";

function ToursList() {
  const [tours, setTours] = useState([]);

  const getAllTours = () => {
    // axios
    //   .get(
    //   `${API_URL}/api/projects`,
    //   { headers: { Authorization: `Bearer ${storedToken}` } }
    // )
    tourService
      .getAllTours()
      .then((response) => setTours(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllTours();
  }, []);

  return (
    <div className="ToursListPage">
      <AddTour refreshTours={getAllTours} />

      {tours.map((tour) => (
        <ToursCard key={tour._id} {...tour} />
      ))}
    </div>
  );
}

export default ToursList;
