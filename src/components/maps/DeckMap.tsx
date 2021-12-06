// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import { LineLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
// @ts-ignore
import { MapView } from '@deck.gl/core';

// @ts-ignore
import { Deck } from '@deck.gl/core';
// @ts-ignore
import { ScatterplotLayer } from '@deck.gl/layers';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

const deck = new Deck({
  initialViewState: {
    longitude: -122.45,
    latitude: 37.78,
    zoom: 12,
  },
  controller: true,
  layers: [new ScatterplotLayer({ data })],
});

const DeckMap = () => {
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoieXVyay1kbyIsImEiOiJja3d1cDlzbnkxczM3MnFxb3R4cXE3MG96In0.9DnDT6EVhQMjbesE_AYfRQ';
  const layers = [new LineLayer({ id: 'line-layer', data })];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <MapView id="map" controller={true}>
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </MapView>
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default DeckMap;
