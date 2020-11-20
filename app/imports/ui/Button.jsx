import React from 'react';
import { onSuccess, onError } from '/imports/helpers/locationHelpers.jsx'

export default class Button extends React.Component {
  render() {

    const getStationByLocation = () => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    return (
      <button className="button NPR-container__button" onClick={getStationByLocation()} >Find By Location</button>
    );
  }
}
