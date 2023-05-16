import * as React from "react";
import Map from "react-map-gl";

function MyMap() {
  return (
    <Map
      initialViewState={{
        latitude: 51.505,
        longitude: -0.09,
        zoom: 13,
      }}
      style={{ width: 600, height: 400 }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/chrisiebels/clhhh3uib01ev01pga6fvc8x4"
    />
  );
}

export default MyMap;
