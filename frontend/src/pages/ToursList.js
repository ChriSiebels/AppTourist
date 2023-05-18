import { useState, useEffect } from "react";
// import axios from "axios";
import tourService from "../services/tours.services";
import ToursCard from "./../components/ToursCard";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
// const API_URL = "http://localhost:5005";

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
      <div className="logo-container">
        <img
          className="logont"
          src={logo}
          alt="logo"
          style={{ width: "100px", height: "auto" }}
        ></img>
      </div>
      <h1>Tour List</h1>
      {tours.map((tour) => (
        <Link to={`/tours/${tour._id}`} key={tour._id}>
          <ToursCard key={tour._id} {...tour} />
        </Link>
      ))}
      <footer>ChriSiebels</footer>
    </div>
  );
}

export default ToursList;
