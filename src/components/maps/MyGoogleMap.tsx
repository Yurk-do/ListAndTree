import GoogleMapReact from 'google-map-react';
import './googleMap.scss'

const GoogleMapMarker = ({ text }: any) => <div className="google-map-marker">{text}</div>;

const data = [
  {
    coordinates: {
      latitude: 59.955413,
      longitude: 30.337844,
    },
    text: 'My Marker1',
  },
  {
    coordinates: {
      latitude: 63.955413,
      longitude: 35.337844,
    },
    text: 'My Marker2',
  },
  {
    coordinates: {
      latitude: 56.955413,
      longitude: 27.337844,
    },
    text: 'My Marker3',
  },
];

const MyGoogleMap = () => {
  const defaultProps = {
    center: {
      lat: data[0].coordinates.latitude,
      lng: data[0].coordinates.longitude,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={2}
      >
        {data.map((item) => (
          <GoogleMapMarker
            lat={item.coordinates.latitude}
            lng={item.coordinates.longitude}
            text={item.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MyGoogleMap;
