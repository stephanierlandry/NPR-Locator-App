import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { HTTP } from 'meteor/http'

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});


Meteor.methods({
  'getNprData': function(zip){
    const apiUrl = `https://www.npr.org/proxy/stationfinder/v3/stations?q=70119`;
    console.log(zip);
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
  }
});
