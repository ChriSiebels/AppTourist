import * as React from "react";
import Map from "react-map-gl";

function MyMap({ children, ...additionalProps }) {
  return (
    <Map
      className="mapa"
      id="mapaso"
      initialViewState={{
        latitude: 51.505,
        longitude: -0.09,
        zoom: 13,
      }}
      style={{
        height: 500,
        border: "1px solid",
        borderRight: "3px solid",
        borderBottom: "3px solid",
        borderRadius: "30px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        paddingBottom: "10px",
      }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/chrisiebels/clhhh3uib01ev01pga6fvc8x4"
      {...additionalProps}
    >
      {children}
    </Map>
  );
}

export default MyMap;
