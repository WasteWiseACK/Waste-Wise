import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";

function FoodInsecurity() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/heatmap-data');
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='FoodInsecurityMap'>
      <MapContainer center={[40.730610, -73.935242]} zoom={11.6} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <HeatmapLayer
        points={data.map(point => ({
          lat: point.latitude,
          lng: point.longitude,
          value: point.intensity,
        }))}
        longitudeExtractor={m => m.lng}
        latitudeExtractor={m => m.lat}
        valueExtractor={m => m.value}
      /> */}
      </MapContainer>
    </div>
  );
};

export default FoodInsecurity