import React from 'react';
import { Meteor } from 'meteor/meteor';
import Search from './Button.jsx';
import StationData from './StationData.jsx';
import { onSuccess, onError } from '/imports/helpers/locationHelpers.jsx'
import { withTracker } from 'meteor/react-meteor-data';

export const AppContainer = () => {

  // navigator.geolocation.getCurrentPosition(onSuccess, onError);

  return(
    <div className="grid-container">
      <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
        <div className="cell shrink"></div>
        <div className="cell auto grid justify-center NPR-container">
          <h1>NPR Locator</h1>
          <Search />
          <StationData />
        </div>
        <div className="cell shrink"></div>
      </div>
    </div>
  )
};
