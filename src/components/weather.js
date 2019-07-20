import React from 'react';




export default function Weather(props)  {
    

        return ( <div>  
                
               
                        {props.WeatherCompError && <p>{props.WeatherCompError} </p> }
                        {props.WeatherCompCity && <p>City: {props.WeatherCompCity} {props.WeatherCompCountry} </p>}
                        {props.WeatherCompTemp && <p>Current Temp: {props.WeatherCompTemp} F</p>}
                        {props.WeatherCompLat && <p>Latitube: {props.WeatherCompLat}  </p> }
                        {props.WeatherCompLon && <p>Longitude: {props.WeatherCompLon} </p>}

                
                 </div>
            
            
            
        )
        
    

}

