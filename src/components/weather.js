import React from 'react';




export default function Weather(props)  {
    

        return ( <div className="WeathStyle">  
                
               
                        {props.WeatherCompError && <p>{props.WeatherCompError} </p> }
                        {props.WeatherCompCity && <p>City: {props.WeatherCompCity} {props.WeatherCompCountry} </p>}
                        {props.WeatherCompTemp && <p>Current Temp: {props.WeatherCompTemp} F</p>}
                        {props.WeatherCompDesc && <p> Current Conditions: {props.WeatherCompDesc}</p>}
                        {props.WeatherCompIcon && <img src={props.WeatherCompIcon} alt="weather icon"></img> }

                
                 </div>
            
            
            
        )
        
    

}

