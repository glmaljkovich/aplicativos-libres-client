/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Leaflet */
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
/** React Leaflet */
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
/** App Imports */
import SearchControl from 'components/maps/SearchControl';
import { GeoUtils } from 'utils';
import Loader from 'components/Loader';

const styles = {
  map: {
    textAlign: 'center',
    color: 'white',
  },
};


export default class Geolocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
    };
    this.searchRef = React.createRef();
  }


  static propTypes = {
    onSearchSubmit: PropTypes.func,
  }

  /**
   * Lifecycle Methods
   **/

  componentDidMount() {
    if ('geolocation' in navigator) {
      this.loadPosition();
    }
  }

  /**
   * Geolocation Methods
   **/

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  getCurrentPosition = async (options = {}) => new Promise((resolve, reject) => {
    GeoUtils.getCurrentPosition(resolve, reject, options);
  });


  getDistance = async (coords) => new Promise(
    (resolve) => resolve(
      GeoUtils.getDistance(coords.latitude, coords.longitude, null, null)
    )
  );

  onSearchSubmit = () => {
    const { resultList } = this.searchRef.current.leafletElement;
    if (resultList.results && resultList.results.length > 0) {
      const result = resultList.results[0];
      const data = {
        latitude: result.y,
        longitude: result.x,
        address: result.label,
      };
      this.props.onSearchSubmit(data);
    }
  }

  /**
   * Render Methods
   **/

  renderLoader() {
    return (
      <Loader />
    );
  }

  renderMap() {
    const { latitude, longitude } = this.state;
    const position = {
      lat: latitude,
      lng: longitude,
    };
    return (
      <Map
        center={position}
        zoom={15}
        zoomControl={false}
        doubleClickZoom={false}
        dragging={false}
        boxZoom={false}
        scrollWheelZoom={false}
        keyboard={false}
        onViewportChanged={this.onSearchSubmit}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>
            ¡Estás acá!
          </Popup>
        </Marker>
        <SearchControl position="topleft" ref={this.searchRef} />
      </Map>
    );
  }

  render() {
    if (this.state.latitude && this.state.longitude) {
      return (
        <div>
          <div style={styles.map}>
            { this.renderMap() }
          </div>
        </div>
      );
    }
    return (
      <div style={styles.map}>
        { this.renderLoader() }
        <h5>Es necesario activar la geolocalización para cargar un evento</h5>
      </div>
    );
  }
}
