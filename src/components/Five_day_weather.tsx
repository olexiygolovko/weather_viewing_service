import * as React from "react";
import "../styles/Widget.css";

// Вывод погоды на сегодня + 5 дней
function FiveDayWeather(props) {
    const days =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
    "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const date = new Date();
    return (
        <div className="widget">
            <div className="panel">
                <div className="date">
                    {props.day === 0 && `Сегодня - ${days[date.getDay()]}`}
                    {props.day === 1 && `${days[date.getDay()+1]}`}
                    {props.day === 2 && `${days[date.getDay()+2]}`}
                    {props.day === 3 && `${days[date.getDay()+3]}`}
                    {props.day === 4 && `${days[date.getDay()+4]}`}
                    {props.day === 5 && `${days[date.getDay()+5]}`}
                </div>
                <div className="temp">
                   <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="80"/>
                   {Math.round(props.temp)}&deg;
                </div>
            </div>
        </div>
    );
};

export default FiveDayWeather;

