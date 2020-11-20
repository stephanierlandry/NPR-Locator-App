import React from 'react';


export default class StationData extends React.Component {
  render() {

    const sessionData = Session.get('nprStations');
    console.log(sessionData)

    return (
      <div>
        {
          sessionData.map(station => {
            return (
              <div>
                <div>{station.frequency}</div>
                <div>{station.name}</div>
                <div>{station.tagline}</div>
              </div>
            )
          })
        }
      </div>
    );
  }
}
