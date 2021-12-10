import DeckGL from '@deck.gl/react';
import { ColumnLayer, ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import { GridLayer } from '@deck.gl/aggregation-layers';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieXVyay1kbyIsImEiOiJja3d3MGplNnIxbzc5Mm9sc3p6NzBqNGt3In0.yg6L2Ay-ddmdnZ-5GsYzLQ';

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  zoom: 11,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

const DeckMapGrid = () => {
  const layer = new GridLayer({
    id: 'GridLayer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
    cellSize: 200,
    elevationScale: 4,
    extruded: true,
    getPosition: (d: any) => d.COORDINATES,
    pickable: true,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[layer]}
      getTooltip={({ object }: any) =>
        object &&
        `${object.position.join(', ')}
      Count: ${object.count}`
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

export default DeckMapGrid;
