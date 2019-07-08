
import React from 'react';
import Titles from './components/title'
import Forms from './components/forms'
import Weather from './components/weather'




class App extends React.Component {


    constructor(props) {
        super(props)
        this.getweather = this.getweather.bind(this)
        this.state = {
                 temperature: undefined,
                 city: undefined,
                 country: undefined
          

        } 




    }



    
// async function
    getweather = async function fetchAsync(e) {
 
    

        e.preventDefault();

    const city = e.target.city.value
    const country = e.target.country.value
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=14b174dcab9bf47b49468e07daa1ff87'
    // await response of fetch call
    //const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=greenfield,usa&APPID=14b174dcab9bf47b49468e07daa1ff87')
    const response = await fetch(URL);
    // only proceed once promise is resolved
    const results = await response.json(); 
    console.log(results);
    

   
   await this.setState ({
    temperature: results.main.temp,
    city: results.name,
    country: results.sys.country

}); 
    console.log(this.state.city)
    console.log(this.state.temperature)
    
 
}



    render() {
        return (
            <div>
                <Titles />
                <Forms loadWeather={this.getweather} />
                <Weather WeatherCompCity = {this.state.city} 
                         WeatherCompCountry = {this.state.country}
                         WeatherCompTemp = {this.state.temperature}
                       />


            </div>
        )
    }
}
export default App;