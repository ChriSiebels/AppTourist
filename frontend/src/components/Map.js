import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function addMap(propos) {
  const [viewport, setViewport] = useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 13,
    width: "100vw",
    height: "100vh",
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkers((prev) => [...prev, { latitude, longitude }]);
        setViewport((prev) => ({ ...prev, latitude, longitude }));
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const addMarker = (event) => {
    const [longitude, latitude] = event.lngLat;
    setMarkers((prev) => [...prev, { latitude, longitude }]);
  };

  return (
    <div className="Home">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/chrisiebels/clhhh3uib01ev01pga6fvc8x4"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onClick={addMarker}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            draggable={true}
            onDragEnd={(event) => {
              const [longitude, latitude] = event.lngLat;
              const newMarkers = [...markers];
              newMarkers[index] = { latitude, longitude };
              setMarkers(newMarkers);
            }}
          >
            <div onClick={() => setSelectedMarker(marker)}>📍</div>
          </Marker>
        ))}

        {selectedMarker && (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMarker(null)}
          ></Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
