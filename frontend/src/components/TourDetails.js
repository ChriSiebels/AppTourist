import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyMap from "./Map";
import { Marker } from "react-map-gl";
import tourService from "../services/tours.services";

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
      <h1>{TourDetails.name}</h1>
      <p>{TourDetails.description}</p>
      <MyMap>
        {TourDetails.stops.map((stop, index) => (
          <Marker
            key={index}
            latitude={stop.latitude}
            longitude={stop.longitude}
          >
            {index + 1}
          </Marker>
        ))}
      </MyMap>
    </div>
  );
}
