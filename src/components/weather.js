import React from 'react';




export default function Weather(props)  {
    

        return ( <div>  
                
            
                {props.WeatherCompCity && <p>City: {props.WeatherCompCity} </p>}
                {props.WeatherCompCountry && <p>Country: {props.WeatherCompCountry} </p>}
                {props.WeatherCompTemp && <p>Temp: {props.WeatherCompTemp} </p>}
             

                

                
                 </div>
            
            
            
        )
        
    

}

