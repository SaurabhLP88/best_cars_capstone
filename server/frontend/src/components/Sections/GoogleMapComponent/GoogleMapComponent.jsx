import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";
import markerLogo from "../../../assets/images/logos/bestcars_dark_01.png";

import "leaflet/dist/leaflet.css";

const GoogleMapComponent = () => {

  const customIcon = new L.Icon({
    iconUrl: markerLogo,
    iconSize: [140, 25],        // width, height
    iconAnchor: [70, 30],      // center bottom point
    popupAnchor: [0, -40],     // popup position
  });

  return (
    <MapContainer
      center={[41.850033, -87.650052]}
      zoom={15}
      scrollWheelZoom={false}   // ❌ disable mouse scroll zoom
      dragging={false}          // ❌ disable dragging
      doubleClickZoom={false}   // ❌ disable double click zoom
      touchZoom={false}         // ❌ disable touch zoom (mobile)
      zoomControl={true}        // ✅ keep zoom buttons
      style={{ height: "450px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[41.850033, -87.650052]} icon={customIcon}>
        <Popup>Dealer Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default GoogleMapComponent;