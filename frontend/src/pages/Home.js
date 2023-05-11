import "./Home.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 13,
    width: "100vw",
    height: "100vh",
  });

  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [showPopup, setShowPopup] = useState(false);

  const onMarkerDragEnd = (event) => {
    const newMarkerPosition = [event.lngLat[1], event.lngLat[0]];
    setMarkerPosition(newMarkerPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        setViewport((prev) => ({ ...prev, latitude, longitude }));
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div className="Home">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/chrisiebels/clhhh3uib01ev01pga6fvc8x4"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          latitude={markerPosition[0]}
          longitude={markerPosition[1]}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        >
          <div>📍</div>
        </Marker>

        {showPopup && (
          <Popup
            latitude={markerPosition[0]}
            longitude={markerPosition[1]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <div>
              A pretty CSS3 popup. <br /> Easily customizable.
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
