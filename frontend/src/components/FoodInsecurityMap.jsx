import 'leaflet/dist/leaflet.css';
import 'leaflet-heatmap';
import 'leaflet.heat';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from 'react';

const HeatmapLayer = ({ foodData }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = foodData.map(point => [ // this is the data that will be shown on the map;
      point.latitude,    // Latitude
      point.longitude,   // Longitude
      point.count        // Intensity
    ]);

    // Ensure heatData does not have any null or undefined values
    const validHeatData = heatData.filter(
      ([lat, lng]) => lat !== null && lng !== null
    );

    const heatmapLayer = L.heatLayer(validHeatData, { // creates a heatmap layer using Leaflet's heatmap functionality
      radius: 25, // The size of each point in the heatmap
      blur: 15,
      maxZoom: 10, // The maximum zoom level at which the heatmap is visible.
    }).addTo(map);

    return () => {
      map.removeLayer(heatmapLayer); // Clean up the layer on unmount
    };
  }, [map, foodData]);

  return null;
};

const FoodInsecurityMap = () => { // responsible for fetching foodInsecurity data and rendering the HeatmapLayer with that data.
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/foodData');
      const data = await response.json();
      setFoodData(data);
    };

    fetchData();
  }, []);

  return (
    <div className='FoodInsecurityMap'>
      <h1>Food Insecurity Map</h1>
      <p className=''>Levels of food insecurity in New York City</p>
      <MapContainer center={[40.730610, -73.935242]} zoom={11.6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <HeatmapLayer foodData={foodData} />
      </MapContainer>
    </div>
  );
};

export default FoodInsecurityMap;