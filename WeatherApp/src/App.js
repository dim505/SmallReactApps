//imports all the CSS files, weather components, and 3rd party add ons
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react';
import Titles from './components/title'
import Forms from './components/forms'
import Weather from './components/weather'
import MapContainer from './components/googlemap'
import ReactDOM from 'react-dom';
import {Circle} from 'react-preloaders';
import LoadingBar from 'react-top-loading-bar'



class App extends React.Component {

    
    constructor(props) {
        super(props)
        
        //binds getweather so it can modify state
        this.getweather = this.getweather.bind(this)
        this.GetIntiWeath = this.GetIntiWeath.bind(this)
        //setting state of component
        this.state = {
                 error: undefined,
                 temperature: undefined,
                 city: undefined,
                 country: undefined,
                 lat : undefined,
                 lon: undefined,
                 Desc : undefined,
                 Icon : undefined,
                 in: true,
                 FiveDayResultsList : [],
                 loadingBarProgress: 0
        } 




    }

    add = value => {
        this.setState({  loadingBarProgress: this.state.loadingBarProgress + value })
    }

    complete = () => {this.setState ({loadingBarProgress: 100  }) }

    onLoaderFinished = () => {this.setState({ loadingBarProgress: 0})}
// async function
    getweather = async function fetchAsync(e) {
    this.add(10)   
    //prevent page refresh when page content is updated
    e.preventDefault();
    //gets city name from input box
    const city = e.target.city.value
    //gets iso code from input box
    const country = e.target.country.value
    //formualtes URL
    this.add(20)
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
    const fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
    // await response of fetch call
    const response = await fetch(URL);
    const FiveDayResponse = await fetch(fiveDayUrl);
    this.add(33)
    
    //converts responds to json
    const results = await response.json(); 
    const FiveDayResults = await FiveDayResponse.json(); 

    
    //checks if city and country are not blank and the returned response is not an error
    if(city && country && response.status !== 404){
    //converts temp form K to F
    const temp = Number(( (((results.main.temp - 273.15) * 9)/5) + 32).toFixed(2))
    
    //gets the appropriate icon for the weather
    var IconUrl = "https://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png"    
    
    //sets the state to be passed on to the compoents below
    this.setState ({
    error: "",
    temperature: temp,
    city: results.name,
    country: results.sys.country,
    lat: results.coord.lat,
    lon: results.coord.lon,
    Desc : results.weather[0].description,
    Icon : IconUrl,
    FiveDayResultsList : FiveDayResults.list
    })

    this.complete()

} else {     
    
    //CLEARS OUT ALL THE STATE    
    const ErrMsg = 'Opps!! Something went wrong. Please ensure both fields are filled out and are valid entities'
    await this.setState({
    error: ErrMsg,
    temperature: "",
    city: "",
    country: "",
    lat: "",
    lon: "",
    Desc : "",
    Icon : "",
    FiveDayResultsList : []
    
})
this.complete()

} 
    
   

    
 
}

//gets the inital weather from geolocation
GetIntiWeath = async function GetIntiWeath() {
   //gets if geolocation is supported
    if (navigator.geolocation) {
        //gets geolocation
        navigator.geolocation.getCurrentPosition(async (position) => {
            //gets latitube
            const lat = position.coords.latitude
            //gets longitube
            const lon =  position.coords.longitude
            
            //defines current weather url
            const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
            //defines 5 day hourly URL
            const fiveDayUrl  = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
            this.add(30)
           //Gets the results
            const response = await fetch(URL);
            const FiveDayResponse = await fetch(fiveDayUrl);
            const results = await response.json();
            const FiveDayResults = await FiveDayResponse.json(); 
            this.add(30)
            //converts from K to F
            const temp = Number(( (((results.main.temp - 273.15) * 9)/5) + 32).toFixed(2))
    

            var IconUrl = "https://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png" ;  
            
            //sets state to be passed down to weather comp
            this.setState ({
                    error: "",
                    temperature: temp,
                    city: results.name,
                    country: results.sys.country,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    Desc : results.weather[0].description,
                    Icon : IconUrl,
                    FiveDayResultsList : FiveDayResults.list
                    })
			      
            this.complete()




        });
      } else {
        //serts
        alert("Geolocation is not supported by this browser.")  }
    
  
}

componentDidMount () {
   
    // Get the components DOM node
     const elem = ReactDOM.findDOMNode(this);
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    //fades in after preloader loads
    setTimeout(() => {
        // Now set a transition on the opacity
        elem.style.transition = "opacity 2000ms";
        // and set the opacity to 1
    elem.style.opacity = 1;
    }, 3000);
    //calls function to load intial weather
    this.GetIntiWeath()
    //sets tab name
    document.title = "Weather App"


}


    render() {
        return (<React.Fragment>
            
            <div className="background">
                    
      
      
    
            
                <div className="center">
                    <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={6}
                    color=	'#0000A0'
                    onLoaderFinished={() => this.onLoaderFinished()}
                         />
                    <Titles in = {this.state.in}/>
                    <Forms loadWeather={this.getweather} />
                    
                </div>    
                    <Weather WeatherCompError = {this.state.error}
                            WeatherCompCity = {this.state.city} 
                            WeatherCompCountry = {this.state.country}
                            WeatherCompTemp = {this.state.temperature}
                            WeatherCompDesc = {this.state.Desc}
                            WeatherCompIcon = {this.state.Icon}
                            WeatherFiveDay = {this.state.FiveDayResultsList}
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