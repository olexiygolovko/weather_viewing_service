import * as React from "react";
import "../styles/Widget.css";

// We get the date for today with additional. parameters
function Current(props) {
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();

    return (
        <div className="current">
            <div className="weather-left">
                <div className="weather-city">{props.city}</div>
                <h2 className="date"> {date.toLocaleDateString()}, {days[date.getDay()]} </h2>
                <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="100" />
                <div className="desc-main">{props.description}</div>
                <div className="feels-like">{props.feels_like}°</div>
            </div>
            <div className="weather-right">
                <div className="temp-main">{Math.round(props.temp)}°</div>
                <div className="wind">Ветер: {props.wind_speed}m/s</div>
            </div>

        </div>
    );
};

export default Current;

