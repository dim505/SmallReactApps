import React from 'react';
import opps from '../PICS/opps.gif';




export default function Weather(props)  {

        if( props.WeatherCompError){
                return ( <div className="WeathStyle">  
                                <div className="flex-container">
                                        <div id="left" style={{marginTop: "50px"}}>
                                                {props.WeatherCompError && <p>{props.WeatherCompError} </p> }
                                        </div>
                                        <div id="right"> 
                                                <img src={opps} width="200" height="200" />
                                        </div>
                                </div>
                        </div>)
                         
                                   
       
        }  else if (props.WeatherCompCity) 
        {
                return ( <div className="WeathStyle">  
                
                <div>
                
                {props.WeatherCompCity && <p>{props.WeatherCompCity}, {props.WeatherCompCountry} </p>}
                <div className="flex-container">
                        <div id="left">
                        {props.WeatherCompTemp && <p>{props.WeatherCompTemp} F</p>}
                        {props.WeatherCompDesc && <p>   {props.WeatherCompDesc}</p>}
                        </div>
                        <div id="right"> 
                        {props.WeatherCompIcon && <img src={props.WeatherCompIcon} alt="weather icon"></img> }
                        </div>
                </div>
                </div>
         </div>



                )

        } else {
                return ( null );


        }

        
    

}

