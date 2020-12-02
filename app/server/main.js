import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { HTTP } from 'meteor/http'

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

// Meteor.startup(() => {
//   // If the Links collection is empty, add some data.
//   if (LinksCollection.find().count() === 0) {
//     insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app'
//     });
//
//     insertLink({
//       title: 'Follow the Guide',
//       url: 'http://guide.meteor.com'
//     });
//
//     insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com'
//     });
//
//     insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com'
//     });
//   }
// });


Meteor.methods({
  getNprData(zip){
    const apiUrl = `https://www.npr.org/proxy/stationfinder/v3/stations?q=${zip}`;
      try {
        const result = HTTP.call('GET', apiUrl);
        return result;
      }
      catch(e) {
        if (e) {
          return e;
        }
        return [];
      }
  },
  getLocationByZip(lat, lon){
    try {
      const zipResult = HTTP.call('GET', `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lon}&username=stephaniegibby`)
      return zipResult
    }
    catch(e) {
      console.error(e)
    }
  },
  getLocationByCity(lat,lon){
    try {
      const cityResult = HTTP.call('GET', `http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${lat}&lng=${lon}&username=stephaniegibby`)
      return cityResult
    }
    catch(e) {
      console.error(e)
    }
  }
});
