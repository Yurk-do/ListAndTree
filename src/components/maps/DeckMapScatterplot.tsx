import DeckGL from '@deck.gl/react';
import { ColumnLayer, ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import { GridLayer } from '@deck.gl/aggregation-layers';

type sourseDataType = {
  coordinates: [number, number];
  name: string;
  address: string;
};

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieXVyay1kbyIsImEiOiJja3d3MGplNnIxbzc5Mm9sc3p6NzBqNGt3In0.yg6L2Ay-ddmdnZ-5GsYzLQ';

const scatterplotData: sourseDataType[] = [
  { coordinates: [60.006, 38.7128], name: 'marker1', address: 'green street' },
  { coordinates: [74.008, 40.713], name: 'marker2', address: 'red street' },
  { coordinates: [84.008, 45.713], name: 'marker3', address: 'blue street' },
  { coordinates: [40.006, 38.7128], name: 'marker4', address: 'black street' },
  { coordinates: [56.008, 40.713], name: 'marker5', address: 'yellow street' },
  { coordinates: [35.008, 45.713], name: 'marker6', address: 'white street' },
];

const INITIAL_VIEW_STATE = {
  longitude: scatterplotData[0].coordinates[0],
  latitude: scatterplotData[0].coordinates[1],
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const DeckMapScatterPlot = () => {
  const scatterplot = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: scatterplotData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 10,
    radiusMaxPixels: 15,
    getPosition: (d: any) => d.coordinates,
    getFillColor: (d: any) =>
      d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[scatterplot]}
      getTooltip={({ object }: any) =>
        object && `${object.name}\n${object.address}`
      }
    >
      <StaticMap
        width="500px"
        height="400px"
        latitude={37.78}
        longitude={-122.45}
        zoom={8}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
};

export default DeckMapScatterPlot;
