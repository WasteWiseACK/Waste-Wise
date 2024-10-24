import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";

function C02() {
  return (
    <div className='C02Map'>
      <MapContainer center={[40.730610, -73.935242]} zoom={11.6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  )
}

export default C02