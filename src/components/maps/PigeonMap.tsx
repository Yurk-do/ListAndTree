import { useState } from 'react';
import { Map, Marker } from 'pigeon-maps';

const PigeonMap = () => {
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const [center, setCenter] = useState([50.879, 4.6997]);
  const [zoom, setZoom] = useState(3);

  const data = [
    { coordinates: [60.006, 38.7128], color: 'blue', name: 'marker1' },
    { coordinates: [74.008, 40.713], color: 'red', name: 'marker2' },
    { coordinates: [84.008, 45.713], color: 'yellow', name: 'marker3' },
    { coordinates: [40.006, 38.7128], color: 'black', name: 'marker4' },
    { coordinates: [56.008, 40.713], color: 'green', name: 'marker5' },
    { coordinates: [35.008, 45.713], color: 'red', name: 'marker6' },
  ];

  return (
    <Map
      height={490}
      defaultCenter={data[0].coordinates as [number, number]}
      zoom={zoom}
      center={center as [number, number]}
      onBoundsChanged={({ center, zoom }) => {
        setCenter(center);
        setZoom(zoom);
      }}
    >
      {data.map((dataItem) => (
        <Marker
          width={50}
          anchor={dataItem.coordinates as [number, number]}
          color={dataItem.color}
          onClick={() => {
            console.log(dataItem.name);
          }}
        />
      ))}
    </Map>
  );
};

export default PigeonMap;
