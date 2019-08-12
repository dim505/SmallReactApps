
import opps from '../PICS/opps.gif';
import Fade from 'react-reveal/Zoom';

import React from "react";
import { Transition } from 'react-transition-group';



const phases = {
	entered: {
		opacity: 1
	},
	entering: {
		opacity: 0
	},
	exited: {
		opacity: 0
	},
	exiting: {
		opacity: 1
	}
};


export default function Weather(props)  {
                  
        if( props.WeatherCompError){

        return ( 	<Transition in={props.in} appear timeout={500}  >
                        {status => (
                                <div className="animation" style={phases[status]}>
                                                                 <div className="WeathStyle">  
                                <div className="flex-container">
                                        <div id="left" style={{marginTop: "50px"}}>
                                                {props.WeatherCompError && <p>{props.WeatherCompError} </p> }
                                        </div>
                                        <div id="right"> 
                                                <img src={opps} width="100%" height="100%" alt="opps img"/>
                                        </div>
                                </div>
                        </div>
                                </div>
                        )}
                </Transition>)


                                   
       
        }  else if (props.WeatherCompCity) 
        {
                return ( 
                        <Fade>
                 <div className="WeathStyle">  
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
         </Fade>
         

                )

        } else {
                return ( null );
        }

        
    

}

