import { useState, useEffect } from "react";
import Map from "../components/Map";
import { Marker } from "react-map-gl";
import tourService from "../services/tours.services";
import myLocationIcon from "../assest/images.png";
import "../pages/Home.css";
import logo from "../assest/logo.png";

export default function NewTour() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialStop = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          setStops([initialStop]);
        },
        (error) => {
          console.error("Error obtaining geolocation: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="container">
      <div className="logo-container">
        <img className="logont" src={logo} alt="logo" />
      </div>
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label htmlFor="description">Descripción:</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
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
      <div style={{ marginTop: "20px" }}>
        <Map
          className="mapa"
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
              {index === 0 ? (
                <img
                  src={myLocationIcon}
                  alt="my location"
                  style={{ width: "20px", height: "auto" }}
                />
              ) : (
                index
              )}
            </Marker>
          ))}
        </Map>
      </div>
      <footer>ChriSiebels</footer>
    </div>
  );
}
