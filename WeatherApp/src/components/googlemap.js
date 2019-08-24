import React, { Component } from 'react';
import {Marker, Map, GoogleApiWrapper } from 'google-maps-react';




 //styling for Google Maps
  const mapstyles = {
    width: '75%',
    height: '50%',

};




export class MapContainer  extends Component {


    render() {
    return (    
      // takes in various parameters for 
        <Map
        //this is the actual map
        google={this.props.google}
        //displays level of soom
        zoom={this.props.zoom}
        //defines the style
        style={mapstyles}
        //default coordinates on first load 
        initialCenter={{
          lat: 42.36,
          lng: -71.06
         }}
         //defines map position on subsequent loads
          center={{
          lat: this.props.Weatherlat,
          lng: this.props.Weatherlon
         }} >
           
          <Marker position={{
          lat: this.props.Weatherlat,
          lng: this.props.Weatherlon
         }} />
        </Map>
       

       ) ;
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDMoFgWOjZKyH_mp_RduP8mJhTbb_j8tTw'
  })(MapContainer);


