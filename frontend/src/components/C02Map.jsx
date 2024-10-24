import 'leaflet/dist/leaflet.css';
import 'leaflet-heatmap';
import 'leaflet.heat';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from 'react';

const HeatmapLayer = ({ C02Data }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = C02Data.map(point => [ // this is the data that will be shown on the map;
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
  }, [map, C02Data]);

  return null;
};

const C02Map = () => { // responsible for fetching foodInsecurity data and rendering the HeatmapLayer with that data.
  // Fake data!
  const [emissionsData, setEmissionsData] = useState(() => {
    const data = [];
    const latRange = [40.5774, 45.01585]; // Approximate latitude range for NYC
    const lngRange = [-74.25909, -73.700171]; // Approximate longitude range for NYC

    for (let i = 0; i < 100; i++) { // Generate 100 random points
      const latitude = (Math.random() * (latRange[1] - latRange[0])) + latRange[0];
      const longitude = (Math.random() * (lngRange[1] - lngRange[0])) + lngRange[0];
      const count = Math.floor(Math.random() * 100); // Random count between 0 and 100

      data.push({ latitude, longitude, count });
    }

    return data;
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/emissions');
  //     const data = await response.json();
  //     setEmissionsData(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='C02Map'>
      <h1>C02 Emissions Map</h1>
      <MapContainer center={[40.730610, -73.935242]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <HeatmapLayer C02Data={emissionsData} />
      </MapContainer>
    </div>
  );
};

export default C02Map;