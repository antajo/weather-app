import { LocationType } from "../../src/model/Location";
import { WeatherType, ForecastType } from "../../src/model/Weather";

export const location: LocationType[] = [
  {
    latt_long: "37.777119, -122.41964",
    location_type: "City",
    title: "San Francisco",
    woeid: 2487956,
  },
  {
    latt_long: "32.715691,-117.161720",
    location_type: "City",
    title: "San Diego",
    woeid: 2487889,
  },
];

const forecast: ForecastType = {
  air_pressure: 1014.5,
  applicable_date: "2021-06-21",
  created: "2021-06-21T18:32:16.755384Z",
  humidity: 74,
  id: 6698968185569280,
  max_temp: 18.195,
  min_temp: 12.83,
  predictability: 71,
  the_temp: 18.16,
  visibility: 11.198662312097351,
  weather_state_abbr: "hc",
  weather_state_name: "Heavy Cloud",
  wind_direction: 228.3414006868842,
  wind_direction_compass: "SW",
  wind_speed: 7.432210706779077,
};

const getForecastData = (index): ForecastType => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  let forecastDate = `${date.getFullYear()}-`;
  forecastDate += `${("0" + (date.getMonth() + 1)).slice(-2)}-`;
  forecastDate += `${("0" + date.getDate()).slice(-2)}`;

  return {
    ...forecast,
    id: index,
    applicable_date: forecastDate,
  };
};

export const weather: WeatherType = {
  consolidated_weather: [
    getForecastData(0),
    getForecastData(1),
    getForecastData(2),
    getForecastData(3),
    getForecastData(4),
  ],
  time: "2021-06-21T14:31:52.624806-07:00",
  title: "San Francisco",
};
