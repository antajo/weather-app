import React, { useEffect, useState } from "react";
import { useStore } from "../store/Store";
import { getWeather } from "../helper/api";
import "../assets/styles/home.scss";
import { ForecastType, WeatherType } from "../model/Weather";
import ForecastItem from "./ForecastItem";
import Unit from "./Unit";

const NoData = () => {
  return <h4>Search valid location to get the weather forecast.</h4>;
};
const Loading = () => {
  return <h4>Loading...</h4>;
};

type PropType = {
  weather: WeatherType;
  unit: string;
};

const Forecast = ({ weather, unit }: PropType) => {
  return (
    <>
      <div className="title-wrapper">
        <div>
          <h4>{weather.title}</h4>
          <sub>Updated time {new Date(weather.time).toLocaleTimeString()}</sub>
        </div>
        <Unit />
      </div>
      <div className="forecast-wrapper">
        {weather.consolidated_weather.map((item: ForecastType) => (
          <ForecastItem key={item.id} data={item} unit={unit} />
        ))}
      </div>
    </>
  );
};

const Home = () => {
  const { location, unit } = useStore();
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loader, setLoader] = useState(false);

  const fetchWeatherData = async (woeid: number) => {
    setLoader(true);
    try {
      const { data } = await getWeather(woeid);
      setWeather(data);
    } catch (err) {
      setWeather(null);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (!location) {
      setWeather(null);
      return;
    }
    fetchWeatherData(location?.woeid);
  }, [location]);

  return (
    <div className="content-area" data-testid="home">
      {loader && <Loading />}
      {weather && <Forecast weather={weather} unit={unit} />}
      {!weather && !loader && <NoData />}
    </div>
  );
};

export default Home;
