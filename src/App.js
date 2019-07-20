import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react';
import Titles from './components/title'
import Forms from './components/forms'
import Weather from './components/weather'
import MapContainer from './components/googlemap'




class App extends React.Component {


    constructor(props) {
        super(props)
        this.getweather = this.getweather.bind(this)
        this.state = {
                 error: undefined,
                 temperature: undefined,
                 city: undefined,
                 country: undefined,
                 lat : undefined,
                 lon: undefined

        } 




    }



    
// async function
    getweather = async function fetchAsync(e) {
 
    

        e.preventDefault();

    const city = e.target.city.value
    const country = e.target.country.value
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
    // await response of fetch call
    const response = await fetch(URL);
    const results = await response.json(); 
    //console.log(results)
    console.log()
    console.log()
    
    if(city && country && response.status !== 404){
       
    const temp = Number(( (((results.main.temp - 273.15) * 9)/5) + 32).toFixed(2))
    console.log(typeof temp)

    this.setState ({
    error: "",
    temperature: temp,
    city: results.name,
    country: results.sys.country,
    lat: results.coord.lat,
    lon: results.coord.lon

    })



} else {     
    
    
    const ErrMsg = 'Opps!! Something went wrong. Please ensure both fields are filled out and are valid entities'
    await this.setState({
    error: ErrMsg,
    temperature: "",
    city: "",
    country: "",
    lat: "",
    lon: ""

})} 
    
   
    
 
}



    render() {
        return (
            <div>
                <div className="center">


                    <Titles />
                    <Forms loadWeather={this.getweather} />
                    <Weather WeatherCompError = {this.state.error}
                            WeatherCompCity = {this.state.city} 
                            WeatherCompCountry = {this.state.country}
                            WeatherCompTemp = {this.state.temperature}
                        />
                </div>
                <div id="map" className="center">
                    <MapContainer 

                            Weatherlat = {this.state.lat}
                            Weatherlon = {this.state.lon}
                            zoom = {10}
                    />
                </div>
            </div>


        )
    }
}
export default App;