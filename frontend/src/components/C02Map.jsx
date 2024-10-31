import 'leaflet/dist/leaflet.css';
import 'leaflet-heatmap';
import 'leaflet.heat';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from 'react';

// Predefined CO2 emissions data
const co2EmissionsClusters = [
  // Brooklyn (increased points)
  { lat: 40.7081, lng: -73.9571, count: 12500 }, // Williamsburg
  { lat: 40.7081, lng: -73.9571, count: 13000 }, // Williamsburg
  { lat: 40.6683, lng: -73.9352, count: 10800 }, // Crown Heights
  { lat: 40.6683, lng: -73.9352, count: 11000 }, // Crown Heights
  { lat: 40.6840, lng: -73.9118, count: 14200 }, // Bushwick
  { lat: 40.6840, lng: -73.9118, count: 14500 }, // Bushwick
  { lat: 40.6683, lng: -73.9765, count: 9300 },  // Park Slope
  { lat: 40.6683, lng: -73.9765, count: 9500 },  // Park Slope
  { lat: 40.6850, lng: -73.9442, count: 11000 }, // Bed-Stuy
  { lat: 40.6850, lng: -73.9442, count: 12000 }, // Bed-Stuy
  { lat: 40.6508, lng: -74.0028, count: 15400 }, // Sunset Park
  { lat: 40.6508, lng: -74.0028, count: 16000 }, // Sunset Park
  { lat: 40.7282, lng: -73.9557, count: 8700 },  // Greenpoint
  { lat: 40.7282, lng: -73.9557, count: 8900 },  // Greenpoint
  { lat: 40.6732, lng: -74.0113, count: 7600 },  // Red Hook
  { lat: 40.6732, lng: -74.0113, count: 7800 },  // Red Hook
  { lat: 40.6287, lng: -74.0332, count: 10000 }, // Bay Ridge
  { lat: 40.6287, lng: -74.0332, count: 10500 }, // Bay Ridge
  { lat: 40.6444, lng: -73.9518, count: 13000 }, // Flatbush
  { lat: 40.6444, lng: -73.9518, count: 13500 }, // Flatbush
  { lat: 40.6815, lng: -73.9140, count: 9500 },  // Fort Greene
  { lat: 40.6815, lng: -73.9140, count: 9700 },  // Fort Greene
  { lat: 40.6438, lng: -73.9070, count: 8500 },  // East New York
  { lat: 40.6438, lng: -73.9070, count: 8700 },  // East New York
  { lat: 40.6323, lng: -73.9749, count: 11200 }, // Prospect Lefferts Gardens
  { lat: 40.6323, lng: -73.9749, count: 11500 }, // Prospect Lefferts Gardens
  { lat: 40.6500, lng: -73.9146, count: 9200 },  // Canarsie
  { lat: 40.6500, lng: -73.9146, count: 9500 },  // Canarsie
  { lat: 40.6449, lng: -73.9700, count: 10800 }, // Williamsburg (South)
  { lat: 40.6449, lng: -73.9700, count: 11000 }, // Williamsburg (South)
  { lat: 40.7219, lng: -73.9635, count: 9900 },  // Downtown Brooklyn
  { lat: 40.7219, lng: -73.9635, count: 10200 }, // Downtown Brooklyn
  { lat: 40.7053, lng: -73.9796, count: 8400 },  // Brooklyn Heights
  { lat: 40.7053, lng: -73.9796, count: 8600 },  // Brooklyn Heights
  { lat: 40.6744, lng: -73.9402, count: 9400 },  // Windsor Terrace
  { lat: 40.6744, lng: -73.9402, count: 9600 },  // Windsor Terrace
  { lat: 40.6936, lng: -73.9129, count: 8900 },  // Gerritsen Beach
  { lat: 40.6936, lng: -73.9129, count: 9100 },  // Gerritsen Beach
  { lat: 40.6401, lng: -73.9323, count: 11500 }, // Brownsville
  { lat: 40.6401, lng: -73.9323, count: 11700 }, // Brownsville
  { lat: 40.6782, lng: -73.9442, count: 9500 },  // Flatlands
  { lat: 40.6782, lng: -73.9442, count: 9700 },  // Flatlands
  { lat: 40.6297, lng: -73.9990, count: 8900 },  // DUMBO
  { lat: 40.6297, lng: -73.9990, count: 9100 },  // DUMBO
  { lat: 40.6848, lng: -73.8837, count: 8300 },  // Sheepshead Bay
  { lat: 40.6848, lng: -73.8837, count: 8500 },  // Sheepshead Bay
  { lat: 40.6885, lng: -73.9707, count: 10100 }, // Coney Island
  { lat: 40.6885, lng: -73.9707, count: 10300 }, // Coney Island
  { lat: 40.6528, lng: -73.9567, count: 9000 },  // Prospect Park South
  { lat: 40.6528, lng: -73.9567, count: 9200 },  // Prospect Park South
  { lat: 40.7116, lng: -73.9579, count: 8500 },  // Fort Hamilton
  { lat: 40.7116, lng: -73.9579, count: 8700 },  // Fort Hamilton
  { lat: 40.6767, lng: -73.9632, count: 9100 },  // Bensonhurst
  { lat: 40.6767, lng: -73.9632, count: 9300 },  // Bensonhurst
  { lat: 40.6500, lng: -73.9838, count: 8800 },  // Gravesend
  { lat: 40.6500, lng: -73.9838, count: 9000 },  // Gravesend
  { lat: 40.6089, lng: -73.9620, count: 9700 },  // Brighton Beach
  { lat: 40.6089, lng: -73.9620, count: 9900 },  // Brighton Beach
  // Brooklyn (Gravesend, Sheepshead Bay, Marine Park, Coney Island)
  { lat: 40.6500, lng: -73.9838, count: 9000 },  // Gravesend
  { lat: 40.6452, lng: -73.9645, count: 8800 },  // Gravesend (near Avenue U)
  { lat: 40.6459, lng: -73.9866, count: 8500 },  // Gravesend (near Avenue X)
  { lat: 40.6888, lng: -73.9442, count: 10000 }, // Sheepshead Bay
  { lat: 40.6644, lng: -73.9344, count: 9400 },  // Sheepshead Bay (near Emmons Avenue)
  { lat: 40.6282, lng: -73.9365, count: 9200 },  // Sheepshead Bay (near Ocean Avenue)
  { lat: 40.6074, lng: -73.9174, count: 9300 },  // Marine Park
  { lat: 40.6121, lng: -73.9256, count: 9500 },  // Marine Park (near Flatbush Avenue)
  { lat: 40.6202, lng: -73.9331, count: 9700 },  // Marine Park (near Fillmore Avenue)
  { lat: 40.6885, lng: -73.9707, count: 10300 }, // Coney Island
  { lat: 40.5785, lng: -73.9655, count: 9500 },  // Coney Island (near Stillwell Avenue)
  { lat: 40.5863, lng: -73.9311, count: 8700 },  // Coney Island (near Neptune Avenue)
  { lat: 40.6182, lng: -73.9721, count: 9000 },   // Coney Island (near Sea Breeze)

  // Queens (neighborhood points)
  { lat: 40.7439, lng: -73.9442, count: 12000 }, // Astoria
  { lat: 40.7439, lng: -73.9442, count: 12500 }, // Astoria
  { lat: 40.7181, lng: -73.8290, count: 8000 },  // Flushing
  { lat: 40.7181, lng: -73.8290, count: 8500 },  // Flushing
  { lat: 40.7424, lng: -73.7424, count: 11000 }, // Jamaica
  { lat: 40.7424, lng: -73.7424, count: 11500 }, // Jamaica
  { lat: 40.7712, lng: -73.8445, count: 9500 },  // Forest Hills
  { lat: 40.7712, lng: -73.8445, count: 9700 },  // Forest Hills
  { lat: 40.6454, lng: -73.8783, count: 9900 },  // Elmhurst
  { lat: 40.6454, lng: -73.8783, count: 10200 }, // Elmhurst
  { lat: 40.7482, lng: -73.8918, count: 10500 }, // Jackson Heights
  { lat: 40.7482, lng: -73.8918, count: 10800 }, // Jackson Heights
  { lat: 40.7306, lng: -73.8977, count: 8600 },  // Corona
  { lat: 40.7306, lng: -73.8977, count: 8800 },  // Corona
  { lat: 40.7308, lng: -73.8528, count: 9100 },  // Ozone Park
  { lat: 40.7308, lng: -73.8528, count: 9300 },  // Ozone Park
  { lat: 40.6782, lng: -73.8042, count: 8700 },  // Howard Beach
  { lat: 40.6782, lng: -73.8042, count: 8900 },  // Howard Beach
  { lat: 40.7555, lng: -73.9225, count: 9600 },  // Long Island City
  { lat: 40.7555, lng: -73.9225, count: 9800 },  // Long Island City
  { lat: 40.7065, lng: -73.7929, count: 9300 },  // Richmond Hill
  { lat: 40.7065, lng: -73.7929, count: 9500 },  // Richmond Hill
  { lat: 40.7432, lng: -73.8444, count: 8200 },  // Kew Gardens
  { lat: 40.7432, lng: -73.8444, count: 8400 },  // Kew Gardens
  { lat: 40.7900, lng: -73.9735, count: 9300 },  // Rego Park
  { lat: 40.7900, lng: -73.9735, count: 9500 },  // Rego Park
  { lat: 40.7547, lng: -73.9240, count: 8700 },  // Astoria Heights
  { lat: 40.7547, lng: -73.9240, count: 8900 },  // Astoria Heights
  { lat: 40.7590, lng: -73.8478, count: 9100 },  // South Ozone Park
  { lat: 40.7590, lng: -73.8478, count: 9300 },  // South Ozone Park


  // Manhattan (remains unchanged)
  { lat: 40.7851, lng: -73.9754, count: 18500 }, // Upper West Side
  { lat: 40.7732, lng: -73.9566, count: 20300 }, // Upper East Side
  { lat: 40.7549, lng: -73.9845, count: 25000 }, // Midtown
  { lat: 40.7074, lng: -74.0113, count: 22800 }, // Lower Manhattan
  { lat: 40.8116, lng: -73.9496, count: 15200 }, // Harlem
  { lat: 40.7448, lng: -74.0024, count: 14600 }, // Chelsea
  { lat: 40.7270, lng: -73.9802, count: 12000 }, // East Village
  { lat: 40.7337, lng: -74.0021, count: 10500 }, // West Village
  { lat: 40.7074, lng: -74.0113, count: 19000 }, // Financial District
  { lat: 40.8651, lng: -73.9190, count: 9400 }   // Inwood
];


const HeatmapLayer = ({ C02Data }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = C02Data.map(point => [
      point.lat,    // Latitude
      point.lng,    // Longitude
      point.count   // Intensity
    ]);

    // Ensure heatData does not have any null or undefined values
    const validHeatData = heatData.filter(
      ([lat, lng]) => lat !== null && lng !== null
    );

    const heatmapLayer = L.heatLayer(validHeatData, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      map.removeLayer(heatmapLayer);
    };
  }, [map, C02Data]);

  return null;
};

const C02Map = () => {
  return (
    <div className='C02Map'>
      <h1>C02 Emissions</h1>
      <p> New York City map based on Food Insecurity</p>
      <MapContainer center={[40.730610, -73.935242]} zoom={11.6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <HeatmapLayer C02Data={co2EmissionsClusters} />
      </MapContainer>

    </div>
  );
};

export default C02Map;
