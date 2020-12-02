import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { EJSON } from 'meteor/ejson';

const onSuccess = (position) => {

  Session.set('lat', position.coords.latitude);
  Session.set('lon', position.coords.longitude);

  Meteor.call('getLocationByZip',position.coords.latitude, position.coords.longitude, (e,r) => {
    if (r) {
      const parsedZipResult = EJSON.parse(r.content);
      Session.set('zip', parsedZipResult.postalCodes[0].postalCode);
      const zipCodeResult = Session.get('zip');

    }

    if (e) {
      Session.set('apiError', e)
    }
  })
}

const onError = (error) => {
  alert(error.message)
  Session.set('geoLocateError', error.message);
}

const getNprStation = (zip) => {

  Meteor.call('getNprData', zip, (e,r) => {
    console.log(r)
    if (r){
      const parsedNprResult = EJSON.parse(r.content);
      const nprStationResult = parsedNprResult.items;
      let stations = [ ];

      for(let ii of nprStationResult){
        const stationData = ii.attributes.brand;
        const stationLogo = ii.links.brand[1].href;
          stations.push({
            'call' : `${stationData.call}`,
            'frequency' : `${stationData.frequency}`,
            'city' : `${stationData.marketCity}`,
            'state' : `${stationData.marketState}`,
            'name' : `${stationData.name}`,
            'tagline' : `${stationData.tagline}`,
            'logoUrl' : `${stationLogo}`
          })
      }
        
      return stations;
    }

    if(e) {
      console.error(e)
      Session.set('nprStationError', true);
    }
  })
}

export { onError, onSuccess, getNprStation };
