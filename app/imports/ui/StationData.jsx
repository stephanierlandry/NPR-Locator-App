import React from 'react';
import { Session } from 'meteor/session';


export default class StationData extends React.Component {
  render() {

    const sessionData = Session.get('nprStations');

    return (
      <div>
        hey
      </div>
    );
  }
}
