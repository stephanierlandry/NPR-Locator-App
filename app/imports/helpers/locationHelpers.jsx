import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { EJSON } from 'meteor/ejson';

const onSuccess = (position) => {

  Session.set('lat', position.coords.latitude);
  Session.set('lon', position.coords.longitude);

  Meteor.call('getLocationByZip',position.coords.latitude, position.coords.longitude, (e,r) => {
    const parsedZipResult = EJSON.parse(r.content);
    Session.set('zip', parsedZipResult.postalCodes[0].postalCode);

    const zipCodeResult = Session.get('zip');

    Meteor.call('getNprData', zipCodeResult, (e,r) => {
      const parsedNprResult = EJSON.parse(r.content);
      const nprStationResult = parsedNprResult.items
      const stations = [];

      for(let ii of nprStationResult){
        const stationData = ii.attributes.brand;
          stations.push({
            'call' : `${stationData.call}`,
            'frequency' : `${stationData.frequency}`,
            'city' : `${stationData.marketCity}`,
            'state' : `${stationData.marketState}`,
            'name' : `${stationData.name}`,
            'tagline' : `${stationData.tagline}`})
      }

      console.log('im working', stations)

      Session.set('nprStations', stations);
    })
  })
}


const onError = (error) => {
  alert(error.message)
  Session.set('geoLocateError', error.message);
}

export { onError, onSuccess };
