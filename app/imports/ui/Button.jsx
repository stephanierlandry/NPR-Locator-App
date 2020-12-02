import React from 'react';
import { onSuccess, onError } from '/imports/helpers/locationHelpers.jsx';
import { Session } from 'meteor/session';

export default class Search extends React.Component {
  render() {

    const getStationByLocation = (event) => {
      const value = event.target.value;
      Session.set('query', value);
      const query = Session.get('query')
      console.log(query)
    }

    return (
      <div>
        <input type="search" onChange={getStationByLocation}/>
        <button className="button NPR-container__button">Find By Location</button>
      </div>
    );
  }
}
