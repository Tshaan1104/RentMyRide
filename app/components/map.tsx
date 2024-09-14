"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useCountries } from "../lib/getcountries";
import {icon} from 'leaflet';

export default function Map({locationValue}: {locationValue:string}) {
const {getcountriesvalue}=useCountries();

const latLang=getcountriesvalue(locationValue)?.latLang;


const ICON =icon({
    iconUrl:"https://freepngimg.com/thumb/map/69579-map-icons-symbol-wallpaper-desktop-computer-location.png",
    iconSize:[40,40],
}
)

  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON}/>
    </MapContainer>
  );
}
