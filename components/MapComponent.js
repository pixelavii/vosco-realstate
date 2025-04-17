// components/MapComponent.js
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ coords, location }) => {
  return (
    <MapContainer className="shadow-2xl shadow-sky-500"
      center={[coords.latitude, coords.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coords.latitude, coords.longitude]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
