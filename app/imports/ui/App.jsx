import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { EJSON } from 'meteor/ejson';

import Button from './Button.jsx';


export const App = () => {

  const onSuccess = (position) => {

    Session.set('lat', position.coords.latitude);
    Session.set('lon', position.coords.longitude);

    Meteor.call('getLocationByZip',position.coords.latitude, position.coords.longitude, (e, r) => {
      const parsedZipResult = EJSON.parse(r.content);
      Session.set('zip', parsedZipResult.postalCodes[0].postalCode);
    })

    const zipCodeResult = Session.get('zip');

    Meteor.call('getNprData', zipCodeResult, (e,r) => {
      console.log(r.data.items[0].attributes.brand)
    })
  }

  const onError = () => {
    console.log('error')
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError)

  // Meteor.startup(function() {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     Session.set('lat', position.coords.latitude);
  //     Session.set('lon', position.coords.longitude);
  //     console.log(position.coords)
  //   });
  // });

  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log(position);
  // });


  return(
    <div className="grid-container">
      <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
        <div className="cell shrink"></div>
        <div className="cell auto grid justify-center NPR-container">
          <h1>NPR Locator</h1>
          <Button />
        </div>
        <div className="cell shrink"></div>
      </div>
    </div>
  )
};
