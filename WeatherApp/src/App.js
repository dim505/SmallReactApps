import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react';
import Titles from './components/title'
import Forms from './components/forms'
import Weather from './components/weather'
import MapContainer from './components/googlemap'
import ReactDOM from 'react-dom';
import {Circle} from 'react-preloaders';



class App extends React.Component {

    
    constructor(props) {
        super(props)
        
        this.getweather = this.getweather.bind(this)
        this.GetIntiWeath = this.GetIntiWeath.bind(this)
        
        this.state = {
                 error: undefined,
                 temperature: undefined,
                 city: undefined,
                 country: undefined,
                 lat : undefined,
                 lon: undefined,
                 Desc : undefined,
                 Icon : undefined,
                 in: true

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
    console.log(response)
    const results = await response.json(); 
    

    
    if(city && country && response.status !== 404){
       
    const temp = Number(( (((results.main.temp - 273.15) * 9)/5) + 32).toFixed(2))
    

    var IconUrl = "https://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png"    


    this.setState ({
    error: "",
    temperature: temp,
    city: results.name,
    country: results.sys.country,
    lat: results.coord.lat,
    lon: results.coord.lon,
    Desc : results.weather[0].description,
    Icon : IconUrl
    })



} else {     
    
    
    const ErrMsg = 'Opps!! Something went wrong. Please ensure both fields are filled out and are valid entities'
    await this.setState({
    error: ErrMsg,
    temperature: "",
    city: "",
    country: "",
    lat: "",
    lon: "",
    Desc : "",
    Icon : ""
    
})} 
    
   

    
 
}


GetIntiWeath = async function GetIntiWeath() {
   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude
            const lon =  position.coords.longitude
            console.log(lat)
            console.log(lon)
            const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
            console.log(URL)
            const response = await fetch(URL);
            console.log(response)
            const results = await response.json();
            const temp = Number(( (((results.main.temp - 273.15) * 9)/5) + 32).toFixed(2))
    

            var IconUrl = "https://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png" ;  
            
            
            this.setState ({
                    error: "",
                    temperature: temp,
                    city: results.name,
                    country: results.sys.country,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    Desc : results.weather[0].description,
                    Icon : IconUrl
                    })
			      
            




        });
      } else {
        alert("Geolocation is not supported by this browser.")  }
    
  
}

componentDidMount () {
   
    // Get the components DOM node
     const elem = ReactDOM.findDOMNode(this);
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    
    setTimeout(() => {
        // Now set a transition on the opacity
        elem.style.transition = "opacity 2000ms";
        // and set the opacity to 1
    elem.style.opacity = 1;
    }, 3000);
    
    this.GetIntiWeath()
    document.title = "Weather App"


}


    render() {
        return (<React.Fragment>
            <div className="background">
                    
      
      
    
            
                <div className="center">
                    
                    <Titles in = {this.state.in}/>
                    <Forms loadWeather={this.getweather} />
                    <Weather WeatherCompError = {this.state.error}
                            WeatherCompCity = {this.state.city} 
                            WeatherCompCountry = {this.state.country}
                            WeatherCompTemp = {this.state.temperature}
                            WeatherCompDesc = {this.state.Desc}
                            WeatherCompIcon = {this.state.Icon}
                            in = {this.state.in}
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
                <Circle 
                       animation="slide-down"
                       time={1500}
                       color="#FFFAF0"
                       background= "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
                />
            </React.Fragment>

        )
    }
}
export default App;