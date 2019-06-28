import React from 'react';


export default function Forms (props)
     {

    
    return (

        <form onSubmit={props.loadWeather}>

            <input type="text" name="city" placeholder="Input City Here"/>
            <input type="text" name="country" placeholder="Input Country Here"/>
            <input type="submit" value="Submit"/> 

         </form>      
            
                )


    




}

