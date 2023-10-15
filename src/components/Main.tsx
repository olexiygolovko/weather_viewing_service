import * as React from "react";
import "../styles/Main.css";
import  {useState, useEffect} from "react";
import axios from "axios";
import Current from "./Current_weather";
import FiveDayWeather from "./Five_day_weather";



function Main() {
    const [isLoading, setLoading] = useState(true);  // Result ready flag axios
    const [city, setCity] = useState('Warsaw'); // tracking changes in the city
    const [lat, setLat] = useState(55.7522); // we track the change in the current coordinates, by default - Warsaw
    const [lon, setLon] = useState(37.6156);
    const [widget, setWidget] = useState('current'); // We track which widget (component) to show
    const [current, setCurrent] = useState([]);
    const [feels_like, setFeels_like] = useState([]);
    const [temp, setTemp] = useState([]);
    const [wind_speed, setWind_speed] = useState([]);
    const [description, setDescription] = useState([]);
    const [fivedays, setWeek] = useState([]);
    const [pict, setIcon] = useState('03n');
    const [key_ipgeolocation, setKey1] = useState(null);
    const [key_openweathermap, setKey2] = useState(null);
    const citilist = ['Warsaw', 'Lodz', 'Poznań', 'Krakow'];
    // We fill the contents select
    const options = citilist.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    // We process the keys

    useEffect(() =>  {
        const keyGeo = "e8186dc8d75c495eb47dc77fbdc9a4ce";
        const keyWeather = "a77de10a6b1f2d3b387daef6ffd1d6a1";
        setKey1(keyGeo);
        setKey2(keyWeather);
    },[]);

    // Functions for calculating the current geoposition
    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    function onSuccess(geolocationData) {
        setLoading(true);
        setLat(geolocationData.coords.latitude);
        setLon(geolocationData.coords.longitude);
        axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${key_ipgeolocation}&lat=${lat}&lng=${lon}`).then(res => {
            setCity(res.data.geo.city);
            setLoading(false);
        });
    };
    function onError(error) {
      console.log('No location information available');
      console.log(error.message);
    };

    // We get the coordinates of the selected city
    useEffect(() => {

        if (key_openweathermap !== undefined) {
            axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}','RUS'&limit=1&appid=${key_openweathermap}`).then(res => {
                setLat(res.data[0].lat);
                setLon(res.data[0].lon);
                console.log('coordinates of the selected city', res.data[0].lat, res.data[0].lon)
            });
        };

        // We get weather data
        if (key_openweathermap !== undefined) {
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key_openweathermap}&units=metric`).then(res => {
                setCurrent(res.data.current);
                setDescription(res.data.current.weather[0].description);
                setFeels_like(res.data.current.feels_like);
                setTemp(res.data.current.temp);
                setWind_speed(res.data.current.wind_speed);
                setWeek(res.data.daily);
                setIcon(res.data.current.weather[0].icon);
                setLoading(false);
                console.log('res.data ', res.data)
            });
        };
    }, [city, key_openweathermap]);

    // If the flag isLoading = false then we display Loading..."
    if (isLoading) {
        return <h1 className="isLoading">Loading...</h1>;
    }

    // Otherwise, we display the data received from axios

    return (
        <main>
            <div className="cover">
                <div className='whatapp'>
                    <h2>Check the weather</h2>
                </div>
                <div className='button'>
                    <button onClick={getMyPosition}>To find me</button>
                    <select value={city} onChange={e=>setCity(e.target.value)}>
                        <option disabled>Select a city</option>
                        {options}
                    </select>

                    <button onClick={e=>setWidget("current")}>Today</button>
                    <button onClick={e=>setWidget("fivedays")}>For 5 days</button>
                </div>

                {(widget === "current" && key_openweathermap !== undefined ) &&
                    <div>
                        <Current key1={key_openweathermap} lat={lat} lon={lon} city={city} icon={pict}
                        description={description} feels_like={feels_like} temp={temp} wind_speed={wind_speed}/>
                    </div>
                }

                {widget === "fivedays" &&
                    <div>
                        <div className="city">{city}</div>
                        <div className="widgets">
                            {fivedays.slice(0, 6).map((value,index) =>
                                <FiveDayWeather day={index} temp={value.temp.day} icon={value.weather[0].icon} key={value.dt}/>
                            )}
                        </div>
                    </div>
                }
            </div>
        </main>
    );
};

export default Main;


