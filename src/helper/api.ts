import axios from "axios";
import { weatherUrl } from "../app.config";

export const getLocation = (query: string) => {
  return axios.get(`${weatherUrl}api/location/search/?query=${query}`);
};

export const getWeather = (woeid: number) => {
  return axios.get(`${weatherUrl}api/location/${woeid}/`);
};
