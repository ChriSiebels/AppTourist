import { useState } from "react";
import Map from "../components/Map";
import { Marker } from "react-map-gl";
import tourService from "../services/tours.services";

export default function NewTour() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stops, setStops] = useState([]);
  console.log(stops);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input>
      <input
        type="text"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></input>
      <button
        onClick={async (event) => {
          console.log("si");
          try {
            await tourService.createTour({
              name,
              description,
              stops,
            });
            window.alert("tour saved");
          } catch {
            window.alert("error");
          }
        }}
      >
        Ok
      </button>
      <Map
        onClick={(event) => {
          const newStop = {
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
          };
          setStops([...stops, newStop]);
        }}
      >
        {stops.map((stop, index) => (
          <Marker
            key={index}
            latitude={stop.latitude}
            longitude={stop.longitude}
          >
            {index + 1}
          </Marker>
        ))}
      </Map>
    </div>
  );
}
