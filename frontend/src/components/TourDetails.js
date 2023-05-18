import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyMap from "./Map";
import { Marker } from "react-map-gl";
import tourService from "../services/tours.services";
import myLocationIcon from "../assest/hostel.png";
import logo from "../assest/logo.png";

export default function TourDetails() {
  const { tourId } = useParams();
  const [TourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    tourService
      .getAllTours()
      .then((response) => {
        const selectedTour = response.data.find((tour) => tour._id === tourId);

        console.log(response.data);
        setTourDetails(selectedTour);
      })
      .catch((error) => console.log(error));
  }, [tourId]);

  if (!TourDetails) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ width: "500px", height: "auto" }}
      ></img>
      <h1>{TourDetails.name}</h1>
      <p>{TourDetails.description}</p>
      <MyMap>
        {TourDetails.stops.map((stop, index) => (
          <Marker
            key={index}
            latitude={stop.latitude}
            longitude={stop.longitude}
          >
            {index === 0 ? (
              <img
                src={myLocationIcon}
                alt="my location"
                style={{ width: "25px", height: "auto" }}
              />
            ) : (
              index
            )}
          </Marker>
        ))}
      </MyMap>
    </div>
  );
}
