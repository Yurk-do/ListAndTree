import { map } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const data = [
  { coordinates: [60.006, 38.7128], color: 'blue', name: 'marker1' },
  { coordinates: [74.008, 40.713], color: 'red', name: 'marker2' },
  { coordinates: [84.008, 45.713], color: 'yellow', name: 'marker3' },
  { coordinates: [40.006, 38.7128], color: 'black', name: 'marker4' },
  { coordinates: [56.008, 40.713], color: 'green', name: 'marker5' },
  { coordinates: [35.008, 45.713], color: 'red', name: 'marker6' },
];

const MyLeafletMap = () => {
  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={data[0].coordinates as [number, number]}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((dataItem) => (
        <Marker position={dataItem.coordinates as [number, number]}>
          <Popup>{dataItem.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyLeafletMap;
