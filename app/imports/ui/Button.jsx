import React from 'react';
import { getNprStation } from '/imports/helpers/locationHelpers.jsx';
import { Session } from 'meteor/session';

export default class Search extends React.Component {
  render() {

    const getStationByLocation = (event) => {
      const value = event.target.value;
      // let nprStations = Session.get('nprStations');
      if( value.length > 4){
        getNprStation(value);
      }
    }

    return (
      <div>
        <input type="search" onChange={getStationByLocation}/>
        <button className="button NPR-container__button" >Find By Location</button>
      </div>
    );
  }
}
