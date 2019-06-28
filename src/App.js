
import React from 'react';
import Titles from './components/title'
import Forms from './components/forms'
import Weather from './components/weather'




class App extends React.Component {

    getweather = async (e) => {
        const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=14b174dcab9bf47b49468e07daa1ff87')
        const results = await api_call.json()
        //prevents a full page refresh
        e.preventDefault();
        console.log(results);

    }


    render() {
        return (
            <div>
                <Titles />
                <Forms loadWeather={this.getweather} />
                <Weather />


            </div>
        )
    }
}
export default App;