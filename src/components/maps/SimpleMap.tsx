import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

const data = [
  [60.006, 38.7128],
  [74.008, 40.713],
  [84.008, 45.713],
  [40.006, 38.7128],
  [56.008, 40.713],
  [35.008, 45.713],
];

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const SimpleMap = () => {
  return (
    <ComposableMap>
      <ZoomableGroup zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {data.map((coordinat: any) => (
          <Marker coordinates={coordinat}>
            <circle r={3} fill="#F53" />
          </Marker>
        ))}

        {/* <Marker coordinates={[-74.006, 40.7128]}>
          <circle r={8} fill="#F53" />
        </Marker> */}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default SimpleMap;
