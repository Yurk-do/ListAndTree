import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const SimpleMap = () => {
  const options = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '1' }}
        defaultCenter={options.center}
        defaultZoom={options.zoom}
      >
        <AnyReactComponent>
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        </AnyReactComponent>
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
