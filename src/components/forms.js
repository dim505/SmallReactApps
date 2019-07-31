import React from 'react';


export default function Forms (props)
     {

    
    return (

        <form onSubmit={props.loadWeather}>

        <div className="form-group">
            <input type="text" className="form-control" name="city" placeholder="City Name"/>
        </div>
           
        <div className="form-group">
            <input type="text" className="form-control" name="country" placeholder="Country Code"/>
        </div>
            
            <input className="btn btn-outline-success btn-lg btn-block" type="submit" value="Submit"/> 

         </form>      
            
                )


    




}

