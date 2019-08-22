import React, { Component } from 'react';
import {Marker, Map, GoogleApiWrapper } from 'google-maps-react';





  const mapstyles = {
    width: '90%',
    height: '50%',

};




export class MapContainer  extends Component {


    render() {
    return (    
      
        <Map
        google={this.props.google}
        zoom={this.props.zoom}
        style={mapstyles}
        initialCenter={{
          lat: 42.36,
          lng: -71.06
         }}
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


