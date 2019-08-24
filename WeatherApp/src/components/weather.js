//error pic
import opps from '../PICS/opps.gif';
//fade effect for weather comp
import Fade from 'react-reveal/Zoom';

import React from "react";
//another effect for the error comp.
import { Transition } from 'react-transition-group';


//CSS styles for effect when the comp enters the various phases
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
        //returns this div if API returns error          
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


                                   
        //else if it returns datas, it strctures it accordly
        }  else if (props.WeatherCompCity) 
        {   
            //declares table for 5 day weather
            let table = []
            //pushes out header
            table.push(<div> <h3>5 Day Hourly Weather Report </h3></div>)
            //keeps track when the day changes
            var PrevDay 
            //stores data for the day
            let row = []
            //keeps count of number of rows
            let RowCounter 
            //dictionary of months to convert from 01 to January. 
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
                //loops through the hourly data and formats it 
                {props.WeatherFiveDay.map(function(day,index){
                        //gets ICON based on the hour 
                        var IconUrl = "https://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png" ;  

                        // breaks row if the day changes or first day of index
                        if((props.WeatherFiveDay[index].dt_txt.substring(8,10)) !== PrevDay || index === 39){
                                //sets previous day
                                PrevDay = props.WeatherFiveDay[index].dt_txt.substring(8,10)
                                //counts the number of rows inserted       
                                RowCounter = RowCounter + 1
                                //adds row to table
                                table.push(
                                  <div className="row" key={RowCounter}>       
                                        {row}
                                  </div>
                                )
                                //clears out row
                                row = []



                                //adds first hourly report with date to row                 
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
                                //adds just the time, temp, and weather icon to row
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

        //defines the whole strcture of the weather component
        <Fade>
                <div>
                 <div className="WeathStyle center">  
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

