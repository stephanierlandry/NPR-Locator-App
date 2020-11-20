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

      Meteor.call('getNprData', zipCodeResult, (e,r) => {
        if (r){
          const parsedNprResult = EJSON.parse(r.content);
          const nprStationResult = parsedNprResult.items
          const stations = [];

          for(let ii of nprStationResult){
            const stationData = ii.attributes.brand;
            const stationImageUrl = ii.links.brand[1].href;
            // console.log('from locationHelpers', ii.links.brand[1].href)
              stations.push({
                'call' : `${stationData.call}`,
                'frequency' : `${stationData.frequency}`,
                'city' : `${stationData.marketCity}`,
                'state' : `${stationData.marketState}`,
                'name' : `${stationData.name}`,
                'tagline' : `${stationData.tagline}`})

          }

          Session.set('nprStations', stations);
          Session.set('nprStationsAvailable', true);
        }

        if(e) {
          console.error(e)
          Session.set('nprStationError', true);
        }
      })
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

export { onError, onSuccess };
