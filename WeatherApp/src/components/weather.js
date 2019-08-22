
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
        {   let table = []
            table.push(<div> <h3>5 Day Hourly Weather Report </h3></div>)
            var PrevDay 
            let row = []
            let RowCounter 
            var months = {
                '01' : 'Jan',
                '02' : 'Feb',
                '03' : 'Mar',
                '04' : 'Apr',
                '05' : 'May',
                '06' : 'Jun',
                '07' : 'Jul',
                '08' : 'Aug',
                '09' : 'Sep',
                '10' : 'Oct',
                '11' : 'Nov',
                '12' : 'Dec'
                }

                {props.WeatherFiveDay.map(function(day,index){
                        var IconUrl = "https://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png" ;  

                        
                        if((props.WeatherFiveDay[index].dt_txt.substring(8,10)) !== PrevDay){
                                PrevDay = props.WeatherFiveDay[index].dt_txt.substring(8,10)
                                console.log(props.WeatherFiveDay[index].dt_txt.substring(8,10))
                                console.log(PrevDay)
                                RowCounter = RowCounter + 1
                                table.push(
                                  <div className="row" key={RowCounter}>       
                                        {row}
                                  </div>
                                )
                                row = []




                                row.push(<div key={index} className="col"> 
                                      
                                <div className="flex-container">
                        <div id="WeathDateleft">
                                {months[day.dt_txt.substring(5,7)]} {day.dt_txt.substring(8,10)}

                        </div>
                        <div id="left">
                        <p> {Math.round(Number(( (((day.main.temp - 273.15) * 9)/5) + 32).toFixed(2)))} F <br></br>
                         {day.dt_txt.substring(11,16)} </p>
                        </div>
                        <div id="right"> 
                        <img src={IconUrl} alt="weather icon" title={day.weather[0].description}></img> 
                        </div>
                </div>
                                </div>)




                              }else{ 
                                row.push(
                                
                                <div key={index} className="col"> 
                                                
                                                
                                <div className="flex-container">
                                <div id="left">
                                <p> {Math.round(Number(( (((day.main.temp - 273.15) * 9)/5) + 32).toFixed(2)))} F <br></br>
                                  {day.dt_txt.substring(11,16)} </p>
                                </div>
                                <div id="right"> 
                                <img src={IconUrl} alt="weather icon" title={day.weather[0].description}></img> 
                                </div>
                        </div>
                        </div>)
                        
                                     
                                  
                              }
                                                
                  

        })}


                return ( 
        <Fade>
                <div>
                 <div className="WeathStyle">  
                <div>
                {props.WeatherCompCity && <p>{props.WeatherCompCity}, {props.WeatherCompCountry} Current Weather</p>}
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

                <div className="WeathStyle5Day">

                     {table}         
                </div>
                  

              
         </div>

         </Fade>
         
   

                )

        } else {
                return ( null );
        }

        
    

}

