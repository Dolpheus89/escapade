// src/MapComponent.jsx
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";

function MapComponent({ location }) {
  const mapRef = useRef(null);

  const [longitude, latitude] = location
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 8,
      }),
    });

    function addMarker(lon, lat) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0, 0],
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
        }),
      });

      iconFeature.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);
    }

    addMarker(longitude, latitude);

    function handleMapClick(event) {
      const coordinate = map.getEventCoordinate(event);
      console.info("Map clicked at:", coordinate);
      addMarker(coordinate[0], coordinate[1]);
    }

    map.on("click", handleMapClick);

    return () => map.setTarget(null);
  }, [longitude, latitude]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      className="map-border-animated"
    />
  );
}

MapComponent.propTypes = {
  location: PropTypes.string.isRequired,
};

export default MapComponent;
