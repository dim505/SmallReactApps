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
        this.state = {
                 error: undefined,
                 temperature: undefined,
                 city: undefined,
                 country: undefined,
                 lat : undefined,
                 lon: undefined,
                 Desc : undefined,
                 Icon : undefined

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


componentDidMount () {

    console.log("loaded")
    // Get the components DOM node
     const elem = ReactDOM.findDOMNode(this);
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    //alert("test");
    setTimeout(() => {
        // Now set a transition on the opacity
        elem.style.transition = "opacity 2000ms";
        // and set the opacity to 1
    elem.style.opacity = 1;
    }, 6000);


}
    render() {
        return (<React.Fragment>
            <div className="background">
                    
      
      
    
            
                <div className="center">
                    
                    <Titles />
                    <Forms loadWeather={this.getweather} />
                    <Weather WeatherCompError = {this.state.error}
                            WeatherCompCity = {this.state.city} 
                            WeatherCompCountry = {this.state.country}
                            WeatherCompTemp = {this.state.temperature}
                            WeatherCompDesc = {this.state.Desc}
                            WeatherCompIcon = {this.state.Icon}
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
                       time={2500}
                       color="#FFFAF0"
                       background= "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
                />
            </React.Fragment>

        )
    }
}
export default App;