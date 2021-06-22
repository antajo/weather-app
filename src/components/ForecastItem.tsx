import React from "react";
import { ForecastType } from "../model/Weather";
import { weatherImg } from "../app.config";
import "../assets/styles/forecast.scss";
import { getDateString, getTemp, getDis, getSpeed } from "../helper/weather";
import { ReactComponent as Icon } from "../assets/images/direction.svg";

type PropType = {
  data: ForecastType;
  unit: string;
};

const ForecastItem = ({ data, unit }: PropType) => {
  return (
    <div className="forecast" role="forecast-block">
      <h2>{getDateString(data.applicable_date)}</h2>
      <div>
        <img
          src={`${weatherImg}${data.weather_state_abbr}.png`}
          alt={data.weather_state_name}
        />
      </div>
      <h3 className="weather-state">{data.weather_state_name}</h3>
      <h3>Max {getTemp(data.max_temp, unit)}</h3>
      <h3>Mix {getTemp(data.min_temp, unit)}</h3>
      <h3>Humidity {data.humidity}%</h3>
      <h3>Visibility {getDis(data.visibility, unit)}</h3>
      <h3>
        <Icon
          className="direction"
          style={{ transform: `rotate(${data.wind_direction}deg)` }}
          title={data.wind_direction_compass}
        />
        Wind {getSpeed(data.wind_speed, unit)}
      </h3>
    </div>
  );
};

export default ForecastItem;
